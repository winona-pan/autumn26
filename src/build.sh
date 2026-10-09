#!/bin/sh
cd "$(dirname "$0")"
{
  cat head.html
  echo '<header class="top"><div class="topin"><span class="brand">26 秋季複習本<small>AUTUMN 2026</small></span><nav id="stabs" aria-label="科目"></nav></div></header>'
  echo '<main id="main"></main>'
  echo '<script>'
  echo 'const DATA = {};'
  cat d_deriv.js d_invest.js d_law.js d_mgmt.js gen.js figs.js widgets.js app.js
  echo '</script>'
} > ../review.html
{ echo "<!doctype html><html lang=\"zh-Hant\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"></head><body>"; cat ../review.html; echo "</body></html>"; } > ../index.html
