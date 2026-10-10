// ===== 筆記的格式：貼上 Gemini／ChatGPT／網頁內容時保留粗體、列點、標題、表格、程式碼、數學式 =====
// 選取後 Ctrl/⌘+C 會帶 HTML → 清理後保留格式；用「複製」按鈕拿到的是 Markdown 純文字 → 轉成 HTML。
const RICH = (() => {
  const MML = 'http://www.w3.org/1998/Math/MathML';
  const KEEP = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'S', 'DEL', 'CODE', 'PRE', 'P', 'BR', 'UL', 'OL', 'LI', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'BLOCKQUOTE', 'A', 'SUB', 'SUP', 'HR', 'DIV', 'MARK', 'H4', 'H5', 'H6']);
  const HEAD = { H1: 'H4', H2: 'H4', H3: 'H5' };
  const MATH = new Set('math mrow mi mo mn ms mtext mspace msup msub msubsup mfrac msqrt mroot munder mover munderover mtable mtr mtd mstyle mpadded mphantom menclose semantics mfenced'.split(' '));
  const DROP = 'script, style, meta, link, title, head, noscript, iframe, object, embed, svg, video, audio, canvas, button, input, textarea, select, form, annotation, annotation-xml, template';
  // 筆記可用的顏色：編輯時用這些色碼下指令，存檔時轉成 class（深色模式另有配色）
  const TC = { r: '#d1342f', o: '#d9730d', g: '#2e8b57', b: '#2b6cd4', v: '#7a4fd6', k: '#7d8597' };
  const BG = { y: '#ffe866', g: '#b8f0b0', p: '#ffc2dc', b: '#bfe0ff' };
  const hex = c => { if (!c) return ''; c = c.trim().toLowerCase(); let m = c.match(/^#([0-9a-f]{3})$/); if (m) return '#' + m[1].split('').map(x => x + x).join(''); if (/^#[0-9a-f]{6}$/.test(c)) return c; m = c.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/); return m ? '#' + [m[1], m[2], m[3]].map(x => (+x).toString(16).padStart(2, '0')).join('') : ''; };
  const find = (map, c) => { const h = hex(c); return Object.keys(map).find(k => map[k] === h); };
  function colorCls(n) {
    const out = new Set(((n.getAttribute('class') || '').match(/\b(tc|bg|fs)-[a-z]+\b/g) || []));
    const fsz = { 1: 's', 2: 's', 4: 'l', 5: 'l', 6: 'xl', 7: 'xl' }[n.getAttribute('size')]; if (fsz) out.add('fs-' + fsz);
    const st = n.getAttribute('style') || '';
    const fc = (st.match(/(?:^|;)\s*color:\s*([^;]+)/i) || [])[1] || n.getAttribute('color'); const t = find(TC, fc); if (t) out.add('tc-' + t);
    const bc = (st.match(/background(?:-color)?:\s*([^;]+)/i) || [])[1]; const b = find(BG, bc); if (b) out.add('bg-' + b);
    return [...out];
  }
  const escT = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // ---- 清理 HTML：只留白名單標籤與少數安全屬性 ----
  function clean(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    // KaTeX（Gemini 的數學式）：保留裡面的 MathML，丟掉重複的排版用 HTML
    // Gemini：公式元素帶著原始 LaTeX（data-math）→ 重新排成 MathML；沒有排版工具時保留 $…$ 原文
    doc.querySelectorAll('[data-math]').forEach(el => {
      const t = el.getAttribute('data-math'), disp = /math-block|display/.test(el.className) || el.tagName === 'DIV';
      const h = window.katex ? tex(t, disp) : null;
      if (h) { const box = doc.createElement(disp ? 'p' : 'span'); box.innerHTML = h; el.replaceWith(box); }
      else el.replaceWith(doc.createTextNode(disp ? '$$' + t + '$$' : '$' + t + '$'));
    });
    // 其他 KaTeX：優先用裡面的 MathML，其次用 LaTeX 原文註解
    doc.querySelectorAll('.katex').forEach(k => { const m = k.querySelector('math'); const an = k.querySelector('annotation[encoding="application/x-tex"]');
      if (m) k.replaceWith(m); else if (an && window.katex) { const sp = doc.createElement('span'); sp.innerHTML = tex(an.textContent, false) || ''; k.replaceWith(sp); } else k.replaceWith(doc.createTextNode(an ? '$' + an.textContent + '$' : k.textContent)); });
    // Gemini 介面元素：程式碼區塊的語言標籤與按鈕、表格的「匯出到試算表」、來源標註
    doc.querySelectorAll('code-block').forEach(cb => { const pre = cb.querySelector('pre'); cb.replaceWith(pre || doc.createTextNode(cb.textContent)); });
    doc.querySelectorAll('table-block').forEach(tb => { const t = tb.querySelector('table'); if (t) tb.replaceWith(t); });
    doc.querySelectorAll('.code-block-decoration, .table-footer, .export-sheets-button, [class*="export-sheets"], sources-carousel, source-footnote, sup[data-turn-source-index], .citation-chip, [data-turn-source-index], mat-icon, .cdk-visually-hidden').forEach(n => n.remove());
    doc.querySelectorAll(DROP).forEach(n => n.remove());
    const out = document.createElement('div');
    const walk = (src, dst) => {
      for (const n of [...src.childNodes]) {
        if (n.nodeType === 3) { dst.appendChild(document.createTextNode(n.data)); continue; }
        if (n.nodeType !== 1) continue;
        if (n.namespaceURI === MML || n.localName === 'math') {
          if (!MATH.has(n.localName)) { walk(n, dst); continue; }
          const m = document.createElementNS(MML, n.localName);
          ['display', 'mathvariant', 'stretchy', 'fence', 'separator', 'accent', 'lspace', 'rspace'].forEach(a => n.hasAttribute(a) && m.setAttribute(a, n.getAttribute(a)));
          walk(n, m); dst.appendChild(m); continue;
        }
        let tag = n.tagName.toUpperCase(); tag = HEAD[tag] || tag;
        if (tag === 'IMG') {
          // 自己的圖片只留編號（內容在 IndexedDB）；外部圖片只收 https
          const id = n.getAttribute('data-img'), src = n.getAttribute('src') || '';
          const im = document.createElement('img'); im.className = 'ntimg'; im.alt = '';
          if (id && /^[a-z0-9]+$/.test(id)) im.setAttribute('data-img', id);
          else if (/^https:\/\//i.test(src)) { im.src = src; im.referrerPolicy = 'no-referrer'; im.loading = 'lazy'; }
          else continue;
          dst.appendChild(im); continue;
        }
        const st = n.getAttribute('style') || '';
        if (tag === 'STRIKE') tag = 'S';
        const cc = colorCls(n);
        if (!KEEP.has(tag)) {
          // span／font 上的樣式（Google 文件、編輯器）轉成標籤：粗體、斜體、底線、刪除線、顏色
          const st = n.getAttribute('style') || ''; let top = null, inner = null;
          const add = el => { if (inner) inner.appendChild(el); else top = el; inner = el; };
          if (/font-weight:\s*(bold|[6-9]00)/i.test(st)) add(document.createElement('b'));
          if (/font-style:\s*italic/i.test(st)) add(document.createElement('i'));
          if (/text-decoration[^;]*underline/i.test(st)) add(document.createElement('u'));
          if (/text-decoration[^;]*line-through/i.test(st)) add(document.createElement('s'));
          if (cc.length) { const sp = document.createElement('span'); sp.className = cc.join(' '); add(sp); }
          if (top) { walk(n, inner); dst.appendChild(top); } else walk(n, dst);
          continue;
        }
        if (tag === 'A' && !/^https?:\/\//i.test(n.getAttribute('href') || '')) { walk(n, dst); continue; }
        const el = document.createElement(tag);
        if (tag === 'A') { const h = n.getAttribute('href') || ''; if (/^https?:\/\//i.test(h)) { el.href = h; el.target = '_blank'; el.rel = 'noopener noreferrer'; } }
        if (tag === 'OL') { const v = parseInt(n.getAttribute('start'), 10); if (v > 1 && v < 10000) el.setAttribute('start', v); }
        if (tag === 'LI') { const v = parseInt(n.getAttribute('value'), 10); if (v > 0 && v < 10000 && n.parentElement && n.parentElement.tagName === 'OL') el.setAttribute('value', v); }
        if (tag === 'TD' || tag === 'TH') ['colspan', 'rowspan'].forEach(a => { const v = parseInt(n.getAttribute(a), 10); if (v > 1 && v < 50) el.setAttribute(a, v); });
        if (cc.length && !/^(TABLE|THEAD|TBODY|TR|UL|OL|PRE|HR|BR)$/.test(tag)) el.className = cc.join(' ');
        walk(n, el); dst.appendChild(el);
      }
    };
    walk(doc.body, out);
    // 去掉頭尾空段落
    const empty = e => e && e.nodeType === 1 && /^(P|DIV|BR)$/.test(e.tagName) && !e.textContent.trim() && !e.querySelector('math, hr, img');
    out.querySelectorAll('p, div').forEach(e => { if (empty(e)) e.remove(); });
    while (empty(out.firstChild)) out.firstChild.remove();
    while (empty(out.lastChild)) out.lastChild.remove();
    return out.innerHTML;
  }

  // ---- Markdown → HTML（標題、粗斜體、刪除線、行內程式碼、連結、清單（可巢狀）、表格、引用、程式碼區塊、分隔線） ----
  function inline(s) {
    const codes = []; s = s.replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    // Markdown 跳脫字元（\$、\*、\_ ⋯）→ 原字元，且不再被當成格式符號
    const escs = []; s = s.replace(/\\([\\`*_{}\[\]()#+\-.!|~<>$])/g, (m, c) => { escs.push(c); return '\u0002' + (escs.length - 1) + '\u0002'; });
    s = escT(s)
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\*\*\*(.+?)\*\*\*/g, '<b><i>$1</i></b>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/__(.+?)__/g, '<b>$1</b>')
      .replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?!\*)/g, '$1<i>$2</i>').replace(/(^|[^_\w])_(?!\s)(.+?)(?<!\s)_(?!\w)/g, '$1<i>$2</i>')
      .replace(/~~(.+?)~~/g, '<s>$1</s>');
    return s.replace(/\u0000(\d+)\u0000/g, (m, i) => '<code>' + escT(codes[+i]) + '</code>').replace(/\u0002(\d+)\u0002/g, (m, i) => escT(escs[+i]));
  }
  const cells = l => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
  // ---- 數學式：$…$、$$…$$、\(…\)、\[…\] → 用 KaTeX 轉成 MathML（第一次需要網路，之後離線快取） ----
  let kp = null;
  const loadKatex = () => window.katex ? Promise.resolve(window.katex) : (kp || (kp = new Promise(res => {
    const sc = document.createElement('script'); sc.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js'; sc.crossOrigin = 'anonymous';
    const to = setTimeout(() => res(null), 8000); sc.onload = () => { clearTimeout(to); res(window.katex || null); }; sc.onerror = () => { clearTimeout(to); kp = null; res(null); };
    document.head.appendChild(sc);
  })));
  const hasMath = t => /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|(^|[^\\$\w])\$(?!\s)[^$\n]+?(?<!\s)\$(?![\w$])/.test(t);
  function tex(t, display) { try { return window.katex.renderToString(t.trim(), { output: 'mathml', displayMode: display, throwOnError: false }); } catch (e) { return null; } }
  // 把數學式換成佔位符，Markdown 轉完再換回（程式碼區塊與行內程式碼裡的 $ 不動）
  function stashMath(src, store) {
    if (!window.katex) return src;
    const put = (t, d, raw) => { const h = tex(t, d); if (!h) return raw; store.push(h); return (d ? '\n\n' : '') + '\u0001' + (store.length - 1) + '\u0001' + (d ? '\n\n' : ''); };
    return src.split(/(```[\s\S]*?```|`[^`\n]+`)/).map((seg, i) => i % 2 ? seg : seg
      .replace(/\$\$([\s\S]+?)\$\$/g, (m, t) => put(t, true, m))
      .replace(/\\\[([\s\S]+?)\\\]/g, (m, t) => put(t, true, m))
      .replace(/\\\(([\s\S]+?)\\\)/g, (m, t) => put(t, false, m))
      .replace(/(^|[^\\$\w])\$(?!\s)([^$\n]+?)(?<!\s)\$(?![\w$])/g, (m, pre, t) => pre + put(t, false, '$' + t + '$'))).join('');
  }
  const unstash = (html, store) => html.replace(/\u0001(\d+)\u0001/g, (m, i) => store[+i] || '').replace(/<p>\s*(<span class="katex-display">[\s\S]*?<\/span>|<span class="katex">[\s\S]*?<\/span>)\s*<\/p>/g, '<p>$1</p>');
  const mdMath = src => { const st = []; return unstash(md(stashMath(src, st)), st); };

  function md(src) {
    const L = src.replace(/\r\n?/g, '\n').split('\n'); let i = 0; const out = [];
    const isList = l => /^\s*([-*+]|\d+[.)])\s+/.test(l);
    while (i < L.length) {
      const l = L[i];
      if (!l.trim()) { i++; continue; }
      let m;
      if ((m = l.match(/^\s*```/))) { const buf = []; i++; while (i < L.length && !/^\s*```/.test(L[i])) buf.push(L[i++]); i++; out.push('<pre><code>' + escT(buf.join('\n')) + '</code></pre>'); continue; }
      if ((m = l.match(/^\s*(#{1,6})\s+(.*)$/))) { const n = m[1].length; out.push(`<${n <= 2 ? 'h4' : n === 3 ? 'h5' : 'h6'}>${inline(m[2].replace(/\s*#+\s*$/, ''))}</${n <= 2 ? 'h4' : n === 3 ? 'h5' : 'h6'}>`); i++; continue; }
      if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(l)) { out.push('<hr>'); i++; continue; }
      if (/\|/.test(l) && i + 1 < L.length && /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(L[i + 1])) {
        const head = cells(l); i += 2; const rows = [];
        while (i < L.length && /\|/.test(L[i]) && L[i].trim()) rows.push(cells(L[i++]));
        out.push('<table><thead><tr>' + head.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' + rows.map(r => '<tr>' + head.map((_, j) => `<td>${inline(r[j] || '')}</td>`).join('') + '</tr>').join('') + '</tbody></table>');
        continue;
      }
      if (/^\s*>/.test(l)) { const buf = []; while (i < L.length && /^\s*>/.test(L[i])) buf.push(L[i++].replace(/^\s*>\s?/, '')); out.push('<blockquote>' + md(buf.join('\n')) + '</blockquote>'); continue; }
      if (isList(l)) {
        // 用縮排建樹，支援巢狀清單；項目之間的空行不會打斷清單
        const root = { kids: [] }, stack = [];
        const nextNonBlank = j => { while (j < L.length && !L[j].trim()) j++; return j; };
        while (i < L.length) {
          let x = L[i];
          if (!x.trim()) { const j = nextNonBlank(i); if (j < L.length && (isList(L[j]) || (/^\s{2,}/.test(L[j]) && stack.length))) { i = j; continue; } break; }
          const lm = x.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
          if (!lm) { if (!(/^\s{2,}/.test(x) && stack.length)) break; const top = stack[stack.length - 1]; top.list.items[top.list.items.length - 1].text += '<br>' + inline(x.trim()); i++; continue; }
          i++;
          const ind = lm[1].replace(/\t/g, '    ').length, type = /\d/.test(lm[2]) ? 'ol' : 'ul';
          while (stack.length && ind < stack[stack.length - 1].ind) stack.pop();
          let top = stack[stack.length - 1];
          const num = type === 'ol' ? parseInt(lm[2], 10) : 0;
          if (!top || ind > top.ind) { const parent = top ? top.list.items[top.list.items.length - 1] : root; const list = { type, items: [], start: num }; parent.kids.push(list); top = { ind, list, parent }; stack.push(top); }
          else if (top.list.type !== type) { const list = { type, items: [], start: num }; top.parent.kids.push(list); top.list = list; }
          top.list.items.push({ text: inline(lm[3]), kids: [] });
        }
        const render = n => n.kids.map(list => `<${list.type}${list.start > 1 ? ` start="${list.start}"` : ''}>` + list.items.map(it => `<li>${it.text}${render(it)}</li>`).join('') + `</${list.type}>`).join('');
        out.push(render(root)); continue;
      }
      const buf = [];
      while (i < L.length && L[i].trim() && !isList(L[i]) && !/^\s*(#{1,6}\s|```|>)/.test(L[i]) && !(/\|/.test(L[i]) && i + 1 < L.length && /^\s*\|?\s*:?-{2,}/.test(L[i + 1]))) buf.push(inline(L[i++].trim()));
      out.push('<p>' + buf.join('<br>') + '</p>');
    }
    return out.join('');
  }

  // ---- 貼上：判斷用 HTML、Markdown 還是純文字 ----
  const looksMd = t => /(^|\n)\s{0,3}(#{1,6}\s|[-*+]\s+\S|\d+[.)]\s+\S|>\s|```)|\*\*[^*\n]+\*\*|\n\s*\|.*\|\s*\n\s*\|?\s*:?-{2,}/.test(t);
  // 先在事件當下把剪貼簿內容讀出來（之後就讀不到了），再非同步處理
  function readClip(cd) { return { html: cd.getData('text/html'), txt: cd.getData('text/plain'), files: [...(cd.files || [])].filter(f => /^image\//.test(f.type)) }; }
  async function convert({ html, txt, files, plain }) {
    if (plain) return txt ? txt.split(/\n{2,}/).map(p => '<p>' + escT(p).replace(/\n/g, '<br>') + '</p>').join('') : '';
    if (files.length && (!html || !/<(p|li|h\d|table|b|strong)[\s>]/i.test(html))) {
      // 純圖片（截圖、相簿、拖曳）→ 壓縮存起來
      const out = []; for (const f of files) { try { const { id, data } = await IMGS.add(f); out.push(`<img class="ntimg" data-img="${id}" src="${data}" alt="">`); } catch (e) { } }
      return out.map(x => '<p>' + x + '</p>').join('');
    }
    if ((txt && hasMath(txt)) || (html && /data-math=|class="katex|<annotation/.test(html))) await loadKatex();
    if (html) {
      const c = clean(html), plain = (new DOMParser().parseFromString(c, 'text/html').body.textContent || '');
      const structured = /<(ul|ol|table|h[4-6]|b|strong|i|em|pre|code|blockquote|math)[\s>]/i.test(c);
      // HTML 裡其實只是 Markdown 原文（例如從編輯器複製）→ 改用 Markdown 轉換
      if (txt && looksMd(txt) && (!structured || /\*\*[^*]+\*\*|(^|\n)#{1,6}\s/.test(plain))) return clean(mdMath(txt));
      // HTML 裡還留著 $…$ 原文（沒有排版好的公式）→ 也用 Markdown 路線把公式排出來
      if (txt && hasMath(plain) && !/<math[\s>]/i.test(c) && window.katex) return clean(mdMath(txt));
      if (c.trim()) return c;
    }
    if (txt) return (looksMd(txt) || hasMath(txt)) ? clean(mdMath(txt)) : txt.split(/\n{2,}/).map(p => '<p>' + escT(p).replace(/\n/g, '<br>') + '</p>').join('');
    return '';
  }
  function insertHTML(html) {
    if (document.queryCommandSupported && document.queryCommandSupported('insertHTML') && document.execCommand('insertHTML', false, html)) return;
    const sel = getSelection(); if (!sel.rangeCount) return; const r = sel.getRangeAt(0); r.deleteContents();
    const frag = r.createContextualFragment(html); const last = frag.lastChild; r.insertNode(frag); if (last) { r.setStartAfter(last); r.collapse(true); sel.removeAllRanges(); sel.addRange(r); }
  }
  let plainNext = false;
  function attach(ed) {
    ed.addEventListener('keydown', e => { if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'v' || e.key === 'V')) { plainNext = true; setTimeout(() => plainNext = false, 1000); } });
    const run = async (data, range) => { ed.classList.add('busy'); try { const h = await convert(data); if (h) { ed.focus(); const sel = getSelection(); if (!range || !ed.contains(range.startContainer)) { range = document.createRange(); range.selectNodeContents(ed); range.collapse(false); } sel.removeAllRanges(); sel.addRange(range); insertHTML(h); ed.dispatchEvent(new Event('input', { bubbles: true })); } } finally { ed.classList.remove('busy'); } };
    const keep = () => { const sel = getSelection(); return sel.rangeCount && ed.contains(sel.anchorNode) ? sel.getRangeAt(0).cloneRange() : null; };
    ed.addEventListener('paste', e => { const cd = e.clipboardData; if (!cd) return; e.preventDefault(); const d = readClip(cd);
      try { sessionStorage.setItem('rv26lastpaste', JSON.stringify({ html: d.html.slice(0, 200000), txt: d.txt.slice(0, 50000), at: Date.now() })); } catch (err) { }
      if (plainNext) { plainNext = false; d.html = ''; d.plain = true; }
      run(d, keep()); });
    ed.addEventListener('drop', e => { const cd = e.dataTransfer; if (!cd) return; e.preventDefault(); let r = null; if (document.caretRangeFromPoint) r = document.caretRangeFromPoint(e.clientX, e.clientY); run(readClip(cd), r || keep()); });
  }
  // 插入圖片（檔案選擇器／相機）與公式
  async function insertFiles(ed, files, range) { const h = await convert({ html: '', txt: '', files: [...files] }); if (h) { ed.focus(); if (range) { const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range); } insertHTML(h); ed.dispatchEvent(new Event('input', { bubbles: true })); } }
  async function insertTex(ed, t, display, range) { if (!(await loadKatex())) return false; const h = tex(t, display); if (!h) return false; ed.focus(); if (range) { const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range); } insertHTML(clean(h) + '&nbsp;'); ed.dispatchEvent(new Event('input', { bubbles: true })); return true; }
  // 舊筆記（純文字）轉成 HTML
  const fromText = t => t.split(/\n{2,}/).map(p => '<p>' + escT(p).replace(/\n/g, '<br>') + '</p>').join('');
  return { clean, md, mdMath, attach, insertFiles, insertTex, loadKatex, fromText, TC, BG, colorCls };
})();
