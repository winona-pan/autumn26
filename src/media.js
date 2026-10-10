// ===== 筆記圖片：壓縮後存在 IndexedDB（容量比 localStorage 大很多，不會擠到進度紀錄） =====
// 筆記內容只記 <img data-img="編號">，顯示時再從這裡取出。雲端同步時圖片另外上傳（見 sync.js）。
const IMGS = (() => {
  const DB = 'rv26media', OS = 'img', cache = new Map();
  let dbp = null;
  const db = () => dbp || (dbp = new Promise((res, rej) => { try { const r = indexedDB.open(DB, 1); r.onupgradeneeded = () => r.result.createObjectStore(OS); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); } catch (e) { rej(e); } }));
  const tx = (mode, fn) => db().then(d => new Promise((res, rej) => { const t = d.transaction(OS, mode); const st = t.objectStore(OS); const out = fn(st); t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error); }));
  const put = (id, data) => { cache.set(id, data); return tx('readwrite', st => st.put({ d: data, at: Date.now() }, id)); };
  const get = async id => { if (cache.has(id)) return cache.get(id); try { const v = await tx('readonly', st => st.get(id)); const d = v && v.d; if (d) cache.set(id, d); return d || null; } catch (e) { return null; } };
  const keys = () => tx('readonly', st => st.getAllKeys()).catch(() => []);
  const del = id => { cache.delete(id); return tx('readwrite', st => st.delete(id)).catch(() => { }); };
  const meta = id => tx('readonly', st => st.get(id)).then(v => v ? v.at : 0).catch(() => 0);
  const uid = () => 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  // 壓縮：最長邊 1400px，JPEG 品質 0.82（截圖文字仍清楚，一張約 100–300KB）
  async function compress(file) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
      const k = Math.min(1, 1400 / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
      const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL('image/jpeg', 0.82);
    } finally { URL.revokeObjectURL(url); }
  }
  async function add(file) { const data = await compress(file); const id = uid(); await put(id, data); return { id, data }; }

  // 把畫面上 <img data-img> 補上圖片
  function hydrate(root) { (root || document).querySelectorAll('img[data-img]:not([src])').forEach(async im => { const d = await get(im.dataset.img); if (d) im.src = d; else { im.alt = '圖片同步中或已遺失'; im.classList.add('missing'); } }); }

  // 點圖片放大
  document.addEventListener('click', e => {
    const im = e.target.closest('.ntrich img'); if (!im || im.closest('[contenteditable="true"]') || !im.src) return;
    const ov = document.createElement('div'); ov.className = 'imgview'; ov.innerHTML = `<img src="${im.src}" alt=""><button type="button" class="ntbtn" aria-label="關閉">關閉</button>`;
    const close = () => ov.remove(); ov.onclick = close; document.addEventListener('keydown', function k(ev) { if (ev.key === 'Escape') { close(); document.removeEventListener('keydown', k); } });
    document.body.appendChild(ov);
  });

  // 筆記裡用到的圖片編號
  function usedIds(st) { const s = new Set(); Object.values((st || ST).nt || {}).forEach(card => Object.values(card).forEach(d => (d.h || '').replace(/data-img="([a-z0-9]+)"/g, (m, id) => s.add(id)))); return s; }
  // 清掉 7 天以上沒被任何筆記用到的圖片
  async function gc() { try { const used = usedIds(); for (const id of await keys()) if (!used.has(id) && Date.now() - (await meta(id)) > 7 * 864e5) await del(id); } catch (e) { } }
  setTimeout(gc, 15000);

  return { add, get, put, keys, del, hydrate, usedIds };
})();
