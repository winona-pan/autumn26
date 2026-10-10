// ===== 8-bit 音效與配樂：全部用 Web Audio 即時合成，不需要音樂檔 =====
// 音效跟著 ST.sound，配樂跟著 ST.music；兩個開關分開。
const SOUND = (() => {
  let ac = null, master = null, musicBus = null, sfxBus = null, noiseBuf = null;
  const ctx = () => {
    if (!ac) {
      ac = new (window.AudioContext || window.webkitAudioContext)();
      master = ac.createGain(); master.gain.value = .9; master.connect(ac.destination);
      musicBus = ac.createGain(); musicBus.gain.value = .32; musicBus.connect(master);
      sfxBus = ac.createGain(); sfxBus.gain.value = .55; sfxBus.connect(master);
      noiseBuf = ac.createBuffer(1, ac.sampleRate * .5, ac.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  };
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  // 單一個音：方波／三角波，帶一點起音與收尾，聽起來像紅白機
  function tone(bus, t, midi, dur, type, vol, slide) {
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(hz(midi), t); if (slide) o.frequency.exponentialRampToValueAtTime(hz(midi + slide), t + dur);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .008); g.gain.setValueAtTime(vol, t + dur * .7); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(bus); o.start(t); o.stop(t + dur + .02);
  }
  function noise(bus, t, dur, vol, hp) {
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = noiseBuf; f.type = 'highpass'; f.frequency.value = hp || 6000;
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    s.connect(f).connect(g).connect(bus); s.start(t); s.stop(t + dur + .02);
  }

  // ---- 音效 ----
  const SFX = {
    ok: [[76, .07], [83, .12]], no: [[52, .1, 'square', -3], [47, .16, 'square', -2]],
    hit: [[72, .05], [79, .05], [84, .09]], up: [[72, .08], [76, .08], [79, .08], [84, .2]],
    flip: [[88, .03, 'square', -12]], pop: [[84, .05, 'square', -24]], coin: [[83, .06], [88, .16]],
    eat: [[67, .04], [74, .04], [79, .07]], whack: 'whack', tick: [[96, .02, 'square']],
    win: [[72, .1], [76, .1], [79, .1], [84, .1], [79, .1], [84, .32]], lose: [[67, .14, 'triangle'], [63, .14, 'triangle'], [60, .14, 'triangle'], [55, .4, 'triangle']],
    combo: [[79, .05], [84, .05], [88, .05], [91, .12]], start: [[60, .08], [64, .08], [67, .08], [72, .16]]
  };
  function sfx(kind) {
    if (!ST.sound) return; try { ctx(); } catch (e) { return; }
    const t = ac.currentTime + .01, s = SFX[kind] || SFX.up;
    if (s === 'whack') { noise(sfxBus, t, .08, .5, 1500); tone(sfxBus, t, 50, .1, 'square', .2, -12); return; }
    let at = t; s.forEach(([m, d, type, slide]) => { tone(sfxBus, at, m, d, type || 'square', .13, slide); at += d * .85; });
  }

  // ---- 配樂（原創 8-bit 小曲）：每格是十六分音符；'.' = 延續、'-' = 休止 ----
  const N = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const parse = s => s.trim().split(/\s+/).map(x => x === '.' ? '.' : x === '-' ? '-' : 12 * (+x.slice(-1) + 1) + N[x[0]] + (x[1] === '#' ? 1 : x[1] === 'b' ? -1 : 0));
  const TRACKS = {
    // 輕快：大調、140 BPM
    game: { bpm: 140,
      lead: parse(`E5 . G5 . C6 . G5 . A5 . G5 . E5 . - . D5 . E5 . F5 . A5 . G5 . . . - . - .
                   E5 . G5 . C6 . D6 . E6 . D6 . C6 . A5 . G5 . A5 . G5 . E5 . C5 . . . - . - .
                   F5 . A5 . C6 . A5 . G5 . E5 . C5 . E5 . D5 . F5 . A5 . F5 . G5 . . . B4 . D5 .
                   E5 . G5 . C6 . G5 . A5 . C6 . D6 . E6 . D6 . C6 . G5 . B5 . C6 . . . - . - .`),
      bass: parse(`C3 . - . G3 . - . C3 . - . G3 . - . G2 . - . D3 . - . G2 . - . B2 . - .
                   C3 . - . G3 . - . A2 . - . E3 . - . F2 . - . C3 . - . G2 . - . G2 . - .
                   F2 . - . C3 . - . C3 . - . G3 . - . D3 . - . A2 . - . G2 . - . G2 . - .
                   C3 . - . G3 . - . F2 . - . A2 . - . G2 . - . G2 . - . C3 . - . C3 . - .`),
      drum: 'k-h-s-h-k-h-s-hk' },
    // 打怪：小調、比較快
    boss: { bpm: 160,
      lead: parse(`A4 . C5 . E5 . A5 . G5 . E5 . C5 . E5 . F5 . A5 . C6 . A5 . G5 . . . E5 . . .
                   A4 . C5 . E5 . A5 . B5 . A5 . G5 . E5 . F5 . E5 . D5 . C5 . B4 . . . G#4 . . .`),
      bass: parse(`A2 . A3 . A2 . A3 . A2 . A3 . A2 . A3 . F2 . F3 . F2 . F3 . G2 . G3 . E2 . E3 .
                   A2 . A3 . A2 . A3 . A2 . A3 . A2 . A3 . F2 . F3 . F2 . F3 . E2 . E3 . E2 . E3 .`),
      drum: 'k-hhs-hhk-hhs-hk' }
  };
  let cur = null, step = 0, next = 0, timer = 0;
  function schedule() {
    const tr = TRACKS[cur]; if (!tr) return; const spb = 60 / tr.bpm / 4;
    while (next < ac.currentTime + .12) {
      const i = step % tr.lead.length, j = step % tr.bass.length, d = tr.drum[step % tr.drum.length];
      const len = (arr, k) => { let n = 1; while (arr[(k + n) % arr.length] === '.') n++; return n; };
      if (typeof tr.lead[i] === 'number') tone(musicBus, next, tr.lead[i], spb * len(tr.lead, i) * .92, 'square', .085);
      if (typeof tr.bass[j] === 'number') tone(musicBus, next, tr.bass[j], spb * len(tr.bass, j) * .9, 'triangle', .22);
      if (d === 'k') tone(musicBus, next, 40, .09, 'triangle', .35, -14); else if (d === 's') noise(musicBus, next, .08, .22, 2500); else if (d === 'h') noise(musicBus, next, .03, .1, 8000);
      next += spb; step++;
    }
  }
  function play(name) {
    if (!ST.music) { stop(); return; } if (cur === name && timer) return;
    try { ctx(); } catch (e) { return; }
    stop(); cur = name; step = 0; next = ac.currentTime + .08; timer = setInterval(schedule, 25); schedule();
  }
  function stop() { clearInterval(timer); timer = 0; cur = null; }
  // 切到背景時暫停，回來再接著播
  document.addEventListener('visibilitychange', () => { if (!ac) return; if (document.hidden) ac.suspend(); else if (cur) ac.resume(); });

  return { sfx, play, stop, playing: () => cur };
})();
