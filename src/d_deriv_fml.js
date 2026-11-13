// ===== 衍金 公式標注：每題（考古、變化題、課本習題）標出用到的公式；大抄加「照單元抄」，依使用次數自動打星 =====
(() => {
  const s = x => `<sub>${x}</sub>`, p = x => `<sup>${x}</sup>`;
  // key: [單元, 公式（要抄的內容）]
  const FM = {
    // Ch1
    payoff: ['ch1', `Payoff：long forward S${s('T')} − K；long call max(S${s('T')} − K, 0)；long put max(K − S${s('T')}, 0)；profit = payoff − 權利金；損益兩平 call K + c、put K − p`],
    // Ch2
    mloss: ['ch2', `可虧額度 = (原始保證金 − 維持保證金) × 口數；總規模 = 口數 × 每口數量`],
    mcall: ['ch2', `追繳價：long = F${s(0)} − 可虧額度 ÷ 總規模；short = F${s(0)} + 可虧額度 ÷ 總規模`],
    mwd: ['ch2', `可提領 X：long 價格 ≥ F${s(0)} + X ÷ 總規模；short 價格 ≤ F${s(0)} − X ÷ 總規模`],
    mtop: ['ch2', `被追繳要補回<b>原始</b>保證金：補繳 = 原始保證金 − 帳戶餘額`],
    mcm: ['ch2', `結算所會員（只有原始保證金）：要補 = 新口數 × 原始保證金 − 舊部位當日獲利 + 新部位當日虧損`],
    oi: ['ch2', `ΔOI = 買方開倉 − 賣方平倉 = 賣方開倉 − 買方平倉`],
    fxq: ['ch2', `直接 ↔ 間接報價：每 1 外幣多少美元 = 1 ÷（每 1 美元多少外幣）`],
    // Ch3
    hstar: ['ch3', `h* = ρ · σ${s('S')} / σ${s('F')}（ρ = 1 才是完美避險）`],
    nstar: ['ch3', `N* = h* · Q${s('A')} / Q${s('F')}（四捨五入到整數口；h = 1 時就是 Q${s('A')} / Q${s('F')}）`],
    tail: ['ch3', `Tailing：N* = h* · V${s('A')} / V${s('F')}（V = 價格 × 數量）`],
    qloss: ['ch3', `「每漲 1 美分虧 X」→ 曝險量 Q${s('A')} = X ÷ 0.01`],
    beta0: ['ch3', `股票組合避險：N* = β · V${s('A')} / V${s('F')}，V${s('F')} = 期貨價格 × 乘數`],
    betaadj: ['ch3', `調 β：N = (β* − β) · V${s('A')} / V${s('F')}（正 long、負 short）`],
    basis: ['ch3', `基差 b = S − F；避險後實際價格 = F${s(1)} + b${s(2)}（short 是賣價、long 是買價）`],
    basisdir: ['ch3', `基差變強（b 變大）→ short hedger 變好、long hedger 變差；變弱相反`],
    // Ch4
    rc: ['ch4', `R${s('c')} = m · ln(1 + R${s('m')}/m)；R${s('m')} = m · (e${p(`R${s('c')}/m`)} − 1)`],
    rr: ['ch4', `由終值反推：(1 + R${s('m')}/m)${p('mT')} = FV/PV；連續複利 R${s('c')} = ln(FV/PV) / T`],
    fwd: ['ch4', `遠期利率 R${s('F')} = (R${s(2)}T${s(2)} − R${s(1)}T${s(1)}) / (T${s(2)} − T${s(1)})（連續複利）`],
    fra: ['ch4', `FRA（收固定 R${s('K')}）：V = L(R${s('K')} − R${s('F')})(T${s(2)} − T${s(1)})e${p(`−R${s(2)}T${s(2)}`)}；R${s('F')} 先換成和 R${s('K')} 同一種複利`],
    bondz: ['ch4', `債券（零息利率）：B = Σ c${s('i')}e${p(`−R${s('i')}t${s('i')}`)}`],
    bondy: ['ch4', `債券（連續複利殖利率）：B = Σ c${s('i')}e${p(`−yt${s('i')}`)}`],
    bondm: ['ch4', `債券（m 次複利）：B = Σ c${s('i')} / (1 + y/m)${p(`mt${s('i')}`)}；年複利 m = 1`],
    boot: ['ch4', `拔靴：價格 − 前面各期票息折現 = 最後一筆 × 折現因子 → 解出最後一期零息利率`],
    dur: ['ch4', `存續期間 D = Σ t${s('i')} · PV${s('i')} / B`],
    dB: ['ch4', `ΔB ≈ −B · D · Δy（Δy 用小數）；y 為 m 次複利改用 D* = D / (1 + y/m)`],
    conv: ['ch4', `凸性：ΔB/B ≈ −D·Δy + ½·C·(Δy)${p(2)}，C = Σ t${s('i')}${p(2)}c${s('i')}e${p(`−yt${s('i')}`)} / B`],
    par: ['ch4', `平價收益率：c = (100 − 100d) · m / A（d = 最後一期折現因子、A = 各期折現因子總和）`],
    // Ch5
    f0: ['ch5', `無收益：F${s(0)} = S${s(0)}e${p('rT')}`],
    f0i: ['ch5', `已知現金收益：F${s(0)} = (S${s(0)} − I)e${p('rT')}，I = Σ D${s('i')}e${p(`−rt${s('i')}`)}（只算到期前的股利）`],
    f0q: ['ch5', `已知收益率 q：F${s(0)} = S${s(0)}e${p('(r − q)T')}（q 每段不同時用時間加權平均）`],
    f0fx: ['ch5', `外匯：F${s(0)} = S${s(0)}e${p(`(r − r${s('f')})T`)}（S${s(0)} = 每 1 外幣多少本國幣）`],
    rfinv: ['ch5', `反推外國利率：r${s('f')} = r − ln(F${s(0)}/S${s(0)}) / T`],
    f0u: ['ch5', `商品：F${s(0)} ≤ (S${s(0)} + U)e${p('rT')}（U = 儲存成本現值）；比例 u：S${s(0)}e${p('(r + u)T')}`],
    fv: ['ch5', `遠期價值：long f = (F${s(0)} − K)e${p('−rT')}；無收益 f = S${s(0)} − Ke${p('−rT')}；簽約時 K = F${s(0)} → 0`],
    fvi: ['ch5', `收益 I：long f = S${s('t')} − I − Ke${p('−r(T − t)')}；short 加負號（I 只算還沒發的）`],
    fvq: ['ch5', `收益率 q：long f = S${s('t')}e${p('−q(T − t)')} − Ke${p('−r(T − t)')}`],
    arb: ['ch5', `套利：市價 &gt; 理論 → short 期貨 ＋ 借錢買現貨；市價 &lt; 理論 → long 期貨 ＋ 賣現貨存錢；外匯太便宜 → 借外幣、換本國幣存、long；利潤 ≈ |市價 − 理論|`],
    // Ch7
    gain: ['ch7', `比較利益：總利益 = |利差${s('市場1')} − 利差${s('市場2')}|，扣銀行後依題目分；各借有比較利益的那種`],
    net: ['ch7', `淨成本 = 原借款 ＋ 交換的兩筆（收 +、付 −）；目標成本 = 自己直接借的利率 − 省下的`],
    irs: ['ch7', `利率交換（付固定方）V = Σ (浮動 − 固定) · L · Δt · e${p('−rt')}；浮動用遠期利率，已定的那期用已知利率`],
    ccs: ['ch7', `貨幣交換（收外幣、付本國幣）：V = S${s(0)}B${s('F')} − B${s('D')}；付外幣加負號；本金到期要算`],
    ccsf: ['ch7', `貨幣交換遠期法：F${s('t')} = S${s(0)}e${p(`(r − r${s('f')})t`)}，每期外幣 × F${s('t')} − 本國幣，再折現加總`],
    mm: ['ch7', `造市者：bid = 它付的固定、ask = 它收的固定；你付固定用 ask、收固定用 bid`]
  };
  const UNIT = { ch1: 'Ch1 衍生性商品入門', ch2: 'Ch2 期貨市場', ch3: 'Ch3 用期貨避險', ch4: 'Ch4 利率', ch5: 'Ch5 遠期與期貨價格', ch7: 'Ch7 交換' };

  // 計算機按法：只有用到特殊按鍵（2nd LN、ICONV、TVM、CF/NPV、STO/RCL、y^x）的公式才寫
  const kk = str => str.replace(/\[([^\]]+)\]/g, (_, g) => g.split(' ').map(k => `<kbd>${k.replace(/_/g, ' ')}</kbd>`).join(' '));
  const KEY = {
    rc: ['R<sub>c</sub>：R<sub>m</sub> [÷] m [+] 1 [=] [LN] [×] m [=]', 'R<sub>m</sub>：R<sub>c</sub> [÷] m [=] [2nd LN] [−] 1 [=] [×] m [=]', '年有效：[2nd ICONV] NOM [ENTER] [↓] [↓] C/Y [ENTER] [↑] [CPT] → EFF', 'm₁ 次換 m₂ 次：先照上面 [CPT] 出 EFF，再 [↓] 改 C/Y = m₂ [ENTER]，[↑] [↑] 到 NOM [CPT]'],
    rr: ['m 次：[2nd CLR_TVM] mT [N] PV [+/−] [PV] 0 [PMT] FV [FV] [CPT] [I/Y] → 每期 %，再 [×] m', '連續：FV [÷] PV [=] [LN] [÷] T [=]'],
    fra: ['差額 (R<sub>K</sub> − R<sub>F</sub>) × L × Δt 先算好 [STO] 1；R<sub>2</sub> [×] T<sub>2</sub> [=] [+/−] [2nd LN] [×] [RCL] 1 [=]'],
    bondz: ['每筆：R<sub>i</sub> [×] t<sub>i</sub> [=] [+/−] [2nd LN] [×] c<sub>i</sub> [=]；第一筆 [STO] 1，之後 [STO] [+] 1，最後 [RCL] 1'],
    bondy: ['每期有效 I：年付息 y [2nd LN] [−] 1 [=] [×] 100 [=]（半年付息用 y/2）', '[CF] [2nd CLR_WORK] 0 [ENTER] [↓] 票息 [ENTER] [↓] 次數 [ENTER] [↓] 最後一筆（含本金）[ENTER] [NPV] I [ENTER] [↓] [CPT] → B', '也可以用 bondz 的 [STO] [+] 1 逐筆累加'],
    bondm: ['整數期：[2nd CLR_TVM] 期數 [N] y/m×100 [I/Y] 每期票息 [PMT] 100 [FV] [CPT] [PV]（負號是付出）', '不是整數期：c [÷] (1 + y) [y^x] t [=]，用 [STO] [+] 1 累加'],
    boot: ['m 次：最後一筆 [÷] 剩下的錢 [=] [y^x] 期數 [1/x] [=] [−] 1 [=] [×] m [=]', '連續：最後一筆 [÷] 剩下的錢 [=] [LN] [÷] T [=]'],
    dur: ['用 bondy 的 CF 表，把每筆改成 t × c（例：8、16、24、32、540）再 [NPV] [CPT] → Σ t·PV，[÷] B [=]'],
    conv: ['同一個 CF 表把每筆改成 t² × c，[NPV] [CPT] 後 [÷] B'],
    f0: ['r [×] T [=] [2nd LN] [×] S<sub>0</sub> [=]'],
    f0i: ['I：每筆 r [×] t [=] [+/−] [2nd LN] [×] D [=]，[STO] 1 / [STO] [+] 1', 'S<sub>0</sub> [−] [RCL] 1 [=] [STO] 2；r [×] T [=] [2nd LN] [×] [RCL] 2 [=]'],
    f0q: ['[(] r [−] q [)] [×] T [=] [2nd LN] [×] S<sub>0</sub> [=]（括號一定要加）'],
    f0fx: ['[(] r [−] r<sub>f</sub> [)] [×] T [=] [2nd LN] [×] S<sub>0</sub> [=]'],
    rfinv: ['F<sub>0</sub> [÷] S<sub>0</sub> [=] [LN] [÷] T [=] [STO] 1；r [−] [RCL] 1 [=]'],
    f0u: ['U：每筆儲存成本 r [×] t [=] [+/−] [2nd LN] [×] 成本 [=]，[STO] [+] 1 累加', '[RCL] 1 [+] S<sub>0</sub> [=] [STO] 2；r [×] T [=] [2nd LN] [×] [RCL] 2 [=]'],
    fv: ['r [×] T [=] [+/−] [2nd LN] [×] K [=] [STO] 1；S<sub>0</sub> [−] [RCL] 1 [=]'],
    fvi: ['I 照 f0i 存 [STO] 1；r [×] (T − t) [=] [+/−] [2nd LN] [×] K [=] [STO] 2；S<sub>t</sub> [−] [RCL] 1 [−] [RCL] 2 [=]'],
    fvq: ['q [×] (T − t) [=] [+/−] [2nd LN] [×] S<sub>t</sub> [=] [STO] 1；r [×] (T − t) [=] [+/−] [2nd LN] [×] K [=] [STO] 2；[RCL] 1 [−] [RCL] 2 [=]'],
    irs: ['每期淨額 (浮動 − 固定) × L × Δt 先算，[×] 折現因子（r [×] t [=] [+/−] [2nd LN]），[STO] [+] 1 累加，最後 [RCL] 1'],
    ccs: ['B<sub>D</sub> 逐筆折現存 [STO] 1、B<sub>F</sub> 存 [STO] 2；[RCL] 2 [×] S<sub>0</sub> [−] [RCL] 1 [=]（報價是「每 1 本國幣幾外幣」就改成 [÷]）'],
    ccsf: ['F<sub>t</sub>：[(] r [−] r<sub>f</sub> [)] [×] t [=] [2nd LN] [×] S<sub>0</sub> [=]；每期淨額再折現，[STO] [+] 1 累加']
  };
  Object.keys(KEY).forEach(k => { if (!FM[k]) throw new Error('KEY 沒有對應公式 ' + k); });
  const keyHtml = k => KEY[k] ? `<div class="fkey">🧮 ${KEY[k].map(kk).join('<br>')}</div>` : '';

  // 每題用到的公式
  const USE = {
    p2_1: 'mloss mcall', p2_7: 'mloss mcall mwd', p2_24: 'mloss mcall mwd', p2_11: 'mcm', p2_13: 'fxq', p2_19: 'nstar', p2_23: 'oi',
    p3_3: 'hstar', p3_4: 'beta0 betaadj', p3_10: 'hstar', p3_11: 'basis', p3_15: 'beta0', p3_23: 'hstar qloss nstar', p3_7: 'basis basisdir',
    p3_13: 'hstar nstar', p3_25: 'betaadj', p3_21: 'basis basisdir', p3_22: 'hstar nstar tail',
    p4_1: 'rc', p4_8: 'rc', p4_9: 'rc', p4_3: 'rr rc', p4_4: 'fwd', p4_13: 'fwd', p4_5: 'fwd rc fra', p4_10: 'bondz', p4_2: 'bondm boot', p4_18: 'bondy dur dB',
    p5_2: 'f0', p5_7: 'f0 fv', p5_3: 'f0q', p5_8: 'f0q', p5_9: 'f0q', p5_10: 'f0q arb', p5_12: 'f0fx arb', p5_22: 'f0fx arb', p5_5: 'f0fx',
    p5_13: 'f0u', p5_25: 'f0u', p5_23: 'f0q', p5_24: 'f0fx rfinv', p5_30: 'f0i fvi',
    p7_1: 'gain net', p7_3: 'gain net', p7_22: 'gain net', p7_2: 'irs', p7_19: 'mm net',
    x1: 'gain net', v1a: 'gain net', v1b: 'gain net', x2: 'ccs bondm', v2a: 'ccs bondm', v2b: 'ccs ccsf bondy',
    x3: 'f0i fvi', v3a: 'f0i fvi', v3b: 'f0q fvq', x4: 'f0fx arb', v4a: 'f0fx arb', v4b: 'f0fx arb',
    x5: 'bondy dur dB', v5a: 'bondy dur dB', v5b: 'bondy dur dB',
    x6: 'hstar qloss nstar', v6a: 'hstar qloss nstar', v6b: 'hstar nstar', x7: 'basis basisdir', v7a: 'basis basisdir', v7b: 'basis basisdir',
    x8: 'mloss mcall mwd', v8a: 'mloss mcall mwd', v8b: 'mloss mcall mtop', x9: 'oi', v9a: 'oi', v9b: 'oi',
    x10: 'beta0 betaadj', v10a: 'beta0 betaadj', v10b: 'beta0 betaadj'
  };

  // 統計：考古原題、變化題、課本習題各用幾次
  const cnt = {};
  Object.keys(FM).forEach(k => cnt[k] = { x: 0, v: 0, p: 0 });
  Object.entries(USE).forEach(([id, ks]) => ks.split(' ').forEach(k => { if (!cnt[k]) throw new Error('未知公式 ' + k); cnt[k][id[0]]++; }));
  const lv = k => { const c = cnt[k]; return c.x ? 3 : c.p >= 2 ? 2 : c.p ? 1 : 0; };
  const STAR = ['<span class="fst f0">○</span>', '<span class="fst f1">★</span>', '<span class="fst f2">★★</span>', '<span class="fst f3">★★★</span>'];
  const useTxt = k => { const c = cnt[k], a = []; if (c.x) a.push('考古 ' + c.x); if (c.p) a.push('習題 ' + c.p); return a.length ? a.join('・') : '考古和習題沒用到'; };
  const varTag = k => cnt[k].v ? ` <span class="fvar">變化題 ×${cnt[k].v}</span>` : '';

  // 題目卡：標出公式
  DATA.deriv.fmBox = keys => `<div class="fmbox"><b>📌 這題用到的公式</b><ul>${keys.map(k => `<li>${STAR[lv(k)]} ${FM[k][1]}${varTag(k)}${keyHtml(k)}</li>`).join('')}</ul></div>`;
  const SPECIAL = /<kbd>(2nd|LN|CPT|STO|RCL|CF|NPV|PV|FV|PMT|N|I\/Y|y\^x|1\/x|ICONV|\+\/−)<\/kbd>/;
  DATA.deriv.problems.forEach(pr => { if (USE[pr.id]) pr.fm = USE[pr.id].split(' '); if (pr.ba && !SPECIAL.test(pr.ba.join(' '))) delete pr.ba; });

  // 大抄：照單元抄
  const byUnit = Object.keys(UNIT).map(u => {
    const ks = Object.keys(FM).filter(k => FM[k][0] === u).sort((a, b) => lv(b) - lv(a) || (cnt[b].x * 10 + cnt[b].p) - (cnt[a].x * 10 + cnt[a].p) || cnt[b].v - cnt[a].v);
    return `<div class="cblk"><h4>${UNIT[u]}</h4><ul class="fmlist">${ks.map(k => `<li class="fl${lv(k)}">${STAR[lv(k)]} ${FM[k][1]} <span class="cuse">${useTxt(k)}</span>${varTag(k)}${keyHtml(k)}</li>`).join('')}</ul></div>`;
  }).join('');
  const sec = `<div class="cunit"><h3>照單元抄（公式總表）</h3><p class="sm-p"><span class="fst f3">★★★</span> 考古考過，一定要抄、寫大一點　<span class="fst f2">★★</span> 課本習題用到 2 次以上　<span class="fst f1">★</span> 用過 1 次　<span class="fst f0">○</span> 考古和習題沒用到，有空間再抄。星等只看考古原題和課本習題；<span class="fvar">變化題</span> 標籤表示變化題有用到這條，不影響星等。灰色小字和標籤都<b>不用抄</b>。🧮 是計算機按法，只寫在要用特殊按鍵的公式旁邊；其他只有加減乘除，直接按。</p>${byUnit}</div>`;
  DATA.deriv.cheat = DATA.deriv.cheat.replace('<div class="cmust">', sec + '<div class="cmust">');
})();
