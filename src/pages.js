// ===== 設定頁、里程碑頁 =====
const PREF_KEYS = ['lang', 'sound', 'theme', 'zoom', 'calm', 'notips', 'plan'];
function applyPrefs() {
  const r = document.documentElement;
  if (ST.theme === 'light' || ST.theme === 'dark') r.dataset.theme = ST.theme;
  else if (ST._themeSet) delete r.dataset.theme;
  document.body.style.setProperty('--zoom', ST.zoom || 1);
  document.body.classList.toggle('calm', !!ST.calm);
  document.body.classList.toggle('notips', !!ST.notips);
}
function stat(key, field, n = 1) { ST.stats = ST.stats || {}; const s = ST.stats[key] = ST.stats[key] || {}; s[field] = (s[field] || 0) + n; save(); }

// 兩段式確認按鈕：第一次按變成「確定？」，3 秒內再按才執行
function armed(btn, label, run) {
  let t; btn.onclick = () => {
    if (btn.dataset.armed) { clearTimeout(t); delete btn.dataset.armed; btn.textContent = label; run(); return; }
    btn.dataset.armed = 1; btn.textContent = '確定嗎？再按一次'; btn.classList.add('danger-on');
    t = setTimeout(() => { delete btn.dataset.armed; btn.textContent = label; btn.classList.remove('danger-on'); }, 3000);
  };
}

function renderSettings(root) {
  const seg = (name, opts, cur) => `<div class="seg" role="group" aria-label="${name}">${opts.map(o => `<button type="button" data-set="${name}" data-v="${o[0]}" aria-pressed="${String(cur) === String(o[0])}">${o[1]}</button>`).join('')}</div>`;
  const doneN = Object.keys(ST.done).filter(k => !k.startsWith('P')).length;
  const wrongN = Object.values(ST.wrong2 || {}).reduce((a, x) => a + x.length, 0);
  root.innerHTML = `<div class="pagehead"><h2>設定</h2><p class="intro">調整成你最舒服的樣子。所有設定和紀錄只存在這台裝置的瀏覽器裡。</p></div>
  <div class="setgrid">
    <section class="setbox"><h3>外觀</h3>
      <div class="row"><span>主題</span>${seg('theme', [['system', '跟著系統'], ['light', '淺色'], ['dark', '深色']], ST.theme || 'system')}</div>
      <div class="row"><span>字體大小</span>${seg('zoom', [['0.9', '小'], ['1', '中'], ['1.12', '大'], ['1.25', '特大']], ST.zoom || 1)}</div>
      <div class="row"><span>動畫與彩帶</span>${seg('calm', [['false', '開'], ['true', '關']], !!ST.calm)}</div>
      <div class="row"><span>豬豬老師的小提示</span>${seg('notips', [['false', '顯示'], ['true', '隱藏']], !!ST.notips)}</div>
    </section>
    <section class="setbox"><h3>學習</h3>
      <div class="row"><span>題目語言（衍金、管理學）</span>${seg('lang', [['zh', '中文'], ['both', '雙語'], ['en', 'English']], ST.lang)}</div>
      <div class="row"><span>音效</span>${seg('sound', [['true', '開'], ['false', '關']], !!ST.sound)}</div>
    </section>
    <section class="setbox"><h3>備份與搬家</h3><p class="sm-p">手機和電腦的紀錄是分開的。在一台按「複製備份碼」，到另一台貼上後按「匯入」，進度就搬過去了。</p>
      <div class="row wrap"><button class="btn" id="bkcopy" type="button">複製備份碼</button><span class="sm-p" id="bkmsg"></span></div>
      <textarea id="bktext" rows="3" placeholder="把備份碼貼在這裡" aria-label="備份碼"></textarea>
      <div class="row wrap"><button class="btn ghost" id="bkload" type="button">匯入（會覆蓋目前紀錄）</button></div>
    </section>
    <section class="setbox danger"><h3>清除紀錄</h3><p class="sm-p">按一次會問你「確定嗎？」，3 秒內再按一次才會真的清除，不能復原。</p>
      <div class="clr"><div><b>錯題本</b><span>${wrongN} 題</span></div><button class="btn warn" id="clrwrong" type="button">清除錯題本</button></div>
      <div class="clr"><div><b>「我懂了」勾選</b><span>${doneN} 張卡（會一起扣回 ${doneN * 10} XP）</span></div><button class="btn warn" id="clrdone" type="button">清除勾選</button></div>
      <div class="clr"><div><b>遊戲紀錄</b><span>最佳時間、限時賽分數、答題統計</span></div><button class="btn warn" id="clrbest" type="button">清除遊戲紀錄</button></div>
      <div class="clr"><div><b>全部重新開始</b><span>XP、等級、徽章、連續天數、所有紀錄（保留設定）</span></div><button class="btn warn" id="clrall" type="button">全部重設</button></div>
    </section>
  </div>`;
  $$('[data-set]', root).forEach(b => b.onclick = () => {
    const k = b.dataset.set, v = b.dataset.v;
    ST[k] = v === 'true' ? true : v === 'false' ? false : (k === 'zoom' ? +v : v);
    if (k === 'theme') ST._themeSet = true;
    save(); applyPrefs(); FUN.hud(); renderSettings(root); FUN.beep('ok');
  });
  $('#bkcopy', root).onclick = async () => {
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(ST))));
    const t = $('#bktext', root); t.value = code;
    try { await navigator.clipboard.writeText(code); $('#bkmsg', root).textContent = '已複製！貼到另一台裝置吧。'; }
    catch (e) { t.select(); $('#bkmsg', root).textContent = '請手動複製下面框框裡的文字（已幫你選取）。'; }
  };
  armed($('#bkload', root), '匯入（會覆蓋目前紀錄）', () => {
    try { const v = JSON.parse(decodeURIComponent(escape(atob($('#bktext', root).value.trim())))); if (typeof v !== 'object' || !v.done) throw 0; ST = Object.assign({ done: {}, wrong2: {}, tab: {}, best: {} }, v); FUN.init(); save(); applyPrefs(); FUN.hud(); FUN.toast('匯入成功！', 'wow'); renderSettings(root); }
    catch (e) { $('#bkmsg', root).textContent = '備份碼看起來不完整，請重新複製一次。'; }
  });
  armed($('#clrwrong', root), '清除錯題本', () => { ST.wrong2 = {}; save(); FUN.toast('錯題本清空了', 'happy'); renderSettings(root); });
  armed($('#clrdone', root), '清除勾選', () => { const n = Object.keys(ST.done).length; ST.done = {}; ST.xp = Math.max(0, ST.xp - n * 10); save(); FUN.hud(); updateCounts(); FUN.toast(`清除 ${n} 個勾選，XP 已扣回`, 'sad'); renderSettings(root); });
  armed($('#clrbest', root), '清除遊戲紀錄', () => { ST.best = {}; ST.stats = {}; ST.genOk = 0; save(); FUN.toast('遊戲紀錄清空了', 'happy'); renderSettings(root); });
  armed($('#clrall', root), '全部重設', () => { const keep = {}; PREF_KEYS.forEach(k => keep[k] = ST[k]); ST = Object.assign({ done: {}, wrong2: {}, subj: 'home', tab: {}, best: {} }, keep); FUN.init(); save(); FUN.hud(); updateCounts(); FUN.toast('全部重新開始！一起加油', 'wow'); renderSettings(root); });
}

function renderMilestones(root) {
  const lv = FUN.level(), xp = ST.xp; const st = ST.stats || {};
  const days = new Set(ST.days || []); const cal = []; const d = new Date(); d.setDate(d.getDate() - 27);
  for (let i = 0; i < 28; i++) { const k = d.toISOString().slice(0, 10); cal.push([k, days.has(k), d.getDate()]); d.setDate(d.getDate() + 1); }
  const got = BADGES.filter(b => ST.badges[b[0]]).length;
  root.innerHTML = `<div class="pagehead"><h2>里程碑</h2><p class="intro">看看你已經走了多遠。</p></div>
  <section class="msbox"><h3>升級之路</h3><p class="sm-p">每 100 XP 升一級。現在 <b>Lv.${lv}</b>，${xp} XP，下一級還差 ${100 - xp % 100} XP。</p>
    <ol class="road">${TITLES.map((t, i) => `<li class="${i + 1 < lv ? 'past' : i + 1 === lv ? 'now' : ''}"><span class="stop">${i + 1 === lv ? PIG('happy', 40) : `<b>${i + 1}</b>`}</span><span class="tw"><span class="tn">${t}</span><span class="tx">${i * 100} XP</span></span></li>`).join('')}</ol></section>
  <section class="msbox"><h3>連續天數 · ${FUN.streak()} 天</h3><p class="sm-p">最近 4 週，有打開複習的日子會亮起來。</p><div class="cal">${cal.map(c => `<span class="${c[1] ? 'on' : ''}" title="${c[0]}">${c[2]}</span>`).join('')}</div></section>
  <section class="msbox"><h3>各科進度</h3><div class="msgrid">${ORDER.concat('cfa').map(k => { const s = DATA[k]; const all = subjCards(s); const dn = all.filter(c => ST.done[c.id]).length; const x = st[k] || {}; const rate = x.a ? Math.round((x.c || 0) / x.a * 100) : 0; return `<div class="mscard ${s.hue}"><b class="msn">${s.full}</b><span class="bar" style="--p:${dn / all.length * 100}%"><i></i></span><dl><dt>知識點</dt><dd>${dn} / ${all.length}</dd><dt>答題</dt><dd>${x.a || 0} 題，答對率 ${rate}%</dd><dt>打怪勝利</dt><dd>${x.boss || 0} 次</dd><dt>限時賽最佳</dt><dd>${ST.best['sp' + k] || 0} 題</dd><dt>配對最快</dt><dd>${ST.best['m' + k] ? ST.best['m' + k] + ' 秒' : '—'}</dd></dl></div>`; }).join('')}</div>${ST.genOk ? `<p class="sm-p">衍金變化題累計答對 <b>${ST.genOk}</b> 題。</p>` : ''}</section>
  <section class="msbox"><h3>徽章牆 · ${got} / ${BADGES.length}</h3><div class="badges">${BADGES.map(b => `<div class="badge${ST.badges[b[0]] ? ' got' : ''}" title="${b[2]}"><span class="medal"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="22" r="14" class="md"/><path d="M14,4 L20,12 L26,4" class="mr"/><text x="20" y="27" text-anchor="middle" class="mt2">★</text></svg></span><b>${b[1]}</b><small>${b[2]}</small>${ST.badges[b[0]] ? `<small class="when">${new Date(ST.badges[b[0]]).toLocaleDateString('zh-TW')}</small>` : ''}</div>`).join('')}</div></section>`;
}
