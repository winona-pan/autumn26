// ===== Fun layer: mascot, XP, badges, confetti, sound =====
const PIG = (mood = 'happy', size = 86) => {
  const mouth = mood === 'sad' ? 'M40,63 Q47,57 54,63' : mood === 'wow' ? 'M44,60 a3,4 0 1,0 6,0 a3,4 0 1,0 -6,0' : 'M39,58 Q47,67 55,58';
  const eye = mood === 'wow' ? '<circle cx="36" cy="40" r="4.5" class="pk-e"/><circle cx="58" cy="40" r="4.5" class="pk-e"/>' : '<circle cx="36" cy="41" r="3.5" class="pk-e"/><circle cx="58" cy="41" r="3.5" class="pk-e"/><circle cx="37.3" cy="39.6" r="1.2" class="pk-w"/><circle cx="59.3" cy="39.6" r="1.2" class="pk-w"/>';
  return `<svg class="pig" width="${size}" height="${size}" viewBox="0 0 94 94" aria-hidden="true"><path d="M20,24 L26,6 L38,20 Z" class="pk-b"/><path d="M74,24 L68,6 L56,20 Z" class="pk-b"/><ellipse cx="47" cy="50" rx="36" ry="32" class="pk-b"/><rect x="38" y="16" width="18" height="4" rx="2" class="pk-d"/><ellipse cx="26" cy="54" rx="5" ry="3.5" class="pk-c"/><ellipse cx="68" cy="54" rx="5" ry="3.5" class="pk-c"/>${eye}<ellipse cx="47" cy="51" rx="11" ry="8" class="pk-s"/><circle cx="43" cy="51" r="2" class="pk-d"/><circle cx="51" cy="51" r="2" class="pk-d"/><path d="${mouth}" class="pk-m"/><rect x="24" y="76" width="10" height="12" rx="4" class="pk-b"/><rect x="60" y="76" width="10" height="12" rx="4" class="pk-b"/><circle cx="80" cy="70" r="9" class="pk-coin"/><text x="80" y="74" text-anchor="middle" class="pk-ct">$</text></svg>`;
};
const MONSTER = (hpPct, hurt) => `<svg class="mon${hurt ? ' hurt' : ''}" viewBox="0 0 120 110" aria-hidden="true"><path d="M20,95 C5,60 15,15 60,12 C105,15 115,60 100,95 C90,88 80,100 70,92 C62,100 55,90 48,97 C40,89 30,100 20,95 Z" class="mn-b"/><circle cx="44" cy="48" r="11" class="mn-w"/><circle cx="78" cy="48" r="11" class="mn-w"/><circle cx="${hurt ? 41 : 46}" cy="50" r="5" class="mn-e"/><circle cx="${hurt ? 75 : 80}" cy="50" r="5" class="mn-e"/><path d="${hpPct > 0.4 ? 'M42,74 L50,68 L58,74 L66,68 L74,74 L80,68' : 'M44,76 Q61,64 78,76'}" class="mn-m"/><path d="M30,20 L22,4 L40,16 Z M90,20 L98,4 L80,16 Z" class="mn-b"/></svg>`;
const BOSSES = { deriv: ['保證金怪', 'Margin Monster'], invest: ['泡沫怪', 'Bubble Beast'], law: ['條文龍', 'Article Dragon'], mgmt: ['偏誤魔王', 'Bias Boss'] };
const TITLES = ['豬寶寶', '小存錢筒', '零用錢管家', '理財小鬼', '期貨學徒', '避險高手', '華爾街實習生', '分析師', 'CFA 候選人', '投資大師'];
const CHEERS = ['好厲害！', '答對了！豬豬為你驕傲', 'Nice! 繼續保持', '你就是未來的 CFA！', '完美 ✓', '這題很難耶，你做到了', 'Correct! 💰'.replace(' 💰', '')];
const COMFORT = ['沒關係，錯了才記得住！', '豬豬也常錯，看一下解釋就懂了', 'Almost! 再看一次說明', '加入錯題本了，下次一定會'];
const BADGES = [
  ['first', '第一步', '勾選第一張「我懂了」'], ['c25', '小書蟲', '掌握 25 個知識點'], ['c75', '大書蟲', '掌握 75 個知識點'], ['allderiv', '衍金通關', '衍金知識點全部掌握'], ['allinvest', '投資通關', '投資學知識點全部掌握'], ['alllaw', '民商通關', '民商法知識點全部掌握'], ['allmgmt', '管理通關', '管理學知識點全部掌握'],
  ['combo5', '五連勝', '選擇題連續答對 5 題'], ['combo10', '十連勝', '連續答對 10 題'], ['bossderiv', '打倒保證金怪', '衍金打怪勝利'], ['bossinvest', '戳破泡沫', '投資學打怪勝利'], ['bosslaw', '屠龍者', '民商法打怪勝利'], ['bossmgmt', '擊敗偏誤魔王', '管理學打怪勝利'],
  ['speed', '閃電手', '限時賽答對 12 題以上'], ['match', '配對王', '完成一次配對遊戲'], ['sortp', '分類達人', '分類遊戲全對'], ['calc5', '公式小玩家', '玩過 5 個公式計算器'], ['gen10', '計算機器', '變化題答對 10 題'], ['essay', '交卷了', '送出第一份申論批改'], ['s3', '三天不間斷', '連續 3 天打開複習'], ['s7', '一週全勤', '連續 7 天打開複習']
];

const FUN = {
  init() {
    ST.xp = ST.xp || 0; ST.badges = ST.badges || {}; ST.days = ST.days || []; ST.calc = ST.calc || {}; ST.genOk = ST.genOk || 0; ST.sound = ST.sound ?? false; ST.lang = ST.lang || 'both';
    const today = new Date().toISOString().slice(0, 10); if (!ST.days.includes(today)) { ST.days.push(today); ST.days = ST.days.slice(-60); }
    const st = this.streak(); if (st >= 3) this.badge('s3', true); if (st >= 7) this.badge('s7', true);
    save();
  },
  streak() { let n = 0; const d = new Date(); for (; ; ) { const k = d.toISOString().slice(0, 10); if (ST.days.includes(k)) { n++; d.setDate(d.getDate() - 1); } else break; } return n; },
  level() { return Math.floor(ST.xp / 100) + 1; },
  xp(n, el) {
    const lv0 = this.level(); ST.xp += n; save(); this.hud();
    if (el) { const r = el.getBoundingClientRect(); const f = document.createElement('div'); f.className = 'xpfloat'; f.textContent = '+' + n + ' XP'; f.style.left = (r.left + r.width / 2) + 'px'; f.style.top = (r.top + window.scrollY) + 'px'; document.body.appendChild(f); setTimeout(() => f.remove(), 1100); }
    if (this.level() > lv0) { this.toast(`升級！Lv.${this.level()}「${TITLES[Math.min(this.level() - 1, TITLES.length - 1)]}」`, 'wow'); this.confetti(80); this.beep('up'); }
  },
  badge(id, silent) { if (ST.badges[id]) return; ST.badges[id] = Date.now(); save(); const b = BADGES.find(x => x[0] === id); if (b && !silent) { this.toast(`獲得徽章「${b[1]}」— ${b[2]}`, 'wow'); this.confetti(60); this.beep('up'); } },
  hud() {
    const h = $('#hud'); if (!h) return; const lv = this.level(); const p = ST.xp % 100;
    h.innerHTML = `<span class="lv">Lv.${lv}</span><span class="ttl">${TITLES[Math.min(lv - 1, TITLES.length - 1)]}</span><span class="xpbar" title="${ST.xp} XP"><i style="width:${p}%"></i></span><span class="streak" title="連續天數">${this.flame()}${this.streak()}</span><button class="snd" id="sndbtn" type="button" aria-pressed="${ST.sound}" title="音效">${ST.sound ? '音效開' : '音效關'}</button><span class="lang" role="group" aria-label="題目語言">${[['zh', '中'], ['both', '雙語'], ['en', 'EN']].map(l => `<button type="button" data-lang="${l[0]}" aria-pressed="${ST.lang === l[0]}">${l[1]}</button>`).join('')}</span>`;
    $('#sndbtn').onclick = () => { ST.sound = !ST.sound; save(); this.hud(); this.beep('ok'); };
    $$('[data-lang]', h).forEach(b => b.onclick = () => { ST.lang = b.dataset.lang; save(); this.hud(); if (window.rerender) rerender(); });
  },
  flame() { return '<svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true"><path d="M7,0 C9,4 13,6 13,10 A6,6 0 0,1 1,10 C1,7 3,6 4,3 C5,5 6,5 7,0 Z" class="flm"/></svg>'; },
  toast(msg, mood = 'happy') {
    let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = PIG(mood, 54) + `<span>${msg}</span>`; t.className = 'show'; clearTimeout(this._tt); this._tt = setTimeout(() => t.className = '', 2600);
  },
  confetti(n = 40) {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let c = $('#confetti'); if (!c) { c = document.createElement('canvas'); c.id = 'confetti'; document.body.appendChild(c); }
    const W = c.width = innerWidth, H = c.height = innerHeight, x = c.getContext('2d');
    const cols = ['#ff7eb6', '#ffd43b', '#4dabf7', '#69db7c', '#b197fc', '#ffa94d'];
    const ps = Array.from({ length: n }, () => ({ x: W / 2 + (Math.random() - .5) * 200, y: H * .35, vx: (Math.random() - .5) * 12, vy: -Math.random() * 12 - 4, r: Math.random() * 6 + 4, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6 }));
    let f = 0; const step = () => { x.clearRect(0, 0, W, H); ps.forEach(p => { p.vy += .35; p.x += p.vx; p.y += p.vy; p.a += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); x.restore(); }); if (++f < 90) requestAnimationFrame(step); else x.clearRect(0, 0, W, H); }; step();
  },
  beep(kind) {
    if (!ST.sound) return; try {
      this.ac = this.ac || new (window.AudioContext || window.webkitAudioContext)(); const a = this.ac;
      const seq = kind === 'ok' ? [660, 880] : kind === 'no' ? [300, 220] : kind === 'hit' ? [520, 780, 1040] : [523, 659, 784, 1046];
      seq.forEach((f, i) => { const o = a.createOscillator(), g = a.createGain(); o.type = kind === 'no' ? 'triangle' : 'sine'; o.frequency.value = f; g.gain.setValueAtTime(.0001, a.currentTime + i * .09); g.gain.exponentialRampToValueAtTime(.15, a.currentTime + i * .09 + .02); g.gain.exponentialRampToValueAtTime(.0001, a.currentTime + i * .09 + .16); o.connect(g).connect(a.destination); o.start(a.currentTime + i * .09); o.stop(a.currentTime + i * .09 + .18); });
    } catch (e) { }
  },
  checkCards() {
    const n = Object.keys(ST.done).length; if (n >= 1) this.badge('first'); if (n >= 25) this.badge('c25'); if (n >= 75) this.badge('c75');
    ORDER.forEach(k => { const all = subjCards(DATA[k]); if (all.every(c => ST.done[c.id])) this.badge('all' + k); });
  },
  say(el, msg, mood) { el.innerHTML = `<div class="mascot">${PIG(mood || 'happy', 64)}<p class="bubble">${msg}</p></div>`; }
};
const LG = (zh, en) => ST.lang === 'en' ? (en || zh) : ST.lang === 'zh' ? zh : (en ? `${en}<span class="zhsub">${zh}</span>` : zh);
