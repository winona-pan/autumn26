// ===== CFA 特區：考試介紹、十大科目、報名費用、日程、讀書計畫、小測驗 =====
// 資料整理自 CFA Institute 官網與各補習班整理（2026 年 10 月），日期與費用以官網為準
const CFA_LINK = {
  home: 'https://www.cfainstitute.org/programs/cfa-program',
  l1: 'https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam',
  l2: 'https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-ii-exam',
  l3: 'https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-iii-exam',
  fees: 'https://www.cfainstitute.org/programs/cfa-program/dates-fees',
  cur: 'https://www.cfainstitute.org/programs/cfa-program/curriculum',
  pol: 'https://www.cfainstitute.org/programs/cfa-program/policies',
  sch: 'https://www.cfainstitute.org/programs/cfa-program/scholarships',
  eth: 'https://www.cfainstitute.org/standards/professionals/code-ethics-standards',
  tw: 'https://www.cfasociety.org/taiwan'
};

const CFA_LEVELS = [
  { lv: 'Level I', focus: '工具和觀念：認識每一種投資工具、會用公式', fmt: '180 題單選（A/B/C 三選一），分兩場、每場 90 題 135 分鐘，每題約 90 秒', win: '2、5、8、11 月', fee: '早鳥 USD 1,140／一般 1,490', pass: '2025：45%、45%、43%、43%；2026/2：45%（歷史平均 41%）' },
  { lv: 'Level II', focus: '應用和估值：把工具用在真實案例上分析、評價', fmt: '22 組案例題組（item sets），每組一段情境＋4 題選擇，共 88 題；兩場各 132 分鐘', win: '5、8、11 月', fee: '早鳥 USD 1,140／一般 1,490', pass: '2025：54%、44%、42%（歷史平均 46%）' },
  { lv: 'Level III', focus: '投資組合管理：替客戶做資產配置、整體規劃', fmt: '11 組選擇題組＋11 組申論題組（constructed response，用英文寫），兩場各 132 分鐘', win: '2、8 月', fee: '早鳥 USD 1,240／一般 1,590', pass: '2025：49%、50%；2026/2：50%（歷史平均 55%）' }
];

// Level I 十科：w26/w27 是 2026、2027 年考試的權重（%）
const CFA_L1 = [
  { k: 'eth', n: '道德與專業準則', en: 'Ethical and Professional Standards', w26: [15, 20], w27: [10, 15], s: 1,
    what: 'CFA 協會的道德規範（Code of Ethics）和七大專業行為準則（Standards I–VII），加上全球投資績效標準 GIPS。題目多是情境題：「這位分析師有沒有違反準則？違反哪一條？」',
    keys: ['Code of Ethics 六條原則：誠信、把客戶利益放第一、獨立客觀、維持專業能力……', 'Standards I–VII（下面有完整表）', 'GIPS：績效要怎麼公平地計算和呈現', '情境題判斷：先看「誰的利益受損」，再對應條文'],
    tip: '權重最高的單科之一。看起來像常識，但條文細節（例如什麼算重大非公開資訊）很容易判斷錯，要多做情境題。2027 年起權重降到 10–15%。' },
  { k: 'quant', n: '計量方法', en: 'Quantitative Methods', w26: [6, 9], w27: [11, 14], s: 1,
    what: '報酬率怎麼算、貨幣時間價值、統計與機率、抽樣與假設檢定、簡單線性迴歸，以及大數據與機器學習的入門觀念。',
    keys: ['持有期間報酬、年化報酬、連續複利', '金額加權 vs 時間加權報酬（money- vs time-weighted）', '貨幣時間價值：PV、FV、年金、NPV、IRR', '平均數、變異數、偏態、峰態', '期望值、條件機率、貝氏定理', '共變異數、相關係數、投組變異數', '中央極限定理、信賴區間', '假設檢定：t 檢定、型一／型二錯誤、p 值', '簡單線性迴歸：斜率、R²、ANOVA', '蒙地卡羅模擬、bootstrap'],
    tip: '計算機要練熟（TVM、CF、NPV/IRR 功能）。2027 年權重大增到 11–14%，題目會更多。' },
  { k: 'econ', n: '經濟學', en: 'Economics', w26: [6, 9], w27: [6, 9], s: 1,
    what: '個體經濟（廠商和市場結構）、總體經濟（景氣循環、財政和貨幣政策）、國際貿易與匯率。',
    keys: ['四種市場結構：完全競爭、獨占性競爭、寡占、獨占', '景氣循環的各階段與領先指標', '貨幣政策工具與傳導、財政政策乘數', '國際貿易、資本流動、地緣政治風險', '匯率：交叉匯率、遠期升貼水、拋補利率平價'],
    tip: '匯率報價（誰是基準貨幣）最常算錯，衍金課的匯率期貨報價可以一起複習。' },
  { k: 'fsa', n: '財務報表分析', en: 'Financial Statement Analysis', w26: [11, 14], w27: [11, 14], s: 1,
    what: '讀懂三大報表，並知道會計選擇（存貨、折舊、租賃、所得稅）會怎麼改變數字和比率。預設用 IFRS，題目有說才用 US GAAP。',
    keys: ['損益表、資產負債表、現金流量表（直接法 vs 間接法）', '財務比率與杜邦分析（ROE 拆解）', '存貨：FIFO、加權平均、LIFO（只有 US GAAP 允許）', '長期資產：資本化 vs 費用化、折舊、減損', '租賃、遞延所得稅資產／負債', '財報品質與盈餘操縱的警訊', 'IFRS 和 US GAAP 的主要差異'],
    tip: '份量大、需要時間消化，建議早點開始讀。利息支付在 IFRS 可放營業或籌資現金流，US GAAP 只能放營業，是常考差異。' },
  { k: 'corp', n: '公司理財', en: 'Corporate Issuers', en27: 'Corporate Finance', w26: [6, 9], w27: [6, 9], s: 1,
    what: '公司的組織型態、公司治理與利害關係人、ESG、營運資金管理、資本預算、資本結構。',
    keys: ['獨資、合夥、公司的差別（責任、稅、籌資）', '股東 vs 債權人 vs 經理人的代理問題', '公司治理機制、ESG 考量', '營運資金、流動性管理', '資本預算：NPV、IRR，衝突時選 NPV', '資本結構、加權平均資金成本 WACC'],
    tip: '管理學 Ch10 的企業組織型態、民商法的公司法觀念都用得上。2027 年改名 Corporate Finance。' },
  { k: 'eq', n: '權益投資', en: 'Equity Investments', en27: 'Equities', w26: [11, 14], w27: [11, 14], s: 2,
    what: '股票市場怎麼運作、市場指數、市場效率，以及產業分析和股票評價。',
    keys: ['市場組織：委託單種類、融資買進與保證金', '指數編製：價格加權、市值加權、等權重', '效率市場三種形式：弱式、半強式、強式', '產業與公司分析（競爭結構、生命週期）', '股利折現模型（Gordon growth）', '乘數評價：P/E、P/B、EV/EBITDA'],
    tip: '投資學的效率市場、本益比都直接對應。Gordon 模型分子要用「下一期」股利 D₁。2027 年改名 Equities。' },
  { k: 'fi', n: '固定收益', en: 'Fixed Income', w26: [11, 14], w27: [11, 14], s: 2,
    what: '債券的特徵、發行與交易、定價、殖利率曲線、利率風險（存續期間、凸性）、信用風險和資產證券化。',
    keys: ['債券契約條款、擔保、內含選擇權', '債券定價：用市場利率折現每期現金流', '殖利率：YTM、當期殖利率、利差', '即期利率、遠期利率、平價利率', 'Macaulay 存續期間、修正存續期間、凸性', '信用評等、信用利差、違約損失', 'ABS、MBS 與提前還款風險'],
    tip: '目前的課比較少碰到，是需要從頭學的一科。計算機的 BOND 功能和 TVM 一樣重要。' },
  { k: 'der', n: '衍生性商品', en: 'Derivatives', en27: 'Derivatives and Risk Management', w26: [5, 8], w27: [6, 9], s: 2,
    what: '遠期、期貨、交換、選擇權的基本特性，以及用無套利原則定價。',
    keys: ['遠期 vs 期貨：每日結算、保證金、交易所', '持有成本模型（cost of carry）', '選擇權的 payoff 與損益圖、損益兩平點', '賣權買權平價（put-call parity）', '二項式模型（binomial model）入門', '交換（swap）的基本結構', '衍生品的用途、好處與風險'],
    tip: '衍金這門課幾乎就是這一科的前半段！期貨、保證金、避險、選擇權都已經在學。2027 年改名並加入風險管理。' },
  { k: 'alt', n: '另類投資', en: 'Alternative Investments', w26: [7, 10], w27: [6, 9], s: 2,
    what: '私募股權、私募債、不動產、基礎建設、自然資源（商品、農地）、避險基金、數位資產，以及它們的費用結構和報酬計算。',
    keys: ['費用結構：管理費＋績效費（例如 2 and 20）', '門檻報酬率（hurdle rate）、高水位（high-water mark）', '私募股權：創投、成長股權、收購（buyout）', '不動產與基礎建設投資方式', '商品投資的報酬來源', '加密貨幣等數位資產', '另類投資的績效評估難點'],
    tip: '費用計算題（先扣管理費還是績效費、高水位）幾乎每次都考。' },
  { k: 'pm', n: '投資組合管理', en: 'Portfolio Management', en27: 'Portfolio Construction', w26: [8, 12], w27: [8, 12], s: 2,
    what: '風險與報酬、效率前緣、CAPM、績效衡量、投資政策書（IPS）、風險管理和行為財務學。',
    keys: ['效用函數與風險趨避', '效率前緣、資本配置線（CAL）、資本市場線（CML）', 'CAPM 與證券市場線（SML）、β', '系統性 vs 非系統性風險', '績效指標：Sharpe、Treynor、Jensen\'s α、M²', '投資政策書 IPS：目標與限制', '行為偏誤：過度自信、錨定、損失趨避……'],
    tip: '投資學的 CAPM、CML/SML，基礎站的 Sharpe、β，管理學的決策偏誤都直接用得上。2027 年改名 Portfolio Construction。' }
];

// 衍金課本、投資學等卡片上的 CFA 標籤 → 對應到 Level I 科目
function cfaTopic(t) {
  if (/Ethic|道德/.test(t)) return 'eth';
  if (/Behavioral|Portfolio|CAPM|Sharpe|CML|SML|beta、systematic/.test(t) && !/^CFA Quant/.test(t)) return 'pm';
  if (/Quant|expected value|time value|holding period|discounted cash flow/.test(t)) return 'quant';
  if (/Econ/.test(t)) return 'econ';
  if (/Financial Statement|FSA/.test(t)) return 'fsa';
  if (/Corporate/.test(t)) return 'corp';
  if (/Equity|P\/E/.test(t)) return 'eq';
  if (/Fixed Income/.test(t)) return 'fi';
  if (/Alternative/.test(t)) return 'alt';
  if (/Deriv|option|forward|futures|hedge|basis|margin|open interest|put/.test(t)) return 'der';
  return 'pm';
}

const CFA_STD = [
  ['I. 專業精神 Professionalism', ['(A) 了解法律 Knowledge of the Law', '(B) 獨立與客觀 Independence and Objectivity', '(C) 不實陳述 Misrepresentation', '(D) 不當行為 Misconduct', '(E) 專業能力 Competence']],
  ['II. 資本市場誠信 Integrity of Capital Markets', ['(A) 重大非公開資訊 Material Nonpublic Information', '(B) 市場操縱 Market Manipulation']],
  ['III. 對客戶的責任 Duties to Clients', ['(A) 忠實、審慎與關注 Loyalty, Prudence, and Care', '(B) 公平對待 Fair Dealing', '(C) 適合性 Suitability', '(D) 績效呈現 Performance Presentation', '(E) 保密 Preservation of Confidentiality']],
  ['IV. 對雇主的責任 Duties to Employers', ['(A) 忠誠 Loyalty', '(B) 額外報酬安排 Additional Compensation Arrangements', '(C) 主管責任 Responsibilities of Supervisors']],
  ['V. 投資分析與建議 Investment Analysis, Recommendations, and Actions', ['(A) 盡職與合理基礎 Diligence and Reasonable Basis', '(B) 與客戶溝通 Communication with Clients and Prospective Clients', '(C) 紀錄保存 Record Retention']],
  ['VI. 利益衝突 Conflicts of Interest', ['(A) 揭露利益衝突 Disclosure of Conflicts', '(B) 交易優先順序 Priority of Transactions', '(C) 轉介費 Referral Fees']],
  ['VII. CFA 會員與考生的責任 Responsibilities as a CFA Institute Member or Candidate', ['(A) 參與 CFA 計畫的行為 Conduct as Participants in CFA Institute Programs', '(B) 提及 CFA 協會與 CFA 頭銜 Reference to CFA Institute, the CFA Designation, and the CFA Program']]
];

const CFA_L2 = [['道德與專業準則', '10–15%', '同 Level I，但情境更長更複雜'], ['計量方法', '5–10%', '多元迴歸、時間序列、機器學習、大數據專案'], ['經濟學', '5–10%', '匯率決定理論、經濟成長'], ['財務報表分析', '10–15%', '企業間投資、員工福利、跨國營運、金融機構分析'], ['公司理財', '5–10%', '資本結構、股利政策、ESG、併購'], ['權益投資', '10–15%', '自由現金流（FCFF/FCFE）、剩餘所得、市場乘數、私人公司評價'], ['固定收益', '10–15%', '利率期限結構、無套利評價、二項樹、信用分析模型'], ['衍生性商品與風險管理', '5–10%', '遠期、期貨、交換、選擇權的定價與評價'], ['另類投資', '5–10%', '不動產、私募股權、商品的評價'], ['投資組合建構', '10–15%', '多因子模型、風險衡量（VaR）、主動管理']];
const CFA_L3 = [['資產配置 Asset Allocation', '15–20%'], ['投資組合建構 Portfolio Construction', '15–20%'], ['績效衡量 Performance Measurement', '5–10%'], ['衍生性商品與風險管理', '10–15%'], ['道德與專業準則', '10–15%'], ['專業路徑（三選一）', '30–35%']];
const CFA_PATH = [
  ['投資組合管理 Portfolio Management', '指數化與主動股票策略、追蹤誤差、Active Share、固定收益策略（負債導向投資 LDI、殖利率曲線布局、信用）、交易執行，以及綜合案例。適合想走基金經理、資產管理的人。'],
  ['私人市場 Private Markets', '私人與公開市場比較、基金架構與費用、GP 的角色、私募股權（創投、成長股權、收購）評價、私募債（槓桿貸款、夾層、unitranche）、困境債、私人不動產與基礎建設。適合想走私募、創投的人。'],
  ['私人財富 Private Wealth', '財富管理產業、高資產家族的動態、目標導向規劃、稅務與流動性、保險與風險移轉、財富傳承規劃。適合想走私人銀行、理財顧問的人。']
];

// 考期（第三方整理，以官網為準）。d：考試第一天；dl：截止日 [名稱, 日期]
const CFA_WIN = [
  { id: '2027-02', n: '2027 年 2 月', lv: 'Level I：2/22–28 · Level III：2/18–21', d: '2027-02-18', dl: [['一般報名截止', '2026-11-05'], ['預約考場截止', '2026-11-10']] },
  { id: '2027-05', n: '2027 年 5 月', lv: 'Level I：5/11–17 · Level II：5/18–22', d: '2027-05-11', dl: [['早鳥截止', '2026-10-14'], ['一般報名截止', '2027-02-10'], ['預約考場截止', '2027-02-16']] },
  { id: '2027-08', n: '2027 年 8 月', lv: 'Level III：8/11–14 · Level I：8/15–22 · Level II：8/23–27', d: '2027-08-11', dl: [['開放報名', '2026-11-03'], ['早鳥截止', '2027-01-20'], ['一般報名截止', '2027-04-29'], ['預約考場截止', '2027-05-06']] },
  { id: '2027-11', n: '2027 年 11 月', lv: 'Level I：11/13–19 · Level II：11/20–24', d: '2027-11-13', dl: [] }
];

// Level I 風格小測驗（英文題目、三選一）
const CFA_Q = [
  { t: 'Ethics', q: 'An analyst overhears a company insider describing an unannounced merger. According to the CFA Institute Standards, the analyst should:', o: ['trade on the information for her own account only, not for clients', 'not act or cause others to act on the information', 'share the information with all clients at the same time to ensure fair dealing'], a: 1, e: 'Standard II(A)：重大非公開資訊不能用來交易，也不能讓別人用。和「公平對待客戶」無關，因為根本不能用。' },
  { t: 'Ethics', q: 'A candidate who has passed Level I may correctly state on a résumé:', o: ['“I passed Level I of the CFA Program.”', '“John Lee, CFA Level I”', '“John Lee, CFA (expected 2028)”'], a: 0, e: 'Standard VII(B)：只能陳述事實（通過了哪一級），不能把 CFA 當成部分頭銜或預告會拿到。' },
  { t: 'Quant', q: 'USD 1,000 is invested at 6% compounded annually for 3 years. The future value is closest to:', o: ['USD 1,180.00', 'USD 1,191.02', 'USD 1,194.05'], a: 1, e: 'FV = 1,000 × 1.06³ = 1,191.02。1,180 是單利；1,194.05 是用連續複利 e^0.18 算的。' },
  { t: 'Quant', q: 'A portfolio has an expected return of 9% and a standard deviation of 15%. The risk-free rate is 3%. Its Sharpe ratio is closest to:', o: ['0.40', '0.60', '0.20'], a: 0, e: 'Sharpe = (9% − 3%) / 15% = 0.40。分母是總風險 σ，不是 β。' },
  { t: 'Quant', q: 'A Type I error occurs when a researcher:', o: ['rejects a null hypothesis that is true', 'fails to reject a null hypothesis that is false', 'rejects a null hypothesis that is false'], a: 0, e: '型一錯誤 = 冤枉好人（H₀ 為真卻拒絕）；機率就是顯著水準 α。B 是型二錯誤，C 是正確決定。' },
  { t: 'Economics', q: 'In long-run equilibrium, a firm in a perfectly competitive market earns:', o: ['positive economic profit', 'zero economic profit', 'an economic loss'], a: 1, e: '完全競爭長期有自由進出，超額利潤會被新進廠商吃掉，經濟利潤 = 0（會計利潤可以大於 0）。' },
  { t: 'FSA', q: 'Under IFRS, interest paid may be classified in the cash flow statement as:', o: ['operating or financing activities', 'financing activities only', 'investing activities only'], a: 0, e: 'IFRS 可放營業或籌資；US GAAP 只能放營業。這是 IFRS vs US GAAP 的經典考點。' },
  { t: 'Corporate Issuers', q: 'When the NPV and IRR methods give conflicting rankings for mutually exclusive projects, a company should choose the project with the higher:', o: ['IRR', 'NPV', 'payback period'], a: 1, e: 'NPV 直接衡量股東財富增加多少，衝突時以 NPV 為準。' },
  { t: 'Equity', q: 'Which form of market efficiency implies that prices reflect all publicly available information?', o: ['Weak form', 'Semi-strong form', 'Strong form'], a: 1, e: '弱式：只反映過去價格；半強式：反映所有公開資訊；強式：連內線資訊都反映。' },
  { t: 'Equity', q: 'A stock is expected to pay a dividend of USD 2.00 next year (D₁). Dividends grow at 3% forever and the required return is 8%. Its value is closest to:', o: ['USD 40.00', 'USD 25.00', 'USD 41.20'], a: 0, e: 'V₀ = D₁ / (r − g) = 2 / (0.08 − 0.03) = 40。41.20 是把 2 當成 D₀ 又乘了一次 1.03。' },
  { t: 'Fixed Income', q: 'Which bond has the highest duration?', o: ['A 5-year, 8% coupon bond', 'A 10-year, 8% coupon bond', 'A 10-year zero-coupon bond'], a: 2, e: '到期越長、票面利率越低，存續期間越長。零息債的 Macaulay 存續期間 = 到期年數 10 年。' },
  { t: 'Fixed Income', q: 'If market interest rates rise, the price of an existing fixed-rate bond will most likely:', o: ['increase', 'decrease', 'remain unchanged'], a: 1, e: '債券價格和殖利率反向：折現率變高，現金流的現值變小。' },
  { t: 'Derivatives', q: 'According to put–call parity, a synthetic long call can be created by:', o: ['buying the stock, buying a put, and borrowing the PV of the strike', 'shorting the stock, buying a put, and lending the PV of the strike', 'buying the stock, writing a put, and lending the PV of the strike'], a: 0, e: 'c = S + p − PV(K)：買股票、買賣權、借入 PV(K)（也就是放空無風險債券）。' },
  { t: 'Derivatives', q: 'Compared with forward contracts, futures contracts are:', o: ['customized and traded over the counter', 'marked to market daily', 'free of margin requirements'], a: 1, e: '期貨在交易所交易、標準化、每日結算並需要保證金；遠期是 OTC 客製化。衍金第 2 章！' },
  { t: 'Alternatives', q: 'A hedge fund with a high-water mark provision charges an incentive fee only:', o: ['on gains that take the fund value above its previous peak', 'after the return exceeds a minimum hurdle rate', 'when the management fee is waived'], a: 0, e: '高水位：虧損後要先回到之前的最高淨值，才再收績效費。B 描述的是門檻報酬率（hurdle rate）。' },
  { t: 'Portfolio Mgmt', q: 'The risk-free rate is 2%, the expected market return is 8%, and a stock’s beta is 1.2. Its CAPM required return is:', o: ['9.2%', '9.6%', '7.2%'], a: 0, e: 'E(R) = 2% + 1.2 × (8% − 2%) = 9.2%。9.6% 是誤把 1.2 × 8% 當答案。' },
  { t: 'Portfolio Mgmt', q: 'Which type of risk can be reduced through diversification?', o: ['Systematic risk', 'Unsystematic risk', 'Market risk'], a: 1, e: '分散只能降低公司特有（非系統性）風險；系統性風險就是市場風險，分散不掉，所以只有 β 有風險溢酬。' }
];

function cfaBar(r, max) { return `<span class="wbar"><i style="left:${r[0] / max * 100}%;width:${(r[1] - r[0]) / max * 100}%"></i></span>`; }
function cfaDays(s) { return Math.ceil((new Date(s + 'T00:00:00') - new Date(new Date().toDateString())) / 864e5); }
function cfaDate(s) { const [y, m, d] = s.split('-'); return `${+y}/${+m}/${+d}`; }

function renderCFA(root) {
  // 現有卡片和公式上的 CFA 標籤
  const learned = {}; CFA_L1.forEach(t => learned[t.k] = []);
  ORDER.forEach(k => {
    subjCards(DATA[k]).forEach(c => c.cfa && learned[cfaTopic(c.cfa)].push({ k, id: c.id, t: c.t, cfa: c.cfa, card: 1 }));
    (DATA[k].formulas || []).forEach(f => f.cfa && /CFA/.test(f.cfa) && !/較少|了解即可/.test(f.cfa) && learned[cfaTopic(f.cfa)].push({ k, id: f.id, t: f.t.replace(/<[^>]+>/g, ''), cfa: f.cfa }));
  });
  const cards = Object.values(learned).flat().filter(x => x.card), done = cards.filter(x => ST.done[x.id]).length;
  const next = CFA_WIN.find(w => cfaDays(w.d) > 0) || CFA_WIN[0];
  const soon = CFA_WIN.flatMap(w => w.dl.map(d => [w.n, d[0], d[1]])).filter(x => cfaDays(x[2]) >= 0).sort((a, b) => a[2] < b[2] ? -1 : 1)[0];
  ST.cfaWin = ST.cfaWin || next.id; ST.cfaHrs = ST.cfaHrs || 15;

  root.innerHTML = `<button type="button" class="cfahome cfatonotes" id="tonotes"><span class="cfahi">${navIcon('cfa')}</span><span><b>Level I 完整筆記</b><span>10 科、93 個學習單元整理成 ${subjCards(DATA.cfa).length} 張知識卡，已掌握 ${subjCards(DATA.cfa).filter(c => ST.done[c.id]).length} 張</span></span><span class="cfago">→</span></button>
  <nav class="cfanav" aria-label="本頁目錄">${[['cfa-what', 'CFA 是什麼'], ['cfa-lv', '三個級別'], ['cfa-l1', 'Level I 十科'], ['cfa-mine', '你已學到的'], ['cfa-l23', 'Level II／III'], ['cfa-reg', '報名與費用'], ['cfa-cal', '考試日程'], ['cfa-rule', '考試規則'], ['cfa-charter', '拿到證照'], ['cfa-plan', '讀書計畫'], ['cfa-quiz', '小測驗'], ['cfa-link', '官方連結']].map(([id, t]) => `<a href="#${id}" data-to="${id}">${t}</a>`).join('')}</nav>
  ${soon ? `<p class="cfaalert"><b>最近的截止日：</b>${soon[0]}考期的「${soon[1]}」是 <b>${cfaDate(soon[2])}</b>（${cfaDays(soon[2]) === 0 ? '就是今天' : `還有 ${cfaDays(soon[2])} 天`}，美東時間晚上 11:59，約台灣隔天中午）</p>` : ''}

  <section class="msbox" id="cfa-what"><h3>CFA 是什麼？</h3>
    <p>由美國的 <b>CFA Institute（CFA 協會）</b>頒發，全球有超過 20 萬名持證人，是基金經理、研究員、投資銀行、資產管理最看重的證照之一。要拿到證照，需要<b>依序考過三個級別</b>、累積<b>4,000 小時相關工作經驗</b>，再申請成為會員。</p>
    <div class="cfastats"><div><b>3</b><span>個級別，要依序考</span></div><div><b>300+</b><span>小時：每一級平均讀書時間</span></div><div><b>全英文</b><span>電腦考試，在 Prometric 考場考</span></div><div><b>約 2.5–4 年</b><span>多數人考完三級的時間</span></div></div>
    <p class="sm-p">考試全部用英文，所以衍金、管理學用英文考，剛好是很好的練習。</p></section>

  <section class="msbox" id="cfa-lv"><h3>三個級別比一比</h3>
    <div class="tblwrap"><table class="tbl lvtbl"><thead><tr><th></th>${CFA_LEVELS.map(l => `<th>${l.lv}</th>`).join('')}</tr></thead><tbody>
      ${[['考什麼', 'focus'], ['題型', 'fmt'], ['考期', 'win'], ['報名費', 'fee'], ['及格率', 'pass']].map(([h, f]) => `<tr><th>${h}</th>${CFA_LEVELS.map(l => `<td>${l[f]}</td>`).join('')}</tr>`).join('')}
    </tbody></table></div>
    <p class="sm-p">三級都沒有答錯倒扣，每題都要作答。及格分數官方不公布，一般推估約要答對 65–70%。</p></section>

  <section class="msbox" id="cfa-l1"><h3>Level I 十大科目</h3>
    <p class="sm-p">深色是 2026 年考試的權重，淺色框是 2027 年（2027 年 2 月起適用）。點一科可以展開看詳細內容。上午場考前五科，下午場考後五科。</p>
    <div class="wlegend"><span><i class="w26"></i>2026</span><span><i class="w27"></i>2027</span><span class="sm-p">刻度 0–20%</span></div>
    <div class="l1list">${CFA_L1.map(t => `<details class="l1t" id="cfa-t-${t.k}"><summary><span class="l1n"><b>${t.n}</b><small>${t.en}${t.en27 ? ` → 2027：${t.en27}` : ''}</small></span><span class="l1w"><span class="wrow">${cfaBar(t.w26, 20)}<em>${t.w26[0]}–${t.w26[1]}%</em></span><span class="wrow w27r">${cfaBar(t.w27, 20)}<em>${t.w27[0]}–${t.w27[1]}%</em></span></span></summary>
      <div class="l1b"><p>${t.what}</p><h4>重點觀念</h4><ul>${t.keys.map(x => `<li>${x}</li>`).join('')}</ul>
      ${t.k === 'eth' ? `<h4>七大專業行為準則（Standards of Professional Conduct）</h4><div class="stdgrid">${CFA_STD.map(s => `<div><b>${s[0]}</b><ul>${s[1].map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>` : ''}
      <p class="l1tip"><b>讀書提醒：</b>${t.tip}</p>
      ${learned[t.k].length ? `<p class="sm-p">這個網站裡相關的卡片：${learned[t.k].map(x => `<button type="button" class="linkish" data-j="${x.k}|${x.id}|${x.card ? 'c' : 'f'}">${x.t}</button>`).join('、')}</p>` : ''}</div></details>`).join('')}</div>
    <p class="sm-p">2027 年最大的變化：道德降到 10–15%、計量方法升到 11–14%，有四科改名。2027 年要考的話，請以官網的 2027 topic outline 為準。</p></section>

  <section class="msbox" id="cfa-mine"><h3>你已經學到的 CFA 觀念</h3>
    <p class="sm-p">其他科卡片上有 CFA 標籤的，都整理在這裡。已掌握 <b>${done} / ${cards.length}</b> 張知識卡（勾「我懂了」就算），點一下直接跳過去。</p>
    <span class="bar cfabar" style="--p:${cards.length ? done / cards.length * 100 : 0}%"><i></i></span>
    ${CFA_L1.filter(t => learned[t.k].length).map(t => `<h4 class="mineh">${t.n} <small>${t.en}</small></h4><div class="cfalist">${learned[t.k].map(x => `<button type="button" class="cfai ${DATA[x.k].hue}${x.card && ST.done[x.id] ? ' got' : ''}" data-j="${x.k}|${x.id}|${x.card ? 'c' : 'f'}"><b>${x.card && ST.done[x.id] ? '✓ ' : ''}${x.t}</b><span>${DATA[x.k].name} · ${x.card ? '知識卡' : '公式'} · ${x.cfa}</span></button>`).join('')}</div>`).join('')}
    <div class="tblwrap"><table class="tbl"><thead><tr><th>你現在的課</th><th>對應的 CFA 科目</th></tr></thead><tbody>
      <tr><td>衍生性金融商品</td><td>Derivatives（Level I 的期貨、遠期、選擇權幾乎都教到了）；避險比率、調整 β 在 Level II／III 會再用到</td></tr>
      <tr><td>投資學</td><td>Equity（效率市場、本益比）、Portfolio Management（CAPM、CML、SML）</td></tr>
      <tr><td>基礎補給站</td><td>Quantitative Methods（貨幣時間價值、統計）、Portfolio Management（Sharpe、β）</td></tr>
      <tr><td>管理學</td><td>Corporate Issuers（企業組織型態、公司治理）、行為財務學（決策偏誤）</td></tr>
      <tr><td>民商法</td><td>Ethics 的 I(A) 了解法律、III(A) 對客戶的忠實義務；公司法觀念也有助於理解公司治理</td></tr>
    </tbody></table></div></section>

  <section class="msbox" id="cfa-l23"><h3>Level II 和 Level III 考什麼</h3>
    <h4>Level II：十科都考，重點在估值與分析</h4>
    <div class="tblwrap"><table class="tbl"><thead><tr><th>科目</th><th>權重</th><th>主要內容</th></tr></thead><tbody>${CFA_L2.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div>
    <p class="sm-p">每組題目先給一段 1–2 頁的案例情境，再出 4 題，所以英文閱讀速度很重要。</p>
    <h4>Level III：核心科目＋三選一的專業路徑</h4>
    <div class="tblwrap"><table class="tbl"><thead><tr><th>科目</th><th>權重</th></tr></thead><tbody>${CFA_L3.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table></div>
    <div class="pathgrid">${CFA_PATH.map(p => `<div><b>${p[0]}</b><p>${p[1]}</p></div>`).join('')}</div>
    <p class="sm-p">報名 Level III 時要選一條路徑。不管選哪一條，拿到的都是同一張 CFA 證照。申論題要用英文寫，只批改題目要求的數量，按順序批改。</p></section>

  <section class="msbox" id="cfa-reg"><h3>報名資格與費用</h3>
    <h4>誰可以報名 Level I？（三選一）</h4>
    <ul><li>已經有學士學位（或同等學歷）</li><li><b>大學生：</b>選的考期在預計畢業月份前 <b>23 個月內</b>就可以報名（大多數人是大三或大四）</li><li>工作經驗加上學歷合計 4,000 小時，而且至少橫跨 3 年</li></ul>
    <p class="sm-p">以學生身分考 Level I 的人，要先拿到學位才能報名 Level II。報名和考試都要用<b>有效的護照</b>，在台灣考也一樣，英文姓名要和護照完全相同。</p>
    <h4>費用（美金，2026–2027 年考試）</h4>
    <div class="tblwrap"><table class="tbl num"><thead><tr><th></th><th>早鳥報名</th><th>一般報名</th></tr></thead><tbody>
      <tr><td>Level I</td><td>1,140</td><td>1,490</td></tr><tr><td>Level II</td><td>1,140</td><td>1,490</td></tr><tr><td>Level III</td><td>1,240</td><td>1,590</td></tr>
      <tr class="hit"><td>三級合計</td><td>3,520</td><td>4,570</td></tr></tbody></table></div>
    <ul><li>以前第一次報名要另付 USD 350 入會費，<b>2026 年起已取消</b>。</li><li>同一考期內改考試時間：USD 250。錯過考試不退費，也不能延到下一期。</li><li>費用不含當地稅金；早鳥可以省 USD 350，越早報越划算。</li><li><b>獎學金：</b>學生獎學金（學校要是 CFA 合作大學）、Access 獎學金（經濟上有需要的人），核准後結帳時自動折抵。正在報名或等成績時不能申請，詳見<a href="${CFA_LINK.sch}" target="_blank" rel="noopener">官網獎學金頁</a>。</li></ul></section>

  <section class="msbox" id="cfa-cal"><h3>考試日程與倒數</h3>
    <p class="sm-p">考期是第三方整理的資料，報名前請到<a href="${CFA_LINK.fees}" target="_blank" rel="noopener">官網 Dates &amp; Fees</a> 確認。2026 年 11 月的考期已經截止報名。</p>
    <div class="tblwrap"><table class="tbl"><thead><tr><th>考期</th><th>級別與日期</th><th>截止日</th></tr></thead><tbody>${CFA_WIN.map(w => `<tr><td><b>${w.n}</b></td><td>${w.lv}</td><td>${w.dl.length ? w.dl.map(d => `<span class="${cfaDays(d[1]) < 0 ? 'past' : ''}">${d[0]}：${cfaDate(d[1])}</span>`).join('<br>') : '官網尚未公布'}</td></tr>`).join('')}</tbody></table></div>
    <div class="planner"><h4>我的目標考期</h4>
      <div class="row wrap"><label>考期 <select id="cfawin">${CFA_WIN.map(w => `<option value="${w.id}"${w.id === ST.cfaWin ? ' selected' : ''}>${w.n}</option>`).join('')}</select></label>
      <label>每週能讀 <input id="cfahrs" type="number" min="3" max="60" step="1" value="${ST.cfaHrs}" inputmode="numeric"> 小時</label></div>
      <div id="cfaplan" class="planout"></div></div></section>

  <section class="msbox" id="cfa-rule"><h3>考試規則與考場須知</h3>
    <ul>
      <li><b>次數限制：</b>每個級別一年最多考 2 次，不能連續兩個考期都考，兩次至少間隔 6 個月；每個級別一輩子最多考 6 次。</li>
      <li><b>實務技能模組（PSM）：</b>每一級都要完成一個 Practical Skills Module（例如 Python 程式基礎、資料科學與 AI、分析師技能）才會拿到成績。<b>同一個模組不能在不同級別重複用</b>。</li>
      <li><b>計算機：</b>只能用 Texas Instruments BA II Plus（含 Professional 版）或 HP 12C（含 Platinum 等版本）。建議現在就買 BA II Plus 開始練。</li>
      <li><b>財報準則：</b>財報題預設用 IFRS，題目寫明才用 US GAAP。</li>
      <li><b>考試當天：</b>帶有效護照，至少提早 30 分鐘到 Prometric 考場；考場先到先選，越早預約越好。兩場中間可以休息。</li>
      <li><b>台灣考場：</b>台灣有 Prometric 考場（台北），預約時用國家和城市篩選查詢，以報名系統為準。</li>
      <li><b>成績：</b>考期結束後約 5–7 週公布，只有及格／不及格，加上各科表現的分析。</li>
    </ul></section>

  <section class="msbox" id="cfa-charter"><h3>考完三級之後：拿到證照</h3>
    <ol class="steps2"><li><b>考過 Level I、II、III</b>，每一級也要完成 PSM。</li><li><b>累積 4,000 小時相關工作經驗</b>，至少橫跨 36 個月。可以在考試前、考試期間或考完後累積，要是和投資決策相關的工作；實習要是全職且有薪才算。</li><li><b>準備推薦人</b>：通常需要 2–3 位（最好有 CFA 持證人）。</li><li><b>申請成為 CFA Institute 會員</b>，並加入地方分會（台灣是 <a href="${CFA_LINK.tw}" target="_blank" rel="noopener">CFA Society Taiwan</a>）。</li><li>核准後才能在名字後面寫「CFA」，每年要繳會費並遵守道德規範。</li></ol>
    <p class="sm-p">還沒拿到證照前，不能自稱「CFA」或「CFA Level I」，只能寫「通過 CFA Program Level I」。這也是道德科 VII(B) 的考點。</p></section>

  <section class="msbox" id="cfa-plan"><h3>讀書計畫建議</h3>
    <ul>
      <li><b>總時數：</b>每級抓 300 小時以上。每週 15 小時大約要 20 週（5 個月），每週 10 小時就要 7 個月。</li>
      <li><b>Level I 建議順序：</b>計量方法 → 經濟學 → 財報分析 → 公司理財 → 權益投資 → 固定收益 → 衍生性商品 → 另類投資 → 投資組合管理 → 道德。先讀工具科，後面的科目會用到；道德放最後，考前記憶最新鮮。</li>
      <li><b>先讀份量大的：</b>財報分析和固定收益最花時間，不要拖到最後。</li>
      <li><b>最後 4–6 週：</b>停止讀新東西，專心寫模擬考（官方 Learning Ecosystem 有 mock exam），計時寫完整的 2 × 135 分鐘。</li>
      <li><b>道德要讀官方手冊的案例：</b>Standards of Practice Handbook 的例子和考題風格最像。</li>
      <li><b>計算機每天用：</b>TVM、NPV/IRR、統計、債券功能，考場上省下的時間很可觀。</li>
      <li><b>英文：</b>每科的關鍵字直接用英文記，像這個網站的卡片一樣中英對照。</li>
    </ul></section>

  <section class="msbox" id="cfa-quiz"><h3>Level I 小測驗</h3>
    <p class="sm-p">CFA 風格的英文三選一題目，每次隨機 10 題，涵蓋十科。答對一題 +5 XP，10 題答對 8 題以上可以拿到徽章。${ST.best.cfaq != null ? `目前最佳：<b>${ST.best.cfaq} / 10</b>` : ''}</p>
    <div id="cfaarena"><button class="btn big" type="button" id="cfastart">開始測驗</button></div></section>

  <section class="msbox" id="cfa-link"><h3>官方連結</h3>
    <ul class="cfalinks">${[['CFA Program 總覽', 'home'], ['Level I 考試說明（含 2026／2027 權重）', 'l1'], ['Level II 考試說明', 'l2'], ['Level III 考試說明（三條路徑）', 'l3'], ['考期與費用 Dates & Fees', 'fees'], ['課程內容 Curriculum', 'cur'], ['報名資格與規定 Policies', 'pol'], ['獎學金 Scholarships', 'sch'], ['道德規範與專業準則 Code & Standards', 'eth'], ['CFA Society Taiwan', 'tw']].map(([t, k]) => `<li><a href="${CFA_LINK[k]}" target="_blank" rel="noopener">${t}</a></li>`).join('')}</ul>
    <p class="sm-p">資料整理於 2026 年 10 月。考期、費用和規定可能變動，一律以 CFA Institute 官網為準。</p></section>`;

  $('#tonotes', root).onclick = () => go('cfa', 'learn');
  $$('[data-to]', root).forEach(a => a.onclick = e => { e.preventDefault(); const el = $('#' + a.dataset.to); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  $$('[data-j]', root).forEach(b => b.onclick = () => { const [k, id, ty] = b.dataset.j.split('|'); ty === 'c' ? jumpCard(k, id) : jumpFormula(k, id); });

  const plan = () => {
    const w = CFA_WIN.find(x => x.id === $('#cfawin', root).value), hrs = Math.max(3, Math.min(60, +$('#cfahrs', root).value || 15));
    ST.cfaWin = w.id; ST.cfaHrs = hrs; save();
    const days = cfaDays(w.d), weeks = Math.ceil(300 / hrs), start = new Date(w.d + 'T00:00:00'); start.setDate(start.getDate() - weeks * 7);
    const startS = start.toISOString().slice(0, 10), late = cfaDays(startS) < 0;
    const dl = w.dl.filter(d => cfaDays(d[1]) >= 0);
    $('#cfaplan', root).innerHTML = days <= 0 ? '<p>這個考期已經開始或結束了，換一個吧。</p>' : `<p>距離 ${w.n} 考期開始還有 <b>${days} 天</b>（約 ${Math.floor(days / 7)} 週）。</p>
      <p>每週 ${hrs} 小時，300 小時需要約 <b>${weeks} 週</b>，${late ? `應該在 ${cfaDate(startS)} 開始，<b class="warnt">已經比建議的開始時間晚了</b>：可以把每週時數提高到 ${Math.ceil(300 / Math.max(1, Math.floor(days / 7)))} 小時，或改考下一期。` : `最晚 <b>${cfaDate(startS)}</b> 要開始讀。`}</p>
      ${dl.length ? `<p>接下來的截止日：${dl.map(d => `${d[0]} ${cfaDate(d[1])}（${cfaDays(d[1])} 天後）`).join('；')}</p>` : ''}`;
  };
  $('#cfawin', root).onchange = plan; $('#cfahrs', root).oninput = plan; plan();

  $('#cfastart', root).onclick = function start() {
    const qs = CFA_Q.slice().sort(() => Math.random() - .5).slice(0, 10); let i = 0, ok = 0; const arena = $('#cfaarena', root);
    const draw = () => {
      if (i >= qs.length) {
        const best = Math.max(ST.best.cfaq || 0, ok); ST.best.cfaq = best; save();
        if (ok >= 8) { FUN.badge('cfaq'); FUN.confetti(80); }
        arena.innerHTML = `<div class="win">${PIG(ok >= 8 ? 'wow' : ok >= 5 ? 'happy' : 'sad', 100)}<h3>答對 ${ok} / ${qs.length}</h3><p>${ok >= 8 ? '很有 CFA 考生的架勢！' : ok >= 5 ? '不錯！看解析把錯的補起來。' : '別灰心，Level I 本來就是新東西，多練幾次。'}</p><button class="btn big" type="button" id="cfaagain">再考一次</button></div>`;
        $('#cfaagain', arena).onclick = start; return;
      }
      const q = qs[i];
      arena.innerHTML = `<div class="cfaq"><p class="sm-p">第 ${i + 1} / ${qs.length} 題 · <span class="pill">${q.t}</span></p><p class="cq">${q.q}</p><div class="copts">${q.o.map((o, j) => `<button type="button" class="opt" data-i="${j}"><b>${'ABC'[j]}.</b> ${o}</button>`).join('')}</div><div class="cexp" hidden></div></div>`;
      $$('.opt', arena).forEach(b => b.onclick = () => {
        const j = +b.dataset.i, right = j === q.a; $$('.opt', arena).forEach(x => x.disabled = true);
        b.classList.add(right ? 'right' : 'wrongc'); if (!right) $$('.opt', arena)[q.a].classList.add('right');
        if (right) { ok++; FUN.xp(5, b); FUN.beep('ok'); } else FUN.beep('no');
        const ex = $('.cexp', arena); ex.hidden = false; ex.innerHTML = `<p><b>${right ? '答對了！' : `正確答案是 ${'ABC'[q.a]}。`}</b>${q.e}</p><button class="btn" type="button" id="cfanext">${i + 1 < qs.length ? '下一題' : '看結果'}</button>`;
        $('#cfanext', arena).onclick = () => { i++; draw(); };
      });
    };
    draw();
  };
}

// 打怪＆選擇題題庫：小測驗題目＋完整題庫
DATA.cfa.mcq = CFA_Q.concat(CFA_Q2).map(m => ({ q: `<span class="pill">${m.t}</span> ${m.q}`, o: m.o, a: m.a, e: m.e }));
