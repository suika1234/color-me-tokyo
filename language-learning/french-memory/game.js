'use strict';

// ---------- Word data ----------
// To add a deck, add an object here. Every word needs fr, en and card (its number in Volume 1).
// type 'emoji' (the default) needs an emoji, 'color' needs a color, 'number' needs n.
const DECKS = [
  {
    id: 'food', title: 'Food', icon: '🍎',
    words: [
      { fr: 'un pain', en: 'bread', emoji: '🥖', card: 271 },
      { fr: 'une pomme', en: 'apple', emoji: '🍎', card: 349 },
      { fr: 'le lait', en: 'milk', emoji: '🥛', card: 347 },
      { fr: 'un fromage', en: 'cheese', emoji: '🧀', card: 458 },
      { fr: 'un gâteau', en: 'cake', emoji: '🎂', card: 463 },
      { fr: 'un œuf', en: 'egg', emoji: '🥚', card: 467 },
      { fr: 'un thé', en: 'tea', emoji: '🍵', card: 468 },
      { fr: "l'eau", en: 'water', emoji: '💧', card: 190 },
    ],
  },
  {
    id: 'nature', title: 'Nature and weather', icon: '☀️',
    words: [
      { fr: 'un soleil', en: 'sun', emoji: '☀️', card: 476 },
      { fr: 'la pluie', en: 'rain', emoji: '🌧️', card: 474 },
      { fr: 'la neige', en: 'snow', emoji: '❄️', card: 475 },
      { fr: 'un nuage', en: 'cloud', emoji: '☁️', card: 478 },
      { fr: 'un arbre', en: 'tree', emoji: '🌳', card: 479 },
      { fr: 'une mer', en: 'sea', emoji: '🌊', card: 329 },
      { fr: 'une montagne', en: 'mountain', emoji: '⛰️', card: 443 },
      { fr: 'une plage', en: 'beach', emoji: '🏖️', card: 442 },
    ],
  },
  {
    id: 'animals', title: 'Animals and things that go', icon: '🐶',
    words: [
      { fr: 'un chien', en: 'dog', emoji: '🐶', card: 482 },
      { fr: 'un cheval', en: 'horse', emoji: '🐴', card: 481 },
      { fr: 'un oiseau', en: 'bird', emoji: '🐦', card: 480 },
      { fr: 'un poisson', en: 'fish', emoji: '🐟', card: 460 },
      { fr: 'une voiture', en: 'car', emoji: '🚗', card: 489 },
      { fr: 'un avion', en: 'plane', emoji: '✈️', card: 490 },
      { fr: 'un vélo', en: 'bike', emoji: '🚲', card: 491 },
      { fr: 'un train', en: 'train', emoji: '🚆', card: 368 },
    ],
  },
  {
    id: 'home', title: 'Home and clothes', icon: '🛏️',
    words: [
      { fr: 'un lit', en: 'bed', emoji: '🛏️', card: 332 },
      { fr: 'une chaise', en: 'chair', emoji: '🪑', card: 448 },
      { fr: 'une clé', en: 'key', emoji: '🔑', card: 366 },
      { fr: 'un téléphone', en: 'phone', emoji: '📱', card: 367 },
      { fr: 'un sac', en: 'bag', emoji: '🎒', card: 453 },
      { fr: 'une robe', en: 'dress', emoji: '👗', card: 472 },
      { fr: 'une chaussure', en: 'shoe', emoji: '👟', card: 473 },
      { fr: 'un pantalon', en: 'pants', emoji: '👖', card: 471 },
    ],
  },
  {
    id: 'colors', title: 'Colors', icon: '🎨', type: 'color',
    words: [
      { fr: 'blanc', en: 'white', color: '#ffffff', card: 369 },
      { fr: 'noir', en: 'black', color: '#232323', card: 370 },
      { fr: 'bleu', en: 'blue', color: '#2D6CDF', card: 371 },
      { fr: 'vert', en: 'green', color: '#34a36a', card: 372 },
      { fr: 'jaune', en: 'yellow', color: '#FFC93C', card: 493 },
      { fr: 'gris', en: 'gray', color: '#9a958c', card: 494 },
    ],
  },
  {
    id: 'numbers', title: 'Numbers 1 to 8', icon: '🔢', type: 'number',
    words: [
      { fr: 'un', en: 'one', n: 1, card: 3 },
      { fr: 'deux', en: 'two', n: 2, card: 82 },
      { fr: 'trois', en: 'three', n: 3, card: 198 },
      { fr: 'quatre', en: 'four', n: 4, card: 293 },
      { fr: 'cinq', en: 'five', n: 5, card: 294 },
      { fr: 'six', en: 'six', n: 6, card: 295 },
      { fr: 'sept', en: 'seven', n: 7, card: 296 },
      { fr: 'huit', en: 'eight', n: 8, card: 297 },
    ],
  },
];

const FLIP_BACK_MS = 1000;
// Stars by moves, as a multiple of the number of pairs (a perfect game is 1×).
const THREE_STARS_MAX = 2.25;
const TWO_STARS_MAX = 3.5;
const OUTLINED_COLORS = ['white', 'black'];
const STORAGE_PREFIX = 'blb-french-memory:';

// ---------- Storage (optional: the game works without it) ----------
function readStore(key) {
  try { return localStorage.getItem(STORAGE_PREFIX + key); } catch (e) { return null; }
}
function writeStore(key, value) {
  try { localStorage.setItem(STORAGE_PREFIX + key, String(value)); } catch (e) { /* storage blocked */ }
}
function readBest(deckId) {
  const best = parseInt(readStore('best:' + deckId), 10);
  return Number.isFinite(best) ? best : null;
}

// ---------- Speech ----------
const canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
let frenchVoice = null;
let soundOn = readStore('sound') !== 'off';

function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  frenchVoice = voices.find(v => /^fr[-_]FR/i.test(v.lang)) || voices.find(v => /^fr/i.test(v.lang)) || null;
}
if (canSpeak) {
  pickVoice();
  window.speechSynthesis.addEventListener('voiceschanged', pickVoice);
}

function say(text) {
  if (!canSpeak || !soundOn || !frenchVoice) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = frenchVoice;
    utterance.lang = frenchVoice.lang;
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
  const grid = $('deck-grid');
  grid.replaceChildren(...DECKS.map(d => {
    const btn = el('button', 'deck-btn');
    btn.type = 'button';
    const best = readBest(d.id);
    btn.append(
      el('span', 'deck-icon', d.icon),
      el('span', 'deck-title', d.title),
      el('span', 'deck-meta', d.words.length + ' pairs'),
      el('span', 'deck-meta', best === null ? 'Not played yet' : 'Best: ' + best + ' moves'),
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
  if (deck.type === 'color') return 'Color: ' + word.en;
  if (deck.type === 'number') return 'Number ' + word.n;
  return 'Picture: ' + word.en;
}

function updateLabel(card) {
  const face = card.kind === 'word' ? 'French word: ' + card.word.fr : pictureLabel(card.word);
  card.el.setAttribute('aria-label', card.up
    ? `${card.name}, ${face}${card.matched ? ', matched' : ''}`
    : `${card.name}, face down`);
}

function buildFront(card) {
  const front = el('span', 'card-face card-front');
  const { word } = card;
  if (card.kind === 'word') {
    front.classList.add('is-word');
    const text = el('span', 'card-word', word.fr);
    text.lang = 'fr';
    // Shrink long words (e.g. "chaussure") so they fit on one line.
    const longest = Math.max(...word.fr.split(/[\s']/).map(part => part.length));
    text.style.setProperty('--word-size', Math.min(5.5, 34 / longest).toFixed(2) + 'cqw');
    front.append(text);
  } else if (deck.type === 'color') {
    const swatch = el('span', 'swatch');
    swatch.style.setProperty('--swatch', word.color);
    if (OUTLINED_COLORS.includes(word.en)) swatch.classList.add('swatch-outlined');
    front.append(swatch);
  } else if (deck.type === 'number') {
    const dots = el('span', 'dots');
    for (let i = 0; i < word.n; i++) dots.append(el('span', 'dot'));
    front.append(el('span', 'numeral', String(word.n)), dots);
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
  open = [];
  locked = false;
  movesEl.textContent = '0';
  $('game-title').textContent = deck.title;
  noteEl.textContent = 'Tap two cards to match a picture with its French word.';
  cards = shuffle(deck.words.flatMap((word, pair) => [
    { pair, kind: 'picture', word, up: false, matched: false },
    { pair, kind: 'word', word, up: false, matched: false },
  ]));
  board.replaceChildren(...cards.map((card, i) => buildCard(card, i, cards.length)));
  showScreen('game');
  sizeBoard(true);
  board.firstElementChild.focus({ preventScroll: true });
}

function flip(card) {
  if (locked || card.up) return;
  card.up = true;
  card.el.classList.add('is-flipped');
  updateLabel(card);
  if (card.kind === 'word') say(card.word.fr);

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
    if (card.kind === 'picture') say(card.word.fr);
    showNote(card.word);
    pairsFound++;
    if (pairsFound === deck.words.length) {
      locked = true;
      setTimeout(finish, 1100);
    }
  } else {
    locked = true;
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
  const fr = el('strong', '', word.fr);
  fr.lang = 'fr';
  noteEl.replaceChildren(fr, ` = ${word.en} · `, el('span', 'card-number', `Card #${word.card} in Volume 1`));
}

function finish() {
  const pairs = deck.words.length;
  const stars = moves <= pairs * THREE_STARS_MAX ? 3 : moves <= pairs * TWO_STARS_MAX ? 2 : 1;
  const best = readBest(deck.id);
  const isBest = best === null || moves < best;
  if (isBest) writeStore('best:' + deck.id, moves);

  $('win-summary').textContent = `You matched all ${pairs} pairs in ${deck.title} in ${moves} moves.`;
  const starsEl = $('win-stars');
  starsEl.replaceChildren(...[1, 2, 3].map(n => el('span', n <= stars ? '' : 'star-off', '★')));
  starsEl.setAttribute('aria-label', `${stars} out of 3 stars`);
  starsEl.setAttribute('role', 'img');
  $('win-best').textContent = isBest ? 'New best score!' : `Your best: ${best} moves`;

  showScreen('win');
  $('win').scrollIntoView({ block: 'start' });
  $('win-title').focus({ preventScroll: true });
}

// ---------- Fit the board on one screen ----------
// Card width w, gap g: board height = rows*w + (rows-1)*g, board width = 4*w + 3*g.
// Keep the header in view if the board can still be a good size; otherwise scroll it away.
// The choice is made once per game so phone toolbars showing/hiding don't make the board jump.
let keepHeader = true;

function sizeBoard(newGame) {
  if (screens.game.hidden) return;
  board.style.width = '';
  const rows = Math.ceil(cards.length / 4);
  const gap = parseFloat(getComputedStyle(board).columnGap) || 0;
  const fullWidth = Math.min(board.parentElement.clientWidth, 640);
  const below = noteEl.offsetHeight + 12 + 16;
  const widthFor = height => {
    const cardSize = (height - below - (rows - 1) * gap) / rows;
    return Math.max(200, Math.min(fullWidth, Math.floor(4 * cardSize + 3 * gap)));
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
