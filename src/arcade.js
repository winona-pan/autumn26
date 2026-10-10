// ===== 遊戲大廳：翻牌記憶、打地鼠、貪吃蛇答題、猜單字救豬豬、配對、分類 =====
// 題目來源：各科的配對名詞（match）、卡片的專有名詞（terms）、CFA 卡片的英文標題、選擇題題庫。
const ARCADE = (() => {
  const esc2 = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const plain = s => String(s).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  let stopper = null, KEY = '';
  const stop = () => { if (stopper) { try { stopper(); } catch (e) { } stopper = null; } };
  const onStop = f => { const prev = stopper; stopper = () => { if (prev) prev(); f(); }; };
  const sfx = k => SOUND.sfx(k);
  const best = (id, v, lower) => { const k = 'ar_' + id + '_' + KEY, o = ST.best[k]; if (v != null && (o == null || (lower ? v < o : v > o))) { ST.best[k] = v; save(); return { v, rec: true }; } return { v: o, rec: false }; };

  // ---- 題目來源 ----
  function pairsFor(k) {
    const seen = new Set(), out = [];
    const cjk = t => /[\u3400-\u9fff]/.test(t);
    const add = (en, zh) => { en = plain(en); zh = plain(zh); if (cjk(en) && !cjk(zh)) [en, zh] = [zh, en]; if (cjk(en) || !en || !zh || en.length > 40 || zh.length > 28) return; const key = en.toLowerCase(); if (seen.has(key)) return; seen.add(key); out.push([en, zh]); };
    (DATA[k].match || []).forEach(p => add(p[0], p[1]));
    subjCards(DATA[k]).forEach(c => { (c.terms || []).forEach(t => add(t[0], t[1])); if (k === 'cfa' && c.en) add(c.en.split(/[:：;]/)[0], c.t.split(/[：:（(]/)[0]); });
    return out;
  }
  const isWord = en => /^[A-Za-z][A-Za-z '’\-()/&.,]{1,24}$/.test(en) && (en.match(/[A-Za-z]/g) || []).length >= 3;

  // ---- 大廳 ----
  const ICON = {
    mem: '<rect x="3" y="4" width="8" height="11" rx="2"/><rect x="13" y="4" width="8" height="11" rx="2"/><path d="M7 8.5 v2 M17 8.5 v2"/>',
    mole: '<path d="M3 19 h18"/><path d="M6 19 a6 6 0 0 1 12 0"/><circle cx="10" cy="14" r=".8"/><circle cx="14" cy="14" r=".8"/><path d="M15 4 l4 4 M17 2 l4 4 M19 6 l-5 5"/>',
    snake: '<path d="M4 18 h6 a3 3 0 0 0 0-6 h-2 a3 3 0 0 1 0-6 h8"/><circle cx="19" cy="6" r="2"/><circle cx="18" cy="17" r="2"/>',
    hang: '<circle cx="8" cy="7" r="3"/><circle cx="16" cy="6" r="3"/><circle cx="12" cy="5" r="3"/><path d="M8 10 L12 15 M16 9 L12 15 M12 8 V15"/><rect x="8" y="15" width="8" height="6" rx="3"/>',
    match: '<circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><circle cx="18" cy="7" r="2.5"/><circle cx="18" cy="17" r="2.5"/><path d="M8.5 7 L15.5 17 M8.5 17 L15.5 7"/>',
    sort: '<path d="M4 6 h16 M4 12 h10 M4 18 h6"/><path d="M17 14 l3 3 -3 3"/>'
  };
  const icon = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;
  function render(key, root) {
    stop(); KEY = key;
    const P = pairsFor(key), S = DATA[key].sort || [], hasMcq = (bankFor(key) || []).length >= 4, words = P.filter(p => isWord(p[0]));
    const G = [
      P.length >= 6 && ['mem', '翻牌記憶', '翻兩張，找出英文 ↔ 中文', 't1', () => { const b = best('mem', null, true).v; return b != null ? `最少 ${b} 步` : ''; }],
      P.length >= 6 && ['mole', '打地鼠', '看中文，敲舉著對的英文的地鼠', 't2', () => { const b = best('mole').v; return b ? `最高 ${b} 分` : ''; }],
      hasMcq && ['snake', '貪吃蛇答題', '吃到正確答案的果子就變長', 't3', () => { const b = best('snake').v; return b ? `最多 ${b} 題` : ''; }],
      words.length >= 4 && ['hang', '猜單字救豬豬', '看中文猜英文，猜錯就破一顆氣球', 't4', () => { const b = best('hang').v; return b ? `最多連救 ${b} 隻` : ''; }],
      (DATA[key].match || []).length >= 6 && ['match', '配對連連看', key === 'law' ? '條號 ↔ 內容，越快越好' : '英文 ↔ 意思，越快越好', 't5', () => { const b = ST.best['m' + key]; return b ? `最快 ${b} 秒` : ''; }],
      ...S.map((s, i) => ['s' + i, '分類', s.t, 't6', () => ''])
    ].filter(Boolean);
    root.innerHTML = `<div class="arc"><div class="tipbox"></div>
      <div class="arcbar"><button type="button" class="arcsw" data-sw="sound" aria-pressed="${!!ST.sound}">音效：${ST.sound ? '開' : '關'}</button><button type="button" class="arcsw" data-sw="music" aria-pressed="${!!ST.music}">配樂：${ST.music ? '開' : '關'}</button></div>
      <div class="arcgrid">${G.map(g => `<button type="button" class="arct ${g[3]}" data-g="${g[0]}"><span class="arci">${icon(g[0].startsWith('s') && g[0] !== 'snake' ? 'sort' : g[0])}</span><b>${g[1]}</b><span>${g[2]}</span><small>${g[4]()}</small></button>`).join('')}</div>
      <div class="arena"></div></div>`;
    FUN.say($('.tipbox', root), pick(['挑一個遊戲吧！右上角可以開音效和配樂。', '翻牌、打地鼠、貪吃蛇、救豬豬⋯⋯玩著玩著名詞就記住了！', '電腦用鍵盤、手機用手指都能玩。']));
    $$('[data-sw]', root).forEach(b => b.onclick = () => { const k = b.dataset.sw; ST[k] = !ST[k]; save(); FUN.hud(); if (k === 'music') ST.music ? music() : SOUND.stop(); else sfx('ok'); b.setAttribute('aria-pressed', !!ST[k]); b.textContent = (k === 'sound' ? '音效：' : '配樂：') + (ST[k] ? '開' : '關'); });
    const arena = $('.arena', root), grid = $('.arcgrid', root);
    const hall = () => { stop(); grid.hidden = false; arena.innerHTML = ''; render(key, root); };
    const open = g => {
      stop(); grid.hidden = true; music(); sfx('start');
      arena.innerHTML = `<div class="arctop"><button type="button" class="ntbtn ghost arcback">← 遊戲大廳</button></div><div class="arcplay"></div>`;
      $('.arcback', arena).onclick = hall;
      const box = $('.arcplay', arena), again = () => open(g);
      if (g === 'mem') memory(box, P, again, hall); else if (g === 'mole') mole(box, P, again, hall); else if (g === 'snake') snake(box, key, again, hall);
      else if (g === 'hang') hang(box, words, again, hall); else if (g === 'match') matchGame(box, key, again, hall); else sortGame(box, S[+g.slice(1)], again, hall);
      window.scrollTo(0, Math.max(0, scrollY + arena.getBoundingClientRect().top - 70));
    };
    $$('[data-g]', grid).forEach(b => b.onclick = () => open(b.dataset.g));
    music();
  }
  function music() { if (CUR[1] === 'game') SOUND.play('game'); }
  function result(box, { pig, title, lines, xp, again, hall }) {
    if (xp) FUN.xp(xp);
    box.insertAdjacentHTML('beforeend', `<div class="arcover"><div class="win">${PIG(pig, 100)}<h3>${title}</h3>${lines.map(l => `<p>${l}</p>`).join('')}<div class="row wrap arcbtns"><button class="btn big" type="button" data-again>再玩一次</button><button class="btn ghost" type="button" data-hall>遊戲大廳</button></div></div></div>`);
    box.querySelector('[data-again]').onclick = again; box.querySelector('[data-hall]').onclick = hall;
  }

  // ---- 翻牌記憶 ----
  function memory(box, P, again, hall) {
    const set = shuffle(P).slice(0, 6), cards = shuffle(set.flatMap((p, i) => [{ i, t: p[0], en: 1 }, { i, t: p[1] }]));
    let open = [], lock = false, moves = 0, got = 0, combo = 0; const t0 = Date.now();
    box.innerHTML = `<p class="arcinfo"><b>翻牌記憶</b>　步數 <span data-mv>0</span>　配對 <span data-got>0</span>/6</p><div class="memgrid">${cards.map((c, n) => `<button type="button" class="mcard" data-n="${n}" aria-label="蓋著的牌"><span class="mback">?</span><span class="mface${c.en ? ' en' : ''}">${esc2(c.t)}</span></button>`).join('')}</div>`;
    $$('.mcard', box).forEach(b => b.onclick = () => {
      const n = +b.dataset.n; if (lock || b.classList.contains('up')) return;
      b.classList.add('up'); b.setAttribute('aria-label', cards[n].t); sfx('flip'); open.push(n);
      if (open.length < 2) return;
      moves++; box.querySelector('[data-mv]').textContent = moves;
      const [a, c] = open; open = [];
      if (cards[a].i === cards[c].i) {
        got++; combo++; box.querySelector('[data-got]').textContent = got; sfx(combo >= 3 ? 'combo' : 'coin');
        [a, c].forEach(x => box.querySelector(`[data-n="${x}"]`).classList.add('done'));
        if (got === 6) { const sec = Math.round((Date.now() - t0) / 1000), stars = moves <= 8 ? 3 : moves <= 11 ? 2 : 1, r = best('mem', moves, true); FUN.confetti(90); sfx('win');
          setTimeout(() => result(box, { pig: 'wow', title: '★'.repeat(stars) + '☆'.repeat(3 - stars), lines: [`${moves} 步、${sec} 秒完成`, r.rec ? '新紀錄！' : `最佳紀錄 ${r.v} 步`], xp: 10 + stars * 5, again, hall }), 500); }
      } else {
        combo = 0; lock = true; sfx('no'); [a, c].forEach(x => box.querySelector(`[data-n="${x}"]`).classList.add('miss'));
        setTimeout(() => { [a, c].forEach(x => { const el = box.querySelector(`[data-n="${x}"]`); el.classList.remove('up', 'miss'); el.setAttribute('aria-label', '蓋著的牌'); }); sfx('pop'); lock = false; }, 900);
      }
    });
  }

  // ---- 打地鼠 ----
  function mole(box, P, again, hall) {
    let score = 0, lives = 3, left = 45, target = null, alive = true, combo = 0, sinceRight = 0;
    const holes = Array.from({ length: 9 });
    box.innerHTML = `<div class="molehud"><span>分數 <b data-sc>0</b></span><span class="hearts">${'<span class="h on">♥</span>'.repeat(3)}</span><span>⏱ <b data-t>45</b> 秒</span></div>
      <div class="moleq">找出：<b data-q></b></div><div class="molegrid">${holes.map((_, i) => `<div class="hole" data-h="${i}"><button type="button" class="mole" tabindex="-1"><span class="msign"></span><span class="mbody"><i class="me1"></i><i class="me2"></i><i class="mnose"></i></span></button></div>`).join('')}</div>`;
    const newTarget = () => { target = pick(P); box.querySelector('[data-q]').textContent = target[1]; sinceRight = 0; };
    const up = new Set();
    const pop = () => {
      if (!alive) return;
      const free = holes.map((_, i) => i).filter(i => !up.has(i)); if (!free.length) return;
      const i = pick(free), h = box.querySelector(`[data-h="${i}"]`), m = h.querySelector('.mole');
      const right = sinceRight >= 2 || Math.random() < .38; sinceRight = right ? 0 : sinceRight + 1;
      const t = right ? target[0] : pick(P.filter(p => p[0] !== target[0]))[0];
      m.querySelector('.msign').textContent = t; m.dataset.right = right ? 1 : ''; m.dataset.t = t; m.classList.remove('hit', 'bad'); h.classList.add('up'); up.add(i);
      const stay = Math.max(1100, 2000 - score * 40);
      m._timer = setTimeout(() => { h.classList.remove('up'); up.delete(i); }, stay);
    };
    $$('.mole', box).forEach(m => m.addEventListener('pointerdown', e => {
      e.preventDefault(); const h = m.parentElement; if (!alive || !h.classList.contains('up') || m.classList.contains('hit')) return;
      clearTimeout(m._timer); const i = +h.dataset.h;
      if (m.dataset.t === target[0]) { score++; combo++; sfx('whack'); setTimeout(() => sfx(combo % 3 === 0 ? 'combo' : 'coin'), 60); m.classList.add('hit'); box.querySelector('[data-sc]').textContent = score; newTarget(); }
      else { combo = 0; lives--; sfx('no'); m.classList.add('bad'); box.querySelector('.hearts').innerHTML = '<span class="h on">♥</span>'.repeat(lives) + '<span class="h">♥</span>'.repeat(3 - lives); if (!lives) end(); }
      setTimeout(() => { h.classList.remove('up'); up.delete(i); }, 260);
    }));
    newTarget();
    let spawn = setInterval(pop, 850); const clock = setInterval(() => { left--; box.querySelector('[data-t]').textContent = left; if (left <= 5 && left > 0) sfx('tick'); if (left <= 0) end(); if (left === 25) { clearInterval(spawn); spawn = setInterval(pop, 650); } }, 1000);
    function end() { if (!alive) return; alive = false; clearInterval(spawn); clearInterval(clock); const r = best('mole', score); sfx(lives ? 'win' : 'lose'); if (r.rec && score) FUN.confetti(80);
      result(box, { pig: score >= 10 ? 'wow' : 'happy', title: `敲中 ${score} 隻！`, lines: [lives ? '時間到！' : '心用完了', r.rec && score ? '新紀錄！' : `最高紀錄 ${r.v || 0} 分`], xp: Math.min(30, score * 2), again, hall }); }
    onStop(() => { alive = false; clearInterval(spawn); clearInterval(clock); });
    sfx('start');
  }

  // ---- 貪吃蛇答題 ----
  function snake(box, key, again, hall) {
    const bank = shuffle(bankFor(key)); let qi = 0;
    const W = 14, H = 14; let snakeA, dir, nextDir, foods, score = 0, lives = 3, running = false, alive = true, timer = 0, q;
    box.innerHTML = `<div class="molehud"><span>答對 <b data-sc>0</b></span><span class="hearts">${'<span class="h on">♥</span>'.repeat(3)}</span><span class="sm-p">方向鍵／滑動</span></div>
      <div class="snq"></div><div class="snwrap"><canvas class="sncv" width="420" height="420" aria-label="貪吃蛇"></canvas><div class="snmsg"></div></div>
      <div class="dpad"><button type="button" data-d="up" aria-label="上">▲</button><button type="button" data-d="left" aria-label="左">◀</button><button type="button" data-d="down" aria-label="下">▼</button><button type="button" data-d="right" aria-label="右">▶</button></div><ol class="snopts" type="A"></ol><p class="sm-p snexp"></p>`;
    const cv = box.querySelector('.sncv'), g = cv.getContext('2d'), msg = box.querySelector('.snmsg');
    const COLS = ['#ff6b6b', '#4dabf7', '#ffd43b', '#b197fc'];
    const D = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    const reset = () => { snakeA = [[6, 7], [5, 7], [4, 7]]; dir = 'right'; nextDir = 'right'; };
    const free = () => { const occ = new Set(snakeA.map(p => p + '').concat((foods || []).map(f => f.p + ''))); let p, tries = 0; do { p = [1 + Math.floor(Math.random() * (W - 2)), 1 + Math.floor(Math.random() * (H - 2))]; tries++; } while ((occ.has(p + '') || Math.abs(p[0] - snakeA[0][0]) + Math.abs(p[1] - snakeA[0][1]) < 4) && tries < 500); return p; };
    const ask = () => {
      if (qi >= bank.length) { qi = 0; }
      q = bank[qi++]; foods = [];
      const order = shuffle(q.o.map((t, j) => [t, j]));
      order.forEach((o, n) => foods.push({ p: free(), n, right: o[1] === q.a }));
      box.querySelector('.snq').innerHTML = `<b>第 ${score + 1} 題</b>　${q.q}`;
      box.querySelector('.snopts').innerHTML = order.map((o, n) => `<li><span class="sndot" style="background:${COLS[n]}">${'ABCD'[n]}</span>${o[0]}</li>`).join('');
      running = false; msg.textContent = '按方向鍵或滑動開始'; msg.hidden = false; draw();
    };
    function draw() {
      const c = cv.width / W; g.clearRect(0, 0, cv.width, cv.height);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { g.fillStyle = (x + y) % 2 ? '#e9f7ef' : '#dff3e7'; g.fillRect(x * c, y * c, c, c); }
      foods.forEach(f => { const [x, y] = f.p; g.fillStyle = COLS[f.n]; g.beginPath(); g.arc(x * c + c / 2, y * c + c / 2, c * .42, 0, 7); g.fill(); g.fillStyle = '#22264a'; g.font = `bold ${c * .55}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('ABCD'[f.n], x * c + c / 2, y * c + c / 2 + 1); });
      snakeA.forEach(([x, y], i) => { g.fillStyle = i ? (i % 2 ? '#37b24d' : '#40c057') : '#2b8a3e'; const r = c * .2; g.beginPath(); g.roundRect ? g.roundRect(x * c + 1, y * c + 1, c - 2, c - 2, r) : g.rect(x * c + 1, y * c + 1, c - 2, c - 2); g.fill(); });
      const [hx, hy] = snakeA[0], [dx, dy] = D[dir]; g.fillStyle = '#fff'; [[-.18, -.18], [.18, -.18]].forEach(([a, b]) => { const ex = hx * c + c / 2 + (dy ? a : dx * .15) * c, ey = hy * c + c / 2 + (dx ? a : dy * .15) * c; g.beginPath(); g.arc(ex, ey, c * .12, 0, 7); g.fill(); g.fillStyle = '#22264a'; g.beginPath(); g.arc(ex + dx * c * .04, ey + dy * c * .04, c * .06, 0, 7); g.fill(); g.fillStyle = '#fff'; });
    }
    const hearts = () => box.querySelector('.hearts').innerHTML = '<span class="h on">♥</span>'.repeat(lives) + '<span class="h">♥</span>'.repeat(3 - lives);
    const loseLife = why => { lives--; hearts(); sfx('no'); if (!lives) return end(); reset(); running = false; msg.textContent = why + '　按方向鍵繼續'; msg.hidden = false; draw(); };
    function tick() {
      if (!running || !alive) return; dir = nextDir; const [dx, dy] = D[dir], h = [snakeA[0][0] + dx, snakeA[0][1] + dy];
      if (h[0] < 0 || h[1] < 0 || h[0] >= W || h[1] >= H) return loseLife('撞牆了！');
      if (snakeA.some(p => p[0] === h[0] && p[1] === h[1])) return loseLife('咬到自己了！');
      snakeA.unshift(h);
      const f = foods.find(f => f.p[0] === h[0] && f.p[1] === h[1]);
      if (f) {
        if (f.right) { score++; box.querySelector('[data-sc]').textContent = score; sfx('eat'); setTimeout(() => sfx(score % 5 ? 'coin' : 'combo'), 80); snakeA.push(snakeA[snakeA.length - 1]); box.querySelector('.snexp').innerHTML = `<b>答對！</b>${q.e || ''}`; if (score % 5 === 0) FUN.confetti(40); ask(); return; }
        foods = foods.filter(x => x !== f); snakeA.pop(); if (snakeA.length > 3) snakeA.pop(); box.querySelector('.snexp').innerHTML = `<b>不是 ${'ABCD'[f.n]} 喔</b>，再找找看。`; loseLife('吃錯了！'); return;
      }
      snakeA.pop(); draw();
    }
    const turn = d => { if (!alive) return; const opp = { up: 'down', down: 'up', left: 'right', right: 'left' }; if (d === opp[dir] && running) return; nextDir = d; if (!running) { if (opp[d] === dir) { snakeA.reverse(); } dir = d; running = true; msg.hidden = true; } };
    const key2 = e => { const m = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right' }[e.key]; if (!m || (e.target.closest && e.target.closest('input, textarea, [contenteditable]'))) return; e.preventDefault(); turn(m); };
    document.addEventListener('keydown', key2);
    let sx = 0, sy = 0; cv.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    cv.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    cv.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return; turn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up')); });
    box.querySelectorAll('[data-d]').forEach(b => b.addEventListener('pointerdown', e => { e.preventDefault(); turn(b.dataset.d); }));
    const speed = () => Math.max(120, 230 - score * 6);
    const loop = () => { tick(); if (alive) timer = setTimeout(loop, speed()); }; timer = setTimeout(loop, speed());
    function end() { alive = false; clearTimeout(timer); const r = best('snake', score); sfx(score ? 'win' : 'lose'); if (r.rec && score) FUN.confetti(80);
      result(box, { pig: score >= 8 ? 'wow' : score ? 'happy' : 'sad', title: `答對 ${score} 題！`, lines: [r.rec && score ? '新紀錄！' : `最佳紀錄 ${r.v || 0} 題`, `正解：${q.o[q.a]}`], xp: Math.min(40, score * 4), again, hall }); }
    onStop(() => { alive = false; clearTimeout(timer); document.removeEventListener('keydown', key2); });
    reset(); ask();
  }

  // ---- 猜單字救豬豬 ----
  function hang(box, words, again, hall) {
    let streak = 0, kd = null, lastWord = '';
    onStop(() => kd && document.removeEventListener('keydown', kd));
    const round = () => {
      if (kd) document.removeEventListener('keydown', kd);
      let w = pick(words); for (let t = 0; t < 8 && words.length > 1 && w[0] === lastWord; t++) w = pick(words); lastWord = w[0];
      const [en, zh] = w, letters = new Set(en.toUpperCase().replace(/[^A-Z]/g, '')); const got = new Set(); let miss = 0, over = false;
      box.innerHTML = `<div class="molehud"><span>連救 <b>${streak}</b> 隻</span><span class="sm-p">錯 6 次氣球就破光了</span></div>
        <div class="hgstage"><div class="balloons">${Array.from({ length: 6 }, (_, i) => `<span class="bl b${i}"></span>`).join('')}</div><div class="hgpig">${PIG('happy', 86)}</div></div>
        <p class="hgzh">提示：<b>${esc2(zh)}</b></p><div class="hgword"></div><div class="hgkeys">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => `<button type="button" data-k="${c}">${c}</button>`).join('')}</div>`;
      const show = () => box.querySelector('.hgword').innerHTML = en.split('').map(ch => /[A-Za-z]/.test(ch) ? `<span class="hgl${got.has(ch.toUpperCase()) || over ? ' on' : ''}${over && !got.has(ch.toUpperCase()) ? ' miss' : ''}">${got.has(ch.toUpperCase()) || over ? ch : ''}</span>` : ch === ' ' ? '<span class="hgsp"></span>' : `<span class="hgx">${esc2(ch)}</span>`).join('');
      show();
      const guess = c => {
        if (over || got.has(c) || box.querySelector(`[data-k="${c}"]`).disabled) return; const b = box.querySelector(`[data-k="${c}"]`); b.disabled = true;
        if (letters.has(c)) { got.add(c); b.classList.add('ok'); sfx('ok'); show(); if ([...letters].every(x => got.has(x))) win(); }
        else { miss++; b.classList.add('no'); sfx('pop'); const bl = box.querySelector(`.b${6 - miss}`); if (bl) bl.classList.add('popped'); if (miss >= 6) lose(); }
      };
      const win = () => { over = true; streak++; const r = best('hang', streak); show(); sfx('win'); FUN.confetti(60); box.querySelector('.hgstage').classList.add('saved');
        result(box, { pig: 'wow', title: '豬豬得救了！', lines: [`<b>${esc2(en)}</b>＝${esc2(zh)}`, `連救 ${streak} 隻${r.rec ? '（新紀錄！）' : ''}`], xp: 8, again: round, hall }); box.querySelector('[data-again]').textContent = '下一個單字'; };
      const lose = () => { over = true; show(); sfx('lose'); box.querySelector('.hgstage').classList.add('fell'); box.querySelector('.hgpig').innerHTML = PIG('sad', 86); const s = streak; streak = 0;
        result(box, { pig: 'sad', title: '氣球破光了⋯', lines: [`答案是 <b>${esc2(en)}</b>（${esc2(zh)}）`, s ? `這輪連救了 ${s} 隻` : ''], again: round, hall }); };
      box.querySelectorAll('[data-k]').forEach(b => b.onclick = () => guess(b.dataset.k));
      kd = e => { if (e.metaKey || e.ctrlKey || (e.target.closest && e.target.closest('input, textarea, [contenteditable]'))) return; const c = (e.key || '').toUpperCase(); if (/^[A-Z]$/.test(c)) guess(c); };
      document.addEventListener('keydown', kd);
    };
    round();
  }

  // ---- 配對連連看（原本的遊戲，加上音效） ----
  function matchGame(box, key, again, hall) {
    const pairs = shuffle(DATA[key].match).slice(0, 6); const L = shuffle(pairs.map((p, i) => [p[0], i])), R = shuffle(pairs.map((p, i) => [p[1], i]));
    let sel = null, left = pairs.length, miss = 0; const t0 = Date.now();
    box.innerHTML = `<p class="arcinfo"><b>配對連連看</b>　先點左邊，再點右邊</p><div class="mgame"><div class="mcol">${L.map(x => `<button class="mt l" data-i="${x[1]}" type="button">${x[0]}</button>`).join('')}</div><div class="mcol">${R.map(x => `<button class="mt r" data-i="${x[1]}" type="button">${x[0]}</button>`).join('')}</div></div><p class="sm-p" data-st>還剩 ${left} 組</p>`;
    $$('.mt', box).forEach(b => b.onclick = () => {
      if (b.classList.contains('l')) { $$('.mt.l', box).forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sel = b; sfx('flip'); return; }
      if (!sel) { b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); return; }
      if (sel.dataset.i === b.dataset.i) { sel.classList.add('gone'); b.classList.add('gone'); sel.disabled = b.disabled = true; sel = null; left--; sfx('coin');
        if (!left) { const sec = ((Date.now() - t0) / 1000).toFixed(1); const bst = Math.min(ST.best['m' + key] || 999, +sec); const rec = bst === +sec; ST.best['m' + key] = bst; save(); FUN.badge('match'); FUN.confetti(90); sfx('win');
          result(box, { pig: 'wow', title: `${sec} 秒完成！`, lines: [`答錯 ${miss} 次`, rec ? '新紀錄！' : `最佳紀錄 ${bst} 秒`], xp: 20, again, hall }); }
        else box.querySelector('[data-st]').textContent = `還剩 ${left} 組`; }
      else { miss++; sfx('no'); b.classList.add('shake'); sel.classList.add('shake'); const s = sel; setTimeout(() => { b.classList.remove('shake'); s.classList.remove('shake'); }, 400); }
    });
  }

  // ---- 分類（原本的遊戲，加上音效） ----
  function sortGame(box, g, again, hall) {
    const items = shuffle(g.items); let i = 0, ok = 0; const res = [];
    const draw = () => {
      if (i >= items.length) { const perfect = ok === items.length; if (perfect) { FUN.badge('sortp'); FUN.confetti(90); } sfx(perfect ? 'win' : 'up');
        box.innerHTML = `<div class="sortres">${g.b.map((bn, bi) => `<div class="bucket"><b>${bn}</b>${items.filter(x => x[1] === bi).map(x => `<span class="${res.find(r => r[0] === x[0])[1] ? '' : 'miss'}">${x[0]}</span>`).join('')}</div>`).join('')}</div>`;
        result(box, { pig: perfect ? 'wow' : 'happy', title: `${ok} / ${items.length}`, lines: [perfect ? '全對！' : '紅字是分錯的'], xp: perfect ? 20 : 8, again, hall }); return; }
      const it = items[i];
      box.innerHTML = `<div class="sgame"><p class="sm-p">${g.t}　(${i + 1}/${items.length})</p><div class="scard">${it[0]}</div><div class="buckets">${g.b.map((bn, bi) => `<button class="bk" data-b="${bi}" type="button">${bn}</button>`).join('')}</div><p class="sfb" aria-live="polite"></p></div>`;
      $$('.bk', box).forEach(b => b.onclick = () => { const good = +b.dataset.b === it[1]; res.push([it[0], good]); if (good) { ok++; sfx('coin'); b.classList.add('right'); } else { sfx('no'); b.classList.add('wrongc'); $$('.bk', box)[it[1]].classList.add('right'); }
        $$('.bk', box).forEach(x => x.disabled = true); box.querySelector('.sfb').textContent = good ? pick(CHEERS) : `正確答案：${g.b[it[1]]}`; setTimeout(() => { i++; draw(); }, good ? 500 : 1300); });
    };
    draw();
  }

  return { render, stop, music, pairsFor };
})();
