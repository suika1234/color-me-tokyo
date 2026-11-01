// Celebrations: sparkle bursts and a praise word on every match, confetti when the board is
// cleared, and chimes made with Web Audio (no sound files). Used by game.js.
const Effects = (function () {
  'use strict';

  const PRAISE = ['Good!', 'Great!', 'Super!', 'Amazing!', 'Awesome!'];
  const COLORS = ['#FFC93C', '#2D6CDF', '#34a36a', '#ff7a59', '#b06cff'];
  // C major pentatonic: each match in a row starts the chime one step higher.
  const SCALE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51, 1567.98];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const layer = document.createElement('div');
  layer.className = 'fx-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.append(layer);

  // ---------- Sound ----------
  let audio = null;
  function audioContext() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audio) audio = new AudioCtx();
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function tone(freq, delay, length, volume, type) {
    const ctx = audioContext();
    if (!ctx) return;
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'triangle';
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + length + 0.05);
  }

  function chime(streak) {
    const base = Math.min(streak - 1, 4);
    [0, 2, 4].forEach((step, i) => {
      tone(SCALE[base + step], i * 0.07, 0.4, 0.16);
      tone(SCALE[base + step] * 2, i * 0.07, 0.25, 0.04, 'sine'); // sparkle on top
    });
  }

  function fanfare() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.12, 0.3, 0.16));
    [523.25, 659.25, 783.99, 1046.5].forEach(f => tone(f, 0.55, 1.1, 0.09));
  }

  // ---------- Visuals ----------
  function burst(el) {
    const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const reach = r.width * 0.9;

    const ring = document.createElement('span');
    ring.className = 'fx-ring';
    ring.style.cssText = `left:${x}px;top:${y}px;width:${r.width}px;height:${r.width}px;`;
    layer.append(ring);
    ring.animate([{ transform: 'translate(-50%,-50%) scale(0.4)', opacity: 0.9 }, { transform: 'translate(-50%,-50%) scale(1.5)', opacity: 0 }],
      { duration: 550, easing: 'ease-out' }).onfinish = () => ring.remove();

    for (let i = 0; i < 12; i++) {
      const p = document.createElement('span');
      const star = i % 3 === 0;
      p.className = star ? 'fx-star' : 'fx-dot';
      if (star) p.textContent = '★';
      p.style.cssText = `left:${x}px;top:${y}px;color:${COLORS[i % COLORS.length]};background:${star ? 'none' : COLORS[i % COLORS.length]};`;
      layer.append(p);
      const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.4;
      const dist = reach * (0.6 + Math.random() * 0.5);
      p.animate([
        { transform: 'translate(-50%,-50%) scale(0.3)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(1) rotate(${star ? 180 : 0}deg)`, opacity: 1, offset: 0.7 },
        { transform: `translate(calc(-50% + ${Math.cos(angle) * dist * 1.1}px), calc(-50% + ${Math.sin(angle) * dist * 1.1 + 12}px)) scale(0.6)`, opacity: 0 },
      ], { duration: 750 + Math.random() * 200, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' }).onfinish = () => p.remove();
    }
  }

  function praise(text, els) {
    const rects = els.map(el => el.getBoundingClientRect());
    const x = rects.reduce((sum, r) => sum + r.left + r.width / 2, 0) / rects.length;
    const y = Math.min(...rects.map(r => r.top)) + rects[0].height * 0.2;
    const word = document.createElement('span');
    word.className = 'fx-praise';
    word.textContent = text;
    word.style.left = Math.min(Math.max(x, 90), window.innerWidth - 90) + 'px';
    word.style.top = Math.max(y, 40) + 'px';
    layer.append(word);
    const frames = reduceMotion.matches
      ? [{ opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }]
      : [
          { transform: 'translate(-50%,-50%) scale(0.3) rotate(-8deg)', opacity: 0 },
          { transform: 'translate(-50%,-50%) scale(1.15) rotate(3deg)', opacity: 1, offset: 0.25 },
          { transform: 'translate(-50%,-60%) scale(1) rotate(0deg)', opacity: 1, offset: 0.7 },
          { transform: 'translate(-50%,-110%) scale(0.95)', opacity: 0 },
        ];
    word.animate(frames, { duration: 1100, easing: 'ease-out', fill: 'forwards' }).onfinish = () => word.remove();
  }

  function confetti() {
    const w = window.innerWidth;
    for (let i = 0; i < 90; i++) {
      const c = document.createElement('span');
      c.className = 'fx-confetti';
      c.style.cssText = `left:${Math.random() * w}px;top:-20px;background:${COLORS[i % COLORS.length]};`;
      layer.append(c);
      const drift = (Math.random() - 0.5) * 160;
      const spin = 360 + Math.random() * 540;
      c.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${drift}px, ${window.innerHeight + 40}px) rotate(${spin}deg)`, opacity: 1 },
      ], { duration: 1800 + Math.random() * 1400, delay: Math.random() * 500, easing: 'cubic-bezier(0.3, 0.2, 0.6, 1)', fill: 'backwards' }).onfinish = () => c.remove();
    }
  }

  return {
    // Call when a pair is matched. streak = matches in a row without a miss (1, 2, 3…).
    match(cardEls, streak, withSound) {
      setTimeout(() => {
        if (withSound) chime(streak);
        if (!reduceMotion.matches) cardEls.forEach(burst);
        praise(PRAISE[Math.min(streak, PRAISE.length) - 1], cardEls);
      }, 220); // let the card finish flipping first
    },
    win(withSound) {
      if (withSound) fanfare();
      if (!reduceMotion.matches) confetti();
    },
  };
})();
