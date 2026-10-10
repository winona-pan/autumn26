// ===== 單元 1 補充（三）：抵押條款逐條深入、lien 種類與排序、易混淆比較；並把單元 1 依學習順序分組 =====
// reD：一個名詞＋可展開的深入細項。rows 可以是字串，或 ['標籤', '內容']
const reD = (term, zh, one, rows) => `<details class="deep"><summary><b>${term}</b> ${zh}<small>｜${one}</small></summary><ul>${rows.map(r => Array.isArray(r) ? `<li><span class="dk">${r[0]}</span>${r[1]}</li>` : `<li>${r}</li>`).join('')}</ul></details>`;

DATA.re.sections[0].cards.push(
  // ---------- Lien：種類與順位 ----------
  { id:'re1t', t:'Lien 的種類：Tax lien、Judgment lien、Mortgage lien、Mechanic’s lien', en:'Types of liens',
    plain:'Lien 是「用某個財產來擔保債務」的權利。房子上可能同時壓著好幾種 lien：欠稅產生的 tax lien、打輸官司產生的 judgment lien、借房貸設定的 mortgage lien、沒付工程款產生的 mechanic’s lien。先分清楚它們怎麼產生、管多大範圍，下一張卡才排得出順序。',
    life:'你的機車上可能貼了好幾張單子：停車費欠繳（稅）、法院的查封令（判決）、車貸的設定（抵押）、修車行沒收到修理費（工程款）。賣車時，每張單子都要先處理。',
    body: '<p class="ez lead">Lien 就是「掛在財產上的討債權」：你欠錢不還，他可以拿這個財產去賣、先拿錢。這張卡用兩個問題把 lien 分類：①是<b>你自己同意</b>掛上去的（自願），還是法律或法院<b>硬掛</b>的（非自願）？②只掛在<b>這一間房子</b>（特定），還是掛在你<b>所有財產</b>上（一般）？</p><h4>兩個分類軸</h4><div class="tblwrap"><table class="tbl"><tr><th></th><th>Specific 特定（只壓這一筆不動產）</th><th>General 一般（壓債務人所有財產）</th></tr>'
      + '<tr><td><b>Voluntary 自願</b></td><td>Mortgage lien、deed of trust</td><td>（少見）</td></tr>'
      + '<tr><td><b>Involuntary 非自願</b></td><td>Property tax lien、special assessment、mechanic’s lien</td><td>Judgment lien、federal / state income tax lien、estate tax lien</td></tr></table></div><span class="ez">例：房貸是你自己簽的，只押這一間房 → 自願＋特定。欠房屋稅，法律自動掛在那間房子上 → 非自願＋特定。被告輸了官司，法院判決掛在你所有的不動產上 → 非自願＋一般。</span>'
      + '<h4>逐一深入（點開看細項）</h4>'
      + reD('Property tax lien', '房地產稅留置權', '欠繳房地產稅自動產生，順位最優先', [
          ['怎麼產生', '依法律自動成立（statutory lien），不需要債權人去登記；每年的 ad valorem tax（從價稅）未繳就附在該不動產上。<span class="ez">不用任何人去申請：只要沒繳房地產稅，房子上就自動多了一個 lien。從價稅＝依房子價值課的稅。</span>'],
          ['順位', '<b>Super priority</b>：不論成立時間，優先於所有房貸和其他 lien，包含早就登記的第一順位房貸。<span class="ez">一般 lien 都是先來先拿，但房地產稅可以插隊到最前面，就算銀行的房貸早了 10 年登記也一樣。</span>'],
          ['為什麼這麼強', '地方政府靠房地產稅提供學校、道路等公共服務，法律讓它不用排隊；政府可以進行 <b>tax sale</b>（欠稅拍賣）。<span class="ez">理由：學校、道路靠這筆稅運作，所以法律讓政府永遠排第一。</span>'],
          ['對貸方的影響', '借款人欠稅 → 貸方的第一順位會被擠到後面 → 所以貸方用 <b>escrow</b> 代繳稅金，並在條款中要求借款人繳清稅捐（Charges; Liens）。<span class="ez">銀行最怕借款人沒繳稅，因為稅會排到銀行前面，銀行就少拿錢。所以銀行乾脆每個月多收一點錢，自己幫借款人繳稅（escrow）。</span>'],
          ['同類', '<b>Special assessment</b>（特別課徵）：為了鋪路、下水道等改善工程向受益的不動產收的費用，通常和稅捐一樣優先。'],
          ['台灣對照', '稅捐稽徵法 §6：<b>土地增值稅、地價稅、房屋稅</b>優先於一切債權及抵押權。<span class="ez">台灣一樣：欠土增稅、地價稅、房屋稅，政府比銀行先拿錢。</span>'] ])
      + reD('Federal tax lien', '聯邦稅捐留置權', '欠所得稅等聯邦稅，屬一般 lien，不一定最優先', [
          ['範圍', 'General lien：及於納稅人<b>所有</b>財產與權利。<span class="ez">欠的是個人所得稅，所以 IRS 可以追你所有的財產，不只一間房子。</span>'],
          ['順位', '和房地產稅不同，<b>沒有</b>自動的超級優先；對抗房貸等第三人時，原則上看 IRS 何時<b>登記</b>（notice of federal tax lien）。登記前就已登記的房貸排在前面。<span class="ez">和房地產稅不同，聯邦所得稅不能插隊，要看誰先登記。</span>'],
          ['易錯點', '考題說 “tax lien 最優先” 指的是<b>房地產稅</b>（property tax），不是所得稅。<span class="ez">考試看到「tax lien 最優先」，指的是跟這間房子有關的房地產稅。</span>'] ])
      + reD('Judgment lien', '判決留置權', '打輸官司、判決登記後，壓在債務人所有的不動產上', [
          ['怎麼產生', '債權人勝訴取得金錢判決（money judgment）後，把判決<b>登錄</b>（docket / record）在不動產所在的郡，就對債務人在該郡的不動產產生 lien。<span class="ez">流程：打贏官司 → 拿到「對方要付你多少錢」的判決 → 拿去郡政府登記 → 對方在這個郡的房子就都被掛上 lien。</span>'],
          ['範圍', 'General lien：債務人在該郡<b>現有和之後取得</b>的不動產都受影響。<span class="ez">連債務人以後才買的房子，買到的那一刻就會被掛上。</span>'],
          ['順位', '依<b>登記時間</b>與其他 lien 排序。在房貸之前登記 → 排在房貸前面；在房貸之後登記 → 排在後面。<span class="ez">跟房貸比誰先登記。</span>'],
          ['例外', '<b>Purchase-money mortgage</b>：為了買這間房子而設定的抵押，通常優先於債務人原本就有的 judgment lien（因為沒有這筆貸款，債務人根本買不到這間房子）。<span class="ez">例：小明 2019 年被判欠 100 萬，2021 年跟銀行借錢買新房。判決 lien 雖然比較早，但銀行的購屋貸款還是排第一，因為這間房子是靠銀行的錢才買得到。</span>'],
          ['實務', '買方或貸方做 title search 時會查賣方／借款人有沒有判決 lien，交屋時要先清償。<span class="ez">買房前一定要查賣方有沒有被判決 lien 掛著，不然買到的房子會帶著別人的債。</span>'],
          ['台灣對照', '台灣沒有「判決 lien」：債權人取得勝訴判決（執行名義）後，要聲請<b>強制執行</b>、查封債務人的不動產；抵押權人仍優先受償。<span class="ez">台灣判決本身不會自動掛在房子上，債權人要另外申請法院查封、拍賣。</span>'] ])
      + reD('Mortgage lien', '抵押留置權', '借款人自願設定，只壓這一筆房子', [
          ['怎麼產生', '借款人簽 mortgage（或 deed of trust）並<b>登記</b>（recording）。<span class="ez">這是借款人自己簽的，最常見的 lien。</span>'],
          ['範圍', 'Specific lien：只及於抵押的那筆不動產。<span class="ez">銀行只能拍賣這一間，不能拍賣你的其他財產（其他財產要另外靠 note 的個人責任去追）。</span>'],
          ['順位', '依登記時間：<b>first mortgage</b>（第一順位）→ <b>second mortgage</b>（二胎）→ ……；可以用 subordination 改變。<span class="ez">基本上先登記的排前面；可以靠順位讓與（subordination）協議改變。</span>'],
          ['再深入', '還清後貸方要出具 <b>satisfaction / release of mortgage</b> 並登記，lien 才消滅；deed of trust 則是 reconveyance。<span class="ez">還完錢後要記得把 lien 塗掉，不然登記簿上還會顯示房子被押著。</span>'] ])
      + reD('Mechanic’s lien', '工程款留置權', '工程款沒付，可以溯及到開工日', [
          ['誰可以主張', '營造商、次承攬商、工人、材料供應商，因為改良（improve）這筆不動產而沒拿到錢。<span class="ez">幫你裝潢、蓋房子、賣建材的人沒拿到錢，可以在你的房子上掛 lien。</span>'],
          ['順位', '許多州可以<b>溯及（relate back）到開工或第一次供料的日期</b>，所以可能排在之後才登記的房貸前面。<span class="ez">例：工程 3 月開工，銀行 5 月才登記房貸，包商 8 月才登記工程款 lien。在很多州，包商的 lien 可以算成 3 月，反而排在銀行前面。</span>'],
          ['對貸方的影響', '建築融資貸方會在開工<b>前</b>登記抵押、要求 lien waiver（承包商放棄 lien 的聲明）、分期撥款前檢查。<span class="ez">銀行的防禦：開工前就先登記，而且每次撥款前要求包商簽「放棄 lien」的聲明。</span>'],
          ['台灣對照', '民法 §513：承攬人就承攬關係的報酬，可請求定作人為<b>抵押權登記</b>（法定抵押權的登記）。<span class="ez">台灣的包商可以要求屋主讓他登記抵押權，保障工程款。</span>'] ])
      + reD('其他', 'HOA lien、estate tax lien、attachment', '補充', [
          '<b>HOA / condo assessment lien</b>（管委會費用）：部分州給予幾個月管理費的 super-lien，可排在第一順位房貸前面。<span class="ez">管委會費用欠繳，某些州也讓它插隊到房貸前面（只限幾個月的金額）。</span>',
          '<b>Estate / inheritance tax lien</b>（遺產稅 lien）：被繼承人的不動產上的稅捐 lien。',
          '<b>Attachment</b>（假扣押）：訴訟進行中先扣住財產，避免債務人脫產；台灣也有<b>假扣押</b>。<span class="ez">官司還在打，先把財產凍住，避免對方在判決前把房子賣掉。</span>',
          '<b>Lis pendens</b>：不是 lien，而是「這筆不動產有訴訟」的公告，讓之後取得權利的人受訴訟結果拘束。<span class="ez">Lis pendens 是公告「這間房子正在打官司」，之後買的人不能說自己不知道。</span>' ]),
    terms:[['specific / general lien','特定／一般 lien'],['voluntary / involuntary lien','自願／非自願 lien'],['property tax lien','房地產稅 lien（最優先）'],['special assessment','特別課徵'],['federal tax lien','聯邦稅 lien（依登記時間）'],['judgment lien','判決 lien'],['mortgage lien','抵押 lien'],['mechanic’s lien','工程款 lien（可溯及開工日）'],['lien waiver','放棄 lien 聲明']] },

  { id:'re1n', t:'Lien 的排序：Tax lien → 依登記先後的 Mortgage / Judgment lien', en:'Lien priority: tax, judgment and mortgage liens',
    plain:'拍賣房子的錢依順序分配：先扣法拍費用，再付房地產稅，接著依「登記時間先後」付給房貸和判決 lien，最後剩下的才還給屋主。排越前面越安全；排在後面的人可能一毛都拿不到，而且 lien 會被塗銷。',
    life:'排隊領便當：工作人員先拿（法拍費用）、VIP 不用排（稅捐）、其他人照抵達時間排（登記先後）；有人可以主動讓位（subordination）；便當不夠時，後面的人就領不到。',
    body: '<p class="ez lead">房子被拍賣後，那筆錢要<b>照順序</b>分給所有債主：排前面的先拿滿，有剩才輪到下一個。這張卡教你排順序，以及哪些情況會讓順序改變。</p><h4>基本順序</h4><ol><li><b>法拍費用</b>（法院、受託人、律師、拍賣費用）。</li><li><b>Property tax lien、special assessment</b>：不論時間，最優先。</li><li><b>其他 lien 依登記先後</b>（first in time, first in right）：mortgage lien、judgment lien、federal tax lien、mechanic’s lien（可能溯及）……</li><li><b>Surplus</b>（剩餘款）給原屋主。</li></ol><span class="ez">口訣：費用 → 房地產稅 → 其他人照登記先後 → 剩下的還給屋主。</span>'
      + '<h4>算一次：拍賣價金怎麼分</h4><p>房子法拍賣得 800 萬。房子上的 lien（依登記時間）：</p><div class="tblwrap"><table class="tbl num"><tr><th>項目</th><th>金額</th><th>分到</th><th>結果</th></tr>'
      + '<tr><td>法拍費用</td><td>20</td><td>20</td><td>先扣</td></tr>'
      + '<tr><td>欠繳房地產稅（tax lien）</td><td>10</td><td>10</td><td>不論時間最優先</td></tr>'
      + '<tr><td>第一順位房貸（2018 登記）</td><td>600</td><td>600</td><td>全額</td></tr>'
      + '<tr><td>Judgment lien（2020 登記）</td><td>100</td><td>100</td><td>全額</td></tr>'
      + '<tr><td>第二順位房貸（2022 登記）</td><td>150</td><td>70</td><td>不足 80 → 變成無擔保債權，lien 被塗銷</td></tr>'
      + '<tr><td>原屋主</td><td></td><td>0</td><td>沒有剩餘</td></tr></table></div><span class="ez">怎麼讀這張表：800 萬先扣 20 萬費用、10 萬稅，剩 770 萬。第一順位房貸拿 600 萬，剩 170 萬；判決 lien 拿 100 萬，剩 70 萬；第二順位房貸欠 150 萬只拿到 70 萬，差的 80 萬就變成「沒有擔保的普通欠款」，只能另外去追借款人。</span>'
      + '<p>如果 judgment lien 在 2016 年（第一順位房貸之前）就登記了，它會排在房貸前面；除非那筆房貸是 <b>purchase-money mortgage</b>。<span class="ez">因為判決 lien 比房貸早登記，就排在房貸前面；但如果那筆房貸就是用來買這間房子的，它還是可以排第一。</span></p>'
      + '<h4>改變順位的因素（點開看細項）</h4>'
      + reD('Recording statutes', '登記法', '沒登記的權利，可能輸給後來登記的人', [
          ['Race', '誰先登記誰贏，不管知不知道（少數州）。<span class="ez">純比快：誰先跑到登記處誰贏。</span>'],
          ['Notice', '後手只要<b>善意</b>（不知道前面有未登記的權利）就贏，即使還沒登記。<span class="ez">只看後來的人知不知道前面有權利：不知道（善意）就贏。</span>'],
          ['Race-notice', '後手要<b>善意且先登記</b>才贏（多數州）。<span class="ez">要同時「不知道」而且「比較早登記」，後來的人才贏。最多州採這個。</span>'],
          ['結論', '貸方撥款當天就要登記；title search 要查到登記當下（gap 期間用 title insurance 補）。<span class="ez">結論：銀行撥款當天就要去登記，不然中間被別人插隊。查產權到登記之間的空檔，用產權保險來保。</span>'] ])
      + reD('Purchase-money mortgage priority', '購置價金抵押的優先性', '可以排在借款人原本的 judgment lien 前面', [
          '債務人原本的 general lien（例如判決 lien）會在他買到房子的瞬間附在房子上；但買房的錢是這筆 PMM 給的，所以法律讓 PMM 優先。<span class="ez">道理：沒有這筆貸款就沒有這間房子，給錢的人當然要排第一。</span>',
          '賣方融資（seller financing）和銀行的購屋貸款都可以是 PMM。<span class="ez">不管是賣方借買方錢，還是銀行借錢買房，只要是用來「買這間房子」的就算。</span>' ])
      + reD('Subordination', '順位讓與', '前順位的人同意排到後面', [
          '透過契約中的 <b>subordination clause</b>（事先約定）或事後簽 <b>subordination agreement</b>。',
          '例：屋主有第一順位房貸和 HELOC；第一順位房貸<b>再融資</b>（refinance）時，新貸款登記較晚，會排在 HELOC 後面 → 新貸方要求 HELOC 貸方簽 subordination agreement，新房貸才保有第一順位。<span class="ez">例：你有第一順位房貸 A 和第二順位 HELOC B。你拿新貸款 C 去還掉 A，C 是最新登記的，照理會排在 B 後面。C 的銀行不願意當第二順位，所以要求 B 簽字同意「我讓 C 排前面」。</span>',
          '詳見第 4 組「移轉與順位條款」。' ])
      + reD('Future advances', '追加貸款的順位', '義務性撥款通常保有原順位', [
          '<b>Obligatory advance</b>（貸方有義務撥的款，例如建築貸款依進度撥款）：多數州保有原本抵押的順位。',
          '<b>Optional advance</b>（貸方可選擇撥不撥）：若貸方撥款時<b>已知道</b>中間有其他 lien，追加部分可能排在那個 lien 之後。<span class="ez">如果銀行「必須」繼續撥款（例如蓋房子照進度撥），追加的錢保有原順位；如果銀行「可撥可不撥」，又已經知道中間有其他人插進來，追加的錢就排在那個人後面。</span>' ])
      + '<h4>排序的影響</h4><ul><li><b>Senior lien 法拍</b>：拍定後，<b>junior lien 被塗銷</b>（wiped out），只能從剩餘價金受償；不足部分變成無擔保債權。<span class="ez">前順位的人去法拍，後順位的 lien 會一起被清掉。後順位只能從拍賣剩下的錢拿，不夠的部分變成普通欠款。</span>junior lienholder 必須被通知並列為法拍當事人，才會被塗銷。</li><li><b>Junior lien 法拍</b>：買受人取得的房子<b>仍附帶 senior lien</b>（acquire title <b>subject to</b> the senior mortgage），所以出價時要扣掉 senior 的餘額。<span class="ez">反過來：後順位的人去法拍，前順位的房貸還留在房子上。買的人等於連前面的房貸一起買下，所以只會出「房價減掉前面房貸」的價錢。</span></li><li>Junior lienholder 的保護：可以<b>代繳</b>前順位欠款（再加到自己的債權上），避免前順位法拍把自己塗銷；或在法拍時出價。<span class="ez">後順位的人為了不被清掉：可以幫借款人先把前順位欠的錢繳了，再加到自己的債權上；或是在法拍時自己出價買下。</span></li><li>所以二胎、HELOC 利率較高，並限制合計 LTV（combined LTV, CLTV）。<span class="ez">後順位風險高，所以利率高；銀行也會看所有貸款加起來佔房價幾成（CLTV）。</span></li></ul>'
      + '<h4>台灣對照</h4><ul><li>民法 §865：同一不動產上數個抵押權，次序<b>依登記之先後</b>。民法 §870-1：抵押權人可以調整、讓與次序（類似 subordination）。<span class="ez">台灣也是先登記先受償，也可以約定調整順位。</span></li><li>稅捐稽徵法 §6：土地增值稅、地價稅、房屋稅優先於一切債權及抵押權。</li><li>強制執行分配順序：執行費用 → 優先稅捐 → 抵押權依次序 → 普通債權（依比例）。<span class="ez">台灣法拍分錢的順序和美國很像：費用 → 優先稅 → 抵押權照順位 → 沒有擔保的人按比例分。</span></li><li>法拍採<b>塗銷主義</b>：拍定後，存在於拍賣物上的抵押權原則上都消滅（強制執行法 §98），和美國「senior 法拍塗銷 junior」不同。<span class="ez">台灣法拍後，房子上「所有」抵押權（不管前後順位）原則上都塗銷，買受人拿到乾淨的房子。美國則是誰發動法拍、誰的後面才被清掉。</span></li></ul>',
    terms:[['priority of liens','lien 的順位'],['first in time, first in right','先登記先受償'],['surplus','剩餘款'],['race / notice / race-notice','三種登記法'],['wiped out','（後順位）被塗銷'],['subject to the senior lien','附帶前順位 lien 取得'],['CLTV','合計貸款成數']] },

  // ---------- 抵押條款 ----------
  { id:'re1p', t:'抵押條款總覽：Note（或 Bond）與 Mortgage 各寫了什麼', en:'Mortgage clauses: where they live and how they group',
    plain:'房貸條款分散在兩份文件：本票（note，紐約等州叫 bond）寫「錢怎麼還」，抵押契約（mortgage / deed of trust）寫「房子怎麼擔保」。條款很多，但可以分成四類：付款、保護擔保品、移轉與順位、違約與補救。先看這張地圖，再看後面四張卡的深入細節。',
    life:'手機分期合約：一張寫「每月繳多少、可不可以提前繳清、遲繳罰多少」（note）；另一張寫「手機要保險、不能轉賣、壞了要修、不繳我可以收回」（mortgage）。',
    body: '<p class="ez lead">房貸文件很長，這張卡是<b>地圖</b>：把幾十個條款分成四類。之後的四張卡就照這四類一張一張講。先記住這四類在保護什麼：①錢怎麼付；②房子（擔保品）不能被搞壞；③房子或貸款換人時怎麼辦；④不付錢時怎麼辦。</p><h4>美國標準文件</h4><ul><li>Fannie Mae／Freddie Mac 的 <b>uniform instruments</b>：全國通用的 note，加上各州版本的 security instrument（mortgage 或 deed of trust）。<span class="ez">美國大部分房貸都用 Fannie Mae／Freddie Mac 的標準範本，所以各家銀行的條款幾乎一樣，才能打包賣給投資人。</span></li><li>Security instrument 分成 <b>uniform covenants</b>（各州相同的條款）和 <b>non-uniform covenants</b>（依州法不同，例如加速與法拍、release）。<span class="ez">全國都一樣的條款叫 uniform；跟各州法律有關、每州不同的叫 non-uniform（例如法拍怎麼做）。</span></li><li>Note 和 mortgage 互相引用：note 說「本債務由 security instrument 擔保」，mortgage 說「擔保的是這張 note」。<span class="ez">兩份文件互相指向對方，所以要一起看。</span></li></ul>'
      + '<h4>條款地圖</h4><div class="tblwrap"><table class="tbl"><tr><th>類別</th><th>條款</th><th>主要寫在</th></tr>'
      + '<tr><td><b>① 付款</b></td><td>Payment of principal and interest、late charge、<b>prepayment</b>（含 lockout）、application of payments、<b>escrow</b></td><td>Note（prepayment、late charge）＋ Mortgage（escrow、application）</td></tr>'
      + '<tr><td><b>② 保護擔保品</b></td><td>Charges; liens、hazard insurance、occupancy、preservation（waste）、<b>right of entry／inspection</b>、protection of lender’s security、<b>abandonment</b>、condemnation</td><td>Mortgage</td></tr>'
      + '<tr><td><b>③ 移轉與順位</b></td><td><b>Due-on-sale</b>、<b>assumption</b>、subject to、novation、assignment、<b>subordination</b>、<b>future advance</b>、release</td><td>Mortgage（assignment 也在 note）</td></tr>'
      + '<tr><td><b>④ 違約與補救</b></td><td><b>Acceleration</b>、notice and cure、<b>right to reinstate</b>、<b>forbearance</b>（not a waiver）、remedies（foreclosure／power of sale）</td><td>Note（違約、加速）＋ Mortgage（法拍、reinstate）</td></tr></table></div><span class="ez">讀表技巧：和「錢」有關的（利率、提前還款、遲延費、違約加速）多半寫在 note；和「房子」有關的（保險、維護、法拍）寫在 mortgage。</span>'
      + '<h4>Covenant、clause、condition 的差別</h4><ul><li><b>Covenant</b>（約定事項）：一方承諾做或不做某事，例如借款人承諾繳稅、保險、維護房子。違反 covenant = 違約（default）。<span class="ez">Covenant＝承諾。借款人承諾繳稅、保險、好好維護房子；沒做到就算違約，就算每月都有按時繳錢也一樣。</span></li><li><b>Clause</b>（條款）：契約中的一條規定，泛稱。<span class="ez">Clause 只是「一條」的意思，什麼都可以叫 clause。</span></li><li><b>Condition</b>（條件）：某事發生才產生效果，例如「出售時」才觸發 due-on-sale。<span class="ez">Condition＝觸發開關：某件事發生，這條才生效。</span></li></ul>'
      + '<h4>Mortgage bond 的條款（延伸）</h4><ul><li>公司發行 <b>mortgage bond</b>（以不動產擔保的公司債）時，條款寫在 <b>indenture</b>（債券契約），由 <b>trustee</b> 代表債券持有人監督。<span class="ez">公司拿房地產當擔保發債，概念和房貸一樣，只是借錢的是公司、出錢的是很多債券投資人，所以要一個受託人代表大家盯著公司。</span></li><li>常見條款和房貸類似：<b>after-acquired property clause</b>（之後取得的財產也納入擔保）、<b>release and substitution</b>（替換擔保品）、<b>open-end vs closed-end</b>（可否用同一擔保再發新債，概念同 future advance）、call / sinking fund（相當於 prepayment）、acceleration。<span class="ez">這些條款和房貸幾乎一一對應：提早買回債券＝提前還款；違約就全部到期＝加速。</span></li><li>CFA Fixed Income：<b>affirmative / negative covenants</b>、secured vs unsecured bonds。<span class="ez">CFA 會考：affirmative covenant 是「一定要做」的事（例如維持保險），negative covenant 是「不能做」的事（例如不能再把同一個擔保品押給別人）。</span></li></ul>'
      + '<h4>台灣對照</h4><ul><li>台灣房貸文件：<b>借款契約</b>（含加速條款、提前清償違約金、保險等約定）＋<b>抵押權設定契約書</b>（登記用）；部分銀行另要求本票。<span class="ez">台灣沒有分 note 和 mortgage，而是「借款契約」管債、「抵押權設定契約」管擔保。</span></li><li>金管會訂有「個人購屋貸款定型化契約應記載及不得記載事項」，規範銀行契約內容。<span class="ez">政府規定銀行的房貸契約一定要寫什麼、不能寫什麼，保護借款人。</span></li></ul>',
    cfa:'Fixed Income：bond indenture and covenants',
    terms:[['uniform instrument','Fannie／Freddie 標準文件'],['security instrument','擔保文件（mortgage／deed of trust）'],['covenant','約定事項'],['indenture','債券契約'],['after-acquired property clause','之後取得的財產也納入擔保'],['open-end / closed-end','可／不可再用同一擔保借款']] },

  { id:'re1h', t:'① 付款條款：Prepayment、Lockout period、Application of payments、Escrow', en:'Payment clauses: prepayment, lockout, escrow',
    plain:'付款條款決定「怎麼還、能不能提早還、每筆錢先沖什麼、稅和保險怎麼繳」。提前還款對借款人是好事、對貸方是風險，所以商用貸款常有一段完全不能提前還的 lockout period，之後提前還要付違約金。Escrow 則是每月多繳一點，讓貸方代繳稅和保險。',
    life:'健身房年約：前 6 個月不能解約（lockout），之後解約要付違約金（prepayment penalty），最後一個月可以自由退（open period）；每月會費裡含一筆「設備基金」，由健身房統一付清潔費（escrow）。',
    body: '<p class="ez lead">第一類條款：<b>錢怎麼付</b>。重點有四個：每月付款與遲延費、能不能提早還、提早還的錢怎麼算罰金、每筆錢先抵什麼，以及銀行幫你代繳稅和保險的帳戶（escrow）。</p><h4>逐一深入</h4>'
      + reD('Payment of principal and interest; late charge', '本息支付與遲延費', '按時付，晚付要罰', [
          ['內容', '依 note 每月支付本息；美國常見<b>寬限期</b>（grace period，例如 15 天）後收 late charge（例如逾期金額的 4–5%）。<span class="ez">例：每月 1 號要繳，15 號前繳都不罰；16 號以後才繳，要多付一筆逾期費。</span>'],
          ['易混淆', '這裡的寬限期是「晚幾天繳不罰」；台灣房貸的<b>寬限期</b>是「前幾年只繳息不還本」，意思不同。<span class="ez">同一個詞兩種意思：美國的 grace period 是「晚幾天不罰」，台灣的寬限期是「前幾年只繳利息」。</span>'] ])
      + reD('Prepayment clause', '提前還款條款', '可不可以提早還、要不要付違約金', [
          ['Prepayment privilege', '借款人有權提前還一部分（curtailment）或全部（payoff）。美國住宅房貸多數可自由提前還款。<span class="ez">Curtailment＝多還一點本金；payoff＝一次全部還清。</span>'],
          ['Prepayment penalty', '提前還款要付違約金。美國住宅：Dodd-Frank 後，qualified mortgage 若有違約金，只能在<b>前 3 年</b>且有上限（第 1–2 年 2%、第 3 年 1%），ARM 不得收。<span class="ez">提前還款違約金在美國住宅房貸受到嚴格限制，最多只能收前 3 年。</span>'],
          ['為什麼貸方在意', '利率下跌時借款人會<b>再融資</b>（refinance）提前還款，貸方只能用較低的利率再放款 → <b>prepayment risk</b>（再投資風險）。這就是 MBS 的<b>負凸性</b>和 contraction risk（單元 4–7）。<span class="ez">銀行為什麼在乎：利率下跌時大家都提早還錢去轉貸，銀行拿回來的錢只能用更低的利率再借出去，少賺很多。違約金就是在補償這個損失。</span>'],
          ['Step-down', '違約金逐年下降，例如 5-4-3-2-1：第 1 年 5%、第 2 年 4%……第 6 年起免。<span class="ez">罰金逐年變少：越晚提前還，罰得越少。</span>'],
          ['Yield maintenance', '補償貸方「提前還款少賺的利息」：約等於剩餘期間的（貸款利率 − 同期公債殖利率）× 餘額 的現值。例：餘額 1,000 萬、利率 6%、公債 4%、剩 5 年 → 每年少賺 20 萬，以 4% 折現 5 年 ≈ 20 萬 × 4.452 ≈ <b>89 萬</b>。利率越低，違約金越高。<span class="ez">概念：「你提早還，害我少賺的利息，全部算給你。」市場利率越低，銀行把錢拿回去再借出能賺的越少，所以損失越大，罰金越高。算法：每年少賺 = 1,000 萬 × (6% − 4%) = 20 萬，5 年的 20 萬折現回今天約 89 萬。</span>'],
          ['Defeasance', '借款人不直接還錢，而是買一組<b>公債</b>放進擔保，現金流剛好支付原貸款剩下的每期本息，換取解除房子的 lien。CMBS 常用，因為證券化的現金流不受影響。<span class="ez">Defeasance＝不還錢，改用「替身」：借款人買一組公債，公債每期付的錢剛好等於原本房貸每期要付的錢。投資人照樣每月收到一樣的錢，房子就可以解除抵押拿去賣。</span>'],
          ['台灣對照', '台灣房貸常約定前 1–3 年提前清償要付違約金（例如 1%、0.5%，依契約）；依定型化契約規範，銀行應提供不收違約金的方案讓借款人選擇（利率可能較高）。<span class="ez">台灣常見「綁約 1–3 年」，提早還清要付違約金；銀行也要提供不綁約的選項，但利率會高一點。</span>'] ])
      + reD('Lockout period', '禁止提前還款期', '這段期間<b>完全不能</b>提前還', [
          ['內容', '貸款開始後的一段期間（例如前 2–5 年）借款人<b>不得</b>提前清償，付違約金也不行。<span class="ez">跟違約金不同：lockout 期間是完全不准提前還，付錢也不行。</span>'],
          ['常見在哪', '<b>商用不動產貸款</b>、尤其 CMBS 貸款；住宅房貸很少見。<span class="ez">大多出現在辦公大樓、商場這類商用房地產貸款。</span>'],
          ['典型結構', '<b>Lockout</b>（例如前 2 年）→ <b>defeasance 或 yield maintenance 期</b> → <b>open period</b>（到期前 3–6 個月可自由還款）。CMBS 證券化後通常至少 2 年不能 defeasance（稅法 REMIC 規定）。<span class="ez">典型三段：前幾年完全不能還 → 中間可以還但要付很多錢（defeasance 或 yield maintenance）→ 快到期時可以免費還。</span>'],
          ['為什麼', '投資人買 CMBS 要的是<b>可預測的現金流</b>；lockout 等於提供 <b>call protection</b>（贖回保護），和公司債的 non-callable 期間相同。<span class="ez">買 CMBS 的投資人想要穩定的現金流，不希望錢被提早還回來，lockout 就是給他們的保證。</span>'],
          ['對借款人', '彈性較低：想在 lockout 期間賣房或再融資，只能找人承接貸款（assumption），所以商用貸款常允許有條件的 assumption。<span class="ez">借款人在 lockout 期間想賣房怎麼辦？不能還錢，就讓買方接手這筆貸款繼續繳。</span>'],
          ['CFA 連結', 'CMBS 的 call protection 分成 loan level（lockout、defeasance、yield maintenance、prepayment penalty）和 structure level（分券順序）。<span class="ez">CFA 會分兩層：貸款本身的保護（lockout 等）和證券結構的保護（分券順序）。</span>'] ])
      + reD('Application of payments', '付款抵充順序', '每筆錢先沖什麼', [
          ['常見順序', '<b>escrow（稅、保險）→ 利息 → 本金 → late charge／其他費用</b>（Fannie／Freddie 標準文件大致如此，實際依契約）。<span class="ez">你每個月繳的錢，先拿去補代繳稅和保險的帳戶，再付利息，剩下的才還本金，最後才是罰款。</span>'],
          ['為什麼重要', '先沖利息再沖本金，借款人少付時欠的是本金，貸方利息收入有保障。<span class="ez">如果你繳不夠，被少付的是本金，銀行的利息先收到了。</span>'],
          ['台灣對照', '民法 §323：清償人所提出的給付，應<b>先抵充費用，次充利息，次充原本</b>。<span class="ez">台灣民法也是一樣的順序：費用 → 利息 → 本金。</span>'] ])
      + reD('Escrow (impound) account', '代管帳戶', '每月多繳一點，由貸方代繳稅和保險', [
          ['內容', '每月付款 = 本息 + 1/12 年度房地產稅 + 1/12 保險費 → <b>PITI</b>（principal, interest, taxes, insurance）。服務機構（servicer）到期代繳。<span class="ez">例：每月本息 3 萬，一年房屋稅 2.4 萬、保險 1.2 萬，所以每月要多繳 (2.4 + 1.2) ÷ 12 = 3,000，總共每月繳 3.3 萬。PITI 就是這四樣的縮寫。</span>'],
          ['為什麼', '避免借款人沒繳稅（tax lien 會排到房貸前面）或保險失效（擔保品沒有保障）。LTV 高的貸款通常強制要有 escrow。<span class="ez">銀行不放心讓借款人自己繳：沒繳稅，稅會排到銀行前面；保險沒繳，房子燒掉就沒擔保了。</span>'],
          ['Cushion 上限', '美國 RESPA：貸方最多只能多收 <b>2 個月</b>（年度支出的 1/6）當緩衝。<span class="ez">銀行可以多收一點當備用，但法律規定最多 2 個月。</span>'],
          ['Escrow analysis', '每年重新計算：稅或保費上漲 → <b>shortage</b>（不足，借款人補繳或分 12 個月攤）；多收 → <b>surplus</b>（50 美元以上要在 30 天內退還）。所以固定利率房貸的每月付款仍可能變動。<span class="ez">每年重算一次：稅變貴了就要補，多收了就退。所以就算利率固定，每月總付款還是可能變。</span>'],
          ['另一個意思', '交易時的 <b>escrow</b>：中立第三人（escrow agent）保管買方的訂金、價金和雙方文件，等條件都滿足（例如貸款核准、產權確認）才交割（<b>closing</b>）。<span class="ez">同一個字的另一個意思：買賣房子時，由中立第三方先保管買方的錢和雙方的文件，條件都完成才同時交屋、交錢。</span>'],
          ['台灣對照', '台灣房貸<b>沒有</b> escrow 帳戶，稅由屋主自行繳納；交易時的「<b>價金履約保證</b>」（履保專戶）才相當於交割的 escrow。<span class="ez">台灣沒有 escrow 代繳帳戶，稅自己繳。台灣的「履約保證專戶」比較像交易時的 escrow。</span>'] ]),
    cfa:'Fixed Income：prepayment risk and call protection',
    terms:[['prepayment privilege','提前還款權'],['prepayment penalty','提前清償違約金'],['curtailment','部分提前還款'],['lockout period','禁止提前還款期'],['yield maintenance','收益維持違約金'],['defeasance','以公債替換擔保'],['open period','可自由還款期'],['call protection','贖回保護'],['application of payments','付款抵充順序'],['escrow / impound account','代管帳戶'],['PITI','本息＋稅＋保險'],['escrow analysis','代管帳戶年度檢視']] },

  { id:'re1l', t:'② 保護擔保品的條款：保險、維護、Right of entry、Abandonment、徵收', en:'Protecting the collateral: insurance, maintenance, right of entry, abandonment, condemnation',
    plain:'貸款期間房子還是借款人在住，但房子是貸方唯一的擔保。所以契約要求借款人繳稅、保險、維護房子，並讓貸方可以進來檢查（right of entry）；借款人不管房子（abandonment）時，貸方可以自己進去保護；房子被政府徵收時，補償金先還貸款。',
    life:'你押了一台相機給朋友借錢，但相機還是你在用：朋友會要求你買保險、不要摔、偶爾讓他看看狀況；你出國不管相機了，他可以先拿去收好；相機被沒收的補償金，要先還他錢。',
    body: '<p class="ez lead">第二類條款：<b>保護擔保品</b>。對銀行來說，房子是最後的保障，所以契約要求借款人：繳清會排到銀行前面的稅、保好險、好好維護、真的自住；借款人不做，銀行可以自己進去處理，費用算在借款人頭上。</p><h4>逐一深入</h4>'
      + reD('Charges; liens', '稅捐與 lien', '借款人要繳清所有可能排到房貸前面的東西', [
          '借款人要按時繳房地產稅、特別課徵、HOA 費用、地租等。',
          '若出現優先於房貸的 lien，貸方可以要求借款人在期限內清償或提出擔保。',
          '目的：保住貸方的<b>順位</b>（見第 3 組）。<span class="ez">銀行怕的是「有人插隊到我前面」：欠稅、欠管理費都可能排到房貸前面，所以要求借款人一定要繳清。</span>' ])
      + reD('Hazard (property) insurance', '財產保險', '房子燒掉，保險金先還貸款', [
          ['Mortgagee clause', '保單把貸方列為 loss payee；<b>standard mortgage clause</b> 下，就算借款人違反保單（例如故意縱火），貸方的理賠權利仍然有效。<span class="ez">保單上寫明「理賠金要先給銀行」。就算屋主自己放火、保險公司不賠屋主，銀行那份還是要賠。</span>'],
          ['理賠金用途', '原則上先用來<b>修復</b>房子（擔保品恢復價值）；修復不可行或不經濟時，用來<b>償還貸款</b>。<span class="ez">房子燒了，保險金先拿去把房子修好（擔保品恢復）；修不了或不划算，就拿去還貸款。</span>'],
          ['Force-placed insurance', '借款人沒保或保險失效，貸方可以代為投保（lender-placed），保費通常較貴，加到借款人的債務上。<span class="ez">借款人沒保險，銀行幫他保，但銀行找的保單通常比較貴，錢還是借款人出。</span>'],
          ['其他保險', 'Flood insurance（位於洪水區時強制）；<b>PMI</b> 保的是貸方的違約損失，不是房子。<span class="ez">分清楚：hazard insurance 保房子被燒壞；PMI 保銀行被倒債。</span>'],
          ['台灣對照', '房貸要求投保<b>住宅火災保險＋基本地震險</b>，銀行為抵押權人／受益人。<span class="ez">台灣房貸一定要保火險加地震險，理賠時銀行優先。</span>'] ])
      + reD('Occupancy', '自住條款', '自住貸款要真的自住', [
          '標準文件：借款人應在 60 天內入住，並以主要住所自住至少 1 年。',
          '自住貸款利率較低；謊稱自住實際出租 = <b>occupancy fraud</b>，貸方可以加速到期。<span class="ez">自住貸款的利率比較低，因為自住的人比較不會放棄房子。假裝自住、其實拿去出租就是詐欺，銀行可以要求全部還清。</span>' ])
      + reD('Preservation and maintenance; waste', '維護與禁止毀損', '不能讓房子價值減少', [
          ['Voluntary waste', '主動毀損：拆牆、移走設備、改建降低價值。<span class="ez">Waste 就是「讓房子變不值錢」。主動型：自己動手破壞。</span>'],
          ['Permissive waste', '消極不作為：屋頂漏水不修、讓房子荒廢。<span class="ez">消極型：該修的不修，放著讓它壞。</span>'],
          ['效果', '屬於違約，貸方可以要求停止、修復，甚至加速到期。<span class="ez">就算每月都有繳錢，把房子弄壞也算違約。</span>'],
          ['台灣對照', '民法 §871：抵押人的行為足以使抵押物價值減少，抵押權人可以請求停止；情況急迫時可以自為必要保全處分。§872：價值減少時可以請求回復原狀或提出相當擔保。<span class="ez">台灣民法也有一樣的保護：屋主讓房子變不值錢，銀行可以要求停止、修復或補擔保。</span>'] ])
      + reD('Right of entry / inspection', '進入與檢查權', '貸方可以進入房子查看', [
          ['住宅貸款', '標準文件：貸方可以在<b>合理時間、合理理由</b>下進入並檢查房子；檢查內部時要事先或當時<b>通知</b>借款人。<span class="ez">銀行可以來看房子，但要有正當理由、挑合理的時間，而且要先通知，不能隨便闖進來。</span>'],
          ['違約或棄置時', '貸方可以進入做必要的保全措施（見 abandonment）。'],
          ['Title theory 州', '貸方持有 legal title，理論上有權<b>占有</b>（right of possession）；部分州允許違約後以「和平進入」取得占有（<b>foreclosure by entry</b>，例如麻州）。<span class="ez">在 title theory 的州，銀行名義上擁有房子，所以理論上可以直接進去住；有些州甚至允許銀行「和平地進去占有」就算完成法拍。</span>'],
          ['Mortgagee in possession', '貸方進入占有後要負責管理、收租、維護，並對借款人負<b>報告（accounting）</b>義務 → 責任很重，所以商用貸款通常改用<b>聲請法院指定管理人（receiver）</b>＋ assignment of rents。<span class="ez">銀行真的進去接管房子，就要負責收租、修理、記帳給借款人看，很麻煩。所以實務上多半改請法院指派一個管理人，租金直接交給銀行。</span>'],
          ['和 lien theory 的關係', 'Lien theory 州的貸方沒有占有權，違約前只能檢查，不能接管。<span class="ez">在 lien theory 的州，房子是借款人的，銀行只能看，不能搬進去。</span>'] ])
      + reD('Abandonment', '棄置', '借款人搬走不管房子', [
          ['什麼算棄置', '借款人搬離、不繳款、不維護，且沒有回來的意思（例如房子空置、水電停用、信件堆積）。<span class="ez">棄置＝屋主人走了、房子也不管了，而且看起來不會回來。</span>'],
          ['貸方可以做什麼', '標準文件：貸方可以進入房子<b>保全</b>：換鎖、封門窗、排空水管防凍、修繕、處理違規、關閉水電；也可以處理保險理賠。費用加到借款人的債務上，並計息。<span class="ez">銀行可以進去「顧房子」：換鎖、封窗、防止水管凍裂等。花的錢記在借款人的帳上。</span>'],
          ['為什麼重要', '空屋容易被破壞、侵占、天氣損害，擔保品價值快速下降；有些州對已棄置的房子提供<b>較快的法拍程序</b>。<span class="ez">空房子很容易被破壞、被佔用，價值掉得很快，所以銀行要趕快處理。</span>'],
          ['延伸：walk away', '房價跌到低於貸款（underwater）時，借款人把鑰匙寄回給銀行（jingle mail）就是棄置的一種；<b>無追索權</b>貸款下，這是策略性違約的選項（單元 9 房市危機）。<span class="ez">Jingle mail：屋主把鑰匙裝信封寄回銀行，鑰匙在信封裡叮噹響，所以叫 jingle mail。意思是「房子不要了，你拿去吧」。</span>'],
          ['易混淆', '棄置<b>不會</b>自動讓所有權移轉給貸方；貸方仍要法拍或取得 deed in lieu。<span class="ez">屋主跑了，房子也不會自動變成銀行的；銀行還是要走法拍，或請屋主簽字把房子交出來。</span>'] ])
      + reD('Protection of lender’s security', '保護貸方權益', '借款人不做，貸方先代墊', [
          '借款人沒繳稅、沒保險、沒維修，或有法律程序（破產、徵收、其他 lien 法拍）影響房子時，貸方可以先代付或代為處理。<span class="ez">借款人該做的事沒做，銀行可以先幫他做。</span>',
          '代墊的錢加到貸款餘額、計息，並受同一個抵押擔保。<span class="ez">銀行代墊的錢也加進貸款，同樣由這間房子擔保，還會算利息。</span>' ])
      + reD('Condemnation / eminent domain', '徵收', '補償金先還貸款', [
          '政府依 <b>eminent domain</b>（徵收權）取得房子時，徵收補償金（condemnation award）先用來償還貸款。<span class="ez">政府徵收房子要給補償金，這筆錢先拿去還銀行，因為銀行的擔保品沒了。</span>',
          '部分徵收時，依比例或依契約分配。',
          ['台灣對照', '民法 §881：抵押物滅失時抵押權消滅，但抵押人因滅失得受的<b>賠償金、保險金、補償金</b>，抵押權人仍可就其受償（<b>物上代位</b>）。<span class="ez">物上代位＝房子沒了，但「代替房子的錢」（保險金、補償金）還在，抵押權就轉到這筆錢上。</span>'] ]),
    terms:[['mortgagee clause','貸方受益條款'],['force-placed insurance','貸方代為投保'],['occupancy','自住條款'],['voluntary / permissive waste','主動／消極毀損'],['right of entry','進入權'],['mortgagee in possession','占有中的抵押權人'],['receiver','法院指定的管理人'],['abandonment','棄置'],['jingle mail','把鑰匙寄回銀行'],['condemnation / eminent domain','徵收／徵收權'],['物上代位','抵押物變成補償金時仍可受償']] },

  { id:'re1q', t:'③ 移轉與順位條款：Due-on-sale、Assumption、Subject to、Subordination、Future advance', en:'Transfer and priority clauses',
    plain:'房子賣掉時，舊房貸怎麼辦？Due-on-sale 讓貸方可以要求還清；如果貸方同意，買方可以承接（assumption）並負責；買方也可能只「附帶」取得房子（subject to），自己不負責。另外，貸方可以把債權賣掉（assignment）、可以同意讓位（subordination）、也可以用同一個抵押擔保之後追加的貸款（future advance）。',
    life:'你把有分期的手機轉賣給同學：店家可以要求你先繳清（due-on-sale）；或同學正式改當分期的人（assumption）；或同學拿走手機、每月把錢給你，但合約上還是你（subject to），他不付時店家找的是你。',
    body: '<p class="ez lead">第三類條款：<b>房子或貸款換人</b>時怎麼辦。房子賣給別人，舊貸款要不要還？買方能不能接手？銀行能不能把貸款賣掉？順位能不能調整？這張卡的名詞很多，最後一張「易混淆比較」會整理成表格。</p><h4>逐一深入</h4>'
      + reD('Due-on-sale clause', '轉讓即到期條款', '房子移轉時，貸方可以要求全部還清', [
          ['觸發', '出售、贈與、設定長期租約附買權等<b>移轉房子權利</b>的行為，未經貸方同意。<span class="ez">只要你把房子的權利交給別人，沒問過銀行，就會觸發。</span>'],
          ['本質', '一種<b>加速條款</b>，觸發事件是「移轉」而不是「沒付錢」。貸方是<b>可以</b>（may）要求，不是一定要求。<span class="ez">它是加速條款的一種：平常是「沒繳錢」才加速，這裡是「房子賣掉」就加速。銀行可以選擇要不要用。</span>'],
          ['為什麼', '① 利率上升時，舊貸款利率低於市場，貸方希望收回重新放款；② 新屋主的信用風險貸方沒審核過。<span class="ez">例：你的房貸利率 2%，現在市場是 6%。如果買方可以直接接手你的 2% 房貸，銀行就虧大了，所以銀行會要求房子一賣就全部還清，再用 6% 借給新的人。</span>'],
          ['歷史', '1970 年代末利率飆升，部分州（例如加州）限制 due-on-sale；1982 年 <b>Garn-St Germain Act</b> 讓聯邦層級的 due-on-sale 原則上可執行。<span class="ez">利率暴漲的年代，大家都想把低利舊貸款轉給買方，引發很多爭議，最後聯邦法律確定銀行可以執行 due-on-sale。</span>'],
          ['法定例外（住宅）', '移轉給配偶或子女、因死亡移轉給親屬、離婚、放進借款人仍是受益人的生前信託、設定二胎、3 年以下且無買權的租約 → 貸方<b>不能</b>因此加速。<span class="ez">家人之間的移轉（給配偶、小孩、繼承、離婚）不能觸發，因為這些不是在「賣」房子。</span>'],
          ['規避的風險', 'Wraparound、land contract、subject to 都可能觸發 due-on-sale。<span class="ez">想偷偷保留舊的低利貸款的各種安排，都可能被銀行要求全部還清。</span>'] ])
      + reD('Assumption', '承受（承接）貸款', '買方接手舊貸款並負個人責任', [
          ['內容', '買方取得房子並<b>承接</b>原貸款，對 note 負<b>個人責任</b>；通常要貸方審核買方信用、收承接費（assumption fee）。<span class="ez">Assumption＝買方「接手」舊貸款，以後由買方繳，而且買方要對這筆債負責。銀行要先審核買方。</span>'],
          ['原借款人', '除非貸方同意 <b>novation</b>（債務更替），原借款人仍負<b>次要責任</b>（像保證人）：買方不付、拍賣不足時，貸方仍可以追原借款人。<span class="ez">除非銀行同意換人（novation），否則原本的屋主還是像保證人：買方不繳、拍賣也不夠時，銀行還可以找原屋主。</span>'],
          ['誰會承接', '利率上升時，承接低利率舊貸款很划算 → 舊貸款的價值會反映在房價裡（買方願意多付）。<span class="ez">例：市場利率 6%，舊貸款只有 3%，買方接手可以省很多利息，所以願意為這間房子多付一點錢。</span>'],
          ['可承接的貸款', '<b>FHA、VA</b> 貸款通常可承接（assumable）；一般傳統貸款多有 due-on-sale，不可承接。商用貸款常允許「一次有條件的承接」。<span class="ez">政府保險的 FHA、VA 貸款可以被接手；一般房貸通常不行（有 due-on-sale）。</span>'],
          ['買方的價格', '買方付給賣方 = 房價 − 承接的貸款餘額（賣方的權益）。<span class="ez">例：房價 1,000 萬、舊貸款還欠 600 萬。買方接手貸款，只要再付賣方 400 萬。</span>'] ])
      + reD('Acquire title subject to a mortgage', '附帶抵押取得所有權', '買方拿到房子，但不對貸款負責', [
          ['內容', '買方取得房子的所有權，房子上的抵押<b>仍然存在</b>（抵押跟著房子走），但買方<b>沒有</b>承諾還款、不負個人責任。原借款人仍是 note 上的債務人。<span class="ez">Subject to＝買方拿到房子，房子上的抵押也還在，但買方「沒有簽字說會還」，所以那筆債還是原屋主的。</span>'],
          ['買方怎麼做', '通常買方會繼續繳款以免房子被法拍，但這是買方的<b>選擇</b>，不是義務。<span class="ez">買方通常還是會繼續繳，因為不繳房子就會被拍賣；但法律上他沒有義務。</span>'],
          ['違約時', '貸方可以<b>法拍房子</b>（lien 還在）；拍賣不足的差額只能向<b>原借款人</b>追討，不能向買方追討。<span class="ez">銀行可以拍賣房子，但不夠的部分只能找原屋主要，不能找買方。</span>'],
          ['買方的最大損失', '就是他投入的權益（付給賣方的錢＋已付的本金）。例：房價 1,000 萬、舊貸款 600 萬，買方付賣方 400 萬 subject to；房價跌到 500 萬，買方停止付款 → 買方損失 400 萬，房子被法拍；不足的 100 萬由<b>賣方</b>負責（有追索權時）。<span class="ez">所以 subject to 的買方，最多只會損失他已經放進去的錢；賣方的風險反而很大。</span>'],
          ['風險', '對賣方：信用和財產仍暴露在買方的行為下；對買方：可能觸發 due-on-sale，被要求全部還清。<span class="ez">雙方都有風險：賣方的信用掌握在買方手上；買方則可能被銀行要求立刻還清。</span>'],
          ['其他情境', '① Junior lien 法拍時，買受人取得的房子 subject to senior mortgage；② 繼承、贈與取得有抵押的房子；③ 台灣：抵押權有<b>追及效力</b>，不動產所有權移轉後抵押權不受影響（民法 §867），買方取得的房子仍附抵押權。<span class="ez">台灣的抵押權會「跟著房子走」：房子賣掉，抵押權還在房子上，買方買到的是有負擔的房子。</span>'] ])
      + reD('Novation', '債務更替', '新債務人取代舊債務人', [
          '貸方、原借款人、買方三方同意：買方成為唯一債務人，原借款人<b>責任解除</b>。<span class="ez">Novation＝三方同意換人，舊的債務人完全脫身，以後只找新的人。</span>',
          '比較：assumption without novation → 原借款人仍有次要責任。<span class="ez">一句話：assumption 沒有 novation，原屋主還是跑不掉。</span>' ])
      + reD('Assignment clause', '債權轉讓', '貸方可以把貸款賣掉', [
          '貸方可以把 note 和 mortgage 轉讓給第三人（次級市場、證券化），<b>不需借款人同意</b>；借款人的條件不變。<span class="ez">銀行可以把你的房貸賣給別人，不用問你；你的利率、月付款都不變。</span>',
          '<b>Sale of note vs change of servicer</b>：誰擁有貸款（investor）和誰收款（servicer）可以不同；美國法規要求更換 servicer 時通知借款人。<span class="ez">「擁有你貸款的人」和「每月向你收錢的人」可以不同。換收款機構時一定要通知你，才不會繳錯地方。</span>',
          '連結單元 4–7：貸款被賣進 MBS 的法律基礎。<span class="ez">證券化之所以可行，就是因為有這條：銀行可以自由把貸款賣掉。</span>',
          '台灣：民法 §295 債權讓與時，擔保（抵押權）隨同移轉；§297 要通知債務人才對債務人生效。<span class="ez">台灣也一樣，債權賣掉時抵押權跟著走，但要通知借款人。</span>' ])
      + reD('Subordination clause', '順位讓與條款', '事先約定：我的 lien 排在之後的貸款後面', [
          ['內容', '寫在<b>原本順位在前</b>的抵押契約中，同意將來某筆貸款（通常是建築貸款或再融資）排在自己前面。事後另簽的叫 <b>subordination agreement</b>。<span class="ez">Subordination＝「我讓你排前面」。可以在原本的契約裡事先答應，也可以事後另外簽。</span>'],
          ['典型例子', '<b>土地賣方融資</b>：開發商向地主買地，地主提供 purchase-money mortgage（第一順位）；建築貸款銀行要求第一順位才肯撥款 → 地主在契約中同意 subordinate。<span class="ez">例：建商跟地主買地，錢不夠，地主說「剩下的你欠我，土地押給我」。但建商還要向銀行借錢蓋房子，銀行堅持要第一順位，所以地主得事先同意讓銀行排到自己前面。</span>'],
          ['再融資例子', '屋主有第一順位房貸＋HELOC；第一順位再融資後新貸款登記較晚 → HELOC 貸方簽 subordination agreement，新貸款才是第一順位。<span class="ez">轉貸時新貸款登記得比較晚，本來會排在 HELOC 後面，所以要 HELOC 的銀行簽字讓位。</span>'],
          ['讓位方的保護', '讓位使自己風險變高，所以會限制：前面貸款的<b>最高金額</b>、利率、用途（只能用於建築），並要求較高利率。<span class="ez">讓位的人風險變高，所以會限制：排在我前面的貸款最多多少錢、只能用來蓋房子，並收比較高的利率。</span>'],
          ['反向', '也可能是前順位貸方同意某筆 lien 排在前面（例如公共設施用地）。<span class="ez">反過來也有：排前面的人同意讓某個 lien 插隊。</span>'],
          ['台灣對照', '民法 §870-1：抵押權人可以為特定抵押權人的利益，<b>讓與或拋棄</b>其抵押權之次序，並登記。<span class="ez">台灣也可以讓順位，要去登記。</span>'] ])
      + reD('Future advance clause', '追加貸款條款', '之後再借的錢也由同一個抵押擔保', [
          ['內容', '抵押不只擔保第一次撥款，也擔保之後的<b>追加撥款</b>，不用重新設定與登記。<span class="ez">同一個抵押權可以擔保以後再借的錢。</span>'],
          ['用途', '<b>Construction loan</b>（依工程進度撥款）、<b>open-end mortgage</b>、<b>HELOC</b>（循環額度）、商用信用額度。<span class="ez">蓋房子依進度撥款、HELOC 這類「之後還會再借」的貸款都需要這條。</span>'],
          ['順位問題', '<b>Obligatory</b>（貸方有義務撥）→ 多數州保有原順位；<b>optional</b>（貸方可選擇）且已知有中間 lien → 追加部分可能排在中間 lien 之後。很多州另有法規讓 HELOC 的追加撥款保有原順位。<span class="ez">追加的錢排在哪：銀行「必須撥」的保有原順位；銀行「可以選擇撥」而且知道中間有人插隊，追加的部分就排在那個人後面。</span>'],
          ['上限', '通常約定最高額度（maximum amount），讓後順位的人知道前面最多有多少。<span class="ez">設上限，後面的人才知道自己前面最多會有多少債。</span>'],
          ['台灣對照', '<b>最高限額抵押權</b>（民法 §881-1）：在最高限額內擔保一定範圍的不特定債權，概念相同。<span class="ez">這就是台灣的最高限額抵押權。</span>'] ])
      + reD('Release clause', '解除條款', '還清或賣掉一部分，就解除 lien', [
          '<b>全部還清</b>：貸方出具 <b>satisfaction / release of mortgage</b>（deed of trust 是 <b>reconveyance</b>）並登記。<span class="ez">還清後，銀行要出一份「抵押已解除」的文件並登記，房子才算乾淨。</span>',
          '<b>Partial release</b>：blanket mortgage 下，開發商賣掉一塊地並償還約定金額（常是該筆分攤金額的 110–125%），那塊地就解除抵押 → 買方才能取得乾淨產權。<span class="ez">例：建商用整片地擔保一筆貸款，每賣出一塊地就多還一點（通常比平均分攤的金額多 10–25%），銀行就把那塊地解除抵押，買方拿到的土地才沒有負擔。</span>',
          '台灣：還清後銀行出具清償證明與<b>抵押權塗銷</b>同意書，到地政事務所辦理塗銷登記。<span class="ez">台灣還清房貸後要記得去塗銷抵押權，不然謄本上還會顯示有抵押。</span>' ]),
    terms:[['due-on-sale clause','轉讓即到期條款'],['Garn-St Germain Act','1982 年承認 due-on-sale 的聯邦法'],['assumption','承受（負個人責任）'],['assumption fee','承接手續費'],['subject to','附帶取得（不負個人責任）'],['novation','債務更替'],['assignment','債權轉讓'],['servicer','收款服務機構'],['subordination clause / agreement','順位讓與條款／協議'],['future advance clause','追加貸款條款'],['obligatory / optional advance','義務性／選擇性撥款'],['partial release','部分解除']] },

  { id:'re1r', t:'④ 違約與補救條款：Acceleration、Right to reinstate、Forbearance', en:'Default clauses: acceleration, reinstatement, forbearance',
    plain:'借款人違約時，貸方可以宣告整筆貸款立刻到期（acceleration）；但借款人在法拍前補繳欠款和費用，就能讓貸款恢復正常（right to reinstate）；雙方也可以協議暫時少繳或停繳（forbearance）。另外，貸方一時睜一隻眼閉一隻眼，不代表放棄權利（forbearance not a waiver）。',
    life:'學校社團費：你三個月沒繳，社長說「全年度一次繳清」（acceleration）；你在被退社前補繳那三個月加手續費，就恢復正常（reinstate）；社長也可以說「這兩個月先不用繳，之後再補」（forbearance）。',
    body: '<p class="ez lead">第四類條款：<b>不付錢時怎麼辦</b>。主線是：違約 → 銀行通知你補救 → 沒補救就「加速」（全部到期）→ 法拍。中間借款人有幾次機會補救或協商。最後的時間軸表格把每個權利放在對的時間點。</p><h4>逐一深入</h4>'
      + reD('Acceleration clause', '加速條款', '違約時，全部剩餘本金立即到期', [
          ['觸發', '未付款（最常見）、違反 covenant（沒繳稅、沒保險、毀損房子、謊稱自住）、未經同意移轉（due-on-sale）、破產。<span class="ez">不只是沒繳錢，違反任何承諾（沒繳稅、沒保險、弄壞房子）都可能觸發。</span>'],
          ['Optional vs automatic', '房貸幾乎都是 <b>optional</b>：貸方「可以」加速，不是自動。所以貸方可以選擇不加速、先協商。<span class="ez">銀行「可以」要求全部還清，但不是自動發生。很多銀行會先跟借款人談。</span>'],
          ['程序', '標準文件：加速前要寄 <b>notice</b>，寫明違約事項、補救方法、補救期限（<b>至少 30 天</b>），並告知借款人有 reinstate 和在法拍中抗辯的權利。<span class="ez">銀行不能說加速就加速，要先寄信告訴你哪裡違約、怎麼補救、最晚什麼時候（至少給 30 天）。</span>'],
          ['為什麼是法拍的前提', '沒有加速，貸方只能就<b>已到期</b>的分期款請求；加速後整筆貸款到期，才能法拍並以全部餘額受償。<span class="ez">沒有加速時，銀行只能追「已經到期沒繳的那幾個月」；加速後，剩下幾百萬全部變成「現在就要還」，銀行才能拍賣房子拿回全部的錢。</span>'],
          ['加速之後', '借款人要保住房子，原則上要付清<b>全部</b>餘額（equity of redemption）；除非州法或契約給予 right to reinstate。<span class="ez">加速後要保住房子，原則上要一次還清全部，這對大部分人來說不可能。</span>'],
          ['台灣對照', '借款契約常約定借款人遲延或違約時「<b>喪失期限利益</b>」，銀行得請求立即清償全部借款；分期付款買賣另有民法 §389 的限制（遲付達總價 1/5 才能請求全部）。<span class="ez">台灣叫「喪失期限利益」：本來可以分 20 年慢慢還的好處沒了，銀行可以要求一次還清。</span>'] ])
      + reD('Right to reinstate', '恢復原狀權', '補繳欠款＋費用，貸款恢復正常、不用付清全部', [
          ['內容', '加速之後、法拍之前，借款人只要付清<b>如同沒加速時應付的欠款</b>（逾期本息）＋ late charge ＋ 貸方的合理費用（律師費、檢查費），並補正其他違約 → 貸款<b>恢復</b>原本的分期，加速視為沒發生。<span class="ez">例：欠了 3 期共 15 萬，銀行已經要求還清全部 800 萬。借款人只要補繳 15 萬加上罰款和律師費，貸款就恢復成原本的分期，好像沒加速過。</span>'],
          ['期限', '標準文件：在以下最早者之前：① power of sale 拍賣前 <b>5 天</b>；② 州法規定的期間；③ 法院作出執行判決前。<span class="ez">最晚大概在拍賣前 5 天，超過就不能用了。</span>'],
          ['不適用', '因 <b>due-on-sale</b>（移轉）而加速時，標準文件不給 reinstate（否則 due-on-sale 就沒有意義）。<span class="ez">因為賣房子而被要求還清時不能用這招，不然 due-on-sale 就沒有意義了。</span>'],
          ['和 redemption 的差別', '<b>Reinstate</b>：付<b>欠的部分</b>，貸款繼續；<b>Equity of redemption</b>：付<b>全部餘額</b>，貸款結束；<b>Statutory redemption</b>：法拍<b>之後</b>付拍定價（或債務）買回。<span class="ez">三個很像的名詞：reinstate 補「欠的」→ 貸款繼續；equity of redemption 付「全部」→ 貸款結束、房子保住；statutory redemption 是拍賣「之後」再買回來。</span>'],
          ['為什麼法律要給', '加速讓借款人一次要付幾百萬，幾乎不可能；reinstatement 給暫時有困難但恢復收入的人一條路，貸方也避免法拍成本。<span class="ez">對雙方都好：借款人只是暫時困難，補上就好；銀行也不用花錢跑法拍。</span>'],
          ['台灣對照', '沒有法定的 reinstatement；實務上借款人補繳後與銀行協商<b>恢復分期</b>或展延。<span class="ez">台灣法律沒有這個權利，但實務上可以跟銀行談。</span>'] ])
      + reD('Forbearance（協議）', '暫緩付款協議', '暫時減少或停止付款，之後再補', [
          ['內容', '貸方同意在一段期間（例如 3–12 個月）<b>減少或暫停</b>付款，期間不法拍；利息通常<b>繼續累積</b>。<span class="ez">Forbearance＝銀行同意「這幾個月先少繳或不繳」，但利息照算，之後要補。</span>'],
          ['結束後怎麼補', '① 一次補繳（lump sum）；② <b>repayment plan</b>（分幾個月加在月付款裡）；③ <b>deferral / partial claim</b>（欠款移到貸款最後才付）；④ 轉成 <b>loan modification</b>。<span class="ez">暫停結束後怎麼補：一次補清、分幾個月攤、移到貸款最後再付，或直接改成新的貸款條件。</span>'],
          ['適用', '<b>暫時性</b>困難：失業、生病、天災。例：2020 年 COVID 期間，美國 CARES Act 讓聯邦相關房貸可以申請最長約 12 個月的 forbearance。<span class="ez">適合「暫時」出狀況的人，例如疫情時失業。</span>'],
          ['和其他 workout 比較', 'Forbearance：<b>暫時</b>、條件不變；loan modification：<b>永久</b>改利率、期限或本金；short sale、deed in lieu：放棄房子。<span class="ez">比較：forbearance 是暫停一下，條件不變；modification 是永久改條件；short sale、deed in lieu 是不要房子了。</span>'],
          ['台灣對照', '銀行的<b>展延、緩繳本金（只繳息）</b>，例如疫情或天災時的紓困方案。<span class="ez">台灣的「展延」「只繳息不還本」就是類似的概念。</span>'] ])
      + reD('Forbearance by lender not a waiver', '貸方容忍不代表放棄', '這次沒追究，下次仍可追究', [
          ['內容', '貸方接受遲付、部分付款，或一時沒有行使加速等權利，<b>不代表放棄</b>之後行使的權利。<span class="ez">銀行這次對你遲繳睜一隻眼閉一隻眼，不代表以後都不會追究。</span>'],
          ['為什麼需要', '法律上有 <b>waiver</b>（棄權）和 <b>estoppel</b>（禁反言）：如果貸方長期接受遲付，借款人可能主張貸方已放棄準時付款的要求。這個條款就是防止這種主張。<span class="ez">如果銀行一直接受你晚繳，法律上你可能主張「銀行已經默許可以晚繳」。這條就是先講好：不管銀行之前多寬容，都不算放棄權利。</span>'],
          ['同一條', '<b>Borrower not released</b>：貸方延長付款期限或修改條件，不會解除原借款人（或承接前的原借款人）的責任。<span class="ez">銀行給你延期或改條件，你原本的責任不會因此消失。</span>'],
          ['實務', '貸方要恢復嚴格執行前，通常仍會先寄通知，避免爭議。<span class="ez">銀行如果之前一直很寬容，想恢復嚴格執行前，通常會先通知你。</span>'] ])
      + reD('Notice and cure', '通知與補救期間', '違約到加速之間的緩衝', [
          '多數違約要先通知、給 <b>cure period</b>（補救期間），借款人在期限內補正就不加速。<span class="ez">違約後先給你一段時間改正，改正了就沒事。</span>',
          '美國住宅：聯邦法規原則上要求逾期超過 <b>120 天</b>才能開始法拍程序，期間 servicer 要聯絡借款人、評估 loss mitigation（workout）選項。<span class="ez">美國規定逾期 120 天以上才能開始法拍，中間銀行要主動聯絡你、看看有沒有其他解法。</span>' ])
      + '<h4>時間軸：哪個權利在什麼時候</h4><div class="tblwrap"><table class="tbl"><tr><th>階段</th><th>借款人可以</th><th>要付多少</th></tr>'
      + '<tr><td>逾期、收到違約通知</td><td><b>Cure</b>（補救）；申請 <b>forbearance</b>、modification</td><td>欠的分期款</td></tr>'
      + '<tr><td>貸方 <b>accelerate</b> 之後、法拍前</td><td><b>Reinstate</b>（到拍賣前約 5 天）</td><td>欠款＋費用</td></tr>'
      + '<tr><td>法拍拍定前</td><td><b>Equity of redemption</b>；short sale、deed in lieu</td><td>全部餘額＋費用</td></tr>'
      + '<tr><td>法拍之後（部分州）</td><td><b>Statutory redemption</b></td><td>拍定價（＋利息費用）</td></tr></table></div><span class="ez">讀法：越往下走，借款人要付的錢越多，選擇越少。越早處理越好。</span>',
    terms:[['acceleration clause','加速條款'],['optional acceleration','貸方可選擇加速'],['notice and cure','通知與補救'],['right to reinstate','恢復原狀權'],['forbearance agreement','暫緩付款協議'],['repayment plan','補繳計畫'],['deferral','欠款移到最後'],['waiver / estoppel','棄權／禁反言'],['borrower not released','借款人責任不解除'],['喪失期限利益','台灣的加速到期']] },

  { id:'re1s', t:'易混淆比較：這些條款到底差在哪', en:'Commonly confused mortgage terms',
    plain:'很多條款名字很像、效果很像，考試最愛考比較。這張卡把容易搞混的放在一起對照：加速 vs 轉讓到期、承接 vs 附帶取得 vs 債務更替、恢復 vs 贖回、各種「解除」與「讓位」、提前還款的各種限制，以及 escrow 的兩個意思。',
    life:'就像「退貨、換貨、退款、折讓」：都跟「買了不滿意」有關，但誰付錢、東西去哪裡完全不同。',
    body: '<p class="ez lead">這張是<b>總整理</b>：把前面四類條款中名字很像、最容易搞混的放在一起比較。每張表後面都有一句話的記法，考前看這張就好。</p><h4>1. Acceleration vs Due-on-sale</h4><div class="tblwrap"><table class="tbl"><tr><th></th><th>Acceleration clause</th><th>Due-on-sale clause</th></tr><tr><td>觸發</td><td>違約（沒付錢、違反 covenant）</td><td>未經同意<b>移轉</b>房子</td></tr><tr><td>效果</td><td colspan="2">都是：全部餘額立即到期（due-on-sale 是加速的一種）</td></tr><tr><td>可以 reinstate？</td><td>可以（標準文件）</td><td>不行</td></tr><tr><td>貸方目的</td><td>止損、啟動法拍</td><td>利率上升時收回低利貸款、控管新借款人信用</td></tr></table></div><span class="ez">記法：acceleration 是「你沒付錢」→ 全部到期；due-on-sale 是「你把房子賣了」→ 全部到期。前者可以補繳恢復，後者不行。</span>'
      + '<h4>2. Assumption vs Subject to vs Novation</h4><div class="tblwrap"><table class="tbl"><tr><th></th><th>Assumption</th><th>Subject to</th><th>Novation</th></tr><tr><td>買方個人責任</td><td>有（主要）</td><td><b>沒有</b></td><td>有（唯一）</td></tr><tr><td>原借款人責任</td><td>仍有（次要）</td><td>仍有（主要）</td><td><b>解除</b></td></tr><tr><td>貸方同意</td><td>通常需要</td><td>不需要（但可能觸發 due-on-sale）</td><td>需要</td></tr><tr><td>違約時貸方可追</td><td>房子＋買方＋原借款人</td><td>房子＋原借款人</td><td>房子＋買方</td></tr><tr><td>買方最大損失</td><td>可能超過房價（被追不足額）</td><td>投入的權益</td><td>可能超過房價</td></tr></table></div><span class="ez">記法：看「誰要負責還錢」。Assumption：買方和原屋主都要負責；Subject to：只有原屋主要負責，買方不用；Novation：只有買方要負責，原屋主解脫。</span>'
      + '<h4>3. Forbearance vs Modification vs Reinstate vs Redemption</h4><div class="tblwrap"><table class="tbl"><tr><th></th><th>時間點</th><th>付多少</th><th>之後</th></tr><tr><td>Forbearance</td><td>違約前後，協議</td><td>暫時少付或不付</td><td>之後補繳，條件不變</td></tr><tr><td>Loan modification</td><td>違約前後，協議</td><td>新的月付款</td><td><b>永久</b>改條件</td></tr><tr><td>Reinstatement</td><td>加速後、法拍前（權利）</td><td>欠款＋費用</td><td>貸款恢復原狀</td></tr><tr><td>Equity of redemption</td><td>法拍完成前（權利）</td><td>全部餘額</td><td>貸款結束，保住房子</td></tr><tr><td>Statutory redemption</td><td>法拍<b>後</b>（部分州）</td><td>拍定價等</td><td>買回房子</td></tr></table></div><p>另外：「forbearance by lender not a waiver」是契約條款，講的是<b>貸方的容忍不等於放棄</b>，和 forbearance 協議不是同一件事。</p><span class="ez">記法：forbearance 暫停、modification 永久改、reinstate 補欠的、equity of redemption 付全部（拍賣前）、statutory redemption 拍賣後買回。</span>'
      + '<h4>4. 順位與解除</h4><div class="tblwrap"><table class="tbl"><tr><th>名詞</th><th>做什麼</th></tr><tr><td>Subordination</td><td>前順位<b>讓位</b>給後面的貸款，lien 還在</td></tr><tr><td>Future advance</td><td>新借的錢併入<b>原本</b>的抵押，盡量保有原順位</td></tr><tr><td>Release / satisfaction of mortgage</td><td>還清後<b>解除</b> mortgage 的 lien</td></tr><tr><td>Reconveyance</td><td>還清後 deed of trust 的 trustee 把 title <b>還給</b>借款人</td></tr><tr><td>Partial release</td><td>Blanket mortgage 中<b>解除一部分</b>不動產</td></tr><tr><td>Defeasance clause</td><td>（title theory）還清後貸方的權利<b>消滅</b></td></tr><tr><td>Defeasance（商用貸款）</td><td>用<b>公債</b>替換房子當擔保，以解除 lien（同一個字，意思不同！）</td></tr></table></div><span class="ez">記法：subordination「讓位」、future advance「加借」、release／reconveyance「還清解除」、partial release「解除一部分」。defeasance 有兩個意思要分開記。</span>'
      + '<h4>5. 提前還款的限制</h4><div class="tblwrap"><table class="tbl"><tr><th></th><th>能不能提前還</th><th>成本</th><th>常見於</th></tr><tr><td>Lockout period</td><td><b>不能</b></td><td>—</td><td>商用、CMBS 貸款的前幾年</td></tr><tr><td>Prepayment penalty（固定％、step-down）</td><td>可以</td><td>餘額的固定比例</td><td>住宅（有限制）、商用</td></tr><tr><td>Yield maintenance</td><td>可以</td><td>補足貸方少賺的利息，利率越低越貴</td><td>商用</td></tr><tr><td>Defeasance</td><td>以公債替換</td><td>買公債的成本＋手續費</td><td>CMBS</td></tr><tr><td>Open period</td><td>可以</td><td>免</td><td>到期前幾個月</td></tr></table></div><span class="ez">記法：從最嚴到最鬆：lockout（不能還）→ defeasance（用公債換）→ yield maintenance（補足少賺的利息）→ 固定％違約金 → open period（免費還）。</span>'
      + '<h4>6. Escrow 的兩個意思</h4><ul><li><b>Escrow account</b>（impound account）：貸款期間，每月代收、代繳稅和保險的帳戶。</li><li><b>Escrow（交割）</b>：買賣交易時，中立第三人保管價金和文件直到交割（closing）；台灣的<b>價金履約保證</b>。</li></ul><span class="ez">記法：貸款期間的 escrow 是「代繳稅和保險」；買賣時的 escrow 是「中立第三方保管錢和文件」。</span>'
      + '<h4>7. Lien 相關</h4><ul><li><b>Tax lien（房地產稅）</b>不論時間最優先；<b>federal tax lien</b> 依登記時間。</li><li><b>Judgment lien</b>：一般 lien、非自願、依登記時間；<b>mortgage lien</b>：特定 lien、自願、依登記時間。</li><li><b>Senior 法拍</b>塗銷 junior；<b>junior 法拍</b>的買受人 subject to senior。</li></ul><span class="ez">記法：房地產稅永遠第一，其他看登記先後。前面的人拍賣會清掉後面的；後面的人拍賣，前面的還在。</span>',
    terms:[['acceleration vs due-on-sale','違約觸發 vs 移轉觸發'],['assumption vs subject to','負責 vs 不負責'],['reinstatement vs redemption','付欠款 vs 付全部'],['subordination vs release','讓位 vs 解除'],['lockout vs prepayment penalty','不能還 vs 還要付錢']] }
);

DATA.re.mcq.push(
  { u:'re1', q:'Which lien generally takes priority over a first mortgage regardless of when it attached?', o:['Judgment lien','Federal income tax lien','Property tax lien','Second mortgage'], a:2, e:'房地產稅（ad valorem property tax）lien 不論時間最優先；聯邦所得稅 lien 原則上依登記時間排序。' },
  { u:'re1', q:'A judgment lien is best described as a:', o:['specific, voluntary lien','general, involuntary lien','specific, involuntary lien','general, voluntary lien'], a:1, e:'判決 lien：非自願、及於債務人在該郡所有不動產（一般 lien）。Mortgage lien 是特定、自願。' },
  { u:'re1', q:'A judgment lien was recorded in 2019 against a homeowner, who refinanced in 2021 with a new first mortgage (not a purchase-money mortgage) and no subordination. Generally, which is paid first after property taxes?', o:['The 2021 mortgage','The judgment lien','They share pro rata','Whichever is larger'], a:1, e:'依登記先後：2019 的 judgment lien 在前。只有 purchase-money mortgage 或 subordination 才能改變。' },
  { u:'re1', q:'A period during which a commercial mortgage cannot be prepaid at all, even with a penalty, is a:', o:['grace period','lockout period','cure period','open period'], a:1, e:'Lockout period；之後通常是 yield maintenance／defeasance，最後是 open period。' },
  { u:'re1', q:'Yield maintenance prepayment penalties become larger when:', o:['market interest rates rise','market (Treasury) rates fall relative to the note rate','the loan is near maturity','the borrower’s credit improves'], a:1, e:'補償的是（貸款利率 − 公債利率）的現值；市場利率越低，貸方少賺越多，違約金越高。' },
  { u:'re1', q:'A borrower who, after acceleration, pays only the past-due amounts plus the lender’s costs to restore the loan is exercising the:', o:['equity of redemption','statutory right of redemption','right to reinstate','due-on-sale right'], a:2, e:'Reinstate 付欠款＋費用，貸款恢復；equity of redemption 要付全部餘額。' },
  { u:'re1', q:'Under the uniform mortgage instrument, the right to reinstate is NOT available when the loan was accelerated because of:', o:['missed payments','failure to pay property taxes','an unapproved transfer of the property (due-on-sale)','failure to maintain insurance'], a:2, e:'因 due-on-sale 加速時不能 reinstate，否則轉讓條款形同虛設。' },
  { u:'re1', q:'A buyer takes title “subject to” the existing mortgage and later stops paying. The lender can:', o:['sue the buyer for any deficiency','foreclose and pursue only the original borrower for any deficiency','not foreclose because title changed','only collect from the title insurer'], a:1, e:'Lien 跟著房子走，可以法拍；買方沒有個人責任，不足額只能追原借款人。' },
  { u:'re1', q:'A temporary agreement in which the lender allows reduced or suspended payments, to be repaid later, is a:', o:['loan modification','forbearance agreement','novation','deed in lieu'], a:1, e:'Forbearance 是暫時的；loan modification 是永久改條件。' },
  { u:'re1', q:'A land seller who finances the sale agrees in the mortgage that a future construction loan will have priority. This is a:', o:['future advance clause','subordination clause','release clause','due-on-sale clause'], a:1, e:'Subordination clause：前順位事先同意讓位。' },
  { u:'re1', q:'If the borrower abandons the property, the uniform instrument allows the lender to:', o:['take title automatically','secure the property (e.g., change locks, board up windows) and add the costs to the debt','cancel the note','sell the property without foreclosure in every state'], a:1, e:'棄置時貸方可以進入保全，費用加到債務；所有權仍要透過法拍或 deed in lieu 才移轉。' },
  { u:'re1', q:'The lender’s contractual right to enter and inspect the property upon reasonable notice is the:', o:['right of entry / inspection clause','assignment of rents','power of sale','defeasance clause'], a:0, e:'Right of entry／inspection；違約時在 title theory 州還可能主張占有。' },
  { u:'re1', q:'The main reason lenders require an escrow (impound) account is to:', o:['earn extra interest','ensure property taxes and insurance are paid so the lien and collateral are protected','allow prepayment','avoid due-on-sale'], a:1, e:'沒繳稅 → tax lien 排到前面；沒保險 → 擔保品沒保障。' },
  { u:'re1', q:'依民法 §867，抵押人將不動產讓與他人後，抵押權：', o:['自動消滅','不受影響（追及效力）','轉為普通債權','需重新登記才存在'], a:1, e:'抵押權有追及效力，買方取得的房子仍附抵押權，相當於 subject to。' }
);
