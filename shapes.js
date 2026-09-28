// Plasma shape geometry for the cross-section: pure functions, no DOM.
//
// Coordinates are in the cross-section SVG (viewBox 0 0 620 750). The vessel's
// inner wall spans x 164–316 and y 124–596, with cut outboard corners like TCV.
// Shapes are simplified from EPFL's published TCV equilibria; they are
// illustrative, not reconstructions.

var SHAPE_POINTS = 120; // every boundary is resampled to this many points, so shapes can morph

// ---------- Building blocks ----------

// Miller-style D shape: centre, minor radius a, elongation kappa, triangularity delta.
// Positive delta points the top and bottom tips towards the machine axis (left).
function millerShape(cx, cy, a, kappa, delta) {
  var points = [];
  for (var i = 0; i < 72; i++) {
    var t = (i / 72) * 2 * Math.PI;
    points.push([cx + a * Math.cos(t + delta * Math.sin(t)), cy - kappa * a * Math.sin(t)]);
  }
  return { points: points, corners: [] };
}

// Closed Catmull-Rom spline through key points. Corner points (X-points) stay sharp.
function splinePoints(shape) {
  var pts = shape.points;
  var n = pts.length;
  var isCorner = function (i) {
    return shape.corners.indexOf(i % n) >= 0;
  };
  var out = [];
  for (var i = 0; i < n; i++) {
    var p1 = pts[i];
    var p2 = pts[(i + 1) % n];
    var p0 = isCorner(i) ? p1 : pts[(i - 1 + n) % n];
    var p3 = isCorner(i + 1) ? p2 : pts[(i + 2) % n];
    for (var s = 0; s < 16; s++) {
      var t = s / 16;
      var t2 = t * t;
      var t3 = t2 * t;
      out.push([0, 1].map(function (k) {
        return 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t +
          (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 +
          (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3);
      }));
    }
  }
  return out;
}

function centroid(points) {
  var sum = points.reduce(function (acc, p) {
    return [acc[0] + p[0], acc[1] + p[1]];
  }, [0, 0]);
  return [sum[0] / points.length, sum[1] / points.length];
}

// Resample a closed curve to `count` points evenly spaced along its length,
// starting at the outboard midplane (right of the centre), so shapes line up.
function resample(dense, count) {
  var c = centroid(dense);
  var start = 0;
  var best = Infinity;
  dense.forEach(function (p, i) {
    var angle = Math.abs(Math.atan2(p[1] - c[1], p[0] - c[0]));
    if (angle < best && p[0] > c[0]) {
      best = angle;
      start = i;
    }
  });
  var ring = dense.slice(start).concat(dense.slice(0, start));
  ring.push(ring[0]);

  var lengths = [0];
  for (var i = 1; i < ring.length; i++) {
    lengths.push(lengths[i - 1] + Math.hypot(ring[i][0] - ring[i - 1][0], ring[i][1] - ring[i - 1][1]));
  }
  var total = lengths[lengths.length - 1];
  var out = [];
  var j = 1;
  for (var k = 0; k < count; k++) {
    var target = (k / count) * total;
    while (lengths[j] < target) j++;
    var f = (target - lengths[j - 1]) / (lengths[j] - lengths[j - 1] || 1);
    out.push([
      ring[j - 1][0] + f * (ring[j][0] - ring[j - 1][0]),
      ring[j - 1][1] + f * (ring[j][1] - ring[j - 1][1])
    ]);
  }
  return out;
}

function boundary(shape) {
  return resample(splinePoints(shape), SHAPE_POINTS);
}

// ---------- The shapes (text for each lives in content.js) ----------
// Each shape has two boundaries so every shape can morph into "droplets";
// single plasmas simply repeat the same boundary. `legs` are the divertor
// legs from each X-point to the wall; `xPoints` mark where the poloidal field vanishes.

function buildShapes() {
  var limited = boundary(millerShape(232, 360, 66, 1.25, 0.1));
  var elongated = boundary(millerShape(240, 360, 62, 2.6, 0.3));
  var positive = boundary(millerShape(244, 340, 62, 1.6, 0.42));
  var negative = boundary(millerShape(236, 340, 62, 1.6, -0.42));
  var singleNull = boundary({
    points: [[306, 318], [296, 262], [268, 226], [232, 214], [202, 226], [186, 262], [180, 312],
      [184, 370], [196, 420], [218, 452], [256, 432], [286, 398], [302, 358]],
    corners: [9]
  });
  var doubleNull = boundary({
    points: [[300, 360], [284, 300], [254, 262], [222, 240], [208, 300], [202, 360], [208, 420],
      [222, 480], [254, 458], [284, 420]],
    corners: [3, 7]
  });
  var snowflake = boundary({
    points: [[304, 340], [292, 290], [264, 256], [230, 246], [200, 260], [186, 300], [184, 350],
      [192, 410], [214, 474], [252, 452], [282, 418], [300, 380]],
    corners: [8]
  });
  var dropletTop = boundary(millerShape(236, 232, 58, 1.2, 0.2));
  var dropletBottom = boundary(millerShape(234, 492, 52, 1.1, 0.1));

  return {
    limited: { boundaries: [limited, limited], legs: "", xPoints: [] },
    diverted: {
      boundaries: [singleNull, singleNull],
      legs: "M218 452 L164 462 M218 452 L230 596",
      xPoints: [[218, 452]]
    },
    elongated: { boundaries: [elongated, elongated], legs: "", xPoints: [] },
    positive: { boundaries: [positive, positive], legs: "", xPoints: [] },
    negative: { boundaries: [negative, negative], legs: "", xPoints: [] },
    doubleNull: {
      boundaries: [doubleNull, doubleNull],
      legs: "M222 240 L164 232 M222 240 L230 124 M222 480 L164 488 M222 480 L230 596",
      xPoints: [[222, 240], [222, 480]]
    },
    snowflake: {
      boundaries: [snowflake, snowflake],
      legs: "M214 474 L164 470 M214 474 L190 596 M214 474 L262 596 M214 474 L300 554",
      xPoints: [[214, 474]]
    },
    droplets: { boundaries: [dropletTop, dropletBottom], legs: "", xPoints: [] }
  };
}

// ---------- Drawing helpers ----------

function pathFromPoints(points) {
  return "M" + points.map(function (p) {
    return p[0].toFixed(1) + " " + p[1].toFixed(1);
  }).join(" L") + " Z";
}

// Blend two boundaries: f = 0 gives a, f = 1 gives b.
function lerpPoints(a, b, f) {
  return a.map(function (p, i) {
    return [p[0] + f * (b[i][0] - p[0]), p[1] + f * (b[i][1] - p[1])];
  });
}

// Nested magnetic surfaces inside a boundary: shrink towards the centre and
// smooth out corners, as flux surfaces become rounder towards the core.
function fluxSurfaces(points, scales) {
  var c = centroid(points);
  return scales.map(function (s) {
    var surface = points.map(function (p) {
      return [c[0] + s * (p[0] - c[0]), c[1] + s * (p[1] - c[1])];
    });
    var passes = Math.round((1 - s) * 12);
    for (var k = 0; k < passes; k++) {
      surface = surface.map(function (p, i) {
        var prev = surface[(i - 1 + surface.length) % surface.length];
        var next = surface[(i + 1) % surface.length];
        return [(prev[0] + 2 * p[0] + next[0]) / 4, (prev[1] + 2 * p[1] + next[1]) / 4];
      });
    }
    return surface;
  });
}

// The vessel's inner wall, for thumbnails.
var VESSEL_INNER_PATH = "M170 124 H262 L316 184 V536 L262 596 H170 Q164 596 164 590 V130 Q164 124 170 124 Z";

if (typeof module !== "undefined") {
  module.exports = { buildShapes: buildShapes, pathFromPoints: pathFromPoints, lerpPoints: lerpPoints, fluxSurfaces: fluxSurfaces };
}
