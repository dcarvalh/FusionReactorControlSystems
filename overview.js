// 3D overview: a cutaway of the whole machine with a quarter removed and a fixed
// camera. Every part is built from the same 2D coordinates as the cross-section
// SVG, rotated about the machine's axis, so both views always match. The cyan
// plane marks where the cross-section is taken. Illustrative, not to scale.
//
// Loaded as an ES module (three.js, served from vendor/, via the import map in index.html). It listens
// for events from app.js: "part-hover", "part-select" and "plasma-shape".

import * as THREE from "three";

var frame = document.getElementById("overview");
var SCALE = 100;              // SVG px per 3D unit
var AXIS_X = 30;              // SVG x of the machine's axis
var MID_Y = 360;              // SVG y of the midplane
var CUT_START = Math.PI / 2;  // the removed quarter faces the camera
var CUT_LENGTH = Math.PI * 1.5;

// ---------- Helpers ----------

// SVG point → [R, Z] in 3D units.
function toRZ(p) {
  return new THREE.Vector2((p[0] - AXIS_X) / SCALE, (MID_Y - p[1]) / SCALE);
}

function cssColor(name) {
  return new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
}

// Rotate a closed 2D profile about the axis through three quarters of a turn.
function lathe(points, segments) {
  var profile = points.map(toRZ);
  profile.push(profile[0].clone());
  return new THREE.LatheGeometry(profile, segments || 72, CUT_START, CUT_LENGTH);
}

// A flat cap filling a profile at one cut face (angle phi).
function cap(points, phi) {
  var shape = new THREE.Shape(points.map(toRZ));
  var geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateY(phi - Math.PI / 2);
  return geometry;
}

// A rectangular coil cross-section (from an SVG rect) swept round as a ring.
function ringFromRect(x, y, w, h) {
  return lathe([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], 64);
}

// Rounded rectangle, as a list of SVG points (for the toroidal field coil).
function roundedRect(x, y, w, h, r) {
  var points = [];
  var corners = [[x + w - r, y + r, -Math.PI / 2], [x + w - r, y + h - r, 0], [x + r, y + h - r, Math.PI / 2], [x + r, y + r, Math.PI]];
  corners.forEach(function (c) {
    for (var i = 0; i <= 6; i++) {
      var a = c[2] + (i / 6) * (Math.PI / 2);
      points.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]);
    }
  });
  return points;
}

// ---------- Scene ----------
// Everything below runs inside start(); if WebGL is unavailable, the frame
// keeps its placeholder label instead.

var colors, renderer, scene, camera, parts, plasmaGroup, plasmaMaterial, capMaterial, fieldMaterial;

function start() {

  colors = {
    line: cssColor("--draw"),
    faint: cssColor("--text-faint"),
    text: cssColor("--text"),
    select: cssColor("--select"),
    plasmaA: cssColor("--plasma-a"),
    plasmaB: cssColor("--plasma-b"),
    surface: cssColor("--surface-raised")
  };

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  if (!renderer.getContext()) throw new Error("WebGL unavailable");
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.setAttribute("aria-hidden", "true");
  frame.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  var sun = new THREE.DirectionalLight(0xffffff, 1.4);
  sun.position.set(4, 8, 6);
  scene.add(sun);

  camera = new THREE.PerspectiveCamera(26, 16 / 9, 0.1, 100);
  camera.position.set(12.5, 5.6, 11);
  camera.lookAt(0.2, -0.25, 0);

  // Each part is a group of solid meshes plus crisp edge lines.
  parts = {};

  function addPart(id, geometries, options) {
    var group = new THREE.Group();
    var material = new THREE.MeshLambertMaterial({
      color: options.color || colors.surface,
      transparent: true,
      opacity: options.opacity === undefined ? 1 : options.opacity,
      side: THREE.DoubleSide,
      depthWrite: options.opacity === undefined || options.opacity > 0.9
    });
    var edgeMaterial = new THREE.LineBasicMaterial({ color: options.edge || colors.line, transparent: true, opacity: 0.9 });
    geometries.forEach(function (geometry) {
      group.add(new THREE.Mesh(geometry, material));
      if (options.edges !== false) group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 35), edgeMaterial));
    });
    group.userData.partId = id;
    scene.add(group);
    if (id) parts[id] = { group: group, material: material, edgeMaterial: edgeMaterial, base: material.color.clone(), baseEdge: edgeMaterial.color.clone() };
    return group;
  }

  // Central solenoid: the stacked column, plus the coils above and below.
  addPart("cs", [
    ringFromRect(40, 150, 18, 76), ringFromRect(40, 234, 18, 76), ringFromRect(40, 318, 18, 84),
    ringFromRect(40, 410, 18, 76), ringFromRect(40, 494, 18, 76),
    ringFromRect(64, 64, 24, 16), ringFromRect(100, 52, 24, 16), ringFromRect(64, 640, 24, 16), ringFromRect(100, 652, 24, 16)
  ], {});

  // Shaping coils: inboard and outboard stacks of 8 rings, plus the fast in-vessel coils.
  var shapingRings = [];
  for (var i = 0; i < 8; i++) {
    shapingRings.push(ringFromRect(106, 176 + i * 48, 20, 32));
    shapingRings.push(ringFromRect(342, 176 + i * 48, 20, 32));
  }
  shapingRings.push(ringFromRect(280, 160, 12, 12), ringFromRect(280, 548, 12, 12));
  addPart("pf", shapingRings, {});

  // Vacuum vessel: a see-through shell, outlined at the cut faces (not a part).
  var vesselPoints = [[170, 124], [262, 124], [316, 184], [316, 536], [262, 596], [170, 596], [164, 590], [164, 130]];
  addPart(null, [lathe(vesselPoints, 96)], { opacity: 0.07, color: colors.text, edges: false });
  [CUT_START, CUT_START + CUT_LENGTH].forEach(function (phi) {
    var outline = vesselPoints.concat([vesselPoints[0]]).map(function (p) {
      var rz = toRZ(p);
      return new THREE.Vector3(rz.x * Math.sin(phi), rz.y, rz.x * Math.cos(phi));
    });
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(outline), new THREE.LineBasicMaterial({ color: colors.faint })));
  });

  // Toroidal field coils: loops around the vessel, spaced round the machine,
  // leaving out the removed quarter.
  var tfPath = roundedRect(88, 96, 296, 528, 36);
  var tfGeometries = [];
  var TF_COUNT = 16;
  for (var k = 0; k < TF_COUNT; k++) {
    var phi = (k / TF_COUNT) * 2 * Math.PI + Math.PI / TF_COUNT;
    if (phi < CUT_START + 0.05 || phi > CUT_START + CUT_LENGTH - 0.05) continue; // the removed quarter
    var curve = new THREE.CatmullRomCurve3(tfPath.map(function (p) {
      var rz = toRZ(p);
      return new THREE.Vector3(rz.x * Math.sin(phi), rz.y, rz.x * Math.cos(phi));
    }), true, "centripetal");
    tfGeometries.push(new THREE.TubeGeometry(curve, 96, 0.028, 6, true));
  }
  addPart("tf", tfGeometries, { edges: false, color: colors.line });

  // Plasma: a glowing lathe of the current shape, with filled caps at both cut
  // faces and one helical field line wound around it.
  plasmaGroup = new THREE.Group();
  plasmaGroup.userData.partId = "plasma";
  scene.add(plasmaGroup);
  plasmaMaterial = new THREE.MeshBasicMaterial({ color: colors.plasmaA, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false });
  capMaterial = new THREE.MeshBasicMaterial({ color: colors.plasmaB, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
  fieldMaterial = new THREE.LineBasicMaterial({ color: colors.text });
  parts.plasma = { group: plasmaGroup, material: plasmaMaterial, edgeMaterial: capMaterial, base: plasmaMaterial.color.clone(), baseEdge: capMaterial.color.clone() };

  // A field line: travel round the doughnut while circling the plasma cross-section.
  function fieldLine(boundary) {
    var points = [];
    var turns = 2.5;
    var steps = 600;
    var n = boundary.length;
    var c = boundary.reduce(function (acc, p) { return [acc[0] + p[0] / n, acc[1] + p[1] / n]; }, [0, 0]);
    for (var s = 0; s <= steps; s++) {
      var f = s / steps;
      var phi = CUT_START + f * CUT_LENGTH;
      var index = Math.floor(f * turns * n) % n;
      var p = boundary[index];
      var rz = toRZ([c[0] + 1.04 * (p[0] - c[0]), c[1] + 1.04 * (p[1] - c[1])]);
      points.push(new THREE.Vector3(rz.x * Math.sin(phi), rz.y, rz.x * Math.cos(phi)));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }

  function setPlasma(boundaries) {
    plasmaGroup.children.slice().forEach(function (child) {
      child.geometry.dispose();
      plasmaGroup.remove(child);
    });
    var bodies = boundaries[0] === boundaries[1] ? [boundaries[0]] : boundaries;
    bodies.forEach(function (boundary) {
      plasmaGroup.add(new THREE.Mesh(lathe(boundary, 96), plasmaMaterial));
      plasmaGroup.add(new THREE.Mesh(cap(boundary, CUT_START), capMaterial));
      plasmaGroup.add(new THREE.Mesh(cap(boundary, CUT_START + CUT_LENGTH), capMaterial));
      plasmaGroup.add(new THREE.Line(fieldLine(boundary), fieldMaterial));
    });
  }

  // The slice plane: where the cross-section below is taken.
  var slice = new THREE.Mesh(
    new THREE.PlaneGeometry(4.1, 6.0),
    new THREE.MeshBasicMaterial({ color: colors.select, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false })
  );
  slice.position.set(2.05, 0, 0);
  scene.add(slice);
  var sliceEdge = new THREE.LineSegments(new THREE.EdgesGeometry(slice.geometry), new THREE.LineBasicMaterial({ color: colors.select }));
  sliceEdge.position.copy(slice.position);
  scene.add(sliceEdge);

  // Machine axis
  scene.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -3.3, 0), new THREE.Vector3(0, 3.3, 0)]),
    new THREE.LineDashedMaterial({ color: colors.faint, dashSize: 0.12, gapSize: 0.1 })
  ).computeLineDistances());

  // ---------- Highlighting, driven by the cross-section ----------

  var hoveredId = null;
  var selectedId = null;

  function applyHighlight() {
    Object.keys(parts).forEach(function (id) {
      var part = parts[id];
      var color = id === selectedId ? colors.select : id === hoveredId ? colors.text : null;
      part.material.color.copy(color && id !== "plasma" ? color.clone().lerp(colors.surface, 0.55) : part.base);
      part.edgeMaterial.color.copy(color || part.baseEdge);
      if (id === "plasma") fieldMaterial.color.copy(color || colors.text);
    });
    render();
  }

  // ---------- Rendering (on demand: the camera never moves) ----------

  var pending = false;

  function render() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      renderer.render(scene, camera);
    });
  }

  function resize() {
    var width = frame.clientWidth;
    var height = frame.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep the whole machine in view on narrow frames.
    camera.fov = camera.aspect < 1.4 ? 36 : 26;
    camera.updateProjectionMatrix();
    render();
  }

  // ---------- Picking: the 3D view is clickable like the cross-section ----------

  var raycaster = new THREE.Raycaster();
  var tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.hidden = true;
  frame.appendChild(tooltip);

  // The part under the pointer: the first solid mesh that belongs to a part.
  function pick(event) {
    var box = renderer.domElement.getBoundingClientRect();
    var pointer = new THREE.Vector2(
      ((event.clientX - box.left) / box.width) * 2 - 1,
      -((event.clientY - box.top) / box.height) * 2 + 1
    );
    raycaster.setFromCamera(pointer, camera);
    var hits = raycaster.intersectObjects(scene.children, true);
    for (var h = 0; h < hits.length; h++) {
      if (!hits[h].object.isMesh) continue;
      for (var node = hits[h].object; node; node = node.parent) {
        if (node.userData.partId) return node.userData.partId;
      }
    }
    return null;
  }

  function partName(id) {
    return window.CONTENT.parts.filter(function (part) { return part.id === id; })[0].name;
  }

  renderer.domElement.addEventListener("pointermove", function (event) {
    var id = pick(event);
    renderer.domElement.style.cursor = id ? "pointer" : "";
    if (id) {
      var box = frame.getBoundingClientRect();
      tooltip.textContent = partName(id);
      tooltip.style.left = event.clientX - box.left + "px";
      tooltip.style.top = event.clientY - box.top + "px";
    }
    tooltip.hidden = !id;
    if (id !== hoveredId) {
      hoveredId = id;
      applyHighlight();
    }
  });

  renderer.domElement.addEventListener("pointerleave", function () {
    tooltip.hidden = true;
    hoveredId = null;
    applyHighlight();
  });

  // Pick on pointerdown: click events round the position to whole pixels, which
  // can miss the thin toroidal-field-coil tubes that hover just highlighted.
  var pressedId = null;
  renderer.domElement.addEventListener("pointerdown", function (event) {
    pressedId = pick(event);
  });
  renderer.domElement.addEventListener("click", function (event) {
    var id = pressedId || pick(event);
    pressedId = null;
    if (id) window.dispatchEvent(new CustomEvent("part-request", { detail: { id: id } }));
  });

  window.addEventListener("part-hover", function (event) {
    hoveredId = event.detail.id;
    applyHighlight();
  });
  window.addEventListener("part-select", function (event) {
    selectedId = event.detail.id;
    applyHighlight();
  });
  window.addEventListener("plasma-shape", function (event) {
    setPlasma(event.detail.boundaries);
    render();
  });

  // Start from whatever app.js has already drawn and selected.
  if (window.currentBoundaries) setPlasma(window.currentBoundaries);
  selectedId = window.selectedPartId || null;
  new ResizeObserver(resize).observe(frame);

  // Browsers can drop the 3D context (sleep, GPU reset, many tabs). Rendering is
  // on demand, so repaint when it comes back, and whenever the tab is shown again.
  renderer.domElement.addEventListener("webglcontextlost", function (event) {
    event.preventDefault();
  });
  renderer.domElement.addEventListener("webglcontextrestored", function () {
    resize();
    applyHighlight();
  });
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) render();
  });
  window.addEventListener("pageshow", render);

  // Ready (and clear the "could not start" message if a slow load triggered it).
  frame.classList.remove("is-unavailable");
  frame.classList.add("is-ready");
  applyHighlight();
}

try {
  start();
} catch (error) {
  frame.classList.add("is-unavailable");
}
