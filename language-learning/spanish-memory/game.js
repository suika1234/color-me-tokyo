'use strict';

// ---------- Word data ----------
// To add a deck, add an object here. Every word needs es, en and card (its number in Volume 1).
// The picture card shows the emoji, or a color circle (color), or a numeral with dots (n; no dots above 10).
// The Easy board uses the first 8 words (or `easy` if set); the Big board uses the first 12.
const DECKS = [
  {
    id: 'people', title: 'People', icon: '🧒',
    words: [
      { es: 'un hombre', en: 'man', emoji: '👨', card: 102 },
      { es: 'una mujer', en: 'woman', emoji: '👩', card: 130 },
      { es: 'un niño', en: 'child', emoji: '🧒', card: 156 },
      { es: 'un chico', en: 'boy', emoji: '👦', card: 129 },
      { es: 'una mamá', en: 'mom', emoji: '🤱', card: 307 },
      { es: 'un papá', en: 'dad', emoji: '👨\u200d🍼', card: 382 },
      { es: 'una familia', en: 'family', emoji: '👨\u200d👩\u200d👧', card: 198 },
      { es: 'un amigo', en: 'friend', emoji: '🧑\u200d🤝\u200d🧑', card: 119 },
      { es: 'un médico', en: 'doctor', emoji: '🧑\u200d⚕️', card: 405 },
      { es: 'un profesor', en: 'teacher', emoji: '🧑\u200d🏫', card: 467 },
      { es: 'un policía', en: 'police officer', emoji: '👮', card: 246 },
      { es: 'una persona', en: 'person', emoji: '🧍', card: 115 },
    ],
  },
  {
    id: 'body', title: 'Body and feelings', icon: '❤️',
    words: [
      { es: 'una mano', en: 'hand', emoji: '✋', card: 181 },
      { es: 'un pie', en: 'foot', emoji: '🦶', card: 402 },
      { es: 'un ojo', en: 'eye', emoji: '👁️', card: 274 },
      { es: 'una cara', en: 'face', emoji: '🙂', card: 303 },
      { es: 'un corazón', en: 'heart', emoji: '❤️', card: 321 },
      { es: 'el amor', en: 'love', emoji: '💕', card: 236 },
      { es: 'un sueño', en: 'dream; sleepiness', emoji: '😴', card: 449 },
      { es: 'el miedo', en: 'fear', emoji: '😨', card: 324 },
      { es: 'la suerte', en: 'luck', emoji: '🍀', card: 320 },
      { es: 'feliz', en: 'happy', emoji: '😊', card: 309 },
      { es: 'la paz', en: 'peace', emoji: '🕊️', card: 394 },
      { es: 'una voz', en: 'voice', emoji: '🗣️', card: 422 },
    ],
  },
  {
    id: 'home', title: 'Home and school', icon: '🏠',
    words: [
      { es: 'una casa', en: 'house', emoji: '🏠', card: 98 },
      { es: 'una puerta', en: 'door', emoji: '🚪', card: 301 },
      { es: 'un libro', en: 'book', emoji: '📕', card: 281 },
      { es: 'una escuela', en: 'school', emoji: '🏫', card: 314 },
      { es: 'una carta', en: 'letter', emoji: '✉️', card: 447 },
      { es: 'un teléfono', en: 'phone', emoji: '📱', card: 451 },
      { es: 'una foto', en: 'photo', emoji: '📷', card: 272 },
      { es: 'un papel', en: 'paper', emoji: '📄', card: 463 },
      { es: 'un cuarto', en: 'room', emoji: '🛏️', card: 472 },
      { es: 'una oficina', en: 'office', emoji: '🏢', card: 432 },
      { es: 'una clase', en: 'class', emoji: '📚', card: 265 },
      { es: 'una imagen', en: 'picture', emoji: '🖼️', card: 496 },
    ],
  },
  {
    id: 'town', title: 'Town and travel', icon: '🚗',
    words: [
      { es: 'un carro', en: 'car', emoji: '🚗', card: 387 },
      { es: 'una calle', en: 'street', emoji: '🛣️', card: 326 },
      { es: 'una ciudad', en: 'city', emoji: '🏙️', card: 197 },
      { es: 'un pueblo', en: 'town, village', emoji: '🏘️', card: 284 },
      { es: 'un viaje', en: 'trip', emoji: '🧳', card: 423 },
      { es: 'un camino', en: 'path, road', emoji: '🛤️', card: 279 },
      { es: 'un campo', en: 'countryside', emoji: '🌾', card: 425 },
      { es: 'el mundo', en: 'world', emoji: '🌍', card: 132 },
      { es: 'un país', en: 'country', emoji: '🗺️', card: 215 },
      { es: 'la tierra', en: 'earth, soil', emoji: '🌱', card: 278 },
      { es: 'el aire', en: 'air', emoji: '🌬️', card: 421 },
      { es: 'el agua', en: 'water', emoji: '💧', card: 247 },
    ],
  },
  {
    id: 'fun', title: 'Fun things', icon: '🎉',
    words: [
      { es: 'una fiesta', en: 'party', emoji: '🎉', card: 381 },
      { es: 'la comida', en: 'food', emoji: '🍽️', card: 390 },
      { es: 'la música', en: 'music', emoji: '🎵', card: 412 },
      { es: 'una canción', en: 'song', emoji: '🎤', card: 456 },
      { es: 'una película', en: 'movie', emoji: '🎬', card: 356 },
      { es: 'un juego', en: 'game', emoji: '🎲', card: 254 },
      { es: 'un video', en: 'video', emoji: '📹', card: 415 },
      { es: 'el dinero', en: 'money', emoji: '💰', card: 185 },
      { es: 'un dólar', en: 'dollar', emoji: '💵', card: 436 },
      { es: 'un perro', en: 'dog', emoji: '🐶', card: 362 },
      { es: 'un equipo', en: 'team', emoji: '⚽', card: 242 },
      { es: 'un programa', en: 'TV show', emoji: '📺', card: 385 },
    ],
  },
  {
    id: 'colors', title: 'Colors, light and time', icon: '🎨',
    words: [
      { es: 'negro', en: 'black', color: '#232323', card: 333 },
      { es: 'blanco', en: 'white', color: '#ffffff', card: 340 },
      { es: 'rojo', en: 'red', color: '#e2483d', card: 488 },
      { es: 'una luz', en: 'light', emoji: '💡', card: 337 },
      { es: 'un día', en: 'day', emoji: '🌞', card: 67 },
      { es: 'una noche', en: 'night', emoji: '🌙', card: 136 },
      { es: 'una mañana', en: 'morning', emoji: '🌅', card: 184 },
      { es: 'una tarde', en: 'afternoon', emoji: '🌇', card: 219 },
      { es: 'un cielo', en: 'sky', emoji: '🌤️', card: 473 },
      { es: 'un año', en: 'year', emoji: '📅', card: 65 },
      { es: 'una semana', en: 'week', emoji: '🗓️', card: 195 },
      { es: 'una hora', en: 'hour', emoji: '⏰', card: 147 },
    ],
  },
  {
    id: 'numbers', title: 'Numbers', icon: '🔢',
    words: [
      { es: 'uno', en: 'one', n: 1, card: 112 },
      { es: 'dos', en: 'two', n: 2, card: 79 },
      { es: 'tres', en: 'three', n: 3, card: 165 },
      { es: 'cuatro', en: 'four', n: 4, card: 302 },
      { es: 'cinco', en: 'five', n: 5, card: 317 },
      { es: 'seis', en: 'six', n: 6, card: 437 },
      { es: 'primero', en: 'first', emoji: '🥇', card: 88 },
      { es: 'segundo', en: 'second', emoji: '🥈', card: 206 },
      { es: 'medio', en: 'half', emoji: '🌗', card: 225 },
      { es: 'mil', en: 'thousand', n: 1000, card: 305 },
      { es: 'un número', en: 'number', emoji: '🔢', card: 259 },
      { es: 'un minuto', en: 'minute', emoji: '⏱️', card: 239 },
    ],
  },
];

const FLIP_BACK_MS = 1000;
// Stars by moves, as a multiple of the number of pairs (a perfect game is 1×).
const THREE_STARS_MAX = 2.25;
const TWO_STARS_MAX = 3.5;
const OUTLINED_COLORS = ['white', 'black'];
// Easy is today's 4×4 board; Big is 5×5 with 12 pairs and a free lemon in the center.
const SIZES = {
  easy: { label: 'Easy 4×4', cols: 4 },
  big: { label: 'Big 5×5', cols: 5, pairs: 12 },
};
const STORAGE_PREFIX = 'blb-spanish-memory:';
// Demo mode (?demo=1, see demo.js) is for recording videos: it never shows or saves best scores.
const DEMO = new URLSearchParams(location.search).get('demo') === '1';

// ---------- Storage (optional: the game works without it) ----------
function readStore(key) {
  try { return localStorage.getItem(STORAGE_PREFIX + key); } catch (e) { return null; }
}
function writeStore(key, value) {
  try { localStorage.setItem(STORAGE_PREFIX + key, String(value)); } catch (e) { /* storage blocked */ }
}
function bestKey(d, sizeName) {
  return 'best:' + d.id + (sizeName === 'big' ? ':big' : '');
}
function readBest(d, sizeName) {
  const best = parseInt(readStore(bestKey(d, sizeName)), 10);
  return Number.isFinite(best) ? best : null;
}
function pairsFor(d, sizeName) {
  return sizeName === 'big' ? SIZES.big.pairs : (d.easy || 8);
}

// ---------- Speech ----------
const canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
let spanishVoice = null;
let soundOn = readStore('sound') !== 'off';

// The book teaches Latin American pronunciation, so prefer a Mexican or US Spanish voice.
// Apple lists robotic "Eloquence" voices (Eddy, Flo, Grandma…) first, so skip those when there's a choice.
const ROBOTIC_VOICES = /^(Eddy|Flo|Grandma|Grandpa|Reed|Rocko|Sandy|Shelley)\b/i;

function pickVoice() {
  const spanish = window.speechSynthesis.getVoices().filter(v => /^es/i.test(v.lang));
  const natural = spanish.filter(v => !ROBOTIC_VOICES.test(v.name));
  spanishVoice = natural.find(v => /^es[-_](MX|US|419)/i.test(v.lang)) || natural[0] || spanish[0] || null;
}
if (canSpeak) {
  pickVoice();
  window.speechSynthesis.addEventListener('voiceschanged', pickVoice);
}

function say(text) {
  if (!canSpeak || !soundOn || !spanishVoice) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = spanishVoice;
    utterance.lang = spanishVoice.lang;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  } catch (e) { /* no audio, carry on */ }
}

// ---------- Page elements ----------
const $ = id => document.getElementById(id);
const screens = { picker: $('picker'), game: $('game'), win: $('win') };
const board = $('board');
const movesEl = $('moves');
const noteEl = $('match-note');
const statusEl = $('sr-status');
const soundBtn = $('sound-btn');

// ---------- Game state ----------
let deck = null;
let cards = [];
let open = [];
let moves = 0;
let pairsFound = 0;
let pairsInPlay = 0;
let size = readStore('size') === 'big' ? 'big' : 'easy';
let streak = 0;
let locked = false;

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function showScreen(name) {
  for (const [key, section] of Object.entries(screens)) section.hidden = key !== name;
  document.body.dataset.screen = name;
}

// ---------- Deck picker ----------
function renderPicker() {
  const toggle = $('size-toggle');
  toggle.replaceChildren(...Object.entries(SIZES).map(([name, opt]) => {
    const btn = el('button', 'pill-btn size-btn', opt.label);
    btn.type = 'button';
    btn.setAttribute('aria-pressed', String(name === size));
    btn.addEventListener('click', () => {
      size = name;
      writeStore('size', name);
      renderPicker();
      toggle.querySelector('[aria-pressed="true"]').focus();
    });
    return btn;
  }));

  const grid = $('deck-grid');
  grid.replaceChildren(...DECKS.map(d => {
    const btn = el('button', 'deck-btn');
    btn.type = 'button';
    const best = readBest(d, size);
    btn.append(
      el('span', 'deck-icon', d.icon),
      el('span', 'deck-title', d.title),
      el('span', 'deck-meta', pairsFor(d, size) + ' pairs'),
      ...(DEMO ? [] : [el('span', 'deck-meta', best === null ? 'Not played yet' : 'Best: ' + best + ' moves')]),
    );
    btn.querySelector('.deck-icon').setAttribute('aria-hidden', 'true');
    btn.addEventListener('click', () => startGame(d));
    return btn;
  }));
}

function openPicker() {
  renderPicker();
  showScreen('picker');
  window.scrollTo(0, 0);
  $('deck-grid').firstElementChild.focus({ preventScroll: true });
}

// ---------- Cards ----------
function pictureLabel(word) {
  if (word.color) return 'Color: ' + word.en;
  if (word.n) return 'Number ' + word.n;
  return 'Picture: ' + word.en;
}

function updateLabel(card) {
  const face = card.kind === 'word' ? 'Spanish word: ' + card.word.es : pictureLabel(card.word);
  card.el.setAttribute('aria-label', card.up
    ? `${card.name}, ${face}${card.matched ? ', matched' : ''}`
    : `${card.name}, face down`);
}

function buildFront(card) {
  const front = el('span', 'card-face card-front');
  const { word } = card;
  if (card.kind === 'word') {
    front.classList.add('is-word');
    const text = el('span', 'card-word', word.es);
    text.lang = 'es';
    // Shrink long words (e.g. "película") so they fit on one line.
    const longest = Math.max(...word.es.split(/[\s']/).map(part => part.length));
    text.style.setProperty('--word-size', (Math.min(5.5, 34 / longest) * 4 / SIZES[size].cols).toFixed(2) + 'cqw');
    front.append(text);
  } else if (word.color) {
    const swatch = el('span', 'swatch');
    swatch.style.setProperty('--swatch', word.color);
    if (OUTLINED_COLORS.includes(word.en)) swatch.classList.add('swatch-outlined');
    front.append(swatch);
  } else if (word.n) {
    const dots = el('span', 'dots');
    if (word.n <= 10) for (let i = 0; i < word.n; i++) dots.append(el('span', 'dot'));
    if (word.n > 8) dots.classList.add('dots-wide'); // two rows of five
    front.append(el('span', word.n > 99 ? 'numeral numeral-long' : 'numeral', String(word.n)), dots);
  } else {
    front.append(el('span', 'card-emoji', word.emoji));
  }
  return front;
}

function buildCard(card, index, total) {
  const btn = el('button', 'card');
  btn.type = 'button';
  const inner = el('span', 'card-inner');
  const back = el('span', 'card-face card-back');
  back.append(el('span', 'lemon', '🍋'));
  inner.append(back, buildFront(card));
  inner.setAttribute('aria-hidden', 'true');
  btn.append(inner);
  btn.addEventListener('click', () => flip(card));
  card.el = btn;
  card.name = `Card ${index + 1} of ${total}`;
  updateLabel(card);
  return btn;
}

// ---------- Playing ----------
function startGame(chosen) {
  deck = chosen;
  moves = 0;
  pairsFound = 0;
  streak = 0;
  open = [];
  locked = false;
  movesEl.textContent = '0';
  pairsInPlay = pairsFor(deck, size);
  $('game-title').textContent = deck.title + (size === 'big' ? ' · Big' : '');
  noteEl.textContent = 'Tap two cards to match a picture with its Spanish word.';
  cards = shuffle(deck.words.slice(0, pairsInPlay).flatMap((word, pair) => [
    { pair, kind: 'picture', word, up: false, matched: false },
    { pair, kind: 'word', word, up: false, matched: false },
  ]));
  const tiles = cards.map((card, i) => buildCard(card, i, cards.length));
  if (size === 'big') {
    const free = el('span', 'free-tile', '🍋');
    free.setAttribute('role', 'img');
    free.setAttribute('aria-label', 'Free lemon tile');
    tiles.splice(Math.floor(tiles.length / 2), 0, free);
  }
  board.style.setProperty('--cols', SIZES[size].cols);
  board.replaceChildren(...tiles);
  showScreen('game');
  sizeBoard(true);
  board.firstElementChild.focus({ preventScroll: true });
}

function flip(card) {
  if (locked || card.up) return;
  card.up = true;
  card.el.classList.add('is-flipped');
  updateLabel(card);
  if (card.kind === 'word') say(card.word.es);

  open.push(card);
  if (open.length < 2) return;

  moves++;
  movesEl.textContent = String(moves);
  const [a, b] = open;
  open = [];

  if (a.pair === b.pair) {
    for (const c of [a, b]) {
      c.matched = true;
      c.el.classList.add('is-matched');
      c.el.setAttribute('aria-disabled', 'true');
      updateLabel(c);
    }
    if (card.kind === 'picture') say(card.word.es);
    showNote(card.word);
    streak++;
    Effects.match([a.el, b.el], streak, soundOn);
    pairsFound++;
    if (pairsFound === pairsInPlay) {
      locked = true;
      setTimeout(finish, 1100);
    }
  } else {
    locked = true;
    streak = 0;
    statusEl.textContent = 'Not a match. Try again.';
    for (const c of [a, b]) c.el.classList.add('is-miss');
    setTimeout(() => {
      for (const c of [a, b]) {
        c.up = false;
        c.el.classList.remove('is-flipped', 'is-miss');
        updateLabel(c);
      }
      locked = false;
    }, FLIP_BACK_MS);
  }
}

function showNote(word) {
  const es = el('strong', '', word.es);
  es.lang = 'es';
  noteEl.replaceChildren(es, ` = ${word.en} · `, el('span', 'card-number', `Card #${word.card} in Volume 1`));
}

function finish() {
  const pairs = pairsInPlay;
  const stars = moves <= pairs * THREE_STARS_MAX ? 3 : moves <= pairs * TWO_STARS_MAX ? 2 : 1;
  const best = readBest(deck, size);
  const isBest = best === null || moves < best;
  if (isBest && !DEMO) writeStore(bestKey(deck, size), moves);

  $('win-summary').textContent = `You matched all ${pairs} pairs in ${deck.title} in ${moves} moves.`;
  const starsEl = $('win-stars');
  starsEl.replaceChildren(...[1, 2, 3].map(n => el('span', n <= stars ? '' : 'star-off', '★')));
  starsEl.setAttribute('aria-label', `${stars} out of 3 stars`);
  starsEl.setAttribute('role', 'img');
  $('win-best').textContent = DEMO ? '' : isBest ? 'New best score!' : `Your best: ${best} moves`;

  showScreen('win');
  Effects.win(soundOn);
  $('win').scrollIntoView({ block: 'start' });
  $('win-title').focus({ preventScroll: true });
}

// ---------- Fit the board on one screen ----------
// Card width w, gap g: board height = rows*w + (rows-1)*g, board width = cols*w + (cols-1)*g.
// Keep the header in view if the board can still be a good size; otherwise scroll it away.
// The choice is made once per game so phone toolbars showing/hiding don't make the board jump.
let keepHeader = true;

function sizeBoard(newGame) {
  if (screens.game.hidden) return;
  board.style.width = '';
  const cols = SIZES[size].cols;
  const rows = Math.ceil(board.children.length / cols);
  const gap = parseFloat(getComputedStyle(board).columnGap) || 0;
  const fullWidth = Math.min(board.parentElement.clientWidth, 640);
  const below = noteEl.offsetHeight + 12 + 16;
  const widthFor = height => {
    const cardSize = (height - below - (rows - 1) * gap) / rows;
    return Math.max(200, Math.min(fullWidth, Math.floor(cols * cardSize + (cols - 1) * gap)));
  };

  const boardTop = board.getBoundingClientRect().top + window.scrollY;
  const barTop = screens.game.getBoundingClientRect().top + window.scrollY - 8;
  const withHeader = widthFor(window.innerHeight - boardTop);
  if (newGame) keepHeader = withHeader >= Math.min(fullWidth * 0.9, 420);

  board.style.width = (keepHeader ? withHeader : widthFor(window.innerHeight - (boardTop - barTop))) + 'px';
  if (newGame) window.scrollTo(0, keepHeader ? 0 : barTop);
}

// ---------- Controls ----------
function updateSoundButton() {
  soundBtn.setAttribute('aria-pressed', String(soundOn));
  soundBtn.textContent = soundOn ? '🔊 Sound on' : '🔇 Sound off';
}

if (canSpeak) {
  updateSoundButton();
  soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    writeStore('sound', soundOn ? 'on' : 'off');
    if (!soundOn) window.speechSynthesis.cancel();
    updateSoundButton();
  });
} else {
  soundBtn.hidden = true;
}

$('decks-btn').addEventListener('click', openPicker);
$('another-btn').addEventListener('click', openPicker);
$('again-btn').addEventListener('click', () => startGame(deck));
window.addEventListener('resize', () => sizeBoard(false));

renderPicker();
