'use strict';

// ---------- Word data ----------
// To add a deck, add an object here. Every word needs ja (hiragana), ro (rōmaji) and en (its meaning).
// Add card (its number in the book) once the Japanese book is out; the match note shows it when present.
// The picture card shows the emoji, or a color circle (color), or a numeral with dots (n).
// The Easy board uses the first 8 words (or `easy` if set); the Big board uses the first 12.
const DECKS = [
  {
    id: 'food', title: 'Food', icon: '🍙',
    words: [
      { ja: 'りんご', ro: 'ringo', en: 'apple', emoji: '🍎' },
      { ja: 'みかん', ro: 'mikan', en: 'mandarin orange', emoji: '🍊' },
      { ja: 'いちご', ro: 'ichigo', en: 'strawberry', emoji: '🍓' },
      { ja: 'ごはん', ro: 'gohan', en: 'rice', emoji: '🍚' },
      { ja: 'みず', ro: 'mizu', en: 'water', emoji: '💧' },
      { ja: 'おちゃ', ro: 'ocha', en: 'green tea', emoji: '🍵' },
      { ja: 'たまご', ro: 'tamago', en: 'egg', emoji: '🥚' },
      { ja: 'すし', ro: 'sushi', en: 'sushi', emoji: '🍣' },
      { ja: 'おにぎり', ro: 'onigiri', en: 'rice ball', emoji: '🍙' },
      { ja: 'もも', ro: 'momo', en: 'peach', emoji: '🍑' },
      { ja: 'ぶどう', ro: 'budō', en: 'grapes', emoji: '🍇' },
      { ja: 'にく', ro: 'niku', en: 'meat', emoji: '🥩' },
    ],
  },
  {
    id: 'animals', title: 'Animals', icon: '🐶',
    words: [
      { ja: 'いぬ', ro: 'inu', en: 'dog', emoji: '🐶' },
      { ja: 'ねこ', ro: 'neko', en: 'cat', emoji: '🐱' },
      { ja: 'とり', ro: 'tori', en: 'bird', emoji: '🐦' },
      { ja: 'さかな', ro: 'sakana', en: 'fish', emoji: '🐟' },
      { ja: 'うま', ro: 'uma', en: 'horse', emoji: '🐴' },
      { ja: 'うし', ro: 'ushi', en: 'cow', emoji: '🐮' },
      { ja: 'ぶた', ro: 'buta', en: 'pig', emoji: '🐷' },
      { ja: 'うさぎ', ro: 'usagi', en: 'rabbit', emoji: '🐰' },
      { ja: 'さる', ro: 'saru', en: 'monkey', emoji: '🐵' },
      { ja: 'くま', ro: 'kuma', en: 'bear', emoji: '🐻' },
      { ja: 'かえる', ro: 'kaeru', en: 'frog', emoji: '🐸' },
      { ja: 'ぞう', ro: 'zō', en: 'elephant', emoji: '🐘' },
    ],
  },
  {
    id: 'nature', title: 'Nature and weather', icon: '🌸',
    words: [
      { ja: 'やま', ro: 'yama', en: 'mountain', emoji: '⛰️' },
      { ja: 'かわ', ro: 'kawa', en: 'river', emoji: '🏞️' },
      { ja: 'うみ', ro: 'umi', en: 'sea', emoji: '🌊' },
      { ja: 'き', ro: 'ki', en: 'tree', emoji: '🌳' },
      { ja: 'はな', ro: 'hana', en: 'flower', emoji: '🌸' },
      { ja: 'たいよう', ro: 'taiyō', en: 'sun', emoji: '☀️' },
      { ja: 'あめ', ro: 'ame', en: 'rain', emoji: '🌧️' },
      { ja: 'ゆき', ro: 'yuki', en: 'snow', emoji: '❄️' },
      { ja: 'つき', ro: 'tsuki', en: 'moon', emoji: '🌙' },
      { ja: 'ほし', ro: 'hoshi', en: 'star', emoji: '⭐' },
      { ja: 'くも', ro: 'kumo', en: 'cloud', emoji: '☁️' },
      { ja: 'かぜ', ro: 'kaze', en: 'wind', emoji: '🌬️' },
    ],
  },
  {
    id: 'town', title: 'Things that go and town', icon: '🚆',
    words: [
      { ja: 'くるま', ro: 'kuruma', en: 'car', emoji: '🚗' },
      { ja: 'でんしゃ', ro: 'densha', en: 'train', emoji: '🚆' },
      { ja: 'ふね', ro: 'fune', en: 'ship', emoji: '🚢' },
      { ja: 'ひこうき', ro: 'hikōki', en: 'plane', emoji: '✈️' },
      { ja: 'じてんしゃ', ro: 'jitensha', en: 'bike', emoji: '🚲' },
      { ja: 'いえ', ro: 'ie', en: 'house', emoji: '🏠' },
      { ja: 'がっこう', ro: 'gakkō', en: 'school', emoji: '🏫' },
      { ja: 'えき', ro: 'eki', en: 'station', emoji: '🚉' },
      { ja: 'みち', ro: 'michi', en: 'road', emoji: '🛣️' },
      { ja: 'みせ', ro: 'mise', en: 'shop', emoji: '🏪' },
      { ja: 'しんごう', ro: 'shingō', en: 'traffic light', emoji: '🚦' },
      { ja: 'こうえん', ro: 'kōen', en: 'park', emoji: '🛝' },
    ],
  },
  {
    id: 'home', title: 'Home and things', icon: '🔑',
    words: [
      { ja: 'ほん', ro: 'hon', en: 'book', emoji: '📕' },
      { ja: 'いす', ro: 'isu', en: 'chair', emoji: '🪑' },
      { ja: 'とけい', ro: 'tokei', en: 'clock', emoji: '⏰' },
      { ja: 'かぎ', ro: 'kagi', en: 'key', emoji: '🔑' },
      { ja: 'かさ', ro: 'kasa', en: 'umbrella', emoji: '☂️' },
      { ja: 'くつ', ro: 'kutsu', en: 'shoes', emoji: '👟' },
      { ja: 'ぼうし', ro: 'bōshi', en: 'hat', emoji: '👒' },
      { ja: 'かばん', ro: 'kaban', en: 'bag', emoji: '🎒' },
      { ja: 'まど', ro: 'mado', en: 'window', emoji: '🪟' },
      { ja: 'でんわ', ro: 'denwa', en: 'phone', emoji: '📱' },
      { ja: 'ふく', ro: 'fuku', en: 'clothes', emoji: '👕' },
      { ja: 'はし', ro: 'hashi', en: 'chopsticks', emoji: '🥢' },
    ],
  },
  {
    id: 'colors', title: 'Colors', icon: '🎨',
    words: [
      { ja: 'しろ', ro: 'shiro', en: 'white', color: '#ffffff' },
      { ja: 'くろ', ro: 'kuro', en: 'black', color: '#232323' },
      { ja: 'あか', ro: 'aka', en: 'red', color: '#e2483d' },
      { ja: 'あお', ro: 'ao', en: 'blue', color: '#2D6CDF' },
      { ja: 'きいろ', ro: 'kiiro', en: 'yellow', color: '#FFC93C' },
      { ja: 'みどり', ro: 'midori', en: 'green', color: '#34a36a' },
      { ja: 'ちゃいろ', ro: 'chairo', en: 'brown', color: '#8b5a2b' },
      { ja: 'ももいろ', ro: 'momoiro', en: 'pink', color: '#f59ac0' },
      { ja: 'むらさき', ro: 'murasaki', en: 'purple', color: '#8e5bd6' },
      { ja: 'はいいろ', ro: 'haiiro', en: 'gray', color: '#9a958c' },
      { ja: 'きんいろ', ro: 'kin-iro', en: 'gold', color: '#d4a82c' },
      { ja: 'ぎんいろ', ro: 'gin-iro', en: 'silver', color: '#c4c8cc' },
    ],
  },
  {
    id: 'numbers', title: 'Numbers', icon: '🔢',
    words: [
      { ja: 'いち', ro: 'ichi', en: 'one', n: 1 },
      { ja: 'に', ro: 'ni', en: 'two', n: 2 },
      { ja: 'さん', ro: 'san', en: 'three', n: 3 },
      { ja: 'よん', ro: 'yon', en: 'four', n: 4 },
      { ja: 'ご', ro: 'go', en: 'five', n: 5 },
      { ja: 'ろく', ro: 'roku', en: 'six', n: 6 },
      { ja: 'なな', ro: 'nana', en: 'seven', n: 7 },
      { ja: 'はち', ro: 'hachi', en: 'eight', n: 8 },
      { ja: 'きゅう', ro: 'kyū', en: 'nine', n: 9 },
      { ja: 'じゅう', ro: 'jū', en: 'ten', n: 10 },
      { ja: 'ひゃく', ro: 'hyaku', en: 'hundred', emoji: '💯' },
      { ja: 'いちばん', ro: 'ichiban', en: 'number one, first', emoji: '🥇' },
    ],
  },
];

const FLIP_BACK_MS = 1000;
// Stars by moves, as a multiple of the number of pairs (a perfect game is 1×).
const THREE_STARS_MAX = 2.25;
const TWO_STARS_MAX = 3.5;
const OUTLINED_COLORS = ['white', 'black', 'silver'];
// Easy is today's 4×4 board; Big is 5×5 with 12 pairs and a free lemon in the center.
const SIZES = {
  easy: { label: 'Easy 4×4', cols: 4 },
  big: { label: 'Big 5×5', cols: 5, pairs: 12 },
};
const STORAGE_PREFIX = 'blb-japanese-memory:';
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
let japaneseVoice = null;
let soundOn = readStore('sound') !== 'off';

// Apple lists robotic "Eloquence" voices (Eddy, Flo, Grandma…) first, so prefer the standard ones.
const STANDARD_VOICES = /^(Kyoko|Otoya|O-Ren|Google 日本語)/i;

function pickVoice() {
  const japanese = window.speechSynthesis.getVoices().filter(v => /^ja/i.test(v.lang));
  japaneseVoice = japanese.find(v => STANDARD_VOICES.test(v.name)) || japanese[0] || null;
}
if (canSpeak) {
  pickVoice();
  window.speechSynthesis.addEventListener('voiceschanged', pickVoice);
}

function say(text) {
  if (!canSpeak || !soundOn || !japaneseVoice) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = japaneseVoice;
    utterance.lang = japaneseVoice.lang;
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
  const face = card.kind === 'word' ? `Japanese word: ${card.word.ja} (${card.word.ro})` : pictureLabel(card.word);
  card.el.setAttribute('aria-label', card.up
    ? `${card.name}, ${face}${card.matched ? ', matched' : ''}`
    : `${card.name}, face down`);
}

function buildFront(card) {
  const front = el('span', 'card-face card-front');
  const { word } = card;
  if (card.kind === 'word') {
    front.classList.add('is-word');
    const text = el('span', 'card-word', word.ja);
    text.lang = 'ja';
    text.append(el('span', 'card-romaji', word.ro));
    // Shrink long words (e.g. "じてんしゃ") so the hiragana and the rōmaji fit on one line each.
    const fit = Math.min(5.5, 16 / word.ja.length, 52 / word.ro.length);
    text.style.setProperty('--word-size', (fit * 4 / SIZES[size].cols).toFixed(2) + 'cqw');
    front.append(text);
  } else if (word.color) {
    const swatch = el('span', 'swatch');
    swatch.style.setProperty('--swatch', word.color);
    if (OUTLINED_COLORS.includes(word.en)) swatch.classList.add('swatch-outlined');
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
  noteEl.textContent = 'Tap two cards to match a picture with its Japanese word.';
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
  if (card.kind === 'word') say(card.word.ja);

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
    if (card.kind === 'picture') say(card.word.ja);
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
  const ja = el('strong', '', word.ja);
  ja.lang = 'ja';
  noteEl.replaceChildren(ja, ` (${word.ro}) = ${word.en}`);
  if (word.card) noteEl.append(' · ', el('span', 'card-number', `Card #${word.card} in Volume 1`));
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
