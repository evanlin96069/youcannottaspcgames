let entries = [];
let sortNewest = true;

const GAME_NAMES = {
  hl1: "Half-Life",
  hl2: "Half-Life 2",
  portal: "Portal",
  portal_2: "Portal 2",
  quake: "Quake"
};

const entriesEl = document.getElementById("entries");
const sortBtn = document.getElementById("sort-btn");
const filterSelect = document.getElementById("game-filter");

const PLAY_SVG = '<svg viewBox="0 0 68 48"><path d="M66.5 7.7s-.7-4.7-2.8-6.8C60.7-2 57.2-2 55.6-2.2 46.4-3 34-3 34-3s-12.4 0-21.6.8C10.8-2 7.3-2 4.3.9 2.2 3 1.5 7.7 1.5 7.7S.8 13.3.8 18.8v5.2c0 5.5.7 11.1.7 11.1s.7 4.7 2.8 6.8c3 3.1 7 3 8.7 3.3C19.4 45.5 34 45.6 34 45.6s12.4 0 21.6-.8c1.6-.2 5.1-.2 8.1-3.1 2.1-2.1 2.8-6.8 2.8-6.8s.7-5.5.7-11.1v-5.2c0-5.5-.7-11-.7-10.9z" fill="red"/><path d="M27 33V13l18.4 10L27 33z" fill="#fff"/></svg>';

fetch("data.json")
  .then(function (r) { return r.json(); })
  .then(function (data) {
    entries = data;
    buildGameFilter();
    applyHash();
    render();
  });

function buildGameFilter() {
  const games = new Set();
  entries.forEach(function (e) { if (e.game) games.add(e.game); });
  Array.from(games).sort().forEach(function (g) {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = GAME_NAMES[g] || g;
    filterSelect.appendChild(opt);
  });
}

function applyHash() {
  const hash = decodeURIComponent(location.hash.slice(1));
  if (hash) {
    const options = filterSelect.options;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value.toLowerCase() === hash.toLowerCase()) {
        filterSelect.value = options[i].value;
        return;
      }
    }
  }
}

function getFiltered() {
  const game = filterSelect.value;
  let list = game === "All" ? entries.slice() : entries.filter(function (e) { return e.game === game; });

  list.sort(function (a, b) {
    var da = a.date === "coming soon" ? 8640000000000000 : new Date(a.date).getTime();
    var db = b.date === "coming soon" ? 8640000000000000 : new Date(b.date).getTime();
    return sortNewest ? db - da : da - db;
  });

  return list;
}

function render() {
  var list = getFiltered();
  entriesEl.innerHTML = "";
  list.forEach(function (e) {
    var div = document.createElement("div");
    div.className = "entry";

    var thumbUrl = "https://i.ytimg.com/vi/" + encodeURIComponent(e.videoId) + "/mqdefault.jpg";
    var watchUrl = "https://www.youtube.com/watch?v=" + encodeURIComponent(e.videoId);

    div.innerHTML =
      '<a class="thumb" href="' + watchUrl + '" target="_blank" rel="noopener">' +
        '<img src="' + thumbUrl + '" alt="' + e.title.replace(/"/g, '&quot;') + '" loading="lazy">' +
        '<span class="play-icon">' + PLAY_SVG + '</span>' +
      '</a>' +
      '<div class="info">' +
        '<h2>' + e.title.replace(/</g, '&lt;') + '</h2>' +
        '<p class="meta">' + e.author.replace(/</g, '&lt;') + ' &middot; ' + e.date + '</p>' +
        (e.game ? '<span class="game-tag">' + (GAME_NAMES[e.game] || e.game).replace(/</g, '&lt;') + '</span>' : '') +
      '</div>';

    entriesEl.appendChild(div);
  });
  observeEntries();
}

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeEntries() {
  entriesEl.querySelectorAll(".entry").forEach(function (el) {
    observer.observe(el);
  });
}

sortBtn.addEventListener("click", function () {
  sortNewest = !sortNewest;
  sortBtn.textContent = "Sort by Date (" + (sortNewest ? "Newest to Oldest" : "Oldest to Newest") + ")";
  render();
});

filterSelect.addEventListener("change", function () {
  var game = filterSelect.value;
  location.hash = game === "All" ? "" : encodeURIComponent(game);
  render();
});

window.addEventListener("hashchange", function () {
  applyHash();
  render();
});
