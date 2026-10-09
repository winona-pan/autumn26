// ===== 遊戲題庫：配對 match、分類 sort =====
DATA.deriv.match = [
  ['underlying asset','標的資產'],['long position','多頭、做多'],['short position','空頭、做空'],['delivery price','交割價'],['maturity','到期日'],['premium','權利金'],['strike price','執行價'],['call option','買權'],['put option','賣權'],['European option','只能到期執行'],['American option','到期前都能執行'],['initial margin','原始保證金'],['maintenance margin','維持保證金'],['margin call','保證金追繳'],['marking to market','每日結算'],['open interest','未平倉量'],['close out','平倉'],['basis','基差 S − F'],['basis risk','基差風險'],['cross hedge','交叉避險'],['hedge ratio','避險比率'],['tailing the hedge','考慮每日結算調整口數'],['stack and roll','集中式展期'],['arbitrage','套利'],['convergence','期貨價收斂到現貨價'],['contract size','契約規模'],['price limit','漲跌幅限制'],['position limit','部位限制'],['clearing house','結算所'],['physical settlement','實物交割']
];
DATA.deriv.sort = [
  { t:'Long hedge 還是 Short hedge？', b:['Long hedge（買期貨）','Short hedge（賣期貨）'], items:[['航空公司擔心油價上漲',0],['養牛戶三個月後要賣牛',1],['麵包店未來要買麵粉',0],['金礦公司預計 9 月產出黃金',1],['持有股票組合、怕大盤下跌',1],['美國公司三個月後要付歐元貨款',0],['農夫已種好玉米準備收成',1],['牛肉商 11 月要買活牛',0]] },
  { t:'期貨還是遠期的特徵？', b:['期貨 Futures','遠期 Forwards'], items:[['交易所交易',0],['雙方私下約定',1],['標準化合約',0],['客製化',1],['每日結算',0],['到期才結算',1],['幾乎沒有信用風險',0],['有信用風險',1],['通常到期前平倉',0],['通常只有一個交割日',1]] },
  { t:'OI 會怎麼變？', b:['增加','減少','不變'], items:[['買方開倉、賣方開倉',0],['買方平倉、賣方平倉',1],['買方開倉、賣方平倉',2],['買方平倉、賣方開倉',2],['兩個新人各自建立部位',0],['當沖：早上開、下午平（整天看）',2]] },
  { t:'Call 還是 Put？', b:['買 Call','買 Put'], items:[['看好股價大漲',0],['怕手上股票下跌，想買保險',1],['大頭菜怕跌價，保證能賣 99 鈴錢',1],['想用少少的錢參與上漲',0],['預期股價暴跌想賺錢',1],['鬱金香狂熱時的投機工具',0]] }
];
DATA.invest.match = [
  ['weak form EMH','技術分析無效'],['semi-strong form EMH','基本分析也無效'],['strong form EMH','內線也無效'],['random walk','隨機漫步'],['greater fool theory','更傻的傻瓜理論'],['castle-in-the-air','空中樓閣理論'],['firm-foundation','堅實基礎理論'],['Semper Augustus','最貴的鬱金香'],['Bubble Act','禁止公司發行股票的法案'],['investment pools','股友社'],['Babson Break','1929/9/5 暴跌'],['Black Thursday','1929/10/24'],['subprime mortgage','次級房貸'],['MBS','房貸抵押證券'],['CDS','信用違約交換'],['originate and distribute','放貸後打包賣出'],['confidence index','巴倫信心指數'],['TED spread','LIBOR − 國庫券利率'],['short interest','融券餘額'],['breadth of market','市場廣度'],['golden cross','短均線上穿長均線'],['death cross','短均線下穿長均線'],['Bias','乖離率'],['RSI','相對強弱指標'],['OBV','能量潮'],['Fibonacci','黃金切割率'],['Elliott wave','五波上升三波下降'],['Dow theory','潮汐、波浪、漣漪'],['candlestick','K 線（本間宗久）'],['P/E ratio','本益比']
];
DATA.invest.sort = [
  { t:'買進還是賣出訊號？', b:['買進訊號','賣出訊號'], items:[['Put/Call ratio > 0.9',0],['Put/Call ratio < 0.7',1],['投資顧問看空 > 60%',0],['投資顧問看空 < 20%',1],['期貨交易人 70% 看多',1],['OTC/NYSE 量 > 112%',1],['負乖離達 7%',0],['正乖離達 7%',1],['低檔 K 線突破 D 線',0],['RSI 高於 80',1],['股價下跌但 OBV 上升',0],['做市商放空比例 > 50%',1]] },
  { t:'葛蘭碧：買點還是賣點？', b:['買點','賣點'], items:[['MA 由跌走平，股價突破 MA',0],['MA 向上，股價拉回 MA 未跌破',0],['MA 由升走平，股價跌破 MA',1],['MA 向下，股價反彈至 MA 未突破',1],['MA 向上，股價跌破後又回到 MA 之上',0],['MA 向下，股價突破後立刻拉回',1],['股價在 MA 之下乖離很大',0],['股價在 MA 之上乖離很大',1]] },
  { t:'哪一個泡沫？', b:['鬱金香','南海','1929 華爾街','日本','網路','房市'], items:[['Semper Augustus',0],['牛頓虧大錢',1],['Bubble Act',1],['股友社',2],['黑色星期四',2],['地價永不下跌的神話',3],['P/E 超過 60 倍',3],['TheGlobe.com',4],['改名 .com 漲 125%',4],['NO-DOC 貸款',5],['CDO、CDS',5],['馬賽克病毒',0]] },
  { t:'弱式、半強式、強式？（哪一種形式下「這招」開始沒用）', b:['弱式就沒用','半強式才沒用','強式才沒用'], items:[['看 K 線型態',0],['看財報算本益比',1],['知道還沒公布的併購消息',2],['用 RSI、KD',0],['看公司公開的營收新聞',1],['董事會內部會議內容',2]] }
];
DATA.law.match = [
  ['§1','法律 → 習慣 → 法理'],['§12','滿 18 歲成年'],['§13','未滿 7 歲無行為能力'],['§15','受監護宣告無行為能力'],['§16','能力不得拋棄'],['§95','到達主義'],['§124 II','推定 7/1 出生'],['§149','正當防衛'],['§150','緊急避難'],['§153','意思一致契約成立'],['§154 II','標價陳列視為要約'],['§155','拒絕 → 要約失效'],['§156','對話要約非立時承諾失效'],['§159','承諾遲到應發遲到通知'],['§160','變更承諾視為新要約'],['§161','意思實現'],['§172','無因管理定義'],['§174','違反本人意思 → 無過失亦負責'],['§175','急迫危險：惡意重大過失才負責'],['§176','適法管理請求費用＋利息'],['§177 II','不法管理'],['§178','承認 → 適用委任'],['§179','不當得利'],['§180 ④','不法原因給付不得請求返還'],['§184 I 前','故意過失侵害權利'],['§184 I 後','故意背於善良風俗'],['§184 II','違反保護他人法律（推定過失）'],['§187','法定代理人連帶責任'],['§191-3','一般危險責任（雙重推定）'],['§199','給付不以財產價格為限'],['§217','與有過失'],['§245-1','締約過失（2 年）'],['§1064','視為婚生子女']
];
DATA.law.sort = [
  { t:'要約還是要約之引誘？', b:['要約','要約之引誘'], items:[['IKEA 貨架上標價的商品',0],['寄到家裡的價目表 DM',1],['店員當面說「這件 500 賣你」',0],['網路商店標錯價（多數判決）',1],['甲對乙說「我的車 50 萬賣你」',0],['徵人廣告',1]] },
  { t:'無因管理哪一種？', b:['適法無因管理','不適法無因管理','不法管理','誤信管理'], items:[['鄰居出國，颱風前幫他修圍牆',0],['以每斤 20 元賤賣隔壁攤販的香蕉',1],['明知是別人的畫，拿去賣自己賺錢',2],['以為是爸爸遺產的畫，拿去賣',3],['擅自修好鄰居本來要拆的籬笆',1],['代鄰居繳納快逾期的稅',0]] },
  { t:'§184 哪一種？', b:['§184 I 前段','§184 I 後段','§184 II'], items:[['不小心撞壞別人的車',0],['明知對方已婚仍與之通姦',1],['酒駕撞傷行人（違反交通法規）',2],['偷拍他人隱私',0],['唆使他人二重買賣以侵害債權',1],['違反食安法規致消費者受損',2]] },
  { t:'能力怎麼分？', b:['無行為能力','限制行為能力','完全行為能力'], items:[['6 歲兒童',0],['15 歲國中生',1],['20 歲大學生',2],['受監護宣告之人',0],['17 歲高中生',1],['剛滿 18 歲',2]] },
  { t:'義務的種類', b:['主給付義務','從給付義務','附隨義務','不真正義務'], items:[['賣方交付貨物',0],['出租人修繕義務',1],['賣方提供產品證明書',1],['賣方告知產品使用注意事項',2],['被害人避免損害擴大',3],['承租人繳押金（約定）',1]] }
];
DATA.mgmt.match = [
  ['efficiency','doing things right'],['effectiveness','doing the right things'],['figurehead','代表人（人際角色）'],['disseminator','傳播者（資訊角色）'],['disturbance handler','問題處理者（決策角色）'],['conceptual skills','概念技能'],['satisfice','接受夠好的方案'],['escalation of commitment','承諾升高'],['programmed decision','程式化決策'],['policy','a guideline for making decisions'],['anchoring effect','錨定效應'],['sunk costs error','沉沒成本謬誤'],['hindsight bias','後見之明'],['parochialism','狹隘主義'],['geocentric','全球中心'],['franchising','加盟'],['joint venture','合資'],['power distance','權力距離'],['change agent','變革推手'],['unfreezing','解凍'],['idea champion','創意擁護者'],['skunk works','臭鼬工廠'],['core competencies','核心能力'],['cash cow','金牛'],['economic moat','經濟護城河'],['angel investor','天使投資人'],['harvesting','收割（退場）'],['unity of command','指揮統一'],['span of control','控制幅度'],['formalization','正式化'],['organic organization','有機式組織'],['matrix structure','矩陣式結構'],['flextime','彈性工時']
];
DATA.mgmt.sort = [
  { t:"Mintzberg's roles", b:['Interpersonal','Informational','Decisional'], items:[['Figurehead',0],['Leader',0],['Liaison',0],['Monitor',1],['Disseminator',1],['Spokesperson',1],['Entrepreneur',2],['Disturbance handler',2],['Resource allocator',2],['Negotiator',2]] },
  { t:'Programmed or nonprogrammed?', b:['Programmed','Nonprogrammed'], items:[['Customer returns a defective item',0],['Whether to enter a new country',1],['Reordering office supplies',0],['Responding to a new disruptive competitor',1],['Approving routine vacation requests',0],['Choosing a new corporate strategy',1]] },
  { t:'BCG matrix', b:['Star','Cash cow','Question mark','Dog'], items:[['High growth, high share',0],['Low growth, high share',1],['High growth, low share',2],['Low growth, low share',3],['Invest heavily to keep leading',0],['Milk it for cash',1],['Decide: invest or sell',2],['Consider divesting',3]] },
  { t:'Mechanistic or organic?', b:['Mechanistic','Organic'], items:[['High specialization',0],['Cross-functional teams',1],['Narrow span of control',0],['Decentralization',1],['High formalization',0],['Free flow of information',1],['Mass production (Woodward)',0],['Stable environment',0],['Unit production (Woodward)',1]] },
  { t:'Which competitive strategy?', b:['Cost leadership','Differentiation','Focus'], items:[['全聯：全產業最低價',0],['Apple：設計與品牌',1],['只做左撇子文具',2],['Walmart',0],['Starbucks 體驗',1],['專攻高端寵物鮮食',2]] }
];
