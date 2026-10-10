// ===== 筆記與螢光筆：完整重點裡的每個列點都能寫筆記、選取文字畫重點 =====
// 存在 ST.hl（重點）與 ST.nt（筆記），設定頁的備份碼會一起帶走。
// 每個列點用「卡片 id + 列點文字的雜湊」當鑰匙；內容改版找不到原位置時，用存下來的原文片段重新定位。
const NOTES = (() => {
  const COLORS = [['y', '黃'], ['g', '綠'], ['p', '粉'], ['b', '藍']];
  const BLK = 'li, p, td, th, dd, h4, .ez';
  const HL = () => (ST.hl = ST.hl || {});
  const NT = () => (ST.nt = ST.nt || {});
  const BM = () => (ST.bm = ST.bm || {});
  // 刪除紀錄（同步時才知道「這筆是被刪掉的」，不會從另一台裝置又長回來）
  const tomb = k => { ST.del = ST.del || {}; ST.del[k] = Date.now(); };
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
  // ---- 筆記編輯列：顏色用固定色碼下指令，再把產生的 style 換成 class ----
  function tidyColors(ed) {
    ed.querySelectorAll('[style], font[color], font[size]').forEach(n => {
      const cc = RICH.colorCls(n), keep = (n.className || '').split(/\s+/).filter(c => c && !/^(tc|bg|fs)-/.test(c));
      if (n.hasAttribute('size') && !cc.some(c => c.startsWith('fs-'))) keep.push('fs-m');
      const rest = (n.getAttribute('style') || '').split(';').filter(x => x.trim() && !/^\s*(color|background(-color)?)\s*:/i.test(x)).join(';');
      if (rest) n.setAttribute('style', rest); else n.removeAttribute('style'); n.removeAttribute('color'); n.removeAttribute('size');
      const fin = [...new Set(keep.concat(cc))]; if (fin.length) n.className = fin.join(' '); else n.removeAttribute('class');
    });
  }
  function stripColor(ed, re) {
    // 預設色／移除底色：把選取範圍內的對應 class 拿掉
    const sel = getSelection(); if (!sel.rangeCount) return; const r = sel.getRangeAt(0);
    ed.querySelectorAll('[class]').forEach(n => { if (r.intersectsNode(n)) { n.className = n.className.split(/\s+/).filter(c => !re.test(c)).join(' '); if (!n.className) n.removeAttribute('class'); } });
  }
  function wireTools(box, ed) {
    const css = on => { try { document.execCommand('styleWithCSS', false, on); } catch (e) { } };
    const cmd = (c, v) => { ed.focus(); css(c === 'foreColor'); document.execCommand(c, false, v); css(false); tidyColors(ed); state(); };
    box.querySelectorAll('.nttools button').forEach(bt => bt.addEventListener('mousedown', e => e.preventDefault()));
    box.querySelectorAll('[data-fmt]').forEach(bt => bt.onclick = () => cmd(bt.dataset.fmt, null));
    // 字級：用 fontSize 指令（產生 <font size>），再換成 class；「中」= 拿掉字級
    box.querySelectorAll('[data-fs]').forEach(bt => bt.onclick = () => { ed.focus(); if (bt.dataset.fs === '3') { stripColor(ed, /^fs-/); return; } css(false); document.execCommand('fontSize', false, bt.dataset.fs); tidyColors(ed); state(); });
    box.querySelectorAll('[data-blk]').forEach(bt => bt.onclick = () => cmd('formatBlock', '<' + bt.dataset.blk + '>'));
    box.querySelectorAll('[data-tc]').forEach(bt => bt.onclick = () => { const c = bt.dataset.tc; if (c) cmd('foreColor', RICH.TC[c]); else { ed.focus(); stripColor(ed, /^tc-/); } });
    box.querySelectorAll('[data-bg]').forEach(bt => bt.onclick = () => { const c = bt.dataset.bg; if (c) { ed.focus(); css(true); if (!document.execCommand('hiliteColor', false, RICH.BG[c])) document.execCommand('backColor', false, RICH.BG[c]); css(false); tidyColors(ed); } else { ed.focus(); stripColor(ed, /^bg-/); } });
    // 游標所在的格式亮起來
    const state = () => { ['bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList'].forEach(c => { const b = box.querySelector(`[data-fmt="${c}"]`); if (b) { let on = false; try { on = document.queryCommandState(c); } catch (e) { } b.classList.toggle('on', on); } });
      let blk = ''; try { blk = (document.queryCommandValue('formatBlock') || '').toLowerCase(); } catch (e) { } box.querySelectorAll('[data-blk]').forEach(b => b.classList.toggle('on', blk === b.dataset.blk)); };
    // 圖片與公式
    let saved = null; const keepSel = () => { const sel = getSelection(); saved = sel.rangeCount && ed.contains(sel.anchorNode) ? sel.getRangeAt(0).cloneRange() : null; };
    const file = box.querySelector('.ntfile');
    box.querySelector('[data-ins="img"]').onclick = () => { keepSel(); file.click(); };
    file.onchange = async () => { if (file.files.length) await RICH.insertFiles(ed, file.files, saved); file.value = ''; };
    box.querySelector('[data-ins="tex"]').onclick = async () => {
      keepSel(); const t = prompt('輸入 LaTeX 公式（例：h^* = \\rho \\frac{\\sigma_S}{\\sigma_F}）。開頭加 $$ 會置中成獨立一行。'); if (!t || !t.trim()) return;
      const disp = /^\s*\$\$/.test(t), body = t.replace(/^\s*\$\$?|\$\$?\s*$/g, '');
      if (!(await RICH.insertTex(ed, body, disp, saved))) alert('公式排版需要網路（第一次使用時下載排版工具），請連上網路再試一次。');
    };
    ed.addEventListener('keyup', state); ed.addEventListener('mouseup', state); ed.addEventListener('input', () => tidyColors(ed));
    ed.addEventListener('keydown', e => { if (e.key === 'Tab') { e.preventDefault(); cmd(e.shiftKey ? 'outdent' : 'indent', null); } });
  }
  function noteBox(block, card, k, edit) {
    let box = [...block.children].find(x => x.classList.contains('ntbox'));
    const d = (NT()[cardId(card)] || {})[k];
    if (!d && !edit) { if (box) box.remove(); return; }
    if (!box) { box = document.createElement('span'); box.className = 'ntbox'; block.appendChild(box); }
    const html = d ? (d.h || RICH.fromText(d.t)) : '';
    box.innerHTML = edit
      ? `<span class="nthead">我的筆記<small>可以直接貼上 Gemini、ChatGPT 或網頁內容，格式會保留</small></span><span class="nttools" role="toolbar" aria-label="筆記格式">
        <span class="ntgrp"><button type="button" class="ntfb" data-blk="h4" title="大標題">大標</button><button type="button" class="ntfb" data-blk="h5" title="小標題">小標</button><button type="button" class="ntfb" data-blk="p" title="內文">內文</button><button type="button" class="ntfb" data-blk="blockquote" title="引用">引用</button></span>
        <span class="ntgrp"><button type="button" class="ntfb" data-fmt="bold" title="粗體（⌘/Ctrl+B）"><b>B</b></button><button type="button" class="ntfb" data-fmt="italic" title="斜體（⌘/Ctrl+I）"><i>I</i></button><button type="button" class="ntfb" data-fmt="underline" title="底線（⌘/Ctrl+U）"><u>U</u></button><button type="button" class="ntfb" data-fmt="strikeThrough" title="刪除線"><s>S</s></button></span>
        <span class="ntgrp"><span class="ntswl">字級</span><button type="button" class="ntfb" data-fs="2" title="小字" style="font-size:11px">小</button><button type="button" class="ntfb" data-fs="3" title="一般大小">中</button><button type="button" class="ntfb" data-fs="5" title="大字" style="font-size:15px">大</button><button type="button" class="ntfb" data-fs="6" title="特大字" style="font-size:17px">特大</button></span>
        <span class="ntgrp"><button type="button" class="ntfb" data-fmt="insertUnorderedList" title="圓點清單">• 清單</button><button type="button" class="ntfb" data-fmt="insertOrderedList" title="數字清單">1. 清單</button><button type="button" class="ntfb" data-fmt="outdent" title="往外縮">⇤</button><button type="button" class="ntfb" data-fmt="indent" title="往內縮">⇥</button></span>
        <span class="ntgrp ntsw"><span class="ntswl">文字</span>${Object.keys(RICH.TC).map(c => `<button type="button" class="ntdot tc-${c}" data-tc="${c}" aria-label="文字顏色"><span>A</span></button>`).join('')}<button type="button" class="ntdot" data-tc="" aria-label="預設文字顏色" title="預設顏色"><span>A</span></button></span>
        <span class="ntgrp ntsw"><span class="ntswl">底色</span>${Object.keys(RICH.BG).map(c => `<button type="button" class="ntdot bgdot bg-${c}" data-bg="${c}" aria-label="底色"></button>`).join('')}<button type="button" class="ntdot bgdot" data-bg="" aria-label="移除底色" title="移除底色">✕</button></span>
        <span class="ntgrp"><button type="button" class="ntfb" data-ins="img" title="插入圖片（也可以直接貼上或拖進來）">圖片</button><button type="button" class="ntfb" data-ins="tex" title="插入數學公式（LaTeX）">公式</button><input type="file" accept="image/*" multiple hidden class="ntfile"></span>
        <span class="ntgrp"><button type="button" class="ntfb" data-fmt="removeFormat" title="清除選取文字的格式">清除格式</button></span></span><div class="nted ntrich" contenteditable="true" role="textbox" aria-multiline="true" aria-label="筆記" data-ph="寫下你查到的補充、自己的理解、還不懂的地方⋯">${html}</div><span class="ntbtns"><button type="button" class="ntbtn" data-nt="done">完成</button>${d ? '<button type="button" class="ntbtn ghost" data-nt="del">刪除</button>' : '<button type="button" class="ntbtn ghost" data-nt="cancel">取消</button>'}</span>`
      : `<span class="nthead">我的筆記</span><div class="nttext ntrich">${html}</div><span class="ntbtns"><button type="button" class="ntbtn ghost" data-nt="edit">編輯</button></span>`;
    box.dataset.k = k; IMGS.hydrate(box);
    if (edit) {
      const ed = box.querySelector('.nted'); RICH.attach(ed);
      wireTools(box, ed);
      ed.focus(); const r = document.createRange(); r.selectNodeContents(ed); r.collapse(false); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    }
  }
  function saveNote(card, block, k, ed) {
    const id = cardId(card), all = NT();
    const h = ed ? RICH.clean(ed.innerHTML) : '', tmp = document.createElement('div'); tmp.innerHTML = h;
    // 純文字版（搜尋用）：直接從內容算，不依賴畫面是否顯示
    tmp.querySelectorAll('p, li, h4, h5, h6, tr, blockquote, pre, br').forEach(e => e.after(document.createTextNode('\n')));
    const text = tmp.textContent.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim(), has = text || tmp.querySelector('math, hr, table, img');
    if (has) { all[id] = all[id] || {}; const old = all[id][k]; all[id][k] = { t: text, h, q: norm(textOf(block)).slice(0, 80), at: old ? old.at : Date.now(), up: Date.now() }; }
    else if (all[id]) { if (all[id][k]) tomb('nt|' + id + '|' + k); delete all[id][k]; if (!Object.keys(all[id]).length) delete all[id]; }
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

  // ---- 書籤：「讀到這裡」可以插在某個列點或整張卡；每張卡最多一個 ----
  let SUBJ = '';
  function setBm(card, block) {
    const id = cardId(card), keys = keysOf(card), k = block ? keys.get(block) || '' : '';
    BM()[id] = { s: SUBJ, k, q: block ? norm(textOf(block)).slice(0, 80) : '', t: card.querySelector('header h4').textContent.trim(), at: Date.now() };
    save(); showBm(card); bmPill(); FUN.beep('ok'); FUN.toast && FUN.toast('已插書籤：讀到這裡', 'happy');
  }
  function rmBm(id) { if (BM()[id]) { tomb('bm|' + id); delete BM()[id]; save(); } const card = $('#c-' + id); if (card) showBm(card); bmPill(); }
  function showBm(card) {
    card.querySelectorAll('.bmk').forEach(x => x.classList.remove('bmk')); card.classList.remove('bmkcard');
    const d = BM()[cardId(card)], bt = card.querySelector('.bmbtn');
    if (bt) { bt.classList.toggle('on', !!d); bt.textContent = d ? '已插書籤' : '書籤'; bt.setAttribute('aria-pressed', !!d); }
    if (!d) return;
    let b = d.k ? blockByKey(card, d.k) : null;
    if (d.k && !b && d.q) for (const [bb, kk] of keysOf(card)) if (norm(textOf(bb)).startsWith(d.q.slice(0, 40))) { b = bb; d.k = kk; break; }
    if (b) b.classList.add('bmk'); else card.classList.add('bmkcard');
  }
  function jumpBm(id) {
    const d = BM()[id]; if (!d) return;
    const go2 = () => { const card = $('#c-' + id); if (!card) return; const det = card.querySelector('details'); if (det) det.open = true; const el = card.querySelector('.bmk') || card; window.scrollTo(0, Math.max(0, scrollY + el.getBoundingClientRect().top - innerHeight / 3)); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1600); };
    if (CUR[0] === d.s && CUR[1] === 'learn' && $('#c-' + id)) go2(); else { go(d.s, 'learn', { top: 1 }); setTimeout(go2, 120); }
  }
  const ago = t => { const m = Math.round((Date.now() - t) / 60000); return m < 1 ? '剛剛' : m < 60 ? m + ' 分鐘前' : m < 1440 ? Math.round(m / 60) + ' 小時前' : Math.round(m / 1440) + ' 天前'; };
  const bmsOf = s => Object.entries(BM()).filter(([id, d]) => d.s === s).sort((a, b) => b[1].at - a[1].at);
  // 知識點頁右下角的「書籤」按鈕與清單
  function bmPill() {
    let p = $('#bmpill'); const pane = $('#pane');
    if (!pane || !pane.querySelector('.learn')) { if (p) p.hidden = true; return; }
    const list = bmsOf(SUBJ);
    if (!p) { p = document.createElement('div'); p.id = 'bmpill'; p.className = 'bmpill'; document.body.appendChild(p);
      p.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.bmo) { p.classList.toggle('open'); return; }
        if (b.dataset.bmj) { p.classList.remove('open'); jumpBm(b.dataset.bmj); }
        if (b.dataset.bmd) { rmBm(b.dataset.bmd); } }); }
    p.hidden = !list.length;
    p.innerHTML = `<div class="bmlist" role="dialog" aria-label="書籤"><b>這科的書籤</b>${list.map(([id, d]) => `<div class="bmrow"><button type="button" class="bmgo" data-bmj="${id}"><span>${escH(d.t)}</span>${d.q ? `<small>「${escH(d.q.slice(0, 36))}${d.q.length > 36 ? '⋯' : ''}」</small>` : ''}<small>${ago(d.at)}</small></button><button type="button" class="ntbtn ghost" data-bmd="${id}" aria-label="移除書籤">移除</button></div>`).join('')}</div><button type="button" class="bmopen" data-bmo="1">書籤 ${list.length}</button>`;
  }

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
    hd.insertAdjacentHTML('beforeend', '<span class="ntside"><span class="ntcnt"></span><button type="button" class="bmbtn" aria-pressed="false" title="在這張卡插書籤；想插在某一點，選取那段文字後按工具列的「書籤」">書籤</button><button type="button" class="ntmode" aria-pressed="false" title="打開後，點任何一個列點就能寫筆記">＋筆記</button></span>');
  }

  // ---- 選取工具列（全頁共用一個） ----
  let bar = null, cur = null;
  function ensureBar() {
    if (bar) return bar;
    bar = document.createElement('div'); bar.className = 'hlbar'; bar.hidden = true; bar.setAttribute('role', 'toolbar'); bar.setAttribute('aria-label', '螢光筆');
    bar.innerHTML = COLORS.map(c => `<button type="button" class="hlc hl-${c[0]}" data-c="${c[0]}" aria-label="${c[1]}色螢光筆" title="${c[1]}色"></button>`).join('')
      + '<button type="button" class="hlb" data-a="note">筆記</button><button type="button" class="hlb" data-a="bm">書籤</button><button type="button" class="hlb" data-a="clear">移除重點</button>';
    bar.addEventListener('mousedown', e => e.preventDefault());
    bar.addEventListener('click', e => { const b = e.target.closest('button'); if (!b || !cur) return; b.dataset.c ? color(b.dataset.c) : b.dataset.a === 'note' ? noteFromBar() : b.dataset.a === 'bm' ? bmFromBar() : clear(); });
    document.body.appendChild(bar); return bar;
  }
  const hide = () => { if (bar) bar.hidden = true; cur = null; const p = $('#bmpill'); if (p && !($('#pane') && $('#pane').querySelector('.learn'))) p.hidden = true; };
  function place(rect) {
    ensureBar(); bar.hidden = false;
    const w = bar.offsetWidth, x = Math.min(Math.max(8, rect.left + rect.width / 2 - w / 2 + scrollX), scrollX + document.documentElement.clientWidth - w - 8);
    bar.style.left = x + 'px'; bar.style.top = (rect.bottom + scrollY + (matchMedia('(pointer: coarse)').matches ? 30 : 10)) + 'px';
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
    if (cur.mark) { list.filter(h => h.id === cur.mark).forEach(h => { h.c = c; h.up = Date.now(); }); }
    else cur.ps.forEach(([b, s, e]) => { const k = keys.get(b), x = textOf(b).slice(s, e); list.push({ id: uid(), k, s, e, c, x, at: Date.now() }); });
    save(); paint(card); badge(card); getSelection().removeAllRanges(); hide(); FUN.beep('ok');
  }
  function clear() {
    const { card } = cur; const id = cardId(card), keys = keysOf(card); let list = HL()[id] || [];
    const gone = h => { tomb('hl|' + h.id); return false; };
    if (cur.mark) list = list.filter(h => h.id !== cur.mark || gone(h));
    else cur.ps.forEach(([b, s, e]) => { const k = keys.get(b); list = list.filter(h => !(h.k === k && h.s < e && h.e > s) || gone(h)); });
    if (list.length) HL()[id] = list; else delete HL()[id];
    save(); paint(card); badge(card); getSelection().removeAllRanges(); hide();
  }
  function bmFromBar() { const { card } = cur; const b = cur.mark ? card.querySelector(`mark[data-h="${cur.mark}"]`).parentElement.closest(BLK) : cur.ps[0][0]; getSelection().removeAllRanges(); hide(); setBm(card, b); }
  function noteFromBar() { const { card } = cur; const b = cur.mark ? card.querySelector(`mark[data-h="${cur.mark}"]`).parentElement.closest(BLK) : cur.ps[0][0]; getSelection().removeAllRanges(); hide(); openNote(card, b); }

  // ---- 掛到知識點頁 ----
  let globalBound = false;
  function mount(key, root) {
    hide(); SUBJ = key;
    $$('.card', root).forEach(card => { decorate(card); paint(card); showNotes(card); badge(card); showBm(card); });
    bmPill();
    let t; const check = () => { clearTimeout(t); t = setTimeout(() => onSelect(root), 180); };
    root.addEventListener('mouseup', check); root.addEventListener('keyup', check); root.addEventListener('touchend', check);
    if (!globalBound) { globalBound = true;
      // 手機長按選取時不會觸發 mouseup，改聽 selectionchange
      let t2; document.addEventListener('selectionchange', () => { clearTimeout(t2); t2 = setTimeout(() => { const pane = $('#pane'); if (!pane || !pane.querySelector('.learn')) return; if (getSelection().isCollapsed) { if (cur && cur.sel) hide(); } else onSelect(pane); }, 350); });
      window.addEventListener('resize', hide); }
    root.addEventListener('click', e => {
      const card = e.target.closest('.card'); if (!card) return;
      const bb = e.target.closest('.bmbtn'); if (bb) { BM()[cardId(card)] ? rmBm(cardId(card)) : setBm(card, null); return; }
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
      const bms = bmsOf(k);
      $('.ntbms', root).innerHTML = bms.length && view.f !== 'hl' && view.f !== 'note' ? `<h3 class="nth3">書籤</h3>${bms.map(([id, d]) => `<div class="bmrow"><button type="button" class="bmgo" data-bmj="${id}"><span>${escH(d.t)}</span>${d.q ? `<small>「${escH(d.q.slice(0, 50))}${d.q.length > 50 ? '⋯' : ''}」</small>` : ''}<small>${ago(d.at)}</small></button></div>`).join('')}` : '';
      $$('[data-bmj]', root).forEach(b => b.onclick = () => jumpBm(b.dataset.bmj));
      IMGS.hydrate(root);
      $('.ntsum', root).textContent = `重點 ${nh}・筆記 ${nn}・書籤 ${bms.length}`;
      $$('[data-jump]', root).forEach(b => b.onclick = () => jumpCard(k, b.dataset.jump));
      $$('[data-f]', root).forEach(b => b.classList.toggle('on', b.dataset.f === view.f));
      $$('[data-fc]', root).forEach(b => b.classList.toggle('on', b.dataset.fc === view.c));
    };
    root.innerHTML = `<div class="ntpage"><p class="sm-p">在「知識點」的完整重點裡<b>選取文字</b>就能畫重點；按卡片右上角的<b>＋筆記</b>，再點任何一個列點就能寫筆記。全部都整理在這裡。</p>
      <div class="ntbar"><input type="search" id="ntq" placeholder="搜尋重點或筆記" aria-label="搜尋重點或筆記">
      <div class="uchips"><button type="button" class="uchip" data-f="all">全部</button><button type="button" class="uchip" data-f="hl">只看重點</button><button type="button" class="uchip" data-f="note">只看筆記</button></div>
      <div class="uchips">${COLORS.map(c => `<button type="button" class="uchip hlchip" data-fc="${c[0]}"><span class="hlc hl-${c[0]}"></span>${c[1]}</button>`).join('')}</div>
      <span class="sm-p ntsum"></span></div><div class="ntbms"></div><div class="ntlist"></div></div>`;
    $('#ntq', root).addEventListener('input', draw);
    $$('[data-f]', root).forEach(b => b.onclick = () => { view.f = b.dataset.f; save(); draw(); });
    $$('[data-fc]', root).forEach(b => b.onclick = () => { view.c = view.c === b.dataset.fc ? '' : b.dataset.fc; save(); draw(); });
    draw();
  }

  return { mount, page, hide, bmPill };
})();
