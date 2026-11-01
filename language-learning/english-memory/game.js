'use strict';

// ---------- Word data ----------
// To add a deck, add an object here. Every word needs en (the English word), ja (its meaning)
// and card (its number in はじめての英単語500 Flashcards, Volume 1).
// The picture card shows the emoji, or a color circle (color), or a numeral with dots (n).
// The Easy board uses the first 8 words (or `easy` if set); the Big board uses the first 12.
const DECKS = [
  {
    id: 'animals', title: 'Animals and things that go', icon: '🐶',
    words: [
      { en: 'dog', ja: '犬', emoji: '🐶', card: 317 },
      { en: 'horse', ja: '馬', emoji: '🐴', card: 338 },
      { en: 'fish', ja: '魚', emoji: '🐟', card: 330 },
      { en: 'birds', ja: '鳥', emoji: '🐦', card: 307 },
      { en: 'car', ja: '車', emoji: '🚗', card: 213 },
      { en: 'ship', ja: '船', emoji: '🚢', card: 372 },
      { en: 'boat', ja: 'ボート', emoji: '⛵', card: 408 },
      { en: 'plane', ja: '飛行機', emoji: '✈️', card: 468 },
      { en: 'animal', ja: '動物', emoji: '🐾', card: 106 },
      { en: 'wheels', ja: '車輪', emoji: '🛞', card: 498 },
      { en: 'road', ja: '道', emoji: '🛣️', card: 474 },
      { en: 'travel', ja: '旅行する', emoji: '🧳', card: 389 },
    ],
  },
  {
    id: 'nature', title: 'Nature', icon: '🌳',
    words: [
      { en: 'water', ja: '水', emoji: '💧', card: 86 },
      { en: 'tree', ja: '木', emoji: '🌳', card: 292 },
      { en: 'sun', ja: '太陽', emoji: '☀️', card: 381 },
      { en: 'sea', ja: '海', emoji: '🌊', card: 275 },
      { en: 'river', ja: '川', emoji: '🏞️', card: 271 },
      { en: 'mountains', ja: '山々', emoji: '⛰️', card: 259 },
      { en: 'island', ja: '島', emoji: '🏝️', card: 453 },
      { en: 'stars', ja: '星', emoji: '⭐', card: 483 },
      { en: 'fire', ja: '火', emoji: '🔥', card: 329 },
      { en: 'wind', ja: '風', emoji: '🌬️', card: 399 },
      { en: 'rock', ja: '岩', emoji: '🪨', card: 368 },
      { en: 'earth', ja: '地球', emoji: '🌍', card: 221 },
    ],
  },
  {
    id: 'people', title: 'People and body', icon: '👧',
    words: [
      { en: 'boy', ja: '男の子', emoji: '👦', card: 117 },
      { en: 'girl', ja: '女の子', emoji: '👧', card: 235 },
      { en: 'mother', ja: 'お母さん', emoji: '👩', card: 150 },
      { en: 'father', ja: 'お父さん', emoji: '👨', card: 230 },
      { en: 'king', ja: '王様', emoji: '🤴', card: 343 },
      { en: 'family', ja: '家族', emoji: '👨‍👩‍👧', card: 228 },
      { en: 'hand', ja: '手', emoji: '✋', card: 130 },
      { en: 'eyes', ja: '目', emoji: '👀', card: 226 },
      { en: 'children', ja: '子供たち', emoji: '🧒', card: 215 },
      { en: 'friends', ja: '友達', emoji: '🧑‍🤝‍🧑', card: 332 },
      { en: 'face', ja: '顔', emoji: '🙂', card: 227 },
      { en: 'feet', ja: '足', emoji: '🦶', card: 231 },
    ],
  },
  {
    id: 'home', title: 'Home, school and town', icon: '🏠',
    words: [
      { en: 'house', ja: '家', emoji: '🏠', card: 134 },
      { en: 'door', ja: 'ドア', emoji: '🚪', card: 318 },
      { en: 'book', ja: '本', emoji: '📕', card: 211 },
      { en: 'paper', ja: '紙', emoji: '📄', card: 268 },
      { en: 'letter', ja: '手紙', emoji: '✉️', card: 141 },
      { en: 'school', ja: '学校', emoji: '🏫', card: 274 },
      { en: 'picture', ja: '絵', emoji: '🖼️', card: 163 },
      { en: 'map', ja: '地図', emoji: '🗺️', card: 347 },
      { en: 'room', ja: '部屋', emoji: '🛋️', card: 369 },
      { en: 'class', ja: 'クラス', emoji: '🧑‍🏫', card: 419 },
      { en: 'city', ja: '町', emoji: '🏙️', card: 216 },
      { en: 'building', ja: '建物', emoji: '🏢', card: 413 },
    ],
  },
  {
    id: 'fun', title: 'Fun and food', icon: '⚽',
    words: [
      { en: 'ball', ja: 'ボール', emoji: '⚽', card: 404 },
      { en: 'game', ja: 'ゲーム', emoji: '🎮', card: 442 },
      { en: 'music', ja: '音楽', emoji: '🎵', card: 352 },
      { en: 'song', ja: '歌', emoji: '🎤', card: 281 },
      { en: 'box', ja: '箱', emoji: '📦', card: 409 },
      { en: 'money', ja: 'お金', emoji: '💰', card: 350 },
      { en: 'bread', ja: 'パン', emoji: '🍞', card: 410 },
      { en: 'food', ja: '食べ物', emoji: '🍱', card: 233 },
      { en: 'play', ja: '遊ぶ', emoji: '🛝', card: 165 },
      { en: 'draw', ja: '描く', emoji: '🖍️', card: 319 },
      { en: 'eat', ja: '食べる', emoji: '🍴', card: 222 },
      { en: 'read', ja: '読む', emoji: '📖', card: 168 },
    ],
  },
  {
    id: 'colors', title: 'Colors and opposites', icon: '🎨', easy: 6,
    words: [
      { en: 'white', ja: '白', color: '#ffffff', card: 298 },
      { en: 'black', ja: '黒', color: '#232323', card: 308 },
      { en: 'red', ja: '赤', color: '#e2483d', card: 366 },
      { en: 'green', ja: '緑', color: '#34a36a', card: 445 },
      { en: 'light', ja: '明かり', emoji: '💡', card: 254 },
      { en: 'dark', ja: '暗い', emoji: '🌑', card: 425 },
      { en: 'hot', ja: '熱い', emoji: '🥵', card: 449 },
      { en: 'cold', ja: '寒い', emoji: '🥶', card: 311 },
      { en: 'big', ja: '大きい', emoji: '🐘', card: 116 },
      { en: 'small', ja: '小さい', emoji: '🐭', card: 176 },
      { en: 'up', ja: '上へ', emoji: '⬆️', card: 83 },
      { en: 'down', ja: '下へ', emoji: '⬇️', card: 21 },
    ],
  },
  {
    id: 'numbers', title: 'Numbers', icon: '🔢',
    words: [
      { en: 'one', ja: '1', n: 1, card: 59 },
      { en: 'two', ja: '2', n: 2, card: 82 },
      { en: 'three', ja: '3', n: 3, card: 186 },
      { en: 'four', ja: '4', n: 4, card: 234 },
      { en: 'five', ja: '5', n: 5, card: 331 },
      { en: 'six', ja: '6', n: 6, card: 480 },
      { en: 'ten', ja: '10', n: 10, card: 490 },
      { en: 'hundred', ja: '100', emoji: '💯', card: 341 },
      { en: 'first', ja: '一番目', emoji: '🥇', card: 24 },
      { en: 'second', ja: '2番目', emoji: '🥈', card: 276 },
      { en: 'half', ja: '半分', emoji: '🌗', card: 446 },
      { en: 'pair', ja: 'ペア', emoji: '🧦', card: 466 },
    ],
  },
];

const FLIP_BACK_MS = 1000;
// Stars by moves, as a multiple of the number of pairs (a perfect game is 1×).
const THREE_STARS_MAX = 2.25;
const TWO_STARS_MAX = 3.5;
const OUTLINED_COLORS = ['#ffffff', '#232323'];
// Easy is today's 4×4 board; Big is 5×5 with 12 pairs and a free lemon in the center.
const SIZES = {
  easy: { label: 'Easy 4×4', cols: 4 },
  big: { label: 'Big 5×5', cols: 5, pairs: 12 },
};
const STORAGE_PREFIX = 'blb-english-memory:';

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
let englishVoice = null;
let soundOn = readStore('sound') !== 'off';

// Apple lists joke voices (Albert, Bad News, Bubbles…) first, so skip those.
const NOVELTY_VOICES = /^(Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox)$/i;
const STANDARD_VOICES = /^(Samantha|Google US English)/i;

function pickVoice() {
  const english = window.speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang) && !NOVELTY_VOICES.test(v.name));
  englishVoice = english.find(v => STANDARD_VOICES.test(v.name))
    || english.find(v => /^en[-_]US/i.test(v.lang))
    || english[0] || null;
}
if (canSpeak) {
  pickVoice();
  window.speechSynthesis.addEventListener('voiceschanged', pickVoice);
}

function say(text) {
  if (!canSpeak || !soundOn || !englishVoice) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = englishVoice;
    utterance.lang = englishVoice.lang;
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
  if (word.color) return 'Color: ' + word.ja;
  if (word.n) return 'Number ' + word.n;
  return 'Picture: ' + word.ja;
}

function updateLabel(card) {
  const face = card.kind === 'word' ? 'English word: ' + card.word.en : pictureLabel(card.word);
  card.el.setAttribute('aria-label', card.up
    ? `${card.name}, ${face}${card.matched ? ', matched' : ''}`
    : `${card.name}, face down`);
}

function buildFront(card) {
  const front = el('span', 'card-face card-front');
  const { word } = card;
  if (card.kind === 'word') {
    front.classList.add('is-word');
    const text = el('span', 'card-word', word.en);
    // Shrink long words (e.g. "mountains") so they fit on one line.
    const longest = Math.max(...word.en.split(/[\s']/).map(part => part.length));
    text.style.setProperty('--word-size', (Math.min(5.5, 34 / longest) * 4 / SIZES[size].cols).toFixed(2) + 'cqw');
    front.append(text);
  } else if (word.color) {
    const swatch = el('span', 'swatch');
    swatch.style.setProperty('--swatch', word.color);
    if (OUTLINED_COLORS.includes(word.color)) swatch.classList.add('swatch-outlined');
    front.append(swatch);
  } else if (word.n) {
    const dots = el('span', 'dots');
    for (let i = 0; i < word.n; i++) dots.append(el('span', 'dot'));
    if (word.n > 8) dots.classList.add('dots-wide'); // two rows of five
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
  streak = 0;
  open = [];
  locked = false;
  movesEl.textContent = '0';
  pairsInPlay = pairsFor(deck, size);
  $('game-title').textContent = deck.title + (size === 'big' ? ' · Big' : '');
  noteEl.textContent = 'Tap two cards to match a picture with its English word.';
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
  if (card.kind === 'word') say(card.word.en);

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
    if (card.kind === 'picture') say(card.word.en);
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
  const ja = el('span', '', word.ja);
  ja.lang = 'ja';
  noteEl.replaceChildren(el('strong', '', word.en), ' = ', ja, ' · ', el('span', 'card-number', `Card #${word.card} in Volume 1`));
}

function finish() {
  const pairs = pairsInPlay;
  const stars = moves <= pairs * THREE_STARS_MAX ? 3 : moves <= pairs * TWO_STARS_MAX ? 2 : 1;
  const best = readBest(deck, size);
  const isBest = best === null || moves < best;
  if (isBest) writeStore(bestKey(deck, size), moves);

  $('win-summary').textContent = `You matched all ${pairs} pairs in ${deck.title} in ${moves} moves.`;
  const starsEl = $('win-stars');
  starsEl.replaceChildren(...[1, 2, 3].map(n => el('span', n <= stars ? '' : 'star-off', '★')));
  starsEl.setAttribute('aria-label', `${stars} out of 3 stars`);
  starsEl.setAttribute('role', 'img');
  $('win-best').textContent = isBest ? 'New best score!' : `Your best: ${best} moves`;

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
