// ===== 讀書進度表：依期中考先後，把各科還沒掌握的內容排進每一天 =====
const PLAN_K = ['mgmt', 'deriv', 'invest', 'law', 're', 'basic'];
const PLAN_NAME = { basic: '基礎補給站', deriv: '衍金', invest: '投資學', law: '民商法', mgmt: '管理學', re: '不動產財管', reF: '不動產財管', gmat: 'GMAT', fr: '法文', ielts: '雅思' };
const PLAN_FIN = ['mgmt', 'deriv', 'invest', 'law']; // 期末考範圍和期中差不多份量的科目
PLAN_FIN.forEach(k => PLAN_NAME[k + 'F'] = PLAN_NAME[k]);
const planBase = k => k.replace(/F$/, '');
const planHue = k => DATA[planBase(k)] ? DATA[planBase(k)].hue : /^rp/.test(k) ? 'rp' : planBase(k);
// 每日語言練習：雅思依星期輪流練不同技能
const PLAN_HAB = { fr: ['法文', '單字複習＋聽力或跟讀'], ielts: ['雅思', ''] };
const IELTS_DAY = { 1: '聽力：一回真題＋對答案', 2: '閱讀：一篇限時＋檢討', 3: '寫作：Task 1 或 Task 2 一篇', 4: '口說：Part 1–3 錄音自評', 5: '單字＋本週錯題', 6: '模擬或補進度', 0: '模擬或補進度' };
// 不動產財管（清大磨課師，看影片＋複習）：[單元, 期中/期末, 相關的 CFA 筆記卡]
const RE_UNITS = [['房地產相關法規', 'mid'], ['固定利率抵押貸款Ⅰ', 'mid', 'xi16'], ['固定利率抵押貸款Ⅱ', 'mid', 'xi16'], ['浮動利率抵押貸款', 'mid', 'xi16'], ['不動產抵押貸款證券Ⅰ', 'mid', 'xi14'], ['不動產抵押貸款證券Ⅱ', 'mid', 'xi16'], ['不動產抵押貸款證券Ⅲ及其衍生品Ⅰ', 'fin', 'xi16'], ['不動產抵押貸款衍生品Ⅱ', 'fin', 'xi16'], ['不動產逆向抵押貸款與房市危機解決方案', 'fin']];
const PLAN_MIN = { basic: 12, deriv: 18, invest: 15, law: 15, mgmt: 15 }; // 每張知識卡估計分鐘
const PLAN_FAM = [['熟', 0.6], ['普通', 1], ['不熟', 1.5]];
const planPd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const planPs = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const planToday = () => planPs(new Date());
const planMD = s => { const d = planPd(s); return `${d.getMonth() + 1}/${d.getDate()}（${'日一二三四五六'[d.getDay()]}）`; };
const planH = m => { const h = Math.round(m / 60 * 10) / 10; return h + ' 小時'; };

function planSettings() {
  const D = { start: '', dates: { mgmt: '2026-11-04', deriv: '2026-11-16', invest: '2026-11-03', law: '2026-10-28', re: '2026-11-12', reF: '2026-12-17', mgmtF: '2026-12-23', derivF: '2026-12-21', investF: '2026-12-22', lawF: '2026-12-23' }, on: { basic: true, deriv: true, invest: true, law: true, mgmt: true, re: true }, fam: {}, wk: [4, 2, 2, 2, 2, 2, 4], off: [], review: 120, mode: 'seq', reH: 3.5, reDone: {}, gmatH: 200, gmatDone: 0, finR: 1, reports: [{ n: '史記報告', d: '2026-11-26', h: 0 }, { n: 'ESG報告', d: '2026-12-04', h: 0 }, { n: '衍金報告', d: '2026-12-07', h: 0 }, { n: '投資學期末報告', d: '2026-12-15', h: 0 }, { n: '管理學報告', d: '', h: 0 }], habits: { fr: { on: true, min: 30, days: [0, 1, 2, 3, 4, 5, 6] }, ielts: { on: true, min: 45, days: [1, 2, 3, 4, 5] } } };
  D.dates.gmat = '2026-12-30'; D.on.gmat = true;
  // 直接補在 ST.plan 上（不換新物件），畫面上拿到的設定才會一直是同一份、改了都存得到
  const S = ST.plan = ST.plan || {};
  Object.keys(D).forEach(k => { if (S[k] === undefined) S[k] = D[k]; });
  ['dates', 'on', 'habits'].forEach(g => Object.keys(D[g]).forEach(k => { if (S[g][k] === undefined || (g === 'dates' && !S[g][k])) S[g][k] = D[g][k]; }));
  return ST.plan;
}

// 一科要做的事（依序）：還沒勾「我懂了」的卡片 → 習題 → 公式、講義、條文、申論等固定複習
function planTasks(k, f) {
  const P = ST.plan;
  const chunks = (n, sec, label) => { const T = [], c = Math.max(1, Math.round(n / 90)); for (let i = 1; i <= c; i++) T.push({ k, sec, t: label(i, c), min: Math.round(n / c), kind: 'v' }); return T; };
  if (/F$/.test(k) && PLAN_FIN.includes(planBase(k))) {
    // 期末範圍：份量估計和期中一樣（全部卡片＋練習），可在設定調整倍數
    const b = planBase(k), s = DATA[b], n = (subjCards(s).length * PLAN_MIN[b] + (s.formulas ? s.formulas.length * 8 : 0) + 90) * f * (+P.finR || 1);
    return chunks(n, '期末範圍', (i, c) => `第 ${i}/${c} 段：期中後的新進度（講義、課本、筆記＋練習題）`);
  }
  if (/^rp\d+$/.test(k)) {
    const r = P.reports[+k.slice(2)], n = (+r.h || 0) * 60;
    return [['找資料與分工', .3], ['撰寫內容', .5], ['做簡報、修改、演練', .2]].map(([t, p]) => ({ k, sec: r.n, t, min: Math.round(n * p), kind: 'v' })).filter(t => t.min > 0);
  }
  if (k === 'gmat') {
    // GMAT：診斷模考 → Quant／Verbal／Data Insights 每輪約 10 小時輪流 → 最後約 20% 做全真模考＋檢討
    const P = ST.plan, tot = Math.max(0, (+P.gmatH - +P.gmatDone) * 60); if (!tot) return [];
    const T = +P.gmatDone ? [] : [{ k, sec: '起步', t: '診斷模考（官方 Practice Exam）＋找出弱點', min: Math.min(240, tot), kind: 'v' }];
    const rest = tot - (T[0] ? T[0].min : 0), mock = Math.min(Math.round(rest * 0.2), 6 * 240), study = rest - mock, rounds = Math.max(1, Math.round(study / 600));
    for (let r = 1; r <= rounds; r++) [['Quant：觀念＋題組練習', .35], ['Verbal（CR、RC）：練習＋錯題檢討', .35], ['Data Insights（DS、圖表、雙欄位、多來源推理）', .3]].forEach(p => T.push({ k, sec: `第 ${r} 輪`, t: p[0], min: Math.round(study * p[1] / rounds), kind: 'v' }));
    const nm = Math.max(1, Math.round(mock / 240)); for (let i = 1; i <= nm; i++) T.push({ k, sec: '模考衝刺', t: `全真模考 ${i}＋逐題檢討`, min: Math.round(mock / nm), kind: 'v' });
    return T;
  }
  if (k === 're' || k === 'reF') {
    const P = ST.plan;
    return RE_UNITS.map((u, i) => [u, i]).filter(([u, i]) => (u[1] === 'mid') === (k === 're') && !P.reDone[i]).map(([u, i]) => ({ k, id: u[2] || '', sec: `單元 ${i + 1}`, t: `${u[0]}：看影片＋複習`, min: Math.round(+P.reH * 60 * f), kind: u[2] ? 'cfa' : 'v' }));
  }
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
  if (P.on.re && P.dates.reF && P.dates.reF > start) subs.push({ k: 'reF', exam: P.dates.reF, final: true, after: P.dates.re });
  PLAN_FIN.forEach(k => { if (P.on[k] && P.dates[k + 'F'] && P.dates[k + 'F'] > start) subs.push({ k: k + 'F', exam: P.dates[k + 'F'], final: true, after: P.dates[k] }); });
  // 報告：填了時數和繳交日的，排在繳交前三週內
  (P.reports || []).forEach((r, i) => { if (+r.h > 0 && r.d && r.d > start) { const a = planPd(r.d); a.setDate(a.getDate() - 21); PLAN_NAME['rp' + i] = r.n || `報告 ${i + 1}`; subs.push({ k: 'rp' + i, exam: r.d, report: true, after: planPs(a) }); } });
  if (P.on.gmat && P.dates.gmat && P.dates.gmat > start) subs.push({ k: 'gmat', exam: P.dates.gmat, steady: true });
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
    const f = (PLAN_FAM.find(x => x[0] === (P.fam[planBase(s.k)] || '普通')) || [0, 1])[1];
    s.tasks = planTasks(s.k, f); s.need = Math.round(s.tasks.reduce((a, t) => a + t.min, 0)); s.left = s.need; s.rev = s.pre || s.report ? 0 : +P.review;
  });
  days.forEach(D => D.full = D.cap);
  // 每日語言練習最先保留（固定的習慣）
  const habits = Object.keys(PLAN_HAB).filter(h => P.habits[h] && P.habits[h].on).map(h => {
    const c = P.habits[h]; let want = 0, got = 0;
    days.forEach(D => { if (!c.days.includes(planPd(D.d).getDay()) || P.off.includes(D.d)) return; want += +c.min; const t = Math.min(+c.min, D.cap); if (t > 0) { D.cap -= t; add(D, h, t, 'learn'); got += t; } });
    return { k: h, want, got };
  });
  // 先在考前最後幾天保留總複習時間
  subs.filter(s => s.rev).forEach(s => {
    let r = s.rev;
    for (let i = days.length - 1; i >= 0 && r > 0; i--) { const D = days[i]; if (D.d >= s.exam) continue; const t = Math.min(r, D.cap); if (t > 0) { D.cap -= t; add(D, s.k, t, 'rev'); r -= t; } }
    s.revShort = r;
  });
  // 用每天可讀時間的同一個比例 f 排內容，找出「每科都能在考前讀完」的最小 f，讓每天的量平均
  // 用每天可讀時間的同一個比例 f 排內容，找出「每科都能在考前讀完」的最小 f，讓每天的量平均。
  // 期末範圍（例如不動產財管期末）另外排：期中考後才開始，用剩下的時間平均分散到期末考前。
  const phase = G => {
    if (!G.length) return;
    const base = days.map(D => D.cap);
    const run = f => {
      G.forEach(s => s.left = s.need);
      days.forEach((D, i) => {
        D.cap = Math.min(base[i], Math.round(base[i] * f / 15) * 15); D.learn = {};
        let cur = null;
        while (D.cap >= 15) {
          const cand = G.filter(s => s.left > 0 && D.d < s.exam && (!s.after || D.d >= s.after));
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
      return G.every(s => s.left <= 0);
    };
    let f = 1;
    if (run(1)) { let lo = 0, hi = 1; for (let n = 0; n < 16; n++) { const m = (lo + hi) / 2; run(m) ? hi = m : lo = m; } f = Math.min(1, hi * 1.1); if (!run(f)) run(f = hi); }
    days.forEach((D, i) => { Object.entries(D.learn).forEach(([k, m]) => add(D, k, m, 'learn')); D.cap = base[i] - Object.values(D.learn).reduce((x, y) => x + y, 0); });
  };
  subs.forEach(s => { if (s.after && s.after <= start) delete s.after; });
  phase(subs.filter(s => !s.after && !s.steady));
  // 期末範圍和報告：期中考後（報告是繳交前三週）才開始，一樣用平均的每日量排
  phase(subs.filter(s => s.after));
  // GMAT：考期長，用期中考內容排完後剩下的時間，依比例平均分到每一天（期中考後自然會變多）
  subs.filter(s => s.steady).forEach(s => {
    s.left = s.need;
    const idx = days.map((D, i) => i).filter(i => days[i].d < s.exam && days[i].cap >= 30), sum = idx.reduce((a, i) => a + days[i].cap, 0);
    if (!sum) return;
    const f = Math.min(1, s.need * 1.05 / sum), put = (i, m) => { const D = days[i], t = Math.min(m, D.cap, s.left); if (t > 0) { D.cap -= t; s.left -= t; add(D, s.k, t, 'learn'); } };
    idx.forEach(i => put(i, Math.round(days[i].cap * f / 30) * 30));
    idx.forEach(i => s.left > 0 && put(i, s.left));
  });
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
  return { P, start, subs, days, habits };
}

function planBlockHTML(k, b, exam, d) {
  if (PLAN_HAB[k]) return `<div class="pblk ${k}"><div class="pbh"><b>${PLAN_HAB[k][0]}</b><span>${b.learn} 分鐘</span></div><p>${k === 'ielts' ? IELTS_DAY[planPd(d).getDay()] : PLAN_HAB[k][1]}</p></div>`;
  const groups = []; (b.items || []).forEach(t => { const g = groups.find(x => x.sec === t.sec); g ? g.items.push(t) : groups.push({ sec: t.sec, items: [t] }); });
  return `<div class="pblk ${planHue(k)}"><div class="pbh"><b>${PLAN_NAME[k]}${/F$/.test(k) ? '（期末範圍）' : /^rp/.test(k) ? '（報告）' : ''}</b><span>${planH(b.learn + b.rev)}</span></div>
    ${groups.map(g => `<p><span class="psec">${g.sec}</span>${g.items.map(t => t.kind === 'v' ? t.t : t.kind === 'cfa' ? `${t.t} <button type="button" class="linkish refcfa" data-pj="cfa|${t.id}|c|">參考 CFA 筆記</button>` : `<button type="button" class="linkish" data-pj="${t.k}|${t.id || ''}|${t.kind}|${t.tab || ''}">${t.t}</button>`).join('、')}</p>`).join('')}
    ${b.rev ? `<p><span class="psec">考前總複習</span>${DATA[planBase(k)] ? `<button type="button" class="linkish" data-pj="${planBase(k)}||x|mcq">打怪模式＋錯題本</button>，再快速翻過所有卡片的「白話」${planBase(k) === 'deriv' ? '，整理 A4 小抄' : ''}` : k === 'gmat' ? '最後一份模考、看錯題本、確認考試流程和作息' : '重看各單元筆記和影片重點，整理考試範圍的公式與名詞'}${exam ? `（${planMD(exam)} 考試）` : ''}</p>` : ''}</div>`;
}

function renderPlan(root) {
  const P = planSettings();
  root.innerHTML = `<div class="pagehead"><h2>讀書進度表</h2><p class="intro">依考試先後，把各科還沒掌握的卡片、習題、影片課和 GMAT 排進每一天，加上每天的法文和雅思練習，考前一天留給總複習。卡片勾「我懂了」之後會自動從進度表拿掉，每次打開都會依剩下的內容重新排。</p></div>
  <div class="setgrid">
  <section class="setbox"><h3>1. 期中考日期與熟悉度</h3>
    <div class="plsubs">${PLAN_K.map(k => k === 're' ? planReRow(P) : `<div class="plrow ${DATA[k].hue}"><label class="pln"><input type="checkbox" data-on="${k}"${P.on[k] ? ' checked' : ''}> <b>${PLAN_NAME[k]}</b></label>
      ${k === 'basic' ? '<span class="sm-p pld">不考試，排在衍金、投資學考前一週讀完</span>' : `<label class="pld">期中考 <input type="date" data-date="${k}" value="${P.dates[k] || ''}"></label><label class="pld">期末考 <input type="date" data-date="${k}F" value="${P.dates[k + 'F'] || ''}"></label>`}
      <label>熟悉度 <select data-fam="${k}">${PLAN_FAM.map(f => `<option${(P.fam[k] || '普通') === f[0] ? ' selected' : ''}>${f[0]}</option>`).join('')}</select></label><span class="sm-p">需要 <b data-need="${k}"></b></span></div>`).join('')}</div>
    <div class="row wrap"><label>期末範圍的份量 ≈ 期中的 <select id="plfin">${[0.5, 0.75, 1, 1.25, 1.5].map(x => `<option value="${x}"${x === +P.finR ? ' selected' : ''}>${x} 倍</option>`).join('')}</select></label></div>
    <p class="sm-p">考試日期已經從你的 Notion「報告」資料庫帶入。熟悉度會調整估計時間：熟 ×0.6、不熟 ×1.5。期末範圍在期中考後才開始排。</p></section>
  <section class="setbox"><h3>2. 報告</h3><div class="plsubs" id="plreps">${(P.reports || []).map((r, i) => `<div class="plrow rp"><input type="text" class="rpname" data-rpn="${i}" value="${esc(r.n)}" aria-label="報告名稱"><label>繳交 <input type="date" data-rpd="${i}" value="${r.d || ''}"></label><label>需要 <input type="number" class="plnum" data-rph="${i}" min="0" max="200" step="1" value="${+r.h || ''}" placeholder="?" inputmode="numeric"> 小時</label><button type="button" class="offchip" data-rpdel="${i}" aria-label="刪除 ${esc(r.n)}">刪除</button></div>`).join('')}</div>
    <div class="row wrap"><button type="button" class="btn ghost" id="rpadd">＋ 新增報告</button></div>
    <p class="sm-p">填「需要幾小時」之後才會排進去，排在繳交日前三週內。小組報告只要填你自己要花的時間。</p></section>
  <section class="setbox"><h3>3. GMAT 與每日語言練習</h3><div class="plsubs">
    <div class="plrow gmat"><label class="pln"><input type="checkbox" data-on="gmat"${P.on.gmat ? ' checked' : ''}> <b>GMAT</b></label><label class="pld">考試 <input type="date" data-date="gmat" value="${P.dates.gmat || ''}"></label>
      <label>總共 <input type="number" class="plnum" id="plgh" min="10" max="600" step="10" value="${P.gmatH}" inputmode="numeric"> 小時</label><label>已讀 <input type="number" class="plnum" id="plgd" min="0" max="600" step="1" value="${P.gmatDone}" inputmode="numeric"> 小時</label><span class="sm-p">還要 <b data-need="gmat"></b></span></div>
    ${Object.keys(PLAN_HAB).map(h => { const c = P.habits[h]; return `<div class="plrow ${h}"><label class="pln"><input type="checkbox" data-hon="${h}"${c.on ? ' checked' : ''}> <b>${PLAN_HAB[h][0]}</b></label><label>每次 <select data-hmin="${h}">${[15, 30, 45, 60, 90].map(m => `<option value="${m}"${m === +c.min ? ' selected' : ''}>${m} 分鐘</option>`).join('')}</select></label><span class="hdays">${[1, 2, 3, 4, 5, 6, 0].map(i => `<label><input type="checkbox" data-hday="${h}|${i}"${c.days.includes(i) ? ' checked' : ''}>${'日一二三四五六'[i]}</label>`).join('')}</span></div>`; }).join('')}
    </div><p class="sm-p">GMAT 會在期中考的進度排好之後，用每天剩下的時間平均分配，所以期中考後每天會變多。「已讀」填你目前讀了幾小時，進度表會扣掉。語言練習每天最先保留。</p></section>
  <section class="setbox"><h3>4. 每天能讀幾小時</h3>
    <div class="wkrow">${[1, 2, 3, 4, 5, 6, 0].map(i => `<label><span>週${'日一二三四五六'[i]}</span><input type="number" min="0" max="16" step="0.5" data-wk="${i}" value="${P.wk[i]}" inputmode="decimal"></label>`).join('')}</div>
    <div class="row wrap"><label>從哪天開始 <input type="date" id="plstart" value="${P.start || planToday()}"></label>
    <label>排法 <select id="plmode"><option value="seq"${P.mode !== 'mix' ? ' selected' : ''}>一科一科，照考試順序</option><option value="mix"${P.mode === 'mix' ? ' selected' : ''}>多科同時進行</option></select></label>
    <label>每科考前總複習 <select id="plrev">${[60, 120, 180, 240].map(m => `<option value="${m}"${m === +P.review ? ' selected' : ''}>${m / 60} 小時</option>`).join('')}</select></label></div>
    <div class="row wrap"><label>不能讀的日子 <input type="date" id="ploffd"></label><button class="btn ghost" type="button" id="ploffadd">加入</button></div><div id="plofflist" class="offlist"></div></section>
  </div>
  <div class="savebar"><button type="button" class="btn" id="plsave">儲存設定</button><span class="sm-p" id="plsaved">${P.savedAt ? `上次儲存：${P.savedAt}` : '設定改了會自動存在這台裝置'}</span></div>
  <section class="msbox" id="plsum"></section>
  <section class="msbox"><h3>每日進度</h3><div id="pldays"></div></section>`;

  const draw = () => {
    const R = buildPlan(), today = planToday();
    PLAN_K.concat('gmat').forEach(k => { const ss = R.subs.filter(x => planBase(x.k) === k), c = $(`[data-need="${k}"]`, root); if (c) c.textContent = ss.length ? planH(ss.reduce((a, s) => a + s.need + s.rev, 0)) : '—'; });
    $('#plofflist', root).innerHTML = P.off.sort().map(d => `<button type="button" class="offchip" data-off="${d}" aria-label="移除 ${d}">${planMD(d)} ✕</button>`).join('');
    $$('[data-off]', root).forEach(b => b.onclick = () => { P.off = P.off.filter(d => d !== b.dataset.off); save(); draw(); });
    const missing = PLAN_K.filter(k => k !== 'basic' && P.on[k] && !P.dates[k]).map(k => PLAN_NAME[k]);
    const past = PLAN_K.filter(k => k !== 'basic' && P.on[k] && P.dates[k] && P.dates[k] <= R.start).map(k => PLAN_NAME[k]);
    const need = R.subs.reduce((a, s) => a + s.need + s.rev, 0) + R.habits.reduce((a, h) => a + h.want, 0), have = R.days.reduce((a, D) => a + D.full, 0), nd = Math.max(1, R.days.length);
    $('#plsum', root).innerHTML = `<h3>總覽：照考試先後</h3>
      ${missing.length ? `<p class="cfaalert"><b>${missing.join('、')}</b>還沒填期中考日期，先不會排進去。知道日期後填上就好。</p>` : ''}
      ${past.length ? `<p class="sm-p">${past.join('、')}的考試日期已經過了，所以沒有排。</p>` : ''}
      ${R.subs.length ? `<div class="tblwrap"><table class="tbl"><thead><tr><th>順序</th><th>科目</th><th>考試</th><th>需要</th><th>排進去的</th><th>狀態</th></tr></thead><tbody>${R.subs.map((s, i) => { const short = s.left + (s.revShort || 0); return `<tr><td>${i + 1}</td><td><b>${PLAN_NAME[s.k]}${s.report ? '（報告）' : s.final ? '（期末）' : ''}</b></td><td>${s.pre ? `先讀完（${planMD(s.exam)} 前）` : planMD(s.exam)}</td><td>${planH(s.need + s.rev)}</td><td>${planH(s.got + s.rev - (s.revShort || 0))}</td><td>${short > 0 ? `<span class="pill bad">還差 ${planH(short)}</span>` : '<span class="pill good">排得完</span>'}</td></tr>`; }).join('')}</tbody></table></div>
      ${R.habits.length ? `<p class="sm-p">每日語言練習：${R.habits.map(h => `${PLAN_HAB[h.k][0]} ${planH(h.got)}${h.got < h.want ? `（還差 ${planH(h.want - h.got)}）` : ''}`).join('、')}</p>` : ''}<p class="sm-p">到 ${planMD(R.days[R.days.length - 1] ? R.days[R.days.length - 1].d : R.start)} 為止，可讀時間共 ${planH(have)}（平均每天 ${planH(have / nd)}），全部排完需要 ${planH(need)}（<b>平均每天 ${planH(need / nd)}</b>）。${R.subs.some(s => s.left + (s.revShort || 0) > 0) || R.habits.some(h => h.got < h.want) ? '<b class="warnt">時間不夠：可以增加每天的時數、把比較熟的科目改成「熟」，或先讀進度表排到的部分。</b>' : `時間足夠，每天只排需要的量${have > need * 1.2 ? '，多出來的時間可以玩小遊戲或複習錯題本' : ''}。`}</p>` : '<p>先在上面填期中考日期，就會產生進度表。</p>'}`;
    const exams = {}; R.subs.filter(s => !s.pre).forEach(s => (exams[s.exam] = exams[s.exam] || []).push(PLAN_NAME[s.k] + (s.report ? ' 繳交' : s.final ? '期末考' : s.steady ? ' 考試' : '期中考')));
    let html = '', wk = '';
    R.days.forEach(D => {
      const d = planPd(D.d), mon = new Date(d); mon.setDate(d.getDate() - (d.getDay() + 6) % 7);
      const wkKey = planPs(mon); if (wkKey !== wk) { wk = wkKey; const sun = new Date(mon); sun.setDate(mon.getDate() + 6); html += `<h4 class="pweek">${mon.getMonth() + 1}/${mon.getDate()} – ${sun.getMonth() + 1}/${sun.getDate()} 這週</h4>`; }
      const ks = Object.keys(D.blocks), done = ST.planDone && ST.planDone[D.d];
      html += `<div class="pday${D.d === today ? ' today' : ''}${done ? ' done' : ''}" id="pd-${D.d}"><div class="pdh"><b>${planMD(D.d)}${D.d === today ? ' · 今天' : ''}</b><span class="sm-p">${P.off.includes(D.d) ? '不讀書' : ks.length ? planH(D.total) : '休息'}</span>${ks.length ? `<label class="chk"><input type="checkbox" data-pdone="${D.d}"${done ? ' checked' : ''}> 完成</label>` : ''}</div>
        ${ks.map(k => planBlockHTML(k, D.blocks[k], R.subs.find(s => s.k === k && D.blocks[k].rev) ? R.subs.find(s => s.k === k).exam : '', D.d)).join('')}</div>`;
      const nd = new Date(d); nd.setDate(d.getDate() + 1); const ns = planPs(nd);
      if (exams[ns]) html += `<div class="pexam"><b>${planMD(ns)}</b> ${exams[ns].map(n => `<span class="pill bad">${n}</span>`).join(' ')}</div>`;
    });
    $('#pldays', root).innerHTML = html || '<p class="sm-p">目前沒有要排的內容。</p>';
    $$('[data-pj]', root).forEach(b => b.onclick = () => planJump(b.dataset.pj));
    $$('[data-pdone]', root).forEach(cb => cb.onchange = () => { ST.planDone = ST.planDone || {}; const d = cb.dataset.pdone; if (cb.checked && !ST.planDone[d]) { ST.planDone[d] = 1; FUN.xp(5, cb); FUN.beep('ok'); } else if (!cb.checked && ST.planDone[d]) { delete ST.planDone[d]; FUN.xp(-5, cb); } save(); cb.closest('.pday').classList.toggle('done', cb.checked); });
  };
  const stamp = () => { const d = new Date(); P.savedAt = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; save(); const el = $('#plsaved', root); if (el) el.textContent = `已儲存 ✓ ${P.savedAt}（存在這台裝置，換裝置請用設定頁的備份碼）`; };
  const upd = () => { stamp(); draw(); };
  $('#plsave', root).onclick = () => { stamp(); FUN.toast('進度表設定已儲存', 'happy'); };
  $('#plfin', root).onchange = e => { P.finR = +e.target.value; upd(); };
  $$('[data-rpn]', root).forEach(i => i.onchange = () => { P.reports[+i.dataset.rpn].n = i.value.trim() || '報告'; upd(); });
  $$('[data-rpd]', root).forEach(i => i.onchange = () => { P.reports[+i.dataset.rpd].d = i.value; upd(); });
  $$('[data-rph]', root).forEach(i => i.oninput = () => { P.reports[+i.dataset.rph].h = Math.max(0, +i.value || 0); upd(); });
  $$('[data-rpdel]', root).forEach(b => b.onclick = () => { P.reports.splice(+b.dataset.rpdel, 1); stamp(); renderPlan(root); });
  $('#rpadd', root).onclick = () => { P.reports.push({ n: '新報告', d: '', h: 0 }); stamp(); renderPlan(root); };
  $$('[data-on]', root).forEach(cb => cb.onchange = () => { P.on[cb.dataset.on] = cb.checked; upd(); });
  $$('[data-date]', root).forEach(i => i.onchange = () => { P.dates[i.dataset.date] = i.value; upd(); });
  $$('[data-fam]', root).forEach(s => s.onchange = () => { P.fam[s.dataset.fam] = s.value; upd(); });
  $$('[data-wk]', root).forEach(i => i.oninput = () => { P.wk[+i.dataset.wk] = Math.max(0, Math.min(16, +i.value || 0)); upd(); });
  $('#plstart', root).onchange = e => { P.start = e.target.value; upd(); };
  $('#plgh', root).oninput = e => { P.gmatH = Math.max(0, +e.target.value || 0); upd(); };
  $('#plgd', root).oninput = e => { P.gmatDone = Math.max(0, +e.target.value || 0); upd(); };
  $$('[data-hon]', root).forEach(cb => cb.onchange = () => { P.habits[cb.dataset.hon].on = cb.checked; upd(); });
  $$('[data-hmin]', root).forEach(s => s.onchange = () => { P.habits[s.dataset.hmin].min = +s.value; upd(); });
  $$('[data-hday]', root).forEach(cb => cb.onchange = () => { const [h, i] = cb.dataset.hday.split('|'), c = P.habits[h]; c.days = cb.checked ? c.days.concat(+i) : c.days.filter(x => x !== +i); upd(); });
  $('#plreh', root).oninput = e => { P.reH = Math.max(0.5, Math.min(10, +e.target.value || 3.5)); upd(); };
  $$('[data-redone]', root).forEach(cb => cb.onchange = () => { cb.checked ? P.reDone[cb.dataset.redone] = 1 : delete P.reDone[cb.dataset.redone]; upd(); });
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

function planReRow(P) {
  return `<div class="plrow re"><label class="pln"><input type="checkbox" data-on="re"${P.on.re ? ' checked' : ''}> <b>不動產財管</b></label>
    <label class="pld">期中考 <input type="date" data-date="re" value="${P.dates.re || ''}"></label><label class="pld">期末考 <input type="date" data-date="reF" value="${P.dates.reF || ''}"></label>
    <label>每單元 <input type="number" id="plreh" min="0.5" max="10" step="0.5" value="${P.reH}" inputmode="decimal"> 小時</label>
    <label>熟悉度 <select data-fam="re">${PLAN_FAM.map(f => `<option${(P.fam.re || '普通') === f[0] ? ' selected' : ''}>${f[0]}</option>`).join('')}</select></label><span class="sm-p">需要 <b data-need="re"></b></span>
    <details class="reunits"><summary>單元進度（看完的打勾，就不會再排）</summary>${RE_UNITS.map((u, i) => `<label><input type="checkbox" data-redone="${i}"${P.reDone[i] ? ' checked' : ''}> ${i + 1}. ${u[0]} <span class="pill">${u[1] === 'mid' ? '期中' : '期末'}</span></label>`).join('')}</details></div>`;
}
