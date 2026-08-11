const STORAGE_KEY = "bioloop-progress-v1";
const DAILY_GOAL = 20;
const SESSION_SIZE = 10;

const state = {
  view: "study",
  direction: "en-zh",
  category: "all",
  queue: [],
  index: 0,
  sessionResults: [],
  progress: loadProgress(),
  confusion: CONFUSIONS[0].id,
  root: ROOTS[0].id,
  lexiconCategory: "all",
  query: ""
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && saved.cards ? saved : { cards: {}, history: {}, lastStudy: null };
  } catch { return { cards: {}, history: {}, lastStudy: null }; }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  updateStats();
}

function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}

function dayOffset(days) {
  const d = new Date();
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() + days);
  return d.getTime();
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function termById(id) { return TERMS.find(term => term.id === id); }
function rootById(id) { return ROOTS.find(root => root.id === id); }

function categories() { return [...new Set(TERMS.map(t => t.category))]; }

function init() {
  fillCategories();
  bindEvents();
  buildSession();
  renderConfusions();
  renderRootList();
  renderRootNetwork();
  renderLexiconFilters();
  renderLexicon();
  updateStats();
}

function fillCategories() {
  categories().forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    $("#categorySelect").append(option);
  });
}

function bindEvents() {
  $$(".nav-item").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
  $$("[data-direction]").forEach(button => button.addEventListener("click", () => {
    state.direction = button.dataset.direction;
    $$("[data-direction]").forEach(b => b.classList.toggle("active", b === button));
    renderCard();
  }));
  $("#categorySelect").addEventListener("change", event => { state.category = event.target.value; buildSession(); });
  $("#shuffleButton").addEventListener("click", () => { buildSession(); toast("已换一组词"); });
  $("#flashcard").addEventListener("click", flipCard);
  $$(".rating").forEach(button => button.addEventListener("click", () => rateCard(button.dataset.rating)));
  $("#searchInput").addEventListener("input", event => { state.query = event.target.value.trim().toLowerCase(); renderLexicon(); });
  $("#exportButton").addEventListener("click", exportProgress);
  $("#resetButton").addEventListener("click", resetProgress);
  document.addEventListener("keydown", handleKeydown);
}

function switchView(view) {
  state.view = view;
  $$(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === view));
  $$(".view").forEach(section => section.classList.remove("active"));
  $(`#${view}View`).classList.add("active");
  const titles = {
    study: ["TODAY'S SESSION", "把专业词汇，变成你的直觉。"],
    confusions: ["PRECISION TRAINING", "看清相似术语之间的边界。"],
    roots: ["MORPHOLOGY MAP", "用构词规律，成组记住术语。"],
    lexicon: ["LOCAL LIBRARY", "查找、回顾与管理你的词库。"]
  };
  $("#pageEyebrow").textContent = titles[view][0];
  $("#pageTitle").textContent = titles[view][1];
}

function buildSession() {
  const now = Date.now();
  const pool = TERMS.filter(term => state.category === "all" || term.category === state.category);
  const due = pool.filter(term => !state.progress.cards[term.id] || state.progress.cards[term.id].due <= now);
  const later = pool.filter(term => state.progress.cards[term.id] && state.progress.cards[term.id].due > now);
  state.queue = [...shuffle(due), ...shuffle(later)].slice(0, Math.min(SESSION_SIZE, pool.length));
  state.index = 0;
  state.sessionResults = [];
  renderCard();
  updateSessionUI();
}

function currentTerm() { return state.queue[state.index]; }

function renderCard() {
  const term = currentTerm();
  if (!term) return;
  const isEnglishFront = state.direction === "en-zh";
  $("#flashcard").classList.remove("flipped");
  $("#ratingPanel").classList.remove("ready");
  $("#frontCategory").textContent = term.category;
  $("#backCategory").textContent = term.category;
  $("#frontPhonetic").textContent = isEnglishFront ? term.phonetic : "中文释义";
  $("#frontTerm").textContent = isEnglishFront ? term.en : term.zh;
  $("#frontPrompt").textContent = isEnglishFront ? "你能说出它的中文含义吗？" : "你能拼出对应的英文术语吗？";
  $("#backPhonetic").textContent = term.phonetic;
  $("#backTerm").textContent = term.en;
  $("#backChinese").textContent = term.zh;
  $("#backExample").textContent = term.example ? `${term.example}  ${term.note}` : term.note;
  $("#backRoots").textContent = term.roots.length
    ? term.roots.map(id => { const root = rootById(id); return `${root.form}（${root.meaning}）`; }).join(" + ")
    : "该词建议结合语境整体记忆";
  updateSessionUI();
}

function flipCard() {
  $("#flashcard").classList.toggle("flipped");
  $("#ratingPanel").classList.toggle("ready", $("#flashcard").classList.contains("flipped"));
}

function rateCard(rating) {
  if (!$("#ratingPanel").classList.contains("ready")) return;
  const term = currentTerm();
  const previous = state.progress.cards[term.id] || { level: 0, seen: 0 };
  let level = previous.level || 0;
  let delay = 0;
  if (rating === "again") { level = Math.max(0, level - 1); delay = 0; }
  if (rating === "hard") { level = Math.max(1, level); delay = 1; }
  if (rating === "easy") { level = Math.min(5, level + 1); delay = [0, 1, 3, 7, 14, 30][level]; }
  state.progress.cards[term.id] = { level, seen: previous.seen + 1, due: dayOffset(delay), lastRating: rating };
  const today = dateKey();
  state.progress.history[today] = (state.progress.history[today] || 0) + 1;
  state.progress.lastStudy = today;
  state.sessionResults[state.index] = rating;
  saveProgress();
  if (state.index < state.queue.length - 1) {
    state.index++;
    renderCard();
  } else {
    toast("本轮完成，已根据掌握程度安排复习");
    setTimeout(buildSession, 500);
  }
}

function updateSessionUI() {
  if (!state.queue.length) return;
  $("#sessionStep").textContent = `${state.index + 1} / ${state.queue.length}`;
  $("#sessionDots").innerHTML = state.queue.map((_, index) => `<i class="${index < state.index ? "done" : index === state.index ? "current" : ""}"></i>`).join("");
  const known = state.sessionResults.filter(r => r === "easy").length;
  $("#masteredCount").textContent = `${known} / ${state.queue.length}`;
  $("#masteredBar").style.width = `${known / state.queue.length * 100}%`;
}

function updateStats() {
  const today = dateKey();
  const todayCount = state.progress.history[today] || 0;
  const mastered = Object.values(state.progress.cards).filter(card => card.level >= 3).length;
  const due = TERMS.filter(term => !state.progress.cards[term.id] || state.progress.cards[term.id].due <= Date.now()).length;
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    if (state.progress.history[dateKey(d)]) streak++;
    else if (i > 0 || todayCount === 0) break;
  }
  $("#streakCount").textContent = Math.max(streak, todayCount ? 1 : 0);
  $("#totalMastered").textContent = `${mastered} 词`;
  $("#dueBadge").textContent = due;
  $("#goalDone").textContent = Math.min(todayCount, DAILY_GOAL);
  const percent = Math.min(100, Math.round(todayCount / DAILY_GOAL * 100));
  $("#goalText").textContent = `${percent}%`;
  $("#goalRing").style.borderTopColor = percent >= 100 ? "#91e39f" : "var(--lime)";
  $("#goalEncourage").textContent = percent >= 100 ? "今日目标完成，记忆回路已加固。" : todayCount ? `再完成 ${DAILY_GOAL - todayCount} 词即可达成今日目标。` : "完成第一张词卡，启动今天的记忆回路。";
}

function renderConfusions() {
  $("#confusionTabs").innerHTML = CONFUSIONS.map(group => `<button class="${group.id === state.confusion ? "active" : ""}" data-confusion="${group.id}">${group.label}</button>`).join("");
  $$('[data-confusion]').forEach(button => button.addEventListener("click", () => { state.confusion = button.dataset.confusion; renderConfusions(); }));
  const group = CONFUSIONS.find(item => item.id === state.confusion);
  const terms = group.terms.map(termById);
  $("#comparisonCard").innerHTML = terms.map((term, i) => `
    <article class="compare-term">
      <span class="tag">TERM ${String(i+1).padStart(2,"0")} · ${term.category}</span>
      <h3>${term.en}</h3><p class="compare-zh">${term.zh}</p>
      <p class="definition">${term.note}</p><p class="example">${term.example}</p>
    </article>`).join("") + `<div class="boundary"><div><span>核心分界线</span><p>${group.boundary}</p></div><div><span>记忆钩子</span><p>${group.memory}</p></div></div>`;
  $("#quickCheck").innerHTML = `<strong>快问快答</strong><span>${group.question}</span>${terms.map(term => `<button data-answer="${term.id}">${term.en}</button>`).join("")}`;
  $$("[data-answer]").forEach(button => button.addEventListener("click", () => {
    $$("[data-answer]").forEach(b => b.classList.remove("correct", "wrong"));
    button.classList.add(button.dataset.answer === group.answer ? "correct" : "wrong");
    toast(button.dataset.answer === group.answer ? "回答正确" : `再想一下：正确答案是 ${termById(group.answer).en}`);
  }));
}

function renderRootList() {
  $("#rootList").innerHTML = ROOTS.map(root => `<button class="root-chip ${root.id === state.root ? "active" : ""}" data-root="${root.id}">${root.form} · ${root.meaning}</button>`).join("");
  $$("[data-root]").forEach(button => button.addEventListener("click", () => { state.root = button.dataset.root; renderRootList(); renderRootNetwork(); }));
}

function renderRootNetwork() {
  const root = rootById(state.root);
  const related = TERMS.filter(term => term.roots.includes(root.id)).slice(0, 9);
  const svg = $("#rootNetwork");
  const cx = 410, cy = 250, radius = related.length > 6 ? 195 : 175;
  const positions = related.map((term, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i / related.length);
    return { term, x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
  });
  svg.innerHTML = positions.map(p => `<line class="edge" x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" />`).join("") +
    `<g class="root-node" data-network-root="${root.id}"><circle cx="${cx}" cy="${cy}" r="67" fill="${root.color}"/><circle cx="${cx}" cy="${cy}" r="75" fill="none" stroke="${root.color}" stroke-opacity=".25" stroke-width="8"/><text x="${cx}" y="${cy-4}" fill="white" font-size="20" font-family="Georgia" text-anchor="middle">${root.form}</text><text x="${cx}" y="${cy+19}" fill="white" fill-opacity=".8" font-size="11" text-anchor="middle">${root.meaning}</text></g>` +
    positions.map((p, i) => `<g class="term-node" data-network-term="${p.term.id}"><circle cx="${p.x}" cy="${p.y}" r="45" fill="white" stroke="${root.color}" stroke-opacity=".48"/><text x="${p.x}" y="${p.y-3}" fill="#17352b" font-size="${p.term.en.length > 12 ? 9 : 11}" font-family="Georgia" text-anchor="middle">${p.term.en}</text><text x="${p.x}" y="${p.y+14}" fill="#6f7e76" font-size="9" text-anchor="middle">${p.term.zh}</text></g>`).join("");
  $$('[data-network-term]').forEach(node => node.addEventListener("click", () => renderRootDetail(termById(node.dataset.networkTerm), root)));
  renderRootDetail(null, root);
}

function renderRootDetail(term, root) {
  const related = TERMS.filter(item => item.roots.includes(root.id)).slice(0, 7);
  $("#rootDetail").innerHTML = term ? `
    <div class="root-symbol">Aa</div><h3>${term.en}</h3><h4>${term.zh}</h4>
    <p>${term.note}</p><p>${term.example}</p>
    <div class="related"><span>构词关联</span>${term.roots.map(id => { const r = rootById(id); return `<button data-jump-root="${r.id}">${r.form} · ${r.meaning}</button>`; }).join("")}</div>` : `
    <div class="root-symbol">R</div><h3>${root.form}</h3><h4>${root.meaning}</h4>
    <p>${root.origin}。识别这个构词单位，可以一次理解一组专业词汇。</p>
    <div class="related"><span>同根词 · ${TERMS.filter(t => t.roots.includes(root.id)).length} 个</span>${related.map(t => `<button data-detail-term="${t.id}">${t.en} · ${t.zh}</button>`).join("")}</div>`;
  $$('[data-jump-root]').forEach(button => button.addEventListener("click", () => { state.root = button.dataset.jumpRoot; renderRootList(); renderRootNetwork(); }));
  $$('[data-detail-term]').forEach(button => button.addEventListener("click", () => renderRootDetail(termById(button.dataset.detailTerm), root)));
}

function renderLexiconFilters() {
  const all = ["all", ...categories()];
  $("#categoryFilters").innerHTML = all.map(category => `<button class="${category === state.lexiconCategory ? "active" : ""}" data-lexicon-category="${category}">${category === "all" ? "全部" : category}</button>`).join("");
  $$('[data-lexicon-category]').forEach(button => button.addEventListener("click", () => { state.lexiconCategory = button.dataset.lexiconCategory; renderLexiconFilters(); renderLexicon(); }));
}

function renderLexicon() {
  const results = TERMS.filter(term => {
    const rootText = term.roots.map(id => `${rootById(id).form} ${rootById(id).meaning}`).join(" ");
    const matchesQuery = !state.query || `${term.en} ${term.zh} ${term.note} ${rootText}`.toLowerCase().includes(state.query);
    return matchesQuery && (state.lexiconCategory === "all" || term.category === state.lexiconCategory);
  });
  $("#resultCount").textContent = `共 ${results.length} 个术语`;
  $("#termGrid").innerHTML = results.length ? results.map(term => {
    const level = state.progress.cards[term.id]?.level || 0;
    return `<article class="term-item"><header><span class="category">${term.category.toUpperCase()}</span><i class="level ${level >= 3 ? "learned" : ""}" title="${level >= 3 ? "已掌握" : "待学习"}"></i></header><h3>${term.en}</h3><h4>${term.zh}</h4><p>${term.note}</p><div class="term-roots">${term.roots.map(id => `<span>${rootById(id).form}</span>`).join("")}</div></article>`;
  }).join("") : `<div class="empty">没有找到匹配的术语，试试更短的关键词。</div>`;
}

function exportProgress() {
  const payload = JSON.stringify({ exportedAt: new Date().toISOString(), app: "BioLoop", ...state.progress }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = `bioloop-progress-${dateKey()}.json`; link.click();
  URL.revokeObjectURL(url); toast("学习进度已导出");
}

function resetProgress() {
  if (!confirm("确定重置全部学习记录吗？词库本身不会删除。")) return;
  state.progress = { cards: {}, history: {}, lastStudy: null };
  localStorage.removeItem(STORAGE_KEY);
  buildSession(); renderLexicon(); updateStats(); toast("本地学习记录已重置");
}

function handleKeydown(event) {
  if (state.view !== "study" || event.target.matches("input, select")) return;
  if (event.code === "Space") { event.preventDefault(); flipCard(); }
  if (["1","2","3"].includes(event.key) && $("#ratingPanel").classList.contains("ready")) {
    rateCard({"1":"again","2":"hard","3":"easy"}[event.key]);
  }
}

let toastTimer;
function toast(message) {
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 1900);
}

init();
