// ===== 雲端同步：用你 GitHub 帳號裡的一個「私人 Gist」當雲端存檔，手機和電腦自動合併 =====
// token 只存在這台裝置（不會放進備份碼）；建議只開 gist 權限。
// 合併規則：筆記、重點、書籤、「我懂了」逐筆比時間，刪除有紀錄不會長回來；其他（XP、錯題本、計畫⋯）以最近修改的裝置為準。
// 畫面設定（主題、字級、目前科目、閱讀位置⋯）每台裝置各自保留。
const SYNC = (() => {
  const LK = 'rv26sync', FILE = 'rv26-sync.json', DESC = '26 秋季複習本同步（請勿手動修改）', API = 'https://api.github.com';
  const LOCAL_ONLY = new Set(['subj', 'tab', 'pos', 'ntview', 'zoom', 'theme', '_themeSet', 'mu', 'calm', 'notips', 'sound', 'lang']);
  const TOKEN_URL = 'https://github.com/settings/tokens/new?scopes=gist&description=' + encodeURIComponent('26 秋季複習本同步');
  let cfg = (() => { try { return JSON.parse(localStorage.getItem(LK)) || {}; } catch (e) { return {}; } })();
  const keep = () => { try { localStorage.setItem(LK, JSON.stringify(cfg)); } catch (e) { } };
  let busy = false, again = false, tChange = 0, tPush = 0;

  const syncable = st => { const o = {}; for (const k in st) if (!LOCAL_ONLY.has(k)) o[k] = st[k]; return o; };
  const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36) + ':' + s.length; };
  const ts = v => typeof v === 'number' ? v : (v && (v.up || v.at)) || 1;

  // ---- 合併兩份資料 ----
  function merge(L, R) {
    const a = L.data || {}, b = R.data || {}, rNewer = (R.mt || 0) > (L.mt || 0), nw = rNewer ? b : a, od = rNewer ? a : b;
    const del = Object.assign({}, a.del || {}); for (const [k, t] of Object.entries(b.del || {})) del[k] = Math.max(del[k] || 0, t);
    const cut = Date.now() - 180 * 864e5; for (const k in del) if (del[k] < cut) delete del[k];
    const D = (k, fam) => Math.max(del[k] || 0, del[fam + '|*'] || 0, del['*'] || 0);
    const out = {};
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (k === 'del') continue;
      if (k === 'done' || k === 'badges') {
        const o = {}; for (const src of [a[k] || {}, b[k] || {}]) for (const [id, v] of Object.entries(src)) { if (!v) continue; const t = ts(v); if (t <= D(k + '|' + id, k)) continue; if (!(id in o) || t > ts(o[id])) o[id] = v; }
        out[k] = o; continue;
      }
      if (k === 'nt') {
        const o = {}; for (const src of [a.nt || {}, b.nt || {}]) for (const [cid, notes] of Object.entries(src)) for (const [nk, d] of Object.entries(notes)) {
          if (ts(d) <= D('nt|' + cid + '|' + nk, 'nt')) continue; o[cid] = o[cid] || {}; if (!o[cid][nk] || ts(d) > ts(o[cid][nk])) o[cid][nk] = d; }
        out.nt = o; continue;
      }
      if (k === 'hl') {
        const o = {}; for (const src of [a.hl || {}, b.hl || {}]) for (const [cid, list] of Object.entries(src)) for (const h of list) {
          if (ts(h) <= D('hl|' + h.id, 'hl')) continue; o[cid] = o[cid] || []; const i = o[cid].findIndex(x => x.id === h.id); if (i < 0) o[cid].push(h); else if (ts(h) > ts(o[cid][i])) o[cid][i] = h; }
        for (const cid in o) o[cid].sort((x, y) => x.at - y.at);
        out.hl = o; continue;
      }
      if (k === 'bm') {
        const o = {}; for (const src of [a.bm || {}, b.bm || {}]) for (const [cid, d] of Object.entries(src)) { if (ts(d) <= D('bm|' + cid, 'bm')) continue; if (!o[cid] || ts(d) > ts(o[cid])) o[cid] = d; }
        out.bm = o; continue;
      }
      out[k] = k in nw ? nw[k] : od[k];
    }
    out.del = del; return out;
  }

  // ---- GitHub API ----
  async function api(method, path, body) {
    const r = await fetch(API + path, { method, headers: { Authorization: 'Bearer ' + cfg.token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }, body: body ? JSON.stringify(body) : undefined, cache: 'no-store' });
    if (r.status === 401) throw new Error('token 無效或已過期，請重新建立一個。');
    if (r.status === 403 || r.status === 404) throw new Error(r.headers.get('x-ratelimit-remaining') === '0' ? 'GitHub 暫時限制次數，稍後會自動再試。' : 'token 沒有 gist 權限（建立時要勾 gist）。');
    if (!r.ok) throw new Error('GitHub 回應錯誤（' + r.status + '）');
    return r.status === 204 ? null : r.json();
  }
  const fileText = async f => (!f.truncated && f.content != null) ? f.content : (await fetch(f.raw_url, { cache: 'no-store' })).text();
  async function findExisting() {
    for (let page = 1; page <= 5; page++) {
      const list = await api('GET', '/gists?per_page=100&page=' + page);
      const g = list.find(x => x.description === DESC || (x.files && x.files[FILE])); if (g) return g.id;
      if (list.length < 100) break;
    }
    return null;
  }
  async function findOrCreate() {
    const id = await findExisting(); if (id) return id;
    const g = await api('POST', '/gists', { description: DESC, public: false, files: { [FILE]: { content: JSON.stringify({ v: 1, mt: cfg.mt || 0, at: Date.now(), data: syncable(ST) }) } } });
    return g.id;
  }

  // ---- 套用合併結果到這台 ----
  function apply(data) {
    for (const k of Object.keys(ST)) if (!LOCAL_ONLY.has(k) && !(k in data)) delete ST[k];
    Object.assign(ST, data); store.set(ST);
    try { FUN.hud(); updateCounts(); } catch (e) { }
    // 正在寫筆記、選文字或答題時不重畫，下次換頁就會看到
    const busyUI = document.querySelector('[contenteditable="true"]') || !getSelection().isCollapsed || (CUR[1] && !['learn', 'notes'].includes(CUR[1]));
    if (!busyUI && CUR[0]) window.rerender(); else if (CUR[1] === 'learn') NOTES.bmPill();
  }

  // ---- 同步一次：抓雲端 → 合併 → 寫回本機與雲端 → 補傳／補抓圖片 ----
  async function run() {
    if (!cfg.token) return; if (busy) { again = true; return; }
    busy = true; status('同步中⋯');
    try {
      if (!cfg.gist) { cfg.gist = await findOrCreate(); keep(); }
      const g = await api('GET', '/gists/' + cfg.gist);
      const f = g.files[FILE]; let remote = null;
      if (f) { try { remote = JSON.parse(await fileText(f)); } catch (e) { remote = null; } }
      const localData = syncable(ST), lj = JSON.stringify(localData);
      const merged = remote && remote.data ? merge({ mt: cfg.mt || 0, data: localData }, remote) : localData;
      const mj = JSON.stringify(merged);
      if (mj !== lj) apply(JSON.parse(mj));
      const mt = Math.max(cfg.mt || 0, (remote && remote.mt) || 0);
      if (!remote || JSON.stringify(remote.data) !== mj) await api('PATCH', '/gists/' + cfg.gist, { files: { [FILE]: { content: JSON.stringify({ v: 1, mt, at: Date.now(), data: merged }) } } });
      // 圖片：這台有、雲端沒有 → 上傳；雲端有、這台沒有 → 下載
      const used = IMGS.usedIds(merged), have = new Set(await IMGS.keys());
      for (const id of used) {
        const name = 'img-' + id + '.txt';
        if (!g.files[name] && have.has(id)) { const d = await IMGS.get(id); if (d) await api('PATCH', '/gists/' + cfg.gist, { files: { [name]: { content: d } } }); }
        else if (g.files[name] && !have.has(id)) { const d = await fileText(g.files[name]); if (/^data:image\//.test(d)) { await IMGS.put(id, d); IMGS.hydrate(); } }
      }
      cfg.mt = mt; cfg.h = hash(mj); cfg.last = Date.now(); cfg.err = ''; keep(); status();
    } catch (e) { cfg.err = e.message || String(e); keep(); status(); }
    finally { busy = false; if (again) { again = false; setTimeout(run, 500); } }
  }

  // ---- 本機有改動 → 記下修改時間，稍後上傳 ----
  function changed() {
    if (!cfg.token) return;
    clearTimeout(tChange); tChange = setTimeout(() => {
      const h = hash(JSON.stringify(syncable(ST)));
      if (h !== cfg.h) { cfg.h = h; cfg.mt = Date.now(); keep(); clearTimeout(tPush); tPush = setTimeout(run, 2500); }
    }, 1500);
  }

  // ---- 連線／中斷 ----
  // 進度摘要：讓你比較哪一台比較新
  const summary = st => ({ xp: st.xp || 0, done: Object.keys(st.done || {}).filter(k => !k.startsWith('P')).length, nt: Object.values(st.nt || {}).reduce((a, x) => a + Object.keys(x).length, 0), hl: Object.values(st.hl || {}).reduce((a, x) => a + x.length, 0), bm: Object.keys(st.bm || {}).length, wrong: Object.values(st.wrong2 || {}).reduce((a, x) => a + x.length, 0) });
  let pending = null;
  // 第一次連線：雲端已經有別台的進度 → 先問哪一台比較新
  async function connect(token) {
    cfg = { token: token.trim() };
    try {
      const u = await api('GET', '/user'); const gid = await findExisting();
      if (gid) {
        const g = await api('GET', '/gists/' + gid); const f = g.files[FILE]; let remote = null;
        if (f) { try { remote = JSON.parse(await fileText(f)); } catch (e) { } }
        if (remote && remote.data) { pending = { token: cfg.token, user: u.login, gist: gid, remote: summary(remote.data), at: remote.at || 0 }; cfg = {}; return { choose: pending, local: summary(ST) }; }
      }
      cfg = { token: token.trim(), user: u.login, gist: gid || undefined, mt: 0, h: hash(JSON.stringify(syncable(ST))) }; keep(); await run(); return { ok: !cfg.err };
    } catch (e) { const m = e.message; cfg = {}; keep(); throw new Error(m); }
  }
  // prefer：'local' = 這台比較新（XP、錯題本、計畫以這台為準）；'remote' = 雲端比較新
  async function finish(prefer) {
    if (!pending) return; const p = pending; pending = null;
    cfg = { token: p.token, user: p.user, gist: p.gist, mt: prefer === 'local' ? Date.now() : 0, h: hash(JSON.stringify(syncable(ST))) }; keep();
    await run();
  }
  // 之後如果發現另一台蓋掉了這台的 XP／錯題本：以這台為準再同步一次（筆記、重點、書籤一樣是合併）
  // 換 token（重新產生、過期）：沿用原本的雲端存檔與修改時間，不用重新選哪台比較新
  async function changeToken(token) {
    const old = cfg.token; cfg.token = token.trim();
    try { const u = await api('GET', '/user'); cfg.user = u.login; cfg.err = ''; keep(); await run(); }
    catch (e) { cfg.token = old; keep(); throw e; }
  }
  async function preferLocal() { cfg.mt = Date.now(); keep(); await run(); }
  function disconnect() { cfg = {}; keep(); status(); }

  // ---- 設定頁 ----
  const ago = t => { if (!t) return '還沒同步'; const m = Math.round((Date.now() - t) / 60000); return m < 1 ? '剛剛' : m < 60 ? m + ' 分鐘前' : m < 1440 ? Math.round(m / 60) + ' 小時前' : Math.round(m / 1440) + ' 天前'; };
  function status(msg) {
    const el = document.getElementById('syncst'); if (!el) return;
    el.textContent = msg || (cfg.err ? '同步失敗：' + cfg.err : cfg.token ? `已連線（GitHub：${cfg.user || '—'}）・上次同步 ${ago(cfg.last)}` : '');
    el.classList.toggle('bad', !!cfg.err && !msg);
  }
  function settingsHTML() {
    return `<section class="setbox" id="syncbox"><h3>雲端同步（手機 ↔ 電腦）</h3>${cfg.token ? `
      <p class="sm-p" id="syncst"></p>
      <p class="sm-p">筆記、重點、書籤、圖片、「我懂了」、XP、錯題本、讀書計畫都會自動同步。每台裝置的主題、字級、閱讀位置各自保留。</p>
      <div class="row wrap"><button class="btn" id="syncnow" type="button">立即同步</button><button class="btn ghost" id="syncmine" type="button">以這台為準再同步</button><button class="btn ghost" id="syncoff" type="button">這台不再同步</button></div>
      <details class="synctokbox"${/token/.test(cfg.err || '') ? ' open' : ''}><summary>更換 token（重新產生過、或顯示 token 無效時）</summary>
        <div class="row wrap"><input type="password" id="synctok2" autocomplete="off" spellcheck="false" placeholder="貼上新的 ghp_ 開頭 token" aria-label="新的 GitHub token"><button class="btn" id="syncnew" type="button">更換</button></div>
        <p class="sm-p">換 token 會繼續用原本的雲端存檔，進度不會重來。每台裝置都要換成新的這一組。</p></details>
      <p class="sm-p">「以這台為準再同步」：XP、錯題本、讀書計畫改用這台的；筆記、重點、書籤、「我懂了」照樣兩邊合併，不會不見。</p>` : `
      <p class="sm-p">用你 GitHub 帳號裡的一個<b>私人 Gist</b> 當雲端存檔。每台裝置都做一次下面的步驟，之後就會自動同步。</p>
      <ol class="syncsteps"><li>打開 <a href="${TOKEN_URL}" target="_blank" rel="noopener">GitHub 建立 token 的頁面</a>（會自動勾好 <b>gist</b>，其他都不用勾）。</li><li><b>Expiration</b> 選一年或 No expiration，按最下面的 <b>Generate token</b>。</li><li>複製 <code>ghp_</code> 開頭的那串，貼到下面按「連線」。另一台裝置貼<b>同一串</b>就好（建議先存在你的密碼管理工具裡）。</li></ol>
      <div class="row wrap"><input type="password" id="synctok" autocomplete="off" spellcheck="false" placeholder="貼上 ghp_ 開頭的 token" aria-label="GitHub token"><button class="btn" id="syncgo" type="button">連線</button></div>
      <p class="sm-p" id="syncst"></p>
      <p class="sm-p">token 只存在這台裝置，不會放進備份碼。只開 gist 權限的話，就算外洩也只能讀寫你的 Gist，碰不到你的程式碼。</p>`}</section>`;
  }
  function showChoice(root, r) {
    const L = r.local, R = r.choose.remote, row = (k, t) => `<tr><td>${t}</td><td>${L[k]}</td><td>${R[k]}</td></tr>`;
    const box = root.querySelector('#syncbox');
    box.innerHTML = `<h3>雲端同步（手機 ↔ 電腦）</h3><p class="sm-p"><b>雲端已經有另一台裝置的進度</b>（${ago(r.choose.at)}更新）。哪一台比較新？</p>
      <div class="tblwrap"><table class="tbl syncmp"><tr><th></th><th>這台</th><th>雲端（另一台）</th></tr>${row('xp', 'XP')}${row('done', '「我懂了」')}${row('wrong', '錯題本')}${row('nt', '筆記')}${row('hl', '重點')}${row('bm', '書籤')}</table></div>
      <p class="sm-p">不管選哪個，<b>筆記、重點、書籤、「我懂了」都會兩邊合併</b>，不會不見。選擇只決定 XP、錯題本、讀書計畫、遊戲紀錄要用哪一台的。</p>
      <div class="row wrap"><button class="btn" id="syncpl" type="button">這台比較新</button><button class="btn ghost" id="syncpr" type="button">雲端（另一台）比較新</button></div><p class="sm-p" id="syncst"></p>`;
    const pick = async which => { box.querySelectorAll('button').forEach(b => b.disabled = true); status('同步中⋯'); await finish(which); if (!cfg.err) FUN.toast('同步完成！', 'wow'); renderSettings(root); };
    box.querySelector('#syncpl').onclick = () => pick('local'); box.querySelector('#syncpr').onclick = () => pick('remote');
  }
  function bindSettings(root) {
    status();
    const go1 = root.querySelector('#syncgo');
    if (go1) go1.onclick = async () => { const v = root.querySelector('#synctok').value; if (!/^\s*(ghp_|github_pat_)\w+\s*$/.test(v)) { status('看起來不像 token：應該是 ghp_ 或 github_pat_ 開頭。'); return; } go1.disabled = true; status('連線中⋯');
      try {
        const r = await connect(v);
        if (r.choose) { showChoice(root, r); return; }
        FUN.toast('同步完成！', 'wow'); renderSettings(root);
      } catch (e) { status('連線失敗：' + e.message); go1.disabled = false; } };
    const nw = root.querySelector('#syncnew'); if (nw) nw.onclick = async () => { const v = root.querySelector('#synctok2').value; if (!/^\s*(ghp_|github_pat_)\w+\s*$/.test(v)) { status('看起來不像 token：應該是 ghp_ 或 github_pat_ 開頭。'); return; } nw.disabled = true; status('更換中⋯');
      try { await changeToken(v); FUN.toast('token 已更換，同步完成', 'happy'); renderSettings(root); } catch (e) { status('更換失敗：' + e.message); nw.disabled = false; } };
    const mine = root.querySelector('#syncmine'); if (mine) armed(mine, '以這台為準再同步', async () => { status('同步中⋯'); await preferLocal(); if (!cfg.err) FUN.toast('已以這台為準同步', 'happy'); renderSettings(root); });
    const now = root.querySelector('#syncnow'); if (now) now.onclick = async () => { await run(); if (!cfg.err) FUN.toast('同步完成', 'happy'); };
    const off = root.querySelector('#syncoff'); if (off) armed(off, '這台不再同步', () => { disconnect(); renderSettings(root); });
  }

  // ---- 自動同步的時機：開啟時、切回來時、每 3 分鐘 ----
  if (cfg.token) setTimeout(run, 1500);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && cfg.token && Date.now() - (cfg.last || 0) > 20000) run(); });
  setInterval(() => { if (document.visibilityState === 'visible' && cfg.token) run(); }, 180000);

  return { run, changed, merge, settingsHTML, bindSettings, on: () => !!cfg.token };
})();
