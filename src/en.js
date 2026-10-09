// ===== English layer: exam sentences, CFA tags, English problems & questions =====
const EX = {
  d1:'A derivative is an instrument whose value depends on, or is derived from, the value of an underlying asset.',
  d2:'Hedgers use derivatives to reduce risk, speculators use them to bet on the future direction of a market variable, and arbitrageurs lock in a riskless profit by trading in two or more markets.',
  d3:'A forward contract is an agreement to buy or sell an asset at a certain future time for a certain price (the delivery price).',
  d4:'A call option gives the holder the right, but not the obligation, to buy the underlying asset by a certain date for a certain price; a put option gives the right to sell.',
  d5:'Futures contracts are standardized, traded on an exchange and settled daily, whereas forward contracts are private, non-standard agreements settled at maturity.',
  d6:'The exchange must specify the asset, the contract size, where delivery will be made and when delivery can be made.',
  d7:'As the delivery period approaches, the futures price converges to the spot price; otherwise there would be an arbitrage opportunity.',
  d8:'If the balance in the margin account falls below the maintenance margin, the trader receives a margin call and must top up the account to the initial margin level.',
  d9:'Open interest is the total number of contracts outstanding, while trading volume is the number of contracts traded in a day.',
  d10:'An IOC order is executed immediately with any unfilled part cancelled; a FOK order must be filled entirely or cancelled.',
  d11:'Futures exchange rates are quoted as US dollars per unit of foreign currency; most spot and forward rates (except GBP, EUR, AUD, NZD) are quoted as units of foreign currency per US dollar.',
  d12:'A short hedge is appropriate when the hedger already owns an asset and expects to sell it; a long hedge is appropriate when a company knows it will have to purchase an asset in the future.',
  d13:'Hedging may increase risk when competitors do not hedge, and it can be difficult to explain a loss on the hedge when there is a gain on the underlying exposure.',
  d14:'Basis risk arises because the basis at the time the hedge is closed out is uncertain; a short hedger benefits from an unexpected strengthening of the basis.',
  d15:'Choose a delivery month that is as close as possible to, but later than, the end of the life of the hedge; when no futures contract exists on the asset, use cross hedging.',
  d16:'The minimum variance hedge ratio h* = ρσS/σF minimizes the variance of the hedged position.',
  d17:'The optimal number of contracts is N* = h*QA/QF; when daily settlement is considered, N* = ĥVA/VF (tailing the hedge).',
  d18:'To hedge an equity portfolio, short N* = βVA/VF index futures contracts; to change beta from β to β*, trade (β* − β)VA/VF contracts.',
  d19:'Hedging equity returns allows a manager who believes the stocks will outperform the market to earn the risk-free rate plus the excess return over the market.',
  d20:'In a stack and roll strategy, short-dated futures are rolled forward; the main risk is liquidity, because large margin calls may occur before gains on the underlying are realized.',
  m1a:'A manager is someone who coordinates and oversees the work of other people so that organizational goals can be accomplished.',
  m1b:'Efficiency means doing things right (getting the most output from the least input), while effectiveness means doing the right things (attaining organizational goals).',
  m1c:'The four functions of management are planning, organizing, leading, and controlling.',
  m1d:'Mintzberg identified ten managerial roles grouped into interpersonal, informational, and decisional roles.',
  m1e:'Katz identified technical, human, and conceptual skills; conceptual skills become more important at higher managerial levels.',
  m1f:'Management is universal: it is needed in all types and sizes of organizations, at all levels, and in all organizational areas.',
  m2a:'The decision-making process consists of eight steps, beginning with identifying a problem and ending with evaluating the decision’s effectiveness.',
  m2b:'Because of bounded rationality, managers often satisfice, that is, accept solutions that are good enough.',
  m2c:'Programmed decisions handle structured, routine problems through procedures, rules, and policies; nonprogrammed decisions are unique and require custom-made solutions.',
  m2d:'Under uncertainty, an optimistic manager follows maximax, a pessimistic manager follows maximin, and a manager who wants to minimize regret follows minimax regret.',
  m2e:'Decision-making styles differ on two dimensions: way of thinking (rational vs intuitive) and tolerance for ambiguity.',
  m2f:'Heuristics can lead to biases such as overconfidence, anchoring, confirmation, framing, availability, sunk costs, and hindsight bias.',
  m2g:'Design thinking, big data, and artificial intelligence are cutting-edge tools that help managers make better decisions.',
  m4a:'An ethnocentric attitude holds that home-country practices are best; a polycentric attitude relies on host-country managers; a geocentric attitude uses the best approaches from around the world.',
  m4b:'Global trade is shaped by institutions such as the WTO, IMF, World Bank, and OECD, and by regional alliances such as the EU, ASEAN, and USMCA.',
  m4c:'The case for globalization rests on the law of comparative advantage; critics argue that it causes job losses, wage stagnation, and greater inequality.',
  m4d:'Organizations can go global through global sourcing, exporting and importing, licensing and franchising, strategic alliances and joint ventures, or foreign subsidiaries.',
  m4e:'Hofstede’s five dimensions of national culture are individualism–collectivism, power distance, uncertainty avoidance, achievement–nurturing, and long-term vs short-term orientation.',
  m7a:'Organizational change is any alteration of people, structure, or technology, driven by external and internal forces.',
  m7b:'The calm waters metaphor views change as an occasional disruption (Lewin’s unfreeze–change–refreeze), while the white-water rapids metaphor views change as continuous.',
  m7c:'Managers can change strategy, structure, technology, or people.',
  m7d:'People resist change because of uncertainty, habit, concern over personal loss, and the belief that the change is not in the organization’s best interest.',
  m7e:'Organizational culture is easier to change when there is a dramatic crisis, a change of leadership, a young and small organization, or a weak culture.',
  m7f:'Creativity is the ability to combine ideas in a unique way; innovation is turning creative ideas into useful products or work methods.',
  m7g:'Disruptive innovation radically changes an industry’s rules of the game, and large, established, profitable firms are the most vulnerable.',
  m9a:'The strategic management process has six steps: identify mission, goals and strategies; external analysis; internal analysis; formulate, implement, and evaluate strategies.',
  m9b:'Corporate strategies include growth (concentration, vertical integration, horizontal integration, diversification), stability, and renewal (retrenchment and turnaround).',
  m9c:'The BCG matrix classifies business units as stars, cash cows, question marks, and dogs based on market share and market growth rate.',
  m9d:'Competitive advantage is what sets an organization apart; Porter’s five forces determine industry attractiveness.',
  m9e:'Porter’s three competitive strategies are cost leadership, differentiation, and focus; a firm that fails to pursue any is stuck in the middle.',
  m10a:'Entrepreneurship is the process of starting new businesses in response to opportunities, with innovation, growth, and profitability as main goals.',
  m10b:'Entrepreneurs research feasibility by evaluating ideas, competitors, and financing options such as venture capital, angel investors, and IPOs.',
  m10c:'The choice of legal form depends mainly on taxes and legal liability; a C corporation offers limited liability but faces double taxation.',
  m10d:'Entrepreneurs exit a venture through harvesting, for example a merger, a sale, an IPO, or liquidation.',
  m11a:'The six elements of organizational design are work specialization, departmentalization, chain of command, span of control, centralization/decentralization, and formalization.',
  m11b:'Decentralization is preferred when the environment is complex and uncertain and lower-level managers are capable and want a voice in decisions.',
  m11c:'Mechanistic organizations are rigid and tightly controlled, whereas organic organizations are highly adaptive and flexible.',
  m11d:'Traditional designs include simple, functional, and divisional structures; contemporary designs include team, matrix, project, and virtual structures.'
};

const CFA = {
  d1:'Derivatives (Level I)', d3:'Derivatives：forwards', d4:'Derivatives：options payoff', d5:'Derivatives：forwards vs futures', d7:'Derivatives：arbitrage & convergence', d8:'Derivatives：margin & mark-to-market', d12:'Derivatives：hedging', d14:'Derivatives：basis', d16:'Portfolio Mgmt：hedge ratio', d18:'Portfolio Mgmt：beta & systematic risk',
  i1c:'Equity：market efficiency（必考）', i1d:'Equity：fundamental vs technical', i1e:'Portfolio Mgmt：CAPM、CML、SML（必考）', i1f:'Portfolio Mgmt：active vs passive、asset allocation', i2a:'Behavioral finance：bubbles', i2g:'Fixed Income：securitization、MBS', i4a:'技術分析（現行課綱比重低）',
  m2f:'Behavioral Finance：overconfidence、anchoring、framing、availability、confirmation、hindsight、sunk cost 偏誤（Level I/III）', m2d:'Quant：expected value', m10c:'Corporate Issuers：organizational forms（sole proprietorship、partnership、corporation）', m9d:'Equity：industry analysis（Porter five forces）', m9b:'Equity / Corporate Issuers：business model', m4c:'Economics：comparative advantage'
};

// English versions of the Hull problems
const PEN = {
  p2_1:['Suppose that you enter into a short futures contract to sell July silver for $17.20 per ounce. The size of the contract is 5,000 ounces. The initial margin is $4,000, and the maintenance margin is $3,000. What change in the futures price will lead to a margin call? What happens if you do not meet the margin call?','A margin call occurs if the price rises by $0.20 to $17.40. If the call is not met, the broker closes out the position.'],
  p2_7:['A trader buys two July futures contracts on frozen orange juice concentrate. Each contract is for the delivery of 15,000 pounds. The current futures price is 160 cents per pound, the initial margin is $6,000 per contract, and the maintenance margin is $4,500 per contract. What price change would lead to a margin call? Under what circumstances could $2,000 be withdrawn from the margin account?','A margin call occurs if the price falls below 150 cents; $2,000 can be withdrawn if the price rises to 166.67 cents.'],
  p2_13:['The forward price of the Swiss franc for delivery in 45 days is quoted as 1.1000. The futures price for a contract that will be delivered in 45 days is 0.9000. Explain these two quotes. Which is more favorable for a trader wanting to sell Swiss francs?','The forward quote is CHF per USD; the futures quote is USD per CHF. 1/1.1 = 0.9091 > 0.9000, so the forward market is more attractive for selling Swiss francs.'],
  p2_19:['A cattle farmer expects to have 120,000 pounds of live cattle to sell in three months. The live cattle futures contract traded by the CME Group is for the delivery of 40,000 pounds of cattle. How can the farmer use the contract for hedging? From the farmer’s viewpoint, what are the pros and cons of hedging?','Short 3 contracts. Hedging reduces uncertainty about the price received, but the farmer no longer gains from favorable price movements.'],
  p2_23:['Explain why open interest usually declines during the month preceding the delivery month. On a particular day, there were 2,000 trades in a futures contract. Of the 2,000 buyers, 1,400 were closing out positions and 600 were entering into new positions. Of the 2,000 sellers, 1,200 were closing out positions and 800 were entering into new positions. What is the impact of the day’s trading on open interest?','Many traders close out before delivery. Open interest fell by 600 (600 new longs − 1,200 longs closed out).'],
  p3_7:['Explain why a short hedger’s position improves when the basis strengthens unexpectedly and worsens when the basis weakens unexpectedly.','The short hedger receives F₁ + b₂, so an unexpected increase in the basis increases the effective price received.'],
  p3_13:['The standard deviation of monthly changes in the spot price of live cattle is 1.2 (cents per pound). The standard deviation of monthly changes in the futures price for the closest contract is 1.4. The correlation between the futures price changes and the spot price changes is 0.7. It is now October 15. A beef producer is committed to purchasing 200,000 pounds of live cattle on November 15 and wants to use December live cattle futures contracts (40,000 pounds each) to hedge. What strategy should the beef producer follow?','h* = 0.7 × 1.2/1.4 = 0.6. Long 0.6 × 200,000/40,000 = 3 December contracts, closing out on November 15.'],
  p3_14:['A corn farmer argues: “I do not use futures contracts for hedging. My real risk is not the price of corn. It is that my whole crop gets wiped out by the weather.” Discuss this viewpoint. Should the farmer estimate his or her expected production of corn and hedge to try to lock in a price for expected production?','When production is uncertain and negatively related to price, a short hedge on expected output can make the farmer worse off; hedging must consider the big picture.'],
  p3_15:['On July 1, an investor holds 50,000 shares of a certain stock. The market price is $30 per share. The investor wants to hedge against market movements over the next month and decides to use the September Mini S&P 500 futures contract. The index futures price is 1,500 and one contract is for delivery of $50 times the index. The beta of the stock is 1.3. What strategy should the investor follow? Under what circumstances will it be profitable?','Short 1.3 × 1,500,000/75,000 = 26 contracts. It is profitable if the stock outperforms the market (return above the CAPM prediction).'],
  p3_23:['A company wishes to hedge its exposure to a new fuel whose price changes have a 0.6 correlation with gasoline futures price changes. The company will lose $1 million for each 1 cent increase in the price per gallon of the new fuel over the next three months. The new fuel’s price changes have a standard deviation that is 50% greater than price changes in gasoline futures prices. What should the hedge ratio be? What is the exposure in gallons? What position in gasoline futures should be taken? How many contracts (42,000 gallons each) should be traded?','h* = 0.9; exposure = 100 million gallons; long 90 million gallons; about 2,143 contracts.'],
  p3_4:['A company has a $20 million portfolio with a beta of 1.2. The index futures price is 1,080 and each contract is for delivery of $250 times the index. What is the hedge that minimizes risk? What should the company do to reduce the beta to 0.6?','Short 89 contracts; to reduce beta to 0.6, short 44 contracts.'],
  p3_10:['“If the minimum variance hedge ratio is calculated as 1.0, the hedge must be perfect.” Is this statement true? Explain.','False. h* = 1 when, for example, ρ = 0.5 and σS = 2σF; since ρ < 1 the hedge is not perfect.'],
  p3_11:['“If there is no basis risk, the minimum variance hedge ratio is always 1.0.” Is this statement true? Explain.','True. With no basis risk, only h = 1 removes all uncertainty.'],
  p3_3:['The standard deviation of quarterly changes in the price of a commodity is $0.65, the standard deviation of quarterly changes in a futures price on the commodity is $0.81, and the correlation is 0.8. What is the optimal hedge ratio for a three-month contract? What does it mean?','h* = 0.8 × 0.65/0.81 = 0.642: the futures position should be 64.2% of the exposure.'],
  p2_24:['A company enters into a short futures contract to sell 5,000 bushels of wheat for 750 cents per bushel. The initial margin is $3,000 and the maintenance margin is $2,000. What price change would lead to a margin call? Under what circumstances could $1,500 be withdrawn?','Margin call if the price rises to 770 cents; $1,500 can be withdrawn if it falls to 720 cents.'],
  p2_11:['At the end of one day a clearing house member is long 100 contracts, and the settlement price is $50,000 per contract. The original margin is $2,000 per contract. On the following day the member becomes responsible for clearing an additional 20 long contracts, entered into at $51,000 per contract. The settlement price at the end of this day is $50,200. How much does the member have to add to its margin account?','$40,000 − $20,000 + $16,000 = $36,000.'],
  p3_25:['A company has a $100 million portfolio with a beta of 1.2. The index futures price is 2,000 and the multiplier is $250. What trade reduces beta to 0.5? What trade increases beta to 1.5?','Short 140 contracts; long 60 contracts.'],
  p3_21:['A trader uses 60 silver futures contracts (5,000 oz each) to hedge. When the hedge is closed out the spot price exceeds the futures price by $0.20 per ounce. What is the effect if the trader is hedging a purchase of silver? A sale?','Purchase: loses $60,000. Sale: gains $60,000.']
};
DATA.deriv.problems.forEach(p => { if (PEN[p.id]) { p.qEn = PEN[p.id][0]; p.ansEn = PEN[p.id][1]; } });

// English MCQs for 衍金 (exam is in English)
DATA.deriv.mcqEn = [
  {q:'Which of the following is true of futures but NOT of forward contracts?', o:['They are private agreements','They are settled daily','They have one delivery date','They involve significant credit risk'], a:1, e:'Futures: exchange-traded, standardized, settled daily, virtually no credit risk.'},
  {q:'When the margin balance falls below the maintenance margin, the trader must deposit enough to bring it back to:', o:['The maintenance margin','The initial margin','Zero','The settlement price'], a:1, e:'Variation margin restores the initial margin level.'},
  {q:'If both parties to a trade are closing out existing positions, open interest:', o:['Increases by one','Decreases by one','Stays the same','Doubles'], a:1, e:'Both closing → −1; both new → +1; one each → unchanged.'},
  {q:'A company that will buy copper in three months should use a:', o:['Short hedge','Long hedge','Cross hedge only','Protective put on gold'], a:1, e:'Future purchase → long futures hedge.'},
  {q:'Basis is defined as:', o:['Futures price − spot price','Spot price − futures price','Strike − spot','Spot − strike'], a:1, e:'Basis = S − F; it converges to zero at maturity.'},
  {q:'The effective price for a hedger who closes out at time 2 is:', o:['S₁ + b₁','F₁ + b₂','F₂ − b₁','S₂ − F₁'], a:1, e:'F₁ + b₂ for both long and short hedgers.'},
  {q:'A short hedger benefits when the basis:', o:['Strengthens unexpectedly','Weakens unexpectedly','Stays at zero','Becomes negative'], a:0, e:'Short hedger receives F₁ + b₂.'},
  {q:'The minimum variance hedge ratio equals:', o:['σS/σF','ρσF/σS','ρσS/σF','ρ²σS/σF'], a:2, e:'h* = ρσS/σF.'},
  {q:'If ρ = 0.8, σS = 0.65 and σF = 0.81, the optimal hedge ratio is closest to:', o:['0.52','0.64','0.80','1.00'], a:1, e:'0.8 × 0.65/0.81 = 0.642.'},
  {q:'A $5 million portfolio with beta 1.5 is hedged with index futures priced at 1,000 with a $250 multiplier. The number of contracts to short is:', o:['15','20','30','45'], a:2, e:'1.5 × 5,000,000/250,000 = 30.'},
  {q:'To increase a portfolio’s beta, a manager should:', o:['Short index futures','Long index futures','Buy Treasury bills','Sell call options'], a:1, e:'β* > β → long (β* − β)VA/VF contracts.'},
  {q:'Tailing the hedge is needed for futures but not forwards because futures:', o:['Have a delivery range','Are settled daily','Are standardized','Have price limits'], a:1, e:'Daily settlement creates interim cash flows.'},
  {q:'Choose the futures delivery month that is:', o:['Earliest available','As close as possible to, but later than, the end of the hedge','Exactly at the start of the hedge','Furthest away'], a:1, e:'Rule of thumb in Section 3.3.'},
  {q:'Which is an argument AGAINST hedging?', o:['Companies should focus on their main business','Hedging may increase risk if competitors do not hedge','Hedging reduces cash-flow uncertainty','Hedging locks in costs'], a:1, e:'Other arguments: shareholders can diversify; explaining losses on the hedge is hard.'},
  {q:'The payoff from a long put at expiration is:', o:['max(S − K, 0)','max(K − S, 0)','K − S − p','S − K'], a:1, e:'Profit subtracts the premium.'},
  {q:'The maximum loss from writing (shorting) a call is:', o:['The premium','The strike price','Unlimited','Zero'], a:2, e:'The stock price has no upper bound.'},
  {q:'An American option differs from a European option in that it:', o:['Can be exercised only at maturity','Can be exercised at any time up to maturity','Trades only in the US','Has no premium'], a:1, e:''},
  {q:'If at delivery the futures price is above the spot price, an arbitrageur would:', o:['Buy the asset, short futures, and deliver','Go long futures and sell the asset','Do nothing','Buy a put'], a:0, e:'Profit = F − S.'},
  {q:'When there are alternatives about what, where and when to deliver, the choice is made by:', o:['The long position','The short position','The exchange','The clearing house'], a:1, e:'This tends to reduce the futures price.'},
  {q:'Futures exchange rates are quoted as:', o:['Foreign currency per USD','USD per unit of foreign currency','Always in euros','In basis points'], a:1, e:'Spot/forward: only GBP, EUR, AUD, NZD use USD per unit.'},
  {q:'An order that must be filled completely or cancelled is a(n):', o:['IOC order','FOK order','ROD order','Stop order'], a:1, e:'IOC allows partial fills.'},
  {q:'The main risk of a stack and roll hedge is:', o:['Basis is always zero','Liquidity problems from margin calls','Delivery failure','Counterparty risk on the exchange'], a:1, e:'Metallgesellschaft example.'}
];

// English essay prompts for 管理學
const ESSEN = [
  'Distinguish between efficiency and effectiveness, and use an organization you know to explain how a manager can achieve both.',
  'Describe Mintzberg’s ten managerial roles and give examples of how a store manager plays these roles during a typical day.',
  'What three skills did Katz identify as essential for managers? How does the importance of each skill change across managerial levels?',
  'Describe the eight steps of the decision-making process and apply them step by step to a real decision (for example, choosing an internship).',
  'Compare rational and bounded rationality decision making, and explain satisficing and escalation of commitment.',
  'Contrast programmed and nonprogrammed decisions, and explain the differences among procedures, rules, and policies.',
  'Choose three common decision-making biases. Define each, give an example, and suggest how managers can avoid it.',
  'Explain ethnocentric, polycentric, and geocentric attitudes, and evaluate which is most appropriate for today’s multinational corporations.',
  'Describe the ways an organization can go international, from lowest to highest commitment, and compare licensing with franchising.',
  'Summarize the case for and against globalization, and discuss the managerial implications of the recent swing toward nationalism (e.g., Brexit, USMCA).',
  'Use Hofstede’s dimensions to compare Taiwan and the United States, and explain problems an American manager might face in Taiwan.',
  'Compare the calm waters and white-water rapids metaphors of change, and explain Lewin’s three-step change process.',
  'Why do employees resist change? Describe six techniques for reducing resistance, including when each is used and its drawbacks.',
  'What is disruptive innovation? Why are large established firms most vulnerable? Give examples and explain how firms can respond (e.g., skunk works).',
  'Explain the structural, cultural, and human resource variables that stimulate innovation.',
  'Describe the six steps of the strategic management process and conduct a SWOT analysis for a company of your choice.',
  'Describe the three types of corporate strategy and explain how the BCG matrix guides resource allocation.',
  'Explain Porter’s five forces model and his three competitive strategies, using an industry example.',
  'Contrast entrepreneurship with running a small business, and explain the feasibility research an entrepreneur should conduct.',
  'Compare sole proprietorships, partnerships, C corporations, and LLCs in terms of liability and taxation, and recommend one for a new graduate starting a business.',
  'Describe the six elements of organizational design and contrast mechanistic and organic organizations.',
  'According to Woodward, how does technology affect organizational structure?',
  'Discuss the advantages and disadvantages of matrix structures, and describe flexible arrangements such as virtual organizations and flextime.'
];
DATA.mgmt.essays.forEach((e, i) => { e.qEn = ESSEN[i]; });

DATA.deriv.sections.forEach(s => s.cards.forEach(c => { if (EX[c.id]) c.ex = EX[c.id]; if (CFA[c.id]) c.cfa = CFA[c.id]; }));
DATA.invest.sections.forEach(s => s.cards.forEach(c => { if (CFA[c.id]) c.cfa = CFA[c.id]; }));
DATA.mgmt.sections.forEach(s => s.cards.forEach(c => { if (EX[c.id]) c.ex = EX[c.id]; if (CFA[c.id]) c.cfa = CFA[c.id]; }));
