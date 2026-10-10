// ===== 單元 1 補充（四）：違約、workout、破產、法拍與法拍之後（junior、贖回、不足額判決） =====
DATA.re.sections[0].cards.push(
  // ---------- 違約 ----------
  { id:'re1u', t:'Default 違約：定義、Monetary vs Technical default、UPB、違約的進程', en:'Mortgage default, technical default, UPB and delinquency',
    plain:'違約（default）是借款人沒有履行 note 或 mortgage 上的任何義務。最常見的是沒付錢（monetary default）；沒繳稅、沒保險、沒維護房子、未經同意賣房，則是 technical default。違約的嚴重程度用逾期天數追蹤（30、60、90 天以上），而損失大小從 UPB（未償本金餘額）開始算。',
    life:'租機車：沒付租金是「沒付錢的違約」；租金照付，但沒保險、把車借給別人騎、改裝排氣管，則是「技術性違約」。車行先看你欠幾期，再決定是提醒、催收還是收車。',
    body: '<h4>違約的定義與種類</h4>'
      + reD('Default', '違約', '沒有履行 note 或 mortgage 上的任何約定', [
          ['法律意義', '借款人違反契約上的<b>任何</b>義務（covenant），貸方就取得契約上的救濟權利：加速到期、法拍、指定管理人等。'],
          ['Delinquency vs default', '<b>Delinquency</b>（逾期）：付款晚了，是事實狀態；<b>default</b>（違約）：依契約定義已構成違約（例如逾期超過寬限期、通知後未補救），是法律狀態。考試常混用，但要知道差別。'],
          ['Event of default', '契約列出的違約事件：未付款、違反 covenant、陳述不實（loan application 造假）、破產、未經同意移轉、交叉違約（cross-default：其他貸款違約也算這筆違約）。'],
          ['貸方不一定要行動', '違約只是讓貸方<b>有權</b>行動；加速和法拍都是 optional（見第 4 組）。'] ])
      + reD('Monetary (payment) default', '付款違約', '沒按時付本息，最常見', [
          ['什麼算', '未付或少付每月本息、escrow；氣球式貸款（balloon）到期沒能清償。'],
          ['Term vs maturity default', '<b>Term default</b>：貸款期間沒付月付款；<b>maturity default</b>：到期時無法償還或再融資（balloon risk），商用貸款很常見，例如利率上升或房價下跌時借不到新錢。'] ])
      + reD('Technical default', '技術性違約', '錢照付，但違反其他約定', [
          ['常見情況', '沒繳房地產稅（tax lien 會排到房貸前面）、保險失效、毀損房子（waste）、未經同意出售或設定其他 lien（due-on-sale）、謊稱自住、不提供財務報表。'],
          ['商用貸款', '財務 covenant 未達標：<b>DSCR</b>（償債保障比率）低於約定值、LTV 超過上限、租約未經同意變更、主要承租人退租 → 常觸發 <b>cash management／cash sweep</b>（租金先進貸方控制的帳戶）而不是直接法拍。'],
          ['貸方怎麼處理', '技術性違約很少直接法拍，除非<b>擔保品受到威脅</b>；通常先通知補正，或由貸方代墊稅、保險（protection of lender’s security），再加到債務上。'] ])
      + '<h4>UPB：所有計算的起點</h4>'
      + reD('UPB (unpaid principal balance)', '未償本金餘額', '還沒還的本金', [
          ['怎麼算', 'UPB = 原始本金 − 已還本金（按期攤還＋提前還款）＋ 資本化的金額（modification 把欠款併入本金、負攤還）。<b>不含</b>應計利息和費用。'],
          ['Payoff amount', '要結清貸款要付的金額 = UPB ＋ 應計未付利息 ＋ 貸方代墊的稅與保險 ＋ late charge、律師費等。違約後 payoff 會比 UPB 大很多。'],
          ['用在哪裡', '<b>現時 LTV</b>（mark-to-market LTV）= UPB ÷ 目前房價；MBS 的 <b>pool factor</b> = 目前 UPB ÷ 原始 UPB；servicing fee 以 UPB 的百分比計；信用損失的 <b>EAD</b>（違約時曝險）。'],
          ['損失嚴重度（loss severity）', '例：UPB 600 萬、違約到拍賣期間的應計利息 30 萬、法拍律師費 20 萬、代墊稅與保險 15 萬、承受後持有與出售成本 40 萬，最後賣得 450 萬 → 損失 = 600 + 30 + 20 + 15 + 40 − 450 = <b>255 萬</b>，loss severity = 255 ÷ 600 = <b>42.5%</b>。'],
          ['預期損失', 'Expected loss = <b>PD</b>（違約機率）× <b>LGD</b>（違約損失率，即 loss severity）× <b>EAD</b>（約等於 UPB）。'],
          ['CFA 連結', 'Fixed Income：credit risk（PD、LGD、EL）、MBS 的 pool factor 和 loss severity。'] ])
      + '<h4>違約情況：逾期的進程</h4><div class="tblwrap"><table class="tbl"><tr><th>逾期</th><th>名稱</th><th>通常發生什麼</th></tr>'
      + '<tr><td>1–15 天</td><td>Grace period</td><td>不罰；過了寬限期收 late charge</td></tr>'
      + '<tr><td>30 天</td><td>30-day delinquent</td><td>電話、信件催繳；通報信用機構</td></tr>'
      + '<tr><td>60 天</td><td>60-day delinquent</td><td>servicer 要主動聯繫、說明 loss mitigation 選項</td></tr>'
      + '<tr><td>90 天以上</td><td><b>Seriously delinquent</b>（90+）</td><td>寄 notice of default／加速通知；銀行停止認列利息（nonaccrual）</td></tr>'
      + '<tr><td>120 天以上</td><td>Foreclosure 可啟動</td><td>美國聯邦法規原則上逾期 120 天後才能開始法拍程序</td></tr>'
      + '<tr><td>之後</td><td>In foreclosure → REO</td><td>拍賣；沒人買就由貸方承受</td></tr></table></div>'
      + reD('Delinquency migration (roll rates)', '逾期的移轉', '每個月有多少比例往下一階段惡化', [
          ['Roll rate', '本月 30 天逾期的貸款中，下個月變成 60 天逾期的比例；同理 60→90、90→foreclosure。也有往回走的 <b>cure rate</b>（補繳回到正常）。'],
          ['用途', '用移轉矩陣（transition matrix）預測未來的違約和損失，決定備抵呆帳和 MBS 的信用損失假設。'],
          ['觀察', '逾期越久，cure rate 越低；90 天以上的貸款大多不會自己回到正常 → 所以 servicer 越早介入越有效。'] ])
      + reD('為什麼會違約', '違約的原因', '付不起 vs 不想付', [
          ['付不起', '<b>流動性衝擊</b>：失業、收入減少、生病、離婚、利率重設造成付款暴增（payment shock，例如 ARM、只繳息期結束）。'],
          ['不想付', '房價跌到低於貸款（<b>negative equity / underwater</b>），繼續付款不划算 → rational / strategic default（下一張卡）。'],
          ['兩者同時', '<b>Double trigger</b>：負權益＋流動性衝擊同時發生時違約機率最高；只有其中一個，多數人會想辦法賣房或繼續付。'],
          ['放款時的因素', '高 LTV、高 DTI、低信用分數、文件不足（low-doc）、投資用而非自住、第二順位 → 違約率較高（2008 次貸的教訓）。'] ])
      + '<h4>台灣對照</h4><ul><li><b>逾期放款</b>：本金逾期 <b>3 個月</b>以上，或利息延滯 <b>6 個月</b>以上；之後轉列<b>催收款</b>，無法收回時<b>轉銷呆帳</b>。</li><li>延遲繳款會記錄在<b>聯徵中心</b>，影響之後借款。</li><li>台灣房貸逾放比很低（遠低於 1%），借款人違約多半先和銀行協商展延，最後才走法拍。</li></ul>',
    cfa:'Fixed Income：credit risk (PD, LGD) and MBS loss severity',
    terms:[['default / event of default','違約／違約事件'],['delinquency','逾期'],['monetary default','付款違約'],['technical default','技術性違約'],['term / maturity default','期中／到期違約'],['DSCR','償債保障比率'],['cash sweep','租金收入先歸貸方控制'],['UPB','未償本金餘額'],['payoff amount','結清金額'],['loss severity / LGD','損失嚴重度'],['seriously delinquent','逾期 90 天以上'],['roll rate / cure rate','惡化率／回復率'],['double trigger','負權益＋流動性衝擊'],['逾期放款／催收款／呆帳','台灣的違約分類']] },

  { id:'re1v', t:'Rational mortgage default：把違約看成一個賣權', en:'Rational (ruthless) default and the default option',
    plain:'從選擇權的角度，借款人手上有一個「賣權」：隨時可以停止付款，把房子交給貸方來抵銷債務。如果房子的價值低於貸款的價值，而且違約的成本不高，理性的借款人就會行使這個賣權，這叫 rational（ruthless）default。但現實中大部分人就算房價低於貸款也繼續付，因為違約成本很高。',
    life:'你用 3 萬買了一張演唱會票，後來同一場票價跌到 1 萬。如果你可以「把票交出去就不用付剩下的錢」，你會想退；但如果退票會被列入黑名單、以後買不到票，你可能還是會留著。',
    body: reD('Default option', '違約選擇權', '借款人擁有的賣權', [
          ['結構', '標的物：<b>房子</b>；履約價：<b>貸款的價值</b>（不還的債務）；借款人可以「賣」房子給貸方，換取免除債務。'],
          ['價內的條件', '房價 &lt; 貸款價值 → 賣權價內（in the money）。'],
          ['誰付權利金', '貸方承擔這個賣權，所以向借款人收取<b>信用風險溢酬</b>（較高利率、PMI、較低 LTV）。'],
          ['同時還有買權', '借款人也有<b>提前還款的買權</b>（prepayment option）：利率下跌時以 UPB 買回貸款。兩個選擇權互相影響：違約後就不能再提前還款，反之亦然。'],
          ['CFA 連結', 'MBS 的定價把借款人的提前還款（call）和違約（put）視為嵌入式選擇權。'] ])
      + reD('Rational / ruthless default', '理性違約', '只看財務，價內就行使', [
          ['判斷標準', '不是房價 &lt; <b>UPB</b>，而是房價 &lt; <b>貸款的市場價值</b>（剩餘付款以<b>目前市場利率</b>折現的現值）＋ 違約成本。'],
          ['算一次', 'UPB 800 萬、利率 3%、剩 25 年，每月付款約 3.79 萬。市場利率升到 7% 時，剩餘付款的現值只有約 <b>537 萬</b>。若房價跌到 700 萬：UPB 算的 LTV 是 114%（看起來 underwater），但房價 700 萬 &gt; 貸款市價 537 萬 → 理性借款人<b>不會</b>違約，因為這筆低利貸款對他很值錢。'],
          ['反過來', '市場利率下跌時貸款市價上升，同樣的房價下，違約誘因變大。'],
          ['Ruthless 的意思', '不考慮道德、信用、搬家成本，只要價內就違約；是學術模型的<b>極端假設</b>。'] ])
      + reD('違約成本', '為什麼多數人不違約', '交易成本讓履約價更高', [
          '<b>信用成本</b>：信用分數大跌，紀錄保留多年，之後借款、租屋、求職受影響。',
          '<b>搬家和找房</b>的成本、孩子轉學、社區關係。',
          '<b>追索權</b>：有追索權的州，貸方可以申請 deficiency judgment 追討差額 → 違約不能免除全部債務。',
          '<b>稅</b>：債務被免除的部分可能被課所得稅（cancellation of debt income，見 deficiency judgment 卡）。',
          '<b>道德與社會壓力</b>：多數人認為欠錢就該還。',
          '<b>期待房價回升</b>：保留房子等於保留房價上漲的機會（選擇權的時間價值）→ 稍微價內時，<b>等待</b>比立刻違約更有價值。' ])
      + reD('Strategic default', '策略性違約', '付得起但選擇不付', [
          ['定義', '借款人<b>有能力</b>付款，但因為負權益太大，選擇停止付款、讓房子被法拍（walk away、jingle mail）。'],
          ['何時多', '2008–2010 年房價大跌、負權益很深的地區；<b>無追索權</b>貸款、投資用房產、法拍時間很長（可以免費住很久）時更常見。'],
          ['和 rational default 的關係', 'Strategic default 是現實中的理性違約；但因為違約成本，借款人通常要負權益很深才會這樣做。'] ])
      + reD('對貸款定價與政策的意涵', '延伸', '貸方怎麼降低違約選擇權的價值', [
          '<b>LTV 上限</b>、頭期款：讓賣權離價外更遠。',
          '<b>追索權</b>、deficiency judgment：提高履約成本。',
          '<b>PMI／政府保險</b>：把賣權的風險轉給保險人。',
          '<b>Loan modification、本金寬減</b>：危機時把價內的賣權拉回價外，避免大量違約造成法拍潮（單元 9）。',
          '<b>台灣</b>：房貸有追索權，加上聯徵紀錄與社會觀念，策略性違約很少見。' ]),
    cfa:'Fixed Income：embedded options in mortgages',
    terms:[['default option','違約賣權'],['ruthless / rational default','理性違約'],['strategic default','策略性違約'],['negative equity / underwater','負權益'],['market value of the mortgage','貸款的市場價值（以市場利率折現）'],['walk away / jingle mail','放棄房子'],['transaction costs of default','違約成本']] },

  // ---------- Workout ----------
  { id:'re1i', t:'Loss mitigation 與 Workout：協議內容與各種方法', en:'Loss mitigation strategies, workout agreements and workout methods',
    plain:'法拍又慢又貴，所以借款人違約後，貸方通常先嘗試 workout：和借款人協議一個比法拍更好的解決方法。方法分兩類：讓借款人保住房子（暫緩、補繳計畫、修改貸款條件、再融資），或讓借款人有秩序地離開房子（出售、承接、短售、以屋抵債）。貸方用淨現值比較哪一個回收最多。',
    life:'同學欠你 1 萬還不出來：你可以讓他晚點還（forbearance）、分期還（repayment plan）、少收一點利息拉長期限（modification）；真的不行，請他把抵押的相機賣掉還你（short sale），或直接把相機給你（deed in lieu）。告上法院（法拍）是最後手段。',
    body: '<h4>Loss mitigation（損失減輕）策略</h4>'
      + reD('Loss mitigation', '損失減輕', '貸方／servicer 處理違約貸款的整體策略', [
          ['目標', '在<b>回收最多</b>的前提下處理違約：比較 workout 和 foreclosure 的預期淨回收。'],
          ['流程', '早期聯繫（early intervention）→ 收集借款人財務資料（loss mitigation application）→ 評估各選項 → 試行期 → 正式協議；美國法規禁止在完整申請審查期間同時推進法拍（dual tracking）。'],
          ['Waterfall', 'Servicer 依序評估：<b>保住房子</b>的方案（retention）優先，不可行才考慮<b>處分房子</b>的方案（disposition / liquidation）。'] ])
      + reD('NPV test', '淨現值測試', '修改貸款 vs 法拍，哪個回收多', [
          ['Workout 的價值', '修改後付款的現值 ×（1 − 再違約機率）＋ 再違約機率 × 之後法拍的回收現值。'],
          ['法拍的價值', '預期拍賣價 − 法拍與持有成本，以法拍所需時間折現。'],
          ['決策', 'NPV(workout) &gt; NPV(foreclosure) → 做 workout。美國 2009 年 HAMP 就要求 servicer 做這個測試。'],
          ['Redefault risk', '修改後再違約的比例不低，所以只降一點付款的修改常常無效；付款降幅越大，再違約率越低。'] ])
      + reD('為什麼 workout 不一定發生', '障礙', '證券化、二胎、道德風險', [
          '<b>證券化</b>：貸款在 MBS 裡，servicer 要遵守 pooling and servicing agreement（PSA）的限制，且 servicer 的報酬結構不一定鼓勵修改。',
          '<b>二胎（junior lien）</b>：修改或短售通常需要後順位貸方同意。',
          '<b>道德風險</b>：如果違約就能拿到更好的條件，可能鼓勵付得起的人也違約。',
          '<b>資訊不對稱</b>：貸方很難判斷借款人是真的付不起還是策略性違約。' ])
      + '<h4>Workout agreement（協議）裡寫什麼</h4>'
      + reD('Workout agreement', '協商／重整協議', '把新的安排寫成契約', [
          ['Pre-negotiation letter', '（商用貸款）協商<b>前</b>先簽：協商中的言行不構成新承諾、貸方不因協商而放棄任何權利、任何一方可隨時終止協商。'],
          ['確認債務與違約', '借款人承認債務金額、承認已違約、貸方的 lien 有效。'],
          ['新條件', '修改後的利率、期限、付款、還款計畫、試行期。'],
          ['借款人的讓步', '<b>放棄抗辯與求償</b>（release of claims，例如 lender liability）、提供更多擔保或保證、財務報告、cash management（租金進入貸方控制帳戶）。'],
          ['Standstill', '貸方在協議期間<b>暫停</b>法拍等行動。'],
          ['再違約的後果', '協議再被違反時，貸方可以立即採取行動（例如借款人同意不抗辯法拍、同意指定 receiver）。'],
          ['易錯點', '在<b>放款時</b>就約定「違約就把房子給貸方」是無效的（clogging the equity of redemption）；但違約<b>之後</b>協議的安排通常有效。'] ])
      + '<h4>Workout 方法：保住房子（retention）</h4>'
      + reD('Forbearance', '暫緩付款', '暫時少付或不付，之後補', [
          '適合暫時性困難（失業、生病、天災）；期間利息繼續累積。',
          '結束後以一次補繳、repayment plan、deferral 或 modification 處理欠款（細節見第 4 組 ④ 違約條款）。' ])
      + reD('Repayment plan', '補繳計畫', '把欠款分幾個月補', [
          '每月付款 = 原月付款 ＋ 欠款 ÷ 補繳月數（例如 6–12 個月）。',
          '適合收入已經恢復、只是要把欠的補上的人。' ])
      + reD('Loan modification / restructuring', '修改貸款條件', '永久改變條件，降低月付款', [
          ['Capitalization', '把逾期本息和費用<b>併入 UPB</b>，貸款恢復正常（current）。'],
          ['降低利率', '可能是永久，或先低後逐步調升（step-rate）。'],
          ['延長期限', '例如重新攤還為 40 年，降低每月付款。'],
          ['Principal forbearance', '一部分本金<b>不計息、延到最後</b>（出售或到期時才付），貸方沒有真的免除。'],
          ['Principal reduction / forgiveness', '真的<b>免除</b>部分本金；對負權益很深的借款人最有效（把違約賣權拉回價外），但貸方成本最高、有道德風險。'],
          ['HAMP 的順序（2009）', '依序：資本化 → 降利率（最低 2%）→ 延長期限（最長 40 年）→ 本金 forbearance，直到月付款降到月收入的 <b>31%</b>；先試行 3 個月。'],
          ['商用貸款的特殊作法', '<b>延長到期日</b>（extend and pretend）、<b>A/B note</b>（拆成可以支撐的 A note 和「希望票據」B note，B note 只在房子價值回升時才付）、要求借款人增資或部分還款、貸方分享未來增值（participation）。'] ])
      + reD('Refinance', '再融資', '用新貸款還舊貸款', [
          '借款人還有權益、利率下跌時可行；負權益時通常借不到（2009 年 HARP 例外地允許 underwater 的機構貸款再融資）。' ])
      + '<h4>Workout 方法：離開房子（disposition）</h4>'
      + reD('Transfer to a new owner / assumption', '轉給新屋主', '貸方同意買方承接', [
          '貸方同意<b>不行使 due-on-sale</b>，讓有能力的買方承接貸款（可能同時修改條件）。',
          '商用不動產常見：原借款人找新投資人接手，貸方審核新借款人。' ])
      + reD('Short sale / Deed in lieu / Friendly foreclosure', '短售、以屋抵債、合意法拍', '有秩序地把房子交出去', [
          '細節見下一張卡。' ])
      + reD('Prepackaged bankruptcy', '預先協商的破產重整', '先談好重整計畫，再聲請破產', [
          '細節見「破產」卡。' ])
      + '<h4>台灣對照</h4><ul><li>銀行常見的協商：<b>展延</b>期限、一段期間<b>只繳息不還本</b>、調降利率、分期補繳。</li><li><b>消費者債務清理條例</b>：與最大債權銀行<b>前置協商</b>，或向法院聲請<b>前置調解</b>；不成立再走<b>更生</b>或<b>清算</b>（見破產卡）。</li><li>天災、疫情時，金管會會請銀行提供<b>紓困展延</b>方案。</li></ul>',
    terms:[['loss mitigation','損失減輕'],['retention / disposition','保住房子／處分房子'],['NPV test','淨現值測試'],['redefault','再違約'],['dual tracking','協商與法拍同時進行'],['workout agreement','協商協議'],['pre-negotiation letter','協商前約定'],['standstill','暫停行動'],['repayment plan','補繳計畫'],['capitalization','欠款併入本金'],['principal forbearance','本金延後（不免除）'],['principal forgiveness','本金免除'],['A/B note','拆成可負擔與希望票據'],['extend and pretend','延長到期日']] },

  { id:'re1w', t:'交出房子的方式：Deed in lieu、Short sale、Friendly foreclosure、Cash for keys', en:'Deed in lieu of foreclosure, short sale and friendly foreclosure',
    plain:'借款人保不住房子時，不一定要走完整的法拍。可以自願把房子的所有權直接移轉給貸方（deed in lieu of foreclosure），可以經貸方同意以低於貸款餘額的價格賣掉（short sale），也可以同意不抗辯、讓法拍快速完成（friendly foreclosure）。每一種對貸方和借款人的風險都不一樣，尤其是後順位 lien 會不會消失。',
    life:'欠朋友錢還不出來：直接把抵押的腳踏車交給他（deed in lieu）；或經他同意把車賣掉、賣多少給他多少（short sale）；或者兩個人一起去找班導當公證人處理（friendly foreclosure），這樣其他也押了這台車的人也會被處理掉。',
    body: reD('Deed in lieu of foreclosure（voluntary conveyance）', '以屋抵債', '借款人自願把所有權移轉給貸方', [
          ['怎麼做', '借款人簽 deed 把房子移轉給貸方，貸方<b>免除</b>（全部或部分）債務。'],
          ['借款人的好處', '比法拍快、隱私較好、信用傷害較小；可以談判<b>放棄 deficiency</b>、搬遷補助。'],
          ['貸方的好處', '省下法拍的時間和費用、房子較少閒置毀損、可以較快出售。'],
          ['貸方的風險 ①：junior lien 不會消失', '這是<b>自願移轉</b>，不是法拍，所以後順位 lien、判決 lien、mechanic’s lien 都<b>仍然附在房子上</b>，貸方取得的是 subject to 這些 lien 的房子 → 貸方一定要先做 <b>title search</b>，有 junior lien 時通常改走法拍。'],
          ['貸方的風險 ②：可能被撤銷', '借款人如果在之後不久聲請破產，這個移轉可能被認定為<b>偏頗清償</b>（preference）或<b>詐害移轉</b>（fraudulent conveyance，例如房子價值遠高於債務）而被撤銷。'],
          ['貸方的風險 ③：merger', '貸方同時是抵押權人和所有權人時，抵押可能<b>混同</b>（merger）而消滅，使貸方失去對抗 junior lien 的順位 → 契約要寫明不混同（estoppel affidavit、non-merger clause）。'],
          ['必須是自願的', '要有對價、借款人真正同意；<b>放款時</b>預先約定的 deed in lieu 無效（clogging the equity of redemption）。'],
          ['稅', '視為以「被免除的債務」出售房子；免除的金額超過房價部分可能是應稅的債務免除所得（見 deficiency judgment 卡）。'] ])
      + reD('Short sale (pre-foreclosure sale)', '短售', '以低於貸款餘額的價格出售', [
          ['怎麼做', '借款人找買方，貸方審核價格（常要求 <b>BPO</b>，broker price opinion，或估價），同意<b>以售價全額清償</b>並解除 lien。'],
          ['算一次', 'UPB 500 萬、售價 420 萬、出售費用 25 萬 → 貸方實收 395 萬，損失 105 萬（加上應計利息）。'],
          ['Deficiency', '協議要寫明貸方是否<b>放棄追討差額</b>；沒寫的話，有追索權的州貸方仍可追。'],
          ['Junior lien', '要後順位貸方<b>同意解除</b> lien，買方才能取得乾淨產權；後順位通常只拿到一小筆錢（因為它在法拍中可能什麼都拿不到）。'],
          ['和法拍比', '市場出售的價格通常<b>高於</b>法拍價，且房子不會空置 → 貸方的損失通常較小。'] ])
      + reD('Friendly foreclosure', '合意法拍', '借款人同意不抗辯，讓法拍快速完成', [
          ['怎麼做', '借款人和貸方協議：借款人不提出抗辯、配合程序（例如同意判決），貸方通常放棄 deficiency 或提供其他補償。'],
          ['為什麼不用 deed in lieu', '法拍是法律程序，可以<b>塗銷 junior lien</b>，並取得法院確認的乾淨產權；也比較不會被破產程序撤銷。'],
          ['缺點', '仍要負擔法拍的程序時間和費用，只是比對抗式法拍快。'] ])
      + reD('Cash for keys', '搬遷補助', '付錢請住戶搬走', [
          '貸方付一筆錢給借款人（或住戶），換取在約定日期前<b>搬離</b>並保持房子良好狀態。',
          '比走驅逐程序（eviction）便宜、快速，房子也比較不會被破壞。' ])
      + reD('比較', '四種方法對照', '重點是 junior lien 和 deficiency', [
          '<b>Junior lien 會消失？</b> 法拍（含 friendly）：會；deed in lieu：<b>不會</b>；short sale：要 junior 同意解除。',
          '<b>速度</b>：deed in lieu、short sale 最快；friendly foreclosure 次之；對抗式法拍最慢。',
          '<b>出售價格</b>：short sale（市場出售）通常最高；法拍價最低。',
          '<b>Deficiency</b>：都可以在協議中放棄；沒有放棄時，有追索權的貸方仍可追討。' ])
      + '<h4>台灣對照</h4><ul><li><b>代物清償</b>（民法 §319）：債權人受領他種給付以代原定給付時，債之關係消滅 → 相當於 deed in lieu。實務上銀行較少接受，多走法拍。</li><li>借款人自行出售房子，以價金還銀行、銀行同意塗銷抵押權（價金不足時另外協商）→ 類似 short sale。</li></ul>',
    terms:[['deed in lieu of foreclosure','以屋抵債'],['voluntary conveyance','自願移轉'],['preference / fraudulent conveyance','偏頗清償／詐害移轉'],['merger','混同'],['short sale','短售'],['BPO','經紀人估價'],['friendly foreclosure','合意法拍'],['cash for keys','搬遷補助'],['代物清償','台灣的以物抵債']] },

  { id:'re1x', t:'破產與 Prepackaged bankruptcy', en:'Bankruptcy and prepackaged bankruptcy',
    plain:'借款人聲請破產時，法律會自動暫停所有討債行動，包括法拍（automatic stay）。不同的破產章節對房貸的影響不同：清算（Ch.7）免除個人債務但抵押還在；個人重整（Ch.13）可以分期補繳欠款保住房子；企業重整（Ch.11）甚至可以強制修改貸款條件。Prepackaged bankruptcy 是先和債權人談好重整計畫，再聲請破產讓法院快速核准。',
    life:'班上一群同學都在跟你討債，你去找學務處：學務處先叫大家暫停討債（automatic stay），再決定你是賣掉東西清償（清算），還是訂一個分期還款計畫（重整）。如果你事先就跟大部分債主談好計畫，學務處很快就能蓋章（prepackaged）。',
    body: reD('Automatic stay', '自動停止', '聲請破產的瞬間，法拍暫停', [
          ['內容', '破產聲請一提出，所有債權人的催收、訴訟、法拍<b>自動暫停</b>，不需要法院另外命令。'],
          ['對貸方的影響', '法拍延後、利息和費用繼續累積、房子可能惡化。'],
          ['Relief from stay', '貸方可以聲請解除暫停，例如：債務人<b>沒有權益</b>且房子對重整不是必要、擔保權益沒有受到<b>充分保護</b>（adequate protection，例如房價持續下跌、沒繳保險）。'],
          ['SARE', '<b>Single asset real estate</b>（只有一筆不動產的公司）：聲請後約 90 天內，債務人要提出可行的重整計畫或開始支付利息，否則貸方可以解除暫停。'] ])
      + reD('Chapter 7（liquidation）', '清算', '免除個人責任，但 lien 還在', [
          '受託人變賣非豁免財產分配給債權人；債務人的<b>個人責任被免除</b>（discharge）。',
          '但抵押 lien <b>不會</b>因此消失：貸方仍可以在 stay 解除後法拍房子，只是不能再追 deficiency。',
          '常被用來阻止 deficiency judgment。' ])
      + reD('Chapter 13（individual reorganization）', '個人債務重整', '分 3–5 年補繳，保住自住房', [
          ['Cure and maintain', '在重整計畫期間<b>分期補繳</b>欠款，同時照常付每月房貸 → 保住房子。'],
          ['Anti-modification', '自住房的<b>第一順位</b>房貸條件<b>不能</b>被法院修改（不能降本金、利率）。'],
          ['Lien strip-off', '若房價低於第一順位房貸餘額，<b>完全沒有擔保價值</b>的二胎／HELOC 可以被視為無擔保債權（strip off）→ 對 junior lien 是重大風險。Ch.7 不行。'] ])
      + reD('Chapter 11（reorganization）', '重整', '企業（含不動產公司）的重整，可以 cramdown', [
          ['Debtor in possession', '債務人繼續經營、管理房產，提出重整計畫。'],
          ['Cramdown', '只要符合法定條件（例如給有擔保債權人的現金流現值不低於擔保品價值），即使有擔保債權人<b>反對</b>，法院也可以核准計畫：貸款被拆成<b>有擔保</b>（＝擔保品價值）和<b>無擔保</b>（差額）兩部分，並可能改利率、延期限。'],
          ['對商用貸方', '這是商用不動產貸款最大的法律風險之一 → 貸款結構會用 <b>bankruptcy-remote SPE</b>（破產隔離的特殊目的公司）、獨立董事、<b>bad-boy guarantee</b>（借款人自行聲請破產時保證人負全部責任）來降低。'] ])
      + reD('Prepackaged bankruptcy', '預先協商的破產重整', '先談好、先投票，再聲請', [
          ['怎麼做', '債務人在聲請 Chapter 11 <b>之前</b>就和主要債權人談好重整計畫，並<b>完成投票</b>；聲請後法院很快召開確認聽證，通常幾個月內完成。'],
          ['為什麼要走破產', '庭外協議需要<b>所有</b>債權人同意；破產程序中只要每一類受影響的債權人中，<b>金額 2/3 以上且人數過半</b>同意，就能約束反對的少數（holdout），還能使用 cramdown、automatic stay。'],
          ['好處', '時間短、成本低、營運干擾小、比傳統 Ch.11 更可預測。'],
          ['Pre-negotiated 的差別', '<b>Pre-negotiated</b>：聲請前談好主要條款，但聲請<b>後</b>才投票；<b>prepackaged</b>：聲請前就投完票。'],
          ['在不動產的應用', '擁有多筆不動產、多個貸方的開發商或 REIT，用 prepack 一次重組所有債務；也是 workout 的一種，介於庭外協議和傳統破產之間。'] ])
      + '<h4>台灣對照</h4><ul><li><b>消費者債務清理條例</b>（個人）：<ul><li><b>前置協商</b>（與最大債權銀行）或<b>前置調解</b>（法院）→ 不成立再聲請：</li><li><b>更生</b>：無擔保或無優先權債務總額在一定金額以下、有固定收入者，提出更生方案分期清償（原則 6 年內）；可以和抵押權人協商住宅借款的特別條款以<b>保住自住房</b>。</li><li><b>清算</b>：變賣財產分配，之後法院裁定是否<b>免責</b>。</li></ul></li><li>抵押權在更生、清算中屬於<b>別除權</b>：可以不依程序，直接就抵押物優先受償。</li><li><b>公司重整</b>（公司法 §282 以下）：類似 Ch.11，重整期間停止強制執行；有擔保債權也要依重整計畫受償。</li></ul>',
    terms:[['automatic stay','自動停止'],['relief from stay','解除暫停'],['adequate protection','充分保護'],['Chapter 7 / 11 / 13','清算／重整／個人重整'],['discharge','免責'],['cramdown','強制核准重整計畫'],['lien strip-off','剝除無擔保價值的 lien'],['bankruptcy-remote SPE','破產隔離公司'],['bad-boy guarantee','惡意行為保證'],['prepackaged bankruptcy','預先協商並投票的重整'],['holdout','反對的少數債權人'],['更生／清算／別除權','台灣消債條例']] },

  // ---------- 法拍 ----------
  { id:'re1o', t:'Foreclosure：法拍的種類、完整流程與 Claims 的分配', en:'Foreclosure: types, process, sale and claims',
    plain:'Foreclosure 是貸方在借款人違約後，透過法律程序拍賣房子、用價金清償債務，並終止借款人贖回房子的權利。可以經過法院（judicial），也可以依契約的出售權不經法院（nonjudicial）。拍賣價金依各債權的順位分配，貸方的 claim 不只本金，還包括利息、代墊款和費用。',
    life:'就像學校處理欠繳的社費：先寄提醒（notice of default）、宣布全部一次繳清（acceleration）、在公告欄公告後把抵押的東西拍賣，賣得的錢先付拍賣的花費和學校的欠款，再依登記順序還給債主，剩下的才退給你。',
    body: '<h4>Foreclosure 的種類</h4>'
      + reD('Judicial foreclosure', '訴訟法拍', '經過法院，各州都可以用', [
          ['流程', '貸方起訴 → 登記 <b>lis pendens</b> → 通知借款人和所有 junior lienholder 列為被告 → 法院判決（foreclosure decree）→ 由法院人員（sheriff）公開拍賣 → 部分州要法院<b>確認</b>拍賣（confirmation）。'],
          ['特點', '時間長（常超過一年）、成本高；但產權最乾淨，<b>deficiency judgment</b> 可以在同一程序中取得。'],
          ['常見於', '紐約、紐澤西、佛州等採用 mortgage（而非 deed of trust）的州。'] ])
      + reD('Nonjudicial foreclosure (power of sale)', '非訴訟法拍', '依契約的出售權，不經法院', [
          ['流程', '記錄 notice of default → 法定等待期 → 公告 <b>notice of sale</b>（刊登、張貼）→ 受託人（trustee）公開拍賣（<b>trustee’s sale</b>）。'],
          ['特點', '快、便宜；但部分州規定走非訴訟法拍就<b>不能</b>再請求 deficiency（例如加州）。借款人若要抗辯，必須自己去法院聲請停止拍賣。'],
          ['常見於', '使用 deed of trust 的州（加州、德州等）。'] ])
      + reD('Strict foreclosure', '嚴格法拍', '不拍賣，法院直接把所有權給貸方', [
          '法院定一個期限讓借款人付清；期限一過，借款人的贖回權消滅，<b>所有權直接歸貸方</b>，沒有拍賣。',
          '只有少數州使用（例如康乃狄克、佛蒙特），多數州認為對借款人太嚴苛，因為房子價值可能遠高於債務。' ])
      + reD('Foreclosure by entry and possession', '以進入占有法拍', '少數 title theory 州', [
          '貸方和平進入並占有房子，經過法定期間後取得所有權（例如麻州、緬因州）。' ])
      + '<h4>完整流程</h4><ol><li><b>Default</b> → <b>notice of default</b>、cure period。</li><li><b>Loss mitigation</b> 評估（見 workout 卡）。</li><li><b>Acceleration</b>：宣告全部到期。</li><li>啟動法拍：judicial（起訴、lis pendens）或 nonjudicial（notice of sale）。</li><li>借款人仍可以 <b>reinstate</b>（拍賣前約 5 天）或以 <b>equity of redemption</b> 付清全部。</li><li><b>Foreclosure sale</b>（拍賣）。</li><li><b>Distribution of proceeds</b>：依 claims 的順位分配。</li><li>買受人取得 <b>sheriff’s deed／trustee’s deed</b>；沒人出價時成為 <b>REO</b>。</li><li>之後：<b>statutory redemption</b>（部分州）、<b>deficiency judgment</b>、驅逐（eviction）或 cash for keys。</li></ol>'
      + '<h4>Foreclosure sale（拍賣）的細節</h4>'
      + reD('Foreclosure sale', '拍賣', '公開競價，貸方可以用債權出價', [
          ['Credit bid', '貸方可以用自己的債權金額出價，<b>不用付現金</b>，最高到它的 claim。其他買方要付現金（常要當場付保證金）。'],
          ['常見結果', '多數法拍沒有第三人出更高價，貸方以 credit bid 得標 → 房子成為 <b>REO</b>，再由貸方整修、出售。'],
          ['為什麼法拍價低', '房子現況出售（as is）、通常不能進屋看、可能還有人住、產權風險、要付現金、部分州有 statutory redemption 期間 → 買方會壓低價格。'],
          ['Upset price', '部分州或法院設定最低拍賣價，價格過低時法院可以拒絕確認拍賣。'],
          ['剩餘款（surplus）', '價金清償所有 claims 後還有剩，依序給 junior lienholder，最後給原屋主。'] ])
      + '<h4>Claims：價金怎麼分</h4>'
      + reD('Claims', '各債權人的請求', '誰可以從價金分錢、可以分多少', [
          ['順序', '① 拍賣與法拍費用 → ② 房地產稅、特別課徵 → ③ 第一順位房貸 → ④ 後順位 lien（依登記先後）→ ⑤ 剩餘給原屋主。無擔保債權人<b>不能</b>直接從法拍價金分配（除非已取得 judgment lien）。'],
          ['第一順位貸方的 claim', 'UPB ＋ 應計未付利息（可能是違約利率）＋ late charges ＋ 代墊的稅、保險、維修（protective advances）＋ 律師費和法拍費用（契約有約定時）。'],
          ['Junior 的 claim', '同樣是本金＋利息＋費用，但只能從前順位全部清償後的<b>剩餘</b>中受償。'],
          ['算一次', '拍賣價 700 萬。費用 30 萬、欠稅 20 萬、第一順位 claim 550 萬（UPB 500 ＋利息 30 ＋代墊 20）、HELOC claim 150 萬 → 第一順位全額，HELOC 只拿到 700 − 30 − 20 − 550 = <b>100 萬</b>，不足 50 萬 lien 被塗銷，變成無擔保債權；原屋主 0。'],
          ['Prepayment penalty', '加速到期後貸方能不能再收提前清償違約金，依契約和州法而定（很多州不允許，除非契約明確約定）。'] ])
      + '<h4>成本與時間</h4><ul><li>成本：律師與法院費用、應計利息、房子閒置損壞、REO 持有與出售費用、拍賣折價 → 貸方的 loss severity 常很高。</li><li>時間：judicial 州通常比 nonjudicial 州久很多；時間越長，借款人「免費住」越久，策略性違約誘因越大。</li><li>所以貸方常偏好 workout、short sale、deed in lieu。</li></ul>'
      + '<h4>台灣的法拍程序</h4><ol><li>抵押權人聲請法院<b>拍賣抵押物裁定</b>（非訟程序，取得執行名義）。</li><li>聲請<b>強制執行</b> → 法院<b>查封</b>、<b>鑑價</b>、定底價。</li><li>第一次拍賣；未拍定時<b>減價</b>拍賣（每次減價不得超過 20%），最多到第三次。</li><li>第三次仍未拍定 → <b>特別變賣程序</b>（公告期間內依底價應買）；抵押權人也可以聲請<b>承受</b>（類似 REO）。</li><li>拍定後：<b>點交</b>（法院負責交屋）或<b>不點交</b>（買方要自行處理占用人，所以價格更低）；共有人、承租人等可能有<b>優先承買權</b>。</li><li>法院製作<b>分配表</b>分配價金。</li></ol><ul><li><b>無益執行</b>（強制執行法 §80-1）：如果拍賣價金扣除費用和優先債權後，聲請的債權人<b>分不到錢</b>，法院原則上不拍賣 → 後順位債權人不能隨便啟動法拍。</li></ul>',
    terms:[['foreclose','取消贖回權、法拍'],['judicial / nonjudicial foreclosure','訴訟／非訴訟法拍'],['strict foreclosure','嚴格法拍（不拍賣）'],['lis pendens','訴訟繫屬通知'],['notice of sale','拍賣公告'],['sheriff’s sale / trustee’s sale','法院／受託人拍賣'],['credit bid','以債權出價'],['upset price','最低拍賣價'],['REO','銀行承受的不動產'],['claims','各債權人的請求'],['protective advances','保全代墊款'],['surplus','剩餘款'],['點交／不點交','台灣法拍交屋'],['無益執行','後順位分不到錢時不拍賣']] },

  { id:'re1y', t:'Junior mortgages 與 HELOC：後順位在違約時的處境', en:'Junior mortgages and HELOCs in default and foreclosure',
    plain:'後順位貸款（二胎、home equity loan、HELOC）排在第一順位後面，房價下跌時第一個被犧牲：前順位法拍會把它塗銷，它只能從剩餘價金受償。所以後順位貸方有一套自保方法：要求通知、代繳前順位欠款、買下前順位債權、自己出價，或乾脆放棄房子、直接向借款人追討。',
    life:'排隊買限量球鞋，你排第二：如果第一位買走了最後一雙（前順位法拍），你就什麼都沒有。你可以幫第一位付錢請他讓你先買（代繳前順位）、乾脆跟他買下他的位置（買下前順位債權），或改去跟欠你的人要錢（追討本票）。',
    body: '<h4>後順位貸款有哪些</h4>'
      + reD('Junior mortgage 的種類', '二胎、home equity loan、piggyback', '都排在第一順位之後', [
          ['Second mortgage / home equity loan', '一次撥款、固定利率、分期攤還的二順位貸款。'],
          ['HELOC', '循環額度的二順位貸款（見下方）。'],
          ['Piggyback loan', '買房時同時借第一順位和第二順位，例如 <b>80/10/10</b>（80% 第一順位、10% 二胎、10% 頭期款），用來避開 PMI；2008 年前很多，危機中違約率高。'],
          ['Seller carryback second', '賣方提供的二順位融資（purchase-money）。'],
          ['特性', '利率較高、期限較短；貸方看<b>合計 LTV</b>（CLTV = 所有貸款 ÷ 房價）。'] ])
      + '<h4>違約時 junior 的風險</h4>'
      + reD('被前順位法拍塗銷', 'Wiped out', 'Senior 法拍後，junior lien 消失', [
          ['規則', 'Senior 法拍時，被列為當事人並受通知的 junior lien 會被<b>塗銷</b>；junior 只能從<b>剩餘價金</b>受償。'],
          ['剩下什麼', 'Lien 消失後，junior 仍有 <b>note</b>（債權）：有追索權時可以向借款人追討，但變成<b>無擔保</b>債權（sold-out junior）。'],
          ['程序保護', 'Senior 若漏列 junior 為被告（omitted junior），junior 的 lien 不會被塗銷，senior 或買受人要重新處理（re-foreclosure）→ 所以 junior 要確保自己的 lien 有登記並可被通知；可以登記 <b>request for notice</b>（要求違約與拍賣通知）。'] ])
      + reD('Junior 的自保方法', '後順位貸方能做什麼', '五種策略', [
          ['① 代繳前順位', '借款人沒付第一順位時，junior 替借款人<b>補繳</b>（cure the senior default），並把代墊金額加到自己的債權上 → 避免 senior 法拍。'],
          ['② 買下前順位債權', '向 senior 貸方買下 note 和 mortgage，自己掌握法拍的時機和方式。'],
          ['③ 在 senior 法拍中出價', '出價到足以保護自己權益的價格（但要付現金給 senior）。'],
          ['④ 自己發動法拍', 'Junior 也可以因借款人違約而法拍，但買受人取得的房子 <b>subject to</b> senior mortgage → 買方出價要扣掉 senior 的餘額；買到後通常要繼續付 senior 的款，否則 senior 會法拍。'],
          ['⑤ 不理房子，追討借款人', '負權益很深時，房子沒有剩餘價值可以給 junior，junior 常<b>不法拍</b>，而是轉銷呆帳、依 note 向借款人求償或賣給催收公司。'],
          ['契約條款', '<b>Cross-default clause</b>：第一順位違約也視為二胎違約，讓 junior 可以及早行動。'] ])
      + reD('Junior 在 workout 中的角色', '後順位的同意權', '常卡住整個協商', [
          '<b>Short sale</b>：junior 要同意解除 lien，買方才能取得乾淨產權 → junior 會要求一筆錢才同意。',
          '<b>Deed in lieu</b>：不會塗銷 junior，所以有 junior 時 senior 很難接受 deed in lieu。',
          '<b>第一順位修改或再融資</b>：若增加第一順位金額，需要 junior 簽 subordination agreement。',
          '<b>破產</b>：Ch.13 中完全沒有擔保價值的 junior 可能被 strip off。' ])
      + '<h4>HELOC（Home equity line of credit）</h4>'
      + reD('HELOC 的結構', '房屋淨值循環額度', '像以房子擔保的信用卡', [
          ['Draw period', '動用期（常見 10 年）：可以隨時動用、還款後再動用；常常<b>只繳息</b>。'],
          ['Repayment period', '還款期（常見 10–20 年）：不能再動用，開始本息攤還 → 月付款可能<b>大幅增加</b>（payment shock）。'],
          ['利率', '多為<b>浮動</b>：prime rate ＋ margin；利率上升時付款增加。'],
          ['法律結構', '以 open-end mortgage 擔保、依 <b>future advance</b> 條款撥款；多數州有法規讓追加撥款保有原本的順位。'],
          ['順位', '通常是二順位；也可以是一順位（沒有房貸的屋主）。'] ])
      + reD('HELOC 在違約與危機中', '風險', '房價下跌時，HELOC 最先受傷', [
          ['凍結或降低額度', '美國法規（Reg Z）允許貸方在<b>房價大幅下跌</b>或借款人<b>財務狀況重大惡化</b>時，凍結（freeze）或降低（reduce）未動用額度。2008 年很多銀行這樣做。'],
          ['借款人的行為', '財務惡化的借款人會在被凍結前<b>先把額度用完</b> → 違約時曝險（EAD）比平常的餘額高，這是信用額度的特殊風險（drawdown risk）。'],
          ['損失', '作為二順位，房價下跌時 LGD 常接近 100%。'],
          ['2008 年', 'HELOC 和 piggyback 讓很多屋主 CLTV 接近或超過 100%，房價一跌就負權益，也讓 loan modification 更難談。'] ])
      + '<h4>台灣對照</h4><ul><li>二胎房貸：多由融資公司、民間或部分銀行承作，利率高；第一順位銀行通常是同一家才承作「增貸」。</li><li><b>理財型房貸</b>（循環額度、按日計息）≈ HELOC，常以<b>最高限額抵押權</b>擔保。</li><li>台灣法拍採<b>塗銷主義</b>：所有抵押權拍定後都消滅，依次序分配；後順位分不到錢時，法院依<b>無益執行</b>原則通常不准後順位單獨聲請拍賣。</li></ul>',
    terms:[['junior / second mortgage','後順位／二胎'],['home equity loan','房屋淨值貸款'],['HELOC','房屋淨值循環額度'],['piggyback (80/10/10)','同時借一、二順位'],['CLTV','合計貸款成數'],['sold-out junior','被塗銷的後順位'],['request for notice','要求通知'],['cross-default clause','交叉違約條款'],['draw / repayment period','動用期／還款期'],['line freeze / reduction','凍結／降低額度'],['drawdown risk','違約前動用額度的風險'],['理財型房貸','台灣的 HELOC']] },

  { id:'re1z', t:'Right of redemption：Equity of redemption 與 Statutory right of redemption', en:'Equity of redemption and statutory redemption',
    plain:'贖回權是借款人「付錢把房子拿回來」的權利。Equity of redemption 在法拍完成之前，各州都有：付清全部債務就能保住房子。Statutory right of redemption 是部分州法律額外給的，在法拍之後一段期間內，付拍賣價（加利息費用）還能把房子買回來。',
    life:'你把手機押在當鋪：到期前付清就能拿回（equity of redemption）；有些地方規定，就算當鋪已經把手機賣掉，你在一個月內付賣價加手續費，還能買回來（statutory redemption）。',
    body: reD('Equity of redemption', '衡平贖回權', '法拍完成前，付清全部就能保住房子', [
          ['時間', '從違約開始，到<b>拍賣完成</b>（或法院確認拍賣）為止。'],
          ['要付多少', '加速後：<b>全部</b>債務（UPB ＋ 應計利息 ＋ 費用）；和 reinstatement（只付欠款）不同。'],
          ['來源', '英國衡平法院（equity court）為了保護借款人而創設，所以叫 equity of redemption；各州<b>都有</b>。'],
          ['Foreclose 的本意', 'Foreclose ＝ 「<b>取消</b>」（fore-close）這個贖回權。'],
          ['不能事先放棄', '放款時約定借款人放棄贖回權，或預先簽好移轉給貸方的 deed，都<b>無效</b>：<b>clogging the equity of redemption</b>（妨礙贖回權）。'],
          ['實務', '借款人常以出售房子或再融資的方式行使（用新錢付清舊債）。'] ])
      + reD('Statutory right of redemption', '法定贖回權', '法拍之後，部分州仍可以買回', [
          ['時間', '拍賣<b>之後</b>一段法定期間，依州法從數個月到一年以上不等；約一半的州有。'],
          ['要付多少', '通常是<b>拍賣價</b>（不是原本的債務）＋ 利息 ＋ 買受人的合理費用。'],
          ['誰可以贖回', '原借款人；部分州也允許 <b>junior lienholder</b> 贖回（以保護自己的權益）。'],
          ['期間內的房子', '買受人拿到的是<b>附條件的權利</b>（certificate of sale），贖回期滿才取得 deed；期間內借款人有時仍可以住在房子裡。'],
          ['目的', '防止拍賣價過低：如果拍賣價遠低於市價，借款人可以用拍賣價買回 → 逼買方出較合理的價格；也讓借款人有時間籌錢。'],
          ['副作用', '買方要承擔「可能被贖回」的不確定性 → 出價更低、第三人更少參與，反而常由貸方 credit bid 得標；也延長了貸方取得房子的時間。'],
          ['Nonjudicial 時', '部分州規定走 power of sale（非訴訟法拍）就<b>沒有</b> statutory redemption（作為交換：貸方放棄 deficiency）。'] ])
      + reD('比較', 'Reinstatement vs 兩種贖回權', '時間點和金額', [
          '<b>Reinstatement</b>：加速後、拍賣前約 5 天；付<b>欠款＋費用</b>；貸款<b>繼續</b>。',
          '<b>Equity of redemption</b>：拍賣完成前；付<b>全部債務</b>；貸款<b>結束</b>、保住房子。',
          '<b>Statutory redemption</b>：拍賣<b>後</b>的法定期間；付<b>拍賣價</b>＋利息費用；從買受人手中<b>買回</b>。' ])
      + reD('延伸：稅捐拍賣的贖回', 'Tax sale redemption', '欠稅被拍賣後的贖回', [
          '欠繳房地產稅時，政府可以拍賣 <b>tax lien certificate</b> 或房子本身；屋主（和抵押權人）通常有一段贖回期，付清稅款、利息和罰款就能贖回。',
          '投資人買 tax lien certificate 賺取法定的高利息；如果屋主沒贖回，投資人可能取得房子。',
          '這也是貸方要用 escrow 代繳稅的原因：tax sale 可能讓貸方的抵押被塗銷。' ])
      + '<h4>台灣對照</h4><ul><li>拍定<b>前</b>，債務人清償債務（含執行費用），可以請求撤銷執行 → 類似 equity of redemption。</li><li>拍定<b>後</b>，台灣<b>沒有</b>法定贖回權：拍定人繳足價金、法院發給權利移轉證書，就取得所有權。</li><li>流抵約款：民法 §873-1 允許約定「債權屆期未受清償時，抵押物所有權移屬抵押權人」，但要<b>登記</b>才能對抗第三人，且抵押權人仍要<b>清算</b>：抵押物價值超過債權的部分要返還 → 避免妨礙贖回的不公平。</li></ul>',
    terms:[['equity of redemption','衡平贖回權（拍賣前）'],['statutory right of redemption','法定贖回權（拍賣後）'],['clogging the equity of redemption','妨礙贖回權（無效）'],['certificate of sale','拍賣證明（贖回期內）'],['redemption period','贖回期間'],['tax lien certificate','欠稅 lien 憑證'],['流抵約款','台灣民法 §873-1']] },

  { id:'re1za', t:'Deficiency judgment：不足額判決與追索權', en:'Deficiency judgments, recourse and tax consequences',
    plain:'法拍賣得的錢不夠還債時，差額叫 deficiency。有追索權的貸款，貸方可以請法院判決借款人支付差額（deficiency judgment），再用扣薪、查封其他財產等方式追討。但很多州用法律限制它：有些不准、有些只能用房子的「公平價值」計算差額、有些要求只能用一次訴訟。被免除的差額還可能要繳所得稅。',
    life:'你押了一台相機借 3 萬，相機只拍賣到 2 萬：朋友可以再跟你要剩下的 1 萬（有追索權）；如果你們約定「拍賣完就兩清」（無追索權），差的 1 萬他就只能自己吞。',
    body: reD('Deficiency 怎麼算', '不足額', '債務總額 − 拍賣價（或公平價值）', [
          ['公式', 'Deficiency ＝ 貸方的 claim（UPB ＋ 應計利息 ＋ 代墊款 ＋ 法拍費用）− 拍賣價金（扣除前順位後貸方實際分到的金額）。'],
          ['例子', 'Claim 620 萬、拍賣價 450 萬（貸方 credit bid 得標）→ deficiency 170 萬。'],
          ['Fair value 限制', '部分州規定差額要用房子的<b>公平市價</b>計算：若法院認定公平市價是 520 萬，deficiency 只有 620 − 520 = <b>100 萬</b>，避免貸方用低價 credit bid 買下房子再追討很大的差額。'] ])
      + reD('程序', '怎麼取得與執行', '要有判決才能追', [
          ['Judicial foreclosure', '可以在法拍訴訟中<b>一併</b>請求 deficiency judgment。'],
          ['Nonjudicial foreclosure', '要另外起訴；部分州（例如加州）規定走非訴訟法拍後<b>不能</b>請求 deficiency。'],
          ['期限', '許多州規定拍賣後要在短期間內（例如數個月）聲請，否則喪失權利。'],
          ['執行', '取得判決後成為 <b>judgment lien</b>，可以查封借款人的其他財產、<b>扣薪</b>（wage garnishment）、扣銀行帳戶。'],
          ['實際回收', '違約的借款人常沒有其他財產（judgment-proof），或會聲請破產（Ch.7 免除個人責任）→ deficiency judgment 的實際價值常常不高，但能嚇阻策略性違約。'] ])
      + reD('Anti-deficiency 法規', '限制不足額判決', '保護借款人的州法', [
          ['Purchase-money 限制', '例如加州：購買<b>自住</b> 1–4 戶住宅的 purchase-money 貸款，法拍後<b>不能</b>追討差額 → 這類貸款實質上是<b>無追索權</b>。'],
          ['非訴訟法拍後禁止', '貸方選擇快速的 power of sale，就要放棄 deficiency（以速度換追索權）。'],
          ['One-action rule', '部分州（例如加州）規定貸方只能提起<b>一個</b>訴訟，且必須<b>先就擔保品</b>（法拍）受償，不能跳過房子直接告借款人。'],
          ['Fair value statutes', '如上，以公平價值而非拍賣價計算差額。'],
          ['影響', '研究發現，在不准 deficiency（實質無追索權）的州，借款人對負權益更敏感、違約率較高 → 呼應 rational default。'] ])
      + reD('Recourse vs Nonrecourse', '有追索權 vs 無追索權', '貸方能不能追到房子以外', [
          ['Recourse', '借款人以<b>全部財產</b>負責；房子不夠，貸方可以追其他財產。台灣房貸都是有追索權。'],
          ['Nonrecourse', '貸方<b>只能</b>就擔保品受償，不能追借款人。來源：契約約定（商用貸款常見）或州法（anti-deficiency）。'],
          ['Carve-outs / bad-boy guarantee', '商用 nonrecourse 貸款在借款人有<b>詐欺、挪用租金、未經同意移轉、自行聲請破產、環境污染</b>等行為時，轉為有追索權（springing recourse），由保證人負責。'],
          ['定價', 'Nonrecourse 貸款的違約選擇權較有價值 → 貸方要求較低 LTV、較高利率。'] ])
      + reD('稅的後果', 'Cancellation of debt income', '被免除的債務可能要繳所得稅', [
          ['原則', '貸方免除（放棄追討）的債務，對借款人來說是<b>所得</b>（cancellation of debt, COD income），會收到 Form 1099-C。'],
          ['Recourse 貸款法拍', '視為以<b>公平市價</b>出售房子（計算資本利得／損失）；債務超過市價、被免除的部分 = COD income。'],
          ['Nonrecourse 貸款法拍', '視為以<b>全部債務金額</b>出售房子，沒有 COD income（但可能有資本利得）。'],
          ['排除規定', '破產中免除、<b>無力清償</b>（insolvency）範圍內的免除可以不課稅；自住房的債務免除曾有特別免稅規定（Mortgage Forgiveness Debt Relief Act，2007 年起多次延長，適用期間以最新稅法為準）。'],
          ['意涵', 'Short sale、deed in lieu、modification 的本金寬減，都可能產生 COD income → 借款人談 workout 時要考慮。'] ])
      + '<h4>台灣對照</h4><ul><li>台灣房貸是<b>有追索權</b>：拍賣不足額時，法院發給<b>債權憑證</b>，銀行可以在之後隨時（時效中斷後重新起算）再對借款人的其他財產、薪資聲請強制執行。</li><li>擺脫不足額債務的方式：與銀行協商、<b>消費者債務清理條例</b>的更生或清算（清算後法院裁定免責）。</li><li>台灣沒有 anti-deficiency 法規，所以借款人違約的成本比美國無追索權州高很多。</li></ul>',
    terms:[['deficiency','不足額'],['deficiency judgment','不足額判決'],['fair value statute','以公平價值計算'],['anti-deficiency statute','禁止或限制不足額判決的法律'],['one-action rule','單一訴訟原則'],['wage garnishment','扣薪'],['judgment-proof','沒有可執行的財產'],['recourse / nonrecourse','有／無追索權'],['carve-outs / springing recourse','例外轉為有追索權'],['COD income','債務免除所得'],['債權憑證','台灣拍賣不足額後的執行名義']] }
);

DATA.re.mcq.push(
  { q:'A borrower keeps making payments but lets the hazard insurance lapse and stops paying property taxes. This is a:', o:['monetary default','technical default','maturity default','strategic default'], a:1, e:'沒付本息以外的違約（稅、保險、維護、未經同意移轉）是 technical default。' },
  { q:'UPB (unpaid principal balance) excludes:', o:['scheduled principal not yet repaid','capitalized arrears after a modification','accrued but unpaid interest','the remaining original principal'], a:2, e:'UPB 只算本金（含被資本化的金額）；應計利息、費用另外加在 payoff amount 裡。' },
  { q:'Under the option view of mortgage default, a ruthless borrower defaults when the property value falls below:', o:['the original loan amount','the market value of the mortgage (remaining payments discounted at current rates) plus default costs','the purchase price','the property tax assessment'], a:1, e:'履約價是貸款的市場價值（不是 UPB）加上違約成本；利率上升時貸款市價下降，違約誘因變小。' },
  { q:'“Double trigger” default theory says default is most likely when:', o:['interest rates rise twice','negative equity combines with a liquidity shock such as job loss','both spouses sign the note','there are two mortgages'], a:1, e:'負權益＋流動性衝擊同時發生。' },
  { q:'Which workout permanently changes the loan terms (rate, term or principal)?', o:['Forbearance','Repayment plan','Loan modification','Cash for keys'], a:2, e:'Forbearance、repayment plan 是暫時的；modification 是永久修改。' },
  { q:'A key risk to a lender accepting a deed in lieu of foreclosure is that:', o:['the borrower keeps the property','junior liens remain on the property','the lender must pay a deficiency','the property tax lien is erased'], a:1, e:'Deed in lieu 是自願移轉，不會塗銷 junior lien；法拍（含 friendly foreclosure）才會。' },
  { q:'A lender prefers a “friendly foreclosure” over a deed in lieu mainly because foreclosure:', o:['is faster than any other option','eliminates junior liens and gives clearer title','avoids all legal costs','allows the borrower to keep the house'], a:1, e:'合意法拍仍是法律程序，可以塗銷 junior lien，也比較不會在破產中被撤銷。' },
  { q:'In a prepackaged bankruptcy, the debtor:', o:['liquidates all assets under Chapter 7','negotiates the plan and obtains creditor votes before filing Chapter 11','avoids court approval','must have the consent of every creditor'], a:1, e:'先談好、先投票再聲請；破產程序中每類債權人金額 2/3、人數過半同意即可約束反對者。' },
  { q:'The automatic stay in bankruptcy:', o:['cancels the mortgage lien','temporarily halts foreclosure and collection actions','gives the lender title immediately','applies only to unsecured creditors'], a:1, e:'聲請破產即自動停止催收和法拍；貸方可聲請 relief from stay。' },
  { q:'A second mortgage lender learns the borrower has stopped paying the first mortgage. To avoid being wiped out, the junior lender can:', o:['ignore it, since junior liens survive senior foreclosure','cure the senior default and add the amount to its own debt','demand that the senior lender subordinate','record a deed in lieu'], a:1, e:'代繳前順位欠款並加到自己的債權；也可以買下前順位債權或在法拍中出價。' },
  { q:'A buyer at a junior mortgage’s foreclosure sale acquires the property:', o:['free of all liens','subject to the senior mortgage','subject to the junior mortgage','only after statutory redemption by the senior lender'], a:1, e:'Junior 法拍不影響 senior lien，買方取得的房子仍附 senior mortgage。' },
  { q:'During the draw period of a HELOC, the lender may freeze or reduce the line if:', o:['the borrower pays on time','the property value declines significantly','interest rates fall','the borrower prepays'], a:1, e:'房價大幅下跌或借款人財務重大惡化時可以凍結或降低額度（2008 年常見）。' },
  { q:'The statutory right of redemption allows the borrower to:', o:['pay the arrears before acceleration','pay off the debt before the foreclosure sale','buy back the property after the foreclosure sale, usually for the sale price plus costs','avoid a deficiency judgment'], a:2, e:'法定贖回權在拍賣後；equity of redemption 在拍賣前、付全部債務。' },
  { q:'A clause in the original mortgage requiring the borrower to give up the right of redemption upon default is:', o:['enforceable in all states','unenforceable as a clog on the equity of redemption','a valid subordination clause','required by Fannie Mae'], a:1, e:'贖回權不能在放款時預先放棄（clogging the equity of redemption）。' },
  { q:'The claim of the first mortgagee in foreclosure typically includes:', o:['only the original loan amount','UPB, accrued interest, protective advances and allowable costs','only the unpaid installments','the junior lender’s balance'], a:1, e:'UPB ＋ 應計利息 ＋ 代墊稅與保險 ＋ 契約允許的費用。' },
  { q:'A “fair value” anti-deficiency statute limits the deficiency to:', o:['zero in all cases','the debt minus the property’s fair market value (not the sale price)','the sale price minus the debt','the junior lender’s claim'], a:1, e:'避免貸方用低價 credit bid 再追討很大的差額。' },
  { q:'When a recourse mortgage is foreclosed and the remaining debt is forgiven, the forgiven amount may be:', o:['taxable cancellation of debt income unless an exclusion applies','added to the property’s basis','treated as a capital gain only','ignored for tax purposes'], a:0, e:'Recourse：以公平市價計算出售，被免除的債務是 COD income（破產、無力清償等可排除）。' },
  { q:'依台灣法拍實務，拍賣不足清償時，銀行對剩餘債權：', o:['自動消滅','取得債權憑證，之後仍可對借款人其他財產強制執行','只能向保險公司請求','須在一個月內放棄'], a:1, e:'台灣房貸有追索權，拍賣不足額由法院發給債權憑證。' }
);

// ---------- 單元 1 依學習順序分組（卡片 id 不變，打勾進度保留） ----------
(() => {
  const sec = DATA.re.sections[0];
  sec.groups = [
    { t:'先懂基本：不動產的權利與產權', d:'買房買的是哪些權利？所有權怎麼移轉、怎麼確認沒問題？', ids:['re1k', 're1m'] },
    { t:'房貸的法律結構：債務＋擔保', d:'一筆房貸＝本票（債）＋抵押（擔保）；台灣抵押權、lien theory、deed of trust。', ids:['re1a', 're1e', 're1f', 're1g'] },
    { t:'Lien：種類與順位', d:'Tax lien、judgment lien、mortgage lien 怎麼產生、誰先拿錢。', ids:['re1t', 're1n'] },
    { t:'抵押條款（Note／Mortgage 中的條款）', d:'先看總覽地圖，再依付款 → 保護擔保品 → 移轉與順位 → 違約與補救四類深入，最後做比較。', ids:['re1p', 're1h', 're1l', 're1q', 're1r', 're1s'] },
    { t:'違約與 Workout', d:'什麼是違約、為什麼違約（理性違約）、貸方怎麼減少損失：workout、交出房子、破產重整。', ids:['re1u', 're1v', 're1i', 're1w', 're1x'] },
    { t:'法拍與法拍之後', d:'法拍的種類與流程、claims 怎麼分、後順位與 HELOC、贖回權、不足額判決。', ids:['re1o', 're1y', 're1z', 're1za'] },
    { t:'延伸：各種房貸型態', d:'用前面的條款理解 wraparound、blanket、open-end 等特殊結構。', ids:['re1j'] },
    { t:'台灣的監理、稅制與證券化', d:'銀行法、央行信用管制、實價登錄與房地合一稅、證券化條例。', ids:['re1b', 're1c', 're1d'] }
  ];
  const by = Object.fromEntries(sec.cards.map(c => [c.id, c]));
  const ids = sec.groups.flatMap(g => g.ids);
  const miss = sec.cards.filter(c => !ids.includes(c.id)).map(c => c.id);
  if (miss.length) sec.groups.push({ t:'其他', d:'', ids:miss });
  sec.cards = sec.groups.flatMap(g => g.ids).map(id => by[id]);
})();
