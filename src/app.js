// ===== App =====
const ORDER = ['basic', 'deriv', 'invest', 'law', 'mgmt'];
const store = {
  k: 'rv26autumn',
  get() { try { return JSON.parse(localStorage.getItem(this.k)) || {}; } catch (e) { return {}; } },
  set(v) { try { localStorage.setItem(this.k, JSON.stringify(v)); } catch (e) { } }
};
let ST = Object.assign({ done: {}, wrong2: {}, subj: 'home', tab: {}, best: {} }, store.get());
const save = () => store.set(ST);
const strip = h => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&lt;|&gt;|&amp;/g, ' ').replace(/\s+/g, ' ').trim();
function subjCards(s) { return s.sections.reduce((a, x) => a.concat(x.cards), []); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }
const speak = t => { try { const u = new SpeechSynthesisUtterance(strip(t)); u.lang = 'en-US'; u.rate = .92; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) { } };

const LAWART = [
  ['§1', '民事：法律 → 習慣 → 法理'], ['§2', '習慣不背於公序良俗'], ['§12', '滿 18 歲為成年'], ['§13', '未滿 7 歲無行為能力；7 歲以上未成年人限制行為能力'], ['§15', '受監護宣告之人無行為能力'], ['§15-2', '受輔助宣告：重要行為需輔助人同意'], ['§16', '權利能力、行為能力不得拋棄'], ['§17', '自由不得拋棄；限制不得背公序良俗'],
  ['§68', '從物；主物之處分及於從物'], ['§71–74', '標的合法妥當'], ['§75–85', '行為能力'], ['§86–98', '意思表示'], ['§95', '非對話意思表示：到達時生效'], ['§124 II', '推定 7/1 出生；知月不知日推定 15 日'],
  ['§148', '權利行使不得違反公益、不得以損害他人為主要目的'], ['§149', '正當防衛'], ['§150', '緊急避難'], ['§151–152', '自助行為'],
  ['§153', '意思一致契約成立；必要之點一致推定成立'], ['§154', '要約拘束力；標價陳列視為要約、價目表寄送不視為要約'], ['§155', '要約經拒絕失其拘束力'], ['§156', '對話要約非立時承諾失效'], ['§157', '非對話要約，可期待期間內未承諾失效'], ['§158', '定有承諾期限，逾期失效'], ['§159', '承諾通知遲到 → 應即發遲到通知，怠於通知視為未遲到'], ['§160', '遲到之承諾視為新要約；變更承諾視為拒絕原要約而為新要約'], ['§161', '意思實現'], ['§162', '撤回要約通知遲到'], ['§163', '承諾之撤回準用 §162'],
  ['§172', '無因管理定義'], ['§173', '通知義務；準用 §540–542'], ['§174', '違反本人意思 → 無過失亦應賠償；II 例外'], ['§175', '急迫危險：除惡意重大過失外不負責'], ['§176', '適法無因管理：費用＋利息、清償債務、賠償損害'], ['§177', '不適法管理：以所得利益為限；II 不法管理準用'], ['§178', '本人承認 → 溯及適用委任'],
  ['§179', '不當得利'], ['§180 ④', '不法原因給付不得請求返還'], ['§184 I 前', '故意過失侵害權利'], ['§184 I 後', '故意以背於善良風俗方法加損害'], ['§184 II', '違反保護他人之法律，推定過失'], ['§187', '無/限制行為能力人侵權與法定代理人責任'], ['§190', '動物占有人（推定過失）'], ['§191', '工作物所有人（推定過失）'], ['§191-1', '商品製造人（推定過失、因果）'], ['§191-2', '動力車輛駕駛人（推定過失）'], ['§191-3', '一般危險責任（推定過失、因果）'],
  ['§199', '債權人得請求給付；給付不限財產價格；不作為亦得為給付'], ['§207', '禁止複利（商業習慣例外）'], ['§217', '與有過失'], ['§221', '無/限制行為能力債務人責任依 §187'], ['§227 II', '加害給付'], ['§227-1', '債務不履行侵害人格權'], ['§245-1', '締約過失，2 年時效'], ['§1064', '生父母結婚 → 視為婚生子女'], ['消保 §20', '未經要約寄送商品：不負保管義務；逾 1 個月視為拋棄'], ['法組 §57-1', '無全文判例停止適用（2018/12/7）']
];

const TIPS = {
  learn: ['每張卡先看「白話」和「生活比喻」，懂了再打開完整重點。勾「我懂了」+10 XP！', '看不懂的英文專有名詞，用上面的搜尋框找找看。'],
  formula: ['點公式裡<b>有顏色的符號</b>，我會告訴你它是什麼意思！再拉拉看下面的計算機。', '公式不用死背：先懂「它在回答什麼問題」，再記長相。'],
  prob: ['先自己算，卡住再按「下一步提示」。小考會從這裡出題或類題喔！'],
  gen: ['每題數字都不一樣，答對 +15 XP。可以用上面切換成英文題目，練英文考試。'],
  game: ['配對：先點左邊、再點右邊。分類：看到卡片就按它屬於哪一組。越快越好！'],
  boss: ['打怪模式：答對就打怪物一下，答錯會掉一顆心。3 顆心用完就輸了，加油！'],
  flash: ['先大聲說出你的答案，再點卡片翻面。講義上的每個問題都在這裡。'],
  essay: ['寫完拍照上傳，我會用老師的眼光幫你改。考試是英文，記得用英文寫！']
};
const tip = k => pick(TIPS[k] || TIPS.learn);

// ---------- Knowledge cards ----------
function cardHTML(c) {
  const done = !!ST.done[c.id];
  let fig = '';
  if (c.fig) fig = c.fig.startsWith('w:') ? `<div class="wmount" data-w="${c.fig.slice(2)}"></div>` : (FIGS[c.fig] ? `<figure>${FIGS[c.fig]()}</figure>` : '');
  return `<article class="card${done ? ' done' : ''}" id="c-${c.id}" data-search="${esc((c.t + ' ' + (c.en || '') + ' ' + c.plain + ' ' + c.life + ' ' + strip(c.body || '') + ' ' + (c.ex || '')).toLowerCase())}">
    <header><h4>${c.t}</h4>${c.en ? `<span class="en">${c.en}</span>` : ''}${c.cfa ? `<span class="cfa" title="CFA 相關">${/^CFA/.test(c.cfa) ? c.cfa : "CFA · " + c.cfa}</span>` : ''}</header>
    <div class="duo"><div class="plain"><span class="lbl">白話</span><p>${c.plain}</p></div><div class="life"><span class="lbl">生活比喻</span><p>${c.life}</p></div></div>
    ${c.pre ? `<div class="pre"><span class="lbl">看不懂？需要先懂這些基礎</span>${c.pre.map(p => { const b = subjCards(DATA.basic).find(x => x.id === p); return b ? `<button type="button" class="prechip" data-pre="${p}">${b.t}</button>` : ''; }).join('')}</div>` : ''}
    ${fig}
    ${c.ex ? `<div class="exam"><span class="lbl">Exam English 考試這樣寫</span><p>${c.ex}</p><button class="mini" type="button" data-say="${esc(c.ex)}">朗讀</button></div>` : ''}
    <details${done ? '' : ' open'}><summary>完整重點</summary><div class="body">${c.body || ''}</div>
    ${c.terms ? `<dl class="terms">${c.terms.map(t => `<dt>${t[0]}</dt><dd>${t[1]}</dd>`).join('')}</dl>` : ''}</details>
    <label class="chk"><input type="checkbox" data-done="${c.id}"${done ? ' checked' : ''}> 我懂了，可以講給別人聽 <span class="xpchip">+10 XP</span></label>
  </article>`;
}
function renderLearn(key, root) {
  const s = DATA[key];
  root.innerHTML = `<div class="tipbox"></div><div class="learn"><nav class="toc" aria-label="章節">${s.sections.map(x => `<a href="#sec-${x.id}">${x.t}<span class="cnt" data-sec="${x.id}"></span></a>`).join('')}${key === 'law' ? '<a href="#sec-art">條文速記表</a>' : ''}</nav>
    <div class="cards"><div class="searchbar"><input type="search" id="q-${key}" placeholder="搜尋名詞或關鍵字（例：basis、要約、BCG）" aria-label="搜尋"></div>
    ${s.sections.map(x => `<section class="sec" id="sec-${x.id}"><h3>${x.t}</h3>${x.cards.map(cardHTML).join('')}</section>`).join('')}
    ${key === 'law' ? `<section class="sec" id="sec-art"><h3>條文速記表</h3><p class="sm-p">選擇題常考「第幾條」。按「遮住內容」後，點每一列偷看答案。</p><button class="btn ghost" id="arthide" type="button">遮住內容</button><div class="tblwrap"><table class="tbl arts">${LAWART.map(a => `<tr><td><b>${a[0]}</b></td><td class="artc">${a[1]}</td></tr>`).join('')}</table></div></section>` : ''}
    </div></div>`;
  FUN.say($('.tipbox', root), tip('learn'));
  $$('.wmount', root).forEach(m => WIDGETS[m.dataset.w] && WIDGETS[m.dataset.w](m));
  $$('[data-say]', root).forEach(b => b.onclick = () => speak(b.dataset.say));
  $$('[data-pre]', root).forEach(b => b.onclick = () => jumpCard('basic', b.dataset.pre));
  $$('[data-done]', root).forEach(cb => cb.addEventListener('change', () => {
    const id = cb.dataset.done;
    if (cb.checked) { if (!ST.done[id]) { ST.done[id] = true; FUN.xp(10, cb); FUN.beep('ok'); } } else if (ST.done[id]) { delete ST.done[id]; FUN.xp(-10, cb); }
    save(); cb.closest('.card').classList.toggle('done', cb.checked); updateCounts(); FUN.checkCards();
  }));
  const q = $('#q-' + key, root);
  q.addEventListener('input', () => { const v = q.value.trim().toLowerCase(); $$('.card', root).forEach(c => c.hidden = v && !c.dataset.search.includes(v)); $$('.sec', root).forEach(sec => sec.hidden = v && !$$('.card', sec).some(c => !c.hidden)); });
  const ah = $('#arthide', root); if (ah) ah.addEventListener('click', () => { const t = root.querySelector('.arts'); t.classList.toggle('masked'); ah.textContent = t.classList.contains('masked') ? '顯示內容' : '遮住內容'; });
  $$('.arts tr', root).forEach(tr => tr.addEventListener('click', () => tr.classList.toggle('peek')));
  updateCounts();
}
function updateCounts() {
  ORDER.forEach(k => {
    const s = DATA[k]; const all = subjCards(s); const d = all.filter(c => ST.done[c.id]).length;
    $$(`[data-prog="${k}"]`).forEach(e => { e.style.setProperty('--p', (d / all.length * 100).toFixed(1) + '%'); e.title = `${d}/${all.length}`; });
    $$(`[data-progt="${k}"]`).forEach(e => e.textContent = `${d}/${all.length}`);
    s.sections.forEach(x => $$(`[data-sec="${x.id}"]`).forEach(e => e.textContent = `${x.cards.filter(c => ST.done[c.id]).length}/${x.cards.length}`));
  });
}

// ---------- Formula classroom ----------
function renderFormulas(key, root) {
  const F = DATA[key].formulas;
  root.innerHTML = `<div class="tipbox"></div><div class="fnav">${F.map(f => `<a href="#f-${f.id}" class="fchip">${f.t.replace(/<[^>]+>/g, '')}</a>`).join('')}</div><div class="flist">${F.map(f => `
    <article class="fcardx" id="f-${f.id}"><header><h4>${f.t}</h4><span class="en">${f.en}</span>${f.cfa ? `<span class="cfa">${/^CFA/.test(f.cfa) ? f.cfa : "CFA · " + f.cfa}</span>` : ''}</header>
    <p class="fqq"><span class="lbl">這個公式在回答</span>${f.q}</p>
    <div class="ftex">${f.tex.replace(/<v s="(\w+)">/g, '<button type="button" class="sym" data-k="$1">').replace(/<\/v>/g, '</button>')}</div>
    <div class="sympop" hidden></div>
    <div class="symtable"><span class="lbl">符號小字典（點上面的符號也可以）</span><dl>${Object.entries(f.syms).map(([k, v]) => `<dt><button type="button" class="sym" data-k="${k}">${(f.tex.match(new RegExp('<v s="' + k + '">(.*?)</v>')) || [, k])[1]}</button></dt><dd><b>${v[0]}</b> <i>${v[1]}</i>${v[2] ? '<br>' + v[2] : ''}</dd>`).join('')}</dl></div>
    <div class="why"><span class="lbl">為什麼長這樣？（故事版）</span><p>${f.why}</p></div>
    <div class="stepsbox"><span class="lbl">一步一步算</span><ol>${f.steps.map(s => `<li>${s}</li>`).join('')}</ol></div>
    <div class="calc"><span class="lbl">動手玩：拉拉看數字怎麼變</span><div class="cvars">${f.vars.map(v => `<label><span>${v.s}</span><input type="range" min="${v.min}" max="${v.max}" step="${v.step}" value="${v.v}" data-k="${v.k}"><input type="number" step="${v.step}" value="${v.v}" data-n="${v.k}" aria-label="${strip(v.s)}"></label>`).join('')}</div><p class="cout"></p></div>
    <div class="oops"><span class="lbl">常見錯誤</span><ul>${f.oops.map(o => `<li>${o}</li>`).join('')}</ul></div>
    <div class="exam"><span class="lbl">Exam English 考試這樣寫</span><p>${f.exam}</p><button class="mini" type="button" data-say="${esc(f.exam)}">朗讀</button></div>
    </article>`).join('')}</div>`;
  FUN.say($('.tipbox', root), tip('formula'));
  $$('[data-say]', root).forEach(b => b.onclick = () => speak(b.dataset.say));
  F.forEach(f => {
    const el = $('#f-' + f.id, root); const pop = $('.sympop', el);
    $$('.sym', el).forEach(b => b.onclick = () => { const v = f.syms[b.dataset.k]; $$('.sym', el).forEach(x => x.classList.toggle('on', x.dataset.k === b.dataset.k)); pop.hidden = false; pop.innerHTML = `${PIG('wow', 40)}<div><b>${b.innerHTML}</b> = ${v[0]}<br><i>${v[1]}</i>${v[2] ? '<br>' + v[2] : ''}</div>`; FUN.beep('ok'); });
    const run = () => { const v = {}; f.vars.forEach(x => v[x.k] = +$(`[data-n="${x.k}"]`, el).value); try { $('.cout', el).innerHTML = f.calc(v); } catch (e) { $('.cout', el).textContent = '—'; } };
    $$('input[type=range]', el).forEach(r => r.addEventListener('input', () => { $(`[data-n="${r.dataset.k}"]`, el).value = r.value; run(); touch(); }));
    $$('input[type=number]', el).forEach(n => n.addEventListener('input', () => { const r = $(`input[type=range][data-k="${n.dataset.n}"]`, el); r.value = n.value; run(); touch(); }));
    const touch = () => { if (!ST.calc[f.id]) { ST.calc[f.id] = 1; save(); FUN.xp(3); if (Object.keys(ST.calc).length >= 5) FUN.badge('calc5'); } };
    run();
  });
}

// ---------- MCQ: boss / speed / practice / wrong ----------
function bankFor(key) {
  const b = [];
  if (key === 'deriv') { if (ST.lang !== 'en') DATA.deriv.mcq.forEach((m, i) => b.push(Object.assign({ id: 'z' + i }, m))); if (ST.lang !== 'zh') DATA.deriv.mcqEn.forEach((m, i) => b.push(Object.assign({ id: 'e' + i }, m))); }
  else DATA[key].mcq.forEach((m, i) => b.push(Object.assign({ id: 'z' + i }, m)));
  return b;
}
function renderMCQ(key, root) {
  const bank = bankFor(key); const wrong = () => new Set(ST.wrong2[key] || []);
  root.innerHTML = `<div class="tipbox"></div><div class="modes">
    <button class="mode boss" data-m="boss" type="button"><b>打怪模式</b><span>10 題 · 3 顆心</span></button>
    <button class="mode speed" data-m="speed" type="button"><b>60 秒限時賽</b><span>能答幾題就幾題</span></button>
    <button class="mode prac" data-m="prac" type="button"><b>慢慢練習</b><span>每題都有解釋</span></button>
    <button class="mode wrong" data-m="wrong" type="button"><b>錯題本</b><span class="wc"></span></button></div>
    <p class="sm-p">題庫 ${bank.length} 題${key === 'deriv' ? '（右上角可切換中文、英文或雙語題目）' : ''}</p><div class="arena"></div>`;
  FUN.say($('.tipbox', root), tip('boss'));
  const wc = () => $('.wc', root).textContent = `${wrong().size} 題待複習`; wc();
  const arena = $('.arena', root);
  const mark = (m, ok) => { const w = wrong(); ok ? w.delete(m.id) : w.add(m.id); ST.wrong2[key] = [...w]; save(); wc(); };
  let combo = 0;
  const qhtml = (m, meta) => { const ord = shuffle(m.o.map((t, j) => [t, j])); return `<div class="qmeta">${meta}</div><p class="qtext">${m.q}</p><div class="opts">${ord.map((o, n) => `<button class="opt" data-j="${o[1]}" type="button"><span class="key">${'ABCD'[n]}</span>${o[0]}</button>`).join('')}</div>`; };
  const answer = (m, b, then) => {
    const ok = +b.dataset.j === m.a; $$('.opt', arena).forEach(x => { x.disabled = true; if (+x.dataset.j === m.a) x.classList.add('right'); }); if (!ok) b.classList.add('wrongc');
    mark(m, ok); if (ok) { combo++; FUN.beep('ok'); FUN.xp(5 + Math.min(combo, 10), b); if (combo === 5) FUN.badge('combo5'); if (combo === 10) FUN.badge('combo10'); if (combo % 3 === 0) FUN.confetti(25); } else { combo = 0; FUN.beep('no'); }
    then(ok);
  };
  const start = mode => {
    combo = 0;
    if (mode === 'boss') {
      const list = shuffle(bank).slice(0, 10); let i = 0, hp = list.length, hearts = 3; const [bn, be] = BOSSES[key];
      const draw = (hurt) => {
        if (hp <= 0) { arena.innerHTML = `<div class="win">${PIG('wow', 110)}<h3>你打倒了${bn}！</h3><p>+50 XP</p><button class="btn big" id="again" type="button">再打一隻</button></div>`; FUN.xp(50); FUN.badge('boss' + key); FUN.confetti(140); FUN.beep('up'); $('#again', root).onclick = () => start('boss'); return; }
        if (hearts <= 0 || i >= list.length) { arena.innerHTML = `<div class="win">${PIG('sad', 110)}<h3>${bn}還剩 ${hp} 滴血⋯</h3><p>錯的題目已放進錯題本，練一練再來挑戰！</p><button class="btn big" id="again" type="button">再挑戰</button></div>`; $('#again', root).onclick = () => start('boss'); return; }
        const m = list[i];
        arena.innerHTML = `<div class="battle"><div class="bossbox">${MONSTER(hp / list.length, hurt)}<div><b>${bn}</b> <span class="en">${be}</span><div class="hp"><i style="width:${hp / list.length * 100}%"></i></div><div class="hearts">${'<span class="h on">♥</span>'.repeat(hearts)}${'<span class="h">♥</span>'.repeat(3 - hearts)}</div></div></div><div class="qcard">${qhtml(m, `第 ${i + 1} 題 · combo ${combo}`)}<div class="exp" hidden></div><button class="btn next" type="button" hidden>繼續攻擊</button></div></div>`;
        $$('.opt', arena).forEach(b => b.onclick = () => answer(m, b, ok => { if (ok) { hp--; FUN.beep('hit'); $('.mon', arena).classList.add('hurt'); } else hearts--; const e = $('.exp', arena); e.hidden = false; e.innerHTML = `<b>${ok ? FUN_CHEER() : FUN_COMFORT()}</b> ${m.e || ''}`; const n = $('.next', arena); n.hidden = false; n.focus(); n.onclick = () => { i++; draw(false); }; }));
      };
      draw(false);
    } else if (mode === 'speed') {
      const list = shuffle(bank); let i = 0, score = 0, t = 60; const missed = []; let timer;
      const end = () => { clearInterval(timer); if (score >= 12) FUN.badge('speed'); const best = Math.max(ST.best['sp' + key] || 0, score); ST.best['sp' + key] = best; save();
        arena.innerHTML = `<div class="win">${PIG(score >= 8 ? 'wow' : 'happy', 100)}<h3>答對 ${score} 題！</h3><p>個人最佳：${best} 題</p>${missed.length ? `<div class="missed"><b>答錯的題目</b>${missed.map(m => `<p>${m.q}<br><span class="right-t">✓ ${m.o[m.a]}</span>　${m.e || ''}</p>`).join('')}</div>` : ''}<button class="btn big" id="again" type="button">再跑一次</button></div>`; $('#again', root).onclick = () => start('speed'); };
      const draw = () => { if (i >= list.length) return end(); const m = list[i]; arena.innerHTML = `<div class="speedbar"><span class="clock">${t}s</span><span>答對 ${score}</span></div><div class="qcard">${qhtml(m, `第 ${i + 1} 題 · combo ${combo}`)}</div>`;
        $$('.opt', arena).forEach(b => b.onclick = () => answer(m, b, ok => { if (ok) score++; else missed.push(m); setTimeout(() => { i++; draw(); }, ok ? 350 : 900); })); };
      timer = setInterval(() => { t--; const c = $('.clock', arena); if (c) c.textContent = t + 's'; if (t <= 0) end(); }, 1000);
      draw();
    } else {
      let list = mode === 'wrong' ? bank.filter(b => wrong().has(b.id)) : shuffle(bank);
      if (!list.length) { arena.innerHTML = `<div class="win">${PIG('happy', 90)}<p>錯題本是空的，太棒了！</p></div>`; return; }
      let i = 0, score = 0;
      const draw = () => { if (i >= list.length) { arena.innerHTML = `<div class="win">${PIG('wow', 100)}<h3>${score} / ${list.length}</h3><button class="btn big" id="again" type="button">再來一輪</button></div>`; $('#again', root).onclick = () => start(mode); return; }
        const m = list[i]; arena.innerHTML = `<div class="qcard">${qhtml(m, `第 ${i + 1} / ${list.length} 題 · 答對 ${score} · combo ${combo}`)}<div class="exp" hidden></div><button class="btn next" type="button" hidden>下一題</button></div>`;
        $$('.opt', arena).forEach(b => b.onclick = () => answer(m, b, ok => { if (ok) score++; const e = $('.exp', arena); e.hidden = false; e.innerHTML = `<b>${ok ? FUN_CHEER() : FUN_COMFORT()}</b> ${m.e || ''}`; const n = $('.next', arena); n.hidden = false; n.focus(); n.onclick = () => { i++; draw(); }; })); };
      draw();
    }
  };
  $$('[data-m]', root).forEach(b => b.onclick = () => start(b.dataset.m));
  arena.innerHTML = `<div class="win">${PIG('happy', 100)}<p>選一個模式開始吧！</p></div>`;
}
const FUN_CHEER = () => pick(CHEERS), FUN_COMFORT = () => pick(COMFORT);

// ---------- Games: match & sort ----------
function renderGames(key, root) {
  const S = DATA[key].sort;
  root.innerHTML = `<div class="tipbox"></div><div class="modes"><button class="mode prac" data-g="match" type="button"><b>配對遊戲</b><span>${key === 'law' ? '條號 ↔ 內容' : '英文 ↔ 意思'}</span></button>${S.map((s, i) => `<button class="mode speed" data-g="s${i}" type="button"><b>分類</b><span>${s.t}</span></button>`).join('')}</div><div class="arena"></div>`;
  FUN.say($('.tipbox', root), tip('game'));
  const arena = $('.arena', root);
  const match = () => {
    const pairs = shuffle(DATA[key].match).slice(0, 6); const L = shuffle(pairs.map((p, i) => [p[0], i])), Rr = shuffle(pairs.map((p, i) => [p[1], i]));
    let sel = null, left = pairs.length, t0 = Date.now(), miss = 0;
    arena.innerHTML = `<div class="mgame"><div class="mcol">${L.map(x => `<button class="mt l" data-i="${x[1]}" type="button">${x[0]}</button>`).join('')}</div><div class="mcol">${Rr.map(x => `<button class="mt r" data-i="${x[1]}" type="button">${x[0]}</button>`).join('')}</div></div><p class="sm-p" id="mstat">還剩 ${left} 組</p>`;
    $$('.mt', arena).forEach(b => b.onclick = () => {
      if (b.classList.contains('l')) { $$('.mt.l', arena).forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sel = b; return; }
      if (!sel) { b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); return; }
      if (sel.dataset.i === b.dataset.i) { sel.classList.add('gone'); b.classList.add('gone'); sel.disabled = b.disabled = true; sel = null; left--; FUN.beep('ok');
        if (!left) { const sec = ((Date.now() - t0) / 1000).toFixed(1); const best = Math.min(ST.best['m' + key] || 999, +sec); ST.best['m' + key] = best; save(); FUN.xp(20); FUN.badge('match'); FUN.confetti(90);
          arena.innerHTML = `<div class="win">${PIG('wow', 100)}<h3>${sec} 秒完成！</h3><p>答錯 ${miss} 次 · 最佳紀錄 ${best} 秒</p><button class="btn big" id="again" type="button">再玩一次</button></div>`; $('#again', root).onclick = match; }
        else $('#mstat', arena).textContent = `還剩 ${left} 組`; }
      else { miss++; FUN.beep('no'); b.classList.add('shake'); sel.classList.add('shake'); const s = sel; setTimeout(() => { b.classList.remove('shake'); s.classList.remove('shake'); }, 400); }
    });
  };
  const sort = (si) => {
    const g = S[si]; const items = shuffle(g.items); let i = 0, ok = 0; const res = [];
    const draw = () => {
      if (i >= items.length) { const perfect = ok === items.length; FUN.xp(perfect ? 20 : 8); if (perfect) { FUN.badge('sortp'); FUN.confetti(90); }
        arena.innerHTML = `<div class="win">${PIG(perfect ? 'wow' : 'happy', 100)}<h3>${ok} / ${items.length}</h3><div class="sortres">${g.b.map((bn, bi) => `<div class="bucket"><b>${bn}</b>${items.filter(x => x[1] === bi).map(x => `<span class="${res.find(r => r[0] === x[0])[1] ? '' : 'miss'}">${x[0]}</span>`).join('')}</div>`).join('')}</div><button class="btn big" id="again" type="button">再玩一次</button></div>`; $('#again', root).onclick = () => sort(si); return; }
      const it = items[i];
      arena.innerHTML = `<div class="sgame"><p class="sm-p">${g.t}　(${i + 1}/${items.length})</p><div class="scard">${it[0]}</div><div class="buckets">${g.b.map((bn, bi) => `<button class="bk" data-b="${bi}" type="button">${bn}</button>`).join('')}</div><p class="sfb" aria-live="polite"></p></div>`;
      $$('.bk', arena).forEach(b => b.onclick = () => { const good = +b.dataset.b === it[1]; res.push([it[0], good]); if (good) { ok++; FUN.beep('ok'); b.classList.add('right'); } else { FUN.beep('no'); b.classList.add('wrongc'); $$('.bk', arena)[it[1]].classList.add('right'); }
        $$('.bk', arena).forEach(x => x.disabled = true); $('.sfb', arena).textContent = good ? pick(CHEERS) : `正確答案：${g.b[it[1]]}`; setTimeout(() => { i++; draw(); }, good ? 500 : 1300); });
    };
    draw();
  };
  $$('[data-g]', root).forEach(b => b.onclick = () => b.dataset.g === 'match' ? match() : sort(+b.dataset.g.slice(1)));
  match();
}

// ---------- 衍金 textbook problems ----------
function renderProblems(root) {
  const P = DATA.deriv.problems;
  root.innerHTML = `<div class="tipbox"></div><div class="quizbar"><button class="btn on" data-f="all" type="button">全部</button><button class="btn ghost" data-f="課本" type="button">老師勾選（11版）</button><button class="btn ghost" data-f="類題" type="button">課本類似題</button></div><div class="plist">${P.map(p => `<div class="prob" data-l="${p.lvl}"><div class="psrc"><span class="pill ${p.lvl === '課本' ? 'good' : ''}">${p.lvl}</span> ${p.src}</div><div class="qtext">${ST.lang === 'zh' || !p.qEn ? p.q : ST.lang === 'en' ? p.qEn : `<p>${p.qEn}</p><p class="zhsub">${p.q}</p>`}</div><ol class="steps">${p.steps.map(s => `<li hidden>${s}</li>`).join('')}</ol><div class="ans" hidden><b>答：</b>${p.ans}${p.ansEn && ST.lang !== 'zh' ? `<p class="en-ans"><b>English answer:</b> ${p.ansEn} <button class="mini" type="button" data-say="${esc(p.ansEn)}">朗讀</button></p>` : ''}</div><div class="pbtn"><button class="btn ghost hint" type="button">下一步提示</button><button class="btn ghost reveal" type="button">看完整解答</button><label class="chk"><input type="checkbox" data-pd="${p.id}"${ST.done['P' + p.id] ? ' checked' : ''}> 我會了</label></div></div>`).join('')}</div>`;
  FUN.say($('.tipbox', root), tip('prob'));
  $$('[data-say]', root).forEach(b => b.onclick = () => speak(b.dataset.say));
  $$('.prob', root).forEach(pb => {
    const steps = $$('.steps li', pb);
    $('.hint', pb).onclick = () => { const h = steps.find(s => s.hidden); if (h) h.hidden = false; else $('.ans', pb).hidden = false; };
    $('.reveal', pb).onclick = () => { steps.forEach(s => s.hidden = false); $('.ans', pb).hidden = false; };
  });
  $$('[data-pd]', root).forEach(cb => cb.onchange = () => { const k = 'P' + cb.dataset.pd; if (cb.checked && !ST.done[k]) { ST.done[k] = true; FUN.xp(10, cb); } else if (!cb.checked && ST.done[k]) { delete ST.done[k]; FUN.xp(-10, cb); } save(); });
  $$('[data-f]', root).forEach(b => b.onclick = () => { $$('[data-f]', root).forEach(x => { x.classList.toggle('on', x === b); x.classList.toggle('ghost', x !== b); }); $$('.prob', root).forEach(p => p.hidden = b.dataset.f !== 'all' && p.dataset.l !== b.dataset.f); });
}

// ---------- 衍金 generators ----------
function renderGens(root) {
  const G = DATA.deriv.gens;
  root.innerHTML = `<div class="tipbox"></div><div class="quizbar"><label>題型 <select id="gsel"><option value="rand">隨機題型</option>${G.map(g => `<option value="${g.id}">${g.t}（${g.base}）</option>`).join('')}</select></label><button class="btn" id="gnew" type="button">出一題</button><span class="sm-p" id="gscore"></span></div><div id="gbox"></div>`;
  FUN.say($('.tipbox', root), tip('gen'));
  let ok = 0, tot = 0;
  const make = () => {
    const sel = $('#gsel', root).value; const g = sel === 'rand' ? pick(G) : G.find(x => x.id === sel); const p = g.make();
    const qt = ST.lang === 'zh' || !p.qe ? p.q : ST.lang === 'en' ? p.qe : `<p>${p.qe}</p><p class="zhsub">${p.q}</p>`;
    $('#gbox', root).innerHTML = `<div class="qcard"><div class="qmeta">${g.t}　<span class="pill">對應 ${g.base}</span></div><div class="qtext">${qt}</div><div class="ansrow"><input type="text" inputmode="decimal" id="gin" placeholder="輸入數字" aria-label="你的答案"><span class="unit">${p.unit || ''}</span><button class="btn" id="gchk" type="button">對答案</button><button class="btn ghost" id="gshow" type="button">直接看解法</button></div><div class="exp" hidden></div></div>`;
    const showSol = (msg) => { const e = $('.exp', root); e.hidden = false; e.innerHTML = (msg || '') + `<ol class="steps">${p.sol.map(s => `<li>${s}</li>`).join('')}</ol><p>正解：<b>${f2(p.ans, 4)}</b></p><button class="btn" id="gnext" type="button">下一題</button>`; $('#gnext', root).onclick = make; };
    $('#gchk', root).onclick = () => { const v = parseFloat($('#gin', root).value.replace(/,/g, '')); if (isNaN(v)) return; tot++; const good = Math.abs(v - p.ans) <= Math.max(p.tol, Math.abs(p.ans) * 0.002); if (good) { ok++; ST.genOk++; save(); FUN.xp(15, $('#gchk', root)); FUN.beep('ok'); FUN.confetti(30); if (ST.genOk >= 10) FUN.badge('gen10'); } else FUN.beep('no'); $('#gscore', root).textContent = `本次答對 ${ok}/${tot}`; $('#gchk', root).disabled = true; showSol(`<b>${good ? pick(CHEERS) : '再檢查一下，看看下面的步驟'}</b>`); };
    $('#gin', root).addEventListener('keydown', e => { if (e.key === 'Enter') $('#gchk', root).click(); });
    $('#gshow', root).onclick = () => showSol('');
  };
  $('#gnew', root).onclick = make; make();
}

// ---------- 投資學 flashcards ----------
function renderFlash(root) {
  const F = DATA.invest.flash;
  root.innerHTML = `<div class="tipbox"></div><div class="quizbar"><button class="btn" id="fshuf" type="button">打亂順序</button><button class="btn ghost" id="fall" type="button">全部翻開</button><span class="sm-p" id="fcnt"></span></div><div class="flashlist"></div>`;
  FUN.say($('.tipbox', root), tip('flash'));
  const cnt = () => $('#fcnt', root).textContent = `已翻開 ${$$('.fcard.on', root).length} / ${F.length}`;
  const draw = list => { $('.flashlist', root).innerHTML = list.map((f, i) => `<button class="fcard" type="button"><span class="fq"><span class="num">${i + 1}</span>${f.q}</span><span class="fa">${f.a}</span></button>`).join(''); $$('.fcard', root).forEach(c => c.onclick = () => { c.classList.toggle('on'); if (c.classList.contains('on')) { ST.flip = ST.flip || {}; const fk = c.querySelector('.fq').textContent.slice(0, 30); if (!ST.flip[fk]) { ST.flip[fk] = 1; FUN.xp(2); } } cnt(); }); cnt(); };
  draw(F); $('#fshuf', root).onclick = () => draw(shuffle(F)); $('#fall', root).onclick = () => { $$('.fcard', root).forEach(c => c.classList.add('on')); cnt(); };
}

// ---------- 管理學 essay grading ----------
function renderEssay(root) {
  const E = DATA.mgmt.essays;
  root.innerHTML = `<div class="tipbox"></div><div class="essay"><div class="estep"><span class="n">1</span><div><label for="esel" class="lblb">選題目</label><select id="esel">${E.map((e, i) => `<option value="${i}">[${e.ch}] ${(e.qEn || e.q).slice(0, 60)}…</option>`).join('')}<option value="custom">自訂題目（例如老師上課出的題）</option></select><div class="qtext" id="eq"></div><textarea id="ecustom" rows="3" placeholder="貼上題目" hidden></textarea><details class="rub"><summary>看評分要點（寫完再看）</summary><ul id="epts"></ul></details></div></div>
    <div class="estep"><span class="n">2</span><div><span class="lblb">用英文手寫作答，拍照上傳</span><label class="drop" id="edrop"><input type="file" id="efile" accept="image/jpeg,image/png,image/webp,image/gif" multiple>${PIG('happy', 48)}<span>點這裡選照片，或把照片拖進來（可多張）</span></label><div class="thumbs" id="ethumbs"></div><details><summary>沒有手寫？也可以直接打字</summary><textarea id="etext" rows="6" placeholder="Type your answer in English"></textarea></details></div></div>
    <div class="estep"><span class="n">3</span><div><button class="btn big" id="ego" type="button">請豬豬老師（Claude）批改</button><button class="btn ghost" id="estop" type="button" hidden>停止</button><p class="sm-p" id="enote"></p><div class="feedback" id="eout"></div></div></div></div>`;
  FUN.say($('.tipbox', root), tip('essay'));
  let files = [];
  const sel = $('#esel', root);
  const syncQ = () => { const c = sel.value === 'custom'; $('#ecustom', root).hidden = !c; const e = E[+sel.value]; $('#eq', root).innerHTML = c ? '' : `<p>${e.qEn}</p><p class="zhsub">${e.q}</p>`; $('#epts', root).innerHTML = c ? '<li>自訂題目沒有預設要點，會依課本內容判斷。</li>' : e.pts.map(p => `<li>${p}</li>`).join(''); };
  sel.onchange = syncQ; syncQ();
  const addFiles = fl => { [...fl].forEach(f => { if (/^image\//.test(f.type)) files.push(f); }); drawThumbs(); };
  const drawThumbs = () => { $('#ethumbs', root).innerHTML = files.map((f, i) => `<figure class="th"><img alt="作答照片 ${i + 1}" src="${URL.createObjectURL(f)}"><button type="button" data-x="${i}" aria-label="移除">×</button></figure>`).join(''); $$('[data-x]', root).forEach(b => b.onclick = () => { files.splice(+b.dataset.x, 1); drawThumbs(); }); };
  $('#efile', root).onchange = e => addFiles(e.target.files);
  const dz = $('#edrop', root); dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('over'); }); dz.addEventListener('dragleave', () => dz.classList.remove('over')); dz.addEventListener('drop', e => { e.preventDefault(); dz.classList.remove('over'); addFiles(e.dataTransfer.files); });
  const note = $('#enote', root), out = $('#eout', root), go = $('#ego', root), stop = $('#estop', root);
  let sample = null, lim = null, ctl = null;
  note.textContent = '連線中…';
  (async () => {
    try { sample = window.claude ? await window.claude.use('sample') : null; } catch (e) { sample = null; }
    if (!sample) { note.innerHTML = '這個檢視無法使用 AI 批改（需要在 claude.ai 登入後開啟）。也可以把手寫照片直接傳到對話裡請 Claude 批改。'; go.disabled = true; return; }
    try { lim = await sample.limits(); } catch (e) { lim = null; }
    note.textContent = lim && lim.images ? `可上傳最多 ${lim.images.maxCount} 張照片。第一次使用會詢問你是否允許。` : '此檢視只能批改打字作答（無法傳送圖片）。';
    if (!(lim && lim.images)) $('#edrop', root).hidden = true;
  })();
  stop.onclick = () => ctl && ctl.abort();
  go.onclick = async () => {
    if (!sample) return;
    const cust = sel.value === 'custom'; const e = E[+sel.value];
    const q = cust ? $('#ecustom', root).value.trim() : `${e.qEn}\n（中文題意：${e.q}）`;
    const pts = cust ? [] : e.pts; const typed = $('#etext', root).value.trim();
    if (!q) { note.textContent = '請先輸入題目。'; return; }
    if (!files.length && !typed) { note.textContent = '請上傳作答照片或打字作答。'; return; }
    const ch = cust ? null : e.ch;
    const ref = DATA.mgmt.sections.filter(s => !ch || s.t.startsWith(ch)).map(s => s.t + '\n' + s.cards.map(c => c.t + '：' + c.plain + ' ' + strip(c.body) + (c.ex ? ' | ' + c.ex : '')).join('\n')).join('\n\n').slice(0, 14000);
    const imgs = lim && lim.images ? files.slice(0, lim.images.maxCount) : [];
    const prompt = `You are a friendly but rigorous TA for a university Management course (Robbins & Coulter, Management). The exam is written in English. The student is a native Mandarin speaker; write your feedback in Traditional Chinese (繁體中文), but quote English terms and write the model answer in English. Use a warm, encouraging tone like a kind tutor.\n\n[Question]\n${q}\n\n${pts.length ? '[Rubric points]\n' + pts.map((p, i) => (i + 1) + '. ' + p).join('\n') + '\n\n' : ''}[Course notes for checking accuracy]\n${ref}\n\n[Student answer]\n${imgs.length ? `${imgs.length} photo(s) of a handwritten answer are attached. Transcribe them first.` : ''}${typed ? '\nTyped answer:\n' + typed : ''}\n\nReply in Markdown with these sections:\n## 辨識出的作答內容\n(brief transcription; mark unclear words as (難辨識))\n## 分數\nScore out of 10 with a one-line overall comment.\n## 逐項評分\nFor each rubric point: 有寫到／部分／缺漏, and point out any conceptual errors.\n## 英文用字與文法\nList up to 5 English wording or grammar fixes as "原句 → 建議".\n## 漏掉的關鍵字\nKey English terms that should appear, with Chinese meaning.\n## Model answer outline (English)\nA high-scoring answer skeleton in English bullet points.\n## 下次怎麼寫更好\n2–3 concrete tips.`;
    out.innerHTML = `<div class="mascot">${PIG('wow', 56)}<p class="bubble thinking">豬豬老師批改中…（看照片與思考可能要 30–90 秒）</p></div>`; go.disabled = true; stop.hidden = false; ctl = new AbortController();
    try {
      const opt = { signal: ctl.signal, cache: false, onText: ({ text }) => { out.innerHTML = md(text); } };
      if (imgs.length) opt.images = imgs;
      const r = await sample(prompt, opt); out.innerHTML = md(r.text); FUN.xp(30); FUN.badge('essay'); FUN.confetti(60);
      if (r.truncated) note.textContent = '回覆被截斷，可以縮短作答或分段再試。';
    } catch (err) {
      out.innerHTML = err && err.text ? md(err.text) : '';
      note.textContent = { not_granted: '你沒有允許這個頁面使用 Claude，所以無法批改。', rate_limited: '用量太頻繁，請稍後再試。', image_rejected: '照片格式或大小不符，請換一張（JPG/PNG）。', images_unavailable: '這個檢視無法傳送圖片，請改用打字作答。', cancelled: '已停止。', session_expired: '登入已過期，請重新登入 claude.ai。', refused: '這次無法批改，請調整內容後再試。' }[err && err.code] || '批改時發生錯誤，可以再按一次。';
    } finally { go.disabled = false; stop.hidden = true; }
  };
}
function md(t) {
  const Ls = esc(t).split('\n'); let o = '', inl = false; const close = () => { if (inl) { o += '</ul>'; inl = false; } };
  for (const raw of Ls) {
    const l = raw.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
    if (/^#{1,4}\s/.test(l)) { close(); o += '<h4>' + l.replace(/^#+\s/, '') + '</h4>'; }
    else if (/^\s*([-*•]|\d+[.)])\s/.test(l)) { if (!inl) { o += '<ul>'; inl = true; } o += '<li>' + l.replace(/^\s*([-*•]|\d+[.)])\s/, '') + '</li>'; }
    else if (!l.trim()) close();
    else { close(); o += '<p>' + l + '</p>'; }
  }
  close(); return o;
}

// ---------- Home ----------
function renderHome(root) {
  const cfaList = []; ORDER.forEach(k => subjCards(DATA[k]).forEach(c => c.cfa && cfaList.push([k, c])));
  const hello = new Date().getHours() < 12 ? '早安' : new Date().getHours() < 18 ? '午安' : '晚安';
  root.innerHTML = `<div class="home"><div class="hero">${PIG('happy', 120)}<div><h2>${hello}！我是豬豬老師</h2><p>今天也一起存一點知識吧。看卡片、玩遊戲、打怪物都會得到 XP，升級後會換新稱號。你已經連續 <b>${FUN.streak()}</b> 天來複習了！</p><p class="stats"><span>Lv.${FUN.level()}</span><span>${ST.xp} XP</span><span>${Object.keys(ST.badges).length}/${BADGES.length} 徽章</span></p></div></div>
    <div class="subjgrid">${ORDER.map(k => { const s = DATA[k]; const n = subjCards(s).length; const lang = k === 'basic' ? '<span class="pill en-pill">先備知識</span>' : k === 'deriv' || k === 'mgmt' ? '<span class="pill en-pill">英文考試</span>' : ''; return `<button class="sg ${s.hue}" data-go="${k}" type="button"><span class="sgn">${s.full} ${lang}</span><span class="sgm">${n} 個知識點${s.formulas ? ` · ${s.formulas.length} 個公式` : ''}</span><span class="bar" data-prog="${k}"><i></i></span><span class="sgp" data-progt="${k}"></span><span class="sgi">${s.intro}</span></button>`; }).join('')}</div>
    <h3 class="hh">徽章牆</h3><div class="badges">${BADGES.map(b => `<div class="badge${ST.badges[b[0]] ? ' got' : ''}" title="${b[2]}"><span class="medal"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="22" r="14" class="md"/><path d="M14,4 L20,12 L26,4" class="mr"/><text x="20" y="27" text-anchor="middle" class="mt2">★</text></svg></span><b>${b[1]}</b><small>${b[2]}</small></div>`).join('')}</div>
    <h3 class="hh">未來考 CFA：這些現在就學到了</h3><p class="sm-p">CFA Level I 會用到的觀念，點一下直接跳到那張卡。</p><div class="cfalist">${cfaList.map(([k, c]) => `<button type="button" class="cfai ${DATA[k].hue}" data-jump="${k}|${c.id}"><b>${c.t}</b><span>${c.cfa}</span></button>`).join('')}</div>
    <div class="dates"><h3>考試日程（依課程大綱）</h3><ul><li><b>管理學期中</b>：11/4（第 9 週）· 期末 12/23 · <b>英文作答</b></li><li><b>衍金期中</b>：2026/11/16 · 期末 12/21 · A4 手抄小抄＋計算機 · <b>英文作答</b></li><li><b>衍金小考</b>：每單元結束後勾選習題，隔週考其中一題或類題（可開書）</li></ul></div></div>`;
  $$('[data-go]', root).forEach(b => b.onclick = () => go(b.dataset.go));
  $$('[data-jump]', root).forEach(b => b.onclick = () => { const [k, id] = b.dataset.jump.split('|'); jumpCard(k, id); });
  updateCounts();
}

function jumpCard(k, id) { go(k, 'learn'); setTimeout(() => { const el = $('#c-' + id); if (el) { const d = el.querySelector('details'); if (d) d.open = true; el.scrollIntoView({ behavior: 'smooth', block: 'start' }); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1600); } }, 60); }

// ---------- Routing ----------
const PANES = {
  basic: [['learn', '基礎卡片'], ['formula', '公式教室'], ['game', '小遊戲'], ['mcq', '打怪＆選擇題']],
  deriv: [['learn', '知識點'], ['formula', '公式教室'], ['prob', '課本習題'], ['gen', '變化題'], ['game', '小遊戲'], ['mcq', '打怪＆選擇題']],
  invest: [['learn', '知識點'], ['formula', '公式教室'], ['flash', '講義問題'], ['game', '小遊戲'], ['mcq', '打怪＆選擇題']],
  law: [['learn', '知識點＋條文'], ['game', '小遊戲'], ['mcq', '打怪＆選擇題']],
  mgmt: [['learn', '知識點'], ['formula', '公式教室'], ['essay', '申論批改'], ['game', '小遊戲'], ['mcq', '打怪＆選擇題']]
};
let CUR = ['home'];
function go(k, tab) {
  ST.subj = k; save(); CUR = [k, tab];
  $$('.stab').forEach(b => b.setAttribute('aria-current', b.dataset.s === k ? 'page' : 'false'));
  document.body.dataset.subj = k;
  const main = $('#main');
  if (k === 'home') { renderHome(main); window.scrollTo(0, 0); return; }
  const s = DATA[k]; tab = tab || ST.tab[k] || 'learn'; CUR = [k, tab];
  main.innerHTML = `<div class="shead"><div><h2>${s.full}</h2><p class="intro">${s.intro}</p></div><div class="prog"><span class="bar" data-prog="${k}"><i></i></span><span data-progt="${k}"></span> 已掌握</div></div><div class="ptabs" role="tablist">${PANES[k].map(p => `<button role="tab" class="ptab" data-p="${p[0]}" aria-selected="${p[0] === tab}" type="button">${p[1]}</button>`).join('')}</div><div id="pane"></div>`;
  $$('.ptab', main).forEach(b => b.onclick = () => go(k, b.dataset.p));
  ST.tab[k] = tab; save();
  const pane = $('#pane');
  ({ learn: () => renderLearn(k, pane), formula: () => renderFormulas(k, pane), mcq: () => renderMCQ(k, pane), prob: () => renderProblems(pane), gen: () => renderGens(pane), flash: () => renderFlash(pane), essay: () => renderEssay(pane), game: () => renderGames(k, pane) })[tab]();
  updateCounts();
}
window.rerender = () => go(CUR[0], CUR[1]);
const NAVI = {
  home: '<path d="M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z"/>',
  basic: '<rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/><rect x="8.5" y="4" width="7" height="7" rx="1.5"/>',
  deriv: '<path d="M3 19 L9 12 L13 15 L21 6"/><path d="M16 6 H21 V11"/>',
  invest: '<rect x="4" y="12" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="12" rx="1"/><rect x="16" y="4" width="4" height="16" rx="1"/>',
  law: '<path d="M12 4 V20 M7 20 H17 M5 7 H19"/><path d="M5 7 L2.5 13 H7.5 Z M19 7 L16.5 13 H21.5 Z"/>',
  mgmt: '<circle cx="9" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M3 20 C3 15 15 15 15 20 M14 15.5 C17 14.5 21 15.5 21 19"/>'
};
const navIcon = k => `<svg class="navi" viewBox="0 0 24 24" aria-hidden="true">${NAVI[k]}</svg>`;
function boot() {
  FUN.init();
  $('#stabs').innerHTML = `<button class="stab home" data-s="home" type="button">${navIcon('home')}<span>首頁</span></button>` + ORDER.map(k => `<button class="stab ${DATA[k].hue}" data-s="${k}" type="button">${navIcon(k)}<span>${DATA[k].name}</span><span class="bar mini" data-prog="${k}"><i></i></span></button>`).join('');
  $$('.stab').forEach(b => b.onclick = () => go(b.dataset.s));
  FUN.hud();
  const h = (location.hash || '').slice(1);
  go(ORDER.includes(h) || h === 'home' ? h : (ST.subj || 'home'));
}
boot();
