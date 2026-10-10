// ===== 筆記的格式：貼上 Gemini／ChatGPT／網頁內容時保留粗體、列點、標題、表格、程式碼、數學式 =====
// 選取後 Ctrl/⌘+C 會帶 HTML → 清理後保留格式；用「複製」按鈕拿到的是 Markdown 純文字 → 轉成 HTML。
const RICH = (() => {
  const MML = 'http://www.w3.org/1998/Math/MathML';
  const KEEP = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'S', 'DEL', 'CODE', 'PRE', 'P', 'BR', 'UL', 'OL', 'LI', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'BLOCKQUOTE', 'A', 'SUB', 'SUP', 'HR', 'DIV', 'MARK', 'H4', 'H5', 'H6']);
  const HEAD = { H1: 'H4', H2: 'H4', H3: 'H4' };
  const MATH = new Set('math mrow mi mo mn ms mtext mspace msup msub msubsup mfrac msqrt mroot munder mover munderover mtable mtr mtd mstyle mpadded mphantom menclose semantics mfenced'.split(' '));
  const DROP = 'script, style, meta, link, title, head, noscript, iframe, object, embed, svg, img, video, audio, canvas, button, input, textarea, select, form, annotation, annotation-xml, template';
  const escT = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // ---- 清理 HTML：只留白名單標籤與少數安全屬性 ----
  function clean(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    // KaTeX（Gemini 的數學式）：保留裡面的 MathML，丟掉重複的排版用 HTML
    doc.querySelectorAll('.katex').forEach(k => { const m = k.querySelector('math'); k.replaceWith(m || doc.createTextNode(k.textContent)); });
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
        const st = n.getAttribute('style') || '';
        if (!KEEP.has(tag)) {
          // Google 文件等用 span＋樣式表示粗體、斜體
          if (/font-weight:\s*(bold|[6-9]00)/.test(st)) { const b = document.createElement('b'); walk(n, b); dst.appendChild(b); }
          else if (/font-style:\s*italic/.test(st)) { const i = document.createElement('i'); walk(n, i); dst.appendChild(i); }
          else walk(n, dst);
          continue;
        }
        if (tag === 'A' && !/^https?:\/\//i.test(n.getAttribute('href') || '')) { walk(n, dst); continue; }
        const el = document.createElement(tag);
        if (tag === 'A') { const h = n.getAttribute('href') || ''; if (/^https?:\/\//i.test(h)) { el.href = h; el.target = '_blank'; el.rel = 'noopener noreferrer'; } }
        if (tag === 'TD' || tag === 'TH') ['colspan', 'rowspan'].forEach(a => { const v = parseInt(n.getAttribute(a), 10); if (v > 1 && v < 50) el.setAttribute(a, v); });
        walk(n, el); dst.appendChild(el);
      }
    };
    walk(doc.body, out);
    // 去掉頭尾空段落
    const empty = e => e && e.nodeType === 1 && /^(P|DIV|BR)$/.test(e.tagName) && !e.textContent.trim() && !e.querySelector('math, hr');
    while (empty(out.firstChild)) out.firstChild.remove();
    while (empty(out.lastChild)) out.lastChild.remove();
    return out.innerHTML;
  }

  // ---- Markdown → HTML（標題、粗斜體、刪除線、行內程式碼、連結、清單（可巢狀）、表格、引用、程式碼區塊、分隔線） ----
  function inline(s) {
    const codes = []; s = s.replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = escT(s)
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\*\*\*(.+?)\*\*\*/g, '<b><i>$1</i></b>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/__(.+?)__/g, '<b>$1</b>')
      .replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?!\*)/g, '$1<i>$2</i>').replace(/(^|[^_\w])_(?!\s)(.+?)(?<!\s)_(?!\w)/g, '$1<i>$2</i>')
      .replace(/~~(.+?)~~/g, '<s>$1</s>');
    return s.replace(/\u0000(\d+)\u0000/g, (m, i) => '<code>' + escT(codes[+i]) + '</code>');
  }
  const cells = l => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
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
          if (!top || ind > top.ind) { const parent = top ? top.list.items[top.list.items.length - 1] : root; const list = { type, items: [] }; parent.kids.push(list); top = { ind, list, parent }; stack.push(top); }
          else if (top.list.type !== type) { const list = { type, items: [] }; top.parent.kids.push(list); top.list = list; }
          top.list.items.push({ text: inline(lm[3]), kids: [] });
        }
        const render = n => n.kids.map(list => `<${list.type}>` + list.items.map(it => `<li>${it.text}${render(it)}</li>`).join('') + `</${list.type}>`).join('');
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
  function fromClipboard(cd) {
    const html = cd.getData('text/html'), txt = cd.getData('text/plain');
    if (html) {
      const c = clean(html), plain = (new DOMParser().parseFromString(c, 'text/html').body.textContent || '');
      const structured = /<(ul|ol|table|h[4-6]|b|strong|i|em|pre|code|blockquote|math)[\s>]/i.test(c);
      // HTML 裡其實只是 Markdown 原文（例如從編輯器複製）→ 改用 Markdown 轉換
      if (txt && looksMd(txt) && (!structured || /\*\*[^*]+\*\*|(^|\n)#{1,6}\s/.test(plain))) return clean(md(txt));
      if (c.trim()) return c;
    }
    if (txt) return looksMd(txt) ? clean(md(txt)) : txt.split(/\n{2,}/).map(p => '<p>' + escT(p).replace(/\n/g, '<br>') + '</p>').join('');
    return '';
  }
  function insertHTML(html) {
    if (document.queryCommandSupported && document.queryCommandSupported('insertHTML') && document.execCommand('insertHTML', false, html)) return;
    const sel = getSelection(); if (!sel.rangeCount) return; const r = sel.getRangeAt(0); r.deleteContents();
    const frag = r.createContextualFragment(html); const last = frag.lastChild; r.insertNode(frag); if (last) { r.setStartAfter(last); r.collapse(true); sel.removeAllRanges(); sel.addRange(r); }
  }
  function attach(ed) {
    ed.addEventListener('paste', e => { const cd = e.clipboardData; if (!cd) return; e.preventDefault(); const h = fromClipboard(cd); if (h) insertHTML(h); });
    ed.addEventListener('drop', e => { const cd = e.dataTransfer; if (!cd) return; e.preventDefault(); const h = fromClipboard(cd); if (h) insertHTML(h); });
  }
  // 舊筆記（純文字）轉成 HTML
  const fromText = t => t.split(/\n{2,}/).map(p => '<p>' + escT(p).replace(/\n/g, '<br>') + '</p>').join('');
  return { clean, md, attach, fromText };
})();
