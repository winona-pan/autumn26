// ===== Interactive widgets =====
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
let WID = 0;
const nid = p => p + (++WID);

const WIDGETS = {
  payoff(el) {
    const id = nid('po');
    el.innerHTML = `<div class="wg"><div class="wg-row"><label>部位 <select id="${id}t"><option value="lc">Long call 買入買權</option><option value="sc">Short call 賣出買權</option><option value="lp">Long put 買入賣權</option><option value="sp">Short put 賣出賣權</option></select></label>
      <label>執行價 K <input id="${id}k" type="range" min="60" max="140" step="5" value="100"><b id="${id}kv">100</b></label>
      <label>權利金 <input id="${id}c" type="range" min="0" max="20" step="1" value="5"><b id="${id}cv">5</b></label></div>
      <div id="${id}g"></div><p class="wg-out" id="${id}o"></p></div>`;
    const draw = () => {
      const t = $('#' + id + 't').value, K = +$('#' + id + 'k').value, c = +$('#' + id + 'c').value;
      $('#' + id + 'kv').textContent = K; $('#' + id + 'cv').textContent = c;
      const pay = s => t === 'lc' ? Math.max(s - K, 0) : t === 'sc' ? -Math.max(s - K, 0) : t === 'lp' ? Math.max(K - s, 0) : -Math.max(K - s, 0);
      const prof = s => pay(s) + (t[0] === 'l' ? -c : c);
      const W = 340, H = 190, x0 = 30, x1 = 330, sMin = 40, sMax = 160, yMin = -45, yMax = 45;
      const X = s => x0 + (s - sMin) / (sMax - sMin) * (x1 - x0), Y = v => 10 + (yMax - v) / (yMax - yMin) * (H - 40);
      const pts = f => { let d = ''; for (let s = sMin; s <= sMax; s += 1) d += (d ? 'L' : 'M') + X(s).toFixed(1) + ',' + Y(f(s)).toFixed(1); return d; };
      const be = t.includes('c') ? K + c : K - c;
      let ticks = ''; for (let s = 40; s <= 160; s += 20) ticks += `<text x="${X(s)}" y="${H - 14}" text-anchor="middle" class="sm">${s}</text>`;
      for (let v = -40; v <= 40; v += 20) ticks += `<text x="${x0 - 4}" y="${Y(v) + 4}" text-anchor="end" class="sm">${v}</text><line x1="${x0}" x2="${x1}" y1="${Y(v)}" y2="${Y(v)}" class="grid"/>`;
      $('#' + id + 'g').innerHTML = `<svg class="fig" viewBox="0 0 ${W} ${H}" role="img" aria-label="選擇權損益圖"><defs><clipPath id="${id}cp"><rect x="${x0}" y="6" width="${x1 - x0}" height="${H - 32}"/></clipPath></defs>${ticks}<g clip-path="url(#${id}cp)"><line x1="${x0}" x2="${x1}" y1="${Y(0)}" y2="${Y(0)}" class="ax"/><path d="${pts(pay)}" class="ln dash"/><path d="${pts(prof)}" class="ln a2 thick"/></g><line x1="${X(K)}" x2="${X(K)}" y1="10" y2="${H - 30}" class="grid"/><circle cx="${X(be)}" cy="${Y(0)}" r="4" class="dot"/><text x="${x1}" y="${H - 2}" text-anchor="end" class="sm">到期股價 S_T</text></svg>`;
      const maxP = t === 'lc' ? '無限' : t === 'lp' ? (K - c) : c;
      const maxL = t === 'lc' || t === 'lp' ? c : t === 'sc' ? '無限' : (K - c);
      $('#' + id + 'o').innerHTML = `虛線 = payoff 收益；彩色粗線 = profit 利潤。損益兩平點 S<sub>T</sub> = <b>${be}</b>；最大利潤 <b>${maxP}</b>；最大損失 <b>${maxL}</b>。`;
    };
    $$('select,input', el).forEach(i => i.addEventListener('input', draw)); draw();
  },

  margin(el) {
    const id = nid('mg');
    el.innerHTML = `<div class="wg"><div class="wg-row">
      <label>方向 <select id="${id}s"><option value="1">Long</option><option value="-1">Short</option></select></label>
      <label>口數 <input id="${id}n" type="number" value="2" min="1" step="1"></label>
      <label>每口數量 <input id="${id}z" type="number" value="100"></label>
      <label>原始/口 <input id="${id}i" type="number" value="6000"></label>
      <label>維持/口 <input id="${id}m" type="number" value="4500"></label></div>
      <label class="full">價格路徑（第一個是成交價，用逗號分隔）<input id="${id}p" type="text" value="1450,1441,1438.3,1444.6,1441.3,1440.1,1436.2,1429.9,1430.8,1425.4,1428.1,1411,1411,1414.3,1416.1,1423,1426.9"></label>
      <div class="tblwrap"><table class="tbl num" id="${id}t"></table></div><p class="wg-out" id="${id}o"></p></div>`;
    const run = () => {
      const s = +$('#' + id + 's').value, n = +$('#' + id + 'n').value, z = +$('#' + id + 'z').value, im = +$('#' + id + 'i').value * n, mm = +$('#' + id + 'm').value * n;
      const p = $('#' + id + 'p').value.split(/[,，\s]+/).map(Number).filter(x => !isNaN(x));
      let bal = im, cum = 0, calls = 0, rows = `<tr><th>日</th><th>結算價</th><th>當日損益</th><th>累積</th><th>保證金餘額</th><th>追繳</th></tr><tr><td>0</td><td>${p[0]}</td><td></td><td></td><td>${f2(im)}</td><td></td></tr>`;
      for (let i = 1; i < p.length; i++) {
        const g = (p[i] - p[i - 1]) * z * n * s; cum += g; bal += g; let call = '';
        if (bal < mm) { call = f2(im - bal); calls += im - bal; rows += `<tr class="hit"><td>${i}</td><td>${p[i]}</td><td>${f2(g)}</td><td>${f2(cum)}</td><td>${f2(bal)}</td><td><b>${call}</b></td></tr>`; bal = im; }
        else rows += `<tr><td>${i}</td><td>${p[i]}</td><td>${f2(g)}</td><td>${f2(cum)}</td><td>${f2(bal)}</td><td></td></tr>`;
      }
      $('#' + id + 't').innerHTML = rows;
      $('#' + id + 'o').innerHTML = `維持線 ${f2(mm)}；追繳總額 <b>${f2(calls)}</b>；最後平倉時帳面 ${f2(bal)} − 原始 ${f2(im)} = ${f2(bal - im)} → 淨損益 = ${f2(bal - im)} − ${f2(calls)} = <b>${f2(cum)}</b>（= 累積損益）`;
    };
    $$('select,input', el).forEach(i => i.addEventListener('input', run)); run();
  },

  oi(el) {
    const id = nid('oi');
    el.innerHTML = `<div class="wg"><div class="wg-row"><label>成交量 <input id="${id}v" type="number" value="2000"></label><label>買方開倉 a <input id="${id}a" type="number" value="600"></label><label>賣方開倉 c <input id="${id}c" type="number" value="800"></label></div><div id="${id}g"></div><p class="wg-out" id="${id}o"></p></div>`;
    const run = () => {
      const v = +$('#' + id + 'v').value, a = +$('#' + id + 'a').value, c = +$('#' + id + 'c').value, b = v - a, d = v - c;
      const w = x => Math.max(0, x / v * 250);
      $('#' + id + 'g').innerHTML = `<svg class="fig" viewBox="0 0 340 100" role="img" aria-label="OI"><text x="5" y="30" class="sm">買方</text><rect x="45" y="15" width="${w(a)}" height="22" class="seg s1"/><rect x="${45 + w(a)}" y="15" width="${w(b)}" height="22" class="seg s2"/><text x="5" y="72" class="sm">賣方</text><rect x="45" y="57" width="${w(c)}" height="22" class="seg s1"/><rect x="${45 + w(c)}" y="57" width="${w(d)}" height="22" class="seg s2"/><text x="50" y="96" class="sm">■ 開倉　■ 平倉</text></svg>`;
      $('#' + id + 'o').innerHTML = b < 0 || d < 0 ? '開倉數不能大於成交量' : `買方平倉 b = ${b}、賣方平倉 d = ${d}。OI 變化 = a − d = ${a} − ${d} = <b>${a - d > 0 ? '+' : ''}${a - d}</b>（也 = c − b = ${c - b}）`;
    };
    $$('input', el).forEach(i => i.addEventListener('input', run)); run();
  },

  hedge(el) {
    const id = nid('hg');
    el.innerHTML = `<div class="wg"><div class="wg-row"><label>ρ <input id="${id}r" type="range" min="0" max="1" step="0.001" value="0.928"><b id="${id}rv"></b></label><label>σ<sub>S</sub> <input id="${id}s" type="number" step="0.001" value="0.0263"></label><label>σ<sub>F</sub> <input id="${id}f" type="number" step="0.001" value="0.0313"></label></div><div class="wg-row"><label>要避險數量 Q<sub>A</sub> <input id="${id}q" type="number" value="2000000"></label><label>每口 Q<sub>F</sub> <input id="${id}z" type="number" value="42000"></label></div><div id="${id}g"></div><p class="wg-out" id="${id}o"></p></div>`;
    const run = () => {
      const r = +$('#' + id + 'r').value, s = +$('#' + id + 's').value, f = +$('#' + id + 'f').value, q = +$('#' + id + 'q').value, z = +$('#' + id + 'z').value;
      $('#' + id + 'rv').textContent = r.toFixed(2);
      const h = r * s / f, N = h * q / z, left = Math.sqrt(Math.max(0, 1 - r * r));
      $('#' + id + 'g').innerHTML = `<svg class="fig" viewBox="0 0 340 70" role="img" aria-label="剩餘風險"><text x="5" y="22" class="sm">未避險</text><rect x="70" y="10" width="250" height="16" class="seg s3"/><text x="5" y="54" class="sm">避險後</text><rect x="70" y="42" width="${250 * left}" height="16" class="seg s1"/></svg>`;
      $('#' + id + 'o').innerHTML = `h* = ${r.toFixed(3)} × ${s} / ${f} = <b>${h.toFixed(4)}</b>；N* = h* × ${f2(q)} / ${f2(z)} = <b>${N.toFixed(2)}</b> ≈ ${Math.round(N)} 口。最適避險後剩下的標準差只有原本的 √(1−ρ²) = ${(left * 100).toFixed(1)}%。（預設值為課本航空燃油例）`;
    };
    $$('input', el).forEach(i => i.addEventListener('input', run)); run();
  },

  beta(el) {
    const id = nid('bt');
    el.innerHTML = `<div class="wg"><div class="wg-row"><label>組合 V<sub>A</sub> <input id="${id}v" type="number" value="5000000"></label><label>β <input id="${id}b" type="number" step="0.05" value="1.5"></label><label>目標 β* <input id="${id}t" type="range" min="0" max="3" step="0.05" value="0"><b id="${id}tv"></b></label></div><div class="wg-row"><label>期貨價格 <input id="${id}f" type="number" value="1000"></label><label>乘數 <input id="${id}m" type="number" value="250"></label></div><div id="${id}g"></div><p class="wg-out" id="${id}o"></p></div>`;
    const run = () => {
      const v = +$('#' + id + 'v').value, b = +$('#' + id + 'b').value, t = +$('#' + id + 't').value, f = +$('#' + id + 'f').value, m = +$('#' + id + 'm').value;
      $('#' + id + 'tv').textContent = t.toFixed(2);
      const N = (t - b) * v / (f * m); const X = x => 20 + x / 3 * 300;
      $('#' + id + 'g').innerHTML = `<svg class="fig" viewBox="0 0 340 60" role="img" aria-label="beta"><line x1="20" x2="320" y1="30" y2="30" class="ax"/>${[0, 1, 2, 3].map(x => `<text x="${X(x)}" y="52" text-anchor="middle" class="sm">${x}</text>`).join('')}<line x1="${X(b)}" x2="${X(t)}" y1="30" y2="30" class="ar a2 thick" marker-end="url(#ah)"/><circle cx="${X(b)}" cy="30" r="5" class="dot"/><text x="${X(b)}" y="18" text-anchor="middle" class="sm">β</text></svg>`;
      $('#' + id + 'o').innerHTML = `(β* − β) × V<sub>A</sub>/V<sub>F</sub> = (${t.toFixed(2)} − ${b}) × ${f2(v)} / ${f2(f * m)} = <b>${N.toFixed(2)}</b> → <b>${N < 0 ? 'Short' : N > 0 ? 'Long' : '不需'} ${Math.abs(Math.round(N))} 口</b>`;
    };
    $$('input', el).forEach(i => i.addEventListener('input', run)); run();
  },

  fib(el) {
    const id = nid('fb');
    el.innerHTML = `<div class="wg"><div class="wg-row"><label>基準價 <input id="${id}p" type="number" value="10"></label><label>方向 <select id="${id}d"><option value="up">上漲壓力區</option><option value="dn">下跌支撐區</option></select></label></div><div id="${id}g"></div></div>`;
    const run = () => {
      const p = +$('#' + id + 'p').value, up = $('#' + id + 'd').value === 'up';
      const rs = [0.191, 0.382, 0.5, 0.618, 0.809];
      const rows = rs.map(r => [r, up ? p * (1 + r) : p * (1 - r)]);
      $('#' + id + 'g').innerHTML = `<div class="tblwrap"><table class="tbl num"><tr><th>比例</th><th>價位</th><th>算式</th></tr>${rows.map(x => `<tr${x[0] === 0.618 ? ' class="hit"' : ''}><td>${x[0]}</td><td><b>${x[1].toFixed(2)}</b></td><td>${p} × (1 ${up ? '+' : '−'} ${x[0]})</td></tr>`).join('')}</table></div>`;
    };
    $$('input,select', el).forEach(i => i.addEventListener('input', run)); run();
  },

  ind(el) {
    const id = nid('in');
    el.innerHTML = `<div class="wg"><label class="full">收盤價序列（逗號分隔，舊 → 新）<input id="${id}p" type="text" value="50,51,52.5,51.8,53,54.2,55,54.1,56,57.5,58.2,57,59,60.5,61"></label><div class="wg-row"><label>MA/RSI 天數 <input id="${id}n" type="number" value="6" min="2"></label><label>KD 天數 <input id="${id}k" type="number" value="9" min="2"></label></div><p class="wg-out" id="${id}o"></p></div>`;
    const run = () => {
      const p = $('#' + id + 'p').value.split(/[,，\s]+/).map(Number).filter(x => !isNaN(x)); const n = +$('#' + id + 'n').value, kn = +$('#' + id + 'k').value;
      if (p.length < Math.max(n, kn) + 1) { $('#' + id + 'o').textContent = '價格數量太少'; return; }
      const last = p[p.length - 1]; const ma = p.slice(-n).reduce((a, b) => a + b, 0) / n; const bias = (last - ma) / ma;
      let up = 0, dn = 0; for (let i = p.length - n; i < p.length; i++) { const d = p[i] - p[i - 1]; if (d > 0) up += d; else dn -= d; }
      const rsi = up + dn ? 100 * up / (up + dn) : 50;
      let K = 50, D = 50; for (let i = kn - 1; i < p.length; i++) { const w = p.slice(i - kn + 1, i + 1); const H = Math.max(...w), L = Math.min(...w); const rsv = H === L ? 50 : (p[i] - L) / (H - L) * 100; K = rsv / 3 + K * 2 / 3; D = K / 3 + D * 2 / 3; }
      const tag = (v, hi, lo) => v >= hi ? '<span class="pill bad">過熱 → 賣</span>' : v <= lo ? '<span class="pill good">超賣 → 買</span>' : '<span class="pill">中性</span>';
      $('#' + id + 'o').innerHTML = `MA${n} = ${ma.toFixed(2)}；乖離率 = (${last} − ${ma.toFixed(2)})/${ma.toFixed(2)} = <b>${(bias * 100).toFixed(2)}%</b> ${tag(bias * 100, 7, -7)}<br>RSI${n} = 上漲 ${up.toFixed(2)} /(上漲 ${up.toFixed(2)} + 下跌 ${dn.toFixed(2)}) × 100 = <b>${rsi.toFixed(1)}</b> ${tag(rsi, 80, 20)}<br>K${kn} = <b>${K.toFixed(1)}</b>、D${kn} = <b>${D.toFixed(1)}</b>（起始 K、D = 50）${K > D ? '，K 在 D 之上' : '，K 在 D 之下'} ${tag(K, 80, 20)}`;
    };
    $$('input', el).forEach(i => i.addEventListener('input', run)); run();
  },

  decision(el) {
    const id = nid('dc');
    const crit = ['Memory & storage', 'Battery life', 'Carrying weight', 'Warranty', 'Display quality'];
    const w0 = [10, 8, 6, 4, 3];
    const laps = [['Acer Aspire E', 10, 3, 10, 8, 5], ['Apple MacBook Pro', 8, 5, 7, 10, 10], ['Dell XPS 13', 8, 7, 7, 8, 7], ['Lenovo ThinkPad', 7, 8, 7, 8, 7], ['Lenovo Yoga', 8, 3, 6, 10, 8], ['Microsoft Surface Book', 10, 7, 8, 6, 7], ['Razer Blade Stealth', 4, 10, 4, 8, 10]];
    el.innerHTML = `<div class="wg"><p class="sm-p">步驟 3：調整權重，看看最佳選擇會不會改變（Exhibit 2.2–2.4）。</p><div class="wg-row">${crit.map((c, i) => `<label>${c} <input id="${id}w${i}" type="number" value="${w0[i]}" min="0" max="10"></label>`).join('')}</div><div class="tblwrap"><table class="tbl num" id="${id}t"></table></div></div>`;
    const run = () => {
      const w = crit.map((_, i) => +$('#' + id + 'w' + i).value);
      const tot = laps.map(l => l.slice(1).reduce((s, v, i) => s + v * w[i], 0)); const best = Math.max(...tot);
      $('#' + id + 't').innerHTML = `<tr><th>Laptop</th>${crit.map(c => `<th>${c.split(' ')[0]}</th>`).join('')}<th>Total</th></tr>` + laps.map((l, k) => `<tr${tot[k] === best ? ' class="hit"' : ''}><td>${l[0]}</td>${l.slice(1).map((v, i) => `<td>${v}×${w[i]}=${v * w[i]}</td>`).join('')}<td><b>${tot[k]}</b></td></tr>`).join('');
    };
    $$('input', el).forEach(i => i.addEventListener('input', run)); run();
  },

  payoffm(el) {
    const id = nid('pm');
    const M = [[13, 14, 11], [9, 15, 18], [24, 21, 15], [18, 14, 28]];
    el.innerHTML = `<div class="wg"><p class="sm-p">Visa 策略 × MasterCard 競爭行動（百萬美元）。可修改數字。</p><div class="tblwrap"><table class="tbl num" id="${id}m"><tr><th></th><th>CA1</th><th>CA2</th><th>CA3</th></tr>${M.map((r, i) => `<tr><td>S${i + 1}</td>${r.map((v, j) => `<td><input class="cell" id="${id}c${i}${j}" type="number" value="${v}"></td>`).join('')}</tr>`).join('')}</table></div><div class="tblwrap"><table class="tbl num" id="${id}r"></table></div><p class="wg-out" id="${id}o"></p></div>`;
    const run = () => {
      const m = M.map((r, i) => r.map((_, j) => +$('#' + id + 'c' + i + j).value));
      const colMax = [0, 1, 2].map(j => Math.max(...m.map(r => r[j])));
      const reg = m.map(r => r.map((v, j) => colMax[j] - v)); const maxReg = reg.map(r => Math.max(...r));
      const mx = m.map(r => Math.max(...r)), mn = m.map(r => Math.min(...r));
      const iMaxMax = mx.indexOf(Math.max(...mx)), iMaxMin = mn.indexOf(Math.max(...mn)), iMinReg = maxReg.indexOf(Math.min(...maxReg));
      $('#' + id + 'r').innerHTML = `<tr><th>遺憾矩陣</th><th>CA1</th><th>CA2</th><th>CA3</th><th>最大遺憾</th></tr>` + reg.map((r, i) => `<tr${i === iMinReg ? ' class="hit"' : ''}><td>S${i + 1}</td>${r.map(v => `<td>${v}</td>`).join('')}<td><b>${maxReg[i]}</b></td></tr>`).join('');
      $('#' + id + 'o').innerHTML = `樂觀 maximax：各列最大 ${mx.join('、')} → 選 <b>S${iMaxMax + 1}</b>（${mx[iMaxMax]}）<br>悲觀 maximin：各列最小 ${mn.join('、')} → 選 <b>S${iMaxMin + 1}</b>（${mn[iMaxMin]}）<br>最小遺憾 minimax regret：每欄最高 ${colMax.join('、')} 減各格 → 選 <b>S${iMinReg + 1}</b>（最多後悔 ${maxReg[iMinReg]}）`;
    };
    $$('input', el).forEach(i => i.addEventListener('input', run)); run();
  },

  bias(el) {
    const B = [['Overconfidence 過度自信', '高估自己和自己的表現', '覺得自己不用複習也能考 90 分'], ['Immediate gratification 立即滿足', '選立即有回報、避開立即成本的方案', '先追劇，報告明天再說'], ['Anchoring 錨定效應', '執著於最初的資訊，忽略後來的資訊', '原價 3000 打 5 折就覺得很划算'], ['Selective perception 選擇性知覺', '依自己的偏見挑選、組織、解讀事件', '只注意到討厭的同事犯的錯'], ['Confirmation 確認偏誤', '找支持過去選擇的資訊，忽略相反資訊', '買了某股票後只看看多的新聞'], ['Framing 框架偏誤', '凸顯某些面向、忽略其他面向', '「90% 存活率」vs「10% 死亡率」感受不同'], ['Availability 可得性', '只看最近、最容易想到的事件', '剛看到空難新聞就不敢搭飛機'], ['Representation 代表性', '把不相同的情況看成一樣', '上一個台大實習生很強，所以這個也一定很強'], ['Randomness 隨機性', '從隨機事件中硬找出意義', '穿紅襪子那天考很好，所以考試都穿紅襪'], ['Sunk costs 沉沒成本', '忘記過去的成本無法挽回，只該看未來', '電影很難看但票都買了只好看完'], ['Self-serving 自利偏誤', '成功歸功自己，失敗怪外在因素', '考好是我聰明，考差是老師出太難'], ['Hindsight 後見之明', '事後誤以為結果早可預測', '「我就知道會跌！」']];
    el.innerHTML = `<div class="flipgrid">${B.map(b => `<button class="flip" type="button"><span class="f1"><b>${b[0]}</b></span><span class="f2"><b>${b[1]}</b><br><i>例：${b[2]}</i></span></button>`).join('')}</div>`;
    $$('.flip', el).forEach(b => b.addEventListener('click', () => b.classList.toggle('on')));
  }
};
