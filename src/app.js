// ===== App =====
const ORDER = ['deriv', 'invest', 'law', 'mgmt'];
const store = {
  k: 'rv26autumn',
  get() { try { return JSON.parse(localStorage.getItem(this.k)) || {}; } catch (e) { return {}; } },
  set(v) { try { localStorage.setItem(this.k, JSON.stringify(v)); } catch (e) { } }
};
let ST = Object.assign({ done: {}, wrong: {}, subj: 'home', tab: {} }, store.get());
const save = () => store.set(ST);
const strip = h => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&lt;|&gt;|&amp;/g, ' ').replace(/\s+/g, ' ').trim();

const LAWART = [
  ['§1', '民事：法律 → 習慣 → 法理'], ['§2', '習慣不背於公序良俗'], ['§12', '滿 18 歲為成年'], ['§13', '未滿 7 歲無行為能力；7 歲以上未成年人限制行為能力'], ['§15', '受監護宣告之人無行為能力'], ['§15-2', '受輔助宣告：重要行為需輔助人同意'], ['§16', '權利能力、行為能力不得拋棄'], ['§17', '自由不得拋棄；限制不得背公序良俗'],
  ['§68', '從物；主物之處分及於從物'], ['§71–74', '標的合法妥當'], ['§75–85', '行為能力'], ['§86–98', '意思表示'], ['§95', '非對話意思表示：到達時生效'], ['§124 II', '推定 7/1 出生；知月不知日推定 15 日'],
  ['§148', '權利行使不得違反公益、不得以損害他人為主要目的'], ['§149', '正當防衛'], ['§150', '緊急避難'], ['§151–152', '自助行為'],
  ['§153', '意思一致契約成立；必要之點一致推定成立'], ['§154', '要約拘束力；標價陳列視為要約、價目表寄送不視為要約'], ['§155', '要約經拒絕失其拘束力'], ['§156', '對話要約非立時承諾失效'], ['§157', '非對話要約，可期待期間內未承諾失效'], ['§158', '定有承諾期限，逾期失效'], ['§159', '承諾通知遲到 → 應即發遲到通知，怠於通知視為未遲到'], ['§160', '遲到之承諾視為新要約；變更承諾視為拒絕原要約而為新要約'], ['§161', '意思實現'], ['§162', '撤回要約通知遲到'], ['§163', '承諾之撤回準用 §162'],
  ['§172', '無因管理定義'], ['§173', '通知義務；準用 §540–542'], ['§174', '違反本人意思 → 無過失亦應賠償；II 例外'], ['§175', '急迫危險：除惡意重大過失外不負責'], ['§176', '適法無因管理：費用＋利息、清償債務、賠償損害'], ['§177', '不適法管理：以所得利益為限；II 不法管理準用'], ['§178', '本人承認 → 溯及適用委任'],
  ['§179', '不當得利'], ['§180 ④', '不法原因給付不得請求返還'], ['§184 I 前', '故意過失侵害權利'], ['§184 I 後', '故意以背於善良風俗方法加損害'], ['§184 II', '違反保護他人之法律，推定過失'], ['§187', '無/限制行為能力人侵權與法定代理人責任'], ['§190', '動物占有人（推定過失）'], ['§191', '工作物所有人（推定過失）'], ['§191-1', '商品製造人（推定過失、因果）'], ['§191-2', '動力車輛駕駛人（推定過失）'], ['§191-3', '一般危險責任（推定過失、因果）'],
  ['§199', '債權人得請求給付；給付不限財產價格；不作為亦得為給付'], ['§207', '禁止複利（商業習慣例外）'], ['§217', '與有過失'], ['§221', '無/限制行為能力債務人責任依 §187'], ['§227 II', '加害給付'], ['§227-1', '債務不履行侵害人格權'], ['§245-1', '締約過失，2 年時效'], ['§1064', '生父母結婚 → 視為婚生子女'], ['消保 §20', '未經要約寄送商品：不負保管義務；逾 1 個月視為拋棄'], ['法組 §57-1', '無全文判例停止適用（2018/12/7）']
];

function cardHTML(c, subj) {
  const done = !!ST.done[c.id];
  let fig = '';
  if (c.fig) fig = c.fig.startsWith('w:') ? `<div class="wmount" data-w="${c.fig.slice(2)}"></div>` : (FIGS[c.fig] ? `<figure>${FIGS[c.fig]()}</figure>` : '');
  return `<article class="card${done ? ' done' : ''}" id="c-${c.id}" data-search="${esc((c.t + ' ' + (c.en || '') + ' ' + c.plain + ' ' + c.life + ' ' + strip(c.body || '')).toLowerCase())}">
    <header><h4>${c.t}</h4>${c.en ? `<span class="en">${c.en}</span>` : ''}</header>
    <div class="duo"><div class="plain"><span class="lbl">白話</span><p>${c.plain}</p></div><div class="life"><span class="lbl">生活比喻</span><p>${c.life}</p></div></div>
    ${fig}
    <details${done ? '' : ' open'}><summary>完整重點</summary><div class="body">${c.body || ''}</div>
    ${c.terms ? `<dl class="terms">${c.terms.map(t => `<dt>${t[0]}</dt><dd>${t[1]}</dd>`).join('')}</dl>` : ''}</details>
    <label class="chk"><input type="checkbox" data-done="${c.id}"${done ? ' checked' : ''}> 我懂了，可以講給別人聽</label>
  </article>`;
}

function subjCards(s) { return s.sections.reduce((a, x) => a.concat(x.cards), []); }

function renderLearn(key, root) {
  const s = DATA[key];
  root.innerHTML = `<div class="learn"><nav class="toc" aria-label="章節">${s.sections.map(x => `<a href="#sec-${x.id}">${x.t}<span class="cnt" data-sec="${x.id}"></span></a>`).join('')}</nav>
    <div class="cards"><div class="searchbar"><input type="search" id="q-${key}" placeholder="搜尋名詞或關鍵字（例：基差、要約、BCG）" aria-label="搜尋"></div>
    ${s.sections.map(x => `<section class="sec" id="sec-${x.id}"><h3>${x.t}</h3>${x.cards.map(c => cardHTML(c, key)).join('')}</section>`).join('')}
    ${key === 'law' ? `<section class="sec" id="sec-art"><h3>條文速記表</h3><p class="sm-p">選擇題常考「第幾條」。點一下遮住右欄自我測驗。</p><button class="btn ghost" id="arthide" type="button">遮住內容</button><div class="tblwrap"><table class="tbl arts">${LAWART.map(a => `<tr><td><b>${a[0]}</b></td><td class="artc">${a[1]}</td></tr>`).join('')}</table></div></section>` : ''}
    </div></div>`;
  $$('.wmount', root).forEach(m => WIDGETS[m.dataset.w] && WIDGETS[m.dataset.w](m));
  $$('[data-done]', root).forEach(cb => cb.addEventListener('change', () => { ST.done[cb.dataset.done] = cb.checked; if (!cb.checked) delete ST.done[cb.dataset.done]; save(); cb.closest('.card').classList.toggle('done', cb.checked); updateCounts(); }));
  const q = $('#q-' + key, root);
  q.addEventListener('input', () => { const v = q.value.trim().toLowerCase(); $$('.card', root).forEach(c => c.hidden = v && !c.dataset.search.includes(v)); $$('.sec', root).forEach(sec => sec.hidden = v && !$$('.card', sec).some(c => !c.hidden)); });
  const ah = $('#arthide', root); if (ah) ah.addEventListener('click', () => { const t = root.querySelector('.arts'); t.classList.toggle('masked'); ah.textContent = t.classList.contains('masked') ? '顯示內容' : '遮住內容'; });
  $$('.arts tr', root).forEach(tr => tr.addEventListener('click', () => tr.classList.toggle('peek')));
  updateCounts();
}

function updateCounts() {
  ORDER.forEach(k => {
    const s = DATA[k]; const all = subjCards(s); const d = all.filter(c => ST.done[c.id]).length;
    $$(`[data-prog="${k}"]`).forEach(e => { e.style.setProperty('--p', (d / all.length * 100).toFixed(1) + '%'); e.title = `${d}/${all.length}`; });
    $$(`[data-progt="${k}"]`).forEach(e => e.textContent = `${d}/${all.length}`);
    s.sections.forEach(x => $$(`[data-sec="${x.id}"]`).forEach(e => e.textContent = `${x.cards.filter(c => ST.done[c.id]).length}/${x.cards.length}`));
  });
}

// ---- MCQ ----
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }
function renderMCQ(key, root) {
  const bank = DATA[key].mcq.map((m, i) => Object.assign({ i }, m));
  root.innerHTML = `<div class="quizbar"><span class="sm-p">題庫 ${bank.length} 題</span><button class="btn" data-m="10" type="button">隨機 10 題</button><button class="btn" data-m="all" type="button">全部（亂序）</button><button class="btn ghost" data-m="wrong" type="button">只練錯題 <span class="wc"></span></button></div><div class="quiz"></div>`;
  const wc = () => { const w = (ST.wrong[key] || []).length; $('.wc', root).textContent = `(${w})`; };
  wc();
  const start = mode => {
    let list = mode === 'wrong' ? bank.filter(b => (ST.wrong[key] || []).includes(b.i)) : shuffle(bank);
    if (mode === '10') list = list.slice(0, 10);
    if (!list.length) { $('.quiz', root).innerHTML = '<p class="empty">目前沒有錯題。先做一輪隨機 10 題吧。</p>'; return; }
    let idx = 0, score = 0;
    const show = () => {
      if (idx >= list.length) { $('.quiz', root).innerHTML = `<div class="result"><p class="big">${score} / ${list.length}</p><p>${score === list.length ? '全對！' : '答錯的題目已加入錯題本。'}</p><button class="btn" type="button" id="again">再來一輪</button></div>`; $('#again', root).onclick = () => start(mode); wc(); return; }
      const m = list[idx]; const ord = shuffle(m.o.map((t, j) => [t, j]));
      $('.quiz', root).innerHTML = `<div class="qcard"><div class="qmeta">第 ${idx + 1} / ${list.length} 題　得分 ${score}</div><p class="qtext">${m.q}</p><div class="opts">${ord.map(o => `<button class="opt" data-j="${o[1]}" type="button">${o[0]}</button>`).join('')}</div><div class="exp" hidden></div><button class="btn next" type="button" hidden>下一題</button></div>`;
      $$('.opt', root).forEach(b => b.onclick = () => {
        const ok = +b.dataset.j === m.a; $$('.opt', root).forEach(x => { x.disabled = true; if (+x.dataset.j === m.a) x.classList.add('right'); }); if (!ok) b.classList.add('wrongc');
        const w = new Set(ST.wrong[key] || []); if (ok) { score++; if (mode === 'wrong') w.delete(m.i); } else w.add(m.i); ST.wrong[key] = [...w]; save();
        const e = $('.exp', root); e.hidden = false; e.innerHTML = `<b>${ok ? '答對' : '答錯'}</b>　${m.e || ''}`; const n = $('.next', root); n.hidden = false; n.focus(); n.onclick = () => { idx++; show(); };
      });
    };
    show();
  };
  $$('[data-m]', root).forEach(b => b.onclick = () => start(b.dataset.m));
  start('10');
}

// ---- Textbook problems ----
function renderProblems(root) {
  const P = DATA.deriv.problems;
  root.innerHTML = `<div class="quizbar"><button class="btn on" data-f="all" type="button">全部</button><button class="btn" data-f="課本" type="button">老師勾選（11版）</button><button class="btn" data-f="類題" type="button">課本類似題</button></div><div class="plist">${P.map(p => `<div class="prob" data-l="${p.lvl}"><div class="psrc"><span class="pill ${p.lvl === '課本' ? 'good' : ''}">${p.lvl}</span> ${p.src}</div><p class="qtext">${p.q}</p><ol class="steps">${p.steps.map(s => `<li hidden>${s}</li>`).join('')}</ol><p class="ans" hidden><b>答：</b>${p.ans}</p><div class="pbtn"><button class="btn ghost hint" type="button">下一步提示</button><button class="btn ghost reveal" type="button">看完整解答</button></div></div>`).join('')}</div>`;
  $$('.prob', root).forEach(pb => {
    const steps = $$('.steps li', pb);
    $('.hint', pb).onclick = () => { const h = steps.find(s => s.hidden); if (h) h.hidden = false; else $('.ans', pb).hidden = false; };
    $('.reveal', pb).onclick = () => { steps.forEach(s => s.hidden = false); $('.ans', pb).hidden = false; };
  });
  $$('[data-f]', root).forEach(b => b.onclick = () => { $$('[data-f]', root).forEach(x => x.classList.toggle('on', x === b)); $$('.prob', root).forEach(p => p.hidden = b.dataset.f !== 'all' && p.dataset.l !== b.dataset.f); });
}

// ---- Generators ----
function renderGens(root) {
  const G = DATA.deriv.gens;
  root.innerHTML = `<p class="sm-p">每按一次都會換新的數字。題型對應老師勾選的習題，「進階」是更難的延伸版。小考可開書，但考試時間有限，這裡練的是速度與正確率。</p><div class="quizbar"><label>題型 <select id="gsel"><option value="rand">隨機題型</option>${G.map(g => `<option value="${g.id}">${g.t}（${g.base}）</option>`).join('')}</select></label><button class="btn" id="gnew" type="button">出一題</button><span class="sm-p" id="gscore"></span></div><div id="gbox"></div>`;
  let ok = 0, tot = 0;
  const make = () => {
    const sel = $('#gsel', root).value; const g = sel === 'rand' ? pick(G) : G.find(x => x.id === sel); const p = g.make();
    $('#gbox', root).innerHTML = `<div class="qcard"><div class="qmeta">${g.t}　<span class="pill">對應 ${g.base}</span></div><p class="qtext">${p.q}</p><div class="ansrow"><input type="text" inputmode="decimal" id="gin" placeholder="輸入數字" aria-label="你的答案"><span class="unit">${p.unit || ''}</span><button class="btn" id="gchk" type="button">對答案</button><button class="btn ghost" id="gshow" type="button">直接看解法</button></div><div class="exp" hidden></div></div>`;
    const showSol = (msg) => { const e = $('.exp', root); e.hidden = false; e.innerHTML = (msg || '') + `<ol class="steps">${p.sol.map(s => `<li>${s}</li>`).join('')}</ol><p>正解：<b>${f2(p.ans, 4)}</b></p>`; };
    $('#gchk', root).onclick = () => { const v = parseFloat($('#gin', root).value.replace(/,/g, '')); if (isNaN(v)) return; tot++; const good = Math.abs(v - p.ans) <= Math.max(p.tol, Math.abs(p.ans) * 0.002); if (good) ok++; $('#gscore', root).textContent = `本次答對 ${ok}/${tot}`; showSol(`<b>${good ? '答對' : '再檢查一下'}</b>`); };
    $('#gin', root).addEventListener('keydown', e => { if (e.key === 'Enter') $('#gchk', root).click(); });
    $('#gshow', root).onclick = () => showSol('');
  };
  $('#gnew', root).onclick = make; make();
}

// ---- Flashcards (投資學講義問題) ----
function renderFlash(root) {
  const F = DATA.invest.flash;
  root.innerHTML = `<p class="sm-p">講義上每一個「問題」都在這裡（共 ${F.length} 題）。先自己講出答案，再點卡片翻面核對。</p><div class="quizbar"><button class="btn" id="fshuf" type="button">打亂順序</button><button class="btn ghost" id="fall" type="button">全部翻開</button></div><div class="flashlist"></div>`;
  const draw = list => { $('.flashlist', root).innerHTML = list.map((f, i) => `<button class="fcard" type="button"><span class="fq"><span class="num">${i + 1}</span>${f.q}</span><span class="fa">${f.a}</span></button>`).join(''); $$('.fcard', root).forEach(c => c.onclick = () => c.classList.toggle('on')); };
  draw(F); $('#fshuf', root).onclick = () => draw(shuffle(F)); $('#fall', root).onclick = () => $$('.fcard', root).forEach(c => c.classList.add('on'));
}

// ---- Essay grading (管理學) ----
function renderEssay(root) {
  const E = DATA.mgmt.essays;
  root.innerHTML = `<div class="essay"><div class="estep"><span class="n">1</span><div><label for="esel" class="lblb">選題目</label><select id="esel">${E.map((e, i) => `<option value="${i}">[${e.ch}] ${e.q.slice(0, 40)}…</option>`).join('')}<option value="custom">自訂題目（例如老師上課出的題）</option></select><p class="qtext" id="eq"></p><textarea id="ecustom" rows="3" placeholder="貼上題目" hidden></textarea><details class="rub"><summary>看評分要點（先別偷看，寫完再看）</summary><ul id="epts"></ul></details></div></div>
    <div class="estep"><span class="n">2</span><div><span class="lblb">手寫作答後拍照上傳</span><label class="drop" id="edrop"><input type="file" id="efile" accept="image/jpeg,image/png,image/webp,image/gif" multiple><span>點這裡選照片，或拖曳照片進來（可多張）</span></label><div class="thumbs" id="ethumbs"></div><details><summary>沒有手寫？也可以直接打字</summary><textarea id="etext" rows="6" placeholder="打字作答"></textarea></details></div></div>
    <div class="estep"><span class="n">3</span><div><button class="btn big" id="ego" type="button">請 Claude 批改</button><button class="btn ghost" id="estop" type="button" hidden>停止</button><p class="sm-p" id="enote"></p><div class="feedback" id="eout"></div></div></div></div>`;
  let files = [];
  const sel = $('#esel', root);
  const syncQ = () => { const c = sel.value === 'custom'; $('#ecustom', root).hidden = !c; $('#eq', root).textContent = c ? '' : E[+sel.value].q; $('#epts', root).innerHTML = c ? '<li>自訂題目沒有預設要點，Claude 會依課本內容判斷。</li>' : E[+sel.value].pts.map(p => `<li>${p}</li>`).join(''); };
  sel.onchange = syncQ; syncQ();
  const addFiles = fl => { [...fl].forEach(f => { if (/^image\//.test(f.type)) files.push(f); }); drawThumbs(); };
  const drawThumbs = () => { $('#ethumbs', root).innerHTML = files.map((f, i) => `<figure class="th"><img alt="作答照片 ${i + 1}" src="${URL.createObjectURL(f)}"><button type="button" data-x="${i}" aria-label="移除">×</button></figure>`).join(''); $$('[data-x]', root).forEach(b => b.onclick = () => { files.splice(+b.dataset.x, 1); drawThumbs(); }); };
  $('#efile', root).onchange = e => addFiles(e.target.files);
  const dz = $('#edrop', root); dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('over'); }); dz.addEventListener('dragleave', () => dz.classList.remove('over')); dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('over'); addFiles(e.dataTransfer.files); });
  const note = $('#enote', root), out = $('#eout', root), go = $('#ego', root), stop = $('#estop', root);
  let sample = null, lim = null, ctl = null;
  note.textContent = '連線中…';
  (async () => {
    try { sample = window.claude ? await window.claude.use('sample') : null; } catch (e) { sample = null; }
    if (!sample) { note.innerHTML = '這個檢視無法使用 AI 批改（需要在 claude.ai 登入後開啟）。你也可以把手寫照片直接傳到對話裡請 Claude 批改。'; go.disabled = true; return; }
    try { lim = await sample.limits(); } catch (e) { lim = null; }
    note.textContent = lim && lim.images ? `可上傳最多 ${lim.images.maxCount} 張照片。第一次使用會詢問你是否允許。` : '此檢視只能批改打字作答（無法傳送圖片）。';
    if (!(lim && lim.images)) $('#edrop', root).hidden = true;
  })();
  stop.onclick = () => ctl && ctl.abort();
  go.onclick = async () => {
    if (!sample) return;
    const q = sel.value === 'custom' ? $('#ecustom', root).value.trim() : E[+sel.value].q;
    const pts = sel.value === 'custom' ? [] : E[+sel.value].pts;
    const typed = $('#etext', root).value.trim();
    if (!q) { note.textContent = '請先輸入題目。'; return; }
    if (!files.length && !typed) { note.textContent = '請上傳作答照片或打字作答。'; return; }
    const ch = sel.value === 'custom' ? null : E[+sel.value].ch;
    const ref = DATA.mgmt.sections.filter(s => !ch || s.t.startsWith(ch)).map(s => s.t + '\n' + s.cards.map(c => c.t + '：' + c.plain + ' ' + strip(c.body)).join('\n')).join('\n\n').slice(0, 14000);
    const imgs = lim && lim.images ? files.slice(0, lim.images.maxCount) : [];
    const prompt = `你是大學「管理學」（Robbins & Coulter《Management》）的助教，請用繁體中文批改學生的申論題作答。\n\n【題目】\n${q}\n\n${pts.length ? '【評分要點】\n' + pts.map((p, i) => (i + 1) + '. ' + p).join('\n') + '\n\n' : ''}【課程講義重點（供你核對內容正確性）】\n${ref}\n\n【學生作答】\n${imgs.length ? `附上 ${imgs.length} 張手寫作答照片，請先辨識內容。` : ''}${typed ? '\n打字部分：\n' + typed : ''}\n\n請依下列格式回覆（使用 Markdown 標題與條列）：\n## 辨識出的作答內容\n（若有照片，簡短轉錄；看不清楚的地方標註「(難辨識)」）\n## 分數\n滿分 10 分，給出分數與一句話總評。\n## 逐項評分\n依評分要點逐條說明：有寫到／部分／缺漏，並指出觀念錯誤。\n## 漏掉的關鍵字\n列出應出現的英文專有名詞與中文。\n## 參考答案架構\n用條列寫出一份高分答案的骨架（含定義、比較、例子）。\n## 下次怎麼寫更好\n2–3 點具體建議（結構、舉例、時間分配）。`;
    out.innerHTML = '<p class="thinking">批改中…（看照片與思考可能要 30–90 秒）</p>'; go.disabled = true; stop.hidden = false; ctl = new AbortController();
    try {
      const opt = { signal: ctl.signal, cache: false, onText: ({ text }) => { out.innerHTML = md(text); } };
      if (imgs.length) opt.images = imgs;
      const r = await sample(prompt, opt); out.innerHTML = md(r.text); if (r.truncated) note.textContent = '回覆被截斷，可以縮短作答或分段再試。';
    } catch (e) {
      out.innerHTML = e && e.text ? md(e.text) : '';
      const msg = { not_granted: '你沒有允許這個頁面使用 Claude，所以無法批改。', rate_limited: '用量太頻繁，請稍後再試。', image_rejected: '照片格式或大小不符，請換一張（JPG/PNG）。', images_unavailable: '這個檢視無法傳送圖片，請改用打字作答。', cancelled: '已停止。', session_expired: '登入已過期，請重新登入 claude.ai。', refused: '這次無法批改，請調整內容後再試。' }[e && e.code] || '批改時發生錯誤，可以再按一次。';
      note.textContent = msg;
    } finally { go.disabled = false; stop.hidden = true; }
  };
}
function md(t) {
  const L = esc(t).split('\n'); let o = '', inl = false; const close = () => { if (inl) { o += '</ul>'; inl = false; } };
  for (const raw of L) {
    const l = raw.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    if (/^#{1,4}\s/.test(l)) { close(); o += '<h4>' + l.replace(/^#+\s/, '') + '</h4>'; }
    else if (/^\s*([-*•]|\d+[.)])\s/.test(l)) { if (!inl) { o += '<ul>'; inl = true; } o += '<li>' + l.replace(/^\s*([-*•]|\d+[.)])\s/, '') + '</li>'; }
    else if (!l.trim()) close();
    else { close(); o += '<p>' + l + '</p>'; }
  }
  close(); return o;
}

// ---- Overview ----
function renderHome(root) {
  root.innerHTML = `<div class="home"><div class="hero"><h2>26 秋季 期中複習</h2><p>四科的講義我都讀過並整理成卡片。每張卡片都有<b>白話解釋</b>、<b>生活比喻</b>，重要觀念配圖或互動工具。勾選「我懂了」會記錄進度（只存在這台裝置的瀏覽器）。</p></div>
    <div class="subjgrid">${ORDER.map(k => { const s = DATA[k]; const n = subjCards(s).length; const extra = k === 'deriv' ? `${s.problems.length} 題課本與類題、${s.gens.length} 種隨機變化題、${s.mcq.length} 題觀念選擇題` : k === 'invest' ? `${s.flash.length} 題講義問題翻卡、${s.mcq.length} 題選擇題` : k === 'law' ? `${s.mcq.length} 題選擇題、${LAWART.length} 條條文速記` : `${s.essays.length} 題申論（拍照批改）、${s.mcq.length} 題選擇題`; return `<button class="sg ${s.hue}" data-go="${k}" type="button"><span class="sgn">${s.full}</span><span class="sgm">${n} 個知識點 · ${extra}</span><span class="bar" data-prog="${k}"><i></i></span><span class="sgp" data-progt="${k}"></span><span class="sgi">${s.intro}</span></button>`; }).join('')}</div>
    <div class="dates"><h3>考試日程（依課程大綱）</h3><ul><li><b>管理學期中</b>：11/4（第 9 週）· 期末 12/23</li><li><b>衍金期中</b>：2026/11/16 · 期末 12/21 · A4 手抄小抄＋計算機</li><li><b>衍金小考</b>：每單元結束後勾選習題，隔週考其中一題或類題（可開書）</li></ul></div></div>`;
  $$('[data-go]', root).forEach(b => b.onclick = () => go(b.dataset.go));
  updateCounts();
}

// ---- Routing ----
const PANES = {
  deriv: [['learn', '知識點'], ['prob', '課本習題＋類題'], ['gen', '變化題（隨機）'], ['mcq', '觀念選擇題']],
  invest: [['learn', '知識點'], ['flash', '講義問題'], ['mcq', '選擇題']],
  law: [['learn', '知識點＋條文'], ['mcq', '選擇題']],
  mgmt: [['learn', '知識點'], ['essay', '申論批改'], ['mcq', '選擇題']]
};
function go(k, tab) {
  ST.subj = k; save();
  $$('.stab').forEach(b => b.setAttribute('aria-current', b.dataset.s === k ? 'page' : 'false'));
  document.body.dataset.subj = k;
  const main = $('#main');
  if (k === 'home') { renderHome(main); window.scrollTo(0, 0); return; }
  const s = DATA[k]; tab = tab || ST.tab[k] || 'learn';
  main.innerHTML = `<div class="shead"><div><h2>${s.full}</h2><p class="intro">${s.intro}</p></div><div class="prog"><span class="bar" data-prog="${k}"><i></i></span><span data-progt="${k}"></span> 已掌握</div></div><div class="ptabs" role="tablist">${PANES[k].map(p => `<button role="tab" class="ptab" data-p="${p[0]}" aria-selected="${p[0] === tab}" type="button">${p[1]}</button>`).join('')}</div><div id="pane"></div>`;
  $$('.ptab', main).forEach(b => b.onclick = () => go(k, b.dataset.p));
  ST.tab[k] = tab; save();
  const pane = $('#pane');
  ({ learn: () => renderLearn(k, pane), mcq: () => renderMCQ(k, pane), prob: () => renderProblems(pane), gen: () => renderGens(pane), flash: () => renderFlash(pane), essay: () => renderEssay(pane) })[tab]();
  updateCounts();
}

function boot() {
  $('#stabs').innerHTML = `<button class="stab home" data-s="home" type="button">總覽</button>` + ORDER.map(k => `<button class="stab ${DATA[k].hue}" data-s="${k}" type="button">${DATA[k].name}<span class="bar mini" data-prog="${k}"><i></i></span></button>`).join('');
  $$('.stab').forEach(b => b.onclick = () => go(b.dataset.s));
  const h = (location.hash || '').slice(1);
  go(ORDER.includes(h) || h === 'home' ? h : (ST.subj || 'home'));
}
boot();
