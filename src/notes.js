// ===== 筆記與螢光筆：完整重點裡的每個列點都能寫筆記、選取文字畫重點 =====
// 存在 ST.hl（重點）與 ST.nt（筆記），設定頁的備份碼會一起帶走。
// 每個列點用「卡片 id + 列點文字的雜湊」當鑰匙；內容改版找不到原位置時，用存下來的原文片段重新定位。
const NOTES = (() => {
  const COLORS = [['y', '黃'], ['g', '綠'], ['p', '粉'], ['b', '藍']];
  const BLK = 'li, p, td, th, dd, h4, .ez';
  const HL = () => (ST.hl = ST.hl || {});
  const NT = () => (ST.nt = ST.nt || {});
  const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  const norm = s => s.replace(/\s+/g, ' ').trim();
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const escH = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // ---- 文字與位置（略過筆記框） ----
  const texts = el => { const out = []; const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest('.ntbox') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT }); let n; while ((n = w.nextNode())) out.push(n); return out; };
  const textOf = el => texts(el).map(n => n.data).join('');
  const posIn = (block, node, off) => { const r = document.createRange(); r.setStart(block, 0); r.setEnd(node, off); const f = r.cloneContents(); f.querySelectorAll('.ntbox').forEach(x => x.remove()); return f.textContent.length; };

  // ---- 卡片裡的列點與鑰匙 ----
  const blocksOf = card => { const b = card.querySelector('.body'); return b ? [...b.querySelectorAll(BLK)].filter(x => !x.closest('.ntbox')) : []; };
  const keysOf = card => { const seen = {}; const m = new Map(); blocksOf(card).forEach(b => { const h = hash(norm(textOf(b))); seen[h] = (seen[h] || 0) + 1; m.set(b, h + (seen[h] > 1 ? '.' + seen[h] : '')); }); return m; };
  const cardId = card => card.id.replace(/^c-/, '');
  const blockByKey = (card, k) => { for (const [b, kk] of keysOf(card)) if (kk === k) return b; return null; };

  // ---- 螢光筆 ----
  function wrap(block, s, e, c, id) {
    let pos = 0;
    texts(block).forEach(node => {
      const len = node.data.length, a = Math.max(s, pos) - pos, z = Math.min(e, pos + len) - pos; pos += len;
      if (z <= a) return;
      let n = node; if (a > 0) n = n.splitText(a); if (z - a < n.data.length) n.splitText(z - a);
      const m = document.createElement('mark'); m.className = 'hl hl-' + c; m.dataset.h = id; n.parentNode.insertBefore(m, n); m.appendChild(n);
    });
  }
  function unwrapAll(card) { card.querySelectorAll('mark.hl').forEach(m => { const p = m.parentNode; while (m.firstChild) p.insertBefore(m.firstChild, m); p.removeChild(m); p.normalize(); }); }
  // 找不到原鑰匙時，用原文片段重新定位
  function relocate(card, keys, x) { for (const [b, k] of keys) { const i = textOf(b).indexOf(x); if (i >= 0) return [b, k, i]; } return null; }
  function paint(card) {
    unwrapAll(card);
    const id = cardId(card), list = HL()[id]; if (!list || !list.length) return;
    const keys = keysOf(card); let moved = false;
    list.forEach(h => {
      let b = blockByKey(card, h.k);
      if (b && textOf(b).slice(h.s, h.e) !== h.x) b = null;
      if (!b) { const r = relocate(card, keys, h.x); if (!r) { h.lost = 1; return; } [b, h.k] = r; h.s = r[2]; h.e = r[2] + h.x.length; delete h.lost; moved = true; }
      wrap(b, h.s, h.e, h.c, h.id);
    });
    if (moved) save();
  }

  // ---- 筆記 ----
  function noteBox(block, card, k, edit) {
    let box = [...block.children].find(x => x.classList.contains('ntbox'));
    const d = (NT()[cardId(card)] || {})[k];
    if (!d && !edit) { if (box) box.remove(); return; }
    if (!box) { box = document.createElement('span'); box.className = 'ntbox'; block.appendChild(box); }
    const html = d ? (d.h || RICH.fromText(d.t)) : '';
    box.innerHTML = edit
      ? `<span class="nthead">我的筆記<small>可以直接貼上 Gemini、ChatGPT 或網頁內容，格式會保留</small></span><span class="nttools"><button type="button" class="ntbtn ghost" data-fmt="bold"><b>B</b></button><button type="button" class="ntbtn ghost" data-fmt="insertUnorderedList">• 清單</button><button type="button" class="ntbtn ghost" data-fmt="insertOrderedList">1. 清單</button><button type="button" class="ntbtn ghost" data-fmt="removeFormat">清除格式</button></span><div class="nted ntrich" contenteditable="true" role="textbox" aria-multiline="true" aria-label="筆記" data-ph="寫下你查到的補充、自己的理解、還不懂的地方⋯">${html}</div><span class="ntbtns"><button type="button" class="ntbtn" data-nt="done">完成</button>${d ? '<button type="button" class="ntbtn ghost" data-nt="del">刪除</button>' : '<button type="button" class="ntbtn ghost" data-nt="cancel">取消</button>'}</span>`
      : `<span class="nthead">我的筆記</span><div class="nttext ntrich">${html}</div><span class="ntbtns"><button type="button" class="ntbtn ghost" data-nt="edit">編輯</button></span>`;
    box.dataset.k = k;
    if (edit) {
      const ed = box.querySelector('.nted'); RICH.attach(ed);
      box.querySelectorAll('[data-fmt]').forEach(bt => { bt.addEventListener('mousedown', e => e.preventDefault()); bt.onclick = () => { ed.focus(); document.execCommand(bt.dataset.fmt, false, null); }; });
      ed.focus(); const r = document.createRange(); r.selectNodeContents(ed); r.collapse(false); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    }
  }
  function saveNote(card, block, k, ed) {
    const id = cardId(card), all = NT();
    const h = ed ? RICH.clean(ed.innerHTML) : '', tmp = document.createElement('div'); tmp.innerHTML = h;
    const text = (ed ? ed.innerText : '').trim(), has = text || tmp.querySelector('math, hr, table');
    if (has) { all[id] = all[id] || {}; const old = all[id][k]; all[id][k] = { t: text, h, q: norm(textOf(block)).slice(0, 80), at: old ? old.at : Date.now(), up: Date.now() }; }
    else if (all[id]) { delete all[id][k]; if (!Object.keys(all[id]).length) delete all[id]; }
    save(); noteBox(block, card, k, false); badge(card);
  }
  function showNotes(card) {
    const id = cardId(card), notes = NT()[id]; if (!notes) return;
    const keys = keysOf(card); let moved = false;
    Object.entries(notes).forEach(([k, d]) => {
      let b = blockByKey(card, k);
      if (!b) { for (const [bb, kk] of keys) if (norm(textOf(bb)).startsWith(d.q.slice(0, 40))) { b = bb; delete notes[k]; notes[kk] = d; k = kk; moved = true; break; } }
      if (b) { delete d.lost; noteBox(b, card, k, false); } else d.lost = 1;
    });
    if (moved) save();
  }
  function openNote(card, block) { const k = keysOf(card).get(block); if (k) noteBox(block, card, k, true); }

  // ---- 卡片上的計數與筆記模式按鈕 ----
  function badge(card) {
    const id = cardId(card), h = (HL()[id] || []).length, n = Object.keys(NT()[id] || {}).length;
    let el = card.querySelector('.ntcnt'); if (!el) return;
    el.textContent = (h || n) ? [h ? `重點 ${h}` : '', n ? `筆記 ${n}` : ''].filter(Boolean).join('・') : '';
    const base = card.dataset.search0 || (card.dataset.search0 = card.dataset.search || '');
    card.dataset.search = base + ' ' + Object.values(NT()[id] || {}).map(d => d.t.toLowerCase()).join(' ');
  }
  function decorate(card) {
    const hd = card.querySelector('header'); if (!hd || hd.querySelector('.ntmode')) return;
    hd.insertAdjacentHTML('beforeend', '<span class="ntside"><span class="ntcnt"></span><button type="button" class="ntmode" aria-pressed="false" title="打開後，點任何一個列點就能寫筆記">＋筆記</button></span>');
  }

  // ---- 選取工具列（全頁共用一個） ----
  let bar = null, cur = null;
  function ensureBar() {
    if (bar) return bar;
    bar = document.createElement('div'); bar.className = 'hlbar'; bar.hidden = true; bar.setAttribute('role', 'toolbar'); bar.setAttribute('aria-label', '螢光筆');
    bar.innerHTML = COLORS.map(c => `<button type="button" class="hlc hl-${c[0]}" data-c="${c[0]}" aria-label="${c[1]}色螢光筆" title="${c[1]}色"></button>`).join('')
      + '<button type="button" class="hlb" data-a="note">筆記</button><button type="button" class="hlb" data-a="clear">移除重點</button>';
    bar.addEventListener('mousedown', e => e.preventDefault());
    bar.addEventListener('click', e => { const b = e.target.closest('button'); if (!b || !cur) return; b.dataset.c ? color(b.dataset.c) : b.dataset.a === 'note' ? noteFromBar() : clear(); });
    document.body.appendChild(bar); return bar;
  }
  const hide = () => { if (bar) bar.hidden = true; cur = null; };
  function place(rect) {
    ensureBar(); bar.hidden = false;
    const w = bar.offsetWidth, x = Math.min(Math.max(8, rect.left + rect.width / 2 - w / 2 + scrollX), scrollX + document.documentElement.clientWidth - w - 8);
    bar.style.left = x + 'px'; bar.style.top = (rect.bottom + scrollY + 10) + 'px';
  }
  // 選取範圍 → 每個碰到的最外層列點各自的 [起, 迄]
  function pieces(card, range) {
    const bl = blocksOf(card).filter(b => range.intersectsNode(b));
    const top = bl.filter(b => !bl.some(o => o !== b && o.contains(b)));
    return top.map(b => { const len = textOf(b).length; const s = b.contains(range.startContainer) ? posIn(b, range.startContainer, range.startOffset) : 0; const e = b.contains(range.endContainer) ? posIn(b, range.endContainer, range.endOffset) : len; return [b, Math.max(0, s), Math.min(len, e)]; }).filter(p => p[2] > p[1] && norm(textOf(p[0]).slice(p[1], p[2])));
  }
  function onSelect(root) {
    const sel = getSelection(); if (!sel.rangeCount || sel.isCollapsed) { if (cur && cur.sel) hide(); return; }
    const range = sel.getRangeAt(0); const anc = range.commonAncestorContainer; const el = anc.nodeType === 1 ? anc : anc.parentElement;
    const card = el && el.closest('.card'), body = card && card.querySelector('.body');
    if (!card || !root.contains(card) || !body || !range.intersectsNode(body)) { hide(); return; }
    if (el.closest('.ntbox, textarea, [contenteditable]')) return;
    const ps = pieces(card, range); if (!ps.length) { hide(); return; }
    cur = { sel: 1, card, range: range.cloneRange(), ps }; ensureBar(); bar.querySelector('[data-a="clear"]').hidden = !card.querySelector('mark.hl') || !ps.some(([b]) => b.querySelector('mark.hl'));
    bar.querySelector('[data-a="note"]').hidden = false; place(range.getBoundingClientRect());
  }
  function color(c) {
    const { card } = cur; const id = cardId(card), list = HL()[id] = HL()[id] || [], keys = keysOf(card);
    if (cur.mark) { list.filter(h => h.id === cur.mark).forEach(h => h.c = c); }
    else cur.ps.forEach(([b, s, e]) => { const k = keys.get(b), x = textOf(b).slice(s, e); list.push({ id: uid(), k, s, e, c, x, at: Date.now() }); });
    save(); paint(card); badge(card); getSelection().removeAllRanges(); hide(); FUN.beep('ok');
  }
  function clear() {
    const { card } = cur; const id = cardId(card), keys = keysOf(card); let list = HL()[id] || [];
    if (cur.mark) list = list.filter(h => h.id !== cur.mark);
    else cur.ps.forEach(([b, s, e]) => { const k = keys.get(b); list = list.filter(h => !(h.k === k && h.s < e && h.e > s)); });
    if (list.length) HL()[id] = list; else delete HL()[id];
    save(); paint(card); badge(card); getSelection().removeAllRanges(); hide();
  }
  function noteFromBar() { const { card } = cur; const b = cur.mark ? card.querySelector(`mark[data-h="${cur.mark}"]`).parentElement.closest(BLK) : cur.ps[0][0]; getSelection().removeAllRanges(); hide(); openNote(card, b); }

  // ---- 掛到知識點頁 ----
  let globalBound = false;
  function mount(key, root) {
    hide();
    $$('.card', root).forEach(card => { decorate(card); paint(card); showNotes(card); badge(card); });
    let t; const check = () => { clearTimeout(t); t = setTimeout(() => onSelect(root), 180); };
    root.addEventListener('mouseup', check); root.addEventListener('keyup', check); root.addEventListener('touchend', check);
    if (!globalBound) { globalBound = true;
      // 手機長按選取時不會觸發 mouseup，改聽 selectionchange
      let t2; document.addEventListener('selectionchange', () => { clearTimeout(t2); t2 = setTimeout(() => { const pane = $('#pane'); if (!pane || !pane.querySelector('.learn')) return; if (getSelection().isCollapsed) { if (cur && cur.sel) hide(); } else onSelect(pane); }, 350); });
      window.addEventListener('resize', hide); }
    root.addEventListener('click', e => {
      const card = e.target.closest('.card'); if (!card) return;
      const tg = e.target.closest('.ntmode'); if (tg) { const on = card.classList.toggle('nmode'); tg.setAttribute('aria-pressed', on); tg.textContent = on ? '完成筆記' : '＋筆記'; if (on) { const d = card.querySelector('details'); if (d) d.open = true; } return; }
      const nb = e.target.closest('[data-nt]');
      if (nb) { const box = nb.closest('.ntbox'), block = box.parentElement, k = box.dataset.k, a = nb.dataset.nt;
        if (a === 'edit') noteBox(block, card, k, true);
        else if (a === 'done') saveNote(card, block, k, box.querySelector('.nted'));
        else if (a === 'del') { if (confirm('刪除這則筆記？')) saveNote(card, block, k, null); }
        else noteBox(block, card, k, false);
        return; }
      if (card.classList.contains('nmode') && getSelection().isCollapsed && !e.target.closest('a, button, input, textarea, summary, label, .ntbox')) {
        const b = e.target.closest(BLK); if (b && card.querySelector('.body').contains(b)) { openNote(card, b); return; }
      }
      const mk = e.target.closest('mark.hl');
      if (mk && getSelection().isCollapsed) { cur = { card, mark: mk.dataset.h }; ensureBar(); bar.querySelector('[data-a="clear"]').hidden = false; place(mk.getBoundingClientRect()); return; }
      if (!e.target.closest('mark.hl') && cur && cur.mark) hide();
    });
  }

  // ---- 我的筆記頁 ----
  function page(k, root) {
    hide();
    const cards = subjCards(DATA[k]);
    const view = ST.ntview = ST.ntview || { f: 'all', c: '' };
    const draw = () => {
      const q = ($('#ntq', root) || {}).value ? $('#ntq', root).value.trim().toLowerCase() : '';
      let nh = 0, nn = 0;
      const items = cards.map(c => {
        let hs = (HL()[c.id] || []).slice().sort((a, b) => a.at - b.at), ns = Object.entries(NT()[c.id] || {}).map(([kk, d]) => d).sort((a, b) => a.at - b.at);
        if (view.f === 'note') hs = []; if (view.f === 'hl') ns = [];
        if (view.c) hs = hs.filter(h => h.c === view.c);
        if (q) { const inT = c.t.toLowerCase().includes(q); if (!inT) { hs = hs.filter(h => h.x.toLowerCase().includes(q)); ns = ns.filter(d => (d.t + ' ' + d.q).toLowerCase().includes(q)); } }
        nh += hs.length; nn += ns.length;
        if (!hs.length && !ns.length) return '';
        return `<article class="ntcard"><header><b>${c.t}</b><button type="button" class="ntbtn" data-jump="${c.id}">到卡片</button></header>
          ${hs.length ? `<ul class="nthl">${hs.map(h => `<li><mark class="hl hl-${h.c}">${escH(h.x)}</mark>${h.lost ? '<span class="ntlost">原文已更新</span>' : ''}</li>`).join('')}</ul>` : ''}
          ${ns.map(d => `<div class="ntitem"><p class="ntq">「${escH(d.q)}${d.q.length >= 80 ? '⋯' : ''}」${d.lost ? '<span class="ntlost">原文已更新</span>' : ''}</p><div class="ntt ntrich">${d.h || RICH.fromText(d.t)}</div></div>`).join('')}</article>`;
      }).join('');
      $('.ntlist', root).innerHTML = items || `<div class="win">${PIG('happy', 90)}<p>${q || view.c || view.f !== 'all' ? '沒有符合的重點或筆記。' : '還沒有重點或筆記。到「知識點」打開完整重點，選取文字就能畫重點；按卡片右上角的「＋筆記」就能在列點下面寫筆記。'}</p></div>`;
      $('.ntsum', root).textContent = `重點 ${nh}・筆記 ${nn}`;
      $$('[data-jump]', root).forEach(b => b.onclick = () => jumpCard(k, b.dataset.jump));
      $$('[data-f]', root).forEach(b => b.classList.toggle('on', b.dataset.f === view.f));
      $$('[data-fc]', root).forEach(b => b.classList.toggle('on', b.dataset.fc === view.c));
    };
    root.innerHTML = `<div class="ntpage"><p class="sm-p">在「知識點」的完整重點裡<b>選取文字</b>就能畫重點；按卡片右上角的<b>＋筆記</b>，再點任何一個列點就能寫筆記。全部都整理在這裡。</p>
      <div class="ntbar"><input type="search" id="ntq" placeholder="搜尋重點或筆記" aria-label="搜尋重點或筆記">
      <div class="uchips"><button type="button" class="uchip" data-f="all">全部</button><button type="button" class="uchip" data-f="hl">只看重點</button><button type="button" class="uchip" data-f="note">只看筆記</button></div>
      <div class="uchips">${COLORS.map(c => `<button type="button" class="uchip hlchip" data-fc="${c[0]}"><span class="hlc hl-${c[0]}"></span>${c[1]}</button>`).join('')}</div>
      <span class="sm-p ntsum"></span></div><div class="ntlist"></div></div>`;
    $('#ntq', root).addEventListener('input', draw);
    $$('[data-f]', root).forEach(b => b.onclick = () => { view.f = b.dataset.f; save(); draw(); });
    $$('[data-fc]', root).forEach(b => b.onclick = () => { view.c = view.c === b.dataset.fc ? '' : b.dataset.fc; save(); draw(); });
    draw();
  }

  return { mount, page, hide };
})();
