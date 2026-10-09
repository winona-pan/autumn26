// ===== 題庫擴充（觀念＋計算，不刁鑽）、移除冷知識題、先備知識連結 =====
// 移除只考數字/日期的冷門題
const TRIVIA = {
  invest: ['南海公司 1720 年決議承擔的政府債務約為？', '英國泡沫法案（Bubble Act）於哪一年廢除？', '1929 年崩盤到 1932 年觸底，跌幅相對最小的績優股是？', '1955–1990 年日本房地產價值上漲約：', '日本股市指數 1992/8 跌至約多少點？', '研究顯示 1998–99 年改名加入網路字眼的公司，改名期間漲幅比同類公司高出：', 'TheGlobe.com 首日股價從 9 美元漲到約？', '鬱金香條紋花瓣的成因是？'],
  mgmt: ['S corporation 股東人數上限：'],
  law: ['內亂、外患及妨害國交罪的第一審為：']
};
Object.keys(TRIVIA).forEach(k => { DATA[k].mcq = DATA[k].mcq.filter(m => !TRIVIA[k].includes(m.q)); });

DATA.deriv.mcq.push(
  {q:'Long 1 口期貨，成交價 100，到期價 108，每口 50 單位。損益是？', o:['+400','−400','+8','+5,400'], a:0, e:'(108 − 100) × 50 = 400。'},
  {q:'Short 遠期，交割價 K = 60，到期 S_T = 55。每單位收益是？', o:['−5','+5','0','+55'], a:1, e:'空頭收益 K − S_T = 5。'},
  {q:'買 call：K = 50、權利金 3、到期股價 58。利潤是？', o:['8','5','3','−3'], a:1, e:'payoff = 8，profit = 8 − 3 = 5。'},
  {q:'買 call：K = 50、權利金 3、到期股價 45。利潤是？', o:['−5','−3','0','2'], a:1, e:'不執行，payoff = 0，只虧權利金 3。'},
  {q:'買 put：K = 40、權利金 2、到期股價 33。利潤是？', o:['7','5','2','−2'], a:1, e:'payoff = 7，profit = 5。'},
  {q:'買 call 的損益兩平點是？', o:['K','K + 權利金','K − 權利金','權利金'], a:1, e:'股價要漲到 K + c 才回本。'},
  {q:'原始保證金 5,000、維持保證金 4,000、每口 1,000 單位的多頭，價格下跌多少會被追繳？', o:['1.0','4.0','5.0','0.1'], a:0, e:'(5,000 − 4,000) ÷ 1,000 = 1.0。'},
  {q:'保證金帳戶從 12,000 虧到 8,500，維持保證金 9,000、原始 12,000。需補繳？', o:['500','3,500','9,000','0'], a:1, e:'低於維持 → 補到原始：12,000 − 8,500 = 3,500。'},
  {q:'買方開倉 300、賣方平倉 500。OI 變化？', o:['+200','−200','+800','0'], a:1, e:'300 − 500 = −200。'},
  {q:'S = 52、F = 50，基差 b = ？', o:['−2','+2','102','0'], a:1, e:'b = S − F = 2。'},
  {q:'Short hedge：開始時 F₁ = 30，平倉時 S₂ = 28、F₂ = 27.5。實際賣價 = ？', o:['28','30.5','30','27.5'], a:1, e:'F₁ + b₂ = 30 + 0.5 = 30.5。'},
  {q:'ρ = 0.9、σS = 2、σF = 3，h* = ？', o:['0.6','1.35','0.9','0.67'], a:0, e:'0.9 × 2 ÷ 3 = 0.6。'},
  {q:'h* = 0.8，要避險 100,000 單位，每口 5,000 單位。口數？', o:['16','20','25','80'], a:0, e:'0.8 × 100,000 ÷ 5,000 = 16。'},
  {q:'組合 $10M、β = 1.2，指數期貨 2,000、乘數 $250。完全避險要 short 幾口？', o:['20','24','30','12'], a:1, e:'V_F = 500,000；1.2 × 10M ÷ 500,000 = 24。'},
  {q:'承上，要把 β 降到 0.6，要 short 幾口？', o:['6','12','24','18'], a:1, e:'(1.2 − 0.6) × 20 = 12。'},
  {q:'為什麼「想未來擁有某資產」時，買期貨通常比現在買現貨划算？', o:['期貨一定比較便宜','買現貨要先付錢且有倉儲成本與利息損失','期貨沒有風險','現貨不能賣'], a:1, e:'講義 Ch3「Think about it」。'}
);
DATA.invest.mcq.push(
  {q:'CAPM：R_f = 3%、E(R_M) = 9%、β = 1.5，預期報酬是？', o:['9%','12%','13.5%','10.5%'], a:1, e:'3 + 1.5 × 6 = 12%。'},
  {q:'β = 0 的資產，依 CAPM 預期報酬等於：', o:['市場報酬','無風險利率','0','市場風險溢酬'], a:1, e:''},
  {q:'CML 的橫軸是：', o:['β','總風險 σ','時間','報酬'], a:1, e:'SML 的橫軸才是 β。'},
  {q:'SML 適用於：', o:['只有效率投資組合','所有證券與組合','只有債券','只有無風險資產'], a:1, e:'CML 只適用效率組合。'},
  {q:'股價 80、EPS 4，本益比是？', o:['4','20','80','0.05'], a:1, e:'80 ÷ 4 = 20。'},
  {q:'本益比很高（例如 60 倍以上）通常代表：', o:['股價很便宜','市場對未來成長期望極高，或可能有泡沫','公司虧損','一定會上漲'], a:1, e:'日本 1990、網路泡沫都是這樣。'},
  {q:'股價 66、6 日均線 60，乖離率是？', o:['6%','10%','9.1%','−10%'], a:1, e:'(66 − 60) ÷ 60 = 10% → 正乖離過大。'},
  {q:'最近 6 天上漲總和 9、下跌總和 3，RSI 是？', o:['33','75','67','25'], a:1, e:'100 × 9 ÷ 12 = 75。'},
  {q:'9 日內最高 60、最低 40、今天收盤 55，RSV 是？', o:['55','75','25','92'], a:1, e:'(55 − 40) ÷ (60 − 40) × 100 = 75。'},
  {q:'承上，前一日 K = 50，今日 K 值是？', o:['58.3','75','66.7','50'], a:0, e:'75/3 + 50 × 2/3 = 25 + 33.3 = 58.3。'},
  {q:'昨天 OBV 10,000，今天收盤上漲、成交量 2,000，今天 OBV 是？', o:['8,000','12,000','10,000','2,000'], a:1, e:'上漲 → 加上成交量。'},
  {q:'價格 $20，用 0.382 計算的下跌支撐是？', o:['12.36','7.64','27.64','16.18'], a:0, e:'20 × (1 − 0.382) = 12.36。'},
  {q:'「更傻的傻瓜理論」的意思是：', o:['只買便宜的股票','不管價格多高，只要相信有人會用更高價接手就買','長期持有','分散投資'], a:1, e:'泡沫的核心心理。'},
  {q:'《漫步華爾街》對多數投資人的建議是：', o:['用技術分析短線交易','買低成本的指數基金','只買科技股','借錢投資'], a:1, e:'因為多數人打不贏市場（效率市場）。'},
  {q:'「投資」相較於「投機」的特徵是：', o:['短期、追價差','長期、重視股利與研究、控制風險','不需研究','高槓桿'], a:1, e:''},
  {q:'債券評級越低（信用越差）通常殖利率：', o:['越低','越高','一樣','等於 0'], a:1, e:'信心指數就是比較高評級與中評級債殖利率。'}
);
DATA.law.mcq.push(
  {q:'民法第 1 條規定的法源適用順序為：', o:['習慣 → 法律 → 法理','法律 → 習慣 → 法理','法理 → 法律 → 習慣','判例 → 法律 → 習慣'], a:1, e:''},
  {q:'「準用」與「類推適用」最大的差別是：', o:['準用有法律明文，類推適用沒有','兩者相同','類推適用有明文','準用只用於刑法'], a:0, e:''},
  {q:'「推定」與「視為」的差別：', o:['推定可以舉證推翻，視為不行','視為可以推翻','兩者都可推翻','兩者都不可推翻'], a:0, e:''},
  {q:'17 歲的高中生，行為能力為：', o:['無行為能力','限制行為能力','完全行為能力','視婚姻而定'], a:1, e:'7 歲以上未滿 18 歲。'},
  {q:'下列何者是「契約」？', o:['遺囑','買賣','拾得遺失物','債務催告'], a:1, e:'遺囑是單獨行為；拾得是事實行為；催告是意思通知。'},
  {q:'要約與承諾意思一致時：', o:['契約成立','契約無效','需要公證','需要登記'], a:0, e:'§153 I，明示或默示皆可。'},
  {q:'甲向乙要約 50 萬賣車，乙還價 45 萬。乙的還價在法律上是：', o:['承諾','新要約（視為拒絕原要約）','要約引誘','意思實現'], a:1, e:'§160 II。'},
  {q:'承上，甲拒絕 45 萬後，乙改口說「好，50 萬我買」。契約：', o:['已成立','未成立，因原要約已因拒絕失效','由法院決定','效力未定'], a:1, e:'乙的這句話變成新要約，需甲承諾。'},
  {q:'無因管理的成立，下列何者「不是」要件？', o:['無法律上義務','管理他人事務','為他人管理之意思','事先取得本人同意'], a:3, e:'事先同意就變成委任了。'},
  {q:'鄰居出國時你幫他修颱風吹壞的屋頂，花了 2 萬元。你可以向他請求：', o:['什麼都不能請求','2 萬元及自支出時起的利息','只能請求一半','只能請求報酬'], a:1, e:'適法無因管理 §176 I。'},
  {q:'不當得利的效果是：', o:['損害賠償','返還所受利益','懲罰性賠償','回復名譽'], a:1, e:'目的在除去不當利益，不是填補損害。'},
  {q:'銀行誤把 1 萬元轉進你的帳戶，你：', o:['可以保留','應依不當得利返還','只要返還一半','銀行不能請求'], a:1, e:'無法律上原因受利益。'},
  {q:'契約被撤銷後，已經付出的價金可依什麼請求返還？', o:['無因管理','不當得利（原因嗣後不存在）','侵權行為','契約'], a:1, e:'§179 後段。'},
  {q:'侵權行為的基本歸責原則是：', o:['無過失責任','過失責任','結果責任','衡平責任'], a:1, e:'特殊情形才有推定過失或無過失責任。'},
  {q:'不小心騎車撞傷路人，路人主要依什麼請求賠償？', o:['§184 I 前段','§179','§172','§245-1'], a:0, e:'過失侵害身體健康權。'},
  {q:'相當因果關係的判斷是：', o:['只要有條件關係就成立','先有條件關係，再看是否「通常會發生」','只看統計機率','由被害人決定'], a:1, e:''},
  {q:'正當防衛的限制是：', o:['不得過當','只能防衛自己','只能用言語','事後要賠償'], a:0, e:'§149，可防衛自己或他人權利。'},
  {q:'債的發生原因中，下列何者「不需要」當事人合意？', o:['買賣契約','租賃契約','侵權行為','保證契約'], a:2, e:'無因管理、不當得利、侵權都是法定之債。'},
  {q:'權利能力從何時開始？', o:['7 歲','18 歲','出生','結婚'], a:2, e:''},
  {q:'民法的五編是：', o:['總則、債、物權、親屬、繼承','總則、契約、侵權、物權、親屬','總則、債、商事、親屬、繼承','總則、物權、公司、親屬、繼承'], a:0, e:''}
);
DATA.mgmt.mcq.push(
  {q:'Which function involves monitoring, comparing, and correcting work?', o:['Planning','Organizing','Leading','Controlling'], a:3, e:''},
  {q:'Which function involves defining goals and developing plans?', o:['Planning','Organizing','Leading','Controlling'], a:0, e:''},
  {q:'First-line managers mainly need which skill most?', o:['Conceptual','Technical','Political','Financial'], a:1, e:'Technical skills matter most at lower levels.'},
  {q:'Which skill is equally important at all managerial levels?', o:['Technical','Human','Conceptual','None'], a:1, e:''},
  {q:'A laptop scores 8 on a criterion with weight 6. Its weighted score is:', o:['14','48','2','86'], a:1, e:'8 × 6 = 48.'},
  {q:'Outcomes 100 (p = 0.4) and 50 (p = 0.6). Expected value?', o:['75','70','60','150'], a:1, e:'40 + 30 = 70.'},
  {q:'Rational decision making assumes the decision maker:', o:['Has limited information','Knows all alternatives and consequences','Relies on intuition','Satisfices'], a:1, e:''},
  {q:'Which bias: continuing a failing project because of money already spent?', o:['Sunk costs error','Framing','Availability','Hindsight'], a:0, e:''},
  {q:'Which bias: blaming bad luck for failure and taking credit for success?', o:['Self-serving bias','Anchoring','Representation','Randomness'], a:0, e:''},
  {q:'Exporting means:', o:['Selling products abroad that are made at home','Buying foreign products to sell at home','Building a factory abroad','Licensing your brand'], a:0, e:''},
  {q:'Which approach involves the highest investment and risk when going global?', o:['Exporting','Licensing','Franchising','Foreign subsidiary'], a:3, e:''},
  {q:'The four areas of organizational change are strategy, structure, technology, and:', o:['People','Price','Profit','Place'], a:0, e:''},
  {q:'The first step of Lewin’s change process is:', o:['Refreezing','Changing','Unfreezing','Evaluating'], a:2, e:''},
  {q:'SWOT analysis combines:', o:['Internal strengths/weaknesses and external opportunities/threats','Only competitors','Only financial ratios','Only customer surveys'], a:0, e:''},
  {q:'A firm that buys its supplier is pursuing:', o:['Horizontal integration','Vertical integration','Diversification','Retrenchment'], a:1, e:'Backward vertical integration.'},
  {q:'A business with unlimited personal liability for the owner is a:', o:['Corporation','LLC','Sole proprietorship','S corporation'], a:2, e:''},
  {q:'Grouping jobs by function such as marketing, finance, and production is:', o:['Functional departmentalization','Geographic departmentalization','Product departmentalization','Customer departmentalization'], a:0, e:''},
  {q:'An organization with wide spans of control, decentralization, and low formalization is:', o:['Mechanistic','Organic','Bureaucratic','Functional'], a:1, e:''},
  {q:'A matrix structure violates which principle?', o:['Span of control','Unity of command','Formalization','Specialization'], a:1, e:'Employees report to two managers.'},
  {q:'An entrepreneur differs from a small business owner mainly because the entrepreneur:', o:['Avoids risk','Seeks opportunity, innovation, and growth','Never hires staff','Only wants a stable income'], a:1, e:''}
);
DATA.deriv.mcqEn.push(
  {q:'Long one futures contract at 100, settlement at maturity 108, contract size 50. The gain is:', o:['400','−400','8','5,400'], a:0, e:'(108 − 100) × 50 = 400.'},
  {q:'A long call has K = 50 and premium 3. If S_T = 58, the profit is:', o:['8','5','3','−3'], a:1, e:'Payoff 8 − premium 3 = 5.'},
  {q:'A long put has K = 40 and premium 2. If S_T = 33, the profit is:', o:['7','5','2','−2'], a:1, e:'Payoff 7 − 2 = 5.'},
  {q:'Initial margin 5,000, maintenance 4,000, contract size 1,000 (long). A margin call occurs after a price fall of:', o:['1.0','4.0','5.0','0.1'], a:0, e:'(5,000 − 4,000)/1,000 = 1.0.'},
  {q:'New longs 300, longs closing out 500. Change in open interest:', o:['+200','−200','+800','0'], a:1, e:'300 − 500 = −200.'},
  {q:'h* = 0.8, exposure 100,000 units, contract size 5,000. Number of contracts:', o:['16','20','25','80'], a:0, e:'0.8 × 100,000/5,000 = 16.'},
  {q:'$10M portfolio, beta 1.2, index futures 2,000, multiplier $250. Contracts to short for a full hedge:', o:['20','24','30','12'], a:1, e:'1.2 × 10,000,000/500,000 = 24.'},
  {q:'Spot 52 and futures 50. The basis is:', o:['−2','+2','102','0'], a:1, e:'Basis = S − F.'}
);

// 先備知識連結：card id → 基礎卡 ids
const PRE = {
  d1:['bstock','bspot'], d2:['barb'], d3:['bspot','blong'], d4:['blong','bspot'], d5:['bspot'], d7:['barb','bspot'], d8:['blev'], d9:['blong'], d12:['bspot','blong'], d14:['bspot'], d16:['bsd','bcorr'], d17:['bsd'], d18:['bbeta','bdiv','bindex'], d19:['bbeta','bdiv'], d20:['blev'],
  i1a:['bdec','bstock','bbond'], i1b:['bret'], i1c:['bret'], i1d:['bis','bstock'], i1e:['bsd','bbeta','bdiv','bsharpe'], i1f:['bindex','bsharpe'], i2c:['bstock'], i2d:['blev'], i2e:['bstock'], i2g:['bbond'], i3d:['bbond','blev'], i3e:['blong']
};
Object.keys(PRE).forEach(id => ['deriv', 'invest'].forEach(k => subjCardsPre(DATA[k]).forEach(c => { if (c.id === id) c.pre = PRE[id]; })));
function subjCardsPre(s) { return s.sections.reduce((a, x) => a.concat(x.cards), []); }
