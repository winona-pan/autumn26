// ===== 單元 1 依學習順序分組：放在所有 d_re*.js 之後載入（卡片 id 不變，打勾進度保留） =====
(() => {
  const sec = DATA.re.sections[0];
  sec.groups = [
    { t:'先懂基本：不動產的權利與產權', d:'買房買的是哪些權利？所有權怎麼移轉、怎麼確認沒問題？', ids:['re1k', 're1m'] },
    { t:'房貸的法律結構：債務＋擔保', d:'一筆房貸＝本票（債）＋抵押（擔保）；台灣抵押權、lien theory、deed of trust。', ids:['re1a', 're1e', 're1f', 're1g'] },
    { t:'Lien：種類與順位', d:'Tax lien、judgment lien、mortgage lien 怎麼產生、誰先拿錢。', ids:['re1t', 're1n'] },
    { t:'抵押條款（Note／Mortgage 中的條款）', d:'先看總覽地圖，再依付款 → 保護擔保品 → 移轉與順位 → 違約與補救四類深入，最後做比較。', ids:['re1p', 're1h', 're1l', 're1q', 're1r', 're1s'] },
    { t:'違約與 Workout', d:'什麼是違約、為什麼違約（理性違約）、貸方怎麼減少損失：workout、交出房子、破產重整。', ids:['re1u', 're1v', 're1i', 're1w', 're1x'] },
    { t:'法拍與法拍之後', d:'法拍的種類與流程、claims 怎麼分、後順位與 HELOC、贖回權、不足額判決。', ids:['re1o', 're1y', 're1z', 're1za'] },
    { t:'美國 vs 台灣：對照整理', d:'課程以美國制度為主；這組把前面每個主題和台灣並排比較，並說明為什麼不一樣。', ids:['re1us1', 're1us2', 're1us3', 're1us4'] },
    { t:'延伸：各種房貸型態', d:'用前面的條款理解 wraparound、blanket、open-end 等特殊結構。', ids:['re1j'] },
    { t:'台灣的監理、稅制與證券化', d:'銀行法、央行信用管制、實價登錄與房地合一稅、證券化條例。', ids:['re1b', 're1c', 're1d'] }
  ];
  const by = Object.fromEntries(sec.cards.map(c => [c.id, c]));
  const ids = sec.groups.flatMap(g => g.ids);
  const miss = sec.cards.filter(c => !ids.includes(c.id)).map(c => c.id);
  if (miss.length) sec.groups.push({ t:'其他', d:'', ids:miss });
  sec.cards = sec.groups.flatMap(g => g.ids).map(id => by[id]);
})();
