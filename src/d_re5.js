// ===== 單元 1 補充（五）：美國 vs 台灣對照（課程以美國制度為主，這裡並排整理台灣） =====
// reCmp：對照表，每列 [項目, 美國, 台灣, 差在哪／考點]
const reCmp = rows => `<div class="tblwrap"><table class="tbl cmp"><tr><th>項目</th><th class="us">美國（課程重點）</th><th class="tw">台灣</th><th>差在哪／考點</th></tr>${rows.map(r => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</table></div>`;

DATA.re.sections[0].cards.push(
  { id:'re1us1', t:'美台對照①：產權、登記、房貸文件與擔保結構', en:'US vs Taiwan: title, recording and security instruments',
    plain:'兩邊最根本的差別在「產權怎麼確認」：美國的登記只是公示、決定順位，產權有沒有問題要靠產權調查和產權保險；台灣是政府登記就生效、登記有公信力，所以幾乎不需要產權保險。擔保結構上，美國有 mortgage 和 deed of trust 兩種，各州還分 lien theory、title theory；台灣只有民法的抵押權，概念上接近 lien theory。',
    life:'美國像二手車私下交易：要自己查車籍、買保險防止買到贓車；台灣像在監理站過戶：登記上寫誰就是誰的，政府背書。',
    body: '<h4>總對照表</h4>' + reCmp([
        ['不動產的範圍', 'Real property ＝ 土地＋定著物，<b>一個</b>產權', '<b>土地和建物分別登記</b>，各有權狀；可以只買建物、不買土地（例如地上權住宅）', '台灣要分別查土地和建物謄本；房貸也是土地＋建物一起設定抵押'],
        ['所有權型態', 'Fee simple、life estate、leasehold、easement……依普通法，種類多', '<b>物權法定</b>（民法 §757）：所有權、地上權、不動產役權、典權、抵押權等，只能用法律規定的種類', '台灣沒有 life estate；典權是台灣特有'],
        ['移轉何時生效', 'Deed <b>交付並受領</b>時就移轉；登記（recording）是為了<b>對抗</b>第三人、決定順位', '<b>登記生效</b>：不登記就不生效（民法 §758）', '美國：沒登記仍有效但可能輸給後手；台灣：沒登記根本沒取得'],
        ['登記的效力', '只是公示；登記機關<b>不保證</b>產權正確（Torrens 制例外，少見）', '<b>公信力</b>：信賴登記取得權利的人受保護（民法 §759-1、土地法 §43）', '這是美國需要 title insurance、台灣不需要的根本原因'],
        ['產權確認', 'Title search、abstract of title、律師意見、<b>title insurance</b>（owner’s ＋ lender’s policy）', '調<b>登記謄本</b>（所有權部、他項權利部）即可', '考題：title insurance 保什麼、為什麼一次付清'],
        ['交割', '<b>Escrow agent</b>／title company 保管價金和文件，一起 closing', '<b>地政士</b>（代書）辦理過戶；<b>價金履約保證</b>（履保專戶）保管價金', '功能相同：中立第三人防止一手交錢一手不交貨'],
        ['債務文件', '<b>Promissory note</b>（紐約等州叫 bond）：可轉讓，次級市場買賣的就是 note', '<b>借款契約</b>＋部分銀行要求<b>本票</b>（票據法 §123：可聲請法院裁定後強制執行）', '台灣本票的用途是<b>快速取得執行名義</b>，不是為了流通'],
        ['擔保文件', '<b>Mortgage</b>（兩方）或 <b>deed of trust</b>（三方、有 power of sale）', '<b>抵押權設定契約書</b>，到地政事務所登記，發他項權利證明書', '台灣沒有 deed of trust；不動產信託存在，但不是房貸的擔保方式'],
        ['擔保的法律性質', '依州分 <b>lien theory</b>（多數）、<b>title theory</b>、intermediate theory', '抵押權<b>不移轉占有和所有權</b> → 接近 lien theory；實務上的<b>讓與擔保</b>（把所有權移轉給債權人當擔保）則接近 title theory', '考題：哪一種理論下貸方持有 legal title'],
        ['擔保未來債務', 'Future advance clause、open-end mortgage、HELOC', '<b>最高限額抵押權</b>（民法 §881-1）', '台灣銀行房貸常設定「貸款金額 × 1.2」的最高限額'],
        ['當事人名稱', 'Mortgagor（借款人）、mortgagee（貸方）；trustor、trustee、beneficiary', '抵押人（借款人或第三人）、抵押權人（銀行）', '台灣抵押人可以是<b>第三人</b>（例如用父母的房子擔保子女的借款）']
      ])
      + '<h4>為什麼不一樣（點開看細項）</h4>'
      + reD('法系', '普通法 vs 大陸法', '美國靠判例和州法，台灣靠法典', [
          '美國不動產法是<b>州法</b>，承襲英國普通法：所以會有 lien theory／title theory、judicial／nonjudicial 等各州差異，考題常說 “in most states”。',
          '台灣是<b>大陸法系</b>（繼受德國、日本）：全國一套民法、土地法、強制執行法，規則統一。',
          '讀美國制度時要記得「<b>各州不同</b>」；讀台灣制度時記「<b>條號</b>」。' ])
      + reD('登記制度', 'Recording（契據登記） vs 權利登記', '登記的是「文件」還是「權利」', [
          '美國郡政府登記的是<b>文件</b>（deed、mortgage）：只要文件放進去，不審查實質內容 → 誰真的有產權要自己從產權鏈（chain of title）判斷。',
          '台灣地政事務所登記的是<b>權利</b>：審查後登記，登記簿上就是權利狀態（類似 <b>Torrens system</b>）。',
          '所以美國發展出產權保險產業；台灣的交易風險主要在<b>價金交付</b>（所以有履約保證）而不是產權本身。' ])
      + reD('考試怎麼用', '答題提示', '英文申論題可以這樣比較', [
          '“Unlike the U.S. recording system, Taiwan adopts a registration system in which registration is required for the transfer of real property rights and is backed by public credibility; therefore title insurance is rarely needed.”',
          '“A Taiwanese mortgage (抵押權) does not transfer possession or title to the lender, which is similar to the lien theory in most U.S. states.”' ]),
    terms:[['recording system','契據登記制（美國）'],['registration with public credibility','權利登記＋公信力（台灣）'],['物權法定','物權種類由法律規定'],['讓與擔保','以移轉所有權作擔保（接近 title theory）'],['最高限額抵押權','≈ open-end mortgage／future advances'],['地政士／履約保證','≈ escrow agent']] },

  { id:'re1us2', t:'美台對照②：房貸條款與 Lien 順位', en:'US vs Taiwan: mortgage clauses and lien priority',
    plain:'美國房貸用全國標準化的條款（Fannie／Freddie uniform instrument），每一條都有名字；台灣房貸契約由金管會的「定型化契約應記載事項」規範，很多美國條款在台灣有對應的概念，但名稱和做法不同。最大的實務差異：台灣沒有 escrow 代管帳戶、沒有普及的 PMI、房子賣掉時通常由買方的銀行代償舊貸款。',
    life:'同一款遊戲的美版和台版：功能差不多，但選單名稱不一樣，有些功能（例如 escrow）台版直接沒有。',
    body: '<h4>條款對照</h4>' + reCmp([
        ['加速條款', '<b>Acceleration clause</b>：optional，加速前通知至少 30 天', '「<b>喪失期限利益</b>」：借款契約約定遲延或違約時，銀行得請求立即清償', '概念相同；台灣分期付款買賣另有民法 §389（遲付達 1/5）的限制'],
        ['出售時的舊貸款', '<b>Due-on-sale</b>：貸方可要求還清；FHA、VA 貸款可 <b>assumption</b>', '實務上買方的銀行撥款<b>代償</b>賣方舊貸款，再塗銷抵押權；承接舊貸款（債務承擔）要銀行同意，少見', '台灣抵押權有<b>追及效力</b>（民法 §867），所以買方一定會要求塗銷'],
        ['提前還款', '住宅房貸多數<b>可自由提前還款</b>；QM 違約金限前 3 年；商用有 <b>lockout</b>、yield maintenance、defeasance', '常約定前 1–3 年提前清償要付<b>違約金</b>；定型化契約要求提供不收違約金的方案供選擇', '原因見對照④：美國的固定利率讓提前還款權很有價值'],
        ['稅和保險', '<b>Escrow account</b>：每月 PITI，由 servicer 代繳', '<b>沒有</b> escrow；房屋稅、地價稅由屋主自己繳', '台灣欠稅一樣優先於抵押權（稅捐稽徵法 §6），但銀行沒有代繳機制'],
        ['財產保險', 'Hazard insurance＋mortgagee clause；洪水區要 flood insurance', '<b>住宅火災保險＋基本地震險</b>，銀行為抵押權人', '概念相同'],
        ['房貸保險', '<b>PMI</b>（LTV &gt; 80%）、FHA 政府保險：保護<b>貸方</b>', '沒有普及的 PMI；常見的是<b>房貸壽險</b>（借款人身故時清償貸款，保護借款人家屬和銀行）', '保險的對象不同：PMI 保違約，房貸壽險保死亡'],
        ['付款抵充', 'Application of payments：escrow → 利息 → 本金 → 費用', '民法 §323：<b>費用 → 利息 → 原本</b>', '台灣有法律明文'],
        ['維護擔保品', 'Preservation（waste）、right of entry、abandonment', '民法 §871（停止減損行為）、§872（價值減少時回復或提供擔保）', '台灣沒有 right of entry 的明文條款'],
        ['徵收／滅失', 'Condemnation clause：補償金先還貸款', '民法 §881 <b>物上代位</b>：賠償金、保險金、補償金仍受抵押權拘束', '台灣是法律直接規定'],
        ['債權轉讓', 'Assignment clause：不需借款人同意，常賣進 MBS', '民法 §295、§297：抵押權隨債權移轉，通知債務人才生效', '台灣房貸很少證券化，多由銀行自己持有'],
        ['順位讓與', 'Subordination clause／agreement', '民法 §870-1：抵押權次序的<b>讓與、拋棄</b>，須登記', '概念相同'],
        ['還清後', 'Satisfaction／release of mortgage；deed of trust 是 reconveyance', '清償證明＋<b>抵押權塗銷</b>登記', '台灣要記得去地政事務所塗銷，否則謄本上抵押權還在'],
        ['寬限期', '<b>Grace period</b>：每月付款晚幾天不罰（約 15 天）', '<b>寬限期</b>：前幾年<b>只繳息不還本</b>（一般最長 3 年，新青安 5 年）', '同一個中文詞，意思完全不同！']
      ])
      + '<h4>Lien 順位對照</h4>' + reCmp([
        ['稅捐', 'Property tax、special assessment：<b>super priority</b>；聯邦所得稅 lien 依登記時間', '土地增值稅、地價稅、房屋稅優先於一切債權及抵押權（稅捐稽徵法 §6）', '兩邊都是「不動產本身的稅」最優先'],
        ['抵押權之間', 'First in time, first in right；依 recording statute（race／notice／race-notice）', '依<b>登記先後</b>（民法 §865）', '台灣登記生效，沒有 notice 規則的問題'],
        ['判決債權', '<b>Judgment lien</b>：登記判決就產生一般 lien', '<b>沒有</b> judgment lien；要聲請強制執行、<b>查封</b>（或先<b>假扣押</b>）', '台灣一般債權人<b>沒有</b>優先順位，只能和其他普通債權人按比例分配'],
        ['工程款', '<b>Mechanic’s lien</b>：可溯及開工日', '承攬人的<b>法定抵押權</b>（民法 §513），要登記', '台灣不會溯及，依登記時間'],
        ['購屋貸款的優先', 'Purchase-money mortgage 優先於原有 judgment lien', '沒有特別規定（因為沒有 judgment lien）', '—'],
        ['拍賣後', 'Senior 法拍塗銷 junior；junior 法拍的買受人 <b>subject to</b> senior', '<b>塗銷主義</b>：拍定後所有抵押權都消滅，依次序分配（強制執行法 §98）', '台灣拍定人拿到的是<b>沒有抵押權</b>的房子']
      ])
      + reD('為什麼台灣沒有 escrow', '延伸', '制度與習慣', [
          '台灣房屋稅、地價稅<b>金額低</b>（相對房價），每年各繳一次，欠稅的風險和影響都小。',
          '美國房地產稅常是房價的 <b>1–2% 以上</b>，每年金額接近好幾個月的房貸，欠稅會讓 tax lien 排到房貸前面 → 貸方必須控制。',
          '美國房貸賣進 MBS 後，投資人需要擔保品被保護的<b>標準化機制</b>，escrow 就是其中之一。' ]),
    terms:[['喪失期限利益','≈ acceleration'],['代償','買方銀行還清賣方舊貸款'],['追及效力','抵押權跟著房子走（民法 §867）'],['房貸壽險','借款人身故時清償貸款'],['物上代位','≈ condemnation／insurance proceeds'],['塗銷主義','拍定後所有抵押權消滅'],['grace period vs 寬限期','晚繳不罰 vs 只繳息']] },

  { id:'re1us3', t:'美台對照③：違約、Workout、法拍、贖回與追索', en:'US vs Taiwan: default, workouts, foreclosure, redemption and recourse',
    plain:'美國的違約處理很多樣：各州有不同的法拍方式、贖回權和不足額判決的限制，部分州的房貸實質上是無追索權，所以會出現策略性違約。台灣全國統一走法院拍賣，沒有法拍後的贖回權，房貸全部有追索權，拍賣不夠還的部分銀行可以一直追，所以策略性違約很少見。',
    life:'美國像每個州規則不同的比賽，有些州輸了只要交出房子就結束；台灣是全國同一套規則，輸了房子被拍掉，不夠的錢還要繼續還。',
    body: reCmp([
        ['違約的認定', 'Delinquency 30／60／90+；逾期 120 天後才能啟動法拍（聯邦法規）', '<b>逾期放款</b>：本金逾期 3 個月或利息延滯 6 個月以上 → <b>催收款</b> → <b>呆帳</b>；記錄於<b>聯徵中心</b>', '台灣的分類是銀行會計與監理用語'],
        ['違約率', '2008 年前後很高；負權益與無追索權造成策略性違約', '房貸逾放比<b>很低</b>（長期遠低於 1%）', '原因見下方「為什麼不一樣」'],
        ['協商（workout）', 'Forbearance、repayment plan、modification（HAMP）、short sale、deed in lieu；servicer 要做 NPV test', '<b>展延</b>、<b>只繳息</b>、調降利率；天災疫情時的<b>紓困方案</b>', '台灣較少本金寬減，也很少 short sale、deed in lieu（代物清償）'],
        ['個人債務清理', 'Chapter 7（清算）、Chapter 13（3–5 年重整，可保住自住房）', '<b>消費者債務清理條例</b>：前置協商／調解 → <b>更生</b>（原則 6 年內清償）或<b>清算</b>（之後裁定免責）', '更生 ≈ Ch.13；清算 ≈ Ch.7'],
        ['企業重整', 'Chapter 11、cramdown、<b>prepackaged bankruptcy</b>', '<b>公司重整</b>（公司法 §282 以下）', '擔保債權在台灣破產程序中是<b>別除權</b>（不依程序直接就擔保物受償），重整時則依重整計畫'],
        ['法拍方式', 'Judicial、nonjudicial（power of sale）、strict foreclosure、by entry；<b>各州不同</b>', '<b>只有法院拍賣</b>：拍賣抵押物裁定 → 強制執行 → 查封、鑑價 → 拍賣（最多三次減價）→ 特別變賣', '台灣沒有不經法院的拍賣'],
        ['法拍得標', '貸方 <b>credit bid</b>；沒人出價 → <b>REO</b>', '抵押權人可以<b>承受</b>（≈ REO）；拍定分<b>點交／不點交</b>', '不點交的法拍屋買方要自己處理占用人，價格更低'],
        ['後順位', 'Junior 被塗銷，可代繳 senior、買下 senior 債權、出價', '塗銷主義＋<b>無益執行</b>：後順位分不到錢時法院通常不准拍', '台灣後順位很難自己發動拍賣'],
        ['拍賣前贖回', '<b>Equity of redemption</b>（各州都有）；加速後還有 <b>right to reinstate</b>', '拍定<b>前</b>清償債務及費用，可撤銷執行', '台灣沒有法定的 reinstatement，要和銀行協商'],
        ['拍賣後贖回', '<b>Statutory redemption</b>：約一半的州，數月到一年以上', '<b>沒有</b>：拍定、繳足價金後發權利移轉證書', '台灣拍定人的產權比較確定'],
        ['不足額', '<b>Deficiency judgment</b>；受 anti-deficiency、fair value、one-action rule 限制；部分州實質<b>無追索權</b>', '<b>全部有追索權</b>：法院發<b>債權憑證</b>，銀行之後可以再執行借款人的其他財產、薪資', '台灣違約成本高很多'],
        ['事先約定把房子給貸方', '<b>Clogging the equity of redemption</b>：無效', '<b>流抵約款</b>（民法 §873-1）：可以約定，但要登記，且抵押權人負<b>清算</b>義務（超過債權的部分返還）', '台灣允許，但用清算義務保護借款人'],
        ['被免除債務的稅', '<b>COD income</b> 原則上要課所得稅（有排除規定）', '一般沒有對應的課稅爭議', '美國 workout 要考慮稅']
      ])
      + '<h4>為什麼不一樣（點開看細項）</h4>'
      + reD('追索權', '最關鍵的差別', '能不能「交出房子就結束」', [
          '美國部分州（例如加州的自住購屋貸款）有 anti-deficiency 法規 → 房價跌破貸款時，交出房子就沒事 → 違約賣權的價值大，<b>strategic default</b> 多。',
          '台灣全部有追索權，拍賣不足額還有債權憑證 → 違約的「履約成本」很高，借款人會盡量繼續付款。' ])
      + reD('利率結構', '浮動利率改變了違約的誘因', '理性違約的履約價不同', [
          '美國 30 年<b>固定利率</b>：市場利率上升時，舊貸款的市場價值下降，借款人更不想違約（低利貸款很值錢）；市場利率下降時則相反。',
          '台灣以<b>浮動利率</b>為主：貸款的市場價值大約等於 UPB → 違約的判斷接近「房價 &lt; 貸款餘額」，沒有利率帶來的額外價值。',
          '但浮動利率讓借款人承擔<b>升息</b>的付款衝擊 → 台灣的違約風險主要來自流動性（付不起），而不是負權益。' ])
      + reD('房價與成數', '負權益比較少發生', '下檔保護不同', [
          '台灣房價長期上漲、央行限制特定族群的貸款成數，大部分借款人有權益緩衝。',
          '美國 2008 年前的高 LTV、piggyback、低文件貸款，讓房價一跌就大量負權益。' ])
      + reD('文化與信用紀錄', '社會因素', '聯徵紀錄、家族擔保', [
          '台灣聯徵紀錄影響很大，加上常有家人當<b>連帶保證人</b>，違約的社會成本高。',
          '美國信用分數也會受傷，但策略性違約在 2009–2010 年曾被部分人視為合理的財務決策。' ])
      + reD('考試怎麼用', '答題提示', '英文申論題可以這樣比較', [
          '“Because mortgages in Taiwan are full-recourse and lenders can obtain a certificate of claims (債權憑證) after the auction, strategic default is much less common than in U.S. states with anti-deficiency statutes.”',
          '“Taiwan relies solely on court-supervised auctions, with no statutory redemption period after the sale, whereas many U.S. states permit nonjudicial foreclosure under a power of sale.”' ]),
    terms:[['逾期放款／催收款／呆帳','台灣的違約分類'],['更生 ≈ Chapter 13','個人重整'],['清算 ≈ Chapter 7','個人清算'],['別除權','擔保債權不依破產程序受償'],['承受 ≈ REO','銀行承受法拍物'],['債權憑證','拍賣不足額後的執行名義'],['流抵約款','可約定但有清算義務'],['full recourse','全部有追索權']] },

  { id:'re1us4', t:'美台對照④：房貸市場與制度（利率、提前還款、證券化、政府角色）', en:'US vs Taiwan: mortgage market structure',
    plain:'美國的典型房貸是 30 年固定利率、可以隨時免費提前還款，銀行把貸款賣給 Fannie Mae、Freddie Mac 包成 MBS，利率風險和提前還款風險由投資人承擔。台灣的典型房貸是浮動利率、前幾年可能有提前清償違約金，銀行把貸款留在自己的資產負債表上，利率風險由借款人承擔。這張卡把單元 1 的法律制度連到單元 2–9 的固定利率、浮動利率和 MBS。',
    life:'美國像買「固定價格的年票」，中途不去還能全額退費（提前還款），風險由賣票的人承擔；台灣像「浮動票價的月票」，票價每季調整，風險由買票的人承擔。',
    body: reCmp([
        ['典型產品', '<b>30 年固定利率</b>（FRM）為主；也有 15 年 FRM、ARM（例如 5/1 ARM）', '<b>浮動利率</b>為主（指數型房貸：定儲利率指數＋加碼），期限 20–30 年（新青安最長 40 年）', '對應單元 2–3（FRM）與單元 4（ARM）'],
        ['利率風險', '固定利率：利率風險由<b>貸方／MBS 投資人</b>承擔', '浮動利率：利率風險由<b>借款人</b>承擔（升息就多付）', '銀行的資金來源是短期存款，所以台灣銀行偏好浮動利率（資產負債期限配合）'],
        ['提前還款', '幾乎免費 → 利率下跌時大量<b>再融資</b> → MBS 的 prepayment risk、負凸性', '常有前 1–3 年違約金；浮動利率下提前還款的誘因主要來自<b>資金</b>，而不是利率', '對應單元 5–7：PSA、CPR 等提前還款模型'],
        ['寬限期／只繳息', '2008 年前的 interest-only 貸款被 QM 規定限制', '寬限期（只繳息）普遍，<b>新青安</b>最長 5 年；央行對部分族群<b>取消寬限期</b>', '寬限期結束後的付款衝擊（payment shock）'],
        ['資金來源', '<b>次級市場</b>：Fannie Mae、Freddie Mac 收購合格貸款，Ginnie Mae 保證 FHA／VA 貸款的 MBS；大部分新貸款被證券化', '<b>銀行存款</b>：銀行自己持有房貸；依金融資產證券化條例發行的房貸證券化只有少數幾檔', '單元 5–8 的 MBS 主要是美國市場'],
        ['政府角色', 'GSE（2008 年起被政府接管）、FHA、VA 提供保證或保險 → 讓 30 年固定利率可以存在', '<b>政策性優惠房貸</b>（例如新青安：政府補貼利率、延長期限與寬限期）', '美國靠<b>保證與證券化</b>，台灣靠<b>利率補貼</b>'],
        ['監理工具', 'Dodd-Frank：<b>ability-to-repay</b>、QM、證券化<b>風險保留</b>（5%）', '<b>央行選擇性信用管制</b>（限制 LTV、取消寬限期）、銀行法 §72-2（不動產放款上限）', '美國管「借款人付不付得起」；台灣管「成數和總量」'],
        ['房貸保險', 'PMI、FHA 保險 → 可以低頭期款（3–5%）', '沒有普及的 PMI → 一般成數約 7–8 成（依央行規定與個案）', '頭期款比例差很多'],
        ['利息的稅', '房貸利息可列舉扣除（2018 年起以 75 萬美元的貸款為上限）', '<b>自用住宅購屋借款利息</b>列舉扣除，每戶上限 30 萬元，並要減除儲蓄投資特別扣除額', '兩邊都有，但台灣的實際節稅效果較小'],
        ['房市危機', '2008 次貸危機：高 LTV、低文件、證券化的道德風險', '1990 年代末到 2000 年代初的房市低迷與銀行逾放比上升；近年的課題是<b>房價所得比</b>過高', '單元 9']
      ])
      + '<h4>為什麼不一樣（點開看細項）</h4>'
      + reD('為什麼美國能有 30 年固定利率', '制度支撐', '證券化把利率風險移出銀行', [
          '如果銀行用短期存款去放 30 年固定利率，升息時會像 1980 年代的<b>儲貸危機</b>（S&amp;L crisis）一樣虧損。',
          '美國用 GSE 收購、包成 MBS 賣給長期投資人（退休基金、保險公司、外國央行），把<b>利率風險和提前還款風險</b>轉出銀行體系。',
          '台灣沒有這麼大的次級市場，銀行只好用浮動利率來配合存款的短期資金。' ])
      + reD('對借款人的意義', '誰承擔什麼風險', '同樣叫房貸，風險分配相反', [
          '美國借款人：付款固定、可以在降息時再融資（拿到選擇權），但要付較高的利率當作選擇權的代價。',
          '台灣借款人：利率較低，但承擔升息風險；提前還款的選擇權價值低（還要付違約金）。',
          '連結：單元 2–4 計算的每月付款、有效利率、APR，在兩種市場的意義不同。' ])
      + reD('考試怎麼用', '答題提示', '英文申論題可以這樣比較', [
          '“The U.S. 30-year fixed-rate mortgage is sustained by a deep secondary market, in which GSEs securitize loans and transfer interest rate and prepayment risk to MBS investors. In Taiwan, banks fund mortgages with deposits and hold them on balance sheet, so floating-rate mortgages dominate and borrowers bear the interest rate risk.”' ]),
    cfa:'Fixed Income：MBS, prepayment risk and agency securitization',
    terms:[['FRM / ARM','固定／浮動利率房貸'],['指數型房貸','台灣以定儲利率指數＋加碼的浮動利率房貸'],['secondary mortgage market','次級房貸市場'],['GSE','政府支持企業（Fannie、Freddie）'],['Ginnie Mae','保證 FHA／VA 貸款的 MBS'],['新青安','政府補貼的青年購屋貸款'],['ability-to-repay / QM','還款能力／合格房貸'],['S&L crisis','1980 年代儲貸危機'],['payment shock','付款衝擊']] }
);

DATA.re.mcq.push(
  { q:'Why is title insurance common in the U.S. but rarely needed in Taiwan?', o:['Taiwan prohibits insurance on real estate','Taiwan’s land registration requires registration for transfers and gives it public credibility','U.S. law requires a Torrens certificate for every property','Taiwanese banks self-insure all mortgages'], a:1, e:'台灣登記生效＋公信力（類似 Torrens）；美國 recording 只公示文件，不保證產權。' },
  { q:'A Taiwanese 抵押權 is most similar to which U.S. concept?', o:['Title theory mortgage','Lien theory mortgage','Land contract','Deed in lieu of foreclosure'], a:1, e:'抵押權不移轉占有和所有權，貸方只有擔保權 → 接近 lien theory。讓與擔保則接近 title theory。' },
  { q:'The Taiwanese 最高限額抵押權 corresponds most closely to a U.S.:', o:['due-on-sale clause','open-end mortgage with a future advance clause','wraparound mortgage','deed of trust'], a:1, e:'在最高限額內擔保不特定的未來債權 ≈ future advances／open-end mortgage／HELOC。' },
  { q:'Which statement about foreclosure in Taiwan is correct?', o:['Lenders commonly use nonjudicial power-of-sale foreclosure','There is a statutory redemption period after the auction','All foreclosure sales are court auctions and mortgages are full recourse','Junior mortgages survive the auction'], a:2, e:'台灣只有法院拍賣、沒有拍定後的贖回權、全部有追索權、塗銷主義。' },
  { q:'「寬限期」in a Taiwanese mortgage means:', o:['a few days after the due date with no late charge','an initial period of interest-only payments','the period before foreclosure can start','the statutory redemption period'], a:1, e:'台灣寬限期 = 只繳息不還本；美國 grace period = 晚繳幾天不罰。' },
  { q:'Why do floating-rate mortgages dominate in Taiwan while 30-year fixed-rate mortgages dominate in the U.S.?', o:['Taiwanese borrowers prefer risk','U.S. GSE securitization moves interest rate and prepayment risk out of banks; Taiwanese banks fund mortgages with deposits and hold them','Taiwan law prohibits fixed-rate loans','U.S. banks have only long-term deposits'], a:1, e:'次級市場與證券化讓美國的固定利率可行；台灣銀行持有貸款，用浮動利率配合存款。' },
  { q:'Compared with a borrower in a U.S. anti-deficiency state, a Taiwanese borrower facing negative equity is less likely to strategically default mainly because:', o:['Taiwanese mortgages are nonrecourse','Taiwanese mortgages are full-recourse and banks can enforce a 債權憑證','Taiwan has statutory redemption','Taiwan has no foreclosure'], a:1, e:'有追索權使違約的「履約成本」很高。' },
  { q:'台灣的「更生」程序最接近美國的：', o:['Chapter 7','Chapter 11','Chapter 13','Strict foreclosure'], a:2, e:'有固定收入的個人提出分期清償方案，≈ Chapter 13；清算 ≈ Chapter 7；公司重整 ≈ Chapter 11。' }
);
