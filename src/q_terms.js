// ===== 遊戲用名詞表：補足名詞太少的單元（翻牌、打地鼠、救豬豬至少要 6 個） =====
// 不動產單元 2–9：直接掛在卡片上（卡片底下的名詞表也會顯示）
(() => {
  const T = {
    re2a: [['constant payment mortgage (CPM)', '本息平均攤還'], ['amortization', '攤還'], ['outstanding loan balance', '貸款餘額'], ['loan term', '貸款期限'], ['monthly payment', '每月付款']],
    re2b: [['constant amortization mortgage (CAM)', '本金平均攤還'], ['interest-only loan', '只付利息貸款'], ['balloon payment', '到期一次還本（氣球款）'], ['graduated payment mortgage (GPM)', '漸增型付款房貸'], ['negative amortization', '負攤還'], ['grace period', '寬限期']],
    re2c: [['discount points', '點數'], ['origination fee', '開辦費'], ['effective borrowing cost', '有效借款成本'], ['annual percentage rate (APR)', '年百分率'], ['prepayment penalty', '提前清償違約金']],
    re3a: [['lender yield', '貸方收益率'], ['interest rate risk', '利率風險'], ['prepayment risk', '提前還款風險'], ['default risk', '違約風險'], ['maturity mismatch', '期限錯配'], ['liquidity risk', '流動性風險']],
    re3b: [['refinancing', '轉貸（再融資）'], ['refinancing cost', '轉貸成本'], ['payback period', '回收期'], ['net present value (NPV)', '淨現值']],
    re3c: [['underwriting', '貸款承作'], ['loan-to-value ratio (LTV)', '貸款成數'], ['debt-to-income ratio (DTI)', '負債比'], ['appraisal', '不動產估價'], ['sales comparison approach', '比較法'], ['income approach', '收益法'], ['cost approach', '成本法'], ['capitalization rate', '資本化率']],
    re4a: [['adjustable-rate mortgage (ARM)', '浮動利率房貸'], ['index rate', '指標利率'], ['margin', '加碼'], ['payment shock', '付款衝擊'], ['teaser rate', '優惠起始利率'], ['hybrid ARM', '混合型浮動房貸']],
    re4b: [['periodic cap', '每期調整上限'], ['lifetime cap', '終身上限'], ['payment cap', '付款上限'], ['interest rate floor', '利率下限']],
    re4c: [['fixed-rate mortgage (FRM)', '固定利率房貸'], ['risk allocation', '風險分配']],
    re5a: [['primary mortgage market', '初級房貸市場'], ['secondary mortgage market', '次級房貸市場'], ['securitization', '證券化'], ['special purpose vehicle (SPV)', '特殊目的機構'], ['servicer', '服務機構'], ['originate-to-distribute', '發起後即出售'], ['risk retention', '風險保留'], ['conforming loan', '合格貸款'], ['government-sponsored enterprise', '政府支持企業']],
    re5b: [['mortgage-backed bond (MBB)', '抵押擔保債券'], ['mortgage pass-through security', '轉付證券'], ['mortgage pay-through bond', '轉手債券'], ['overcollateralization', '超額擔保']],
    re6a: [['weighted average coupon (WAC)', '加權平均票面利率'], ['single monthly mortality (SMM)', '單月提前還款率'], ['conditional prepayment rate (CPR)', '年化提前還款率'], ['PSA benchmark', 'PSA 提前還款基準'], ['burnout', '耗竭效應'], ['servicing fee', '服務費']],
    re6b: [['negative convexity', '負凸性'], ['contraction risk', '收縮風險'], ['extension risk', '延伸風險'], ['weighted average life', '平均存續期'], ['option-adjusted spread (OAS)', '選擇權調整利差']],
    re7a: [['collateralized mortgage obligation (CMO)', '擔保房貸憑證'], ['tranche', '分券'], ['sequential-pay tranche', '循序償還分券'], ['Z tranche', '累積分券'], ['residual tranche', '剩餘權益分券']],
    re7b: [['planned amortization class (PAC)', '計畫攤還分券'], ['support tranche', '支撐分券'], ['PAC collar', 'PAC 上下限'], ['targeted amortization class (TAC)', '目標攤還分券'], ['floater', '浮動利率分券'], ['inverse floater', '反向浮動分券']],
    re7c: [['interest-only strip (IO)', '只收利息證券'], ['principal-only strip (PO)', '只收本金證券'], ['stripped MBS', '剝離式 MBS']],
    re8a: [['subprime mortgage', '次級房貸'], ['collateralized debt obligation (CDO)', '擔保債權憑證'], ['senior tranche', '優先分券'], ['mezzanine tranche', '中間分券'], ['equity tranche', '權益分券'], ['synthetic CDO', '合成 CDO'], ['re-securitization', '再證券化']],
    re8b: [['credit default swap (CDS)', '信用違約交換'], ['protection buyer', '保護買方'], ['protection seller', '保護賣方'], ['naked CDS', '裸 CDS'], ['counterparty risk', '交易對手風險'], ['systemic risk', '系統性風險'], ['central clearing', '中央結算']],
    re9a: [['reverse mortgage', '逆向抵押貸款（以房養老）'], ['non-recourse', '無追索權'], ['longevity risk', '長壽風險'], ['line of credit', '信用額度']],
    re9b: [['Alt-A loan', '次優級貸款'], ['moral hazard', '道德風險'], ['structured investment vehicle (SIV)', '特殊投資工具']],
    re9c: [['TARP', '問題資產紓困計畫'], ['conservatorship', '政府接管'], ['quantitative easing', '量化寬鬆'], ['loan modification', '貸款修改'], ['forbearance', '容忍期'], ['short sale', '短售'], ['deed in lieu of foreclosure', '以屋抵債'], ['Dodd-Frank Act', '陶德－法蘭克法案'], ['ability-to-repay rule', '還款能力規定']]
  };
  DATA.re.sections.forEach(s => s.cards.forEach(c => { if (T[c.id]) c.terms = (c.terms || []).concat(T[c.id]); }));
})();

// 其他科名詞太少的單元：直接標好單元
DATA.mgmt.extraPairs = [
  ['strategic management', '策略管理', 'm9'], ['SWOT analysis', 'SWOT 分析', 'm9'], ['core competencies', '核心能力', 'm9'], ['growth strategy', '成長策略', 'm9'], ['stability strategy', '穩定策略', 'm9'], ['renewal strategy', '更新策略', 'm9'],
  ['BCG matrix', 'BCG 矩陣', 'm9'], ['cash cow', '金牛', 'm9'], ['question mark', '問題兒童', 'm9'], ['competitive advantage', '競爭優勢', 'm9'], ['cost leadership', '成本領導', 'm9'], ['differentiation strategy', '差異化策略', 'm9'],
  ['focus strategy', '集中策略', 'm9'], ['five forces model', '五力分析', 'm9'], ['vertical integration', '垂直整合', 'm9'], ['horizontal integration', '水平整合', 'm9'], ['diversification', '多角化', 'm9'], ['economic moat', '經濟護城河', 'm9']
];
DATA.invest.extraPairs = [
  ['contrary opinion', '反向意見', 'i3'], ['smart money', '聰明錢', 'i3'], ['confidence index', '信心指數', 'i3'], ['TED spread', 'TED 利差', 'i3'], ['short interest', '融券餘額', 'i3'], ['breadth of market', '市場廣度', 'i3'],
  ['advance-decline line', '騰落線', 'i3'], ['debit balance', '融資餘額', 'i3'], ['put-call ratio', '賣權買權比', 'i3'], ['overbought', '超買', 'i3'], ['oversold', '超賣', 'i3'], ['self-fulfilling prophecy', '自我實現預言', 'i3']
];
DATA.basic.extraPairs = [
  ['investment decision', '投資決策', 'b4'], ['financing decision', '融資決策', 'b4'], ['dividend decision', '股利決策', 'b4'], ['balance sheet', '資產負債表', 'b4'], ['income statement', '損益表', 'b4'],
  ['limited liability', '有限責任', 'b4'], ['sole proprietorship', '獨資', 'b4'], ['partnership', '合夥', 'b4'], ['law of one price', '單一價格法則', 'b4'], ['arbitrage', '套利', 'b4']
];
DATA.mgmt.extraPairs.push(
  ['ethnocentric attitude', '民族中心態度', 'm4'], ['polycentric attitude', '多元中心態度', 'm4'], ['geocentric attitude', '全球中心態度', 'm4'], ['parochialism', '狹隘主義', 'm4'],
  ['multinational corporation (MNC)', '跨國企業', 'm4'], ['licensing', '授權', 'm4'], ['franchising', '加盟', 'm4'], ['joint venture', '合資', 'm4'], ['power distance', '權力距離', 'm4'],
  ['calm waters metaphor', '平靜水域觀點', 'm7'], ['white-water rapids metaphor', '激流泛舟觀點', 'm7'], ['unfreezing', '解凍', 'm7'], ['refreezing', '再凍結', 'm7'], ['resistance to change', '抗拒變革', 'm7'],
  ['disruptive innovation', '破壞式創新', 'm7'], ['sustaining innovation', '維持式創新', 'm7'], ['idea champion', '創意擁護者', 'm7'], ['skunk works', '臭鼬工廠（獨立創新小組）', 'm7']
);
DATA.law.extraPairs = [
  ['§179', '無法律上原因受利益致他人受損害，應返還', 'l5'], ['§180', '給付不得請求返還的四種情形', 'l5'], ['§180 ④', '不法原因給付不得請求返還', 'l5'],
  ['§181', '返還所受利益，及本於該利益更有所取得者', 'l5'], ['§182 I', '善意受領人：利益已不存在，免返還', 'l5'], ['§182 II', '惡意受領人：附加利息返還並賠償', 'l5'], ['§183', '無償讓與第三人：第三人於免返還限度內負責', 'l5']
];
