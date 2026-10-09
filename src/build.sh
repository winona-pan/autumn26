#!/bin/sh
cd "$(dirname "$0")"
{
  cat head.html
  echo '<header class="top"><div class="topin"><span class="brand" id="brand"><span class="brandt">26 秋季複習本</span></span><nav id="stabs" aria-label="科目"></nav><div id="hud"></div></div></header>'
  echo '<main id="main"></main>'
  echo '<script>'
  echo 'const DATA = {};'
  cat d_deriv.js d_invest.js d_law.js d_mgmt.js gen.js figs.js widgets.js formulas.js d_basic.js en.js games.js more.js fun.js pages.js app.js
  echo 'document.getElementById("brand").insertAdjacentHTML("afterbegin", PIG("happy", 34));'
  echo '</script>'
} > ../review.html
{ cat <<'HEAD'
<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#4f8ff7">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="複習本">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="apple-touch-icon" href="icons/icon-180.png">
<link rel="icon" type="image/png" sizes="32x32" href="icons/icon-32.png">
<link rel="manifest" href="manifest.webmanifest">
<style>body{margin:0}:root{padding-top:env(safe-area-inset-top,0px)}</style>
</head><body>
HEAD
cat ../review.html
echo "<script>if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(function(){});</script>"
echo "</body></html>"; } > ../index.html
