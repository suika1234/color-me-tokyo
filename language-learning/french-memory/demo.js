// Demo mode for recording videos: open the page with ?demo=1 to show a big pointer
// that glides to every tap. Remove this file and its <script> tag to drop the feature.
(function () {
  'use strict';
  if (new URLSearchParams(location.search).get('demo') !== '1') return;

  const TIP = 3; // where the arrow tip sits inside the SVG, in px

  const style = document.createElement('style');
  style.textContent = `
    .demo-layer {
      position: fixed; inset: 0; z-index: 2147483647;
      overflow: hidden; /* near the screen edge the arrow is cut off instead of widening the page */
      pointer-events: none;
    }
    .demo-pointer {
      position: absolute; left: 0; top: 0;
      transition: transform 0.3s cubic-bezier(0.3, 0.7, 0.3, 1);
    }
    .demo-pointer.is-dragging { transition: none; }
    .demo-pointer svg { display: block; transform-origin: ${TIP}px ${TIP}px; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.3)); }
    .demo-pointer.is-clicking svg { animation: demo-click 0.25s ease; }
    @keyframes demo-click { 40% { transform: scale(0.8); } 100% { transform: scale(1); } }
  `;
  document.head.append(style);

  const pointer = document.createElement('div');
  pointer.className = 'demo-pointer';
  pointer.setAttribute('aria-hidden', 'true');
  pointer.innerHTML = `
    <svg width="34" height="48" viewBox="0 0 34 48">
      <path d="M3 3 V39 L12 30.5 L18.5 45 L25 42 L18.5 28 H30.5 Z"
            fill="#111" stroke="#fff" stroke-width="3.5" stroke-linejoin="round"/>
    </svg>`;
  const layer = document.createElement('div');
  layer.className = 'demo-layer';
  layer.append(pointer);
  document.body.append(layer);

  let clickTimer = null;
  const moveTo = (x, y) => { pointer.style.transform = `translate(${x - TIP}px, ${y - TIP}px)`; };

  // Start in the middle of the screen, without gliding there.
  pointer.classList.add('is-dragging');
  moveTo(innerWidth / 2, innerHeight / 2);
  pointer.getBoundingClientRect();
  pointer.classList.remove('is-dragging');

  let down = false;
  document.addEventListener('pointerdown', e => {
    down = true;
    pointer.classList.remove('is-dragging', 'is-clicking');
    moveTo(e.clientX, e.clientY);
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      pointer.getBoundingClientRect(); // restart the animation on quick repeat taps
      pointer.classList.add('is-clicking');
    }, 300);
  }, { capture: true, passive: true });

  const follow = (x, y) => {
    if (!down) return;
    clearTimeout(clickTimer);
    pointer.classList.add('is-dragging');
    moveTo(x, y);
  };
  document.addEventListener('pointermove', e => follow(e.clientX, e.clientY), { capture: true, passive: true });
  // iOS stops sending pointer events once a drag turns into a scroll; touch events keep coming.
  document.addEventListener('touchmove', e => follow(e.touches[0].clientX, e.touches[0].clientY), { capture: true, passive: true });

  const release = () => { down = false; };
  for (const type of ['pointerup', 'pointercancel', 'touchend', 'touchcancel']) {
    document.addEventListener(type, e => {
      if (type === 'pointercancel' && e.pointerType === 'touch') return; // a touch drag is still going
      release();
    }, { capture: true, passive: true });
  }
  pointer.addEventListener('animationend', () => pointer.classList.remove('is-clicking'));
})();
