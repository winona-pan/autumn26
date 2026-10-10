// ===== 衍金：觀念選擇題 + 隨機變化題產生器 =====
DATA.deriv.mcq = [
  {u:'ch2', q:'期貨與遠期最主要的差異之一是：', o:['期貨在到期才結算','期貨每日結算','遠期在交易所交易','遠期幾乎沒有信用風險'], a:1, e:'期貨標準化、交易所、每日結算、幾乎無信用風險。'},
  {u:'ch2', q:'保證金帳戶餘額低於維持保證金時，投資人必須補足到：', o:['維持保證金','原始保證金','零','結算價'], a:1, e:'Margin call 補到 initial margin。'},
  {u:'ch2', q:'一筆交易中買方開新倉、賣方平倉，OI 會：', o:['增加','減少','不變','視成交價而定'], a:2, e:'一開一平 → OI 不變。'},
  {u:'ch2', q:'交割有選擇（品質、地點、時間）時由誰決定？', o:['多方','空方','交易所','結算所'], a:1, e:'由 short position 選擇；這些選擇使期貨價格偏低（2.5）。'},
  {u:'ch2', q:'「一次整批成交，否則取消」的委託是：', o:['IOC','FOK','ROD','Market order'], a:1, e:'IOC 可部分成交；FOK 必須全部。'},
  {u:'ch2', q:'台股期貨的最後交易日是交割月份的：', o:['第一個星期一','第三個星期三','最後一個星期五','15 日'], a:1, e:'講義：第三個星期三。'},
  {u:'ch2', q:'台股期貨每個交易日有幾個月份契約流通？', o:['3','4','6','12'], a:2, e:'三個近月＋三個季月。'},
  {u:'ch2', q:'下列哪一種貨幣的遠期與即期報價「不是」以美元/外幣表示？', o:['英鎊','歐元','日圓','澳幣'], a:2, e:'GBP、EUR、AUD、NZD 報 USD/外幣；JPY、CAD 等報外幣/USD。'},
  {u:'ch3', q:'航空公司擔心未來燃油上漲，應：', o:['Short futures','Long futures','買 put','不做任何事'], a:1, e:'未來要買 → long hedge。'},
  {u:'ch3', q:'基差（basis）的定義為：', o:['F − S','S − F','S − K','F − K'], a:1, e:'要避險資產的現貨價 − 所用期貨價。'},
  {u:'ch3', q:'Short hedger 在何時有利？', o:['基差意外變強','基差意外變弱','期貨價格上漲','現貨價格下跌'], a:0, e:'實際賣價 = F₁ + b₂。'},
  {u:'ch3', q:'避險在 4 月結束，可選合約月份為 3、6、9、12 月，應選：', o:['3 月','6 月','9 月','12 月'], a:1, e:'最接近但晚於避險結束的月份。'},
  {u:'ch3', q:'若現貨與期貨價格變動相關係數為 0，最小變異避險比率為：', o:['0','0.5','1','無法計算'], a:0, e:'h* = ρσS/σF = 0。'},
  {u:'ch3', q:'ρ=0.9、σS=0.6、σF=0.9，h* 為：', o:['0.6','0.9','1.35','0.54'], a:0, e:'0.9 × 0.6 / 0.9 = 0.6。'},
  {u:'ch3', q:'用指數期貨將 β 從 1.5 降到 0.75，應：', o:['Long 期貨','Short 期貨','買進更多股票','不需調整'], a:1, e:'β > β* → short (β−β*)V_A/V_F。'},
  {u:'ch3', q:'為什麼期貨需要 tailing the hedge 而遠期不需要？', o:['期貨有每日結算','遠期有保證金','期貨沒有到期日','遠期是標準化合約'], a:0, e:'每日結算的現金流使口數需要調整。'},
  {u:'ch3', q:'下列哪一項是「反對避險」的理由？', o:['公司應專注本業','競爭者沒有避險時，避險可能增加風險','降低利率風險','鎖定成本'], a:1, e:'另有：股東可自行分散、避險虧損難解釋。'},
  {u:'ch3', q:'Stack and roll 的主要風險是：', o:['基差為零','流動性（保證金追繳造成現金壓力）','無法交割','價格漲跌幅限制'], a:1, e:'Metallgesellschaft 案例。'},
  {u:'ch1', q:'Put 的到期收益（payoff）為：', o:['max(S−K,0)','max(K−S,0)','S−K','K−S−premium'], a:1, e:'Profit 才要扣權利金。'},
  {u:'ch1', q:'Short call 的最大可能損失：', o:['權利金','執行價','無限','零'], a:2, e:'股價無上限 → 損失無上限；最大利潤為權利金。'},
  {u:'ch1', q:'美式選擇權與歐式選擇權的差別：', o:['美式只能到期執行','美式可在到期前任何時候執行','歐式可隨時執行','兩者相同'], a:1, e:''},
  {u:'ch2', q:'若到期時 F > S，套利者應：', o:['買現貨、short futures、交割','long futures、賣現貨','什麼都不做','買 put'], a:0, e:'賺 F − S。'},
  {u:'ch2', q:'每日結算價（台灣）是：', o:['收盤價','收盤前 1 分鐘成交量加權平均價','開盤價','當日最高最低平均'], a:1, e:'最後結算價則是收盤前 30 分鐘標的指數簡單平均。'},
  {u:'ch2', q:'成交量可能大於未平倉量的原因是：', o:['當沖','保證金不足','價格限制','交割'], a:0, e:'當天開又平，不增加 OI。'}
];

const R = (a, b, step = 1) => { const n = Math.round((b - a) / step); return +(a + step * Math.floor(Math.random() * (n + 1))).toFixed(6); };
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const f2 = (x, d = 2) => (+x).toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: 0 });

DATA.deriv.gens = [
  { id: 'gm', t: '保證金追繳價格', base: '2.1／2.7／2.24', make() {
      const side = pick(['long', 'short']); const size = pick([1000, 5000, 15000, 40000]); const n = pick([1, 2, 3]);
      const F = size === 5000 ? R(15, 30, 0.1) : size === 15000 ? R(120, 180, 1) : size === 40000 ? R(90, 140, 0.5) : R(60, 90, 0.5);
      const im = pick([2000, 3000, 4000, 5000, 6000]); const mm = im - pick([500, 1000, 1500]);
      const loss = im - mm; const dp = loss / size; const ans = side === 'long' ? F - dp : F + dp;
      return { qe: `You take a ${side} position in ${n} futures contract(s). Each contract is for ${f2(size)} units and the futures price is $${f2(F)}. The initial margin is $${f2(im)} per contract and the maintenance margin is $${f2(mm)} per contract. At what futures price will there be a margin call?`, q: `你 ${side === 'long' ? '買進（long）' : '賣出（short）'} ${n} 口期貨，每口 ${f2(size)} 單位，價格 $${f2(F)}。原始保證金每口 $${f2(im)}、維持保證金每口 $${f2(mm)}。價格到多少（$/單位）會收到保證金追繳？`,
        ans, tol: 0.006, unit: '$/單位',
        sol: [`每口可虧 ${f2(im)} − ${f2(mm)} = $${f2(loss)}（口數不影響每單位的價格變動）`, `每單位價格變動 = ${f2(loss)} / ${f2(size)} = ${f2(dp, 4)}`, `${side === 'long' ? '多頭怕跌' : '空頭怕漲'} → ${f2(F)} ${side === 'long' ? '−' : '+'} ${f2(dp, 4)} = <b>${f2(ans, 4)}</b>`] };
  } },
  { id: 'gw', t: '可提領金額的價格（進階）', base: '2.7 進階', make() {
      const side = pick(['long', 'short']); const size = pick([5000, 15000, 100]); const n = pick([2, 3, 4]);
      const F = size === 100 ? R(1400, 1900, 10) : size === 5000 ? R(15, 30, 0.1) : R(120, 180, 1);
      const w = pick([1000, 1500, 2000, 3000]); const per = w / n; const dp = per / size; const ans = side === 'long' ? F + dp : F - dp;
      return { qe: `A trader is ${side} ${n} contracts, each for ${f2(size)} units, at $${f2(F)}. At what futures price could the trader withdraw $${f2(w)} (in total) from the margin account?`, q: `${side === 'long' ? 'Long' : 'Short'} ${n} 口，每口 ${f2(size)} 單位，價格 $${f2(F)}。價格變動到多少時，可以從保證金帳戶提領 $${f2(w)}（總額）？`,
        ans, tol: 0.006, unit: '$/單位',
        sol: [`需總獲利 $${f2(w)} → 每口 ${f2(w)}/${n} = $${f2(per)}`, `每單位 = ${f2(per)}/${f2(size)} = ${f2(dp, 4)}`, `${side === 'long' ? '多頭要漲' : '空頭要跌'} → <b>${f2(ans, 4)}</b>`] };
  } },
  { id: 'gp', t: '多日價格路徑的追繳金額（進階）', base: 'Table 2.1 進階', make() {
      const n = pick([1, 2, 3]); const size = 100; const F0 = R(1700, 1800, 10); const im = pick([6000, 5000]) ; const mm = im * 0.75;
      let p = F0; const path = []; for (let i = 0; i < 4; i++) { p = +(p + R(-20, 8, 0.1)).toFixed(1); path.push(p); }
      let bal = im * n, prev = F0, calls = [];
      path.forEach((x, i) => { bal += (x - prev) * size * n; prev = x; if (bal < mm * n) { calls.push([i + 1, im * n - bal]); bal = im * n; } });
      const total = calls.reduce((s, c) => s + c[1], 0);
      return { qe: `An investor takes a long position in ${n} gold futures contract(s) (100 oz each) at $${F0}. The initial margin is $${f2(im)} and the maintenance margin is $${f2(mm)} per contract. The settlement prices over the next four days are ${path.join(', ')}. What is the total amount of margin calls over the four days? (Enter 0 if none.)`, q: `Long ${n} 口黃金期貨（每口 100 oz），成交價 $${F0}。原始保證金每口 $${f2(im)}、維持每口 $${f2(mm)}。接下來四天結算價：${path.join('、')}。四天合計需補繳多少保證金？（沒有追繳就填 0）`,
        ans: total, tol: 0.6, unit: '$',
        sol: [`總原始 ${f2(im * n)}、總維持 ${f2(mm * n)}`, ...(() => { let b = im * n, pv = F0; return path.map((x, i) => { const g = (x - pv) * size * n; pv = x; b += g; let s = `第 ${i + 1} 天：(${x}−${(i ? path[i - 1] : F0)})×100×${n} = ${f2(g)} → 餘額 ${f2(b)}`; if (b < mm * n) { s += ` &lt; ${f2(mm * n)} → 補 <b>${f2(im * n - b)}</b> 回到 ${f2(im * n)}`; b = im * n; } return s; }); })(), `合計補繳 <b>${f2(total)}</b>`] };
  } },
  { id: 'go', t: '未平倉量變化', base: '2.23', make() {
      const vol = R(1000, 5000, 100); const a = R(100, vol - 100, 50); const c = R(100, vol - 100, 50); const b = vol - a, d = vol - c;
      return { qe: `On a particular day there were ${vol} trades. Of the buyers, ${a} entered new positions and ${b} closed out; of the sellers, ${c} entered new positions and ${d} closed out. What is the change in open interest? (Use a negative number for a decrease.)`, q: `某日成交 ${vol} 口。買方中 ${a} 口開新倉、${b} 口平倉；賣方中 ${c} 口開新倉、${d} 口平倉。OI 變化為多少？（減少請填負數）`,
        ans: a - d, tol: 0.1, unit: '口',
        sol: ['口訣：買方開 − 賣方平', `${a} − ${d} = <b>${a - d}</b>`, `驗算：賣方開 − 買方平 = ${c} − ${b} = ${c - b}`] };
  } },
  { id: 'gh', t: '最小變異避險口數', base: '3.3／3.13', make() {
      const rho = R(0.6, 0.98, 0.01); const sS = R(0.4, 1.5, 0.01); const sF = R(0.4, 1.5, 0.01);
      const what = pick([['活牛', 40000, '磅'], ['航空燃油（用加熱油期貨）', 42000, '加侖'], ['玉米', 5000, '蒲式耳']]);
      const Q = what[1] * R(3, 60, 1) * pick([0.9, 1, 1.1]); const h = rho * sS / sF; const N = h * Q / what[1];
      return { qe: `A company must hedge ${f2(Q)} ${what[2] === '磅' ? 'pounds' : what[2] === '加侖' ? 'gallons' : 'bushels'} of ${what[0].startsWith('活牛') ? 'live cattle' : what[0].startsWith('航空') ? 'jet fuel (using heating oil futures)' : 'corn'}. The standard deviation of spot price changes is ${sS}, of futures price changes is ${sF}, and the correlation is ${rho}. Each contract covers ${f2(what[1])} units. What is the optimal number of contracts (two decimals, before rounding)?`, q: `要避險 ${f2(Q)} ${what[2]}的${what[0]}。現貨價格變動標準差 ${sS}、期貨 ${sF}，相關係數 ${rho}。每口期貨 ${f2(what[1])} ${what[2]}。最適口數（不四捨五入，到小數第二位）？`,
        ans: N, tol: 0.02, unit: '口',
        sol: [`h* = ${rho} × ${sS} / ${sF} = ${f2(h, 4)}`, `N* = ${f2(h, 4)} × ${f2(Q)} / ${f2(what[1])} = <b>${f2(N, 2)}</b> ≈ ${Math.round(N)} 口`] };
  } },
  { id: 'gb', t: '用指數期貨調整 β', base: '3.4／3.25', make() {
      const V = R(5, 200, 5) * 1e6; const b = R(0.6, 1.8, 0.05); let bs = R(0, 2.2, 0.05); if (Math.abs(bs - b) < 0.1) bs = 0;
      const F = R(1000, 6000, 50); const m = pick([50, 250]); const N = (bs - b) * V / (F * m);
      return { qe: `A portfolio is worth $${f2(V)} with a beta of ${f2(b)}. The index futures price is ${f2(F)} and the multiplier is $${m}. How many contracts are needed to change the beta to ${f2(bs)}? (Positive = long, negative = short; one decimal.)`, q: `投資組合價值 $${f2(V)}、β = ${f2(b)}。指數期貨價格 ${f2(F)}，每口 $${m} × 指數。要把 β 調到 ${f2(bs)}，需要幾口？（long 填正數、short 填負數，到小數第一位）`,
        ans: N, tol: 0.06, unit: '口',
        sol: [`V<sub>F</sub> = ${f2(F)} × ${m} = ${f2(F * m)}`, `(β* − β) × V<sub>A</sub>/V<sub>F</sub> = (${f2(bs)} − ${f2(b)}) × ${f2(V)} / ${f2(F * m)} = <b>${f2(N, 2)}</b>`, N < 0 ? '負數 → short' : '正數 → long'] };
  } },
  { id: 'gx', t: '交叉避險：曝險換算成口數', base: '3.23', make() {
      const rho = R(0.5, 0.9, 0.05); const ratio = R(1.1, 1.8, 0.1); const loss = pick([0.5, 1, 2]) * 1e6; const size = 42000;
      const h = rho * ratio; const Q = loss / 0.01; const N = h * Q / size;
      return { qe: `Price changes of a new fuel have a correlation of ${rho} with gasoline futures price changes, and their standard deviation is ${ratio} times as large. The company loses $${f2(loss)} for each 1 cent increase in the price per gallon. Each gasoline futures contract is on 42,000 gallons. How many contracts should be traded? (one decimal)`, q: `新燃料價格變動與汽油期貨相關係數 ${rho}，標準差是汽油期貨的 ${ratio} 倍。新燃料每加侖每漲 1 美分，公司損失 $${f2(loss)}。每口汽油期貨 42,000 加侖。需要幾口？（小數第一位）`,
        ans: N, tol: 0.06, unit: '口',
        sol: [`h* = ${rho} × ${ratio} = ${f2(h, 4)}`, `0.01 × Q = ${f2(loss)} → Q = ${f2(Q)} 加侖`, `期貨部位 = ${f2(h * Q)} 加侖`, `N = ${f2(h * Q)} / 42,000 = <b>${f2(N, 2)}</b>（long）`] };
  } },
  { id: 'gs', t: '基差：實際買賣價格', base: '3.7／3.21', make() {
      const side = pick(['賣出', '買進']); const F1 = R(20, 80, 0.1); const F2 = +(F1 + R(-6, 6, 0.1)).toFixed(2); const b2 = R(-1.5, 1.5, 0.05); const S2 = +(F2 + b2).toFixed(2);
      const ans = F1 + b2;
      return { qe: `A company will ${side === '賣出' ? 'sell' : 'buy'} an asset and hedges by ${side === '賣出' ? 'shorting' : 'buying'} futures at $${F1} (h = 1). When the hedge is closed out the futures price is $${F2} and the spot price is $${S2}. What is the effective price ${side === '賣出' ? 'received' : 'paid'} per unit?`, q: `公司未來要${side}某資產，現在以 $${F1} ${side === '賣出' ? 'short' : 'long'} 期貨避險（h=1）。平倉時期貨 $${F2}、現貨 $${S2}。實際每單位${side === '賣出' ? '收到' : '支付'}的價格？`,
        ans, tol: 0.006, unit: '$',
        sol: [`b₂ = S₂ − F₂ = ${S2} − ${F2} = ${f2(b2, 2)}`, side === '賣出' ? `收到 = S₂ + (F₁ − F₂) = F₁ + b₂` : `支付 = S₂ − (F₂ − F₁) = F₁ + b₂`, `= ${F1} + (${f2(b2, 2)}) = <b>${f2(ans, 2)}</b>`] };
  } },
  { id: 'gc', t: '選擇權利潤', base: 'Ch1 payoff', make() {
      const type = pick(['long call', 'short call', 'long put', 'short put']); const K = R(40, 120, 5); const c = R(2, 10, 0.5); const ST = +(K + R(-30, 30, 1)).toFixed(0);
      const call = Math.max(ST - K, 0), put = Math.max(K - ST, 0);
      const ans = type === 'long call' ? call - c : type === 'short call' ? c - call : type === 'long put' ? put - c : c - put;
      return { qe: `An investor has a ${type} with strike K = $${K} and premium $${c}. At expiration S<sub>T</sub> = $${ST}. What is the profit per share?`, q: `${type}，執行價 K = $${K}，權利金 $${c}。到期股價 S<sub>T</sub> = $${ST}。每股利潤（profit）？`, ans, tol: 0.006, unit: '$',
        sol: [type.includes('call') ? `Call payoff = max(${ST}−${K}, 0) = ${call}` : `Put payoff = max(${K}−${ST}, 0) = ${put}`, type.startsWith('long') ? `Long：payoff − 權利金 = <b>${f2(ans)}</b>` : `Short：權利金 − payoff = <b>${f2(ans)}</b>`] };
  } },
  { id: 'gt', t: 'Tailing the hedge（進階）', base: '3.22(d)', make() {
      const rho = R(0.8, 0.98, 0.01); const r = R(0.9, 1.3, 0.01); const units = R(20, 120, 5) * 1000; const S = R(20, 60, 0.5); const F = +(S * R(0.94, 1.04, 0.01)).toFixed(2); const size = 5000;
      const VA = units * S, VF = size * F; const N = rho * r * VA / VF;
      return { qe: `A company hedges ${f2(units)} units of an asset. The spot price is $${S}, the futures price is $${F}, and each contract is on 5,000 units. The correlation between one-day percentage returns is ${rho} and σ̂<sub>S</sub>/σ̂<sub>F</sub> = ${r}. What is the optimal number of contracts when daily settlement is considered (tailing)? (two decimals)`, q: `用期貨避險 ${f2(units)} 單位資產，現貨 $${S}、期貨 $${F}、每口 5,000 單位。一天報酬率的相關係數 ${rho}，σ̂<sub>S</sub>/σ̂<sub>F</sub> = ${r}。考慮每日結算（tailing）的最適口數？（小數第二位）`,
        ans: N, tol: 0.02, unit: '口',
        sol: [`V<sub>A</sub> = ${f2(units)} × ${S} = ${f2(VA)}`, `V<sub>F</sub> = 5,000 × ${F} = ${f2(VF)}`, `N = ${rho} × ${r} × ${f2(VA)} / ${f2(VF)} = <b>${f2(N, 2)}</b>`] };
  } },
  { id: 'gf', t: '外匯報價換算', base: '2.13', make() {
      const fwd = R(0.82, 1.25, 0.0005); const fut = +(1 / fwd * R(0.97, 1.03, 0.001)).toFixed(4);
      const conv = 1 / fwd; const sellFwd = conv > fut;
      return { qe: `The forward price of the Swiss franc is quoted as ${fwd.toFixed(4)} (CHF per USD) and the futures price is ${fut} (USD per CHF). Convert the forward quote to USD per CHF (four decimals). Which market is better for selling francs?`, q: `瑞郎遠期報價 ${fwd.toFixed(4)}（CHF/USD），期貨報價 ${fut}（USD/CHF）。把遠期換成期貨的報價方式是多少 USD/CHF？（四位小數）想賣瑞郎選哪個市場？`,
        ans: conv, tol: 0.00015, unit: 'USD/CHF',
        sol: [`1 / ${fwd.toFixed(4)} = <b>${conv.toFixed(4)}</b>`, `${conv.toFixed(4)} ${sellFwd ? '&gt;' : '&lt;'} ${fut} → 瑞郎在${sellFwd ? '遠期' : '期貨'}市場較值錢 → 想賣選<b>${sellFwd ? '遠期' : '期貨'}</b>`] };
  } }
];
