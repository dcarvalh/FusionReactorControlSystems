// Page shell: fills in text from content.js, renders the home cards and the
// "Why I built this" tab, and switches views on location.hash.

var VIEWS = ["home", "tokamak", "why"];
var SVG_NS = "http://www.w3.org/2000/svg";

// ---------- Helpers ----------

// Look up a dotted path like "views.home.title" in window.CONTENT.
function getContent(path) {
  return path.split(".").reduce(function (obj, key) {
    return obj == null ? undefined : obj[key];
  }, window.CONTENT);
}

// Create an element with a class and optional text.
function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) setRichText(node, text);
  return node;
}

// Set text, showing any "[DAVID: …]" marker as a highlighted placeholder.
function setRichText(node, text) {
  text.split(/(\[DAVID:[^\]]*\])/).forEach(function (piece) {
    if (!piece) return;
    if (piece.indexOf("[DAVID:") === 0) {
      var mark = el("mark", "todo");
      mark.textContent = piece;
      node.appendChild(mark);
    } else {
      node.appendChild(document.createTextNode(piece));
    }
  });
}

// Fill every element marked with data-text / data-href from content.js.
function fillText() {
  document.querySelectorAll("[data-text]").forEach(function (node) {
    var value = getContent(node.dataset.text);
    if (value !== undefined) node.textContent = value;
  });
  document.querySelectorAll("[data-href]").forEach(function (node) {
    var value = getContent(node.dataset.href);
    if (value !== undefined) node.href = value;
  });
}

// ---------- Machine glyphs (thin line art, 120 × 60) ----------

function svgEl(tag, attrs) {
  var node = document.createElementNS(SVG_NS, tag);
  Object.keys(attrs).forEach(function (key) {
    node.setAttribute(key, attrs[key]);
  });
  return node;
}

// A closed path around an ellipse, with an optional wobble (for the stellarator).
function ellipsePath(cx, cy, rx, ry, wobble, lobes) {
  var points = [];
  for (var i = 0; i <= 120; i++) {
    var t = (i / 120) * 2 * Math.PI;
    var k = 1 + wobble * Math.sin(lobes * t);
    points.push((cx + rx * k * Math.cos(t)).toFixed(1) + " " + (cy + ry * k * Math.sin(t)).toFixed(1));
  }
  return "M" + points.join(" L") + " Z";
}

function machineGlyph(id) {
  var svg = svgEl("svg", { viewBox: "0 0 120 60", class: "machine-glyph", "aria-hidden": "true" });
  var line = { fill: "none", stroke: "currentColor", "stroke-width": "1" };
  function add(tag, attrs) {
    svg.appendChild(svgEl(tag, Object.assign({}, line, attrs)));
  }

  if (id === "tokamak") {
    add("ellipse", { cx: 60, cy: 32, rx: 50, ry: 18 });
    add("ellipse", { cx: 60, cy: 32, rx: 20, ry: 6 });
    add("ellipse", { cx: 60, cy: 32, rx: 35, ry: 12, class: "glyph-plasma", "stroke-width": "2" });
    add("line", { x1: 60, y1: 4, x2: 60, y2: 58, "stroke-dasharray": "2 3" });
  } else if (id === "stellarator") {
    add("ellipse", { cx: 60, cy: 32, rx: 50, ry: 18 });
    add("path", { d: ellipsePath(60, 32, 35, 12, 0.18, 5), "stroke-width": "1.5" });
  } else if (id === "mirror") {
    add("path", { d: "M14 24 Q60 8 106 24" });
    add("path", { d: "M14 36 Q60 52 106 36" });
    add("rect", { x: 6, y: 16, width: 8, height: 28, rx: 1 });
    add("rect", { x: 106, y: 16, width: 8, height: 28, rx: 1 });
  }
  return svg;
}

// ---------- Home: machine cards ----------

function renderMachines() {
  var grid = document.getElementById("machine-grid");
  window.CONTENT.machines.forEach(function (machine) {
    var card;
    if (machine.active) {
      card = el("a", "machine-card is-active");
      card.href = "#" + machine.id;
    } else {
      card = el("div", "machine-card is-disabled");
      card.setAttribute("aria-disabled", "true");
    }

    var head = el("div", "machine-head");
    head.appendChild(el("h2", "machine-name", machine.name));
    if (!machine.active) head.appendChild(el("span", "chip", window.CONTENT.comingSoon));
    card.appendChild(head);

    card.appendChild(machineGlyph(machine.id));
    card.appendChild(el("p", "machine-summary", machine.summary));
    card.appendChild(el("p", "machine-examples", machine.examples));
    if (machine.cta) card.appendChild(el("span", "machine-cta", machine.cta));

    grid.appendChild(card);
  });
}

// ---------- Why I built this ----------

function renderWhy() {
  var why = window.CONTENT.why;
  var body = document.getElementById("why-body");

  var motivation = el("section", "why-block");
  motivation.appendChild(el("h2", "", why.motivation.title));
  var points = el("ul", "why-list");
  why.motivation.points.forEach(function (text) {
    points.appendChild(el("li", "", text));
  });
  motivation.appendChild(points);
  body.appendChild(motivation);

  var showcase = el("section", "why-block");
  showcase.appendChild(el("h2", "", why.showcase.title));
  var list = el("ul", "why-list");
  why.showcase.items.forEach(function (item) {
    var row = el("li", "");
    row.appendChild(el("strong", "", item.heading));
    row.appendChild(document.createTextNode(" "));
    row.appendChild(el("span", "muted", item.text));
    list.appendChild(row);
  });
  showcase.appendChild(list);
  body.appendChild(showcase);

  var fit = el("section", "why-block");
  fit.appendChild(el("h2", "", why.fit.title));
  fit.appendChild(el("p", "why-paragraph muted", why.fit.intro));
  fit.appendChild(el("div", "placeholder", why.fit.placeholder));
  body.appendChild(fit);
}

// ---------- Views ----------

// The first part of the hash picks the view, e.g. "#tokamak" or "#tokamak/pf".
function currentView() {
  var name = location.hash.slice(1).split("/")[0];
  return VIEWS.indexOf(name) >= 0 ? name : "home";
}

function showView(name) {
  VIEWS.forEach(function (view) {
    document.getElementById("view-" + view).hidden = view !== name;
  });
  // The tokamak view belongs under "Select your machine" in the nav.
  var navName = name === "tokamak" ? "home" : name;
  document.querySelectorAll("[data-view-link]").forEach(function (link) {
    if (link.dataset.viewLink === navName) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  window.scrollTo(0, 0);
}

function onHashChange() {
  showView(currentView());
}

fillText();
renderMachines();
renderWhy();
onHashChange();
window.addEventListener("hashchange", onHashChange);
