// ===== 管理學 補充卡：各章原本沒展開的主題（插在同一節相關卡片後面） =====
(() => {
  const put = (sec, after, ...cards) => {
    const s = DATA.mgmt.sections.find(x => x.id === sec), i = s.cards.findIndex(c => c.id === after);
    s.cards.splice(i < 0 ? s.cards.length : i + 1, 0, ...cards);
  };

  put('m2', 'm2f',
    { id:'m2h', t:'群體決策：優缺點與 groupthink', en:'Group decision making',
      plain:'一群人一起決定，資訊和觀點比較多、大家也比較願意接受結果；但比較慢、可能被少數人主導，還可能為了和氣而沒人敢反對（群體迷思）。',
      life:'社團決定成果展主題：大家一起想點子很多、決定後也比較願意出力；但開會開三小時，最後大家看社長臉色附和，沒人說「這個預算根本不夠」。',
      body:'<ul><li><b>Advantages</b>：more complete information、more alternatives、increased acceptance of a solution、increased legitimacy。</li><li><b>Disadvantages</b>：time-consuming、minority domination、pressures to conform、ambiguous responsibility（責任不清）。</li><li><b>Groupthink 群體迷思</b>：成員為了表面一致而壓抑異議，導致決策品質下降。</li><li>改善技巧：<b>Brainstorming</b>（先不批評、盡量想點子）、<b>Nominal group technique</b>（各自先寫、輪流報告、再獨立投票，成員在場但不互相干擾）、<b>Electronic meeting</b>（用電腦匿名提出意見與投票）。</li><li>群體 vs 個人：群體通常較準確、較有創意、較被接受；個人較快、較有效率。</li></ul>',
      ex:'Group decisions provide more complete information and greater acceptance, but they are time-consuming and vulnerable to groupthink, where pressure to conform suppresses dissent.' },
    { id:'m2i', t:'設計思維與創新', en:'Design thinking',
      plain:'設計思維＝像設計師一樣解決問題：先深入了解使用者的真實需求，再大量發想、做出簡單原型、快速測試修正。重點在「從使用者出發」，不是從公司想賣什麼出發。',
      life:'學生會想改善學餐：不是先決定「多開一間店」，而是先去觀察大家排隊卡在哪、訪問同學（了解需求），想很多方案，先用一天試辦預點取餐（原型），看看排隊有沒有變短。',
      body:'<ul><li><b>Design thinking</b>：approaching management problems as designers approach design problems。</li><li>常見步驟：<b>Empathize</b>（同理使用者）→ <b>Define</b>（定義問題）→ <b>Ideate</b>（發想）→ <b>Prototype</b>（原型）→ <b>Test</b>（測試），可以來回反覆。</li><li>跟創新的關係：設計思維幫組織找出顧客自己都說不出的需求，把 creativity 轉成真的有用的 innovation（Ch7 m7f）。</li><li>用在決策：把「辨識問題」做得更深入，不只看表面症狀；和 big data、AI 並列為改善決策的工具（m2g）。</li></ul>',
      ex:'Design thinking approaches management problems the way designers do: understanding users deeply, generating ideas, prototyping, and testing, which helps turn creativity into innovation.' }
  );

  put('m4', 'm4e',
    { id:'m4f', t:'Hofstede 文化構面：一個一個看懂', en:"Hofstede's dimensions",
      plain:'Hofstede 用幾個「刻度」描述一個國家的文化：重視個人還是團體、能不能接受上下差距、怕不怕不確定、重競爭還是重關懷、看長期還是看眼前。管理者要照當地文化調整管理方式。',
      life:'同一個打工店長：在美國可以直接說「這樣做比較好」、員工也會頂嘴（低權力距離）；在日本員工比較照規矩、很少當面反對（高不確定性規避、較重階層）。',
      body:'<table class="tbl"><tr><th>構面</th><th>在問什麼</th><th>例子（常見說法）</th></tr><tr><td><b>Individualism vs Collectivism</b></td><td>先顧自己還是先顧團體</td><td>美國高度個人主義；許多亞洲、拉丁美洲國家偏集體主義</td></tr><tr><td><b>Power distance</b></td><td>能接受權力分配不平等到什麼程度</td><td>高：員工不太挑戰上司；低：上下平等、可以直接討論</td></tr><tr><td><b>Uncertainty avoidance</b></td><td>多想避開模糊與風險</td><td>高：重規則、工作保障；低：較能接受風險與改變</td></tr><tr><td><b>Achievement vs Nurturing</b>（masculinity）</td><td>重成就競爭還是重關係生活品質</td><td>日本偏成就；北歐偏關懷</td></tr><tr><td><b>Long-term vs Short-term orientation</b></td><td>看未來、儲蓄堅持，還是看過去現在、傳統</td><td>中國、日本等偏長期導向</td></tr></table><ul><li>GLOBE 延伸 Hofstede，九個構面（見 m4e）。</li><li>管理意涵：激勵、領導、決策參與的方式要配合文化，不能把母國做法直接搬過去（避免 parochialism）。</li></ul>',
      ex:'Hofstede identified individualism–collectivism, power distance, uncertainty avoidance, achievement–nurturing, and long-term orientation; managers should adapt their practices to these cultural differences.' },
    { id:'m4g', t:'全球思維與管理全球員工', en:'Global mindset & global workforce',
      plain:'全球思維＝能在不同文化的環境中有效影響別人的特質，由三種「資本」組成：懂全球事務（智識）、願意接觸不同文化（心理）、能跟不同背景的人建立關係（社交）。',
      life:'交換學生能不能過得好：先查好當地制度和習慣（智識資本）、願意吃沒吃過的東西、跟陌生人聊天（心理資本）、真的交到當地朋友並一起做報告（社交資本）。',
      body:'<ul><li><b>Global mindset</b>：attributes that allow a leader to be effective in cross-cultural environments。</li><li><b>Intellectual capital</b>：知道全球產業、國際環境、文化差異。</li><li><b>Psychological capital</b>：對新經驗、新文化的開放與熱情。</li><li><b>Social capital</b>：跟不同文化的人建立信任關係、影響他人的能力。</li><li>全球員工的挑戰：外派適應、溝通與語言、文化差異造成誤解；管理者要用適合當地文化的激勵與領導方式。</li><li>對比 m4a：<b>ethnocentric / polycentric / geocentric</b> 是對「哪邊做法比較好」的態度；global mindset 是個人能力。</li></ul>',
      ex:'A global mindset consists of intellectual capital, psychological capital, and social capital, which together allow managers to work effectively across cultures.' }
  );

  put('m7', 'm7e',
    { id:'m7h', t:'壓力從哪來？角色壓力與 Type A／B', en:'Causes of stress',
      plain:'壓力來源分兩大類：工作本身（任務、角色、人際、組織結構、主管）和個人生活（家庭、經濟、個性）。角色壓力有三種：衝突、過載、模糊。Type A 個性的人比較容易感到壓力。',
      life:'打工時店長叫你顧櫃台、副店長又叫你去補貨（角色衝突）；一個人要做三個人的事（角色過載）；沒人告訴你打烊要做哪些事（角色模糊）。',
      body:'<ul><li><b>Task demands</b>：工作設計、工作條件、實體環境。</li><li><b>Role demands</b>：<b>Role conflicts</b>（期望互相衝突、難以同時滿足）、<b>Role overload</b>（時間內要做的事太多）、<b>Role ambiguity</b>（不清楚自己該做什麼）。</li><li><b>Interpersonal demands</b>：同事帶來的壓力、缺乏社會支持、人際關係差。</li><li><b>Organization structure</b>：過多規則、沒機會參與決策；<b>Organizational leadership</b>：主管的管理風格（緊盯、恐懼文化）。</li><li><b>Personal factors</b>：家庭、個人經濟、個性。</li><li><b>Type A</b>：長期急迫感、過度競爭、無法享受空閒 → 較易有壓力；<b>Type B</b>：放鬆、不急、能休息。研究指出 Type A 中真正傷身的是<b>敵意與憤怒</b>。</li><li>減壓方法見 m7e。</li></ul>',
      ex:'Stress can come from task demands, role demands such as role conflict, overload, and ambiguity, interpersonal demands, structure, leadership, and personal factors like a Type A personality.' }
  );

  put('m9', 'm9a',
    { id:'m9f', t:'SWOT 分析：外部看機會威脅、內部看優勢劣勢', en:'SWOT analysis',
      plain:'策略六步驟的第 2、3 步：外部分析找機會（O）和威脅（T），內部分析找優勢（S）和劣勢（W），合起來就是 SWOT，用來找出組織可以利用的利基。',
      life:'開一家飲料店：附近新開大學（機會）、隔壁也要開連鎖手搖（威脅）；你會自己熬珍珠（優勢）、但沒錢打廣告（劣勢）→ 策略：主打手作珍珠、抓學生客群。',
      body:'<ul><li><b>External analysis</b>：看經濟、人口、政治法律、社會文化、科技、全球環境，以及競爭者 → <b>Opportunities</b>（正面趨勢）、<b>Threats</b>（負面趨勢）。同樣的環境對甲公司是機會、對乙公司可能是威脅。</li><li><b>Internal analysis</b>：看 resources 與 capabilities → <b>Strengths</b>（做得好、獨特的資源能力）、<b>Weaknesses</b>（做不好或缺乏的）。<b>Core competencies</b> 是最主要的優勢。</li><li><b>SWOT analysis</b>：combines external and internal analyses to identify a strategic niche。</li><li>導出策略的方向：利用優勢抓住機會、用優勢化解威脅、改善劣勢以抓機會、避開劣勢遇上威脅的位置。</li><li>考試寫法：每個象限都要舉<b>具體</b>例子，最後一定要說明 SWOT 如何導出策略。</li></ul>',
      ex:'SWOT analysis combines the external analysis of opportunities and threats with the internal analysis of strengths and weaknesses to identify a strategic niche the organization can exploit.' }
  );
  put('m9', 'm9e',
    { id:'m9g', t:'當前策略議題：策略領導、策略彈性、重要策略類型', en:'Current strategic issues',
      plain:'環境變很快，所以高層要有「策略領導」（帶著組織看未來、讓大家跟上），組織要有「策略彈性」（發現錯了能馬上調整）。現在特別重要的策略：電子商務、顧客服務、創新。',
      life:'疫情時餐廳老闆：判斷外送會變主流並說服員工轉型（策略領導），發現內用沒客人就馬上改外帶菜單（策略彈性），上架外送平台（電子商務策略）。',
      body:'<ul><li><b>Strategic leadership</b>：能預見、想像、保持彈性、策略性思考，並與他人一起帶來變革、創造未來的能力。做法：決定組織目的與願景、發展核心能力、培養人才、建立有效文化、強調倫理、建立適當控制。</li><li><b>Strategic flexibility</b>：認知外部環境的重大變化，迅速投入資源，並在策略錯誤時及時承認並修正。</li><li><b>E-business strategies</b>：用網路降低成本、差異化、或鎖定特定客群。</li><li><b>Customer service strategies</b>：給顧客想要的、有效溝通、員工訓練與顧客服務文化。</li><li><b>Innovation strategies</b>：要做基礎研究、產品開發還是流程開發；當 <b>first mover</b> 還是 follower（見 m9e）。</li></ul>',
      ex:'Strategic leadership is the ability to anticipate, envision, maintain flexibility, and work with others to create a viable future; strategic flexibility is the ability to recognize changes, commit resources quickly, and correct strategic mistakes.' }
  );

  put('m10', 'm10a',
    { id:'m10e', t:'創業者的社會責任與倫理；社會企業家', en:'Social responsibility & ethics',
      plain:'創業者一樣要對社會負責、守倫理，而且因為小公司由創業者一人說了算，他的價值觀直接決定公司的倫理。社會企業家＝用創業的方法解決社會問題的人。',
      life:'開咖啡店：堅持用公平貿易豆、不拖欠工讀生薪水（倫理與社會責任）；如果你開店的目的本身是雇用身障者、讓他們有工作，就是社會企業家。',
      body:'<ul><li>創業者面對的倫理議題：員工待遇、顧客安全、誠實的財務與行銷、智慧財產權。</li><li>小公司沒有大公司的倫理制度，<b>創業者本人的價值觀</b>就是公司的倫理標準。</li><li><b>Social entrepreneur</b>：an individual or organization who seeks out opportunities to improve society by using practical, innovative, and sustainable approaches。</li><li>社會企業同樣要能永續經營（賺得到錢），只是目標是社會影響。</li></ul>',
      ex:'Entrepreneurs face ethical issues just as large firms do, and their personal values shape the firm; social entrepreneurs use innovative, sustainable approaches to improve society.' }
  );
  put('m10', 'm10d',
    { id:'m10f', t:'創業者的人力資源、激勵與帶團隊', en:'HRM, motivating & leading teams',
      plain:'新創要找對人、留住人：招募時看「人和組織合不合」，激勵靠授權（讓員工自己做決定），帶團隊時創業者要當教練，不是什麼都自己做。',
      life:'朋友一起開網拍：找的人要認同你們的風格和節奏（人－組織契合），讓負責客服的人自己決定怎麼處理退貨（授權），每週一起檢討而不是你一個人全包（帶團隊）。',
      body:'<ul><li><b>Recruiting</b>：小公司知名度低、薪水拼不過大公司 → 強調工作內容、成長機會、彈性。</li><li><b>Selecting</b>：看 <b>person–organization fit</b>（個人價值觀與組織文化相符），不只看技能。</li><li><b>Retaining</b>：薪酬福利之外，提供有意義的工作、彈性、參與感。</li><li><b>Motivating through empowerment</b>：增加員工的決策裁量權（例如自主排程、自己處理顧客問題）→ 提升投入與效率。</li><li><b>Leading teams</b>：創業者要建立團隊、當教練與協調者；團隊共同決策、彼此信任。</li></ul>',
      ex:'Entrepreneurs should hire for person–organization fit, motivate employees through empowerment, and act as coaches who build and support teams.' },
    { id:'m10g', t:'管理成長、度過衰退、決定退場', en:'Growth, downturns & exiting',
      plain:'成長不是越快越好：要規劃、組織、控制好成長（特別是現金流）。景氣差時要先看出危機、事先有應變計畫。最後要想好怎麼退場、公司值多少錢。',
      life:'網拍越賣越好：先算好要不要多進貨、多請人（規劃成長），盯緊現金流免得帳面賺錢卻付不出貨款（控制成長）；淡季營收掉時早點砍不必要支出（應對衰退）；有人想買下你的店時，要先估好價（退場）。',
      body:'<ul><li><b>Managing growth</b>：<b>Planning</b> for growth（成長要寫進策略）、<b>Organizing</b> for growth（找資金、找人、加強顧客忠誠、維持好的組織文化）、<b>Controlling</b> for growth（財務控制、<b>現金流</b>管理、存貨與應收帳款）。</li><li><b>Managing downturns</b>：<b>Recognizing crisis situations</b>（注意警訊：營收下滑、現金不足、員工流失）→ <b>Dealing with downturns</b>（事前擬好 contingency plan、找出問題根源、迅速行動）。</li><li><b>Exiting the venture</b>：<b>Business valuation methods</b> — asset values、earnings、cash flow（見 m10d 五種退場方式）。退場最好提早規劃，並注意交接與員工。</li></ul>',
      ex:'Entrepreneurs must plan, organize, and control for growth, especially cash flow, recognize and respond to downturns with contingency plans, and plan their exit using a business valuation.' }
  );

  put('m11', 'm11a',
    { id:'m11e', t:'五種部門化：怎麼分組、各有什麼好壞', en:'Departmentalization',
      plain:'部門化＝把工作分組的方式，有五種：照職能、地區、產品、流程、顧客分。大公司常常混用，現在的趨勢是跨功能團隊和依顧客分。',
      life:'一家連鎖手搖店：總部分行銷部、財務部（職能）；北區、南區各有區經理（地區）；茶飲線、咖啡線各自負責（產品）；製茶、包裝、配送分站（流程）；門市客、企業團購客分開服務（顧客）。',
      body:'<table class="tbl"><tr><th>類型</th><th>分組依據</th><th>優點</th><th>缺點</th></tr><tr><td><b>Functional</b></td><td>職能（行銷、財務、生產）</td><td>專業化、同類人一起的效率</td><td>部門間溝通差、看不到整體目標</td></tr><tr><td><b>Geographic</b></td><td>地區</td><td>更有效處理區域議題、貼近當地需求</td><td>功能重複、與其他區域隔離</td></tr><tr><td><b>Product</b></td><td>產品線</td><td>專精特定產品、經理成為該產品專家、更貼近顧客</td><td>功能重複、看不到組織整體</td></tr><tr><td><b>Process</b></td><td>工作或顧客流程</td><td>工作流程更有效率</td><td>只適用某些產品類型</td></tr><tr><td><b>Customer</b></td><td>顧客類型（零售、企業、政府）</td><td>專門服務特定顧客的需求與問題</td><td>功能重複、看不到組織整體</td></tr></table><ul><li>趨勢：<b>Cross-functional teams</b>（不同職能的人組成一個團隊）、更重視 customer departmentalization。</li></ul>',
      ex:'Departmentalization can be functional, geographic, product, process, or customer based; today many organizations use cross-functional teams and customer departmentalization.' },
    { id:'m11f', t:'指揮鏈、職權與控制幅度的細節', en:'Chain of command & span of control',
      plain:'指揮鏈＝從最上面到最下面的職權線，回答「我要向誰報告」。職權跟著職位走，有直線職權和幕僚職權；控制幅度要多寬，看員工和主管的能力、工作多相似、多標準化等。',
      life:'打工的漢堡店：工讀生向值班經理報告、值班經理向店長報告（指揮鏈）；店長可以直接命令員工（直線職權），總部人資只能給建議（幕僚職權）。員工都很熟練、工作都一樣時，一個值班經理可以帶很多人（寬幅度）。',
      body:'<ul><li><b>Authority 職權</b>：職位本身賦予下命令並期待被遵守的權利（跟人無關，跟職位有關）。<b>Line authority</b>：直接指揮部屬；<b>Staff authority</b>：支援、協助、建議直線職權者。</li><li><b>Responsibility</b>：執行被指派任務的義務；有職權就要有相對的責任。</li><li><b>Unity of command</b>：每人只向一位主管報告；matrix 結構會違反它。</li><li>現代看法：員工被授權、資訊科技讓人可以直接溝通 → 指揮鏈沒那麼重要，但仍要知道向誰負責。</li><li><b>影響控制幅度的因素</b>（越符合越能用寬幅度）：員工與主管的技能經驗高、工作相似、任務簡單、員工在同一地點、程序標準化、資訊系統好、組織文化強、主管偏好的風格。</li><li>趨勢：控制幅度變寬 → 層級變少、成本降低、決策加快，但員工要更有能力。</li></ul>',
      ex:'The chain of command defines who reports to whom; authority comes with the position, and the appropriate span of control depends on factors such as employee skills, task similarity, and standardized procedures.' }
  );
  put('m11', 'm11d',
    { id:'m11g', t:'無疆界組織與學習型組織', en:'Boundaryless & learning organizations',
      plain:'無疆界組織＝不被預先設定的水平、垂直或外部界線綁住的組織（虛擬組織、網絡組織都是）。學習型組織＝整個組織能持續學習、調整與改變的組織。',
      life:'學習型組織像一個會自己檢討的社團：每次活動後大家分享哪裡出錯、記錄下來，下一屆不會再犯同樣的錯；不是只有社長記得。',
      body:'<ul><li><b>Boundaryless organization</b>：設計不受預設結構界線限制。去除<b>內部</b>界線（水平：跨功能團隊；垂直：扁平化、跨層級團隊）與<b>外部</b>界線（與供應商、顧客、外部夥伴合作）。</li><li><b>Virtual organization</b>：小核心全職員工＋依專案需要找外部專家。<b>Network organization</b>：用自己的員工做部分工作，再靠外部供應商網絡提供其他產品零件或流程（<b>modular</b>：外包零件，自己組裝）。</li><li><b>Learning organization</b>：has developed the capacity to continuously learn, adapt, and change。特徵：<ul><li>結構：無疆界、團隊、授權。</li><li>資訊分享：開放、即時、正確。</li><li>領導：共同願景、協作氛圍。</li><li>文化：強烈共同願景、彼此關懷信任、可以自在地公開溝通、分享、試驗與學習。</li></ul></li></ul>',
      ex:'A boundaryless organization is not defined by predefined horizontal, vertical, or external boundaries, while a learning organization has the capacity to continuously learn, adapt, and change.' }
  );
})();
