// ===== 衍金 期中大抄（A4 正反面手抄）＋ BA II Plus 按法，以及公式教室的 Ch4、Ch7 公式 =====
(() => {
  const K = s => s.split(' ').map(k => `<kbd>${k.replace(/_/g, ' ')}</kbd>`).join(' '); // 按鍵：'2nd LN' → <kbd>2nd</kbd> <kbd>LN</kbd>
  const blk = (t, body) => `<div class="cblk"><h4>${t}</h4>${body}</div>`;
  const ul = a => `<ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>`;

  const must = `<div class="cmust"><h3>必抄區（先抄這區，字可以最小）</h3>
${blk('1. 複利換算', ul([
  'R<sub>c</sub> = m · ln(1 + R<sub>m</sub>/m)　　R<sub>m</sub> = m · (e<sup>R<sub>c</sub>/m</sup> − 1)',
  '年有效 = (1 + R<sub>m</sub>/m)<sup>m</sup> − 1 = e<sup>R<sub>c</sub></sup> − 1',
  '同樣終值：複利越頻繁，報價利率越低；比較或代公式前一定先換成同一種複利']))}
${blk('2. 遠期／期貨價格（一個家族）', ul([
  '無收益：F<sub>0</sub> = S<sub>0</sub>e<sup>rT</sup>',
  '已知現金收益 I（股利、票息的現值）：F<sub>0</sub> = (S<sub>0</sub> − I)e<sup>rT</sup>',
  '已知收益率 q（指數股利率）：F<sub>0</sub> = S<sub>0</sub>e<sup>(r − q)T</sup>',
  '外匯（S<sub>0</sub>＝每 1 外幣值多少本國幣）：F<sub>0</sub> = S<sub>0</sub>e<sup>(r − r<sub>f</sub>)T</sup>',
  '商品：F<sub>0</sub> ≤ (S<sub>0</sub> + U)e<sup>rT</sup>（U＝儲存成本現值）；比例 u：F<sub>0</sub> ≤ S<sub>0</sub>e<sup>(r + u)T</sup>；便利殖利率 y：F<sub>0</sub> = S<sub>0</sub>e<sup>(r + u − y)T</sup>',
  '持有成本 c：投資資產 F<sub>0</sub> = S<sub>0</sub>e<sup>cT</sup>；消費資產 F<sub>0</sub> = S<sub>0</sub>e<sup>(c − y)T</sup>']))}
${blk('3. 遠期合約價值（K＝當初約定價）', ul([
  'Long：f = (F<sub>0</sub> − K)e<sup>−rT</sup>；Short：f = (K − F<sub>0</sub>)e<sup>−rT</sup>（F<sub>0</sub>＝「今天」的遠期價格）',
  '無收益：f = S<sub>0</sub> − Ke<sup>−rT</sup>；收益 I：f = S<sub>0</sub> − I − Ke<sup>−rT</sup>；收益率 q：f = S<sub>0</sub>e<sup>−qT</sup> − Ke<sup>−rT</sup>',
  '簽約當下 K = F<sub>0</sub> → 價值 0']))}
${blk('4. 套利判斷', ul([
  '市價 F &gt; 理論 F<sub>0</sub>：<b>short 期貨 ＋ 借錢買現貨</b>（cash-and-carry），到期用現貨交割',
  '市價 F &lt; 理論 F<sub>0</sub>：<b>long 期貨 ＋ 放空（或賣出）現貨、錢拿去存</b>（reverse cash-and-carry）',
  '外匯：遠期太便宜 → 借外幣、換本國幣存起來、long 遠期；遠期太貴 → 借本國幣、換外幣存起來、short 遠期',
  '每單位利潤 ≈ |市價 − 理論價|（到期時的金額）']))}
${blk('5. 保證金', ul([
  '可虧額度 = 原始保證金 − 維持保證金（多口要乘口數）',
  '追繳價：long = F<sub>0</sub> − 可虧額度 ÷ 總規模；short = F<sub>0</sub> + 可虧額度 ÷ 總規模',
  '可提領 X：帳戶要高於原始保證金 X → long 價格要漲 X ÷ 總規模；short 要跌 X ÷ 總規模',
  '追繳時要補回<b>原始</b>保證金；結算所會員只有原始保證金（沒有維持）']))}
${blk('6. 避險', ul([
  'h* = ρ · σ<sub>S</sub> / σ<sub>F</sub>（ρ = 1 才是完美避險）',
  'N* = h* · Q<sub>A</sub> / Q<sub>F</sub>；tailing（考慮每日結算）N* = h* · V<sub>A</sub> / V<sub>F</sub>（V＝價格 × 數量）',
  '股票組合：N* = β · V<sub>A</sub> / V<sub>F</sub>；調 β：N = (β* − β) · V<sub>A</sub> / V<sub>F</sub>（正 long、負 short）',
  '基差 b = S − F；避險後實際價格 = F<sub>1</sub> + b<sub>2</sub>（short hedge 賣價、long hedge 買價）',
  '基差變強（b 變大）→ short hedger 有利、long hedger 不利']))}
${blk('7. 利率', ul([
  '遠期利率：R<sub>F</sub> = (R<sub>2</sub>T<sub>2</sub> − R<sub>1</sub>T<sub>1</sub>) / (T<sub>2</sub> − T<sub>1</sub>)（連續複利）',
  'FRA（收固定 R<sub>K</sub>）：V = L(R<sub>K</sub> − R<sub>F</sub>)(T<sub>2</sub> − T<sub>1</sub>)e<sup>−R<sub>2</sub>T<sub>2</sub></sup>；付固定加負號。R<sub>F</sub> 要先換成和 R<sub>K</sub> 同一種複利',
  '債券：B = Σ c<sub>i</sub>e<sup>−R<sub>i</sub>t<sub>i</sub></sup>（零息利率）或 Σ c<sub>i</sub>e<sup>−yt<sub>i</sub></sup>（殖利率）',
  '存續期間 D = Σ t<sub>i</sub>c<sub>i</sub>e<sup>−yt<sub>i</sub></sup> / B；ΔB ≈ −B · D · Δy',
  'y 為 m 次複利：修正存續期間 D* = D / (1 + y/m)，ΔB ≈ −B · D* · Δy',
  '凸性：ΔB/B ≈ −D · Δy + ½ · C · (Δy)<sup>2</sup>，C = Σ t<sub>i</sub><sup>2</sup>c<sub>i</sub>e<sup>−yt<sub>i</sub></sup> / B',
  '平價收益率：c = (100 − 100d) · m / A（d＝最後一期折現因子、A＝各期折現因子總和）']))}
${blk('8. 交換', ul([
  '淨成本 = 原本借款 ＋ 交換的兩筆（收為 +、付為 −），浮動會抵銷',
  '比較利益：總利益 = 兩個市場利差的差；扣掉銀行後平分',
  '利率交換價值（付固定方）= Σ（浮動 − 固定）· e<sup>−rt</sup>，浮動用遠期利率估；簽約時價值 0',
  '貨幣交換（收外幣、付本國幣）：V = S<sub>0</sub>B<sub>F</sub> − B<sub>D</sub>；或用 F<sub>t</sub> = S<sub>0</sub>e<sup>(r − r<sub>f</sub>)t</sup> 換算每期再折現',
  '造市者：bid＝它<b>付</b>的固定利率、ask＝它<b>收</b>的固定利率；swap rate＝平均']))}
${blk('9. 其他小公式', ul([
  'OI 變化 = 買方開倉 − 賣方平倉（＝ 賣方開倉 − 買方平倉）',
  'Payoff：long forward S<sub>T</sub> − K；long call max(S<sub>T</sub> − K, 0)；long put max(K − S<sub>T</sub>, 0)；profit = payoff − 權利金',
  '損益兩平：call = K + c；put = K − p']))}
</div>`;

  const units = `<h3>各章觀念與做法</h3>
${blk('Ch1 衍生性商品入門', ul([
  '交易所（標準化、有結算所）vs OTC（客製化、有對手違約風險）',
  '三種參與者：避險者（降低風險）、投機者（賭方向、用槓桿）、套利者（無風險鎖利）',
  '遠期：約好未來價格，雙方都有義務；選擇權：買方有權利沒義務，要付權利金',
  'Call＝買的權利、put＝賣的權利；American 到期前都能履約、European 只能到期履約']))}
${blk('Ch2 期貨市場的運作', `<table class="tbl"><tr><th></th><th>期貨</th><th>遠期</th></tr><tr><td>交易</td><td>交易所</td><td>OTC</td></tr><tr><td>規格</td><td>標準化</td><td>客製化</td></tr><tr><td>結算</td><td>每日結算</td><td>到期結算</td></tr><tr><td>結束</td><td>通常到期前平倉</td><td>通常交割或現金結算</td></tr><tr><td>信用風險</td><td>幾乎沒有</td><td>有</td></tr></table>${ul([
  '到期時期貨價格收斂到現貨價格；交割選擇（地點、品質、時間）在空方',
  '委託單：market、limit、stop（觸價變市價）、stop-limit、MIT、discretionary、time-of-day、open、fill-or-kill',
  '外匯報價：直接報價（每 1 外幣多少美元）vs 間接報價（每 1 美元多少外幣）；比較前先換成同一種'])}`)}
${blk('Ch3 用期貨避險', ul([
  'Short hedge：手上有、將來要賣（怕跌）；long hedge：將來要買（怕漲）',
  '支持避險：專注本業、降低不確定性。反對：股東可自己分散、同業都不避險時反而增加風險、避險虧損難以向管理層解釋',
  '基差風險：避險結束時基差不確定；用相關但不同的資產避險（cross hedge）時更大',
  '選月份：避險結束之後最近的月份、避開交割月；選標的：和曝險資產相關性最高',
  '為何避險股票：暫時想退出市場、或想賺 alpha（避掉 β 後剩無風險利率 + alpha）',
  'Stack and roll：用短期合約一再展期避長期風險，風險是基差變動與保證金的流動性壓力']))}
${blk('Ch4 利率', ul([
  '利率種類：國庫券利率、SOFR（有擔保隔夜）、repo、OIS；衍生性商品評價用的無風險利率多用 OIS／SOFR',
  '零息利率＝只在到期付一次的利率；拔靴法：由短到長，用已知的零息利率把前面票息折現，剩下解最後一期',
  '到期殖利率：讓所有現金流折現等於價格的單一利率',
  '遠期利率高於零息利率 ⇔ 零息利率曲線向上',
  '利率期限結構理論：預期理論、市場區隔理論、流動性偏好理論（長期利率含流動性溢酬，曲線常向上）',
  '存續期間＝加權平均到期時間，也是價格對利率的敏感度；凸性為正 → 漲多跌少']))}
${blk('Ch5 遠期與期貨價格', ul([
  '投資資產（為投資而持有，可用套利定價）vs 消費資產（為使用而持有，只能得到上限）',
  '放空：借來賣、之後買回還；放空期間要付給出借人股利',
  '利率確定時，遠期價格 = 期貨價格；利率與標的正相關時，期貨略高',
  '股價指數：股利率 q；外幣：外國利率 r<sub>f</sub> 就像收益率',
  '期貨價格 vs 預期現貨價格：系統風險為正 → F<sub>0</sub> &lt; E(S<sub>T</sub>)（normal backwardation）；系統風險為負 → contango']))}
${blk('Ch7 交換', ul([
  '交換＝一連串遠期；名目本金只用來算利息；SOFR 期間利率到期末才知道',
  '把負債／投資的固定 ↔ 浮動互換：想付固定 → 交換裡付固定、收浮動',
  '金融中介同時做兩張反向交換，賺價差、承擔違約風險；兩邊同時出現很少 → 當造市者',
  '比較利益做法：(1) 算兩市場利差 (2) 總利益 = 利差的差 (3) 扣銀行後平分 (4) 各借有比較利益的那種 (5) 算目標成本 (6) 反推交換利率 (7) 驗算銀行',
  '貨幣交換：本金期初、期末都交換；期初方向和之後相反；中介若承擔兩種貨幣的現金流 → 承擔匯率風險']))}`;

  const methods = `<h3>常見題型的做法（只抄步驟，不抄題目）</h3>
${blk('保證金追繳', ul(['判斷 long 怕跌、short 怕漲','可虧額度 ÷ 總規模 = 可變動的價格','從 F<sub>0</sub> 加或減，得到追繳價']))}
${blk('避險口數', ul(['判斷 long 或 short hedge','有 ρ、σ → 先算 h*；有 β → 用 β','數量用 Q、tailing 或股票組合用 V（價格 × 數量）','四捨五入到整數口']))}
${blk('套利', ul(['先用公式算理論 F<sub>0</sub>（注意收益、股利、外國利率）','和市價比，決定買或賣期貨','寫出現貨那一側的借貸與買賣','到期時的利潤 ≈ 差價']))}
${blk('比較利益交換設計', ul(['算兩市場利差 → 總利益 = 利差的差','扣銀行費用，剩下依題目分配','各自去借相對划算的那種','算每家公司的目標成本 → 反推交換利率','驗算：三筆加總等於目標，銀行剛好賺到費用']))}
${blk('交換評價', ul(['利率交換：畫時間軸 → 每期浮動用遠期利率（換成付息頻率的複利）→ 淨額折現加總','貨幣交換：債券法 B<sub>D</sub>、B<sub>F</sub> 各自折現，V = S<sub>0</sub>B<sub>F</sub> − B<sub>D</sub>；遠期法每期換匯再折現','注意站在哪一方：收的一方為正']))}
${blk('債券與利率', ul(['零息利率逐筆折現；殖利率用同一個 y','拔靴：已知的前幾期先折現，用價格扣掉，解最後一期','遠期利率公式 → FRA 要換成相同複利再代入']))}`;

  const ba = `<h3>BA II Plus 先設定一次（各公式的按法在「照單元抄」公式旁邊）</h3>
${blk('先設定一次', ul([
  `小數 4 位：${K('2nd FORMAT')} 4 ${K('ENTER')} ${K('2nd QUIT')}`,
  `你的計算機已設成先乘除後加減（AOS）：分子分母有加減時，一定要用 ${K('(')} ${K(')')} 包起來（例：遠期利率、N* 的分母）`,
  `TVM 前：${K('2nd P/Y')} 1 ${K('ENTER')} ${K('2nd QUIT')}，再 ${K('2nd CLR_TVM')}`,
  `記憶：${K('STO')} 1 存、${K('RCL')} 1 叫出；${K('STO')} ${K('+')} 1 把畫面上的數加進記憶 1（累加很多項時好用）`,
  `e<sup>x</sup> 是 ${K('2nd LN')}；負數用 ${K('+/−')}，不是減號`]))}`;

  DATA.deriv.cheat = `<div class="cheat"><p class="sm-p">A4 正反面手抄：建議<b>正面</b>抄必抄區＋Ch1–3，<b>背面</b>抄 Ch4、5、7 和題型做法。只放公式、觀念、做法，不放課本習題和答案。</p>${must}${units}${methods}${ba}</div>`;

  // ---- 公式教室：Ch4、Ch7 ----
  DATA.deriv.formulas.push(
    { id:'F18', t:'複利頻率換算 R<sub>c</sub> ↔ R<sub>m</sub>', en:'Converting compounding frequencies',
      q:'同一個投資，用不同複利方式報價，數字要怎麼換？',
      tex:'<v s="rc">R<sub>c</sub></v> = <v s="m">m</v> · ln(1 + <v s="rm">R<sub>m</sub></v>/<v s="m">m</v>)　　<v s="rm">R<sub>m</sub></v> = <v s="m">m</v> · (e<sup><v s="rc">R<sub>c</sub></v>/<v s="m">m</v></sup> − 1)',
      syms:{ rc:['連續複利利率','continuously compounded rate','每一瞬間都在複利的報價'], rm:['m 次複利利率','rate with m compounding periods','一年複利 m 次的報價'], m:['每年複利次數','compounding frequency','半年 2、季 4、月 12'] },
      why:'兩種報法只要讓一年後的終值相同：(1 + R<sub>m</sub>/m)<sup>m</sup> = e<sup>R<sub>c</sub></sup>。兩邊取 ln 就得到第一式，反過來解就是第二式。',
      steps:['確認原本是哪一種複利、m 是多少','連續 → m 次：除以 m、取 e<sup>x</sup>、減 1、乘 m','m 次 → 連續：除以 m、加 1、取 ln、乘 m'],
      vars:[{k:'rm',s:'R<sub>m</sub>（%）',v:7,min:0,max:20,step:0.1},{k:'m',s:'m',v:4,min:1,max:12,step:1}],
      calc:v=>{const rc=v.m*Math.log(1+v.rm/100/v.m);return `R<sub>c</sub> = ${v.m} × ln(1 + ${v.rm}%/${v.m}) = <b>${fx(rc*100,4)}%</b><br>年有效 = (1 + ${v.rm}%/${v.m})<sup>${v.m}</sup> − 1 = <b>${fx((Math.pow(1+v.rm/100/v.m,v.m)-1)*100,4)}%</b>`;},
      oops:['把連續複利直接代進 m 次複利的公式（FRA、交換最常錯）','百分比忘了換成小數'],
      exam:'Rates with different compounding frequencies are equivalent when they give the same terminal value: R<sub>c</sub> = m ln(1 + R<sub>m</sub>/m).' },
    { id:'F19', t:'遠期利率', en:'Forward interest rate',
      q:'從今天的零息利率，推算未來某一段期間的利率？',
      tex:'<v s="rf">R<sub>F</sub></v> = (<v s="r2">R<sub>2</sub></v><v s="t2">T<sub>2</sub></v> − <v s="r1">R<sub>1</sub></v><v s="t1">T<sub>1</sub></v>) / (<v s="t2">T<sub>2</sub></v> − <v s="t1">T<sub>1</sub></v>)',
      syms:{ rf:['遠期利率','forward rate','T<sub>1</sub> 到 T<sub>2</sub> 這段期間的利率'], r1:['T<sub>1</sub> 零息利率','zero rate to T<sub>1</sub>','到 T<sub>1</sub> 的利率'], r2:['T<sub>2</sub> 零息利率','zero rate to T<sub>2</sub>','到 T<sub>2</sub> 的利率'], t1:['較短期限','earlier maturity','年'], t2:['較長期限','later maturity','年'] },
      why:'存到 T<sub>2</sub> 的錢，要等於先存到 T<sub>1</sub> 再用遠期利率存到 T<sub>2</sub>：e<sup>R<sub>2</sub>T<sub>2</sub></sup> = e<sup>R<sub>1</sub>T<sub>1</sub></sup> · e<sup>R<sub>F</sub>(T<sub>2</sub> − T<sub>1</sub>)</sup>，指數相等就得到公式（連續複利）。',
      steps:['找兩個期限的零息利率（連續複利）','分子：長的 R × T 減短的 R × T','除以期間長度','要用在 FRA、交換時，再換成付息頻率的複利'],
      vars:[{k:'r1',s:'R<sub>1</sub>（%）',v:3.5,min:0,max:10,step:0.1},{k:'t1',s:'T<sub>1</sub>',v:1,min:0.25,max:5,step:0.25},{k:'r2',s:'R<sub>2</sub>（%）',v:3.6,min:0,max:10,step:0.1},{k:'t2',s:'T<sub>2</sub>',v:1.25,min:0.5,max:6,step:0.25}],
      calc:v=>v.t2<=v.t1?'T<sub>2</sub> 要大於 T<sub>1</sub>':`R<sub>F</sub> = (${v.r2} × ${v.t2} − ${v.r1} × ${v.t1}) / (${v.t2} − ${v.t1}) = <b>${fx((v.r2*v.t2-v.r1*v.t1)/(v.t2-v.t1),4)}%</b>`,
      oops:['T<sub>2</sub> − T<sub>1</sub> 忘了除','零息利率曲線向上時，遠期利率會高於兩個零息利率'],
      exam:'The forward rate for the period between T<sub>1</sub> and T<sub>2</sub> is R<sub>F</sub> = (R<sub>2</sub>T<sub>2</sub> − R<sub>1</sub>T<sub>1</sub>)/(T<sub>2</sub> − T<sub>1</sub>) with continuous compounding.' },
    { id:'F20', t:'存續期間估債券價格變動', en:'Duration and bond price changes',
      q:'利率小小變動，債券價格大約會變多少？',
      tex:'Δ<v s="b">B</v> ≈ −<v s="b">B</v> · <v s="d">D</v> · Δ<v s="y">y</v>',
      syms:{ b:['債券價格','bond price','現在的價格'], d:['存續期間','duration','現金流的加權平均到期時間（年）'], y:['殖利率','yield','連續複利的殖利率；m 次複利時改用 D/(1 + y/m)'] },
      why:'債券價格是殖利率的函數，D 就是價格對 y 的敏感度（一階導數 ÷ 價格）。利率變一點點時，用直線（切線）估算變動。',
      steps:['算出 B 和 D','Δy 用小數（降 20 bps → −0.002）','代入，記得前面有負號：利率降 → 價格升'],
      vars:[{k:'b',s:'B',v:103.05,min:50,max:150,step:0.01},{k:'d',s:'D',v:4.32,min:0,max:30,step:0.01},{k:'bp',s:'Δy（bps）',v:-20,min:-200,max:200,step:5}],
      calc:v=>{const d=-v.b*v.d*v.bp/10000;return `ΔB ≈ −${v.b} × ${v.d} × (${v.bp/10000}) = <b>${fx(d,4)}</b> → 新價格約 <b>${fx(v.b+d,3)}</b>`;},
      oops:['Δy 用百分比沒換成小數','殖利率是 m 次複利卻沒用修正存續期間'],
      exam:'For a small change in yield, ΔB ≈ −B·D·Δy; bonds with longer duration are more sensitive to interest rate changes.' },
    { id:'F21', t:'交換後的淨借款成本', en:'Net cost after an interest rate swap',
      q:'借了浮動、又做交換，最後實際付多少？',
      tex:'淨成本 = (<v s="fl">浮動</v> + <v s="s">s</v>) − <v s="fl">浮動</v> + <v s="k">k</v> = <v s="k">k</v> + <v s="s">s</v>',
      syms:{ fl:['浮動利率','floating rate（如 SOFR）','會變動，但在交換裡收進來又付出去，所以抵銷'], s:['借款加碼','spread over floating','原本借款比浮動多付的部分'], k:['交換固定利率','fixed rate in the swap','在交換裡付出的固定利率'] },
      why:'原本借款付「浮動 + s」；交換裡收浮動、付固定 k。三筆加起來，浮動一付一收抵銷，剩下 k + s，變成固定利率負債。其他三種轉換（固定→浮動、投資的轉換）都用同樣的加總法。',
      steps:['寫出原本的現金流（付為負、收為正）','寫出交換的兩筆','加總，浮動會抵銷','剩下的就是新的利率'],
      vars:[{k:'s',s:'s（%）',v:0.1,min:-1,max:2,step:0.05},{k:'k',s:'k（%）',v:3.0,min:0,max:10,step:0.05}],
      calc:v=>`淨付 = ${v.k}% + ${v.s}% = <b>${fx(v.k+v.s,3)}%</b>（固定）`,
      oops:['收和付的正負號弄反','以為浮動利率不會抵銷'],
      exam:'Adding the cash flows from the original loan and the swap, the floating payments cancel, leaving a fixed borrowing cost of k + s.' },
    { id:'F22', t:'比較利益：交換的總利益', en:'Gain from a comparative-advantage swap',
      q:'兩家公司做交換，總共能省多少？每家省多少？',
      tex:'總利益 = (<v s="fb">固定<sub>B</sub></v> − <v s="fa">固定<sub>A</sub></v>) − (<v s="vb">浮動<sub>B</sub></v> − <v s="va">浮動<sub>A</sub></v>)',
      syms:{ fa:['A 的固定利率','A’s fixed rate','信用較好的公司'], fb:['B 的固定利率','B’s fixed rate','信用較差的公司'], va:['A 的浮動加碼','A’s floating spread','例：SOFR − 0.1% 填 −0.1'], vb:['B 的浮動加碼','B’s floating spread','例：SOFR + 0.6% 填 0.6'] },
      why:'B 在兩個市場都比較貴，但貴的幅度不同。B 去借相對沒那麼貴的那種、A 去借另一種，再交換，兩邊加起來就省下「兩個利差的差」。',
      steps:['算固定利差和浮動利差','總利益 = 兩個利差的差（取正值）','扣掉銀行費用','剩下照題目分配（通常平分）'],
      vars:[{k:'fa',s:'固定 A（%）',v:4.0,min:0,max:10,step:0.1},{k:'fb',s:'固定 B（%）',v:5.2,min:0,max:12,step:0.1},{k:'va',s:'浮動加碼 A',v:-0.1,min:-1,max:2,step:0.05},{k:'vb',s:'浮動加碼 B',v:0.6,min:-1,max:3,step:0.05},{k:'fee',s:'銀行（%）',v:0,min:0,max:1,step:0.01}],
      calc:v=>{const g=Math.abs((v.fb-v.fa)-(v.vb-v.va));return `固定利差 ${fx(v.fb-v.fa,3)}%、浮動利差 ${fx(v.vb-v.va,3)}% → 總利益 <b>${fx(g,3)}%</b><br>扣銀行 ${v.fee}% 後平分：每家省 <b>${fx((g-v.fee)/2,3)}%</b>`;},
      oops:['把兩個利差相加而不是相減','忘了扣銀行費用'],
      exam:'The total gain from a comparative-advantage swap equals the difference between the two firms’ fixed-rate spread and floating-rate spread, shared among the parties.' },
    { id:'F23', t:'貨幣交換的價值（債券法）', en:'Value of a currency swap in terms of bonds',
      q:'收外幣、付本國幣的貨幣交換，現在值多少？',
      tex:'<v s="v">V</v> = <v s="s">S<sub>0</sub></v> · <v s="bf">B<sub>F</sub></v> − <v s="bd">B<sub>D</sub></v>',
      syms:{ v:['交換價值','swap value','對收外幣、付本國幣的一方'], s:['即期匯率','spot exchange rate','每 1 外幣值多少本國幣'], bf:['外幣債券價值','foreign bond value','外幣現金流用外國利率折現（外幣計）'], bd:['本國債券價值','domestic bond value','本國現金流用本國利率折現'] },
      why:'收外幣現金流＝持有一張外幣債券；付本國幣現金流＝發行一張本國債券。把外幣債券換成本國幣，扣掉欠的本國債券，就是淨值。付外幣的一方剛好加負號。',
      steps:['列出兩種貨幣的現金流（含期末本金）','各自用自己國家的利率折現 → B<sub>F</sub>、B<sub>D</sub>','B<sub>F</sub> 乘上 S<sub>0</sub> 換成本國幣','相減'],
      vars:[{k:'bf',s:'B<sub>F</sub>（百萬日圓）',v:1252.01,min:0,max:3000,step:0.01},{k:'q',s:'每 1 美元幾日圓',v:110,min:50,max:200,step:1},{k:'bd',s:'B<sub>D</sub>（百萬美元）',v:10.4191,min:0,max:30,step:0.0001}],
      calc:v=>`S<sub>0</sub>B<sub>F</sub> = ${v.bf} ÷ ${v.q} = ${fx(v.bf/v.q,4)}<br>V = ${fx(v.bf/v.q,4)} − ${v.bd} = <b>${fx(v.bf/v.q-v.bd,4)}</b> 百萬美元`,
      oops:['匯率方向用反：日圓報價（每美元幾日圓）要「除以」','忘了期末本金也要折現'],
      exam:'For the party receiving foreign currency and paying domestic currency, the value of a currency swap is V = S<sub>0</sub>B<sub>F</sub> − B<sub>D</sub>.' }
  );
})();
