// ===== 期中考完：期中範圍搬到 DATA.{科目}M，科目頁頂端用「期中｜期末」切換 =====
// 期中的知識卡、公式、大抄、統整筆記搬到 DATA.{科目}M（卡片 id 不變，打勾、筆記、螢光筆都還在）；
// 期中的題目（選擇題、習題、變化題、講義問題、申論、情境題、配對、分類）不保留。
// 這個檔排在所有期中資料檔之後、期末資料檔（f_*.js）之前：期末內容會從空的科目重新加進來。
const TERM = { subj: ['deriv', 'invest', 'law', 'mgmt', 're'] };
// 學期：導覽列只放目前學期的科目，其他學期和常駐的科目都在「書架」。
// 換學期時：在 sems 加一個學期（新科目的 key 放進 subj）、把 cur 改成新學期，舊學期就整層收上書架。
TERM.sems = [
  { id: 'y3a', t: '大三上', sub: '2026 秋', subj: ['deriv', 'invest', 'law', 'mgmt', 're'] }
];
TERM.cur = 'y3a';
TERM.perm = ['basic', 'cfa']; // 常駐：不屬於任何學期
// 考試日期（顯示倒數用）
TERM.exam = {
  re: { mid: '2026-11-12', fin: '2026-12-17' }, deriv: { mid: '2026-11-16', fin: '2026-12-21' },
  invest: { fin: '2026-12-22' }, law: { fin: '2026-12-23' }, mgmt: { mid: '2026-11-04', fin: '2026-12-23' }
};
TERM.nav = () => (TERM.sems.find(s => s.id === TERM.cur) || { subj: [] }).subj;
(() => {
  const KEEP = ['formulas', 'cheat', 'sums'];
  const QUIZ = ['mcq', 'mcqEn', 'problems', 'gens', 'flash', 'essays', 'cases', 'match', 'extraPairs', 'sort'];
  const FINAL = {
    deriv: '課本：Hull《Options, Futures & Other Derivatives》11版。期末考 2026/12/21，範圍 Ch10 選擇權市場、Ch11 股票選擇權的性質、Ch12 選擇權交易策略、Ch13 二元樹。可帶 A4 手抄小抄（不可抄考古題和習題）＋計算機，英文作答。期中範圍按上面的「期中」切換。',
    invest: '期末考 2026/12/22。期中後的範圍：產業分析（產業生命週期、景氣循環與產業、波特五力）、財務報表分析（三大報表、ROE／ROA、杜邦分析、週轉率、償債能力、成長潛力），以及期中考上課講解的個人借貸與槓桿工具。期中範圍按上面的「期中」切換。',
    law: '期末考 2026/12/23。期中後進入勞動法：招募、就業與歧視（就服法§5、性平法、中高齡就促法、二階段審查、直接／間接歧視、舉證責任、招募流程五關）。選擇題重點仍是「條號＋關鍵字」和把案例套進要件。期中的民法範圍和條文速記表按上面的「期中」切換。',
    mgmt: 'Robbins & Coulter《Management》15 版。期末考 12/23（第 16 週），範圍：Ch12 人力資源管理、Ch17 領導、Ch18 控制（含 18a 規劃與控制技術、18b 作業管理）。題型預計和期中一樣是選擇題 → 到「遊戲＆打怪」選單元練。期中範圍按上面的「期中」切換。',
    re: '清大磨課師（影片課）。期末 12/17：單元 7–9（MBS Ⅲ與衍生品、逆向房貸與房市危機）。這裡依單元標題整理重點，看完影片後用來複習；細節以老師的講義為準。期中的單元 1–6 按上面的「期中」切換。'
  };
  TERM.subj.forEach(k => {
    const d = DATA[k];
    const m = { name: d.name, full: d.full + '・期中', hue: d.hue, intro: d.intro, archived: true, sections: d.sections };
    KEEP.forEach(f => { if (d[f] && (typeof d[f] === 'string' || d[f].length)) m[f] = d[f]; });
    if (m.cheat) m.cheat = m.cheat.replace(/<a class="plink"[^>]*>([^<]*)<\/a>/g, '$1'); // 期中題目不保留，大抄裡跳到題目的連結拿掉
    if (k === 're') {
      // 不動產：單元 1–6 是期中、7–9 是期末，期末的卡片和題目留在原處
      const fin = s => +s.id.replace('re', '') >= 7;
      m.sections = d.sections.filter(s => !fin(s));
      d.sections = d.sections.filter(fin);
      const ids = d.sections.map(s => s.id);
      d.mcq = (d.mcq || []).filter(q => ids.includes(q.u));
    } else {
      d.sections = [];
      QUIZ.forEach(f => { if (d[f]) d[f] = []; });
      delete d.cheat;
      if (d.formulas) d.formulas = [];
    }
    if (k === 'law') delete d.sums;
    d.intro = FINAL[k];
    DATA[k + 'M'] = m;
  });
  // 期中的卡片（我的筆記、CFA 連結、跳到卡片時用）
  TERM.midCards = k => DATA[k + 'M'] ? DATA[k + 'M'].sections.reduce((a, x) => a.concat(x.cards), []) : [];
  TERM.isMid = (k, id) => TERM.midCards(k).some(c => c.id === id);
  // 跳到某張卡或某個公式前，先把範圍切到它所在的期中或期末
  TERM.focus = (k, id) => { if (DATA[k + 'M']) (ST.rng = ST.rng || {})[k] = TERM.isMid(k, id) || (DATA[k + 'M'].formulas || []).some(f => f.id === id) ? 'mid' : 'fin'; };
})();
// 選擇題正確答案平均分到四個位置：把正確選項和目標位置的選項對調（只用在期末新題目）
TERM.balance = list => list.forEach((q, i) => {
  const t = [2, 0, 3, 1][i % 4];
  if (q.a === t) return;
  const o = q.o.slice(); [o[q.a], o[t]] = [o[t], o[q.a]]; q.o = o; q.a = t;
});
