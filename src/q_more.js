// ===== 各科補充題：讓每個單元至少約 15 題（u = 單元 id；放在 more.js 之後，舊題目的錯題本編號不變） =====
DATA.basic.mcq.push(
  // 1. 錢與時間
  { u:'b1', q:'100 元存 3 年、年利率 10%、每年複利一次，3 年後變成？', o:['130','131.1','133.1','110'], a:2, e:'100 × 1.1³ = 133.1。' },
  { u:'b1', q:'100 元存 3 年、年利率 10%、單利，3 年後變成？', o:['130','131.1','133.1','103'], a:0, e:'單利只有本金生息：100 + 100 × 10% × 3 = 130。' },
  { u:'b1', q:'1 年後的 110 元，利率 10% 時的現值是？', o:['99','100','110','121'], a:1, e:'PV = 110 ÷ 1.1 = 100。' },
  { u:'b1', q:'其他條件相同，「越久以後」才拿到的同一筆錢，現值會：', o:['越大','越小','不變','變成負數'], a:1, e:'折現的期間越長，PV = FV ÷ (1 + r)ⁿ 的分母越大。' },
  { u:'b1', q:'月報酬 1%，用簡單年化大約是？', o:['1%','6%','12%','100%'], a:2, e:'簡單年化：1% × 12 = 12%（複利年化則是 1.01¹² − 1 ≈ 12.7%）。' },
  { u:'b1', q:'月報酬 1%，用複利年化大約是？', o:['12%','12.7%','13.5%','1.2%'], a:1, e:'(1.01)¹² − 1 ≈ 12.68%，比簡單年化多一點，因為利息會生利息。' },
  { u:'b1', q:'用 50 元買股票、一年後以 45 元賣出、期間配息 1 元。報酬率是？', o:['−10%','−8%','+2%','−12%'], a:1, e:'(45 − 50 + 1) ÷ 50 = −4 ÷ 50 = −8%。' },
  { u:'b1', q:'「72 法則」：年報酬 8% 大約幾年翻倍？', o:['6 年','8 年','9 年','12 年'], a:2, e:'72 ÷ 8 ≈ 9 年，是複利翻倍時間的快速估算。' },
  { u:'b1', q:'為什麼要把不同期間的報酬「年化」？', o:['讓數字變大比較好看','把不同長度的期間放在同一把尺上比較','因為法律規定','讓風險變小'], a:1, e:'3 個月賺 3% 和 2 年賺 15%，要換成一年才能比較。' },

  // 2. 金融商品是什麼
  { u:'b2', q:'債券持有人是發行公司的：', o:['股東','債權人','員工','董事'], a:1, e:'債券是借據：買債券 = 借錢給公司，到期拿回本金並收利息。' },
  { u:'b2', q:'ETF 最主要的特色是：', o:['保證不虧錢','追蹤一籃子資產（例如指數），像股票一樣在交易所買賣','只能在銀行臨櫃買','不會有任何費用'], a:1, e:'例如 0050 追蹤台灣 50 指數，一次買到一籃子股票。' },
  { u:'b2', q:'現在約好價格、未來才交錢交貨，且在交易所標準化交易的是：', o:['現貨','遠期','期貨','股票'], a:2, e:'遠期是私下約定；期貨是交易所標準化、每日結算。' },
  { u:'b2', q:'放空股票的人，在什麼時候賺錢？', o:['股價上漲','股價下跌','股價不動','公司配息'], a:1, e:'先借股票高價賣出，之後低價買回還券，賺價差。' },
  { u:'b2', q:'放空股票理論上的最大損失是：', o:['投入的保證金','股價歸零的金額','無限','0'], a:2, e:'股價可以一直漲，放空的損失沒有上限。' },
  { u:'b2', q:'自己出 50 萬、借 50 萬買 100 萬的股票，股價上漲 10%，自有資金報酬率是？（不計利息）', o:['5%','10%','20%','50%'], a:2, e:'賺 10 萬 ÷ 自有 50 萬 = 20%；槓桿 2 倍讓報酬（和虧損）都放大 2 倍。' },
  { u:'b2', q:'股價指數（例如加權指數）代表：', o:['一檔股票的價格','一群股票整體價格水準的變化','政府公債的利率','匯率'], a:1, e:'用來衡量整體市場的漲跌。' },

  // 3. 風險的數學
  { u:'b3', q:'兩種情況：報酬 30%（機率 0.5）、−10%（機率 0.5）。期望報酬是？', o:['5%','10%','20%','40%'], a:1, e:'0.5 × 30% + 0.5 × (−10%) = 10%。' },
  { u:'b3', q:'承上，變異數是？', o:['0.02','0.04','0.2','0.4'], a:1, e:'0.5 × (0.3 − 0.1)² + 0.5 × (−0.1 − 0.1)² = 0.5 × 0.04 + 0.5 × 0.04 = 0.04；標準差 0.2。' },
  { u:'b3', q:'相關係數的範圍是：', o:['0 到 1','−1 到 1','−∞ 到 ∞','0 到 100'], a:1, e:'+1 完全同向、−1 完全反向、0 沒有線性關係。' },
  { u:'b3', q:'β = 0.5 的股票，大盤下跌 4%，它預期大約：', o:['下跌 2%','下跌 4%','下跌 8%','上漲 2%'], a:0, e:'β × 大盤變動 = 0.5 × (−4%) = −2%。' },
  { u:'b3', q:'兩檔基金報酬都是 10%，A 的標準差 20%、B 的標準差 10%，R_f = 2%。夏普比率較高的是？', o:['A','B','一樣','無法判斷'], a:1, e:'A：(10 − 2) ÷ 20 = 0.4；B：(10 − 2) ÷ 10 = 0.8。B 每單位風險賺得多。' },
  { u:'b3', q:'持有的股票檔數越多，投資組合的總風險會：', o:['一直降到 0','先快速下降，之後趨近系統風險而降不下去','越來越高','不變'], a:1, e:'分散只能消除非系統風險；市場風險（系統風險）分散不掉。' },

  // 4. 公司理財基本功
  { u:'b4', q:'公司決定要不要蓋一座新工廠，屬於：', o:['投資決策','融資決策','股利決策','行銷決策'], a:0, e:'三大財務決策：投資（買什麼資產）、融資（錢從哪來）、股利（賺的錢怎麼分）。' },
  { u:'b4', q:'公司決定賺到的錢要發給股東還是保留再投資，屬於：', o:['投資決策','融資決策','股利決策','人事決策'], a:2, e:'股利政策決定盈餘分配與保留。' },
  { u:'b4', q:'資產 1,000 萬、負債 600 萬，股東權益是？', o:['400 萬','600 萬','1,600 萬','1,000 萬'], a:0, e:'資產 = 負債 + 股東權益 → 權益 = 1,000 − 600 = 400 萬。' },
  { u:'b4', q:'記錄公司「某段期間」收入、費用與淨利的報表是：', o:['資產負債表','損益表','現金流量表','股東名冊'], a:1, e:'資產負債表是某一「時點」的存量；損益表是一段「期間」的流量。' },
  { u:'b4', q:'營收 500 萬、費用 380 萬、稅 24 萬，淨利是？', o:['96 萬','120 萬','380 萬','500 萬'], a:0, e:'500 − 380 − 24 = 96 萬。' },
  { u:'b4', q:'下列何者是「負債」？', o:['存貨','應付帳款','現金','廠房'], a:1, e:'應付帳款是欠供應商的錢；其他三者是資產。' },
  { u:'b4', q:'股份有限公司的股東對公司債務的責任是：', o:['無限責任','以出資額為限的有限責任','由董事長一人負責','沒有任何責任'], a:1, e:'有限責任：最多賠掉投資的錢。' },
  { u:'b4', q:'「單一價格法則」是指：', o:['所有商品價格都一樣','同一商品在不同市場（扣除成本後）應該只有一個價格','價格由政府決定','價格永遠不變'], a:1, e:'若價格不同就有套利機會，套利行為會把價格拉回一致。' },
  { u:'b4', q:'真正的「套利」最重要的特徵是：', o:['高風險高報酬','不承擔風險、不用自己出錢就能賺錢','一定要長期持有','只能在股市進行'], a:1, e:'同時低買高賣、鎖定利潤；套利機會通常很快消失。' }
);

DATA.deriv.mcq.push(
  // Ch1 衍生性商品入門
  { u:'ch1', q:'衍生性商品的價值主要取決於：', o:['發行公司的名氣','標的資產（例如股票、利率、商品）的價格','政府規定','交易所的大小'], a:1, e:'「衍生」自另一項資產的價格。' },
  { u:'ch1', q:'持有股票的人買進 put 保護下跌風險，屬於哪一種用途？', o:['避險','投機','套利','造市'], a:0, e:'避險：降低既有部位的風險。' },
  { u:'ch1', q:'看好某股票、用很少錢買 call 想賺大錢，屬於：', o:['避險','投機','套利','保險'], a:1, e:'投機：承擔風險換取槓桿報酬。' },
  { u:'ch1', q:'買 put：K = 40、權利金 2，損益兩平的股價是？', o:['38','40','42','36'], a:0, e:'Put 損益兩平 = K − 權利金 = 38。' },
  { u:'ch1', q:'Short put（賣出賣權）的最大可能損失是：', o:['權利金','K − 權利金','無限','0'], a:1, e:'股價跌到 0 時賠 K，扣掉收到的權利金 → 最大損失 K − 權利金。' },
  { u:'ch1', q:'Long 遠期，交割價 K = 60，到期 S_T = 66。每單位收益是？', o:['−6','0','+6','+66'], a:2, e:'Long forward payoff = S_T − K = 6。' },
  // Ch2 期貨市場的運作
  { u:'ch2', q:'期貨價格在到期時會收斂到：', o:['原始成交價','現貨價格','0','履約價'], a:1, e:'到期時若期貨 ≠ 現貨就有套利機會，所以兩者收斂。' },
  { u:'ch2', q:'大多數期貨部位最後的結束方式是：', o:['實物交割','到期前反向平倉','違約','轉成選擇權'], a:1, e:'大部分交易人在到期前平倉，真正交割的比例很低。' },
  { u:'ch2', q:'多頭 1 口，每口 1,000 單位，原始保證金 6,000。期貨價格當天下跌 2 元，保證金餘額變成？', o:['4,000','6,000','8,000','2,000'], a:0, e:'損失 2 × 1,000 = 2,000，6,000 − 2,000 = 4,000。' },
  // Ch3 用期貨避險
  { u:'ch3', q:'農夫 3 個月後要賣出玉米，擔心價格下跌，應：', o:['Long futures','Short futures','買 call','什麼都不做'], a:1, e:'未來要賣出現貨 → 空頭避險（short hedge）。' },
  { u:'ch3', q:'以「其他相關資產」的期貨來避險（例如用原油期貨避險航空燃油），稱為：', o:['交叉避險 cross hedge','完全避險','套利','投機'], a:0, e:'標的不同會增加基差風險，所以要用 h* 調整口數。' },
  { u:'ch3', q:'組合 $5M、β = 0.8，想提高到 β = 1.2；指數期貨 1,000、乘數 $250。應：', o:['Short 8 口','Long 8 口','Long 20 口','Short 20 口'], a:1, e:'(β* − β) × P ÷ (F × 乘數) = 0.4 × 5,000,000 ÷ 250,000 = 8 → 要提高 β 所以 Long。' }
);

DATA.invest.mcq.push(
  // i1 課程地圖與基本觀念
  { u:'i1', q:'強式效率市場成立時：', o:['只有技術分析無效','連內線消息也無法持續獲得超額報酬','基本分析仍然有效','市場價格不反映任何資訊'], a:1, e:'強式：所有公開與非公開資訊都已反映在價格中。' },
  { u:'i1', q:'技術分析主要研究的是：', o:['公司財報與產業前景','過去的價格與成交量','總體經濟政策','公司治理'], a:1, e:'基本分析看價值；技術分析看價量與市場心理。' },
  { u:'i1', q:'在 CAPM 下，位於 SML 上方的股票代表：', o:['被高估','被低估（預期報酬高於應有的報酬）','β 為 0','沒有風險'], a:1, e:'實際預期報酬 > CAPM 要求報酬 → 價格偏低，值得買進。' },
  // i2 泡沫史
  { u:'i2', q:'鬱金香狂熱中，讓花瓣出現火焰般條紋、使球莖更稀有更貴的原因是：', o:['特殊肥料','馬賽克病毒','基因改造','雜交育種'], a:1, e:'非致命的 mosaic virus 讓花瓣出現 bizarre 條紋。' },
  { u:'i2', q:'鬱金香狂熱時期，讓人不必付全額就能參與上漲的交易工具是：', o:['期貨','買權（call option）','債券','股票'], a:1, e:'用選擇權參與，槓桿推升了投機熱潮。' },
  { u:'i2', q:'南海公司獲得南海貿易壟斷權，是因為它：', o:['發明了新航線','幫英國政府承擔大量債務','擁有最多船隻','和西班牙結盟'], a:1, e:'1711 年承擔約 1,000 萬英鎊政府債務；1720 年再決議承擔 3,100 萬英鎊。' },
  { u:'i2', q:'「我能計算天體運行，卻無法計算人類的瘋狂」是誰在南海泡沫虧錢後說的？', o:['亞當斯密','牛頓','凱因斯','達爾文'], a:1, e:'連牛頓都在南海泡沫中虧了大錢。' },
  { u:'i2', q:'南海泡沫後英國國會通過的《泡沫法案》規定：', o:['禁止公司未經特許發行股票','禁止買賣鬱金香','提高利率','成立中央銀行'], a:0, e:'直到 1825 年廢除前，英國很少有股票發行。' },
  { u:'i2', q:'1920 年代美國股市泡沫中，股友社（investment pools）的手法是：', o:['長期持有績優股','默默囤股 → 放出好消息 → 大眾跟進時倒貨','只買債券','放空所有股票'], a:1, e:'炒作後在高點把股票賣給跟風的大眾。' },
  { u:'i2', q:'1929 年 9 月 5 日的股市暴跌被稱為：', o:['黑色星期一','貝森缺口（Babson Break）','雷曼時刻','閃電崩盤'], a:1, e:'金融專家貝森預言崩盤後市場暴跌。' },
  { u:'i2', q:'日本泡沫時期流傳的「兩個神話」是：', o:['日圓永遠升值、出口永遠成長','地價永不下跌、股價只會上漲','利率永遠上升、通膨永遠高','人口永遠成長、薪資永遠上漲'], a:1, e:'加上強迫性儲蓄與超低利率推波助瀾。' },
  { u:'i2', q:'日本泡沫破滅的主要觸發因素是：', o:['1989–1990 年利率急升','地震','美國升值','禁止外資'], a:0, e:'日經指數從約 40,000 跌到 1992 年的 14,309（約 −63%）。' },
  { u:'i2', q:'席勒（Shiller）在《非理性繁榮》中，把泡沫描述為：', o:['理性預期的結果','正向反饋回圈：漲 → 媒體報導 → 更多人買 → 再漲','政府刻意製造','純粹的隨機漫步'], a:1, e:'網路泡沫是典型例子。' },
  { u:'i2', q:'網路泡沫時，普渡大學研究發現公司改名加入網路字眼，改名期間股價：', o:['沒有變化','比同類公司高出約 125%','反而下跌','被交易所停牌'], a:1, e:'光改名就能大漲，顯示市場非理性。' },
  { u:'i2', q:'銀行從「originate and hold」變成「originate and distribute」，最主要的後果是：', o:['放貸標準變得更嚴','放貸標準變鬆，因為風險可以打包賣掉','銀行不再放貸','房價下跌'], a:1, e:'2008 房市泡沫的重要背景。' },
  // i3 技術分析 I
  { u:'i3', q:'技術分析的三大假設不包括：', o:['價格反映一切','價格以趨勢移動','歷史會重演','價格永遠等於內在價值'], a:3, e:'「價格等於內在價值」反而是效率市場的觀點。' },
  { u:'i3', q:'對技術分析交易規則的挑戰之一「自我實現預言」是指：', o:['規則一定正確','大家都照同一個訊號買賣，使預測自己成真','技術分析不需要資料','價格永遠不變'], a:1, e:'訊號有效可能只是因為很多人照著做。' },
  { u:'i3', q:'下列何者是技術分析的優點？', o:['不受不同會計處理方法影響','保證獲利','完全不需要判斷','可以預測公司的盈餘'], a:0, e:'也不需要銷售、管理費用等細節，並能反映心理因素。' },
  { u:'i3', q:'依反向意見指標，共同基金的現金比率很高時代表：', o:['賣出訊號','買進訊號（潛在買盤多）','沒有意義','市場一定崩盤'], a:1, e:'基金手上現金多，未來可能進場買股。' },
  { u:'i3', q:'CBOE Put/Call ratio 大於 0.9 時，反向意見解讀為：', o:['市場太悲觀 → 買進訊號','市場太樂觀 → 賣出訊號','中性','停止交易'], a:0, e:'大家都在買 put（看空）時反而是買點；< 0.7 是賣出訊號。' },
  { u:'i3', q:'期貨交易人看多比例 ≥ 70% 時，反向意見解讀為：', o:['買進訊號','賣出訊號','中性','加碼訊號'], a:1, e:'大家都看多 → 可能過熱；≤ 30% 則是買進訊號。' },
  { u:'i3', q:'巴倫信心指數的計算方式是：', o:['中級公司債殖利率 ÷ 高評級公司債殖利率','高評級公司債平均殖利率 ÷ 中級公司債平均殖利率 × 100%','股價 ÷ 盈餘','上漲家數 − 下跌家數'], a:1, e:'法人有信心 → 買中級債 → 中級債殖利率下降 → 指數上升、接近 100%。' },
  { u:'i3', q:'TED spread 暴增（例如 2008 年超過 450 bps）代表：', o:['銀行互不信任、流動性危機','股市過熱','通膨下降','公債違約'], a:0, e:'銀行間借款利率（LIBOR）遠高於國庫券利率。' },
  { u:'i3', q:'指數創新高、但上漲家數持續萎縮（騰落線向下），代表：', o:['全面普漲','頂部背離，少數權值股撐盤','底部訊號','沒有意義'], a:1, e:'市場廣度（breadth）變差是警訊。' },
  { u:'i3', q:'融券餘額很高，依反向觀點可能是：', o:['賣出訊號','買進訊號，因為空單未來必須回補（可能軋空）','代表公司要倒閉','代表沒有人交易'], a:1, e:'Days to cover = 融券總量 ÷ 日均成交量；空單是未來的買盤。' },
  { u:'i3', q:'站上 200 日均線的股票比例低於 20% 代表：', o:['超買','超賣','中性','停止交易'], a:1, e:'> 80% 超買；< 20% 超賣。' },
  // i4 技術分析 II
  { u:'i4', q:'短期均線由下往上穿越長期均線，稱為：', o:['死亡交叉','黃金交叉','頭肩頂','缺口'], a:1, e:'黃金交叉是買進訊號；由上往下穿越是死亡交叉。' },
  { u:'i4', q:'RSI 大於 80 通常被解讀為：', o:['超賣','超買','沒有趨勢','成交量過低'], a:1, e:'RSI 高代表近期上漲力道強、可能過熱；低於 20 為超賣。' }
);

DATA.mgmt.mcq.push(
  // m1
  { u:'m1', q:'Managers who make organization-wide decisions and establish plans and goals are:', o:['First-line managers','Middle managers','Top managers','Nonmanagerial employees'], a:2, e:'高階管理者：例如 CEO、總經理，負責全組織的方向。' },
  { u:'m1', q:'"Doing things right" — getting the most output from the least input — refers to:', o:['Effectiveness','Efficiency','Leadership','Planning'], a:1, e:'效率（efficiency）看手段；效能（effectiveness）看目標是否達成。' },
  { u:'m1', q:'Which function involves motivating employees and resolving conflicts?', o:['Planning','Organizing','Leading','Controlling'], a:2, e:'Leading：領導、激勵、溝通、處理衝突。' },
  { u:'m1', q:'Mintzberg 的 "figurehead"（代表人）屬於哪一類角色？', o:['Interpersonal','Informational','Decisional','Technical'], a:0, e:'人際角色：代表人、領導者、聯絡人。' },
  { u:'m1', q:'Mintzberg 的 "resource allocator" 屬於：', o:['Interpersonal','Informational','Decisional','Conceptual'], a:2, e:'決策角色：企業家、問題處理者、資源分配者、談判者。' },
  // m4
  { u:'m4', q:'Viewing the home country as superior and using home-country approaches everywhere is:', o:['Polycentric attitude','Ethnocentric attitude','Geocentric attitude','Parochialism'], a:1, e:'民族中心：認為母國的做法最好。' },
  { u:'m4', q:'Believing that local managers know best how to run operations in their country is:', o:['Ethnocentric','Polycentric','Geocentric','Multidomestic'], a:1, e:'多元中心：交給當地人管理。' },
  { u:'m4', q:'Giving another organization the right to use your technology or product specifications, usually in manufacturing, is:', o:['Franchising','Licensing','Exporting','Joint venture'], a:1, e:'Licensing 多為製造業技術授權；Franchising 多為服務業的名稱與營運方式。' },
  { u:'m4', q:'Hofstede 文化構面中，社會接受權力分配不平均的程度稱為：', o:['Individualism','Power distance','Uncertainty avoidance','Long-term orientation'], a:1, e:'台灣權力距離相對美國較高。' },
  { u:'m4', q:'An MNC that centralizes management and decision making in the home country is a:', o:['Multidomestic corporation','Global company','Transnational organization','Born global'], a:1, e:'Global company 集權於母國；multidomestic 分權給當地；transnational 打破國界。' },
  // m7
  { u:'m7', q:'下列何者是組織變革的「外部」力量？', o:['新的組織策略','員工態度改變','政府法規改變','導入新設備'], a:2, e:'外部：市場、法規、技術、勞動市場、經濟變化。' },
  { u:'m7', q:'Reducing resistance by offering something of value in exchange for an agreement is:', o:['Coercion','Negotiation','Participation','Manipulation'], a:1, e:'談判適合抗拒來自有力群體時，但成本可能很高。' },
  { u:'m7', q:'"Creativity" differs from "innovation" because creativity is:', o:['Turning ideas into products','The ability to combine ideas in a unique way or make unusual associations','Only about technology','The same as innovation'], a:1, e:'創意是產生點子；創新是把點子變成有用的產品或流程。' },
  { u:'m7', q:'Disruptive innovation typically starts by:', o:['Targeting the most demanding customers','Offering simpler, cheaper products to overlooked or low-end customers','Improving existing products for current customers','Raising prices'], a:1, e:'維持式創新是在既有產品上小幅改良。' },
  // m9
  { u:'m9', q:'策略管理的第一步是：', o:['Formulate strategies','Identify current mission, goals, and strategies','Evaluate results','Do a SWOT analysis'], a:1, e:'六步驟：確認使命 → 外部分析 → 內部分析 → 擬定策略 → 執行 → 評估。' },
  { u:'m9', q:'A strategy that seeks to reduce operations because of declining performance is a:', o:['Growth strategy','Stability strategy','Retrenchment strategy','Diversification'], a:2, e:'更新策略（renewal）包括緊縮與轉型。' },
  { u:'m9', q:'BCG 矩陣中「高成長、高市佔」的事業是：', o:['Cash cow','Star','Question mark','Dog'], a:1, e:'明星需要大量投資以維持成長。' },
  { u:'m9', q:'Competing by being the lowest-cost producer in the industry is:', o:['Differentiation strategy','Cost leadership strategy','Focus strategy','Stuck in the middle'], a:1, e:'Porter 三大競爭策略：成本領導、差異化、集中。' },
  { u:'m9', q:'Porter 五力中，「轉換成本高、品牌忠誠度強」主要會降低：', o:['供應商的議價能力','替代品的威脅與新進入者的威脅','產業內競爭程度','政府管制'], a:1, e:'顧客不容易換，替代品與新進者都較難搶市場。' },
  // m10
  { u:'m10', q:'A person who works for himself or herself without employees is best described as:', o:['Entrepreneur','Self-employed','Small business owner','Intrapreneur'], a:1, e:'自僱：一個人做自己的生意。' },
  { u:'m10', q:'Venture capital is best described as:', o:['Personal savings','External equity funding provided by professionally managed pools of investor money','A bank loan','Government tax credits'], a:1, e:'VC 投資新創以換取股權，通常要求高成長。' },
  { u:'m10', q:'A written document that summarizes a business opportunity and how it will be seized and exploited is a:', o:['Business plan','Feasibility study','Mission statement','Budget'], a:0, e:'營運計畫書：機會、競爭、財務規劃、團隊等。' },
  { u:'m10', q:'Which legal form offers limited liability and pass-through taxation, without the strict rules of an S corporation?', o:['Sole proprietorship','General partnership','LLC','C corporation'], a:2, e:'LLC：有限責任＋穿透課稅、結構彈性。' },
  { u:'m10', q:'In a general partnership, the partners have:', o:['Limited liability','Unlimited liability','No liability','Liability only for taxes'], a:1, e:'普通合夥人對債務負無限連帶責任；有限合夥人才有有限責任。' },
  { u:'m10', q:'Which is NOT a common source of entrepreneurial opportunity (Drucker)?', o:['The unexpected','Changes in demographics','New knowledge','Guaranteed government contracts'], a:3, e:'Drucker 的機會來源：意外、不一致、流程需要、產業結構變化、人口統計、認知改變、新知識。' },
  { u:'m10', q:'Investigating competitors to understand their strengths and weaknesses is part of:', o:['Feasibility study / competitor research','Harvesting','Organizing','Controlling'], a:0, e:'可行性研究包括點子、競爭者、融資。' },
  { u:'m10', q:'Which financing source involves selling shares to the public?', o:['Angel investor','Venture capital','Initial public offering (IPO)','Family loan'], a:2, e:'IPO：公司首次公開發行股票。' },
  { u:'m10', q:'Entrepreneurs who are drawn to start a business mainly by a strong need for independence and achievement show which trait?', o:['High need for achievement and internal locus of control','External locus of control','Low tolerance for ambiguity','Risk avoidance'], a:0, e:'創業者常見特質：高成就需求、相信自己能掌控結果、能容忍模糊、願意承擔適度風險。' },
  { u:'m10', q:'Bringing in professional managers as a venture grows mainly addresses:', o:['Managing growth','Harvesting','Feasibility','Licensing'], a:0, e:'成長階段需要規劃、組織與控制能力跟上。' },
  // m11
  { u:'m11', q:'The number of employees a manager can efficiently and effectively manage is:', o:['Chain of command','Span of control','Formalization','Work specialization'], a:1, e:'控制幅度越寬，層級越少。' },
  { u:'m11', q:'The degree to which jobs are standardized and guided by rules and procedures is:', o:['Formalization','Decentralization','Departmentalization','Span of control'], a:0, e:'正式化程度高 → 員工裁量空間小。' },
  { u:'m11', q:'Dividing work activities into separate job tasks is:', o:['Work specialization','Unity of command','Matrix structure','Empowerment'], a:0, e:'組織設計六要素之一。' }
);

DATA.law.mcq.push(
  { u:'l4', q:'無因管理的成立要件「管理他人事務」中，「他人」的事務，下列何者正確？', o:['只限財產上的事務','包含事實行為與法律行為','只限法律行為','只限緊急事件'], a:1, e:'修繕、救助等事實行為，以及代為締約等法律行為都可以。' },
  { u:'l4', q:'無因管理的主觀要件「為他人管理」是指：', o:['有為他人利益而管理的意思','一定要本人知情','一定要有報酬','一定要先簽約'], a:0, e:'具有管理意思；若為自己利益而管理他人事務，則屬不法管理（§177 II）。' },
  { u:'l4', q:'無因管理的管理人應依何種方法管理？', o:['自己方便的方法','本人明示或可得推知之意思，以有利於本人之方法','法院指定的方法','任意方法'], a:1, e:'§172 後段。' },
  { u:'l2', q:'7 歲以上未成年人未得法定代理人允許所訂立的契約，效力為：', o:['無效','有效','效力未定，須經法定代理人承認始生效力','得撤銷'], a:2, e:'§79：限制行為能力人未得允許所訂立之契約，須經承認始生效力。' },
  { u:'l2', q:'限制行為能力人純獲法律上利益（例如受贈與）的行為：', o:['無效','不須得法定代理人允許','須經法院許可','效力未定'], a:1, e:'§77 但書：純獲法律上利益，或依其年齡及身分日常生活所必需者，不須允許。' }
);

DATA.deriv.mcqEn.push(
  { u:'ch1', q:'A derivative is a financial instrument whose value depends on:', o:['the issuer’s reputation','the value of an underlying asset or variable','government regulation','the size of the exchange'], a:1, e:'衍生性商品的價值取決於標的資產。' },
  { u:'ch1', q:'An investor who owns a stock and buys a put to protect against a price decline is:', o:['hedging','speculating','arbitraging','market making'], a:0, e:'避險：降低既有部位的風險。' },
  { u:'ch1', q:'A long put has K = 40 and premium 2. The breakeven stock price is:', o:['38','40','42','36'], a:0, e:'K − premium = 38。' },
  { u:'ch1', q:'A long forward has delivery price K = 60. If S_T = 66, the payoff per unit is:', o:['−6','0','+6','+66'], a:2, e:'S_T − K = 6。' },
  { u:'ch1', q:'The maximum loss from writing (shorting) a put is:', o:['the premium','K minus the premium','unlimited','zero'], a:1, e:'股價跌到 0 時損失 K，扣掉收到的權利金。' },
  { u:'ch2', q:'As a futures contract approaches delivery, the futures price converges to:', o:['the original trade price','the spot price','zero','the strike price'], a:1, e:'到期時期貨與現貨價格收斂，否則有套利機會。' },
  { u:'ch2', q:'Most futures positions are terminated by:', o:['physical delivery','closing out before maturity','default','conversion into options'], a:1, e:'大部分部位在到期前反向平倉。' },
  { u:'ch2', q:'A trader is long one contract of 1,000 units with an initial margin of 6,000. If the futures price falls by 2, the margin balance becomes:', o:['4,000','6,000','8,000','2,000'], a:0, e:'損失 2 × 1,000 = 2,000。' },
  { u:'ch2', q:'Daily settlement of futures contracts is also known as:', o:['marking to market','tailing the hedge','basis trading','rolling over'], a:0, e:'每日依結算價計算損益並調整保證金帳戶。' },
  { u:'ch2', q:'A trading day in which a trader opens and closes the same position most likely increases:', o:['open interest only','trading volume but not open interest','neither volume nor open interest','open interest but not volume'], a:1, e:'當沖會增加成交量，但不留下未平倉部位。' }
);
