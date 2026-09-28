// Page shell: fills in text from content.js and switches views on location.hash.

var VIEWS = ["home", "tokamak", "game", "fit"];

// Look up a dotted path like "views.home.title" in window.CONTENT.
function getContent(path) {
  return path.split(".").reduce(function (obj, key) {
    return obj == null ? undefined : obj[key];
  }, window.CONTENT);
}

// Fill every element marked with data-text / data-href from content.js.
function fillText() {
  document.querySelectorAll("[data-text]").forEach(function (el) {
    var value = getContent(el.dataset.text);
    if (value !== undefined) el.textContent = value;
  });
  document.querySelectorAll("[data-href]").forEach(function (el) {
    var value = getContent(el.dataset.href);
    if (value !== undefined) el.href = value;
  });
}

// The first part of the hash picks the view, e.g. "#tokamak" or "#tokamak/pf".
function currentView() {
  var name = location.hash.slice(1).split("/")[0];
  return VIEWS.indexOf(name) >= 0 ? name : "home";
}

function showView(name) {
  VIEWS.forEach(function (view) {
    document.getElementById("view-" + view).hidden = view !== name;
  });
  document.querySelectorAll("[data-view-link]").forEach(function (link) {
    if (link.dataset.viewLink === name) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  window.scrollTo(0, 0);
}

function onHashChange() {
  showView(currentView());
}

fillText();
onHashChange();
window.addEventListener("hashchange", onHashChange);
