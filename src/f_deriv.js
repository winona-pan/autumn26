// ===== 衍金 期末：Ch10 選擇權市場的運作（Ch11–13 講義出來後再加） =====
DATA.deriv.sections.push(
  { id:'ch10', t:'Ch10 選擇權市場的運作', cards: [
    { id:'f10a', t:'選擇權是什麼？和遠期、期貨差在哪', en:'Options vs. forwards and futures',
      plain:'選擇權買方有「權利」但沒有「義務」，所以要先付一筆權利金。遠期和期貨雙方都有義務，簽約時不用付錢。',
      life:'訂餐廳付訂金：你有權利當天去吃，不想去就放棄訂金——訂金就是權利金。遠期像說好「下週一定去吃」，到時候不能反悔。',
      body:'<ul><li><b>Option 選擇權</b>：持有人有<b>權利、沒有義務</b>做某件事 → 買選擇權要<b>先付一筆錢（premium 權利金）</b>。</li><li>對照：<b>forward／futures</b> 雙方都有<b>義務</b>，簽約時價值為 0，不用付錢（期貨只要繳保證金）。</li><li><b>Call 買權</b>：在特定日期（或之前）以特定價格<b>買</b>標的的權利。<b>Put 賣權</b>：以特定價格<b>賣</b>標的的權利。</li><li><b>European 歐式</b>：只能在<b>到期日</b>履約。<b>American 美式</b>：<b>到期前任何時候</b>都能履約。（和地點無關；交易所交易的股票選擇權大多是美式。）</li><li><b>Strike price／exercise price 履約價 K</b>、<b>expiration date／maturity 到期日 T</b>。</li></ul>',
      terms:[['premium','權利金'],['strike price','履約價'],['European option','歐式選擇權'],['American option','美式選擇權']],
      ex:'The holder of an option has the right, but not the obligation, to buy (call) or sell (put) the underlying asset at the strike price, so an option requires an up-front payment.' },
    { id:'f10b', t:'買進買權 long call', en:'Long call',
      plain:'看漲。股價高於履約價才會履約，漲越多賺越多；最多虧掉權利金。',
      life:'你付 5 元訂了「下個月用 100 元買演唱會票」的權利。票價漲到 130，你用 100 買 → 收益 30、扣掉 5 元訂金淨賺 25；票價跌到 80，你就不買，只虧 5 元。',
      body:'<ul><li><b>Payoff 收益</b> = max(S<sub>T</sub> − K, 0)；<b>Profit 利潤</b> = payoff − c（權利金）。</li><li>例：K = 100、c = 5、期限 2 個月。S<sub>T</sub> = 130 → payoff 30、profit 25；S<sub>T</sub> ≤ 100 → payoff 0、profit −5。</li><li><b>S<sub>T</sub> = 102 要不要履約？</b>payoff = 2、profit = 2 − 5 = −3。<b>要履約</b>：不履約會直接虧 5，履約只虧 3。<b>要不要履約看 payoff，不是看 profit；只要 payoff &gt; 0 就履約</b>（權利金是沉沒成本）。</li><li><b>損益兩平</b>：S<sub>T</sub> = K + c = 105。</li><li>最大損失＝權利金；最大利潤＝理論上無限。</li></ul>',
      ex:'A long call has payoff max(ST − K, 0); the holder should exercise whenever the payoff is positive, even if the profit after the premium is negative.' },
    { id:'f10c', t:'賣出買權 short call', en:'Short call (writing a call)',
      plain:'賣方先收權利金，之後要配合買方。股價大漲時要用低價賣給對方，損失可能無限大。',
      life:'你收 5 元訂金答應別人「下個月可以用 100 元跟你買票」。票價漲到 200，你得用 100 賣他——虧很大。',
      body:'<ul><li>賣方（writer）的 payoff 是買方的相反：S<sub>T</sub> &gt; K → 對方履約 → payoff = −(S<sub>T</sub> − K)；S<sub>T</sub> ≤ K → 對方不履約 → payoff = 0。<br>合起來 <b>payoff = −max(S<sub>T</sub> − K, 0) = min(K − S<sub>T</sub>, 0)</b>。</li><li><b>Profit = payoff + c</b>（先收了權利金）。</li><li>例：K = 100、c = 5：<b>最大利潤 = 5</b>（權利金），<b>損失可能無限</b>。</li><li>因為風險很大，賣方常要<b>避險</b>，並且要繳保證金。</li><li>選擇權是<b>零和</b>：買方賺多少、賣方就虧多少。</li></ul>',
      ex:'The writer of a call has a payoff of −max(ST − K, 0); the maximum profit is the premium received, while the potential loss is unlimited.' },
    { id:'f10d', t:'買進賣權 long put', en:'Long put',
      plain:'看跌。股價低於履約價才會履約，跌越多賺越多；最多虧權利金，最多賺到 K − p（股價跌到 0）。',
      life:'你手上的二手機車付 7 元買了「可以用 70 元賣掉」的保障。市價跌到 40，你照 70 賣 → 收益 30、淨賺 23。',
      body:'<ul><li><b>Payoff</b> = max(K − S<sub>T</sub>, 0)；<b>Profit</b> = payoff − p。</li><li>例：K = 70、p = 7。S<sub>T</sub> = 40 → payoff 30、profit 23；S<sub>T</sub> ≥ 70 → profit −7。</li><li><b>S<sub>T</sub> = 69 要不要履約？</b>payoff = 1、profit = −6 → <b>要履約</b>（不履約虧 7）。</li><li><b>損益兩平</b>：S<sub>T</sub> = K − p = 63。</li><li>最大損失＝p；最大利潤＝K − p（股價跌到 0 時）。</li></ul>',
      ex:'A long put has payoff max(K − ST, 0) and profits when the stock price falls below K − p.' },
    { id:'f10e', t:'賣出賣權 short put', en:'Short put (writing a put)',
      plain:'先收權利金，股價跌破履約價時要用高價買進。最大利潤是權利金，最大損失是 K − p。',
      life:'你收 7 元答應「別人可以用 70 元把機車賣給你」。市價跌到 20，你還是得花 70 買——虧 50，扣掉 7 元收入淨虧 43。',
      body:'<ul><li>S<sub>T</sub> &lt; K → 對方履約 → payoff = −(K − S<sub>T</sub>)；S<sub>T</sub> ≥ K → payoff = 0。<br>合起來 <b>payoff = −max(K − S<sub>T</sub>, 0) = min(S<sub>T</sub> − K, 0)</b>。</li><li><b>Profit = payoff + p</b>。</li><li>例：K = 70、p = 7：<b>最大利潤 = 7</b>；最大損失 = K − p = 63（股價跌到 0）。</li></ul><table class="tbl"><tr><th>部位</th><th>Payoff</th><th>看法</th><th>最大利潤</th><th>最大損失</th></tr><tr><td>Long call</td><td>max(S<sub>T</sub> − K, 0)</td><td>看漲</td><td>無限</td><td>c</td></tr><tr><td>Short call</td><td>−max(S<sub>T</sub> − K, 0)</td><td>看不漲</td><td>c</td><td>無限</td></tr><tr><td>Long put</td><td>max(K − S<sub>T</sub>, 0)</td><td>看跌</td><td>K − p</td><td>p</td></tr><tr><td>Short put</td><td>−max(K − S<sub>T</sub>, 0)</td><td>看不跌</td><td>p</td><td>K − p</td></tr></table>',
      ex:'The writer of a put has payoff −max(K − ST, 0); the maximum profit is the premium and the maximum loss is K − p.' },
    { id:'f10f', t:'交易所選擇權的標的與合約規模', en:'Underlying assets of exchange-traded options',
      plain:'選擇權可以掛在股票、ETF、外幣、股價指數、期貨上。每種的合約規模不同：美國股票 100 股，台灣股票選擇權 2,000 股。',
      life:'台指選擇權每一點 50 元，指數 20,000 點時一口代表 100 萬元的指數。',
      body:'<table class="tbl"><tr><th>標的</th><th>美國（課本）</th><th>台灣期交所</th></tr><tr><td>股票／ETF</td><td><b>100 股</b></td><td>股票選擇權 <b>2,000 股</b>；ETF <b>10,000 受益單位</b></td></tr><tr><td>外幣</td><td><b>10,000 單位</b>外幣</td><td>—</td></tr><tr><td>股價指數</td><td><b>$100 × 指數</b>；多為歐式、<b>現金結算</b></td><td>臺指選擇權 TXO：<b>NT$50 × 指數</b></td></tr><tr><td>期貨</td><td>配合期貨合約；期貨選擇權通常在期貨到期前不久到期</td><td>—</td></tr></table>',
      ex:'An exchange-traded stock option contract is normally for 100 shares, whereas an index option is typically $100 times the index and is cash-settled.' },
    { id:'f10g', t:'合約規格與到期循環', en:'Specifications and expiration cycles',
      plain:'一個選擇權由四件事決定：到期日、履約價、歐式或美式、買權或賣權。股票選擇權的到期月照循環排：當月、下個月，再加循環中的下兩個月。',
      life:'就像公車班表：二月循環的車只在 2、5、8、11 月發車，但一定還有「這個月」和「下個月」兩班。',
      body:'<ul><li>規格：<b>expiration date</b>、<b>strike price</b>、<b>European or American</b>、<b>call or put（option class）</b>。</li><li><b>Option class</b>：同一標的、同一種類（全部 call 或全部 put）；<b>option series</b>：同一 class 中，到期日和履約價都相同的選擇權。</li><li>到期循環：<b>January cycle 1、4、7、10 月</b>；<b>February cycle 2、5、8、11 月</b>；<b>March cycle 3、6、9、12 月</b>。</li><li>股票選擇權在任一時間可交易的到期月：<b>current month 當月、following month 下個月，以及循環中接下來的兩個月</b>。</li><li>例（二月循環）：<b>二月初 2、3、5、8</b>；二月到期後的<b>二月底 3、4、5、8</b>；<b>十一月初 11、12、2、5</b>；<b>十一月底 12、1、2、5</b>。</li><li>到期日通常是到期月的<b>第三個星期五</b>。</li></ul>',
      terms:[['option class','選擇權類別'],['option series','選擇權序列'],['expiration cycle','到期循環']],
      ex:'Stock options trade with the current month, the following month, and the next two months in the expiration cycle.' },
    { id:'f10h', t:'價內、價平、價外；內含價值與時間價值', en:'Moneyness, intrinsic value and time value',
      plain:'如果「現在」就履約會不會有錢拿？有＝價內、剛好＝價平、沒有＝價外。權利金＝內含價值（現在履約值多少）＋時間價值（還有機會變更好）。',
      life:'演唱會票權利：約定 100 元、現在市價 120 → 現在用就賺 20（價內，內含價值 20）。權利金若是 26，多出的 6 元就是「還沒到期、可能更值錢」的時間價值。',
      body:'<table class="tbl"><tr><th></th><th>Call</th><th>Put</th></tr><tr><td><b>In the money 價內</b></td><td>S &gt; K</td><td>S &lt; K</td></tr><tr><td><b>At the money 價平</b></td><td>S = K</td><td>S = K</td></tr><tr><td><b>Out of the money 價外</b></td><td>S &lt; K</td><td>S &gt; K</td></tr></table><ul><li><b>Intrinsic value 內含價值</b>：call = max(S − K, 0)；put = max(K − S, 0)。</li><li><b>Time value 時間價值</b> = 選擇權價格 − 內含價值。到期日時間價值為 0。</li><li>價內選擇權到期時會被履約（若交易成本不大）。</li><li>履約價間距：交易所設定，通常股價越高間距越大（例如 $2.50、$5、$10）；股價移動超出範圍時會新增履約價。</li></ul>',
      terms:[['in the money','價內'],['at the money','價平'],['out of the money','價外'],['intrinsic value','內含價值'],['time value','時間價值']],
      ex:'The intrinsic value of a call is max(S − K, 0); the option price equals intrinsic value plus time value.' },
    { id:'f10i', t:'股利、股票分割與部位限制', en:'Dividends, stock splits and position limits',
      plain:'交易所的選擇權遇到現金股利不調整；遇到股票分割或股票股利，履約價和股數要調整，讓選擇權價值不變。',
      life:'一張 100 元的鈔票換成兩張 50 元，你的錢沒變；股票 2 拆 1，股價減半，選擇權的履約價也要減半、股數加倍。',
      body:'<ul><li><b>Cash dividends</b>：交易所交易的選擇權通常<b>不調整</b>（所以股利會影響選擇權價格，Ch11）。</li><li><b>Stock split n-for-m</b>：履約價變成原來的 <b>m/n</b>，每口股數變成原來的 <b>n/m</b>。例：2-for-1 分割，K = 60 → 30，100 股 → 200 股。</li><li><b>Stock dividend 股票股利</b>：當成分割處理。例：20% 股票股利＝<b>6-for-5</b> 分割 → K 乘 5/6、股數乘 6/5。</li><li><b>Position limits 部位限制</b>：一個投資人在<b>同一方向</b>最多能持有幾口；<b>long call 和 short put 算同一方向</b>（都看漲），short call 和 long put 算同一方向。<b>Exercise limits</b> 通常等於部位限制。</li></ul>',
      terms:[['stock split','股票分割'],['stock dividend','股票股利'],['position limit','部位限制']],
      ex:'For an n-for-m stock split, the strike price is reduced to m/n of its previous value and the number of shares covered is increased to n/m.' },
    { id:'f10j', t:'交易、保證金與結算', en:'Trading, margin and the OCC',
      plain:'買選擇權要付全額（不能融資）；賣選擇權因為有義務，要繳保證金。結算機構保證履約。',
      life:'買演唱會票的權利要先付清訂金；答應別人用固定價格賣票的人，主辦單位會先扣你一筆押金，以免你跑掉。',
      body:'<ul><li><b>Market maker 造市者</b>：同時報 bid 和 ask，提供流動性；<b>bid-ask spread</b> 是他的收入來源。</li><li><b>Offsetting order 反向平倉</b>：買方可以賣出同一個選擇權平倉，賣方可以買回。</li><li><b>Margin</b>：買選擇權（到期 9 個月以內）要<b>全額付清</b>；<b>寫選擇權（尤其 naked option 裸賣）要繳保證金</b>，因為賣方有潛在大損失。</li><li><b>Options Clearing Corporation (OCC)</b>：類似期貨的結算所，<b>保證選擇權賣方會履行義務</b>，並記錄所有多空部位。</li><li>履約：買方通知經紀商 → OCC → 隨機指派給某個賣方。</li><li>其他相關：<b>warrants 認股權證</b>、<b>employee stock options 員工認股權</b>、<b>convertibles 可轉債</b>是由<b>公司發行</b>，履約時公司發行新股 → 會<b>稀釋股權</b>；交易所選擇權履約則是在既有股票間移轉，不影響流通股數。</li></ul>',
      terms:[['market maker','造市者'],['naked option','裸賣選擇權'],['OCC','選擇權結算公司'],['warrant','認股權證'],['dilution','稀釋']],
      ex:'Options with maturities under nine months must be paid for in full, while writers of options must maintain margin accounts; the Options Clearing Corporation guarantees that writers will fulfill their obligations.' }
  ]}
);

DATA.deriv.formulas.push(
  { id:'F24', t:'選擇權的收益與利潤', en:'Option payoff and profit',
    q:'到期時股價是 S<sub>T</sub>，四種部位各賺多少？',
    tex:'Long call：max(<v s="st">S<sub>T</sub></v> − <v s="k">K</v>, 0) − <v s="c">c</v>　Long put：max(<v s="k">K</v> − <v s="st">S<sub>T</sub></v>, 0) − <v s="c">p</v>',
    syms:{ st:['到期股價','stock price at maturity','到期那天標的的價格'], k:['履約價','strike price','約定的買賣價格'], c:['權利金','option premium','買方一開始付給賣方的錢'] },
    why:'買權：股價高於 K 才會用 K 買，賺 S<sub>T</sub> − K；否則放棄，收益 0。賣權相反。利潤再扣掉一開始付的權利金。賣方的收益剛好是買方的負數，利潤是負收益加上收到的權利金。',
    steps:['判斷會不會履約（看 payoff 是否大於 0）','算 payoff','long 扣權利金、short 加權利金','損益兩平：call K + c、put K − p'],
    vars:[{k:'st',s:'S<sub>T</sub>',v:102,min:0,max:200,step:1},{k:'k',s:'K',v:100,min:1,max:200,step:1},{k:'c',s:'call 權利金',v:5,min:0,max:50,step:0.5},{k:'p',s:'put 權利金',v:7,min:0,max:50,step:0.5}],
    calc:v=>{const pc=Math.max(v.st-v.k,0),pp=Math.max(v.k-v.st,0);return `Long call：payoff ${pc}、profit <b>${fx(pc-v.c,2)}</b>（${pc>0?'履約':'不履約'}）<br>Short call：profit <b>${fx(-pc+v.c,2)}</b><br>Long put：payoff ${pp}、profit <b>${fx(pp-v.p,2)}</b>（${pp>0?'履約':'不履約'}）<br>Short put：profit <b>${fx(-pp+v.p,2)}</b>`;},
    oops:['用 profit 判斷要不要履約（應該看 payoff）','賣方的利潤忘了加權利金'], exam:'At maturity, a long call pays max(ST − K, 0) and a long put pays max(K − ST, 0); profit equals payoff minus the premium paid.', cfa:'CFA Derivatives：option payoffs' },
  { id:'F25', t:'內含價值與時間價值', en:'Intrinsic value and time value',
    q:'選擇權現在值 c，其中多少是「現在履約就拿得到」的？',
    tex:'<v s="iv">內含價值</v> = max(<v s="s">S</v> − <v s="k">K</v>, 0)　<v s="tv">時間價值</v> = <v s="c">c</v> − <v s="iv">內含價值</v>',
    syms:{ iv:['內含價值','intrinsic value','現在立刻履約能拿到的錢（put 是 K − S）'], s:['目前股價','current stock price','今天的價格'], k:['履約價','strike price','約定價格'], tv:['時間價值','time value','還沒到期、之後可能更好的價值'], c:['選擇權價格','option price','市場上的權利金'] },
    why:'權利金裡一部分是「現在就值的」，剩下的是「還有時間、股價可能往有利方向走」的價值。越接近到期，時間價值越小，到期時為 0。',
    steps:['判斷價內、價平、價外','算內含價值','權利金 − 內含價值 = 時間價值'],
    vars:[{k:'s',s:'S',v:120,min:0,max:300,step:1},{k:'k',s:'K',v:100,min:1,max:300,step:1},{k:'c',s:'call 價格',v:26,min:0,max:100,step:0.5}],
    calc:v=>{const iv=Math.max(v.s-v.k,0);return `${v.s>v.k?'價內':v.s===v.k?'價平':'價外'}；內含價值 = <b>${iv}</b>，時間價值 = ${v.c} − ${iv} = <b>${fx(v.c-iv,2)}</b>`;},
    oops:['put 的內含價值寫成 S − K','價外選擇權的內含價值寫成負數'], exam:'The intrinsic value of a call is max(S − K, 0), and its time value is the option price minus the intrinsic value.', cfa:'CFA Derivatives：moneyness' }
);

DATA.deriv.mcq.push(
  {u:'ch10', q:'Why does buying an option require an up-front payment while entering a forward contract does not?', o:['Options are traded only on exchanges','The option holder has a right but no obligation','Forward contracts are always cash-settled','Options have no expiration date'], a:1, e:'選擇權買方有權利、沒有義務，所以要付權利金；遠期雙方都有義務，簽約時價值 0。'},
  {u:'ch10', q:'An American option differs from a European option in that it:', o:['Is traded only in the United States','Can be exercised at any time up to the expiration date','Can be exercised only at expiration','Has no strike price'], a:1, e:'美式：到期前任何時候都能履約；歐式只能到期日履約。和地點無關。'},
  {u:'ch10', q:'A call with K = $100 costs $5. At expiration S_T = $102. What should the holder do, and what is the profit?', o:['Not exercise; profit −$5','Exercise; profit +$2','Exercise; profit −$3','Not exercise; profit $0'], a:2, e:'Payoff = 2 > 0 → 履約；profit = 2 − 5 = −3。不履約會虧 5。看 payoff 決定是否履約。'},
  {u:'ch10', q:'A put with K = $70 costs $7. At expiration S_T = $69. The holder should:', o:['Exercise, because the payoff is positive even though the profit is −$6','Not exercise, because the profit is negative','Not exercise, because the put is out of the money','Exercise only if the profit is positive'], a:0, e:'Payoff = 1 > 0 → 履約，profit = 1 − 7 = −6；不履約虧 7。'},
  {u:'ch10', q:'What is the breakeven stock price at expiration for a long call with K = $100 and premium $5?', o:['$95','$100','$105','$110'], a:2, e:'Call 損益兩平 = K + c = 105。'},
  {u:'ch10', q:'What is the breakeven stock price at expiration for a long put with K = $70 and premium $7?', o:['$63','$70','$77','$7'], a:0, e:'Put 損益兩平 = K − p = 63。'},
  {u:'ch10', q:'Which position has a limited maximum profit equal to the premium and a potentially unlimited loss?', o:['Long call','Long put','Short put','Short call'], a:3, e:'Short call：最多賺權利金，股價無限上漲時損失無限。Short put 最大損失是 K − p（有限）。'},
  {u:'ch10', q:'The payoff to the writer of a put option at expiration is:', o:['max(ST − K, 0)','−max(K − ST, 0)','max(K − ST, 0)','−max(ST − K, 0)'], a:1, e:'賣方 payoff 是買方的負數：short put = −max(K − ST, 0) = min(ST − K, 0)。'},
  {u:'ch10', q:'What is the maximum loss for the writer of a put with K = $70 who received a $7 premium?', o:['$7','$70','Unlimited','$63'], a:3, e:'股價跌到 0 時，賣方要用 70 買進價值 0 的股票，虧 70，扣掉收到的 7 → 最大損失 63。'},
  {u:'ch10', q:'An investor who expects the stock price to fall would most likely:', o:['Buy a call','Buy a put','Write a put','Buy the stock'], a:1, e:'看跌 → 買賣權（或賣買權）。寫賣權是看不跌。'},
  {u:'ch10', q:'In the U.S., one exchange-traded stock option contract normally gives the right to buy or sell:', o:['100 shares','1,000 shares','2,000 shares','10,000 shares'], a:0, e:'美國股票選擇權每口 100 股；台灣股票選擇權每口 2,000 股。'},
  {u:'ch10', q:'Which statement about stock index options is most accurate?', o:['They are settled by delivering the stocks in the index','They are usually European and cash-settled, with contract size such as $100 times the index','They cannot be traded on exchanges','They always have the same size as stock options'], a:1, e:'指數選擇權多為歐式、現金結算；美國 $100 × 指數，台指選擇權 NT$50 × 指數。'},
  {u:'ch10', q:'A stock is on the February cycle. At the beginning of February, which expiration months are traded?', o:['February, May, August, November','February, March, April, May','February, March, May, August','March, April, May, August'], a:2, e:'當月（2）、下個月（3）＋循環中接下來兩個月（5、8）。'},
  {u:'ch10', q:'A stock is on the February cycle. After the November expiration (end of November), which expiration months are traded?', o:['December, January, February, May','November, December, February, May','December, February, May, August','January, February, May, August'], a:0, e:'當月變成 12、下個月 1，循環中接下來兩個月 2、5。'},
  {u:'ch10', q:'All call options on a given stock with the same strike price and expiration date form an option:', o:['Class','Cycle','Series','Position limit'], a:2, e:'Option class：同一標的、同一種類；option series：class 中履約價和到期日都相同的。'},
  {u:'ch10', q:'A put option with K = $50 when the stock price is $45 is:', o:['Out of the money','At the money','In the money','Worthless'], a:2, e:'Put：S < K 為價內。內含價值 = 50 − 45 = 5。'},
  {u:'ch10', q:'A call has K = $40, the stock price is $46, and the call price is $8. What is its time value?', o:['$0','$2','$6','$8'], a:1, e:'內含價值 = 46 − 40 = 6；時間價值 = 8 − 6 = 2。'},
  {u:'ch10', q:'A stock undergoes a 2-for-1 split. An option on 100 shares with strike $60 becomes an option on:', o:['200 shares with strike $30','100 shares with strike $30','200 shares with strike $60','50 shares with strike $120'], a:0, e:'n-for-m 分割：K 變為 m/n 倍（60 × 1/2 = 30），股數變為 n/m 倍（100 × 2 = 200）。'},
  {u:'ch10', q:'How are exchange-traded options typically adjusted for a cash dividend?', o:['Strike price is reduced by the dividend','Number of shares is increased','No adjustment is made','The option is cancelled'], a:2, e:'交易所選擇權遇現金股利通常不調整；股票分割和股票股利才調整。'},
  {u:'ch10', q:'For position-limit purposes, which two positions are counted on the same side of the market?', o:['Long calls and long puts','Long calls and short puts','Short calls and short puts','Long puts and short puts'], a:1, e:'Long call 和 short put 都看漲，算同一方向；short call 和 long put 算另一方向。'},
  {u:'ch10', q:'Which statement about margin for exchange-traded options is correct?', o:['Option buyers can always borrow 50% of the premium','Option writers do not need margin because they receive the premium','Options with maturities under nine months must be paid for in full, and writers must post margin','Only buyers of puts post margin'], a:2, e:'買方（9 個月內到期）要全額付清；寫選擇權有潛在損失，要繳保證金。'},
  {u:'ch10', q:'Why do warrants and employee stock options differ from exchange-traded options when exercised?', o:['They are always European','The company issues new shares, which can dilute existing shareholders','They are settled in cash only','They have no strike price'], a:1, e:'公司發行的認股權證、員工認股權、可轉債履約時公司發行新股 → 稀釋；交易所選擇權只是既有股票易手。'}
);

DATA.deriv.match = [
  ['call','買的權利'], ['put','賣的權利'], ['European option','只能到期日履約'], ['American option','到期前任何時候可履約'],
  ['premium','買方先付的權利金'], ['writer','賣出選擇權的一方'], ['long call payoff','max(S_T − K, 0)'], ['long put payoff','max(K − S_T, 0)'],
  ['call breakeven','K + c'], ['put breakeven','K − p'], ['in the money call','S > K'], ['in the money put','S < K'],
  ['intrinsic value','現在履約可得的價值'], ['time value','權利金 − 內含價值'], ['option series','同 class、同 K、同到期日'], ['February cycle','2、5、8、11 月'],
  ['2-for-1 split','K 減半、股數加倍'], ['OCC','保證賣方履約'], ['warrant','公司發行、履約會稀釋'], ['TXO','NT$50 × 臺指']
].map(p => (p.u = 'ch10', p));

DATA.deriv.sort = [
  { t:'這個部位看漲還是看跌？', b:['看漲（或看不跌）','看跌（或看不漲）'], u:'ch10',
    items:[['Long call',0], ['Short put',0], ['Long put',1], ['Short call',1], ['買進股票',0], ['放空股票',1]] },
  { t:'價內、價平還是價外？', b:['價內','價平','價外'], u:'ch10',
    items:[['Call，S = 55、K = 50',0], ['Put，S = 45、K = 50',0], ['Call，S = 50、K = 50',1], ['Put，S = 50、K = 50',1], ['Call，S = 45、K = 50',2], ['Put，S = 55、K = 50',2]] }
];

// 期末大抄（目前只有 Ch10；之後的章節講義出來再補）
DATA.deriv.cheat = `<div class="cheat"><p class="sm-p">A4 正反面手抄：只放公式、觀念、做法，<b>不可抄考古題和習題</b>。目前只有 Ch10，Ch11–13 講義出來後會補上。</p>
<div class="cmust"><h3>Ch10 選擇權市場</h3>
<div class="cblk"><h4>四種部位</h4><ul><li>Long call：max(S<sub>T</sub> − K, 0) − c；兩平 K + c；最大損失 c</li><li>Short call：−max(S<sub>T</sub> − K, 0) + c；最大利潤 c、損失無限</li><li>Long put：max(K − S<sub>T</sub>, 0) − p；兩平 K − p；最大利潤 K − p</li><li>Short put：−max(K − S<sub>T</sub>, 0) + p；最大損失 K − p</li><li><b>要不要履約看 payoff，不是 profit</b></li></ul></div>
<div class="cblk"><h4>價內價外與價值</h4><ul><li>Call 價內 S &gt; K；put 價內 S &lt; K</li><li>內含價值：call max(S − K, 0)、put max(K − S, 0)；時間價值 = 價格 − 內含價值</li></ul></div>
<div class="cblk"><h4>合約規格</h4><ul><li>美國股票 100 股；台灣股票選擇權 2,000 股、ETF 10,000 單位；外幣 10,000 單位；指數 $100 × 指數（TXO NT$50 × 指數）</li><li>循環：Jan 1/4/7/10、Feb 2/5/8/11、Mar 3/6/9/12；可交易＝當月＋下個月＋循環中下兩個月</li><li>n-for-m 分割：K × m/n、股數 × n/m；股票股利同分割；現金股利不調整</li><li>部位限制：long call 和 short put 同方向</li><li>買方 9 個月內全額付清；賣方繳保證金；OCC 保證履約</li></ul></div>
</div></div>`;

TERM.balance(DATA.deriv.mcq.filter(q => q.u === 'ch10'));
