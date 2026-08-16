// ---------- Data ----------
// Each landmark can later gain a `photo: "url.jpg"` field. The render
// function checks photo -> svg -> emoji, in that order, so swapping in a
// real photo later is a one-line change per item.

const LANDMARKS = [
  { id: "tokyo-tower", title: "Tokyo Tower", emoji: "🗼",
    fact: "Guess which world-famous tower inspired Tokyo Tower's design.",
    bonus: "Tokyo Tower is 333 meters tall, a little taller than the Eiffel Tower it was inspired by, and it still broadcasts TV signals across the city.",
    kana: "タワー", romaji: "ta-waa", meaning: "tower",
    maps: "https://www.google.com/maps/search/?api=1&query=Tokyo+Tower" },

  { id: "tokyo-skytree", title: "Tokyo Skytree", svg: true,
    fact: "Guess what secret meaning is hidden in the Skytree's exact height.",
    bonus: "At 634 meters tall, the Skytree was the world's tallest tower when it opened in 2012, and its height even spells out \"mu-sa-shi,\" the old name for the Tokyo area, in Japanese wordplay!",
    kana: "そら", romaji: "so-ra", meaning: "sky",
    maps: "https://www.google.com/maps/search/?api=1&query=Tokyo+Skytree" },

  { id: "shibuya-crossing", title: "Shibuya Scramble Crossing", emoji: "🚦",
    fact: "You colored this famous crossing. Flip to meet the loyal dog statue waiting just around the corner.",
    bonus: "Giant video screens tower over the crossing, and the loyal dog statue Hachiko waits just around the corner, making this one of the most photographed intersections on Earth.",
    kana: "こんにちは", romaji: "kon-ni-chi-wa", meaning: "hello",
    maps: "https://www.google.com/maps/search/?api=1&query=Shibuya+Scramble+Crossing" },

  { id: "hachiko", title: "Hachiko the Loyal Dog", emoji: "🐕",
    fact: "Guess where in Tokyo you can still visit Hachiko today, beyond his statue.",
    bonus: "Hachiko has his own statue in Shibuya and another in his hometown of Odate, and his real preserved body can still be seen at a science museum in Tokyo today.",
    kana: "いぬ", romaji: "i-nu", meaning: "dog" },

  { id: "sushi", title: "A Sushi Set", emoji: "🍣",
    fact: "Guess what everyday factory idea inspired sushi that rides a conveyor belt to your table.",
    bonus: "That conveyor-belt idea is called kaiten-zushi. It was invented in Osaka in 1958 by a chef inspired by watching beer bottles roll along a factory line.",
    kana: "おすし", romaji: "o-su-shi", meaning: "sushi" },

  { id: "takeshita-street", title: "Takeshita Street", emoji: "🍭",
    fact: "Guess how long this famously packed street actually is.",
    bonus: "The whole street is only about 350 meters long, but it gets so crowded on weekends that it sometimes turns into a one-way, pedestrians-only path.",
    kana: "かわいい", romaji: "ka-wa-ii", meaning: "cute",
    maps: "https://www.google.com/maps/search/?api=1&query=Takeshita+Street+Harajuku+Tokyo" },

  { id: "harajuku-crepe", title: "Harajuku Crepe", emoji: "🥞",
    fact: "Guess why Harajuku crepes are always rolled into a cone instead of served flat.",
    bonus: "Harajuku crepes became a craze back in the 1970s. They're folded into a cone shape on purpose, so you can eat one while strolling and shopping.",
    kana: "クレープ", romaji: "ku-re-e-pu", meaning: "crepe" },

  { id: "kimono", title: "Wearing a Kimono", emoji: "👘",
    fact: "You colored one of these back home. Flip to see just how long a real one can take to put on.",
    bonus: "The word kimono literally means \"thing to wear.\" A full formal kimono has so many layers and folds that it can take over an hour to put on correctly!",
    kana: "きもの", romaji: "ki-mo-no", meaning: "kimono" },

  { id: "meiji-shrine", title: "Meiji Shrine Gate", emoji: "⛩️",
    fact: "Guess how many trees it took to plant the peaceful forest around this shrine.",
    bonus: "The peaceful forest surrounding the shrine isn't wild. It was hand-planted in 1920 using about 100,000 trees donated from every corner of Japan.",
    kana: "とりい", romaji: "to-ri-i", meaning: "shrine gate",
    maps: "https://www.google.com/maps/search/?api=1&query=Meiji+Shrine+Tokyo" },

  { id: "wishing-plaques", title: "Wishing Plaques", emoji: "🪧",
    fact: "",
    bonus: "Today shrines sell ema in all sorts of designs, from Mt. Fuji to zodiac animals to cartoon characters, but the custom of writing a wish goes back hundreds of years.",
    kana: "えま", romaji: "e-ma", meaning: "wishing plaque" },

  { id: "ramen", title: "A Bowl of Ramen", emoji: "🍜",
    fact: "Guess which country ramen actually came from, before Japan made it its own.",
    bonus: "Ramen actually began as a Chinese noodle dish over a century ago, then Japan made it its own, which is why every region now has a totally different style.",
    kana: "ラーメン", romaji: "raa-men", meaning: "ramen" },

  { id: "sensoji", title: "Senso-ji Temple", emoji: "🏮",
    fact: "Guess how this ancient temple got its start, way back in the year 628.",
    bonus: "Legend says two fishermen pulled a tiny golden statue of the goddess Kannon from the river in the year 628, and the temple was built to honor her.",
    kana: "おてら", romaji: "o-te-ra", meaning: "temple",
    maps: "https://www.google.com/maps/search/?api=1&query=Senso-ji+Temple+Tokyo" },

  { id: "imperial-palace", title: "The Imperial Palace", emoji: "🏯",
    fact: "Guess whose real home this still is today.",
    bonus: "The palace stands on the site of the old Edo Castle, and it's still the real home of Japan's Emperor today.",
    kana: "おしろ", romaji: "o-shi-ro", meaning: "castle",
    maps: "https://www.google.com/maps/search/?api=1&query=Tokyo+Imperial+Palace" },

  { id: "daruma", title: "The Daruma Doll", svg: true,
    fact: "Guess why this round lucky doll has no arms or legs.",
    bonus: "Daruma dolls are modeled after a monk named Bodhidharma, who is said to have meditated so long that his arms and legs disappeared. That's why the doll is round with no limbs!",
    kana: "ねがい", romaji: "ne-ga-i", meaning: "a wish" },

  { id: "koi-pond", title: "Koi Fish Pond", emoji: "🐟",
    fact: "You colored these swimming friends. Flip to see how much a prize-winning one can sell for.",
    bonus: "Koi patterns even have special names, like kohaku for red-and-white, and a truly prize-winning koi has sold at auction for over a million dollars.",
    kana: "さかな", romaji: "sa-ka-na", meaning: "fish" },

  { id: "ichigo-daifuku", title: "Ichigo Daifuku", emoji: "🍡",
    fact: "",
    bonus: "That hammer-pounding tradition is called mochitsuki, and families across Japan often do it together every New Year for good luck.",
    kana: "いちご", romaji: "i-chi-go", meaning: "strawberry" },

  { id: "lucky-cat", title: "The Lucky Cat", emoji: "🐱",
    fact: "Guess how a cat's wave is said to have once saved a samurai's life.",
    bonus: "Legend says a temple cat once waved a passing samurai inside just before lightning struck the spot where he'd been standing, so shop owners have kept a waving cat by the door for luck ever since.",
    kana: "ねこ", romaji: "ne-ko", meaning: "cat" },

  { id: "akihabara", title: "Akihabara Toy Shop", emoji: "🎮",
    fact: "Guess what this neighborhood was famous for before games and anime took over.",
    bonus: "Right after World War II, Akihabara was actually famous mostly for electronics parts. It only grew into today's anime-and-games capital later on.",
    kana: "ロボット", romaji: "ro-bo-tto", meaning: "robot",
    maps: "https://www.google.com/maps/search/?api=1&query=Akihabara+Tokyo" },

  { id: "gacha-gacha", title: "Gacha Gacha Machines", emoji: "🎰",
    fact: "",
    bonus: "There are said to be over 300,000 gacha gacha machines across Japan, with brand-new capsule designs showing up almost every week.",
    kana: "おもちゃ", romaji: "o-mo-cha", meaning: "toy" },

  { id: "fireworks", title: "Fireworks Festival", emoji: "🎆",
    fact: "Guess how many fireworks light up the sky during Tokyo's biggest festival in just one night.",
    bonus: "Tokyo's biggest, the Sumida River Hanabi Taikai, launches around 20,000 fireworks in a single night and has been held since 1733.",
    kana: "はなび", romaji: "ha-na-bi", meaning: "fireworks" },

  { id: "vending-machines", title: "Vending Machines", emoji: "🥤",
    fact: "Guess roughly how many people share each vending machine in Japan.",
    bonus: "Japan has roughly one vending machine for every 25 people, one of the highest rates on Earth, and some even sell hot canned corn soup in winter.",
    kana: "みず", romaji: "mi-zu", meaning: "water" },

  { id: "bakery", title: "Japanese Bakery", emoji: "🍞",
    fact: "You colored these treats. Flip to find out where the word \"pan\" actually came from.",
    bonus: "The word \"pan\" for bread came from Portuguese traders who arrived in Japan in the 1500s. It sounds like the Portuguese word \"pão\" to this day!",
    kana: "パン", romaji: "pan", meaning: "bread" },

  { id: "yamanote-line", title: "The Yamanote Line", emoji: "🚃",
    fact: "Guess how often trains run on this loop line at the busiest times of day.",
    bonus: "Trains run so often on this line, one every 2 to 4 minutes at rush hour, that most Tokyo commuters never even check a timetable.",
    kana: "でんしゃ", romaji: "den-sha", meaning: "train" },

  { id: "tsukiji-market", title: "Tsukiji Fish Market", emoji: "🐡",
    fact: "Guess where the famous tuna auctions moved to, back in 2018.",
    bonus: "The famous wholesale tuna auctions moved to a newer market called Toyosu in 2018, but Tsukiji's outer market streets are still packed with food stalls today.",
    kana: "いちば", romaji: "i-chi-ba", meaning: "market",
    maps: "https://www.google.com/maps/search/?api=1&query=Tsukiji+Outer+Market+Tokyo" },

  { id: "tokyo-dome", title: "Tokyo Dome Game", emoji: "⚾",
    fact: "",
    bonus: "Tokyo Dome's nickname is \"The Big Egg,\" thanks to its big rounded white roof.",
    kana: "やきゅう", romaji: "ya-kyuu", meaning: "baseball",
    maps: "https://www.google.com/maps/search/?api=1&query=Tokyo+Dome" },

  { id: "tokyo-station", title: "Tokyo Station", emoji: "🚉",
    fact: "You colored this busy station. Flip to see which continent inspired its design.",
    bonus: "The station's red-brick building was modeled after European train stations, and it was carefully restored to its original 1914 look in 2012.",
    kana: "えき", romaji: "e-ki", meaning: "station",
    maps: "https://www.google.com/maps/search/?api=1&query=Tokyo+Station" },

  { id: "bullet-train", title: "The Bullet Train", emoji: "🚅",
    fact: "Guess what major event the first bullet train was built in time for, back in 1964.",
    bonus: "The very first shinkansen opened in 1964, just in time for the Tokyo Olympics, and in over 60 years running, it has never had a passenger fatality from a derailment or collision.",
    kana: "しんかんせん", romaji: "shin-kan-sen", meaning: "bullet train" },
];

const PHRASES = [
  { en: "Hello", kana: "こんにちは", romaji: "kon-ni-chi-wa" },
  { en: "Good morning", kana: "おはよう", romaji: "o-ha-yo-o" },
  { en: "Good night", kana: "おやすみ", romaji: "o-ya-su-mi" },
  { en: "Thank you very much", kana: "ありがとうございます", romaji: "a-ri-ga-to-o go-za-i-masu" },
  { en: "Please", kana: "おねがいします", romaji: "o-ne-gai-shi-masu" },
  { en: "Excuse me", kana: "すみません", romaji: "su-mi-ma-sen" },
  { en: "It's delicious", kana: "おいしい", romaji: "o-i-shii" },
  { en: "See you", kana: "またね", romaji: "ma-ta-ne" },
  { en: "Goodbye", kana: "さようなら", romaji: "sa-yo-o-na-ra" },
];

// Subset shown as pins on the illustrated map, positioned by % within the
// 600x460 map-canvas viewBox.
const MAP_PINS = [
  { id: "tokyo-dome", x: 22, y: 24 },
  { id: "sensoji", x: 58, y: 14 },
  { id: "tokyo-skytree", x: 92, y: 18 },
  { id: "akihabara", x: 48, y: 28 },
  { id: "imperial-palace", x: 34, y: 36 },
  { id: "meiji-shrine", x: 14, y: 44 },
  { id: "takeshita-street", x: 16, y: 56 },
  { id: "tokyo-tower", x: 38, y: 58 },
  { id: "shibuya-crossing", x: 22, y: 66 },
  { id: "tokyo-station", x: 44, y: 44 },
  { id: "tsukiji-market", x: 60, y: 64 },
];

// Custom hand-built SVGs for the couple of spots that need their own look.
const CUSTOM_SVGS = {
  "tokyo-skytree": `<svg viewBox="0 0 40 40"><g fill="#22405e"><rect x="18" y="4" width="4" height="32"/><rect x="14" y="14" width="12" height="4" rx="1.5"/><rect x="16" y="9" width="8" height="4" rx="1.5"/><circle cx="20" cy="4" r="2"/></g></svg>`,
  "daruma": `<svg viewBox="0 0 40 40"><g><ellipse cx="20" cy="24" rx="13" ry="12" fill="#E8402A"/><ellipse cx="20" cy="13" rx="8" ry="7" fill="#fdece7"/><circle cx="17" cy="12" r="1.6" fill="#1a1a1a"/><circle cx="23" cy="12" r="1.6" fill="#1a1a1a"/><path d="M15 18 Q20 21 25 18" stroke="#1a1a1a" stroke-width="1.2" fill="none" stroke-linecap="round"/></g></svg>`,
};

// ---------- Render: landmark grid ----------
function iconMarkup(item) {
  if (item.photo) return `<img src="${item.photo}" alt="${item.title}" loading="lazy">`;
  if (item.svg && CUSTOM_SVGS[item.id]) return CUSTOM_SVGS[item.id];
  return item.emoji || "";
}

function renderLandmarks() {
  const grid = document.getElementById("landmark-grid");
  const cards = LANDMARKS.map((item) => `
    <article class="landmark-card" id="card-${item.id}" data-id="${item.id}" tabindex="0" role="button" aria-label="Flip card: ${item.title}">
      <div class="card-face-front">
        <div class="card-icon">${iconMarkup(item)}</div>
        <h3>${item.title}</h3>
        ${item.fact ? `<p class="card-fact">${item.fact}</p>` : ""}
        <p class="card-toggle-hint">Tap for a bonus fact →</p>
      </div>
      <div class="card-back">
        <p class="card-bonus-label">Bonus fact</p>
        <p class="card-bonus">${item.bonus}</p>
        <div class="card-word-row">
          <div class="card-word">
            <div class="card-kana">${item.kana}</div>
            <div class="card-romaji">${item.romaji}</div>
            <div class="card-meaning">"${item.meaning}"</div>
          </div>
          <button class="hear-btn" data-kana="${item.kana}" aria-label="Hear ${item.kana} said out loud">🔊</button>
        </div>
        ${item.maps ? `<a class="maps-link" href="${item.maps}" target="_blank" rel="noopener">📍 Open in Google Maps ↗</a>` : ""}
      </div>
    </article>
  `).join("");
  grid.innerHTML = cards;

  grid.querySelectorAll(".landmark-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".hear-btn") || e.target.closest(".maps-link")) return;
      card.classList.toggle("flipped");
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });

  grid.querySelectorAll(".hear-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      speak(btn.dataset.kana, btn);
    });
  });
}

// ---------- Render: map pins ----------
function renderMapPins() {
  const wrap = document.getElementById("map-pins");
  const byId = Object.fromEntries(LANDMARKS.map((l) => [l.id, l]));
  wrap.innerHTML = MAP_PINS.map((pin) => {
    const item = byId[pin.id];
    if (!item) return "";
    const glyph = item.svg ? "📍" : (item.emoji || "📍");
    const mapsLink = item.maps
      ? `<a class="map-pin-link" href="${item.maps}" target="_blank" rel="noopener" aria-label="Open ${item.title} in Google Maps">🗺️</a>`
      : "";
    return `<div class="map-pin-group" style="left:${pin.x}%; top:${pin.y}%;">
      <button class="map-pin" data-target="card-${item.id}">
        <span class="pin-emoji">${glyph}</span>${item.title}
      </button>
      ${mapsLink}
    </div>`;
  }).join("");

  wrap.querySelectorAll(".map-pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      const target = document.getElementById(pin.dataset.target);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("flipped");
      target.animate(
        [{ boxShadow: "0 0 0 0 rgba(232,64,42,0.6)" }, { boxShadow: "0 0 0 10px rgba(232,64,42,0)" }],
        { duration: 700 }
      );
    });
  });
}

// ---------- Render: phrases ----------
function renderPhrases() {
  const list = document.getElementById("phrase-list");
  list.innerHTML = PHRASES.map((p, i) => `
    <div class="phrase-card">
      <div>
        <div class="phrase-en">${p.en}</div>
        <div class="phrase-kana">${p.kana}</div>
        <div class="phrase-romaji">${p.romaji}</div>
      </div>
      <button class="hear-btn" data-kana="${p.kana}" aria-label="Hear ${p.en} said in Japanese">🔊</button>
    </div>
  `).join("");

  list.querySelectorAll(".hear-btn").forEach((btn) => {
    btn.addEventListener("click", () => speak(btn.dataset.kana, btn));
  });
}

// ---------- Speech synthesis ----------
// Known female Japanese voice names across browsers/OSes (Safari/macOS,
// Chrome/Google, Edge/Microsoft), matched case-insensitively.
const FEMALE_JA_VOICE_NAMES = ["kyoko", "o-ren", "haruka", "ayumi", "nanami", "mizuki", "sayaka"];

function pickJapaneseFemaleVoice() {
  const voices = window.speechSynthesis.getVoices();
  const jaVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("ja"));
  const female = jaVoices.find((v) =>
    FEMALE_JA_VOICE_NAMES.some((name) => v.name.toLowerCase().includes(name))
  );
  return female || jaVoices[0] || null;
}

if ("speechSynthesis" in window) {
  // Chrome loads voices asynchronously; this warms the list so the first
  // click already has a female voice to pick from.
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

function speak(text, btn) {
  if (!("speechSynthesis" in window)) {
    alert("Sorry, this browser can't speak Japanese out loud. Try Chrome or Safari!");
    return;
  }
  window.speechSynthesis.cancel();
  // Chrome silently drops speak() if it's called in the same tick as
  // cancel(), so give it a beat before queuing the new utterance.
  setTimeout(() => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.85;
    const voice = pickJapaneseFemaleVoice();
    if (voice) {
      // Match lang to the chosen voice exactly, mismatched lang/voice
      // pairs are another common cause of silent playback failures.
      utter.voice = voice;
      utter.lang = voice.lang;
    } else {
      utter.lang = "ja-JP";
    }
    if (btn) {
      btn.dataset.playing = "1";
      utter.onend = () => { btn.dataset.playing = "0"; };
      utter.onerror = () => { btn.dataset.playing = "0"; };
    }
    window.speechSynthesis.speak(utter);
  }, 50);
}

// ---------- Printables ----------
function setupPrintables() {
  document.getElementById("print-stamps").addEventListener("click", () => {
    document.getElementById("print-stampsheet").classList.add("active-print");
    window.print();
  });
}

// ---------- Init ----------
renderLandmarks();
renderMapPins();
renderPhrases();
setupPrintables();
