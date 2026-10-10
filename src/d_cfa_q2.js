// ===== CFA Level I 補充題：讓每一科至少約 15 題（與 CFA_Q2 合併；t 會在 cfa.js 對應到單元） =====
CFA_Q2.push(
  // Ethics
  { t: 'Ethics', q: 'An analyst copies several paragraphs from another firm’s research report into her own report without attribution. She has most likely violated the Standard on:', o: ['misrepresentation', 'fair dealing', 'loyalty to employer'], a: 0, e: 'I(C)：抄襲別人的研究不註明出處，屬於不實陳述。' },
  { t: 'Ethics', q: 'Under Standard III(E) Preservation of Confidentiality, a member may disclose confidential client information when:', o: ['a competitor asks for it', 'the information concerns illegal activities by the client', 'the client has been with the firm for less than a year'], a: 1, e: '客戶資訊原則上保密；涉及違法、法律要求或客戶同意時例外。' },
  { t: 'Ethics', q: 'An analyst owns a significant amount of stock in a company she is recommending to clients. Under Standard VI(A), she should:', o: ['sell the stock before issuing the report', 'disclose the ownership to clients and her employer', 'take no action because ownership is legal'], a: 1, e: '利益衝突要充分揭露，讓客戶自行判斷。' },
  { t: 'Ethics', q: 'Under Standard IV(C), a supervisor must:', o: ['personally guarantee that no violation will ever occur', 'make reasonable efforts to prevent and detect violations by subordinates', 'only supervise employees who are CFA members'], a: 1, e: '監督者要建立並執行合理的法遵制度。' },
  { t: 'Ethics', q: 'A trader spreads false rumors on social media to push up the price of a thinly traded stock he owns. He has violated:', o: ['Standard II(B) Market Manipulation', 'Standard III(C) Suitability', 'Standard VII(A) Conduct as Participants in CFA Programs'], a: 0, e: '散布不實資訊扭曲價格或成交量，是市場操縱。' },
  { t: 'Ethics', q: 'An analyst uses third-party research in her recommendation. Under Standard V(A), she should:', o: ['use it without review because the provider is well known', 'make reasonable efforts to assess its quality and assumptions', 'never use third-party research'], a: 1, e: '盡職調查：要對外部研究的品質有合理依據。' },
  { t: 'Ethics', q: 'Which statement correctly refers to the CFA designation?', o: ['“John is a CFA.”', '“John is a CFA charterholder.”', '“John is a CFA Level III, the highest-earning analyst.”'], a: 1, e: 'VII(B)：CFA 是形容詞，不能當名詞；也不能暗示持證人績效較好。' },

  // Quant
  { t: 'Quant', q: 'The present value of USD 1,000 to be received in 2 years at 5% annual compounding is closest to:', o: ['USD 900.00', 'USD 907.03', 'USD 952.38'], a: 1, e: '1,000 ÷ 1.05² = 907.03。' },
  { t: 'Quant', q: 'The present value of an ordinary annuity of USD 100 per year for 3 years at 10% is closest to:', o: ['USD 248.69', 'USD 273.55', 'USD 300.00'], a: 0, e: '100 × [1 − 1.1⁻³] ÷ 0.1 = 248.69。' },
  { t: 'Quant', q: 'Two assets have a covariance of 0.012 and standard deviations of 20% and 30%. Their correlation is:', o: ['0.06', '0.20', '0.40'], a: 1, e: 'ρ = 0.012 ÷ (0.2 × 0.3) = 0.20。' },
  { t: 'Quant', q: 'A population standard deviation is 20% and the sample size is 100. The standard error of the sample mean is:', o: ['0.2%', '2%', '20%'], a: 1, e: 'σ ÷ √n = 20% ÷ 10 = 2%。' },
  { t: 'Quant', q: 'Events A and B are independent, with P(A) = 0.3 and P(B) = 0.4. P(A and B) is:', o: ['0.12', '0.58', '0.70'], a: 0, e: '獨立事件：P(AB) = P(A) × P(B) = 0.12。' },

  // Economics
  { t: 'Economics', q: 'If demand is price elastic, a price increase will most likely cause total revenue to:', o: ['increase', 'decrease', 'stay the same'], a: 1, e: '有彈性：數量下降的幅度大於價格上升的幅度。' },
  { t: 'Economics', q: 'A monopolist maximizes profit by producing where:', o: ['price equals marginal cost', 'marginal revenue equals marginal cost', 'average total cost is minimized'], a: 1, e: '所有廠商利潤極大都在 MR = MC；獨占的價格 > MC。' },
  { t: 'Economics', q: 'The kinked demand curve model is used to explain pricing behavior in:', o: ['perfect competition', 'monopolistic competition', 'oligopoly'], a: 2, e: '寡占：漲價對手不跟、降價對手會跟，價格具僵固性。' },
  { t: 'Economics', q: 'Which is most likely a leading economic indicator?', o: ['Stock prices', 'Average duration of unemployment', 'Industrial production'], a: 0, e: '股價是領先指標；工業生產是同時指標；失業期間是落後指標。' },
  { t: 'Economics', q: 'Which policy is an example of expansionary fiscal policy?', o: ['Raising income tax rates', 'Increasing government spending', 'Selling government bonds in open-market operations'], a: 1, e: '賣公債的公開市場操作屬於貨幣政策（緊縮）。' },
  { t: 'Economics', q: 'The quantity theory of money is expressed as:', o: ['MV = PY', 'M = PY + V', 'MP = VY'], a: 0, e: '貨幣數量 × 流通速度 = 物價 × 實質產出。' },
  { t: 'Economics', q: 'The exchange rate is 1.10 USD/EUR and 150 JPY/USD. The JPY/EUR cross rate is closest to:', o: ['136.4', '150.0', '165.0'], a: 2, e: 'JPY/EUR = JPY/USD × USD/EUR = 150 × 1.10 = 165。' },
  { t: 'Economics', q: 'A country has a comparative advantage in a good when it:', o: ['can produce more of it than other countries', 'has a lower opportunity cost of producing it', 'has higher wages in that industry'], a: 1, e: '比較利益看機會成本，不是絕對生產力（那是絕對利益）。' },

  // Corporate Issuers
  { t: 'Corporate Issuers', q: 'A project costs 100 and generates 60 at the end of each of the next 2 years. At a 10% cost of capital, its NPV is closest to:', o: ['4.13', '9.09', '20.00'], a: 0, e: '60 ÷ 1.1 + 60 ÷ 1.21 − 100 = 54.55 + 49.59 − 100 = 4.13。' },
  { t: 'Corporate Issuers', q: 'A firm is financed 40% with debt costing 6% before tax and 60% with equity costing 10%. The tax rate is 25%. Its WACC is:', o: ['7.8%', '8.4%', '8.8%'], a: 0, e: '0.4 × 6% × (1 − 0.25) + 0.6 × 10% = 1.8% + 6% = 7.8%。' },
  { t: 'Corporate Issuers', q: 'A project costs 100 and generates 30 per year. Its payback period is closest to:', o: ['3.0 years', '3.3 years', '4.0 years'], a: 1, e: '100 ÷ 30 ≈ 3.33 年；回收期忽略時間價值與回收後的現金流。' },
  { t: 'Corporate Issuers', q: 'Using CAPM with a risk-free rate of 3%, beta of 1.2, and market risk premium of 5%, the cost of equity is:', o: ['6.0%', '8.0%', '9.0%'], a: 2, e: '3% + 1.2 × 5% = 9%。' },
  { t: 'Corporate Issuers', q: 'Sales rise by 10% and EBIT rises by 25%. The degree of operating leverage is:', o: ['0.4', '2.5', '15'], a: 1, e: 'DOL = %ΔEBIT ÷ %ΔSales = 25% ÷ 10% = 2.5。' },
  { t: 'Corporate Issuers', q: 'According to MM Proposition II (no taxes), as a firm uses more debt, its cost of equity:', o: ['decreases', 'stays the same', 'increases'], a: 2, e: '財務風險上升，股東要求更高報酬；WACC 不變。' },
  { t: 'Corporate Issuers', q: 'Which action most likely shortens a firm’s cash conversion cycle?', o: ['Taking longer to pay suppliers', 'Holding more inventory', 'Giving customers longer credit terms'], a: 0, e: 'CCC = 存貨天數 + 應收天數 − 應付天數；延長應付天數會縮短 CCC。' },
  { t: 'Corporate Issuers', q: 'A principal–agent conflict between shareholders and managers is best illustrated by managers:', o: ['paying dividends', 'pursuing empire-building acquisitions that do not add value', 'disclosing financial results on time'], a: 1, e: '經理人追求規模與自身利益，而非股東價值。' },
  { t: 'Corporate Issuers', q: 'A firm’s current assets are 300 and current liabilities are 200. Its current ratio is:', o: ['0.67', '1.5', '100'], a: 1, e: '流動比率 = 流動資產 ÷ 流動負債 = 1.5。' },
  { t: 'Corporate Issuers', q: 'Board independence and separation of the CEO and chair roles are examples of which ESG factor?', o: ['Environmental', 'Social', 'Governance'], a: 2, e: '公司治理（G）。' },

  // FSA
  { t: 'FSA', q: 'Revenue is 1,000 and cost of goods sold is 600. The gross profit margin is:', o: ['40%', '60%', '166%'], a: 0, e: '(1,000 − 600) ÷ 1,000 = 40%。' },
  { t: 'FSA', q: 'COGS is 600 and average inventory is 100. Days of inventory on hand is closest to:', o: ['6 days', '61 days', '167 days'], a: 1, e: '存貨週轉率 = 6，天數 = 365 ÷ 6 ≈ 61。' },
  { t: 'FSA', q: 'Net income is 100, depreciation is 20, and accounts receivable increased by 15. Cash flow from operations (indirect method) is:', o: ['85', '105', '135'], a: 1, e: '100 + 20 − 15 = 105；應收增加代表收入沒收到現金。' },
  { t: 'FSA', q: 'EBIT is 50 and interest expense is 10. The interest coverage ratio is:', o: ['0.2×', '5×', '40×'], a: 1, e: 'EBIT ÷ 利息 = 5 倍。' },
  { t: 'FSA', q: 'Under IFRS 15, the first step in recognizing revenue is to:', o: ['determine the transaction price', 'identify the contract with a customer', 'recognize revenue when cash is received'], a: 1, e: '五步驟：辨認合約 → 履約義務 → 交易價格 → 分攤 → 滿足履約義務時認列。' },
  { t: 'FSA', q: 'Under IFRS, dividends paid may be classified in the cash flow statement as:', o: ['operating or financing', 'investing only', 'financing only'], a: 0, e: 'US GAAP 規定股利支付只能列融資活動。' },

  // Equity
  { t: 'Equity', q: 'A non-callable perpetual preferred stock pays an annual dividend of USD 5 and the required return is 8%. Its value is:', o: ['USD 40.00', 'USD 62.50', 'USD 100.00'], a: 1, e: 'V = D ÷ r = 5 ÷ 0.08 = 62.5。' },
  { t: 'Equity', q: 'Which type of index typically requires the most frequent rebalancing?', o: ['Price-weighted', 'Market-capitalization-weighted', 'Equal-weighted'], a: 2, e: '價格一變動權重就偏離相等，需要定期再平衡。' },
  { t: 'Equity', q: 'A short seller of a dividend-paying stock must:', o: ['receive the dividends', 'pay the dividends to the lender of the shares', 'ignore the dividends'], a: 1, e: '借券人要把股利補給出借人。' },
  { t: 'Equity', q: 'An investor who owns a stock at USD 50 wants to limit losses if it falls below USD 45. She should place a:', o: ['limit buy order at 45', 'stop-loss sell order at 45', 'market buy order'], a: 1, e: '價格跌到 45 時觸發賣出。' },
  { t: 'Equity', q: 'The price-to-book ratio is especially useful for valuing:', o: ['banks and other firms with mostly financial assets', 'early-stage firms with negative book value', 'firms with large unrecorded intangibles'], a: 0, e: '金融資產的帳面價值接近市價。' },
  { t: 'Equity', q: 'Compared with a price return index, a total return index also includes:', o: ['transaction costs', 'reinvested dividends and other income', 'management fees'], a: 1, e: '總報酬指數假設股利再投入。' },
  { t: 'Equity', q: 'In industry analysis, high barriers to entry most likely lead to:', o: ['greater pricing power for incumbents', 'more intense price competition', 'lower profitability'], a: 0, e: '新進者不容易進來，既有廠商較能維持價格。' },

  // Fixed Income
  { t: 'Fixed Income', q: 'A 3-year zero-coupon bond with face value 100 and a yield of 4% (annual compounding) is priced closest to:', o: ['88.90', '92.31', '96.15'], a: 0, e: '100 ÷ 1.04³ = 88.90。' },
  { t: 'Fixed Income', q: 'A bond pays an annual coupon of 5 and is priced at 95. Its current yield is closest to:', o: ['4.75%', '5.00%', '5.26%'], a: 2, e: '當期收益率 = 票息 ÷ 價格 = 5 ÷ 95 ≈ 5.26%。' },
  { t: 'Fixed Income', q: 'A covenant requiring the issuer to maintain insurance on its assets is a(n):', o: ['affirmative covenant', 'negative covenant', 'call provision'], a: 0, e: '要求「要做」的是 affirmative；限制「不能做」的是 negative。' },
  { t: 'Fixed Income', q: 'If a bond’s credit spread widens while benchmark yields are unchanged, its price will most likely:', o: ['rise', 'fall', 'stay the same'], a: 1, e: '要求收益率上升 → 價格下跌。' },

  // Derivatives
  { t: 'Derivatives', q: 'At initiation, the value of a forward contract to either party is:', o: ['zero', 'equal to the forward price', 'equal to the spot price'], a: 0, e: '遠期價格設定成讓雙方一開始價值都是零。' },
  { t: 'Derivatives', q: 'A stock trades at 100, the present value of the strike is 95, and a European call costs 8. By put–call parity, the European put is worth:', o: ['3', '8', '13'], a: 0, e: 'P = C + PV(K) − S = 8 + 95 − 100 = 3。' },
  { t: 'Derivatives', q: 'A put option with a strike of 50 when the stock is at 45 has an intrinsic value of:', o: ['0', '5', '50'], a: 1, e: 'max(K − S, 0) = 5，這個 put 是價內。' },
  { t: 'Derivatives', q: 'An interest rate swap can be viewed as:', o: ['a single option', 'a series of forward contracts', 'a bond with no cash flows'], a: 1, e: '每期交換一次，相當於一連串遠期。' },
  { t: 'Derivatives', q: 'All else equal, a higher convenience yield on the underlying will make the forward price:', o: ['higher', 'lower', 'unchanged'], a: 1, e: 'F = S(1 + r)^T 扣除持有資產的利益；便利收益越高，遠期價格越低。' },
  { t: 'Derivatives', q: 'Which is a commonly cited benefit of derivative markets?', o: ['They eliminate all risk in the economy', 'Price discovery and lower transaction costs', 'They guarantee profits for speculators'], a: 1, e: '衍生品也能有效率地移轉風險，但有槓桿與交易對手風險。' },
  { t: 'Derivatives', q: 'A call option is in the money when:', o: ['the stock price is above the strike price', 'the stock price is below the strike price', 'the stock price equals the strike price'], a: 0, e: 'Call：S > K 價內；Put：S < K 價內。' },

  // Alternatives
  { t: 'Alternatives', q: 'The “J-curve” in private equity refers to:', o: ['negative returns in early years followed by gains later', 'a steady linear increase in value', 'fees declining over time'], a: 0, e: '早期支付費用、投資尚未成熟，報酬為負；之後退出時轉正。' },
  { t: 'Alternatives', q: 'Which real estate strategy has the highest risk and return expectations?', o: ['Core', 'Value-added', 'Opportunistic'], a: 2, e: '核心型最穩；增值型中等；機會型風險最高（開發、重整）。' },
  { t: 'Alternatives', q: 'A commodity futures market in backwardation most likely generates a roll return that is:', o: ['positive', 'negative', 'zero'], a: 0, e: '遠月價格較低，展期時以低價買入較遠合約，賺到正的展期報酬。' },
  { t: 'Alternatives', q: 'An equity market-neutral hedge fund strategy aims to have:', o: ['a high beta to the market', 'a beta close to zero', 'only long positions'], a: 1, e: '多空配對，消除市場風險，賺取選股的 alpha。' },
  { t: 'Alternatives', q: 'A greenfield infrastructure investment refers to:', o: ['an existing asset with an operating history', 'an asset that is yet to be built', 'a publicly traded utility stock'], a: 1, e: 'Brownfield 是已營運的資產，現金流較穩定。' },
  { t: 'Alternatives', q: 'A hedge fund lock-up period is:', o: ['a time during which investors cannot redeem their shares', 'the maximum life of the fund', 'a period with no management fees'], a: 0, e: '讓基金經理能執行較不流動的策略。' },
  { t: 'Alternatives', q: 'Survivorship bias in hedge fund return databases most likely causes reported returns to be:', o: ['understated', 'overstated', 'unaffected'], a: 1, e: '倒閉或表現差的基金停止回報，留下的都是表現好的。' },
  { t: 'Alternatives', q: 'Mezzanine debt in private debt investing is typically:', o: ['senior secured with no equity features', 'subordinated debt, often with warrants or other equity kickers', 'government guaranteed'], a: 1, e: '順位較低，用較高利息與股權連結補償風險。' },
  { t: 'Alternatives', q: 'In a private equity distribution waterfall, the hurdle rate is:', o: ['the minimum return LPs must receive before the GP earns carried interest', 'the management fee rate', 'the maximum leverage allowed'], a: 0, e: '達到門檻報酬後，GP 才能分享績效獎金。' },

  // Portfolio Mgmt
  { t: 'Portfolio Mgmt', q: 'A portfolio is 50% in asset A and 50% in asset B, each with a standard deviation of 20% and a correlation of 0. The portfolio standard deviation is closest to:', o: ['10.0%', '14.1%', '20.0%'], a: 1, e: '√(0.25 × 0.04 + 0.25 × 0.04) = √0.02 ≈ 14.1%；相關性越低，分散效果越大。' },
  { t: 'Portfolio Mgmt', q: 'A portfolio returns 12% with beta 1.25; the risk-free rate is 2%. Its Treynor ratio is:', o: ['0.08', '8.0', '10.0'], a: 1, e: '(12% − 2%) ÷ 1.25 = 8（以百分點計）。' },
  { t: 'Portfolio Mgmt', q: 'A portfolio earned 11% while its CAPM required return was 9%. Its Jensen’s alpha is:', o: ['−2%', '2%', '20%'], a: 1, e: 'α = 實際報酬 − CAPM 預期報酬 = 2%。' },
  { t: 'Portfolio Mgmt', q: 'An investor has a high willingness but a low ability to take risk. Her overall risk tolerance should generally be:', o: ['high, following her willingness', 'low, following her ability', 'the average of the two'], a: 1, e: '兩者不一致時，通常以較低者為準（能力受限時尤其如此）。' },
  { t: 'Portfolio Mgmt', q: 'A 1-day 5% VaR of USD 1 million means:', o: ['the maximum possible loss is USD 1 million', 'there is a 5% chance of losing at least USD 1 million in one day', 'the portfolio will lose USD 1 million 95% of the time'], a: 1, e: 'VaR 是門檻損失，不是最大損失。' }
);
