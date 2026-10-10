// ===== 單元：每一科的遊戲、打怪、練習題都能選單元；每個單元累積自己的等級 =====
// 選擇存在 ST.mu[科目]（遊戲、打怪、練習題共用）；單元點數存在 ST.ux[科目][單元]。
const UNITS = (() => {
  const short = s => s.t.replace(/（[^）]*）\s*$/, '').replace(/\s+[A-Za-z][A-Za-z &]*$/, '');
  const list = k => (DATA[k].sections || []).map(s => ({ id: s.id, t: short(s) }));
  const sel = k => { ST.mu = ST.mu || {}; const ids = new Set(list(k).map(u => u.id)); return new Set((ST.mu[k] || []).filter(id => ids.has(id))); };
  // 選了單元時：有標單元的內容只留選到的；沒有標單元的內容（少數）一律保留
  const inSel = (k, u) => { const s = sel(k); return !s.size || !u || s.has(u); };
  const filter = (k, arr, get) => arr.filter(x => inSel(k, get ? get(x) : x.u));

  // ---- 自動歸類：在各單元卡片的文字裡找這段內容 ----
  const idx = {};
  const strip2 = h => String(h || '').replace(/<[^>]+>/g, ' ').toLowerCase();
  function textOf(k) {
    if (idx[k]) return idx[k];
    return idx[k] = (DATA[k].sections || []).map(s => [s.id, s.cards.map(c => [c.t, c.en, c.plain, c.life, strip2(c.body), (c.terms || []).flat().join(' ')].join(' ')).join(' ').toLowerCase()]);
  }
  function tagText(k, phrases) {
    const ps = phrases.map(p => String(p || '').toLowerCase().replace(/[（(][^）)]*[）)]/g, ' ').trim()).flatMap(p => p.split(/[，、？?；;：:\/]|還是| vs\.? /)).map(p => p.trim()).filter(p => p.length >= 2);
    let best = null, top = 0;
    textOf(k).forEach(([id, txt]) => { let n = 0; ps.forEach(p => { if (txt.includes(p)) n += p.length > 3 ? 2 : 1; }); if (n > top) { top = n; best = id; } });
    return best;
  }
  function init() {
    for (const k of Object.keys(DATA)) {
      if (!DATA[k].sections) continue;
      (DATA[k].match || []).forEach(p => { if (!p.u) p.u = tagText(k, [p[0]]) || tagText(k, [p[1]]) || tagText(k, String(p[0]).split(/[\s\-]+/).filter(w => w.length >= 5)); });
      (DATA[k].sort || []).forEach(g => { if (!g.u) g.u = tagText(k, [g.t, ...g.b]); });
    }
    // 人工校正：自動判斷不準的
    (DATA.deriv.sort || []).forEach(g => { if (/期貨還是遠期/.test(g.t)) g.u = 'ch2'; });
    (DATA.deriv.problems || []).forEach(p => { const m = String(p.src).match(/(\d+)\.\d+/); if (m) p.u = 'ch' + m[1]; });
    (DATA.deriv.gens || []).forEach(g => { const m = String(g.base).match(/(?:^|\D)(\d)\.\d|Table (\d)|Ch\s*(\d)/i); if (m) g.u = 'ch' + (m[1] || m[2] || m[3]); });
    (DATA.invest.flash || []).forEach((f, i) => { f.u = i <= 7 ? 'i1' : i <= 19 ? 'i2' : i <= 21 ? 'i3' : 'i4'; });
  }
  const unitOfCard = (k, id) => { const s = (DATA[k].sections || []).find(s => s.cards.some(c => c.id === id)); return s && s.id; };

  // ---- 單元等級：Lv.2 要 30 點、Lv.3 要 90、Lv.4 要 180、Lv.5 要 300⋯⋯ ----
  const need = n => 15 * n * (n + 1);
  const lv = p => { let n = 1; while (p >= need(n)) n++; return n; };
  const pts = (k, u) => ((ST.ux || {})[k] || {})[u] || 0;
  function add(k, u, n) {
    if (!u || !n) return; ST.ux = ST.ux || {}; const o = ST.ux[k] = ST.ux[k] || {};
    const before = lv(o[u] || 0); o[u] = Math.max(0, (o[u] || 0) + n); const after = lv(o[u]); save();
    if (after > before) { const name = (list(k).find(x => x.id === u) || {}).t || ''; FUN.toast(`「${name}」升到 Lv.${after}！`, 'wow'); FUN.beep('up'); FUN.confetti(40); }
    $$(`.uchip[data-u="${u}"]`).forEach(b => paintChip(b, k, u));
  }
  function paintChip(b, k, u) {
    const p = pts(k, u), n = lv(p), lo = need(n - 1), hi = need(n);
    const lvEl = b.querySelector('.ulv'), bar = b.querySelector('.ubarx i');
    if (lvEl) lvEl.textContent = 'Lv.' + n; if (bar) bar.style.width = Math.round((p - lo) / (hi - lo) * 100) + '%';
    b.title = `單元等級 Lv.${n}（${p} 點，再 ${hi - p} 點升級）`;
  }

  // ---- 單元選擇列（遊戲、打怪、練習題共用） ----
  // count(u) 回傳這個單元有幾題（0 的單元不顯示）；onChange 在選擇改變時呼叫
  function picker(k, el, { count, total, label, onChange }) {
    const us = list(k).map(u => Object.assign(u, { n: count ? count(u.id) : 1 })).filter(u => u.n);
    const s = sel(k);
    el.innerHTML = `<div class="ubar"><span class="lbl">${label || '出題範圍（可多選，混合幾個單元一起玩）'}</span><div class="uchips"><button class="uchip" data-u="" type="button">全部混合${total != null ? ` <i>${total}</i>` : ''}</button>${us.map(u => `<button class="uchip" data-u="${u.id}" type="button"><span class="ut">${u.t}${count ? ` <i>${u.n}</i>` : ''}</span><span class="ulvw"><span class="ulv"></span><span class="ubarx"><i></i></span></span></button>`).join('')}</div></div>`;
    const paint = () => $$('.uchip', el).forEach(b => { const u = b.dataset.u, on = u ? s.has(u) : !s.size; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); if (u) paintChip(b, k, u); });
    $$('.uchip', el).forEach(b => b.onclick = () => { const u = b.dataset.u; if (!u) s.clear(); else s.has(u) ? s.delete(u) : s.add(u); ST.mu[k] = [...s]; save(); paint(); FUN.beep('ok'); onChange && onChange(); });
    paint();
  }
  const scopeText = (k, n, total) => sel(k).size ? `已選 ${sel(k).size} 個單元，共 ${n} 題（全部 ${total} 題）` : `全部單元混合，共 ${total} 題`;

  return { list, sel, inSel, filter, init, add, pts, lv, picker, unitOfCard, scopeText, tagText };
})();
UNITS.init();
