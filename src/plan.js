// ===== 讀書進度表：依期中考先後，把各科還沒掌握的內容排進每一天 =====
const PLAN_K = ['mgmt', 'deriv', 'invest', 'law', 're', 'basic'];
const PLAN_NAME = { basic: '基礎補給站', deriv: '衍金', invest: '投資學', law: '民商法', mgmt: '管理學', re: '不動產財管', reF: '不動產財管', gmat: 'GMAT', fr: '法文', ielts: '雅思' };
const PLAN_FIN = ['mgmt', 'deriv', 'invest', 'law']; // 期末考範圍和期中差不多份量的科目
PLAN_FIN.forEach(k => PLAN_NAME[k + 'F'] = PLAN_NAME[k]);
const planBase = k => k.replace(/F$/, '');
const planHue = k => DATA[planBase(k)] ? DATA[planBase(k)].hue : /^rp/.test(k) ? 'rp' : planBase(k);
// 固定練習與每週作業（每天最先保留）：雅思依星期輪流練不同技能
const PLAN_HAB = { fr: ['法文', '單字複習＋聽力或跟讀'], ielts: ['雅思', ''], invHw: ['投資學報告', '寫這週的投資學報告'], mgmtHw: ['管理學作業', '寫這週的管理學作業'] };
const IELTS_DAY = { 1: '聽力：一回真題＋對答案', 2: '閱讀：一篇限時＋檢討', 3: '寫作：Task 1 或 Task 2 一篇', 4: '口說：Part 1–3 錄音自評', 5: '單字＋本週錯題', 6: '模擬或補進度', 0: '模擬或補進度' };
// 不動產財管（清大磨課師，看影片＋複習）：[單元, 期中/期末, 相關的 CFA 筆記卡]
const RE_UNITS = [['房地產相關法規', 'mid'], ['固定利率抵押貸款Ⅰ', 'mid'], ['固定利率抵押貸款Ⅱ', 'mid'], ['浮動利率抵押貸款', 'mid'], ['不動產抵押貸款證券Ⅰ', 'mid'], ['不動產抵押貸款證券Ⅱ', 'mid'], ['不動產抵押貸款證券Ⅲ及其衍生品Ⅰ', 'fin'], ['不動產抵押貸款衍生品Ⅱ', 'fin'], ['不動產逆向抵押貸款與房市危機解決方案', 'fin']];
// GMAT：照 A2GMAT 進階區的上課順序（RC1 → CR1 → 數學1 → …），一次一個單元、一天只讀一科。
// [id, 科目, 名稱, 影片清單 [[名稱, 'mm:ss']]（時間 = 影片長度 ×「影片＋練習倍數」）或估計分鐘數]
const gmatV = (n, t) => [[n, t]];
const GMAT_UNITS = (() => {
  const U = [['rc1', 'RC', 'RC1 課程', gmatV('RC1', '188:43')], ['cr1', 'CR', 'CR1 課程', gmatV('CR1', '234:21')], ['q1', '數學', '數學1 課程', gmatV('數學1', '182:59')],
    ['rc2', 'RC', 'RC2 課程', gmatV('RC2', '188:48')], ['cr2', 'CR', 'CR2 課程', gmatV('CR2', '223:18')], ['q2', '數學', '數學2 課程', gmatV('數學2', '211:33')],
    ['rc3', 'RC', 'RC3 課程', gmatV('RC3', '185:47')], ['cr3', 'CR', 'CR3 課程', gmatV('CR3', '194:14')], ['q3', '數學', '數學3 課程', gmatV('數學3', '184:40')], ['cr4', 'CR', 'CR4 課程', gmatV('CR4', '195:27')],
    ['di1', 'DI', 'DI1 課程（TPA & MSR）', gmatV('DI1', '189:24')], ['di2', 'DI', 'DI2 課程（TPA & MSR）', gmatV('DI2', '186:26')], ['q4', '數學', '數學4 課程', gmatV('數學4', '247:27')],
    ['di3', 'DI', 'DI3 課程（GI & TA）', gmatV('DI3', '203:55')], ['ds', 'DI', 'DS 文字題（必練）', gmatV('DS 文字題', '33:44')],
    ['rcx', 'RC', 'RC 課後補充（文字講義）：Kory 閱讀補充（句子重心＆文章理解標準、邏輯簡圖範例）、A2 示範 OG-RC 難題', 120],
    ['crx', 'CR', 'CR 課後補充影片', [['縱向總結(1)', '16:09'], ['縱向總結(2)', '21:18'], ['縱向總結(3)', '12:47'], ['縱向總結(4)', '22:44'], ['全面部分概念', '22:56'], ['比較結構閱讀寫作補充', '48:34']]],
    ['crb1', 'CR', '縱向總結題本詳解（一）', [['倒因為果', '33:13'], ['無因有果', '11:32'], ['斷橋', '34:13'], ['實驗組及對照組類比', '16:08'], ['類比及差異', '44:07'], ['比較基礎', '35:04']]],
    ['crb2', 'CR', '縱向總結題本詳解（二）', [['樣本與母體', '47:50'], ['比例與總數', '40:00'], ['單位與單位量', '16:14'], ['差額與總額', '5:32'], ['統計數字代表性', '20:42'], ['錯誤二分法', '12:12'], ['時間', '135:03']]]];
  // 課程結束後：KH 數學練習計畫（14 天精華版，每單元 2 天份）和 GWD Verbal 高分題庫（24 套，每單元 2 套）輪流
  const M = Array.from({ length: 7 }, (_, i) => [`m${i + 1}`, '數學練習', `KH 數學練習計畫（14 天精華版）第 ${2 * i + 1}–${2 * i + 2} 天`, 180]);
  const G = Array.from({ length: 12 }, (_, i) => [`g${i + 1}`, 'Verbal 練習', `GWD 第 ${2 * i + 1}–${2 * i + 2} 套（每套 23 題：限時做完＋逐題檢討）`, 180]);
  M.forEach((m, i) => U.push(m, G[i]));
  U.push(['pp1', '模考', '官網新制 PP 模考 1＋逐題檢討', 240], ...G.slice(7, 11), ['rcp', 'RC', 'RC 考前兩週衝刺大禮包（文字講義）', 90], G[11], ['pp2', '模考', '官網新制 PP 模考 2＋逐題檢討', 240]);
  return U;
})();
const GMAT_DO = { RC: '看影片＋講義題＋OG 題（練習題庫，從簡單區開始）', CR: '看影片＋CR 電子題本（按題型）＋詳解影片', 數學: '看影片＋講義題（正確率 70–80% 以上再往下；不到就加練 OG 數學題）', DI: '看影片＋講義題＋A2 精選 DI 練習題' };
const gmatMin = t => { const [m, sec] = t.split(':').map(Number); return m + sec / 60; };
const gmatClock = m => { const x = Math.round(m * 60), h = Math.floor(x / 3600), mm = Math.floor(x % 3600 / 60), ss = x % 60; return `${h}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`; };
const gmatVid = u => Array.isArray(u[3]) ? u[3].reduce((a, v) => a + gmatMin(v[1]), 0) : 0;
const gmatText = u => !Array.isArray(u[3]) ? u[2] : u[3].length === 1 ? `${u[2]}（影片 ${gmatClock(gmatVid(u))}）：${GMAT_DO[u[1]]}` : `${u[2]}（${u[3].length} 支影片共 ${gmatClock(gmatVid(u))}）：${u[3].map(v => `${v[0]} ${v[1]}`).join('、')}`;
// 這天要看的影片段落：依這天排到的時間占整個單元的比例，換算成影片時間
const gmatSeg = (t, r) => {
  const u = GMAT_UNITS.find(x => x[0] === t.gu); if (!u || !Array.isArray(u[3]) || !r) return '';
  const V = gmatVid(u), a = r[0] / t.full * V, b = Math.min(V, r[1] / t.full * V);
  if (u[3].length === 1) return `今天看影片 ${gmatClock(a)} → ${gmatClock(b)}（約 ${Math.round(b - a)} 分鐘，再做這段的題目）`;
  let c = 0; const on = u[3].filter(v => { const s0 = c, s1 = c += gmatMin(v[1]); return s1 > a + 0.5 && s0 < b - 0.5; });
  return `今天看：${on.map(v => `${v[0]}（${v[1]}）`).join('、')}`;
};
const PLAN_MIN = { re: 15, basic: 12, deriv: 18, invest: 15, law: 15, mgmt: 15 }; // 每張知識卡估計分鐘
const PLAN_FAM = [['熟', 0.6], ['普通', 1], ['不熟', 1.5]];
const planPd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const planPs = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const planToday = () => planPs(new Date());
const planMD = s => { const d = planPd(s); return `${d.getMonth() + 1}/${d.getDate()}（${'日一二三四五六'[d.getDay()]}）`; };
const planH = m => { const h = Math.round(m / 60 * 10) / 10; return h + ' 小時'; };

function planSettings() {
  const D = { start: '', dates: { mgmt: '2026-11-04', deriv: '2026-11-16', invest: '2026-11-03', law: '2026-10-28', re: '2026-11-12', reF: '2026-12-17', mgmtF: '2026-12-23', derivF: '2026-12-21', investF: '2026-12-22', lawF: '2026-12-23' }, on: { basic: true, deriv: true, invest: true, law: true, mgmt: true, re: true }, fam: {}, wk: [4, 2, 2, 2, 2, 2, 4], off: [], review: 120, mode: 'seq', reV: 2, reDone: {}, gmatX: 1.8, gmatU: {}, gmatProg: {}, gmatS: {}, taskProg: {}, gmatDays: [0, 1, 2, 3, 4, 5, 6], finR: 1, reports: [{ n: '史記報告', d: '2026-11-26', h: 0 }, { n: 'ESG報告', d: '2026-12-04', h: 0 }, { n: '衍金報告', d: '2026-12-07', h: 0 }, { n: '投資學期末報告', d: '2026-12-15', h: 0 }, { n: '管理學報告', d: '', h: 0 }], habits: { fr: { on: true, min: 30, days: [0, 1, 2, 3, 4, 5, 6] }, ielts: { on: true, min: 45, days: [1, 2, 3, 4, 5] }, invHw: { on: true, min: 60, days: [0], until: '2026-12-23' }, mgmtHw: { on: true, min: 30, days: [5], until: '2026-12-23' } } };
  D.dates.gmat = '2026-12-30'; D.on.gmat = true;
  // 直接補在 ST.plan 上（不換新物件），畫面上拿到的設定才會一直是同一份、改了都存得到
  const S = ST.plan = ST.plan || {};
  Object.keys(D).forEach(k => { if (S[k] === undefined) S[k] = D[k]; });
  ['dates', 'on', 'habits'].forEach(g => Object.keys(D[g]).forEach(k => { if (S[g][k] === undefined || (g === 'dates' && !S[g][k])) S[g][k] = D[g][k]; }));
  // 每週作業只排到學期結束（寒假 12/24 開始）
  ['invHw', 'mgmtHw'].forEach(h => { if (S.habits[h].until === undefined) S.habits[h].until = D.habits[h].until; });
  return ST.plan;
}

// 一科要做的事（依序）：還沒勾「我懂了」的卡片 → 習題 → 公式、講義、條文、申論等固定複習
// 每一項的代號；卡片（我懂了）和不動產單元（看複習卡）以外都能在今天打勾
const planTK = t => t.gs || t.gu || `${t.k}|${t.id || t.sec + '|' + t.t}`;
// GMAT 每個單元切成約 1 小時的段（a、b 是這段在單元裡的起訖分鐘）
const gmatPieces = () => { const P = ST.plan; return GMAT_UNITS.flatMap((u, i) => {
  const full = Math.round(Array.isArray(u[3]) ? gmatVid(u) * (+P.gmatX || 1.8) : u[3]), n = Math.max(1, Math.round(full / 60)), len = full / n;
  return Array.from({ length: n }, (_, s) => ({ id: 'g:' + u[0] + '#' + s, gs: u[0] + '#' + s, gu: u[0], u: 'g' + u[0], ui: i, sec: u[1], t: `${u[2]}${n > 1 ? ` 第 ${s + 1}/${n} 段` : ''}`, seg: gmatSeg({ gu: u[0], full }, [s * len, (s + 1) * len]).replace(/^今天/, ''), min: Math.round(len), a: s * len, b: (s + 1) * len, kind: 'gs' }));
}); };
// GMAT 段：每一天都有自己的勾（像學習卡的「我懂了」）
const planGsItem = t => { const P = ST.plan, done = !!(P.gmatU[t.gu] || (P.gmatS || {})[t.gs]); return `<label class="pit${done ? ' ok' : ''}"><input type="checkbox" class="ick" data-gs="${t.gs}"${done ? ' checked' : ''}${P.gmatU[t.gu] ? ' disabled' : ''} aria-label="這段讀完了"><span>${t.t}${t.seg ? `<br><b class="gseg">▶ ${t.seg}</b>` : ''}</span></label>`; };
const planCheckable = t => t.kind !== 'c' && t.kind !== 'rec' && t.kind !== 'gs';
// 報告、期末範圍、公式教室等：今天打勾的份量記在 taskProg，扣掉後才排（GMAT 記在 gmatProg）
// 今天的進度一天開始就固定（planFrz）：今天排到但還沒勾的，先當作今天會讀完，不再排到之後；沒讀完的明天重算時才回來
function planTasks(k, f) {
  const pr = ST.plan.taskProg || {}, today = planToday(), fz = ST.planFrz && ST.planFrz[today], chk = ST.planChk && ST.planChk[today] || {}, cards = new Set(), pend = {};
  if (fz) Object.entries(fz.blocks).forEach(([bk, b]) => (b.items || []).forEach(t => { if (t.kind === 'c' || t.kind === 'gs') cards.add(t.id); else if (b.tm && b.tm[t.key] && !chk[bk + '§' + t.key]) pend[t.key] = (pend[t.key] || 0) + b.tm[t.key]; }));
  return planTasksAll(k, f).map(t => {
    t.key = planTK(t);
    if (t.kind === 'c' || t.kind === 'gs') return cards.has(t.id) ? null : t;
    const done = t.gu ? 0 : +pr[t.key] || 0, pd = pend[t.key] || 0; if (!done && !pd) return t;
    const m = t.min - done - pd; if (m <= 0.5) return null;
    const o = Object.assign({}, t, { min: m, note: `（剩約 ${planH(m)}）` }); if (t.gu) o.off = t.off + pd; return o;
  }).filter(Boolean);
}

function planTasksAll(k, f) {
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
    // GMAT：照課程順序，每個單元切成約 1 小時的「段」，像學習卡一樣：哪一天都能打勾，勾了就從計畫拿掉、後面的往前補
    // 舊資料：gmatU（整個單元讀完）、gmatProg（讀過的分鐘數，涵蓋到的段算讀完）
    const P = ST.plan, S = P.gmatS || {};
    return gmatPieces().filter(x => !P.gmatU[x.gu] && !S[x.gs] && x.b > (+P.gmatProg[x.gu] || 0) + 0.5).map(x => Object.assign({ k }, x));
  }
  if (k === 're' || k === 'reF') {
    const P = ST.plan;
    // 跟其他科一樣用卡片排：每個單元先看影片（影片看完在設定打勾就不再排），再讀這個單元還沒勾「我懂了」的卡片
    const T = [];
    RE_UNITS.forEach((u, i) => {
      if ((u[1] === 'mid') !== (k === 're')) return;
      const x = DATA.re.sections[i];
      if (!P.reDone[i]) T.push({ k, sec: x.t, t: `看單元 ${i + 1} 影片（約 ${+P.reV || 2} 小時）`, min: Math.round((+P.reV || 2) * 60), kind: 'v' });
      x.cards.forEach(c => { if (!ST.done[c.id]) T.push({ k, id: c.id, sec: x.t, t: c.t, min: PLAN_MIN.re * f, kind: 'c' }); });
    });
    return T;
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
  ['planFrz', 'planChk'].forEach(n => { if (ST[n]) Object.keys(ST[n]).forEach(d => { if (d < today) delete ST[n][d]; }); });
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
  for (let d = planPd(start); planPs(d) < last; d.setDate(d.getDate() + 1)) { const s = planPs(d), fz = ST.planFrz && ST.planFrz[s]; days.push({ d: s, cap: P.off.includes(s) || fz ? 0 : Math.round((+P.wk[d.getDay()] || 0) * 60), total: 0, blocks: {} }); }
  const add = (D, k, m, kind) => { const b = D.blocks[k] = D.blocks[k] || { learn: 0, rev: 0 }; b[kind] += m; D.total += m; };
  subs.forEach(s => {
    const f = (PLAN_FAM.find(x => x[0] === (P.fam[planBase(s.k)] || '普通')) || [0, 1])[1];
    s.tasks = planTasks(s.k, f); s.need = Math.round(s.tasks.reduce((a, t) => a + t.min, 0)); s.left = s.need; s.rev = s.pre || s.report ? 0 : +P.review;
  });
  days.forEach(D => D.full = D.cap);
  // 語言練習和每週作業最先保留（固定的習慣）
  const habits = Object.keys(PLAN_HAB).filter(h => P.habits[h] && P.habits[h].on).map(h => {
    const c = P.habits[h]; let want = 0, got = 0;
    days.forEach(D => { if (!c.days.includes(planPd(D.d).getDay()) || P.off.includes(D.d) || (c.until && D.d > c.until)) return; want += +c.min; const t = Math.min(+c.min, D.cap); if (t > 0) { D.cap -= t; add(D, h, t, 'learn'); got += t; } });
    return { k: h, want, got };
  });
  // 一科一天只讀一個單元：今天這科開始的單元讀完了，就不接著開下一個單元（下一個單元從明天開始）
  const unitOf = t => t.u || t.sec;
  const canTake = (l, s) => s.cur.ti < s.tasks.length && (l.unit[s.k] === undefined || l.unit[s.k] === unitOf(s.tasks[s.cur.ti]));
  const take = (l, s, max) => {
    let got = 0;
    while (got < max - 0.01 && canTake(l, s)) {
      const t = s.tasks[s.cur.ti], a = Math.min(t.min - s.cur.used, max - got);
      l.unit[s.k] = unitOf(t); got += a; s.cur.used += a;
      const it = l.items[s.k] = l.items[s.k] || []; if (!it.includes(t)) it.push(t);
      if (t.key) { const g = l.tm[s.k] = l.tm[s.k] || {}; g[t.key] = (g[t.key] || 0) + a; }
      if (t.gu && t.kind === 'g') { const rg = l.rng[s.k] = l.rng[s.k] || {}, from = t.off + s.cur.used - a; rg[t.gu] = [rg[t.gu] ? rg[t.gu][0] : from, t.off + s.cur.used]; }
      if (s.cur.used >= t.min - 0.01) { s.cur.ti++; s.cur.used = 0; }
    }
    s.left -= got; return got;
  };
  const newL = () => ({ learn: {}, unit: {}, items: {}, tm: {}, rng: {} });
  const commit = (D, l) => Object.entries(l.learn).forEach(([k, m]) => { if (m <= 0) return; add(D, k, m, 'learn'); D.blocks[k].items = l.items[k] || []; if (l.tm[k]) D.blocks[k].tm = l.tm[k]; if (l.rng[k]) D.blocks[k].rng = l.rng[k]; });
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
    let L = [];
    const run = f => {
      G.forEach(s => { s.left = s.need; s.cur = { ti: 0, used: 0 }; });
      L = days.map(newL);
      days.forEach((D, i) => {
        const l = L[i]; let cap = Math.min(base[i], Math.round(base[i] * f / 15) * 15), cur = null;
        while (cap >= 15) {
          const cand = G.filter(s => s.left > 0.01 && D.d < s.exam && (!s.after || D.d >= s.after) && canTake(l, s));
          if (!cand.length) break;
          let best = cand[0]; // 一科一科：考試最早的先讀
          if (P.mode === 'mix') {
            // 多科同時：分給「剩下的內容 ÷ 考前剩下的時間」最緊迫的科目，同一天盡量少換科
            cand.forEach(s => { let c = 0; for (let j = i; j < days.length && days[j].d < s.exam; j++) c += j === i ? cap : Math.round(base[j] * f / 15) * 15; s.u = s.left / Math.max(c, 1); });
            best = cand.reduce((x, y) => y.u > x.u ? y : x);
            if (cur && cand.includes(cur) && cur.u >= best.u * 0.75) best = cur;
          }
          const got = take(l, best, Math.min(30, cap));
          cap -= got; l.learn[best.k] = (l.learn[best.k] || 0) + got; cur = best;
        }
      });
      return G.every(s => s.left <= 0.01);
    };
    let f = 1;
    if (run(1)) { let lo = 0, hi = 1; for (let n = 0; n < 16; n++) { const m = (lo + hi) / 2; run(m) ? hi = m : lo = m; } f = Math.min(1, hi * 1.1); if (!run(f)) run(f = hi); }
    days.forEach((D, i) => { commit(D, L[i]); D.cap = base[i] - Object.values(L[i].learn).reduce((x, y) => x + y, 0); });
  };
  subs.forEach(s => { if (s.after && s.after <= start) delete s.after; });
  phase(subs.filter(s => !s.after && !s.steady));
  // 期末範圍和報告：期中考後（報告是繳交前三週）才開始，一樣用平均的每日量排
  phase(subs.filter(s => s.after));
  // GMAT：考期長，用期中考內容排完後剩下的時間，依比例平均分到每一天（期中考後自然會變多）；一樣一天一個單元
  subs.filter(s => s.steady).forEach(s => {
    const idx = days.map((D, i) => i).filter(i => days[i].d < s.exam && days[i].cap >= 30 && P.gmatDays.includes(planPd(days[i].d).getDay())), sum = idx.reduce((a, i) => a + days[i].cap, 0);
    s.left = s.need; if (!sum) return;
    const tryF = f => { s.left = s.need; s.cur = { ti: 0, used: 0 }; const L = {}; idx.forEach(i => { if (s.left <= 0.01) return; const cap = days[i].cap, m = Math.min(cap, f >= 1 ? cap : Math.round(cap * f / 30) * 30); if (m < 15) return; const l = L[i] = newL(); l.learn[s.k] = take(l, s, m); }); return L; };
    let f = Math.min(1, s.need * 1.05 / sum), L = tryF(f);
    while (s.left > 0.5 && f < 1) { f = Math.min(1, f * 1.15); L = tryF(f); }
    Object.entries(L).forEach(([i, l]) => { const D = days[i]; D.cap -= l.learn[s.k]; commit(D, l); });
  });
  subs.forEach(s => s.got = s.need - Math.max(0, s.left));
  // 今天打過勾就固定今天的內容（不會因為扣掉進度又塞新的進來）
  // 今天第一次排出來就存起來，之後打勾、勾「我懂了」都不會再補新的進來
  const tD = days.find(D => D.d === today);
  if (tD && !(ST.planFrz && ST.planFrz[today]) && Object.keys(tD.blocks).length) { ST.planFrz = ST.planFrz || {}; ST.planFrz[today] = { blocks: JSON.parse(JSON.stringify(tD.blocks)), total: tD.total, at: Date.now() }; save(); return buildPlan(); }
  days.forEach(D => { const fz = ST.planFrz && ST.planFrz[D.d]; if (fz) { D.blocks = fz.blocks; D.total = fz.total; D.frozen = true; } });
  return { P, start, subs, days, habits };
}

function planBlockHTML(k, b, exam, d, chk) {
  // chk：今天才有，每項前面加勾勾（卡片用「我懂了」、不動產單元用設定裡的勾，所以不加）
  const ck = ik => chk ? `<input type="checkbox" class="ick" data-ick="${ik}"${chk[ik] ? ' checked' : ''} aria-label="這項完成">` : '';
  const line = (ik, html) => chk ? `<label class="pit${chk[ik] ? ' ok' : ''}">${ck(ik)}<span>${html}</span></label>` : html;
  if (PLAN_HAB[k]) return `<div class="pblk ${k}"><div class="pbh"><b>${PLAN_HAB[k][0]}</b><span>${b.learn} 分鐘</span></div><p>${line(k + '§hab', k === 'ielts' ? IELTS_DAY[planPd(d).getDay()] : PLAN_HAB[k][1])}</p></div>`;
  const groups = []; (b.items || []).forEach(t => { const g = groups.find(x => x.sec === t.sec); g ? g.items.push(t) : groups.push({ sec: t.sec, items: [t] }); });
  const item = (t, sep = '') => t.kind === 'gs' ? planGsItem(t)
    : t.kind === 'g' && ST.plan.gmatU[t.gu] ? `<s>${t.t}</s> <b class="gseg">✓ 整個單元讀完了</b>` : t.kind === 'g' ? `${t.t}${t.note || ''}${(x => x ? `<br><b class="gseg">▶ ${x}</b>` : '')(gmatSeg(t, b.rng && b.rng[t.gu]))} <button type="button" class="linkish" data-gu="${t.gu}">整個單元讀完了 ✓</button>`
    : t.kind === 'v' ? t.t + (t.note || '') + sep : t.kind === 'rec' ? `${t.t} <button type="button" class="linkish refcfa" data-pj="re|${t.id}|c|">看複習卡</button>${sep}`
    : `<button type="button" class="linkish${t.kind === 'c' && ST.done[t.id] ? ' pdn' : ''}" data-pj="${planBase(t.k)}|${t.id || ''}|${t.kind}|${t.tab || ''}">${t.kind === 'c' && ST.done[t.id] ? '✓ ' : ''}${t.t}${t.note ? '' : sep}</button>${t.note ? t.note + sep : ''}`;
  // 頓號跟前一項黏在一起，不會跑到下一行開頭
  const list = items => items.map((t, i) => { if (t.kind === 'gs') return item(t); const c = chk && planCheckable(t), nx = items[i + 1], sep = !c && nx && !(chk && planCheckable(nx)); return c ? (t.gu && ST.plan.gmatU[t.gu] ? `<label class="pit ok"><input type="checkbox" class="ick" checked disabled aria-label="這項完成"><span>${item(t)}</span></label>` : line(k + '§' + t.key, item(t))) : item(t, sep ? '、' : ''); }).join('');
  const rev = DATA[planBase(k)] ? `<button type="button" class="linkish" data-pj="${planBase(k)}||x|mcq">打怪模式＋錯題本</button>，再快速翻過所有卡片的「白話」${planBase(k) === 'deriv' ? '，整理 A4 小抄' : ''}` : k === 'gmat' ? '最後一份模考、看錯題本、確認考試流程和作息' : '重看各單元筆記和影片重點，整理考試範圍的公式與名詞';
  return `<div class="pblk ${planHue(k)}"><div class="pbh"><b>${PLAN_NAME[k]}${/F$/.test(k) ? '（期末範圍）' : /^rp/.test(k) ? '（報告）' : ''}</b><span>${planH(b.learn + b.rev)}</span></div>
    ${groups.map(g => `<p><span class="psec">${g.sec}</span>${list(g.items)}${g.items[0].kind === 'gs' && !ST.plan.gmatU[g.items[0].gu] ? ` <button type="button" class="linkish" data-gu="${g.items[0].gu}">整個單元讀完了 ✓</button>` : ''}</p>`).join('')}
    ${b.rev ? `<p><span class="psec">考前總複習</span>${line(k + '§rev', rev + (exam ? `（${planMD(exam)} 考試）` : ''))}</p>` : ''}</div>`;
}

function renderPlan(root) {
  const P = planSettings();
  root.innerHTML = `<div class="pagehead"><h2>讀書進度表</h2><p class="intro">依考試先後，把各科還沒掌握的卡片、習題、影片課和 GMAT 排進每一天（每科一天只讀一個單元），加上語言練習和每週作業，考前留給總複習。今天的進度一天開始就固定：讀完一項就打勾（卡片勾「我懂了」），不會再補新的進來；沒讀完的明天重新排。</p></div>
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
  <section class="setbox"><h3>3. GMAT、語言練習與每週作業</h3><div class="plsubs">
    <div class="plrow gmat"><label class="pln"><input type="checkbox" data-on="gmat"${P.on.gmat ? ' checked' : ''}> <b>GMAT</b></label><label class="pld">考試 <input type="date" data-date="gmat" value="${P.dates.gmat || ''}"></label>
      <label>每堂課 ≈ 影片 × <select id="plgx">${[1.3, 1.5, 1.8, 2, 2.5].map(x => `<option value="${x}"${x === +P.gmatX ? ' selected' : ''}>${x} 倍</option>`).join('')}</select></label><span class="sm-p">還要 <b data-need="gmat"></b></span><span class="hdays">${[1, 2, 3, 4, 5, 6, 0].map(i => `<label><input type="checkbox" data-gday="${i}"${P.gmatDays.includes(i) ? ' checked' : ''}>${'日一二三四五六'[i]}</label>`).join('')}</span>
      <details class="reunits"><summary>單元進度（照順序一次讀一個；讀完打勾，就不會再排）</summary>${GMAT_UNITS.map((u, i) => [u[0], `${i + 1}. ${u[1]}｜${u[2]}`]).map(([g, n]) => `<label><input type="checkbox" data-gud="${g}"${P.gmatU[g] ? ' checked' : ''}> ${n}</label>`).join('')}</details></div>
    ${Object.keys(PLAN_HAB).map(h => { const c = P.habits[h]; return `<div class="plrow ${h}"><label class="pln"><input type="checkbox" data-hon="${h}"${c.on ? ' checked' : ''}> <b>${PLAN_HAB[h][0]}</b></label><label>每次 <select data-hmin="${h}">${[15, 30, 45, 60, 90].map(m => `<option value="${m}"${m === +c.min ? ' selected' : ''}>${m} 分鐘</option>`).join('')}</select></label><span class="hdays">${[1, 2, 3, 4, 5, 6, 0].map(i => `<label><input type="checkbox" data-hday="${h}|${i}"${c.days.includes(i) ? ' checked' : ''}>${'日一二三四五六'[i]}</label>`).join('')}</span>${c.until !== undefined ? `<label>排到 <input type="date" data-huntil="${h}" value="${c.until || ''}"></label>` : ''}</div>`; }).join('')}
    </div><p class="sm-p">GMAT 照補習班的上課順序（RC1 → CR1 → 數學1 → …），上完再輪流做數學練習和 GWD，最後 PP 模考；每堂課的時間 = 影片長度 × 倍數（看影片＋做題）。一天只讀一個單元，一個單元可能分兩三天，只排在勾的星期幾。單元打開可以看順序、讀完打勾。語言練習和每週作業（週日投資學報告、週五管理學作業，排到 12/23）每天最先保留。</p></section>
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

  const gmatDoneToday = () => { const g = Object.keys(P.gmatU).filter(g => P.gmatU[g] === planToday()); return g.length ? `<div class="pblk gmat"><div class="pbh"><b>GMAT 今天讀完 ✓</b></div><p>${g.map(x => `${(u => u ? `${u[1]}｜${u[2]}` : x)(GMAT_UNITS.find(u => u[0] === x))} <button type="button" class="linkish" data-gun="${x}">取消（退回 10 XP）</button>`).join('、')}</p></div>` : ''; };
  // GMAT 下一步：今天排到的 GMAT 段都勾了（或今天沒排 GMAT），就把下一段放在今天，想多讀就讀；勾了一樣馬上重排
  const gmatFam = () => (PLAN_FAM.find(x => x[0] === (P.fam.gmat || '普通')) || [0, 1])[1];
  const gmatNext = todayD => {
    const today = planToday(), fz = ST.planFrz && ST.planFrz[today], gb = ((fz || todayD || {}).blocks || {}).gmat;
    const left = gb && (gb.items || []).some(t => t.kind === 'gs' ? !(P.gmatU[t.gu] || P.gmatS[t.gs]) : !P.gmatU[t.gu] && !((ST.planChk || {})[today] || {})['gmat§' + t.key]);
    if (!P.on.gmat || left) return '';
    const t = planTasks('gmat', gmatFam()).find(x => x.kind === 'gs');
    const inToday = new Set(gb ? (gb.items || []).map(x => x.gs) : []), doneT = gmatPieces().filter(x => P.gmatS[x.gs] === today && !inToday.has(x.gs));
    if (!t && !doneT.length) return '';
    return `<div class="pblk gmat gnext"><div class="pbh"><b>GMAT 下一步（${gb ? '今天的讀完了，' : ''}想多讀就讀這段）</b>${t ? `<span>${planH(t.min)}</span>` : ''}</div>
      ${doneT.length ? `<p><span class="psec">今天提前讀完</span>${doneT.map(planGsItem).join('')}</p>` : ''}
      ${t ? `<p><span class="psec">${t.sec}</span>${planGsItem(t)} <button type="button" class="linkish" data-gu="${t.gu}">整個單元讀完了 ✓</button></p>` : ''}</div>`;
  };
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
      ${R.subs.length ? `<div class="tblwrap"><table class="tbl plsum"><thead><tr><th>科目</th><th>考試</th><th>需要</th><th>狀態</th></tr></thead><tbody>${R.subs.map(s => { const short = s.left + (s.revShort || 0), md = planPd(s.exam); return `<tr><td><b>${PLAN_NAME[s.k]}</b>${s.report ? '<small>報告</small>' : s.final ? '<small>期末</small>' : ''}</td><td>${md.getMonth() + 1}/${md.getDate()}${s.pre ? '<small>前讀完</small>' : ''}</td><td>${planH(s.need + s.rev)}</td><td>${short > 0 ? `<span class="pill bad">還差 ${planH(short)}</span>` : '<span class="pill good">排得完</span>'}</td></tr>`; }).join('')}</tbody></table></div>
      ${R.habits.length ? `<p class="sm-p">固定練習與每週作業：${R.habits.map(h => `${PLAN_HAB[h.k][0]} ${planH(h.got)}${h.got < h.want ? `（還差 ${planH(h.want - h.got)}）` : ''}`).join('、')}</p>` : ''}<p class="sm-p">到 ${planMD(R.days[R.days.length - 1] ? R.days[R.days.length - 1].d : R.start)} 為止，可讀時間共 ${planH(have)}（平均每天 ${planH(have / nd)}），全部排完需要 ${planH(need)}（<b>平均每天 ${planH(need / nd)}</b>）。${R.subs.some(s => s.left + (s.revShort || 0) > 0) || R.habits.some(h => h.got < h.want) ? '<b class="warnt">時間不夠：可以增加每天的時數、把比較熟的科目改成「熟」，或先讀進度表排到的部分。</b>' : `時間足夠，每天只排需要的量${have > need * 1.2 ? '，多出來的時間可以玩小遊戲或複習錯題本' : ''}。`}</p>` : '<p>先在上面填期中考日期，就會產生進度表。</p>'}`;
    const exams = {}; R.subs.filter(s => !s.pre).forEach(s => (exams[s.exam] = exams[s.exam] || []).push(PLAN_NAME[s.k] + (s.report ? ' 繳交' : s.final ? '期末考' : s.steady ? ' 考試' : '期中考')));
    let html = '', wk = '';
    R.days.forEach(D => {
      const d = planPd(D.d), mon = new Date(d); mon.setDate(d.getDate() - (d.getDay() + 6) % 7);
      const wkKey = planPs(mon); if (wkKey !== wk) { wk = wkKey; const sun = new Date(mon); sun.setDate(mon.getDate() + 6); html += `<h4 class="pweek">${mon.getMonth() + 1}/${mon.getDate()} – ${sun.getMonth() + 1}/${sun.getDate()} 這週</h4>`; }
      const ks = Object.keys(D.blocks), done = ST.planDone && ST.planDone[D.d], chk = D.d === today ? (ST.planChk && ST.planChk[today]) || {} : null;
      const inner = ks.map(k => planBlockHTML(k, D.blocks[k], R.subs.find(s => s.k === k && D.blocks[k].rev) ? R.subs.find(s => s.k === k).exam : '', D.d, chk)).join('');
      html += `<div class="pday${D.d === today ? ' today' : ''}${done ? ' done' : ''}" id="pd-${D.d}"><div class="pdh"><b>${planMD(D.d)}${D.d === today ? ' · 今天' : ''}</b><span class="sm-p">${P.off.includes(D.d) ? '不讀書' : D.frozen && done ? '今天的進度完成 ✓' : ks.length ? planH(D.total) : '休息'}</span>${ks.length ? `<label class="chk"><input type="checkbox" data-pdone="${D.d}"${done ? ' checked' : ''}> 完成</label>` : ''}</div>
        ${inner}${D.d === today ? gmatDoneToday() + gmatNext(D) : ''}</div>`;
      const nd = new Date(d); nd.setDate(d.getDate() + 1); const ns = planPs(nd);
      if (exams[ns]) html += `<div class="pexam"><b>${planMD(ns)}</b> ${exams[ns].map(n => `<span class="pill bad">${n}</span>`).join(' ')}</div>`;
    });
    $('#pldays', root).innerHTML = html || '<p class="sm-p">目前沒有要排的內容。</p>';
    $$('[data-pj]', root).forEach(b => b.onclick = () => planJump(b.dataset.pj));
    $$('[data-gu]', root).forEach(b => b.onclick = () => gmatMark(b.dataset.gu, true, b));
    $$('[data-gun]', root).forEach(b => b.onclick = () => gmatMark(b.dataset.gun, false, b));
    // GMAT 段：像學習卡的「我懂了」，哪一天都能勾；勾了馬上重排（今天已排的會打勾留著，之後的日子往前補）
    $$('[data-gs]', root).forEach(cb => cb.onchange = () => { const g = cb.dataset.gs; P.gmatS = P.gmatS || {}; if (cb.checked) { P.gmatS[g] = planToday(); FUN.xp(5, cb); FUN.beep('ok'); } else { delete P.gmatS[g]; FUN.xp(-5, cb); } redraw(); });
    // 今天每一項打勾：記下這項今天排的份量（報告、期末範圍、GMAT…），取消就扣回；全部勾完自動算今天完成
    const todayD = R.days.find(x => x.d === today);
    const freeze = () => { ST.planFrz = ST.planFrz || {}; if (!ST.planFrz[today] && todayD) ST.planFrz[today] = { blocks: JSON.parse(JSON.stringify(todayD.blocks)), total: todayD.total, at: Date.now() }; };
    const allIk = () => { const B = (ST.planFrz && ST.planFrz[today] || todayD || {}).blocks || {}; return Object.entries(B).flatMap(([k, b]) => PLAN_HAB[k] ? [k + '§hab'] : (b.items || []).filter(t => planCheckable(t) && !(t.gu && P.gmatU[t.gu])).map(t => k + '§' + t.key).concat(b.rev ? [k + '§rev'] : [])); };
    const progAdd = (key, m) => { const map = GMAT_UNITS.some(u => u[0] === key) ? P.gmatProg : (P.taskProg = P.taskProg || {}); map[key] = Math.max(0, (+map[key] || 0) + m); if (map[key] < 0.5) delete map[key]; };
    const setItem = (ik, on, el, quiet) => {
      ST.planChk = ST.planChk || {}; const c = ST.planChk[today] = ST.planChk[today] || {};
      if (!!c[ik] === on) return;
      freeze();
      const [k, key] = ik.split('§'), b = ST.planFrz[today].blocks[k], m = b && b.tm ? +b.tm[key] || 0 : 0;
      if (on) { c[ik] = { m, q: !!quiet }; if (m) progAdd(key, m); if (!quiet) { FUN.xp(2, el); FUN.beep('ok'); } }
      else { const r = c[ik]; delete c[ik]; if (r.m) progAdd(key, -r.m); if (!r.q) FUN.xp(-2, el); }
      if (!Object.keys(c).length) delete ST.planChk[today];
    };

    $$('[data-ick]', root).forEach(cb => cb.onchange = () => {
      setItem(cb.dataset.ick, cb.checked, cb);
      ST.planDone = ST.planDone || {};
      const c = ST.planChk && ST.planChk[today] || {}, all = allIk();
      if (all.length && all.every(ik => c[ik]) && !ST.planDone[today]) { ST.planDone[today] = 1; FUN.xp(5, cb); FUN.toast('今天的進度全部完成！', 'happy'); }
      else if (!all.every(ik => c[ik]) && ST.planDone[today]) { delete ST.planDone[today]; FUN.xp(-5, cb); }
      redraw();
    });
    $$('[data-pdone]', root).forEach(cb => cb.onchange = () => {
      ST.planDone = ST.planDone || {}; const d = cb.dataset.pdone;
      if (cb.checked === !!ST.planDone[d]) return;
      if (cb.checked) { if (d === today) { freeze(); allIk().forEach(ik => setItem(ik, true, cb, true)); } ST.planDone[d] = 1; FUN.xp(5, cb); FUN.beep('ok'); }
      else { delete ST.planDone[d]; FUN.xp(-5, cb); if (d === today) { Object.entries(ST.planChk && ST.planChk[today] || {}).filter(([, r]) => r.q).forEach(([ik]) => setItem(ik, false, cb, true)); } }
      redraw();
    });
  };
  const stamp = () => { const d = new Date(); P.savedAt = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; save(); const el = $('#plsaved', root); if (el) el.textContent = `已儲存 ✓ ${P.savedAt}`; };
  const redraw = () => { save(); draw(); };
  // 改設定（日期、時數、科目）：今天還沒讀任何東西才重排今天；已經開始讀就只改明天以後
  const upd = () => {
    const t = planToday(), fz = ST.planFrz && ST.planFrz[t];
    const started = (ST.planChk && ST.planChk[t]) || (ST.planDone && ST.planDone[t]) || (fz && Object.values(fz.blocks).some(b => (b.items || []).some(x => x.kind === 'c' && ST.done[x.id])));
    if (fz && !started) delete ST.planFrz[t];
    redraw();
    // 重排過的今天要蓋過其他裝置更早固定的版本（同步時比 re）
    if (fz && !started && ST.planFrz && ST.planFrz[t]) { ST.planFrz[t].re = Date.now(); save(); }
  };
  // GMAT 單元讀完／取消：+10 XP，取消就退回（可能降級）；記下哪天讀完，當天可以在進度表上取消
  const gmatMark = (g, on, el) => {
    if (!!P.gmatU[g] === on) return;
    if (on) { P.gmatU[g] = planToday(); FUN.xp(10, el); FUN.beep('ok'); } else { delete P.gmatU[g]; FUN.xp(-10, el); }
    const cb = $(`[data-gud="${g}"]`, root); if (cb) cb.checked = on; redraw();
  };
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
  $('#plgx', root).onchange = e => { P.gmatX = +e.target.value; upd(); };
  $$('[data-gday]', root).forEach(cb => cb.onchange = () => { const i = +cb.dataset.gday; P.gmatDays = cb.checked ? P.gmatDays.concat(i) : P.gmatDays.filter(x => x !== i); upd(); });
  $$('[data-gud]', root).forEach(cb => cb.onchange = () => gmatMark(cb.dataset.gud, cb.checked, cb));
  $$('[data-hon]', root).forEach(cb => cb.onchange = () => { P.habits[cb.dataset.hon].on = cb.checked; upd(); });
  $$('[data-hmin]', root).forEach(s => s.onchange = () => { P.habits[s.dataset.hmin].min = +s.value; upd(); });
  $$('[data-huntil]', root).forEach(i => i.onchange = () => { P.habits[i.dataset.huntil].until = i.value; upd(); });
  $$('[data-hday]', root).forEach(cb => cb.onchange = () => { const [h, i] = cb.dataset.hday.split('|'), c = P.habits[h]; c.days = cb.checked ? c.days.concat(+i) : c.days.filter(x => x !== +i); upd(); });
  $('#plreh', root).oninput = e => { P.reV = Math.max(0.5, Math.min(6, +e.target.value || 2)); upd(); };
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
  const pd = ST.planDone && ST.planDone[planToday()];
  if (pd && ST.planFrz && ST.planFrz[planToday()]) return `<button type="button" class="cfahome plhome" id="toplan"><span class="cfahi">${navIcon('plan')}</span><span><b>今天的進度完成了 ✓</b><span>休息一下，或玩小遊戲複習錯題本</span></span><span class="cfago">→</span></button>`;
  const R = buildPlan(), D = R.days.find(x => x.d === planToday()), ks = D ? Object.keys(D.blocks) : [];
  return `<button type="button" class="cfahome plhome" id="toplan"><span class="cfahi">${navIcon('plan')}</span><span><b>今天要讀${ks.length ? ` · ${planH(D.total)}` : ''}</b><span>${ks.length ? ks.map(k => { const b = D.blocks[k]; const n = (b.items || []).filter(t => t.kind === 'c').length; return `${PLAN_NAME[k]} ${planH(b.learn + b.rev)}${n ? `（${n} 張卡）` : b.rev ? '（考前總複習）' : ''}`; }).join('、') : '今天沒有排進度，休息一下或複習錯題本'}</span></span><span class="cfago">→</span></button>`;
}

function planReRow(P) {
  return `<div class="plrow re"><label class="pln"><input type="checkbox" data-on="re"${P.on.re ? ' checked' : ''}> <b>不動產財管</b></label>
    <label class="pld">期中考 <input type="date" data-date="re" value="${P.dates.re || ''}"></label><label class="pld">期末考 <input type="date" data-date="reF" value="${P.dates.reF || ''}"></label>
    <label>每單元影片 <input type="number" id="plreh" min="0.5" max="6" step="0.5" value="${+P.reV || 2}" inputmode="decimal"> 小時</label>
    <label>熟悉度 <select data-fam="re">${PLAN_FAM.map(f => `<option${(P.fam.re || '普通') === f[0] ? ' selected' : ''}>${f[0]}</option>`).join('')}</select></label><span class="sm-p">需要 <b data-need="re"></b></span>
    <details class="reunits"><summary>影片進度（影片看完打勾就不再排；卡片照「我懂了」排）</summary>${RE_UNITS.map((u, i) => `<label><input type="checkbox" data-redone="${i}"${P.reDone[i] ? ' checked' : ''}> ${i + 1}. ${u[0]} <span class="pill">${u[1] === 'mid' ? '期中' : '期末'}</span></label>`).join('')}</details></div>`;
}
