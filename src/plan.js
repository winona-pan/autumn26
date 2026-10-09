// ===== 讀書進度表：依期中考先後，把各科還沒掌握的內容排進每一天 =====
const PLAN_K = ['mgmt', 'deriv', 'invest', 'law', 'basic'];
const PLAN_NAME = { basic: '基礎補給站', deriv: '衍金', invest: '投資學', law: '民商法', mgmt: '管理學' };
const PLAN_MIN = { basic: 12, deriv: 18, invest: 15, law: 15, mgmt: 15 }; // 每張知識卡估計分鐘
const PLAN_FAM = [['熟', 0.6], ['普通', 1], ['不熟', 1.5]];
const planPd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const planPs = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const planToday = () => planPs(new Date());
const planMD = s => { const d = planPd(s); return `${d.getMonth() + 1}/${d.getDate()}（${'日一二三四五六'[d.getDay()]}）`; };
const planH = m => { const h = Math.round(m / 60 * 10) / 10; return h + ' 小時'; };

function planSettings() {
  ST.plan = Object.assign({ start: '', dates: { mgmt: '2026-11-04', deriv: '2026-11-16', invest: '', law: '' }, on: { basic: true, deriv: true, invest: true, law: true, mgmt: true }, fam: {}, wk: [4, 2, 2, 2, 2, 2, 4], off: [], review: 120, mode: 'seq' }, ST.plan || {});
  return ST.plan;
}

// 一科要做的事（依序）：還沒勾「我懂了」的卡片 → 習題 → 公式、講義、條文、申論等固定複習
function planTasks(k, f) {
  const T = [], s = DATA[k], m = PLAN_MIN[k] * f;
  s.sections.forEach(x => x.cards.forEach(c => { if (!ST.done[c.id]) T.push({ k, id: c.id, sec: x.t, t: c.t, min: m, kind: 'c' }); }));
  if (k === 'deriv') DATA.deriv.problems.forEach(p => { if (!ST.done['P' + p.id]) T.push({ k, id: p.id, sec: '課本習題', t: p.src, min: 20 * f, kind: 'x', tab: 'prob' }); });
  if (s.formulas && s.formulas.length) T.push({ k, sec: '公式教室', t: `${s.formulas.length} 個公式：看懂符號、玩計算機`, min: Math.round(s.formulas.length * 8 * f), kind: 'x', tab: 'formula' });
  if (k === 'invest') T.push({ k, sec: '講義問題', t: `講義問題 ${DATA.invest.flash.length} 題，大聲說出答案`, min: Math.round(DATA.invest.flash.length * 3 * f), kind: 'x', tab: 'flash' });
  if (k === 'law') T.push({ k, sec: '條文速記表', t: '條文速記表：遮住內容背條號', min: Math.round(60 * f), kind: 'x', tab: 'learn' });
  if (k === 'mgmt') T.push({ k, sec: '申論批改', t: '英文申論練習 4 題（拍照批改）', min: Math.round(120 * f), kind: 'x', tab: 'essay' });
  return T;
}

function buildPlan() {
  const P = planSettings(), today = planToday(), start = P.start && P.start > today ? P.start : today;
  const subs = PLAN_K.filter(k => k !== 'basic' && P.on[k] && P.dates[k] && P.dates[k] > start).map(k => ({ k, exam: P.dates[k] }));
  if (P.on.basic && subs.length) {
    // 基礎補給站排在衍金、投資學第一場考試的一週前讀完
    const e = ['deriv', 'invest'].filter(k => subs.some(s => s.k === k)).map(k => P.dates[k]).sort()[0] || subs.map(s => s.exam).sort()[0];
    const d = planPd(e); d.setDate(d.getDate() - 7);
    subs.push({ k: 'basic', exam: planPs(d) > planPs(new Date(planPd(start).getTime() + 7 * 864e5)) ? planPs(d) : e, pre: true, real: e });
  }
  subs.sort((a, b) => a.exam < b.exam ? -1 : a.exam > b.exam ? 1 : a.pre ? -1 : 1);
  const last = subs.reduce((m, s) => s.exam > m ? s.exam : m, start);
  const days = [];
  for (let d = planPd(start); planPs(d) < last; d.setDate(d.getDate() + 1)) { const s = planPs(d); days.push({ d: s, cap: P.off.includes(s) ? 0 : Math.round((+P.wk[d.getDay()] || 0) * 60), total: 0, blocks: {} }); }
  const add = (D, k, m, kind) => { const b = D.blocks[k] = D.blocks[k] || { learn: 0, rev: 0 }; b[kind] += m; D.total += m; };
  subs.forEach(s => {
    const f = (PLAN_FAM.find(x => x[0] === (P.fam[s.k] || '普通')) || [0, 1])[1];
    s.tasks = planTasks(s.k, f); s.need = Math.round(s.tasks.reduce((a, t) => a + t.min, 0)); s.left = s.need; s.rev = s.pre ? 0 : +P.review;
  });
  days.forEach(D => D.full = D.cap);
  // 先在考前最後幾天保留總複習時間
  subs.filter(s => s.rev).forEach(s => {
    let r = s.rev;
    for (let i = days.length - 1; i >= 0 && r > 0; i--) { const D = days[i]; if (D.d >= s.exam) continue; const t = Math.min(r, D.cap); if (t > 0) { D.cap -= t; add(D, s.k, t, 'rev'); r -= t; } }
    s.revShort = r;
  });
  // 用每天可讀時間的同一個比例 f 排內容，找出「每科都能在考前讀完」的最小 f，讓每天的量平均
  const base = days.map(D => D.cap);
  const run = f => {
    subs.forEach(s => s.left = s.need);
    days.forEach((D, i) => {
      D.cap = Math.min(base[i], Math.round(base[i] * f / 15) * 15); D.learn = {};
      let cur = null;
      while (D.cap >= 15) {
        const cand = subs.filter(s => s.left > 0 && D.d < s.exam);
        if (!cand.length) break;
        let best = cand[0]; // 一科一科：考試最早的先讀
        if (P.mode === 'mix') {
          // 多科同時：分給「剩下的內容 ÷ 考前剩下的時間」最緊迫的科目，同一天盡量少換科
          cand.forEach(s => { let c = 0; for (let j = i; j < days.length && days[j].d < s.exam; j++) c += j === i ? D.cap : Math.round(base[j] * f / 15) * 15; s.u = s.left / Math.max(c, 1); });
          best = cand.reduce((x, y) => y.u > x.u ? y : x);
          if (cur && cand.includes(cur) && cur.u >= best.u * 0.75) best = cur;
        }
        const t = Math.min(30, D.cap, best.left);
        D.cap -= t; best.left -= t; D.learn[best.k] = (D.learn[best.k] || 0) + t; cur = best;
      }
    });
    return subs.every(s => s.left <= 0);
  };
  let f = 1;
  if (run(1)) { let lo = 0, hi = 1; for (let n = 0; n < 16; n++) { const m = (lo + hi) / 2; run(m) ? hi = m : lo = m; } f = Math.min(1, hi * 1.1); if (!run(f)) run(f = hi); }
  days.forEach(D => Object.entries(D.learn).forEach(([k, m]) => add(D, k, m, 'learn')));
  // 把分到的時間對應到具體的卡片和練習
  subs.forEach(s => {
    let ti = 0, used = 0;
    days.forEach(D => {
      const b = D.blocks[s.k]; if (!b || !b.learn) return;
      let m = b.learn; b.items = [];
      while (m > 0.01 && ti < s.tasks.length) { const t = s.tasks[ti], u = Math.min(t.min - used, m); m -= u; used += u; if (!b.items.includes(t)) b.items.push(t); if (used >= t.min - 0.01) { ti++; used = 0; } }
    });
    s.got = s.need - s.left;
  });
  return { P, start, subs, days };
}

function planBlockHTML(k, b, exam) {
  const groups = []; (b.items || []).forEach(t => { const g = groups.find(x => x.sec === t.sec); g ? g.items.push(t) : groups.push({ sec: t.sec, items: [t] }); });
  return `<div class="pblk ${DATA[k].hue}"><div class="pbh"><b>${PLAN_NAME[k]}</b><span>${planH(b.learn + b.rev)}</span></div>
    ${groups.map(g => `<p><span class="psec">${g.sec}</span>${g.items.map(t => `<button type="button" class="linkish" data-pj="${t.k}|${t.id || ''}|${t.kind}|${t.tab || ''}">${t.t}</button>`).join('、')}</p>`).join('')}
    ${b.rev ? `<p><span class="psec">考前總複習</span><button type="button" class="linkish" data-pj="${k}||x|mcq">打怪模式＋錯題本</button>，再快速翻過所有卡片的「白話」${k === 'deriv' ? '，整理 A4 小抄' : ''}${exam ? `（${planMD(exam)} 考試）` : ''}</p>` : ''}</div>`;
}

function renderPlan(root) {
  const P = planSettings();
  root.innerHTML = `<div class="pagehead"><h2>讀書進度表</h2><p class="intro">依期中考先後，把各科還沒掌握的卡片、習題和公式排進每一天，考前一天留給總複習。卡片勾「我懂了」之後會自動從進度表拿掉，每次打開都會依剩下的內容重新排。</p></div>
  <div class="setgrid">
  <section class="setbox"><h3>1. 期中考日期與熟悉度</h3>
    <div class="plsubs">${PLAN_K.map(k => `<div class="plrow ${DATA[k].hue}"><label class="pln"><input type="checkbox" data-on="${k}"${P.on[k] ? ' checked' : ''}> <b>${PLAN_NAME[k]}</b></label>
      ${k === 'basic' ? '<span class="sm-p pld">不考試，排在衍金、投資學考前一週讀完</span>' : `<label class="pld">期中考 <input type="date" data-date="${k}" value="${P.dates[k] || ''}"></label>`}
      <label>熟悉度 <select data-fam="${k}">${PLAN_FAM.map(f => `<option${(P.fam[k] || '普通') === f[0] ? ' selected' : ''}>${f[0]}</option>`).join('')}</select></label><span class="sm-p">需要 <b data-need="${k}"></b></span></div>`).join('')}</div>
    <p class="sm-p">熟悉度會調整每張卡估計要花的時間：熟 ×0.6、不熟 ×1.5。</p></section>
  <section class="setbox"><h3>2. 每天能讀幾小時</h3>
    <div class="wkrow">${[1, 2, 3, 4, 5, 6, 0].map(i => `<label><span>週${'日一二三四五六'[i]}</span><input type="number" min="0" max="16" step="0.5" data-wk="${i}" value="${P.wk[i]}" inputmode="decimal"></label>`).join('')}</div>
    <div class="row wrap"><label>從哪天開始 <input type="date" id="plstart" value="${P.start || planToday()}"></label>
    <label>排法 <select id="plmode"><option value="seq"${P.mode !== 'mix' ? ' selected' : ''}>一科一科，照考試順序</option><option value="mix"${P.mode === 'mix' ? ' selected' : ''}>多科同時進行</option></select></label>
    <label>每科考前總複習 <select id="plrev">${[60, 120, 180, 240].map(m => `<option value="${m}"${m === +P.review ? ' selected' : ''}>${m / 60} 小時</option>`).join('')}</select></label></div>
    <div class="row wrap"><label>不能讀的日子 <input type="date" id="ploffd"></label><button class="btn ghost" type="button" id="ploffadd">加入</button></div><div id="plofflist" class="offlist"></div></section>
  </div>
  <section class="msbox" id="plsum"></section>
  <section class="msbox"><h3>每日進度</h3><div id="pldays"></div></section>`;

  const draw = () => {
    const R = buildPlan(), today = planToday();
    PLAN_K.forEach(k => { const s = R.subs.find(x => x.k === k), c = $(`[data-need="${k}"]`, root); if (c) c.textContent = s ? planH(s.need + s.rev) : '—'; });
    $('#plofflist', root).innerHTML = P.off.sort().map(d => `<button type="button" class="offchip" data-off="${d}" aria-label="移除 ${d}">${planMD(d)} ✕</button>`).join('');
    $$('[data-off]', root).forEach(b => b.onclick = () => { P.off = P.off.filter(d => d !== b.dataset.off); save(); draw(); });
    const missing = PLAN_K.filter(k => k !== 'basic' && P.on[k] && !P.dates[k]).map(k => PLAN_NAME[k]);
    const past = PLAN_K.filter(k => k !== 'basic' && P.on[k] && P.dates[k] && P.dates[k] <= R.start).map(k => PLAN_NAME[k]);
    const need = R.subs.reduce((a, s) => a + s.need + s.rev, 0), have = R.days.reduce((a, D) => a + D.full, 0);
    $('#plsum', root).innerHTML = `<h3>總覽：照考試先後</h3>
      ${missing.length ? `<p class="cfaalert"><b>${missing.join('、')}</b>還沒填期中考日期，先不會排進去。知道日期後填上就好。</p>` : ''}
      ${past.length ? `<p class="sm-p">${past.join('、')}的考試日期已經過了，所以沒有排。</p>` : ''}
      ${R.subs.length ? `<div class="tblwrap"><table class="tbl"><thead><tr><th>順序</th><th>科目</th><th>考試</th><th>需要</th><th>排進去的</th><th>狀態</th></tr></thead><tbody>${R.subs.map((s, i) => { const short = s.left + (s.revShort || 0); return `<tr><td>${i + 1}</td><td><b>${PLAN_NAME[s.k]}</b></td><td>${s.pre ? `先讀完（${planMD(s.exam)} 前）` : planMD(s.exam)}</td><td>${planH(s.need + s.rev)}</td><td>${planH(s.got + s.rev - (s.revShort || 0))}</td><td>${short > 0 ? `<span class="pill bad">還差 ${planH(short)}</span>` : '<span class="pill good">排得完</span>'}</td></tr>`; }).join('')}</tbody></table></div>
      <p class="sm-p">考前可讀時間共 ${planH(have)}，需要 ${planH(need)}。${R.subs.some(s => s.left + (s.revShort || 0) > 0) ? '<b class="warnt">時間不夠：可以增加每天的時數、把比較熟的科目改成「熟」，或先讀進度表排到的部分。</b>' : `時間足夠，每天只排需要的量${have > need * 1.2 ? '，多出來的時間可以玩小遊戲或複習錯題本' : ''}。`}</p>` : '<p>先在上面填期中考日期，就會產生進度表。</p>'}`;
    const exams = {}; R.subs.filter(s => !s.pre).forEach(s => (exams[s.exam] = exams[s.exam] || []).push(PLAN_NAME[s.k]));
    let html = '', wk = '';
    R.days.forEach(D => {
      const d = planPd(D.d), mon = new Date(d); mon.setDate(d.getDate() - (d.getDay() + 6) % 7);
      const wkKey = planPs(mon); if (wkKey !== wk) { wk = wkKey; const sun = new Date(mon); sun.setDate(mon.getDate() + 6); html += `<h4 class="pweek">${mon.getMonth() + 1}/${mon.getDate()} – ${sun.getMonth() + 1}/${sun.getDate()} 這週</h4>`; }
      const ks = Object.keys(D.blocks), done = ST.planDone && ST.planDone[D.d];
      html += `<div class="pday${D.d === today ? ' today' : ''}${done ? ' done' : ''}" id="pd-${D.d}"><div class="pdh"><b>${planMD(D.d)}${D.d === today ? ' · 今天' : ''}</b><span class="sm-p">${P.off.includes(D.d) ? '不讀書' : ks.length ? planH(D.total) : '休息'}</span>${ks.length ? `<label class="chk"><input type="checkbox" data-pdone="${D.d}"${done ? ' checked' : ''}> 完成</label>` : ''}</div>
        ${ks.map(k => planBlockHTML(k, D.blocks[k], R.subs.find(s => s.k === k && D.blocks[k].rev) ? R.subs.find(s => s.k === k).exam : '')).join('')}</div>`;
      const nd = new Date(d); nd.setDate(d.getDate() + 1); const ns = planPs(nd);
      if (exams[ns]) html += `<div class="pexam"><b>${planMD(ns)}</b> ${exams[ns].map(n => `<span class="pill bad">${n}期中考</span>`).join(' ')}</div>`;
    });
    $('#pldays', root).innerHTML = html || '<p class="sm-p">目前沒有要排的內容。</p>';
    $$('[data-pj]', root).forEach(b => b.onclick = () => planJump(b.dataset.pj));
    $$('[data-pdone]', root).forEach(cb => cb.onchange = () => { ST.planDone = ST.planDone || {}; const d = cb.dataset.pdone; if (cb.checked && !ST.planDone[d]) { ST.planDone[d] = 1; FUN.xp(5, cb); FUN.beep('ok'); } else if (!cb.checked && ST.planDone[d]) { delete ST.planDone[d]; FUN.xp(-5, cb); } save(); cb.closest('.pday').classList.toggle('done', cb.checked); });
  };
  const upd = () => { save(); draw(); };
  $$('[data-on]', root).forEach(cb => cb.onchange = () => { P.on[cb.dataset.on] = cb.checked; upd(); });
  $$('[data-date]', root).forEach(i => i.onchange = () => { P.dates[i.dataset.date] = i.value; upd(); });
  $$('[data-fam]', root).forEach(s => s.onchange = () => { P.fam[s.dataset.fam] = s.value; upd(); });
  $$('[data-wk]', root).forEach(i => i.oninput = () => { P.wk[+i.dataset.wk] = Math.max(0, Math.min(16, +i.value || 0)); upd(); });
  $('#plstart', root).onchange = e => { P.start = e.target.value; upd(); };
  $('#plrev', root).onchange = e => { P.review = +e.target.value; upd(); };
  $('#plmode', root).onchange = e => { P.mode = e.target.value; upd(); };
  $('#ploffadd', root).onclick = () => { const v = $('#ploffd', root).value; if (v && !P.off.includes(v)) { P.off.push(v); upd(); } };
  draw();
}

function planJump(s) {
  const [k, id, kind, tab] = s.split('|');
  if (kind === 'c') return jumpCard(k, id);
  go(k, tab || 'learn');
  if (k === 'law' && tab === 'learn') setTimeout(() => { const el = $('#sec-art'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
  if (tab === 'prob' && id) setTimeout(() => { const el = $(`[data-pd="${id}"]`); if (el) el.closest('.prob').scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
}

// 首頁的「今天要讀」
function planTodayHTML() {
  if (!ST.plan) return `<button type="button" class="cfahome plhome" id="toplan"><span class="cfahi">${navIcon('plan')}</span><span><b>讀書進度表</b><span>填期中考日期和每天能讀幾小時，幫你把各科排進每一天</span></span><span class="cfago">→</span></button>`;
  const R = buildPlan(), D = R.days.find(x => x.d === planToday()), ks = D ? Object.keys(D.blocks) : [];
  return `<button type="button" class="cfahome plhome" id="toplan"><span class="cfahi">${navIcon('plan')}</span><span><b>今天要讀${ks.length ? ` · ${planH(D.total)}` : ''}</b><span>${ks.length ? ks.map(k => { const b = D.blocks[k]; const n = (b.items || []).filter(t => t.kind === 'c').length; return `${PLAN_NAME[k]} ${planH(b.learn + b.rev)}${n ? `（${n} 張卡）` : b.rev ? '（考前總複習）' : ''}`; }).join('、') : '今天沒有排進度，休息一下或複習錯題本'}</span></span><span class="cfago">→</span></button>`;
}
