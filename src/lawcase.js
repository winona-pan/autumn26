// ===== 民商法「情境題」與「統整筆記」分頁 =====
// 情境題資料在 DATA.law.cases（d_law_case.js），作答紀錄存在 ST.lc[題目 id] = { a: 選的選項, ok, at }，會雲端同步。
// 統整筆記資料在 DATA.law.sums；上次看的單元存在 ST.lsum（只存本機）。
const LAWCASE = (() => {
  const L = 'ABCD';
  const LC = () => (ST.lc = ST.lc || {});
  const uname = u => u === 'x' ? '跨單元' : ((UNITS.list('law').find(x => x.id === u) || {}).t || u);
  const inUnits = q => { const s = UNITS.sel('law'); return !s.size || q.u.some(u => s.has(u)); };
  let view = 'all', order = null;

  function renderCases(root) {
    const ALL = DATA.law.cases || [];
    root.innerHTML = `<div class="tipbox"></div><div class="punits"></div>
      <div class="quizbar"><button class="btn" data-v="all" type="button">全部</button><button class="btn" data-v="new" type="button">還沒做</button><button class="btn" data-v="bad" type="button">答錯的</button><button class="btn" data-v="mix" type="button">跨單元綜合</button><button class="btn ghost" id="lcshuf" type="button">打亂順序</button><span class="sm-p" id="lccnt"></span></div>
      <div class="lclist"></div>`;
    FUN.say($('.tipbox', root), tip('case'));
    UNITS.picker('law', $('.punits', root), { count: u => ALL.filter(q => q.u.includes(u)).length, total: ALL.length, label: '選單元（可多選；跨單元題只要含選到的單元就會出現）', onChange: () => { order = null; draw(); } });
    const pick = () => ALL.filter(inUnits).filter(q => { const r = LC()[q.id]; return view === 'new' ? !r : view === 'bad' ? r && !r.ok : view === 'mix' ? q.u.length > 1 : true; });
    const count = () => {
      const P = ALL.filter(inUnits), done = P.filter(q => LC()[q.id]), ok = done.filter(q => LC()[q.id].ok);
      $('#lccnt', root).textContent = `已作答 ${done.length} / ${P.length} 題，答對 ${ok.length} 題`;
    };
    function draw() {
      $$('[data-v]', root).forEach(b => b.classList.toggle('ghost', b.dataset.v !== view));
      let list = pick(); if (order) list = order.map(id => list.find(q => q.id === id)).filter(Boolean);
      $('.lclist', root).innerHTML = list.length ? list.map((q, i) => card(q, i + 1)).join('') : '<p class="sm-p">這個範圍沒有題目了。換個單元或篩選看看！</p>';
      $$('.lcq', root).forEach(el => wire(el, ALL.find(q => q.id === el.dataset.q), count));
      count();
    }
    $$('[data-v]', root).forEach(b => b.onclick = () => { view = b.dataset.v; draw(); });
    $('#lcshuf', root).onclick = () => { order = shuffle(pick()).map(q => q.id); draw(); };
    draw();
  }

  function card(q, n) {
    const r = LC()[q.id];
    return `<article class="lcq" id="lc-${q.id}" data-q="${q.id}">
      <header><span class="num">${n}</span><b>【實例選擇題：${q.t}】</b>${q.u.map(u => `<span class="pill">${uname(u)}</span>`).join('')}${r ? `<span class="pill ${r.ok ? 'good' : 'bad'}">${r.ok ? '答對過' : '答錯過'}</span>` : ''}</header>
      <div class="lcs"><p class="lch">【題幹】</p>${q.s}</div>
      <p class="lcqq">${q.q}</p>
      <div class="lco">${q.o.map((o, i) => `<button type="button" class="lcopt" data-i="${i}"><b>(${L[i]})</b> ${o}</button>`).join('')}</div>
      <div class="lcx" hidden>
        <p class="lch">【答案與詳細解析】</p><p class="lcans">正確答案：(${L[q.a]})</p>
        <ul class="lcxl">${q.x.map((x, i) => `<li class="${i === q.a ? 'ok' : 'no'}"><b>選項 (${L[i]}) ${i === q.a ? '正確' : '錯誤'}</b><span class="lctag">【${i === q.a ? '考點核心' : '考點陷阱'}：${x[0]}】</span>${x[1]}</li>`).join('')}</ul>
        ${q.memo ? `<p class="lcmemo"><b>一句話記住</b>${q.memo}</p>` : ''}
        <div class="lcfoot">${(q.cards || []).map(id => `<button type="button" class="ntbtn ghost" data-jc="${id}">看卡片：${cardT(id)}</button>`).join('')}<button type="button" class="ntbtn ghost" data-redo>重新作答</button></div>
      </div></article>`;
  }
  const cardT = id => { for (const s of DATA.law.sections) { const c = s.cards.find(c => c.id === id); if (c) return c.t.replace(/[（(]§.*$/, ''); } return id; };

  function wire(el, q, count) {
    const opts = $$('.lcopt', el), x = $('.lcx', el);
    const show = a => { opts.forEach((b, i) => { b.disabled = true; b.classList.toggle('ok', i === q.a); b.classList.toggle('no', i === a && a !== q.a); }); x.hidden = false; };
    const r = LC()[q.id]; if (r) show(r.a);
    opts.forEach(b => b.onclick = () => {
      const a = +b.dataset.i, ok = a === q.a, first = !LC()[q.id];
      LC()[q.id] = { a, ok, at: Date.now() };
      if (ok && first) { FUN.xp(6, b); q.u.forEach(u => u !== 'x' && UNITS.add('law', u, 4)); }
      FUN.beep(ok ? 'ok' : 'no'); save(); show(a); count();
    });
    $$('[data-jc]', el).forEach(b => b.onclick = () => jumpCard('law', b.dataset.jc));
    $('[data-redo]', el).onclick = () => { opts.forEach(b => { b.disabled = false; b.classList.remove('ok', 'no'); }); x.hidden = true; el.scrollIntoView({ block: 'start' }); window.scrollBy(0, -topGap()); };
  }

  function renderSums(root) {
    const S = DATA.law.sums || [], ALL = DATA.law.cases || [];
    let cur = S.some(s => s.u === ST.lsum) || ST.lsum === 'all' ? ST.lsum : S[0].u;
    root.innerHTML = `<div class="tipbox"></div><div class="ubar"><span class="lbl">選單元</span><div class="uchips">${S.map(s => `<button class="uchip" data-su="${s.u}" type="button">${uname(s.u)}</button>`).join('')}<button class="uchip" data-su="all" type="button">全部單元一次看</button></div></div><div class="lsumbody"></div>`;
    FUN.say($('.tipbox', root), tip('sum'));
    const draw = () => {
      $$('[data-su]', root).forEach(b => { const on = b.dataset.su === cur; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
      const list = cur === 'all' ? S : S.filter(s => s.u === cur);
      $('.lsumbody', root).innerHTML = list.map(s => {
        const n = ALL.filter(q => s.u === 'x' ? q.u.length > 1 : q.u.includes(s.u)).length;
        return `<section class="lsum"><h3>${uname(s.u)}${s.t ? `：${s.t}` : ''}</h3>${s.h}
          <div class="lcfoot">${n ? `<button type="button" class="btn" data-go="${s.u}">做這單元的情境題（${n} 題）</button>` : ''}${(s.cards || []).map(id => `<button type="button" class="ntbtn ghost" data-jc="${id}">${cardT(id)}</button>`).join('')}</div></section>`;
      }).join('');
      $$('[data-jc]', root).forEach(b => b.onclick = () => jumpCard('law', b.dataset.jc));
      $$('[data-go]', root).forEach(b => b.onclick = () => { const u = b.dataset.go; ST.mu = ST.mu || {}; ST.mu.law = u === 'x' ? [] : [u]; view = u === 'x' ? 'mix' : 'all'; order = null; save(); go('law', 'case', { top: 1 }); });
    };
    $$('[data-su]', root).forEach(b => b.onclick = () => { cur = b.dataset.su; ST.lsum = cur; save(); FUN.beep('ok'); draw(); });
    draw();
  }

  return { renderCases, renderSums };
})();
