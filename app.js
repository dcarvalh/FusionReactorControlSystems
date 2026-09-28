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
    // The axis passes through the hole, then hides behind the near side of the doughnut.
    add("line", { x1: 60, y1: 4, x2: 60, y2: 38, "stroke-dasharray": "2 3" });
    add("line", { x1: 60, y1: 51, x2: 60, y2: 58, "stroke-dasharray": "2 3" });
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

// ---------- Tokamak: cross-section, parts list, info panel ----------

var selectedPartId = null;

function findPart(id) {
  return window.CONTENT.parts.filter(function (part) {
    return part.id === id;
  })[0];
}

function showTooltip(text, x, y) {
  var tip = document.getElementById("xs-tooltip");
  tip.textContent = text;
  tip.hidden = false;
  tip.style.left = x + "px";
  tip.style.top = y + "px";
}

function hideTooltip() {
  document.getElementById("xs-tooltip").hidden = true;
}

function initCrossSection() {
  var frame = document.getElementById("cross-section");

  document.querySelectorAll("#cross-section .part").forEach(function (group) {
    var part = findPart(group.dataset.part);
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", part.name);
    group.setAttribute("aria-pressed", "false");

    // Pointer: tooltip follows the cursor.
    group.addEventListener("mousemove", function (event) {
      var box = frame.getBoundingClientRect();
      showTooltip(part.name, event.clientX - box.left, event.clientY - box.top);
    });
    group.addEventListener("mouseleave", hideTooltip);

    // Keyboard: tooltip sits above the focused part.
    group.addEventListener("focus", function () {
      var box = frame.getBoundingClientRect();
      var rect = group.getBoundingClientRect();
      showTooltip(part.name, rect.left + rect.width / 2 - box.left, rect.top - box.top);
    });
    group.addEventListener("blur", hideTooltip);

    group.addEventListener("click", function () {
      selectPart(part.id, true);
    });
    group.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectPart(part.id, true);
      }
    });
  });
}

function renderPartsList() {
  var list = document.getElementById("parts-list");
  window.CONTENT.parts.forEach(function (part) {
    var item = el("li");
    var button = el("button", "parts-list-button", part.name);
    button.type = "button";
    button.dataset.part = part.id;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", function () {
      selectPart(part.id, true);
    });
    item.appendChild(button);
    list.appendChild(item);
  });
}

// Fill the info panel. Sections without content yet show a placeholder.
function renderPanel(part) {
  var labels = window.CONTENT.views.tokamak.panelLabels;
  var panel = document.getElementById("info-panel");
  panel.textContent = "";

  panel.appendChild(el("h2", "panel-title", part.name));
  panel.appendChild(el("p", "panel-summary", part.summary));

  Object.keys(labels).forEach(function (key) {
    var section = el("section", "panel-section");
    section.appendChild(el("h3", "", labels[key]));
    if (part[key] === undefined) {
      section.appendChild(el("p", "panel-pending", window.CONTENT.views.tokamak.panelPending));
    }
    panel.appendChild(section);
  });

  if (part.shapeLink) {
    var link = el("button", "panel-cta", window.CONTENT.shapes.cta);
    link.type = "button";
    link.addEventListener("click", function () {
      document.getElementById("shapes").scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelector(".shape-button.is-selected").focus({ preventScroll: true });
    });
    panel.insertBefore(link, panel.children[2]);
  }
}

// Highlight a part everywhere and show it in the panel. The hash records the
// selection (e.g. "#tokamak/pf") without triggering a view change.
function selectPart(id, fromUser) {
  var part = findPart(id);
  if (!part) return;
  selectedPartId = id;

  document.querySelectorAll("[data-part]").forEach(function (node) {
    var isSelected = node.dataset.part === id;
    node.classList.toggle("is-selected", isSelected);
    node.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });
  renderPanel(part);

  if (fromUser) {
    history.replaceState(null, "", "#tokamak/" + id);
    // On narrow screens the panel is below the drawing: bring it into view.
    if (window.matchMedia("(max-width: 800px)").matches) {
      document.getElementById("info-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

// ---------- Shape the plasma ----------

var SHAPES = buildShapes();
var FLUX_SCALES = [0.74, 0.48, 0.22];
var currentBoundaries = null;
var shapeAnimation = null;

// Draw the plasma from its two boundaries (identical unless there are two droplets).
function drawPlasma(boundaries) {
  var a = pathFromPoints(boundaries[0]);
  var b = pathFromPoints(boundaries[1]);
  document.getElementById("plasma-glow-a").setAttribute("d", a);
  document.getElementById("plasma-glow-b").setAttribute("d", b);
  document.getElementById("plasma-edge").setAttribute("d", a + " " + b);
  var flux = fluxSurfaces(boundaries[0], FLUX_SCALES).concat(fluxSurfaces(boundaries[1], FLUX_SCALES));
  document.getElementById("plasma-flux").setAttribute("d", flux.map(pathFromPoints).join(" "));
  currentBoundaries = boundaries;
}

// Divertor legs and X-point markers for a shape.
function drawExtras(shape) {
  document.getElementById("plasma-legs").setAttribute("d", shape.legs);
  document.getElementById("plasma-xpoints").setAttribute("d", shape.xPoints.map(function (p) {
    return "M" + (p[0] - 5) + " " + (p[1] - 5) + " l10 10 m0 -10 l-10 10";
  }).join(" "));
}

function isDouble(shape) {
  return shape.boundaries[0] !== shape.boundaries[1];
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function selectShape(id, animate) {
  var shape = SHAPES[id];
  var item = window.CONTENT.shapes.items.filter(function (it) { return it.id === id; })[0];
  if (!shape || !item) return;

  // Picker state and description
  document.querySelectorAll(".shape-button").forEach(function (button) {
    var isSelected = button.dataset.shape === id;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });
  var detail = document.getElementById("shape-detail");
  detail.textContent = "";
  detail.appendChild(el("h3", "", item.name));
  detail.appendChild(el("p", "muted", item.text));

  var glowB = document.getElementById("plasma-glow-b");
  var extras = document.getElementById("plasma-extras");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!animate || reduceMotion || !currentBoundaries) {
    drawPlasma(shape.boundaries);
    drawExtras(shape);
    glowB.style.opacity = isDouble(shape) ? 1 : 0;
    return;
  }

  // The shaping coils pulse: the control system changes their currents.
  var coils = document.getElementById("pf-coils");
  coils.classList.remove("is-pulsing");
  void coils.getBoundingClientRect();
  coils.classList.add("is-pulsing");

  // Morph the boundaries; legs and X-points fade out and back in.
  if (shapeAnimation) cancelAnimationFrame(shapeAnimation);
  var from = currentBoundaries;
  var start = performance.now();
  var duration = 700;
  extras.classList.add("is-hidden");
  if (isDouble(shape)) glowB.style.opacity = 1;

  function step(now) {
    var t = Math.min(1, (now - start) / duration);
    var f = easeInOut(t);
    drawPlasma([lerpPoints(from[0], shape.boundaries[0], f), lerpPoints(from[1], shape.boundaries[1], f)]);
    if (t < 1) {
      shapeAnimation = requestAnimationFrame(step);
    } else {
      shapeAnimation = null;
      drawPlasma(shape.boundaries);
      drawExtras(shape);
      if (!isDouble(shape)) glowB.style.opacity = 0;
      extras.classList.remove("is-hidden");
    }
  }
  shapeAnimation = requestAnimationFrame(step);
}

// Small vessel thumbnail showing one shape, like EPFL's figure of TCV shapes.
function shapeThumbnail(shape) {
  var svg = svgEl("svg", { viewBox: "150 110 180 500", class: "shape-thumb", "aria-hidden": "true" });
  svg.appendChild(svgEl("path", { d: VESSEL_INNER_PATH, class: "thumb-vessel" }));
  var bodies = isDouble(shape) ? shape.boundaries : [shape.boundaries[0]];
  bodies.forEach(function (points) {
    svg.appendChild(svgEl("path", { d: pathFromPoints(points), class: "thumb-plasma" }));
  });
  if (shape.legs) svg.appendChild(svgEl("path", { d: shape.legs, class: "thumb-leg" }));
  return svg;
}

function renderShapePicker() {
  var picker = document.getElementById("shape-picker");
  window.CONTENT.shapes.items.forEach(function (item) {
    var button = el("button", "shape-button");
    button.type = "button";
    button.dataset.shape = item.id;
    button.setAttribute("aria-pressed", "false");
    button.appendChild(shapeThumbnail(SHAPES[item.id]));
    button.appendChild(el("span", "shape-name", item.short || item.name));
    button.setAttribute("aria-label", item.name);
    button.addEventListener("click", function () {
      selectShape(item.id, true);
    });
    picker.appendChild(button);
  });
  selectShape(window.CONTENT.shapes.defaultId, false);
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
  var view = currentView();
  showView(view);
  var partId = location.hash.split("/")[1];
  if (view === "tokamak" && partId && partId !== selectedPartId) selectPart(partId, false);
}

fillText();
renderMachines();
renderWhy();
initCrossSection();
renderPartsList();
renderShapePicker();
onHashChange();
window.addEventListener("hashchange", onHashChange);
