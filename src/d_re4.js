// ===== 單元 1 補充（四）：違約、workout、破產、法拍與法拍之後（junior、贖回、不足額判決） =====
DATA.re.sections[0].cards.push(
  // ---------- 違約 ----------
  { id:'re1u', t:'Default 違約：定義、Monetary vs Technical default、UPB、違約的進程', en:'Mortgage default, technical default, UPB and delinquency',
    plain:'違約（default）是借款人沒有履行 note 或 mortgage 上的任何義務。最常見的是沒付錢（monetary default）；沒繳稅、沒保險、沒維護房子、未經同意賣房，則是 technical default。違約的嚴重程度用逾期天數追蹤（30、60、90 天以上），而損失大小從 UPB（未償本金餘額）開始算。',
    life:'租機車：沒付租金是「沒付錢的違約」；租金照付，但沒保險、把車借給別人騎、改裝排氣管，則是「技術性違約」。車行先看你欠幾期，再決定是提醒、催收還是收車。',
    body: '<p class="ez lead">這張卡回答三個問題：①什麼叫<b>違約</b>（不是只有沒繳錢）？②銀行算損失都從哪個數字開始（<b>UPB</b>）？③從晚繳到被法拍，中間會<b>經過哪些階段</b>？最後看人<b>為什麼</b>會違約。</p><h4>違約的定義與種類</h4>'
      + reD('Default', '違約', '沒有履行 note 或 mortgage 上的任何約定', [
          ['法律意義', '借款人違反契約上的<b>任何</b>義務（covenant），貸方就取得契約上的救濟權利：加速到期、法拍、指定管理人等。<span class="ez">違約的範圍很大：只要沒做到契約上任何一個承諾都算，不只是沒繳錢。</span>'],
          ['Delinquency vs default', '<b>Delinquency</b>（逾期）：付款晚了，是事實狀態；<b>default</b>（違約）：依契約定義已構成違約（例如逾期超過寬限期、通知後未補救），是法律狀態。考試常混用，但要知道差別。<span class="ez">Delinquency 是「事實」：你晚繳了。Default 是「法律上的結論」：照契約的定義，你已經算違約了（例如晚繳超過寬限期、通知後還不補）。晚繳一天是 delinquency，但通常還不算 default。</span>'],
          ['Event of default', '契約列出的違約事件：未付款、違反 covenant、陳述不實（loan application 造假）、破產、未經同意移轉、交叉違約（cross-default：其他貸款違約也算這筆違約）。<span class="ez">契約會列一張「違約事件清單」。交叉違約的意思是：你在別的貸款違約，這筆也算違約。</span>'],
          ['貸方不一定要行動', '違約只是讓貸方<b>有權</b>行動；加速和法拍都是 optional（見第 4 組）。<span class="ez">違約只是給銀行「可以出手」的權利，銀行可以選擇先談。</span>'] ])
      + reD('Monetary (payment) default', '付款違約', '沒按時付本息，最常見', [
          ['什麼算', '未付或少付每月本息、escrow；氣球式貸款（balloon）到期沒能清償。<span class="ez">最常見的違約：錢沒付或付不夠。</span>'],
          ['Term vs maturity default', '<b>Term default</b>：貸款期間沒付月付款；<b>maturity default</b>：到期時無法償還或再融資（balloon risk），商用貸款很常見，例如利率上升或房價下跌時借不到新錢。<span class="ez">Term default＝中途沒繳月付款；maturity default＝到期要一次還一大筆，結果還不出來、也借不到新的錢來還。商用貸款常常是後者。</span>'] ])
      + reD('Technical default', '技術性違約', '錢照付，但違反其他約定', [
          ['常見情況', '沒繳房地產稅（tax lien 會排到房貸前面）、保險失效、毀損房子（waste）、未經同意出售或設定其他 lien（due-on-sale）、謊稱自住、不提供財務報表。<span class="ez">錢都有按時付，但沒做到其他承諾（沒繳稅、沒保險、把房子弄壞、偷偷賣掉）。</span>'],
          ['商用貸款', '財務 covenant 未達標：<b>DSCR</b>（償債保障比率）低於約定值、LTV 超過上限、租約未經同意變更、主要承租人退租 → 常觸發 <b>cash management／cash sweep</b>（租金先進貸方控制的帳戶）而不是直接法拍。<span class="ez">商用貸款會要求「租金收入要夠付貸款的幾倍」（DSCR）。不達標時，銀行通常先接管租金（cash sweep），而不是馬上法拍。DSCR＝每年淨收入 ÷ 每年要還的本息，例如 1.25 代表收入是還款的 1.25 倍。</span>'],
          ['貸方怎麼處理', '技術性違約很少直接法拍，除非<b>擔保品受到威脅</b>；通常先通知補正，或由貸方代墊稅、保險（protection of lender’s security），再加到債務上。<span class="ez">技術性違約很少直接走到法拍，通常先通知改正，或銀行先代繳稅和保險，再把錢加到貸款上。</span>'] ])
      + '<h4>UPB：所有計算的起點</h4>'
      + reD('UPB (unpaid principal balance)', '未償本金餘額', '還沒還的本金', [
          ['怎麼算', 'UPB = 原始本金 − 已還本金（按期攤還＋提前還款）＋ 資本化的金額（modification 把欠款併入本金、負攤還）。<b>不含</b>應計利息和費用。<span class="ez">UPB 就是「還欠多少本金」。注意不包括已經欠著沒付的利息和罰金。</span>'],
          ['Payoff amount', '要結清貸款要付的金額 = UPB ＋ 應計未付利息 ＋ 貸方代墊的稅與保險 ＋ late charge、律師費等。違約後 payoff 會比 UPB 大很多。<span class="ez">Payoff＝如果今天要一次結清，總共要付多少。違約後欠的利息、律師費、銀行代墊的稅都加上去，所以比 UPB 大。</span>'],
          ['用在哪裡', '<b>現時 LTV</b>（mark-to-market LTV）= UPB ÷ 目前房價；MBS 的 <b>pool factor</b> = 目前 UPB ÷ 原始 UPB；servicing fee 以 UPB 的百分比計；信用損失的 <b>EAD</b>（違約時曝險）。<span class="ez">很多指標都用 UPB：現在還欠的 ÷ 房子現在的價值＝現時 LTV；MBS 剩下的本金比例＝pool factor。</span>'],
          ['損失嚴重度（loss severity）', '例：UPB 600 萬、違約到拍賣期間的應計利息 30 萬、法拍律師費 20 萬、代墊稅與保險 15 萬、承受後持有與出售成本 40 萬，最後賣得 450 萬 → 損失 = 600 + 30 + 20 + 15 + 40 − 450 = <b>255 萬</b>，loss severity = 255 ÷ 600 = <b>42.5%</b>。<span class="ez">怎麼算銀行虧多少：把銀行所有要收回的（本金、利息、律師費、代墊稅、賣房成本）加起來，減掉最後賣房拿到的錢，就是損失。損失 ÷ 本金＝損失率。重點：銀行的損失通常比「房價跌了多少」還大，因為違約過程中還有很多成本。</span>'],
          ['預期損失', 'Expected loss = <b>PD</b>（違約機率）× <b>LGD</b>（違約損失率，即 loss severity）× <b>EAD</b>（約等於 UPB）。<span class="ez">預期損失＝會違約的機率 × 違約後會損失幾成 × 違約時欠多少。例：違約機率 2%、損失率 40%、欠 600 萬 → 預期損失 = 0.02 × 0.4 × 600 萬 = 4.8 萬。</span>'],
          ['CFA 連結', 'Fixed Income：credit risk（PD、LGD、EL）、MBS 的 pool factor 和 loss severity。<span class="ez">CFA 固定收益會考 PD、LGD、EL 這三個縮寫。</span>'] ])
      + '<h4>違約情況：逾期的進程</h4><div class="tblwrap"><table class="tbl"><tr><th>逾期</th><th>名稱</th><th>通常發生什麼</th></tr>'
      + '<tr><td>1–15 天</td><td>Grace period</td><td>不罰；過了寬限期收 late charge</td></tr>'
      + '<tr><td>30 天</td><td>30-day delinquent</td><td>電話、信件催繳；通報信用機構</td></tr>'
      + '<tr><td>60 天</td><td>60-day delinquent</td><td>servicer 要主動聯繫、說明 loss mitigation 選項</td></tr>'
      + '<tr><td>90 天以上</td><td><b>Seriously delinquent</b>（90+）</td><td>寄 notice of default／加速通知；銀行停止認列利息（nonaccrual）</td></tr>'
      + '<tr><td>120 天以上</td><td>Foreclosure 可啟動</td><td>美國聯邦法規原則上逾期 120 天後才能開始法拍程序</td></tr>'
      + '<tr><td>之後</td><td>In foreclosure → REO</td><td>拍賣；沒人買就由貸方承受</td></tr></table></div><span class="ez">讀法：越往下越嚴重。90 天是一個重要門檻（seriously delinquent），銀行會開始寄正式違約通知；美國規定 120 天後才能開始法拍。REO＝拍賣沒人買，房子由銀行接手。</span>'
      + reD('Delinquency migration (roll rates)', '逾期的移轉', '每個月有多少比例往下一階段惡化', [
          ['Roll rate', '本月 30 天逾期的貸款中，下個月變成 60 天逾期的比例；同理 60→90、90→foreclosure。也有往回走的 <b>cure rate</b>（補繳回到正常）。<span class="ez">Roll rate＝這個月晚 30 天的人，下個月有多少比例變成晚 60 天（越來越糟）；cure rate＝有多少人補繳回到正常。</span>'],
          ['用途', '用移轉矩陣（transition matrix）預測未來的違約和損失，決定備抵呆帳和 MBS 的信用損失假設。<span class="ez">把每一階段往下走的比例串起來，就能預測未來有多少貸款會走到法拍。</span>'],
          ['觀察', '逾期越久，cure rate 越低；90 天以上的貸款大多不會自己回到正常 → 所以 servicer 越早介入越有效。<span class="ez">晚越久越難救回來，所以銀行要在早期就聯絡借款人。</span>'] ])
      + reD('為什麼會違約', '違約的原因', '付不起 vs 不想付', [
          ['付不起', '<b>流動性衝擊</b>：失業、收入減少、生病、離婚、利率重設造成付款暴增（payment shock，例如 ARM、只繳息期結束）。<span class="ez">「付不起」：收入突然減少，或月付款突然變多。</span>'],
          ['不想付', '房價跌到低於貸款（<b>negative equity / underwater</b>），繼續付款不划算 → rational / strategic default（下一張卡）。<span class="ez">「不想付」：房子已經不值那麼多錢，繼續繳等於在幫一間不值錢的房子還債。</span>'],
          ['兩者同時', '<b>Double trigger</b>：負權益＋流動性衝擊同時發生時違約機率最高；只有其中一個，多數人會想辦法賣房或繼續付。<span class="ez">雙重觸發：房價跌到低於貸款，加上收入出問題，兩個一起發生時最容易違約。只有房價跌，還付得起的人通常會繼續付；只有收入出問題，房子還有價值的人可以賣房還債。</span>'],
          ['放款時的因素', '高 LTV、高 DTI、低信用分數、文件不足（low-doc）、投資用而非自住、第二順位 → 違約率較高（2008 次貸的教訓）。<span class="ez">借的時候就看得出風險：借得越多、還款壓力越大、信用越差、文件越不齊，越容易違約。</span>'] ])
      + '<h4>台灣對照</h4><ul><li><b>逾期放款</b>：本金逾期 <b>3 個月</b>以上，或利息延滯 <b>6 個月</b>以上；之後轉列<b>催收款</b>，無法收回時<b>轉銷呆帳</b>。<span class="ez">台灣的分類：逾期 3 個月以上叫逾期放款，再來是催收款，最後確定收不回來就打成呆帳。</span></li><li>延遲繳款會記錄在<b>聯徵中心</b>，影響之後借款。</li><li>台灣房貸逾放比很低（遠低於 1%），借款人違約多半先和銀行協商展延，最後才走法拍。</li></ul><span class="ez">台灣的房貸違約率很低，而且通常先協商，法拍是最後手段。</span>',
    cfa:'Fixed Income：credit risk (PD, LGD) and MBS loss severity',
    terms:[['default / event of default','違約／違約事件'],['delinquency','逾期'],['monetary default','付款違約'],['technical default','技術性違約'],['term / maturity default','期中／到期違約'],['DSCR','償債保障比率'],['cash sweep','租金收入先歸貸方控制'],['UPB','未償本金餘額'],['payoff amount','結清金額'],['loss severity / LGD','損失嚴重度'],['seriously delinquent','逾期 90 天以上'],['roll rate / cure rate','惡化率／回復率'],['double trigger','負權益＋流動性衝擊'],['逾期放款／催收款／呆帳','台灣的違約分類']] },

  { id:'re1v', t:'Rational mortgage default：把違約看成一個賣權', en:'Rational (ruthless) default and the default option',
    plain:'從選擇權的角度，借款人手上有一個「賣權」：隨時可以停止付款，把房子交給貸方來抵銷債務。如果房子的價值低於貸款的價值，而且違約的成本不高，理性的借款人就會行使這個賣權，這叫 rational（ruthless）default。但現實中大部分人就算房價低於貸款也繼續付，因為違約成本很高。',
    life:'你用 3 萬買了一張演唱會票，後來同一場票價跌到 1 萬。如果你可以「把票交出去就不用付剩下的錢」，你會想退；但如果退票會被列入黑名單、以後買不到票，你可能還是會留著。',
    body: '<p class="ez lead">經濟學家把違約看成一個<b>選擇權</b>：借款人隨時可以說「房子給你，錢我不還了」。如果房子的價值比欠的錢還低，這個選擇就「有價值」。理論上理性的人會這樣做，但現實中大多數人不會，這張卡解釋為什麼。</p>' + reD('Default option', '違約選擇權', '借款人擁有的賣權', [
          ['結構', '標的物：<b>房子</b>；履約價：<b>貸款的價值</b>（不還的債務）；借款人可以「賣」房子給貸方，換取免除債務。<span class="ez">賣權（put）＝可以用約定的價格把東西賣出去的權利。在這裡，借款人可以把房子「賣」給銀行，換取「欠的錢不用還」。所以房子是標的物，欠的錢就是履約價。</span>'],
          ['價內的條件', '房價 &lt; 貸款價值 → 賣權價內（in the money）。<span class="ez">房子只值 500 萬、卻欠 600 萬時，把房子交出去等於用 500 萬的東西抵掉 600 萬的債，這個賣權就「有賺」（價內）。</span>'],
          ['誰付權利金', '貸方承擔這個賣權，所以向借款人收取<b>信用風險溢酬</b>（較高利率、PMI、較低 LTV）。<span class="ez">銀行等於免費送借款人一個賣權，所以要用比較高的利率、要求保險、限制借款成數來收回這個成本。</span>'],
          ['同時還有買權', '借款人也有<b>提前還款的買權</b>（prepayment option）：利率下跌時以 UPB 買回貸款。兩個選擇權互相影響：違約後就不能再提前還款，反之亦然。<span class="ez">借款人同時有兩個選擇權：利率下跌時可以提早還錢（買權）、房價下跌時可以違約（賣權）。用了一個，另一個就沒了。</span>'],
          ['CFA 連結', 'MBS 的定價把借款人的提前還款（call）和違約（put）視為嵌入式選擇權。<span class="ez">CFA 會把這兩個選擇權當成 MBS 價格的一部分。</span>'] ])
      + reD('Rational / ruthless default', '理性違約', '只看財務，價內就行使', [
          ['判斷標準', '不是房價 &lt; <b>UPB</b>，而是房價 &lt; <b>貸款的市場價值</b>（剩餘付款以<b>目前市場利率</b>折現的現值）＋ 違約成本。<span class="ez">重點：要拿房價和「這筆貸款的市場價值」比，不是和「還欠多少本金」比。貸款的市場價值＝把剩下要付的錢用現在的市場利率折現。</span>'],
          ['算一次', 'UPB 800 萬、利率 3%、剩 25 年，每月付款約 3.79 萬。市場利率升到 7% 時，剩餘付款的現值只有約 <b>537 萬</b>。若房價跌到 700 萬：UPB 算的 LTV 是 114%（看起來 underwater），但房價 700 萬 &gt; 貸款市價 537 萬 → 理性借款人<b>不會</b>違約，因為這筆低利貸款對他很值錢。<span class="ez">白話：他借的是 3% 的便宜貸款，現在市場是 7%。如果他違約，以後再買房就要用 7% 借錢。所以這筆 3% 的貸款對他來說是一個寶，不會輕易放棄。</span>'],
          ['反過來', '市場利率下跌時貸款市價上升，同樣的房價下，違約誘因變大。<span class="ez">反過來：市場利率變低時，舊貸款就不是什麼寶了，違約的誘因變大。</span>'],
          ['Ruthless 的意思', '不考慮道德、信用、搬家成本，只要價內就違約；是學術模型的<b>極端假設</b>。<span class="ez">Ruthless＝冷血：完全只看數字。現實中很少人這樣。</span>'] ])
      + reD('違約成本', '為什麼多數人不違約', '交易成本讓履約價更高', [
          '<b>信用成本</b>：信用分數大跌，紀錄保留多年，之後借款、租屋、求職受影響。<span class="ez">下面這些都是違約的「代價」。代價越高，借款人越不會違約。</span>',
          '<b>搬家和找房</b>的成本、孩子轉學、社區關係。',
          '<b>追索權</b>：有追索權的州，貸方可以申請 deficiency judgment 追討差額 → 違約不能免除全部債務。<span class="ez">有追索權時，就算房子交出去，銀行還可以追你剩下的錢，違約也沒用。</span>',
          '<b>稅</b>：債務被免除的部分可能被課所得稅（cancellation of debt income，見 deficiency judgment 卡）。<span class="ez">銀行原諒的債，美國稅法可能當成你的「收入」來課稅。</span>',
          '<b>道德與社會壓力</b>：多數人認為欠錢就該還。',
          '<b>期待房價回升</b>：保留房子等於保留房價上漲的機會（選擇權的時間價值）→ 稍微價內時，<b>等待</b>比立刻違約更有價值。<span class="ez">房價說不定會漲回來。現在違約就失去這個機會，所以稍微虧一點時，大部分人會選擇等。</span>' ])
      + reD('Strategic default', '策略性違約', '付得起但選擇不付', [
          ['定義', '借款人<b>有能力</b>付款，但因為負權益太大，選擇停止付款、讓房子被法拍（walk away、jingle mail）。<span class="ez">策略性違約＝付得起，但覺得不划算所以不付。</span>'],
          ['何時多', '2008–2010 年房價大跌、負權益很深的地區；<b>無追索權</b>貸款、投資用房產、法拍時間很長（可以免費住很久）時更常見。<span class="ez">什麼時候最多：房價跌很深、沒有追索權、不是自住、法拍要等很久（可以一直免費住）。</span>'],
          ['和 rational default 的關係', 'Strategic default 是現實中的理性違約；但因為違約成本，借款人通常要負權益很深才會這樣做。<span class="ez">因為違約有很多代價，通常要房價跌得很深，才會有人真的這麼做。</span>'] ])
      + reD('對貸款定價與政策的意涵', '延伸', '貸方怎麼降低違約選擇權的價值', [
          '<b>LTV 上限</b>、頭期款：讓賣權離價外更遠。<span class="ez">下面是銀行降低違約誘因的方法。頭期款付越多，房價要跌更多才會「價內」。</span>',
          '<b>追索權</b>、deficiency judgment：提高履約成本。<span class="ez">有追索權，違約的代價就變高。</span>',
          '<b>PMI／政府保險</b>：把賣權的風險轉給保險人。<span class="ez">保險公司幫銀行承擔違約損失。</span>',
          '<b>Loan modification、本金寬減</b>：危機時把價內的賣權拉回價外，避免大量違約造成法拍潮（單元 9）。<span class="ez">減少本金，讓欠的錢低於房價，借款人就沒有理由違約。</span>',
          '<b>台灣</b>：房貸有追索權，加上聯徵紀錄與社會觀念，策略性違約很少見。<span class="ez">台灣的房貸都有追索權，加上信用紀錄和社會觀念，幾乎沒人會策略性違約。</span>' ]),
    cfa:'Fixed Income：embedded options in mortgages',
    terms:[['default option','違約賣權'],['ruthless / rational default','理性違約'],['strategic default','策略性違約'],['negative equity / underwater','負權益'],['market value of the mortgage','貸款的市場價值（以市場利率折現）'],['walk away / jingle mail','放棄房子'],['transaction costs of default','違約成本']] },

  // ---------- Workout ----------
  { id:'re1i', t:'Loss mitigation 與 Workout：協議內容與各種方法', en:'Loss mitigation strategies, workout agreements and workout methods',
    plain:'法拍又慢又貴，所以借款人違約後，貸方通常先嘗試 workout：和借款人協議一個比法拍更好的解決方法。方法分兩類：讓借款人保住房子（暫緩、補繳計畫、修改貸款條件、再融資），或讓借款人有秩序地離開房子（出售、承接、短售、以屋抵債）。貸方用淨現值比較哪一個回收最多。',
    life:'同學欠你 1 萬還不出來：你可以讓他晚點還（forbearance）、分期還（repayment plan）、少收一點利息拉長期限（modification）；真的不行，請他把抵押的相機賣掉還你（short sale），或直接把相機給你（deed in lieu）。告上法院（法拍）是最後手段。',
    body: '<p class="ez lead">借款人違約後，銀行不一定要馬上法拍。法拍又慢又貴，有時候<b>讓借款人繼續繳</b>（改條件）或<b>好好把房子交出來</b>，銀行反而拿回更多錢。這些替代方案統稱 workout，整套策略叫 loss mitigation（減少損失）。</p><h4>Loss mitigation（損失減輕）策略</h4>'
      + reD('Loss mitigation', '損失減輕', '貸方／servicer 處理違約貸款的整體策略', [
          ['目標', '在<b>回收最多</b>的前提下處理違約：比較 workout 和 foreclosure 的預期淨回收。<span class="ez">銀行只在乎一件事：哪個方法拿回的錢最多。</span>'],
          ['流程', '早期聯繫（early intervention）→ 收集借款人財務資料（loss mitigation application）→ 評估各選項 → 試行期 → 正式協議；美國法規禁止在完整申請審查期間同時推進法拍（dual tracking）。<span class="ez">流程：早點聯絡 → 拿借款人的財務資料 → 看哪個方案可行 → 先試幾個月 → 簽正式協議。不能一邊跟你談、一邊偷偷推進法拍（dual tracking）。</span>'],
          ['Waterfall', 'Servicer 依序評估：<b>保住房子</b>的方案（retention）優先，不可行才考慮<b>處分房子</b>的方案（disposition / liquidation）。<span class="ez">順序：先想辦法讓借款人保住房子；真的不行，才討論怎麼把房子交出來。</span>'] ])
      + reD('NPV test', '淨現值測試', '修改貸款 vs 法拍，哪個回收多', [
          ['Workout 的價值', '修改後付款的現值 ×（1 − 再違約機率）＋ 再違約機率 × 之後法拍的回收現值。<span class="ez">改條件之後，借款人可能繼續繳，也可能又違約。兩種情況加權平均，就是改條件的預期價值。</span>'],
          ['法拍的價值', '預期拍賣價 − 法拍與持有成本，以法拍所需時間折現。<span class="ez">法拍的價值：預計拍賣能賣多少，扣掉所有成本，因為要等很久才拿到錢，還要折現。</span>'],
          ['決策', 'NPV(workout) &gt; NPV(foreclosure) → 做 workout。美國 2009 年 HAMP 就要求 servicer 做這個測試。<span class="ez">哪個預期能拿回比較多錢就選哪個。</span>'],
          ['Redefault risk', '修改後再違約的比例不低，所以只降一點付款的修改常常無效；付款降幅越大，再違約率越低。<span class="ez">只幫借款人少繳一點點，他通常還是繳不出來，很快又違約；要降得夠多才有效。</span>'] ])
      + reD('為什麼 workout 不一定發生', '障礙', '證券化、二胎、道德風險', [
          '<b>證券化</b>：貸款在 MBS 裡，servicer 要遵守 pooling and servicing agreement（PSA）的限制，且 servicer 的報酬結構不一定鼓勵修改。<span class="ez">貸款被包成 MBS 後，處理貸款的 servicer 要照證券契約做事，不能隨便改條件；修改貸款很花工夫，servicer 也不一定賺得到錢。</span>',
          '<b>二胎（junior lien）</b>：修改或短售通常需要後順位貸方同意。<span class="ez">有二胎時要多一個人點頭，比較難談。</span>',
          '<b>道德風險</b>：如果違約就能拿到更好的條件，可能鼓勵付得起的人也違約。<span class="ez">如果大家知道「違約就能減免」，付得起的人也會故意不付。</span>',
          '<b>資訊不對稱</b>：貸方很難判斷借款人是真的付不起還是策略性違約。<span class="ez">銀行看不出借款人是真的沒錢，還是假裝沒錢。</span>' ])
      + '<h4>Workout agreement（協議）裡寫什麼</h4>'
      + reD('Workout agreement', '協商／重整協議', '把新的安排寫成契約', [
          ['Pre-negotiation letter', '（商用貸款）協商<b>前</b>先簽：協商中的言行不構成新承諾、貸方不因協商而放棄任何權利、任何一方可隨時終止協商。<span class="ez">商用貸款在開始談之前先簽一份「談歸談，不算數」的信，免得之後說「你那時候答應我了」。</span>'],
          ['確認債務與違約', '借款人承認債務金額、承認已違約、貸方的 lien 有效。<span class="ez">協議裡借款人要先承認：我欠這麼多、我違約了、你的抵押權有效。之後就不能再爭這些。</span>'],
          ['新條件', '修改後的利率、期限、付款、還款計畫、試行期。<span class="ez">這是協議的核心：新的還款條件。</span>'],
          ['借款人的讓步', '<b>放棄抗辯與求償</b>（release of claims，例如 lender liability）、提供更多擔保或保證、財務報告、cash management（租金進入貸方控制帳戶）。<span class="ez">銀行讓步，借款人也要給些東西：放棄告銀行的權利、提供更多擔保、定期報告財務等。</span>'],
          ['Standstill', '貸方在協議期間<b>暫停</b>法拍等行動。<span class="ez">協議期間銀行先不法拍。</span>'],
          ['再違約的後果', '協議再被違反時，貸方可以立即採取行動（例如借款人同意不抗辯法拍、同意指定 receiver）。<span class="ez">如果借款人又違約，就照協議直接處理，不能再拖。</span>'],
          ['易錯點', '在<b>放款時</b>就約定「違約就把房子給貸方」是無效的（clogging the equity of redemption）；但違約<b>之後</b>協議的安排通常有效。<span class="ez">放款時就寫「違約就把房子給我」是無效的（會剝奪借款人的贖回權）；但違約以後雙方另外協議，通常是有效的。</span>'] ])
      + '<h4>Workout 方法：保住房子（retention）</h4>'
      + reD('Forbearance', '暫緩付款', '暫時少付或不付，之後補', [
          '適合暫時性困難（失業、生病、天災）；期間利息繼續累積。<span class="ez">Forbearance＝暫時少繳或不繳，但利息照算。</span>',
          '結束後以一次補繳、repayment plan、deferral 或 modification 處理欠款（細節見第 4 組 ④ 違約條款）。<span class="ez">暫停結束後，欠的錢有幾種補法。</span>' ])
      + reD('Repayment plan', '補繳計畫', '把欠款分幾個月補', [
          '每月付款 = 原月付款 ＋ 欠款 ÷ 補繳月數（例如 6–12 個月）。<span class="ez">例：欠了 3 個月共 9 萬，分 6 個月補 → 每個月多繳 1.5 萬。</span>',
          '適合收入已經恢復、只是要把欠的補上的人。<span class="ez">適合已經找到工作、只是要把之前欠的補上的人。</span>' ])
      + reD('Loan modification / restructuring', '修改貸款條件', '永久改變條件，降低月付款', [
          ['Capitalization', '把逾期本息和費用<b>併入 UPB</b>，貸款恢復正常（current）。<span class="ez">把欠的利息和費用直接加進本金裡，帳面上就不算逾期了。</span>'],
          ['降低利率', '可能是永久，或先低後逐步調升（step-rate）。<span class="ez">利率降低，月付款就降低。</span>'],
          ['延長期限', '例如重新攤還為 40 年，降低每月付款。<span class="ez">剩下的錢分更多年還，每月就少繳一點。</span>'],
          ['Principal forbearance', '一部分本金<b>不計息、延到最後</b>（出售或到期時才付），貸方沒有真的免除。<span class="ez">一部分本金先「凍結」：不算利息，等賣房或到期再還。銀行沒有真的放棄這筆錢。</span>'],
          ['Principal reduction / forgiveness', '真的<b>免除</b>部分本金；對負權益很深的借款人最有效（把違約賣權拉回價外），但貸方成本最高、有道德風險。<span class="ez">真的把一部分本金一筆勾銷。對房價跌很深的人最有效，因為欠的錢一旦低於房價，他就沒有理由違約；但銀行損失最大。</span>'],
          ['HAMP 的順序（2009）', '依序：資本化 → 降利率（最低 2%）→ 延長期限（最長 40 年）→ 本金 forbearance，直到月付款降到月收入的 <b>31%</b>；先試行 3 個月。<span class="ez">HAMP 的方法：一步一步調，直到月付款降到收入的 31% 為止。</span>'],
          ['商用貸款的特殊作法', '<b>延長到期日</b>（extend and pretend）、<b>A/B note</b>（拆成可以支撐的 A note 和「希望票據」B note，B note 只在房子價值回升時才付）、要求借款人增資或部分還款、貸方分享未來增值（participation）。<span class="ez">商用貸款的特別作法：延後到期日、把貸款拆成「付得起的部分」和「等房價回升才付的部分」，或要求投資人再拿錢出來。</span>'] ])
      + reD('Refinance', '再融資', '用新貸款還舊貸款', [
          '借款人還有權益、利率下跌時可行；負權益時通常借不到（2009 年 HARP 例外地允許 underwater 的機構貸款再融資）。<span class="ez">用新的低利貸款還掉舊的；但房價低於貸款時，通常沒有銀行肯借新的。</span>' ])
      + '<h4>Workout 方法：離開房子（disposition）</h4>'
      + reD('Transfer to a new owner / assumption', '轉給新屋主', '貸方同意買方承接', [
          '貸方同意<b>不行使 due-on-sale</b>，讓有能力的買方承接貸款（可能同時修改條件）。<span class="ez">銀行同意讓有能力的買方接手繼續繳，不要求全部還清。</span>',
          '商用不動產常見：原借款人找新投資人接手，貸方審核新借款人。<span class="ez">商用不動產常見：找新投資人接手。</span>' ])
      + reD('Short sale / Deed in lieu / Friendly foreclosure', '短售、以屋抵債、合意法拍', '有秩序地把房子交出去', [
          '細節見下一張卡。<span class="ez">借款人不要房子了，但用比法拍更有效率的方式交出去。</span>' ])
      + reD('Prepackaged bankruptcy', '預先協商的破產重整', '先談好重整計畫，再聲請破產', [
          '細節見「破產」卡。<span class="ez">先跟債權人談好怎麼重整，再去聲請破產。</span>' ])
      + '<h4>台灣對照</h4><ul><li>銀行常見的協商：<b>展延</b>期限、一段期間<b>只繳息不還本</b>、調降利率、分期補繳。</li><li><b>消費者債務清理條例</b>：與最大債權銀行<b>前置協商</b>，或向法院聲請<b>前置調解</b>；不成立再走<b>更生</b>或<b>清算</b>（見破產卡）。<span class="ez">台灣叫「債務協商」：先和最大債權銀行協商，談不成再走更生或清算。</span></li><li>天災、疫情時，金管會會請銀行提供<b>紓困展延</b>方案。<span class="ez">遇到天災、疫情時，政府也會請銀行提供展延。</span></li></ul>',
    terms:[['loss mitigation','損失減輕'],['retention / disposition','保住房子／處分房子'],['NPV test','淨現值測試'],['redefault','再違約'],['dual tracking','協商與法拍同時進行'],['workout agreement','協商協議'],['pre-negotiation letter','協商前約定'],['standstill','暫停行動'],['repayment plan','補繳計畫'],['capitalization','欠款併入本金'],['principal forbearance','本金延後（不免除）'],['principal forgiveness','本金免除'],['A/B note','拆成可負擔與希望票據'],['extend and pretend','延長到期日']] },

  { id:'re1w', t:'交出房子的方式：Deed in lieu、Short sale、Friendly foreclosure、Cash for keys', en:'Deed in lieu of foreclosure, short sale and friendly foreclosure',
    plain:'借款人保不住房子時，不一定要走完整的法拍。可以自願把房子的所有權直接移轉給貸方（deed in lieu of foreclosure），可以經貸方同意以低於貸款餘額的價格賣掉（short sale），也可以同意不抗辯、讓法拍快速完成（friendly foreclosure）。每一種對貸方和借款人的風險都不一樣，尤其是後順位 lien 會不會消失。',
    life:'欠朋友錢還不出來：直接把抵押的腳踏車交給他（deed in lieu）；或經他同意把車賣掉、賣多少給他多少（short sale）；或者兩個人一起去找班導當公證人處理（friendly foreclosure），這樣其他也押了這台車的人也會被處理掉。',
    body: '<p class="ez lead">借款人已經決定（或只能）放棄房子時，與其走又慢又貴的法拍，不如<b>好好地把房子交出去</b>。這張卡比較四種方法，重點看兩件事：後順位的 lien 會不會一起清掉？還欠的差額要不要繼續還？</p>' + reD('Deed in lieu of foreclosure（voluntary conveyance）', '以屋抵債', '借款人自願把所有權移轉給貸方', [
          ['怎麼做', '借款人簽 deed 把房子移轉給貸方，貸方<b>免除</b>（全部或部分）債務。<span class="ez">以屋抵債＝借款人直接把房子過戶給銀行，換取不用再還錢。</span>'],
          ['借款人的好處', '比法拍快、隱私較好、信用傷害較小；可以談判<b>放棄 deficiency</b>、搬遷補助。<span class="ez">對借款人比法拍好：比較快、比較不丟臉、信用紀錄比較好看，還可以談「剩下的錢不用還」。</span>'],
          ['貸方的好處', '省下法拍的時間和費用、房子較少閒置毀損、可以較快出售。<span class="ez">對銀行也好：省下法拍的時間和錢，房子比較不會空太久被破壞。</span>'],
          ['貸方的風險 ①：junior lien 不會消失', '這是<b>自願移轉</b>，不是法拍，所以後順位 lien、判決 lien、mechanic’s lien 都<b>仍然附在房子上</b>，貸方取得的是 subject to 這些 lien 的房子 → 貸方一定要先做 <b>title search</b>，有 junior lien 時通常改走法拍。<span class="ez">最大的陷阱：法拍會清掉後順位的 lien，但以屋抵債只是普通的過戶，二胎、判決 lien 都還留在房子上。銀行拿到的房子還帶著別人的債，所以銀行一定要先查清楚。</span>'],
          ['貸方的風險 ②：可能被撤銷', '借款人如果在之後不久聲請破產，這個移轉可能被認定為<b>偏頗清償</b>（preference）或<b>詐害移轉</b>（fraudulent conveyance，例如房子價值遠高於債務）而被撤銷。<span class="ez">如果借款人不久後破產，法院可能認為「你在破產前把最值錢的房子給了某一個債主，對其他債主不公平」，把這次過戶取消。</span>'],
          ['貸方的風險 ③：merger', '貸方同時是抵押權人和所有權人時，抵押可能<b>混同</b>（merger）而消滅，使貸方失去對抗 junior lien 的順位 → 契約要寫明不混同（estoppel affidavit、non-merger clause）。<span class="ez">混同：銀行同時是房子的主人又是抵押權人，抵押權可能就消失了，銀行原本的順位也跟著沒了。所以契約要寫明「抵押權不因此消滅」。</span>'],
          ['必須是自願的', '要有對價、借款人真正同意；<b>放款時</b>預先約定的 deed in lieu 無效（clogging the equity of redemption）。<span class="ez">一定要是違約後雙方真心同意的；借錢時就先約好「違約房子就歸我」是無效的。</span>'],
          ['稅', '視為以「被免除的債務」出售房子；免除的金額超過房價部分可能是應稅的債務免除所得（見 deficiency judgment 卡）。<span class="ez">在稅法上，這等於借款人把房子「賣」給銀行換取債務免除；如果免除的債比房價多，多出來的部分可能要繳稅。</span>'] ])
      + reD('Short sale (pre-foreclosure sale)', '短售', '以低於貸款餘額的價格出售', [
          ['怎麼做', '借款人找買方，貸方審核價格（常要求 <b>BPO</b>，broker price opinion，或估價），同意<b>以售價全額清償</b>並解除 lien。<span class="ez">短售＝房子賣的錢不夠還貸款，但銀行同意「賣多少就收多少」，把抵押權解除。銀行會先請人估價，確認不是賤賣。</span>'],
          ['算一次', 'UPB 500 萬、售價 420 萬、出售費用 25 萬 → 貸方實收 395 萬，損失 105 萬（加上應計利息）。<span class="ez">例子：欠 500 萬，賣 420 萬，扣掉 25 萬仲介和其他費用，銀行只拿到 395 萬，少了 105 萬。</span>'],
          ['Deficiency', '協議要寫明貸方是否<b>放棄追討差額</b>；沒寫的話，有追索權的州貸方仍可追。<span class="ez">一定要問清楚：差的 105 萬，銀行還會不會來追？協議沒寫的話，銀行還可以追。</span>'],
          ['Junior lien', '要後順位貸方<b>同意解除</b> lien，買方才能取得乾淨產權；後順位通常只拿到一小筆錢（因為它在法拍中可能什麼都拿不到）。<span class="ez">二胎也要同意放手，買方才能拿到乾淨的房子。二胎通常拿一點錢就同意，因為走法拍它可能一毛都拿不到。</span>'],
          ['和法拍比', '市場出售的價格通常<b>高於</b>法拍價，且房子不會空置 → 貸方的損失通常較小。<span class="ez">一般買賣能賣到比法拍更好的價格，房子也不會空著，所以銀行通常虧比較少。</span>'] ])
      + reD('Friendly foreclosure', '合意法拍', '借款人同意不抗辯，讓法拍快速完成', [
          ['怎麼做', '借款人和貸方協議：借款人不提出抗辯、配合程序（例如同意判決），貸方通常放棄 deficiency 或提供其他補償。<span class="ez">合意法拍＝還是走法拍程序，但借款人不反抗、配合，讓程序很快走完。</span>'],
          ['為什麼不用 deed in lieu', '法拍是法律程序，可以<b>塗銷 junior lien</b>，並取得法院確認的乾淨產權；也比較不會被破產程序撤銷。<span class="ez">為什麼不直接以屋抵債？因為法拍可以清掉後順位的 lien，而且有法院背書，以後比較不會被推翻。</span>'],
          ['缺點', '仍要負擔法拍的程序時間和費用，只是比對抗式法拍快。<span class="ez">缺點是還是要花法拍的時間和費用。</span>'] ])
      + reD('Cash for keys', '搬遷補助', '付錢請住戶搬走', [
          '貸方付一筆錢給借款人（或住戶），換取在約定日期前<b>搬離</b>並保持房子良好狀態。<span class="ez">銀行付一筆搬家費，請住戶在某天前搬走、而且不要破壞房子。</span>',
          '比走驅逐程序（eviction）便宜、快速，房子也比較不會被破壞。<span class="ez">比上法院趕人便宜又快，住戶也比較不會一氣之下破壞房子。</span>' ])
      + reD('比較', '四種方法對照', '重點是 junior lien 和 deficiency', [
          '<b>Junior lien 會消失？</b> 法拍（含 friendly）：會；deed in lieu：<b>不會</b>；short sale：要 junior 同意解除。<span class="ez">這是最常考的：法拍會清掉後順位，以屋抵債不會。</span>',
          '<b>速度</b>：deed in lieu、short sale 最快；friendly foreclosure 次之；對抗式法拍最慢。<span class="ez">速度：自願的方法最快。</span>',
          '<b>出售價格</b>：short sale（市場出售）通常最高；法拍價最低。<span class="ez">價格：正常賣（短售）最高，法拍最低。</span>',
          '<b>Deficiency</b>：都可以在協議中放棄；沒有放棄時，有追索權的貸方仍可追討。<span class="ez">差額：都可以談放棄，沒談就還可以追。</span>' ])
      + '<h4>台灣對照</h4><ul><li><b>代物清償</b>（民法 §319）：債權人受領他種給付以代原定給付時，債之關係消滅 → 相當於 deed in lieu。實務上銀行較少接受，多走法拍。<span class="ez">台灣的「代物清償」：本來要還錢，改用房子來還。</span></li><li>借款人自行出售房子，以價金還銀行、銀行同意塗銷抵押權（價金不足時另外協商）→ 類似 short sale。<span class="ez">台灣的作法：屋主自己賣房，用賣房的錢還銀行。</span></li></ul>',
    terms:[['deed in lieu of foreclosure','以屋抵債'],['voluntary conveyance','自願移轉'],['preference / fraudulent conveyance','偏頗清償／詐害移轉'],['merger','混同'],['short sale','短售'],['BPO','經紀人估價'],['friendly foreclosure','合意法拍'],['cash for keys','搬遷補助'],['代物清償','台灣的以物抵債']] },

  { id:'re1x', t:'破產與 Prepackaged bankruptcy', en:'Bankruptcy and prepackaged bankruptcy',
    plain:'借款人聲請破產時，法律會自動暫停所有討債行動，包括法拍（automatic stay）。不同的破產章節對房貸的影響不同：清算（Ch.7）免除個人債務但抵押還在；個人重整（Ch.13）可以分期補繳欠款保住房子；企業重整（Ch.11）甚至可以強制修改貸款條件。Prepackaged bankruptcy 是先和債權人談好重整計畫，再聲請破產讓法院快速核准。',
    life:'班上一群同學都在跟你討債，你去找學務處：學務處先叫大家暫停討債（automatic stay），再決定你是賣掉東西清償（清算），還是訂一個分期還款計畫（重整）。如果你事先就跟大部分債主談好計畫，學務處很快就能蓋章（prepackaged）。',
    body: '<p class="ez lead">借款人聲請破產，對銀行是大事：法拍會<b>立刻暫停</b>，而且法院可能改變貸款條件。這張卡先講暫停（automatic stay），再比較美國三種破產（Ch.7 清算、Ch.13 個人重整、Ch.11 企業重整），最後是「先談好再破產」的 prepack。</p>' + reD('Automatic stay', '自動停止', '聲請破產的瞬間，法拍暫停', [
          ['內容', '破產聲請一提出，所有債權人的催收、訴訟、法拍<b>自動暫停</b>，不需要法院另外命令。<span class="ez">一聲請破產，所有討債行動立刻停止，像按下暫停鍵。</span>'],
          ['對貸方的影響', '法拍延後、利息和費用繼續累積、房子可能惡化。<span class="ez">對銀行來說：時間拖越久，欠的錢越多，房子可能越破。</span>'],
          ['Relief from stay', '貸方可以聲請解除暫停，例如：債務人<b>沒有權益</b>且房子對重整不是必要、擔保權益沒有受到<b>充分保護</b>（adequate protection，例如房價持續下跌、沒繳保險）。<span class="ez">銀行可以請法院解除暫停，理由像是：房子對借款人已經沒有價值，或銀行的擔保正在變少卻沒有保護。</span>'],
          ['SARE', '<b>Single asset real estate</b>（只有一筆不動產的公司）：聲請後約 90 天內，債務人要提出可行的重整計畫或開始支付利息，否則貸方可以解除暫停。<span class="ez">只有一間房子的公司用破產拖時間，法律只給它約 90 天，要嘛拿出可行方案，要嘛開始付利息。</span>'] ])
      + reD('Chapter 7（liquidation）', '清算', '免除個人責任，但 lien 還在', [
          '受託人變賣非豁免財產分配給債權人；債務人的<b>個人責任被免除</b>（discharge）。<span class="ez">清算：把財產賣掉分給債主，剩下的債一筆勾銷。</span>',
          '但抵押 lien <b>不會</b>因此消失：貸方仍可以在 stay 解除後法拍房子，只是不能再追 deficiency。<span class="ez">重點：「你本人欠的錢」被免除了，但房子上的抵押權還在。銀行還是可以拍賣房子，只是不夠的部分不能再找你要。</span>',
          '常被用來阻止 deficiency judgment。<span class="ez">所以有人用 Ch.7 來避免被追差額。</span>' ])
      + reD('Chapter 13（individual reorganization）', '個人債務重整', '分 3–5 年補繳，保住自住房', [
          ['Cure and maintain', '在重整計畫期間<b>分期補繳</b>欠款，同時照常付每月房貸 → 保住房子。<span class="ez">個人重整：用 3–5 年把欠的慢慢補上，同時每個月照常繳，就能保住房子。</span>'],
          ['Anti-modification', '自住房的<b>第一順位</b>房貸條件<b>不能</b>被法院修改（不能降本金、利率）。<span class="ez">自住房的第一順位房貸受到特別保護，法院不能改它的條件。</span>'],
          ['Lien strip-off', '若房價低於第一順位房貸餘額，<b>完全沒有擔保價值</b>的二胎／HELOC 可以被視為無擔保債權（strip off）→ 對 junior lien 是重大風險。Ch.7 不行。<span class="ez">例：房子值 500 萬，第一順位還欠 550 萬，二胎欠 100 萬。房子連第一順位都不夠還，二胎完全沒擔保到，在 Ch.13 中可以被當成普通欠款處理，二胎的抵押權被拿掉。這對二胎是很大的風險。</span>'] ])
      + reD('Chapter 11（reorganization）', '重整', '企業（含不動產公司）的重整，可以 cramdown', [
          ['Debtor in possession', '債務人繼續經營、管理房產，提出重整計畫。<span class="ez">企業重整：公司繼續營業，自己提出怎麼還債的計畫。</span>'],
          ['Cramdown', '只要符合法定條件（例如給有擔保債權人的現金流現值不低於擔保品價值），即使有擔保債權人<b>反對</b>，法院也可以核准計畫：貸款被拆成<b>有擔保</b>（＝擔保品價值）和<b>無擔保</b>（差額）兩部分，並可能改利率、延期限。<span class="ez">Cramdown＝法院強制通過：就算銀行反對，只要計畫符合法律條件，法院還是可以核准。例：欠 1,000 萬、房子只值 700 萬，貸款就被拆成「700 萬有擔保」和「300 萬沒擔保」，而且可能被改利率、延期限。</span>'],
          ['對商用貸方', '這是商用不動產貸款最大的法律風險之一 → 貸款結構會用 <b>bankruptcy-remote SPE</b>（破產隔離的特殊目的公司）、獨立董事、<b>bad-boy guarantee</b>（借款人自行聲請破產時保證人負全部責任）來降低。<span class="ez">銀行的防禦：讓借款的公司只擁有這一間房子（不容易被拖進破產）、要求獨立董事，或要求老闆簽「如果你自己去聲請破產，你個人要負全部責任」的保證。</span>'] ])
      + reD('Prepackaged bankruptcy', '預先協商的破產重整', '先談好、先投票，再聲請', [
          ['怎麼做', '債務人在聲請 Chapter 11 <b>之前</b>就和主要債權人談好重整計畫，並<b>完成投票</b>；聲請後法院很快召開確認聽證，通常幾個月內完成。<span class="ez">Prepack＝先在場外和主要債主談好、投好票，再去法院走一個很快的程序。</span>'],
          ['為什麼要走破產', '庭外協議需要<b>所有</b>債權人同意；破產程序中只要每一類受影響的債權人中，<b>金額 2/3 以上且人數過半</b>同意，就能約束反對的少數（holdout），還能使用 cramdown、automatic stay。<span class="ez">為什麼不直接在場外談？場外協議要「每一個」債主都同意，只要一個人不同意就談不成；在破產程序裡，同一類債主只要金額三分之二、人數過半同意，就能強迫少數反對的人接受。</span>'],
          ['好處', '時間短、成本低、營運干擾小、比傳統 Ch.11 更可預測。<span class="ez">好處：快、便宜、比較不影響營運。</span>'],
          ['Pre-negotiated 的差別', '<b>Pre-negotiated</b>：聲請前談好主要條款，但聲請<b>後</b>才投票；<b>prepackaged</b>：聲請前就投完票。<span class="ez">差別：pre-negotiated 是先談好、進去再投票；prepack 是投完票才進去。</span>'],
          ['在不動產的應用', '擁有多筆不動產、多個貸方的開發商或 REIT，用 prepack 一次重組所有債務；也是 workout 的一種，介於庭外協議和傳統破產之間。<span class="ez">有很多房子、很多債主的開發商，可以用它一次重整所有債務。</span>'] ])
      + '<h4>台灣對照</h4><ul><li><b>消費者債務清理條例</b>（個人）：<ul><li><b>前置協商</b>（與最大債權銀行）或<b>前置調解</b>（法院）→ 不成立再聲請：<span class="ez">台灣的個人債務處理：先協商，談不成再走更生或清算。</span></li><li><b>更生</b>：無擔保或無優先權債務總額在一定金額以下、有固定收入者，提出更生方案分期清償（原則 6 年內）；可以和抵押權人協商住宅借款的特別條款以<b>保住自住房</b>。<span class="ez">更生≈美國 Ch.13：有固定收入的人，提出分期還款計畫，也可以和銀行談條件保住房子。</span></li><li><b>清算</b>：變賣財產分配，之後法院裁定是否<b>免責</b>。<span class="ez">清算≈美國 Ch.7：財產拿去賣，剩下的債可能被免除。</span></li></ul></li><li>抵押權在更生、清算中屬於<b>別除權</b>：可以不依程序，直接就抵押物優先受償。<span class="ez">別除權＝有抵押的銀行不受破產程序限制，還是可以直接拿房子優先受償。</span></li><li><b>公司重整</b>（公司法 §282 以下）：類似 Ch.11，重整期間停止強制執行；有擔保債權也要依重整計畫受償。<span class="ez">公司重整≈美國 Ch.11，但台灣的有擔保債權在重整中也要照計畫受償。</span></li></ul>',
    terms:[['automatic stay','自動停止'],['relief from stay','解除暫停'],['adequate protection','充分保護'],['Chapter 7 / 11 / 13','清算／重整／個人重整'],['discharge','免責'],['cramdown','強制核准重整計畫'],['lien strip-off','剝除無擔保價值的 lien'],['bankruptcy-remote SPE','破產隔離公司'],['bad-boy guarantee','惡意行為保證'],['prepackaged bankruptcy','預先協商並投票的重整'],['holdout','反對的少數債權人'],['更生／清算／別除權','台灣消債條例']] },

  // ---------- 法拍 ----------
  { id:'re1o', t:'Foreclosure：法拍的種類、完整流程與 Claims 的分配', en:'Foreclosure: types, process, sale and claims',
    plain:'Foreclosure 是貸方在借款人違約後，透過法律程序拍賣房子、用價金清償債務，並終止借款人贖回房子的權利。可以經過法院（judicial），也可以依契約的出售權不經法院（nonjudicial）。拍賣價金依各債權的順位分配，貸方的 claim 不只本金，還包括利息、代墊款和費用。',
    life:'就像學校處理欠繳的社費：先寄提醒（notice of default）、宣布全部一次繳清（acceleration）、在公告欄公告後把抵押的東西拍賣，賣得的錢先付拍賣的花費和學校的欠款，再依登記順序還給債主，剩下的才退給你。',
    body: '<p class="ez lead">法拍就是把房子拍賣、用拍賣的錢還債。這張卡講三件事：①法拍有幾種（要不要經過法院）；②從違約到拍賣的完整流程；③拍賣拿到的錢怎麼分給各個債主（claims）。最後是台灣怎麼做。</p><h4>Foreclosure 的種類</h4>'
      + reD('Judicial foreclosure', '訴訟法拍', '經過法院，各州都可以用', [
          ['流程', '貸方起訴 → 登記 <b>lis pendens</b> → 通知借款人和所有 junior lienholder 列為被告 → 法院判決（foreclosure decree）→ 由法院人員（sheriff）公開拍賣 → 部分州要法院<b>確認</b>拍賣（confirmation）。<span class="ez">一步一步：銀行告上法院 → 公告「這間房子在打官司」→ 通知所有相關的人 → 法院判決可以拍賣 → 法院人員主持拍賣 → 有些州還要法院再確認一次。</span>'],
          ['特點', '時間長（常超過一年）、成本高；但產權最乾淨，<b>deficiency judgment</b> 可以在同一程序中取得。<span class="ez">經過法院，所以慢又貴，但結果最可靠；銀行也可以在同一個官司裡請求「拍賣不夠的差額」。</span>'],
          ['常見於', '紐約、紐澤西、佛州等採用 mortgage（而非 deed of trust）的州。<span class="ez">用一般 mortgage 的州比較常走法院。</span>'] ])
      + reD('Nonjudicial foreclosure (power of sale)', '非訴訟法拍', '依契約的出售權，不經法院', [
          ['流程', '記錄 notice of default → 法定等待期 → 公告 <b>notice of sale</b>（刊登、張貼）→ 受託人（trustee）公開拍賣（<b>trustee’s sale</b>）。<span class="ez">不經法院：寄違約通知 → 等法定期間 → 公告拍賣日 → 由受託人拍賣。</span>'],
          ['特點', '快、便宜；但部分州規定走非訴訟法拍就<b>不能</b>再請求 deficiency（例如加州）。借款人若要抗辯，必須自己去法院聲請停止拍賣。<span class="ez">快又便宜。代價是：有些州規定，選擇不經法院的話就不能再追差額。借款人想反對，要自己去告。</span>'],
          ['常見於', '使用 deed of trust 的州（加州、德州等）。<span class="ez">有 deed of trust（含出售權）的州比較常用。</span>'] ])
      + reD('Strict foreclosure', '嚴格法拍', '不拍賣，法院直接把所有權給貸方', [
          '法院定一個期限讓借款人付清；期限一過，借款人的贖回權消滅，<b>所有權直接歸貸方</b>，沒有拍賣。<span class="ez">嚴格法拍：法院給一個期限，期限內沒還清，房子直接歸銀行，不拍賣。</span>',
          '只有少數州使用（例如康乃狄克、佛蒙特），多數州認為對借款人太嚴苛，因為房子價值可能遠高於債務。<span class="ez">對借款人很不利：房子值 1,000 萬、只欠 300 萬，也是直接整間給銀行，所以很少州用。</span>' ])
      + reD('Foreclosure by entry and possession', '以進入占有法拍', '少數 title theory 州', [
          '貸方和平進入並占有房子，經過法定期間後取得所有權（例如麻州、緬因州）。<span class="ez">銀行和平地進去住，過一段法定期間就取得所有權。只有少數州。</span>' ])
      + '<h4>完整流程</h4><ol><li><b>Default</b> → <b>notice of default</b>、cure period。</li><li><b>Loss mitigation</b> 評估（見 workout 卡）。</li><li><b>Acceleration</b>：宣告全部到期。</li><li>啟動法拍：judicial（起訴、lis pendens）或 nonjudicial（notice of sale）。</li><li>借款人仍可以 <b>reinstate</b>（拍賣前約 5 天）或以 <b>equity of redemption</b> 付清全部。</li><li><b>Foreclosure sale</b>（拍賣）。</li><li><b>Distribution of proceeds</b>：依 claims 的順位分配。</li><li>買受人取得 <b>sheriff’s deed／trustee’s deed</b>；沒人出價時成為 <b>REO</b>。</li><li>之後：<b>statutory redemption</b>（部分州）、<b>deficiency judgment</b>、驅逐（eviction）或 cash for keys。<span class="ez">把前面學過的全部串起來：違約 → 通知補救 → 嘗試 workout → 加速 → 啟動法拍 → 借款人最後的補救機會 → 拍賣 → 分錢 → 買受人拿到房子 → 拍賣後的贖回、追差額、趕人。</span></li></ol>'
      + '<h4>Foreclosure sale（拍賣）的細節</h4>'
      + reD('Foreclosure sale', '拍賣', '公開競價，貸方可以用債權出價', [
          ['Credit bid', '貸方可以用自己的債權金額出價，<b>不用付現金</b>，最高到它的 claim。其他買方要付現金（常要當場付保證金）。<span class="ez">Credit bid＝銀行用「你欠我的錢」來出價，不用真的掏錢。例：你欠銀行 600 萬，銀行可以直接出價到 600 萬，不用付現金。</span>'],
          ['常見結果', '多數法拍沒有第三人出更高價，貸方以 credit bid 得標 → 房子成為 <b>REO</b>，再由貸方整修、出售。<span class="ez">大部分法拍沒有外人出更高的價格，最後是銀行自己得標，房子變成銀行的（REO）。</span>'],
          ['為什麼法拍價低', '房子現況出售（as is）、通常不能進屋看、可能還有人住、產權風險、要付現金、部分州有 statutory redemption 期間 → 買方會壓低價格。<span class="ez">法拍屋便宜的原因：不能先進去看、可能還有人住、可能有產權問題、要馬上付現金、有些州原屋主還可以買回去。風險多，價格自然低。</span>'],
          ['Upset price', '部分州或法院設定最低拍賣價，價格過低時法院可以拒絕確認拍賣。<span class="ez">防止賤賣：價格太低，法院可以不承認這次拍賣。</span>'],
          ['剩餘款（surplus）', '價金清償所有 claims 後還有剩，依序給 junior lienholder，最後給原屋主。<span class="ez">拍賣的錢還完所有債之後如果有剩，依序給後順位，最後還給原屋主。</span>'] ])
      + '<h4>Claims：價金怎麼分</h4>'
      + reD('Claims', '各債權人的請求', '誰可以從價金分錢、可以分多少', [
          ['順序', '① 拍賣與法拍費用 → ② 房地產稅、特別課徵 → ③ 第一順位房貸 → ④ 後順位 lien（依登記先後）→ ⑤ 剩餘給原屋主。無擔保債權人<b>不能</b>直接從法拍價金分配（除非已取得 judgment lien）。<span class="ez">只有在房子上「掛了 lien」的人才能分拍賣的錢；只是普通欠款的人（例如信用卡）不能直接來分。</span>'],
          ['第一順位貸方的 claim', 'UPB ＋ 應計未付利息（可能是違約利率）＋ late charges ＋ 代墊的稅、保險、維修（protective advances）＋ 律師費和法拍費用（契約有約定時）。<span class="ez">第一順位能拿的不只是本金：還有欠的利息、罰款、銀行代墊的稅和保險、律師費。</span>'],
          ['Junior 的 claim', '同樣是本金＋利息＋費用，但只能從前順位全部清償後的<b>剩餘</b>中受償。<span class="ez">後順位算法一樣，但要等前面的人都拿滿了才輪到它。</span>'],
          ['算一次', '拍賣價 700 萬。費用 30 萬、欠稅 20 萬、第一順位 claim 550 萬（UPB 500 ＋利息 30 ＋代墊 20）、HELOC claim 150 萬 → 第一順位全額，HELOC 只拿到 700 − 30 − 20 − 550 = <b>100 萬</b>，不足 50 萬 lien 被塗銷，變成無擔保債權；原屋主 0。<span class="ez">照順序扣：700 萬先扣費用 30 萬和稅 20 萬，剩 650 萬；第一順位拿 550 萬，剩 100 萬；HELOC 欠 150 萬只拿到 100 萬，差的 50 萬變成沒擔保的普通欠款。</span>'],
          ['Prepayment penalty', '加速到期後貸方能不能再收提前清償違約金，依契約和州法而定（很多州不允許，除非契約明確約定）。<span class="ez">銀行自己要求全部還清，還能不能收「提前還款」的罰金？很多州認為不行，除非契約寫得很清楚。</span>'] ])
      + '<h4>成本與時間</h4><ul><li>成本：律師與法院費用、應計利息、房子閒置損壞、REO 持有與出售費用、拍賣折價 → 貸方的 loss severity 常很高。<span class="ez">法拍的成本很多：律師費、利息、房子空著變壞、拍賣折價，所以銀行通常虧很多。</span></li><li>時間：judicial 州通常比 nonjudicial 州久很多；時間越長，借款人「免費住」越久，策略性違約誘因越大。<span class="ez">法拍拖越久，借款人可以「免費住」越久，越多人會故意不繳。</span></li><li>所以貸方常偏好 workout、short sale、deed in lieu。</li></ul>'
      + '<h4>台灣的法拍程序</h4><ol><li>抵押權人聲請法院<b>拍賣抵押物裁定</b>（非訟程序，取得執行名義）。<span class="ez">台灣第一步：銀行請法院出一張「可以拍賣」的裁定，這是比較快的程序，不用打完整的官司。</span></li><li>聲請<b>強制執行</b> → 法院<b>查封</b>、<b>鑑價</b>、定底價。</li><li>第一次拍賣；未拍定時<b>減價</b>拍賣（每次減價不得超過 20%），最多到第三次。<span class="ez">台灣法拍最多拍三次，沒人買就每次降價（每次最多降 20%）。</span></li><li>第三次仍未拍定 → <b>特別變賣程序</b>（公告期間內依底價應買）；抵押權人也可以聲請<b>承受</b>（類似 REO）。<span class="ez">三次都沒人買，進入特別變賣；銀行也可以自己用底價把房子承接下來，就像美國的 REO。</span></li><li>拍定後：<b>點交</b>（法院負責交屋）或<b>不點交</b>（買方要自行處理占用人，所以價格更低）；共有人、承租人等可能有<b>優先承買權</b>。<span class="ez">點交＝法院幫你把房子清空交給你；不點交＝裡面的人要你自己想辦法處理，所以更便宜、風險更高。</span></li><li>法院製作<b>分配表</b>分配價金。<span class="ez">最後法院列一張表，照順序把錢分給大家。</span></li></ol><ul><li><b>無益執行</b>（強制執行法 §80-1）：如果拍賣價金扣除費用和優先債權後，聲請的債權人<b>分不到錢</b>，法院原則上不拍賣 → 後順位債權人不能隨便啟動法拍。<span class="ez">無益執行：如果拍賣後連聲請的人都分不到錢（錢全被前面的人拿走），法院就不拍。所以二胎很難自己發動法拍。</span></li></ul>',
    terms:[['foreclose','取消贖回權、法拍'],['judicial / nonjudicial foreclosure','訴訟／非訴訟法拍'],['strict foreclosure','嚴格法拍（不拍賣）'],['lis pendens','訴訟繫屬通知'],['notice of sale','拍賣公告'],['sheriff’s sale / trustee’s sale','法院／受託人拍賣'],['credit bid','以債權出價'],['upset price','最低拍賣價'],['REO','銀行承受的不動產'],['claims','各債權人的請求'],['protective advances','保全代墊款'],['surplus','剩餘款'],['點交／不點交','台灣法拍交屋'],['無益執行','後順位分不到錢時不拍賣']] },

  { id:'re1y', t:'Junior mortgages 與 HELOC：後順位在違約時的處境', en:'Junior mortgages and HELOCs in default and foreclosure',
    plain:'後順位貸款（二胎、home equity loan、HELOC）排在第一順位後面，房價下跌時第一個被犧牲：前順位法拍會把它塗銷，它只能從剩餘價金受償。所以後順位貸方有一套自保方法：要求通知、代繳前順位欠款、買下前順位債權、自己出價，或乾脆放棄房子、直接向借款人追討。',
    life:'排隊買限量球鞋，你排第二：如果第一位買走了最後一雙（前順位法拍），你就什麼都沒有。你可以幫第一位付錢請他讓你先買（代繳前順位）、乾脆跟他買下他的位置（買下前順位債權），或改去跟欠你的人要錢（追討本票）。',
    body: '<p class="ez lead">後順位（二胎、HELOC）的處境一句話：<b>排在後面，房子賣了常常輪不到它</b>。這張卡講後順位有哪些、前順位法拍時它會怎樣、它能怎麼自保，以及 HELOC 這種「用房子擔保的信用卡」有什麼特別的風險。</p><h4>後順位貸款有哪些</h4>'
      + reD('Junior mortgage 的種類', '二胎、home equity loan、piggyback', '都排在第一順位之後', [
          ['Second mortgage / home equity loan', '一次撥款、固定利率、分期攤還的二順位貸款。<span class="ez">一次借一筆、分期還，跟一般房貸很像，只是排第二。</span>'],
          ['HELOC', '循環額度的二順位貸款（見下方）。<span class="ez">先給你一個額度，要用才借、還了可以再借。</span>'],
          ['Piggyback loan', '買房時同時借第一順位和第二順位，例如 <b>80/10/10</b>（80% 第一順位、10% 二胎、10% 頭期款），用來避開 PMI；2008 年前很多，危機中違約率高。<span class="ez">買房時頭期款只付 10%，另外 10% 用二胎補上，這樣第一順位只借 80%，就不用買 PMI。問題是借款人幾乎沒出自己的錢，房價一跌就負權益。</span>'],
          ['Seller carryback second', '賣方提供的二順位融資（purchase-money）。<span class="ez">買方錢不夠，賣方說「差的部分我借你」，排在銀行後面。</span>'],
          ['特性', '利率較高、期限較短；貸方看<b>合計 LTV</b>（CLTV = 所有貸款 ÷ 房價）。<span class="ez">例：房價 1,000 萬、第一順位 700 萬、二胎 200 萬 → CLTV = 900 ÷ 1,000 = 90%。二胎銀行看的是這個數字，不只是自己借的 200 萬。</span>'] ])
      + '<h4>違約時 junior 的風險</h4>'
      + reD('被前順位法拍塗銷', 'Wiped out', 'Senior 法拍後，junior lien 消失', [
          ['規則', 'Senior 法拍時，被列為當事人並受通知的 junior lien 會被<b>塗銷</b>；junior 只能從<b>剩餘價金</b>受償。<span class="ez">第一順位發動法拍，二胎的 lien 會被清掉，只能拿前面拿剩的錢。</span>'],
          ['剩下什麼', 'Lien 消失後，junior 仍有 <b>note</b>（債權）：有追索權時可以向借款人追討，但變成<b>無擔保</b>債權（sold-out junior）。<span class="ez">Lien 沒了，但「借款人欠錢」這件事還在，二胎還是可以追借款人，只是沒有房子當保障了。</span>'],
          ['程序保護', 'Senior 若漏列 junior 為被告（omitted junior），junior 的 lien 不會被塗銷，senior 或買受人要重新處理（re-foreclosure）→ 所以 junior 要確保自己的 lien 有登記並可被通知；可以登記 <b>request for notice</b>（要求違約與拍賣通知）。<span class="ez">如果第一順位法拍時忘了通知二胎，二胎的 lien 就不會被清掉。所以二胎要確保自己有登記，還可以登記「請通知我」。</span>'] ])
      + reD('Junior 的自保方法', '後順位貸方能做什麼', '五種策略', [
          ['① 代繳前順位', '借款人沒付第一順位時，junior 替借款人<b>補繳</b>（cure the senior default），並把代墊金額加到自己的債權上 → 避免 senior 法拍。<span class="ez">最常用的方法：借款人沒繳第一順位，二胎先幫他繳，避免第一順位去法拍把自己清掉；幫忙繳的錢再加到借款人欠二胎的債上。</span>'],
          ['② 買下前順位債權', '向 senior 貸方買下 note 和 mortgage，自己掌握法拍的時機和方式。<span class="ez">乾脆把第一順位的債權買下來，自己變成第一順位。</span>'],
          ['③ 在 senior 法拍中出價', '出價到足以保護自己權益的價格（但要付現金給 senior）。<span class="ez">在法拍時自己出價，出到夠保護自己的價錢。</span>'],
          ['④ 自己發動法拍', 'Junior 也可以因借款人違約而法拍，但買受人取得的房子 <b>subject to</b> senior mortgage → 買方出價要扣掉 senior 的餘額；買到後通常要繼續付 senior 的款，否則 senior 會法拍。<span class="ez">二胎也可以自己法拍，但買到的房子還帶著第一順位的房貸。所以買方只會出「房價減掉第一順位」的價錢。</span>'],
          ['⑤ 不理房子，追討借款人', '負權益很深時，房子沒有剩餘價值可以給 junior，junior 常<b>不法拍</b>，而是轉銷呆帳、依 note 向借款人求償或賣給催收公司。<span class="ez">房價跌太深時，就算法拍也輪不到二胎，所以二胎乾脆不管房子，直接去追借款人或把債權賣掉。</span>'],
          ['契約條款', '<b>Cross-default clause</b>：第一順位違約也視為二胎違約，讓 junior 可以及早行動。<span class="ez">交叉違約：只要第一順位違約，二胎也算違約，二胎就能早點出手。</span>'] ])
      + reD('Junior 在 workout 中的角色', '後順位的同意權', '常卡住整個協商', [
          '<b>Short sale</b>：junior 要同意解除 lien，買方才能取得乾淨產權 → junior 會要求一筆錢才同意。<span class="ez">短售要二胎點頭，二胎會開條件：給我一點錢我才放手。</span>',
          '<b>Deed in lieu</b>：不會塗銷 junior，所以有 junior 時 senior 很難接受 deed in lieu。<span class="ez">以屋抵債清不掉二胎，所以第一順位銀行不太願意。</span>',
          '<b>第一順位修改或再融資</b>：若增加第一順位金額，需要 junior 簽 subordination agreement。<span class="ez">第一順位想多借，二胎要簽字同意讓它繼續排前面。</span>',
          '<b>破產</b>：Ch.13 中完全沒有擔保價值的 junior 可能被 strip off。<span class="ez">個人重整時，完全沒擔保到的二胎可能直接被拿掉抵押權。</span>' ])
      + '<h4>HELOC（Home equity line of credit）</h4>'
      + reD('HELOC 的結構', '房屋淨值循環額度', '像以房子擔保的信用卡', [
          ['Draw period', '動用期（常見 10 年）：可以隨時動用、還款後再動用；常常<b>只繳息</b>。<span class="ez">前 10 年想用就用、還了可以再借，而且通常只要繳利息。</span>'],
          ['Repayment period', '還款期（常見 10–20 年）：不能再動用，開始本息攤還 → 月付款可能<b>大幅增加</b>（payment shock）。<span class="ez">動用期結束後不能再借，而且要開始還本金，月付款會突然變多很多。</span>'],
          ['利率', '多為<b>浮動</b>：prime rate ＋ margin；利率上升時付款增加。<span class="ez">多半是浮動利率，利率漲，月付款就跟著漲。</span>'],
          ['法律結構', '以 open-end mortgage 擔保、依 <b>future advance</b> 條款撥款；多數州有法規讓追加撥款保有原本的順位。<span class="ez">法律上用「追加貸款條款」處理：以後每次動用的錢都由同一個抵押擔保，而且保有原順位。</span>'],
          ['順位', '通常是二順位；也可以是一順位（沒有房貸的屋主）。<span class="ez">房子沒有其他貸款的人，HELOC 就是第一順位。</span>'] ])
      + reD('HELOC 在違約與危機中', '風險', '房價下跌時，HELOC 最先受傷', [
          ['凍結或降低額度', '美國法規（Reg Z）允許貸方在<b>房價大幅下跌</b>或借款人<b>財務狀況重大惡化</b>時，凍結（freeze）或降低（reduce）未動用額度。2008 年很多銀行這樣做。<span class="ez">房價大跌或借款人狀況變差時，銀行可以把還沒用的額度凍結或調低。</span>'],
          ['借款人的行為', '財務惡化的借款人會在被凍結前<b>先把額度用完</b> → 違約時曝險（EAD）比平常的餘額高，這是信用額度的特殊風險（drawdown risk）。<span class="ez">問題是：快出事的人會搶在被凍結前把額度全部借光，所以違約時欠的錢比平常多很多。</span>'],
          ['損失', '作為二順位，房價下跌時 LGD 常接近 100%。<span class="ez">排第二，房價一跌常常一毛都拿不回來。</span>'],
          ['2008 年', 'HELOC 和 piggyback 讓很多屋主 CLTV 接近或超過 100%，房價一跌就負權益，也讓 loan modification 更難談。<span class="ez">很多屋主借了第一順位再借 HELOC，加起來超過房價。房價一跌就全部負權益。</span>'] ])
      + '<h4>台灣對照</h4><ul><li>二胎房貸：多由融資公司、民間或部分銀行承作，利率高；第一順位銀行通常是同一家才承作「增貸」。<span class="ez">台灣的二胎多半是融資公司做的，利率很高。</span></li><li><b>理財型房貸</b>（循環額度、按日計息）≈ HELOC，常以<b>最高限額抵押權</b>擔保。<span class="ez">台灣的「理財型房貸」就是 HELOC：用房子擔保一個額度，用多少算多少利息。</span></li><li>台灣法拍採<b>塗銷主義</b>：所有抵押權拍定後都消滅，依次序分配；後順位分不到錢時，法院依<b>無益執行</b>原則通常不准後順位單獨聲請拍賣。<span class="ez">台灣法拍後所有抵押權都清掉、照順序分錢；二胎如果分不到錢，法院通常不准它自己發動拍賣。</span></li></ul>',
    terms:[['junior / second mortgage','後順位／二胎'],['home equity loan','房屋淨值貸款'],['HELOC','房屋淨值循環額度'],['piggyback (80/10/10)','同時借一、二順位'],['CLTV','合計貸款成數'],['sold-out junior','被塗銷的後順位'],['request for notice','要求通知'],['cross-default clause','交叉違約條款'],['draw / repayment period','動用期／還款期'],['line freeze / reduction','凍結／降低額度'],['drawdown risk','違約前動用額度的風險'],['理財型房貸','台灣的 HELOC']] },

  { id:'re1z', t:'Right of redemption：Equity of redemption 與 Statutory right of redemption', en:'Equity of redemption and statutory redemption',
    plain:'贖回權是借款人「付錢把房子拿回來」的權利。Equity of redemption 在法拍完成之前，各州都有：付清全部債務就能保住房子。Statutory right of redemption 是部分州法律額外給的，在法拍之後一段期間內，付拍賣價（加利息費用）還能把房子買回來。',
    life:'你把手機押在當鋪：到期前付清就能拿回（equity of redemption）；有些地方規定，就算當鋪已經把手機賣掉，你在一個月內付賣價加手續費，還能買回來（statutory redemption）。',
    body: '<p class="ez lead">「贖回」＝借款人付錢把房子保住或買回來。有兩種：<b>拍賣前</b>付清全部債務（equity of redemption，每州都有），以及<b>拍賣後</b>在一段時間內用拍賣價買回（statutory redemption，只有部分州有）。最後的比較表加上 reinstatement 一起記。</p>' + reD('Equity of redemption', '衡平贖回權', '法拍完成前，付清全部就能保住房子', [
          ['時間', '從違約開始，到<b>拍賣完成</b>（或法院確認拍賣）為止。<span class="ez">從違約那天起，一直到拍賣完成之前都可以。</span>'],
          ['要付多少', '加速後：<b>全部</b>債務（UPB ＋ 應計利息 ＋ 費用）；和 reinstatement（只付欠款）不同。<span class="ez">要付「全部」欠款，不是只補欠的那幾期。例：欠 600 萬，就要拿出 600 萬加利息費用。</span>'],
          ['來源', '英國衡平法院（equity court）為了保護借款人而創設，所以叫 equity of redemption；各州<b>都有</b>。<span class="ez">這是很古老的保護，美國每一州都有。</span>'],
          ['Foreclose 的本意', 'Foreclose ＝ 「<b>取消</b>」（fore-close）這個贖回權。<span class="ez">有趣的字源：foreclosure 的意思就是「把贖回權關掉」。法拍完成，贖回權就沒了。</span>'],
          ['不能事先放棄', '放款時約定借款人放棄贖回權，或預先簽好移轉給貸方的 deed，都<b>無效</b>：<b>clogging the equity of redemption</b>（妨礙贖回權）。<span class="ez">借錢時就約好「我放棄贖回權」或「違約房子自動給你」都無效，因為借錢的人通常處於弱勢，法律不讓銀行趁機佔便宜。</span>'],
          ['實務', '借款人常以出售房子或再融資的方式行使（用新錢付清舊債）。<span class="ez">實際上很少人拿得出幾百萬現金，通常是把房子賣掉或找新貸款來還清。</span>'] ])
      + reD('Statutory right of redemption', '法定贖回權', '法拍之後，部分州仍可以買回', [
          ['時間', '拍賣<b>之後</b>一段法定期間，依州法從數個月到一年以上不等；約一半的州有。<span class="ez">拍賣「之後」，原屋主還有一段時間可以買回來，只有大約一半的州有。</span>'],
          ['要付多少', '通常是<b>拍賣價</b>（不是原本的債務）＋ 利息 ＋ 買受人的合理費用。<span class="ez">付的是拍賣價，不是原本欠的錢。例：欠 600 萬，拍賣只賣 400 萬，原屋主只要付 400 萬加利息費用就能買回。</span>'],
          ['誰可以贖回', '原借款人；部分州也允許 <b>junior lienholder</b> 贖回（以保護自己的權益）。<span class="ez">有些州二胎也可以用拍賣價買回房子，保護自己。</span>'],
          ['期間內的房子', '買受人拿到的是<b>附條件的權利</b>（certificate of sale），贖回期滿才取得 deed；期間內借款人有時仍可以住在房子裡。<span class="ez">買到法拍屋的人要等贖回期過了才真正拿到房子，這段期間原屋主可能還住在裡面。</span>'],
          ['目的', '防止拍賣價過低：如果拍賣價遠低於市價，借款人可以用拍賣價買回 → 逼買方出較合理的價格；也讓借款人有時間籌錢。<span class="ez">目的：防止房子被賤賣。如果買方出價太低，原屋主就可以用這個低價買回去，所以買方不敢亂出低價。</span>'],
          ['副作用', '買方要承擔「可能被贖回」的不確定性 → 出價更低、第三人更少參與，反而常由貸方 credit bid 得標；也延長了貸方取得房子的時間。<span class="ez">但反效果：買方怕被買回去，更不敢出價，結果常常是銀行自己得標，而且要等更久才拿到房子。</span>'],
          ['Nonjudicial 時', '部分州規定走 power of sale（非訴訟法拍）就<b>沒有</b> statutory redemption（作為交換：貸方放棄 deficiency）。<span class="ez">有些州是交換條件：銀行選擇不經法院的快速法拍，借款人就沒有拍賣後的贖回權，但銀行也不能追差額。</span>'] ])
      + reD('比較', 'Reinstatement vs 兩種贖回權', '時間點和金額', [
          '<b>Reinstatement</b>：加速後、拍賣前約 5 天；付<b>欠款＋費用</b>；貸款<b>繼續</b>。<span class="ez">只補欠的錢，貸款照舊繼續。</span>',
          '<b>Equity of redemption</b>：拍賣完成前；付<b>全部債務</b>；貸款<b>結束</b>、保住房子。<span class="ez">一次還清全部，貸款結束、房子保住。</span>',
          '<b>Statutory redemption</b>：拍賣<b>後</b>的法定期間；付<b>拍賣價</b>＋利息費用；從買受人手中<b>買回</b>。<span class="ez">房子已經被拍掉了，再用拍賣價買回來。</span>' ])
      + reD('延伸：稅捐拍賣的贖回', 'Tax sale redemption', '欠稅被拍賣後的贖回', [
          '欠繳房地產稅時，政府可以拍賣 <b>tax lien certificate</b> 或房子本身；屋主（和抵押權人）通常有一段贖回期，付清稅款、利息和罰款就能贖回。<span class="ez">欠房地產稅時政府也會拍賣，屋主一樣有一段時間可以付清稅款把房子贖回。</span>',
          '投資人買 tax lien certificate 賺取法定的高利息；如果屋主沒贖回，投資人可能取得房子。<span class="ez">投資人買的是「收這筆欠稅的權利」，屋主贖回時要付很高的利息給他；屋主不贖回，投資人就可能拿到房子。</span>',
          '這也是貸方要用 escrow 代繳稅的原因：tax sale 可能讓貸方的抵押被塗銷。<span class="ez">欠稅拍賣可能把銀行的抵押權一起清掉，這又是一個銀行要幫你代繳稅的理由。</span>' ])
      + '<h4>台灣對照</h4><ul><li>拍定<b>前</b>，債務人清償債務（含執行費用），可以請求撤銷執行 → 類似 equity of redemption。<span class="ez">台灣拍定前把錢還清，就能停止拍賣。</span></li><li>拍定<b>後</b>，台灣<b>沒有</b>法定贖回權：拍定人繳足價金、法院發給權利移轉證書，就取得所有權。<span class="ez">台灣拍賣後就沒有買回的機會了，買受人付清錢就拿到房子。</span></li><li>流抵約款：民法 §873-1 允許約定「債權屆期未受清償時，抵押物所有權移屬抵押權人」，但要<b>登記</b>才能對抗第三人，且抵押權人仍要<b>清算</b>：抵押物價值超過債權的部分要返還 → 避免妨礙贖回的不公平。<span class="ez">台灣允許「到期不還，房子歸銀行」的約定，但要登記，而且房子比欠款值錢的話，多的部分要還給屋主，不能讓銀行白賺。</span></li></ul>',
    terms:[['equity of redemption','衡平贖回權（拍賣前）'],['statutory right of redemption','法定贖回權（拍賣後）'],['clogging the equity of redemption','妨礙贖回權（無效）'],['certificate of sale','拍賣證明（贖回期內）'],['redemption period','贖回期間'],['tax lien certificate','欠稅 lien 憑證'],['流抵約款','台灣民法 §873-1']] },

  { id:'re1za', t:'Deficiency judgment：不足額判決與追索權', en:'Deficiency judgments, recourse and tax consequences',
    plain:'法拍賣得的錢不夠還債時，差額叫 deficiency。有追索權的貸款，貸方可以請法院判決借款人支付差額（deficiency judgment），再用扣薪、查封其他財產等方式追討。但很多州用法律限制它：有些不准、有些只能用房子的「公平價值」計算差額、有些要求只能用一次訴訟。被免除的差額還可能要繳所得稅。',
    life:'你押了一台相機借 3 萬，相機只拍賣到 2 萬：朋友可以再跟你要剩下的 1 萬（有追索權）；如果你們約定「拍賣完就兩清」（無追索權），差的 1 萬他就只能自己吞。',
    body: '<p class="ez lead">房子拍賣的錢不夠還債，差的那一塊叫 <b>deficiency</b>。銀行能不能再去追借款人要這筆錢？要看貸款是「有追索權」還是「無追索權」，以及各州的法律限制。最後還有一個常被忽略的問題：被免除的債可能要<b>繳稅</b>。</p>' + reD('Deficiency 怎麼算', '不足額', '債務總額 − 拍賣價（或公平價值）', [
          ['公式', 'Deficiency ＝ 貸方的 claim（UPB ＋ 應計利息 ＋ 代墊款 ＋ 法拍費用）− 拍賣價金（扣除前順位後貸方實際分到的金額）。<span class="ez">差額＝銀行該拿的全部（本金、利息、代墊、法拍費用）減掉拍賣後實際分到的錢。</span>'],
          ['例子', 'Claim 620 萬、拍賣價 450 萬（貸方 credit bid 得標）→ deficiency 170 萬。<span class="ez">例：銀行該拿 620 萬，拍賣只分到 450 萬，還差 170 萬。</span>'],
          ['Fair value 限制', '部分州規定差額要用房子的<b>公平市價</b>計算：若法院認定公平市價是 520 萬，deficiency 只有 620 − 520 = <b>100 萬</b>，避免貸方用低價 credit bid 買下房子再追討很大的差額。<span class="ez">防止銀行耍手段：銀行可以用很低的價格自己得標，再說「差很多，你要補」。所以有些州規定用房子的「合理市價」來算差額，而不是拍賣價。</span>'] ])
      + reD('程序', '怎麼取得與執行', '要有判決才能追', [
          ['Judicial foreclosure', '可以在法拍訴訟中<b>一併</b>請求 deficiency judgment。<span class="ez">經過法院的法拍，可以在同一個官司裡順便請求差額。</span>'],
          ['Nonjudicial foreclosure', '要另外起訴；部分州（例如加州）規定走非訴訟法拍後<b>不能</b>請求 deficiency。<span class="ez">不經法院的法拍要另外告；有些州乾脆不准。</span>'],
          ['期限', '許多州規定拍賣後要在短期間內（例如數個月）聲請，否則喪失權利。<span class="ez">銀行要在期限內提出，不然就不能追了。</span>'],
          ['執行', '取得判決後成為 <b>judgment lien</b>，可以查封借款人的其他財產、<b>扣薪</b>（wage garnishment）、扣銀行帳戶。<span class="ez">拿到判決後，銀行可以去查封借款人的其他財產、扣薪水。</span>'],
          ['實際回收', '違約的借款人常沒有其他財產（judgment-proof），或會聲請破產（Ch.7 免除個人責任）→ deficiency judgment 的實際價值常常不高，但能嚇阻策略性違約。<span class="ez">實際上常常追不到錢：違約的人通常也沒什麼其他財產，或乾脆去破產。但「會被追」這件事本身就能讓人不敢隨便違約。</span>'] ])
      + reD('Anti-deficiency 法規', '限制不足額判決', '保護借款人的州法', [
          ['Purchase-money 限制', '例如加州：購買<b>自住</b> 1–4 戶住宅的 purchase-money 貸款，法拍後<b>不能</b>追討差額 → 這類貸款實質上是<b>無追索權</b>。<span class="ez">加州的規定：買來自己住的房子，法拍後銀行不能追差額。</span>'],
          ['非訴訟法拍後禁止', '貸方選擇快速的 power of sale，就要放棄 deficiency（以速度換追索權）。<span class="ez">銀行選擇快速法拍，就要放棄追差額。</span>'],
          ['One-action rule', '部分州（例如加州）規定貸方只能提起<b>一個</b>訴訟，且必須<b>先就擔保品</b>（法拍）受償，不能跳過房子直接告借款人。<span class="ez">銀行一定要先拍賣房子，不能直接去追借款人的其他財產。</span>'],
          ['Fair value statutes', '如上，以公平價值而非拍賣價計算差額。<span class="ez">用合理市價來算差額。</span>'],
          ['影響', '研究發現，在不准 deficiency（實質無追索權）的州，借款人對負權益更敏感、違約率較高 → 呼應 rational default。<span class="ez">在不能追差額的州，違約的代價比較低，所以違約的人比較多。這正好驗證了「違約是一個選擇權」的想法。</span>'] ])
      + reD('Recourse vs Nonrecourse', '有追索權 vs 無追索權', '貸方能不能追到房子以外', [
          ['Recourse', '借款人以<b>全部財產</b>負責；房子不夠，貸方可以追其他財產。台灣房貸都是有追索權。<span class="ez">有追索權：房子不夠還，你其他的財產也要拿來還。</span>'],
          ['Nonrecourse', '貸方<b>只能</b>就擔保品受償，不能追借款人。來源：契約約定（商用貸款常見）或州法（anti-deficiency）。<span class="ez">無追索權：銀行只能拿房子，不能追你其他財產。</span>'],
          ['Carve-outs / bad-boy guarantee', '商用 nonrecourse 貸款在借款人有<b>詐欺、挪用租金、未經同意移轉、自行聲請破產、環境污染</b>等行為時，轉為有追索權（springing recourse），由保證人負責。<span class="ez">商用貸款雖然是無追索權，但借款人如果做壞事（詐欺、挪用租金、自己聲請破產等），就會「變成」有追索權。所以叫 bad-boy guarantee（壞孩子條款）。</span>'],
          ['定價', 'Nonrecourse 貸款的違約選擇權較有價值 → 貸方要求較低 LTV、較高利率。<span class="ez">無追索權時借款人違約的代價小，銀行風險大，所以借得少、利率高。</span>'] ])
      + reD('稅的後果', 'Cancellation of debt income', '被免除的債務可能要繳所得稅', [
          ['原則', '貸方免除（放棄追討）的債務，對借款人來說是<b>所得</b>（cancellation of debt, COD income），會收到 Form 1099-C。<span class="ez">美國稅法：銀行原諒你的債，等於你「賺到」這筆錢，可能要繳所得稅。</span>'],
          ['Recourse 貸款法拍', '視為以<b>公平市價</b>出售房子（計算資本利得／損失）；債務超過市價、被免除的部分 = COD income。<span class="ez">有追索權時，拆成兩部分：用市價賣房子（算買賣賺賠），加上被原諒的債（算收入）。</span>'],
          ['Nonrecourse 貸款法拍', '視為以<b>全部債務金額</b>出售房子，沒有 COD income（但可能有資本利得）。<span class="ez">無追索權時，當作用「全部欠款」的價格把房子賣掉，沒有被原諒的債，所以不會有這種收入。</span>'],
          ['排除規定', '破產中免除、<b>無力清償</b>（insolvency）範圍內的免除可以不課稅；自住房的債務免除曾有特別免稅規定（Mortgage Forgiveness Debt Relief Act，2007 年起多次延長，適用期間以最新稅法為準）。<span class="ez">例外：破產時被免除的、或本來就資不抵債的部分，可以不用繳稅；自住房也曾有特別免稅規定。</span>'],
          ['意涵', 'Short sale、deed in lieu、modification 的本金寬減，都可能產生 COD income → 借款人談 workout 時要考慮。<span class="ez">短售、以屋抵債、減免本金都可能產生這種「收入」，借款人要先想好稅的問題。</span>'] ])
      + '<h4>台灣對照</h4><ul><li>台灣房貸是<b>有追索權</b>：拍賣不足額時，法院發給<b>債權憑證</b>，銀行可以在之後隨時（時效中斷後重新起算）再對借款人的其他財產、薪資聲請強制執行。<span class="ez">台灣：拍賣不夠，法院發一張「債權憑證」，銀行可以拿著它，以後只要發現你有財產或薪水就去執行。</span></li><li>擺脫不足額債務的方式：與銀行協商、<b>消費者債務清理條例</b>的更生或清算（清算後法院裁定免責）。<span class="ez">台灣想擺脫差額：跟銀行協商，或走更生、清算。</span></li><li>台灣沒有 anti-deficiency 法規，所以借款人違約的成本比美國無追索權州高很多。<span class="ez">這就是為什麼台灣人很少「把房子丟給銀行就走」。</span></li></ul>',
    terms:[['deficiency','不足額'],['deficiency judgment','不足額判決'],['fair value statute','以公平價值計算'],['anti-deficiency statute','禁止或限制不足額判決的法律'],['one-action rule','單一訴訟原則'],['wage garnishment','扣薪'],['judgment-proof','沒有可執行的財產'],['recourse / nonrecourse','有／無追索權'],['carve-outs / springing recourse','例外轉為有追索權'],['COD income','債務免除所得'],['債權憑證','台灣拍賣不足額後的執行名義']] }
);

DATA.re.mcq.push(
  { u:'re1', q:'A borrower keeps making payments but lets the hazard insurance lapse and stops paying property taxes. This is a:', o:['monetary default','technical default','maturity default','strategic default'], a:1, e:'沒付本息以外的違約（稅、保險、維護、未經同意移轉）是 technical default。' },
  { u:'re1', q:'UPB (unpaid principal balance) excludes:', o:['scheduled principal not yet repaid','capitalized arrears after a modification','accrued but unpaid interest','the remaining original principal'], a:2, e:'UPB 只算本金（含被資本化的金額）；應計利息、費用另外加在 payoff amount 裡。' },
  { u:'re1', q:'Under the option view of mortgage default, a ruthless borrower defaults when the property value falls below:', o:['the original loan amount','the market value of the mortgage (remaining payments discounted at current rates) plus default costs','the purchase price','the property tax assessment'], a:1, e:'履約價是貸款的市場價值（不是 UPB）加上違約成本；利率上升時貸款市價下降，違約誘因變小。' },
  { u:'re1', q:'“Double trigger” default theory says default is most likely when:', o:['interest rates rise twice','negative equity combines with a liquidity shock such as job loss','both spouses sign the note','there are two mortgages'], a:1, e:'負權益＋流動性衝擊同時發生。' },
  { u:'re1', q:'Which workout permanently changes the loan terms (rate, term or principal)?', o:['Forbearance','Repayment plan','Loan modification','Cash for keys'], a:2, e:'Forbearance、repayment plan 是暫時的；modification 是永久修改。' },
  { u:'re1', q:'A key risk to a lender accepting a deed in lieu of foreclosure is that:', o:['the borrower keeps the property','junior liens remain on the property','the lender must pay a deficiency','the property tax lien is erased'], a:1, e:'Deed in lieu 是自願移轉，不會塗銷 junior lien；法拍（含 friendly foreclosure）才會。' },
  { u:'re1', q:'A lender prefers a “friendly foreclosure” over a deed in lieu mainly because foreclosure:', o:['is faster than any other option','eliminates junior liens and gives clearer title','avoids all legal costs','allows the borrower to keep the house'], a:1, e:'合意法拍仍是法律程序，可以塗銷 junior lien，也比較不會在破產中被撤銷。' },
  { u:'re1', q:'In a prepackaged bankruptcy, the debtor:', o:['liquidates all assets under Chapter 7','negotiates the plan and obtains creditor votes before filing Chapter 11','avoids court approval','must have the consent of every creditor'], a:1, e:'先談好、先投票再聲請；破產程序中每類債權人金額 2/3、人數過半同意即可約束反對者。' },
  { u:'re1', q:'The automatic stay in bankruptcy:', o:['cancels the mortgage lien','temporarily halts foreclosure and collection actions','gives the lender title immediately','applies only to unsecured creditors'], a:1, e:'聲請破產即自動停止催收和法拍；貸方可聲請 relief from stay。' },
  { u:'re1', q:'A second mortgage lender learns the borrower has stopped paying the first mortgage. To avoid being wiped out, the junior lender can:', o:['ignore it, since junior liens survive senior foreclosure','cure the senior default and add the amount to its own debt','demand that the senior lender subordinate','record a deed in lieu'], a:1, e:'代繳前順位欠款並加到自己的債權；也可以買下前順位債權或在法拍中出價。' },
  { u:'re1', q:'A buyer at a junior mortgage’s foreclosure sale acquires the property:', o:['free of all liens','subject to the senior mortgage','subject to the junior mortgage','only after statutory redemption by the senior lender'], a:1, e:'Junior 法拍不影響 senior lien，買方取得的房子仍附 senior mortgage。' },
  { u:'re1', q:'During the draw period of a HELOC, the lender may freeze or reduce the line if:', o:['the borrower pays on time','the property value declines significantly','interest rates fall','the borrower prepays'], a:1, e:'房價大幅下跌或借款人財務重大惡化時可以凍結或降低額度（2008 年常見）。' },
  { u:'re1', q:'The statutory right of redemption allows the borrower to:', o:['pay the arrears before acceleration','pay off the debt before the foreclosure sale','buy back the property after the foreclosure sale, usually for the sale price plus costs','avoid a deficiency judgment'], a:2, e:'法定贖回權在拍賣後；equity of redemption 在拍賣前、付全部債務。' },
  { u:'re1', q:'A clause in the original mortgage requiring the borrower to give up the right of redemption upon default is:', o:['enforceable in all states','unenforceable as a clog on the equity of redemption','a valid subordination clause','required by Fannie Mae'], a:1, e:'贖回權不能在放款時預先放棄（clogging the equity of redemption）。' },
  { u:'re1', q:'The claim of the first mortgagee in foreclosure typically includes:', o:['only the original loan amount','UPB, accrued interest, protective advances and allowable costs','only the unpaid installments','the junior lender’s balance'], a:1, e:'UPB ＋ 應計利息 ＋ 代墊稅與保險 ＋ 契約允許的費用。' },
  { u:'re1', q:'A “fair value” anti-deficiency statute limits the deficiency to:', o:['zero in all cases','the debt minus the property’s fair market value (not the sale price)','the sale price minus the debt','the junior lender’s claim'], a:1, e:'避免貸方用低價 credit bid 再追討很大的差額。' },
  { u:'re1', q:'When a recourse mortgage is foreclosed and the remaining debt is forgiven, the forgiven amount may be:', o:['taxable cancellation of debt income unless an exclusion applies','added to the property’s basis','treated as a capital gain only','ignored for tax purposes'], a:0, e:'Recourse：以公平市價計算出售，被免除的債務是 COD income（破產、無力清償等可排除）。' },
  { u:'re1', q:'依台灣法拍實務，拍賣不足清償時，銀行對剩餘債權：', o:['自動消滅','取得債權憑證，之後仍可對借款人其他財產強制執行','只能向保險公司請求','須在一個月內放棄'], a:1, e:'台灣房貸有追索權，拍賣不足額由法院發給債權憑證。' }
);
