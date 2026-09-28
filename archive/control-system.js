// ARCHIVED: the "Control system" part, removed from the page to keep it focused on
// the four machine parts from EPFL's TCV infographic. Not loaded by index.html.
// Kept so the content is not lost. To restore: put the part back in
// CONTENT.parts and the sources in CONTENT.sources (content.js), the SVG group
// in index.html, renderLayers in app.js (renderDiagram should call it when
// diagram.layered is true), and the CSS at the bottom of this file in style.css.
//
// Most fields here are unverified: see `verify`. The three control-system
// papers are cited without links, because their ScienceDirect links fail for
// readers without a login.

// ---------- Part (was in CONTENT.parts) ----------

var ARCHIVED_CONTROL_PART =
{
      id: "control",
      name: "Control system",
      summary:
        "Measures the plasma with sensors and adjusts the coils, heating and fuelling in real time.",
      simple: {
        does:
          "The brain of the machine. It reads the sensors, works out what the plasma is " +
          "doing, and tells the coils, heaters and fuel valves what to do.",
        tech: ["Real-time computers running control code", "A simulator to test code before each shot", "Safety systems that can stop a shot"],
        control:
          "Fast loops for the plasma (a millisecond or less), slower ones for running the " +
          "shot, and protection watching over everything."
      },
      does:
        "Runs each shot: reads the sensors, works out the plasma's state, and commands " +
        "coils, heating and fuelling. Around that sit shot sequencing, machine " +
        "protection and the data archive.",
      tech: [
        "TCV's digital control system, SCD (Système de Contrôle Distribué)",
        "Algorithms in MATLAB/Simulink, with run-time code generated automatically; recent versions use the open-source MARTe2 framework",
        "Real-time equilibrium reconstruction (RT-LIUQE): the plasma's shape from magnetic measurements",
        "A reinforcement-learning controller from DeepMind and EPFL ran at 10 kHz, commanding all 19 coils"
      ],
      control: {
        text:
          "In layers by speed: real-time plasma control (µs to ms), shot sequencing and " +
          "supervision (seconds), and machine protection, which can stop a shot at any time.",
        speed: "µs"
      },
      testing:
        "Control code runs in simulation before a shot. DeepMind's controller was " +
        "benchmarked before deployment to check it met its timing every cycle.",
      monitoring:
        "The supervisory layer: plant state, alarms and interlocks. Every shot's signals " +
        "are archived for analysis afterwards.",
      diagram: {
        layered: true,
        middle: ["Diagnostics", "Real-time control", "Actuators"],
        middleCaption: "µs–ms",
        above: "Supervisory / sequencing",
        aboveCaption: "seconds",
        beside: ["Machine protection", "Data archive"],
        below: "Simulation",
        belowCaption: "before each shot"
      },
      sources: ["le2014", "galperti2024", "moret2015", "degrave2022"],
      verify: ["tech", "control", "testing", "monitoring"]
    };

// ---------- Sources used only by this part (were in CONTENT.sources) ----------

var ARCHIVED_CONTROL_SOURCES = {
  le2014: { title: "Le et al., Distributed digital real-time control system for TCV tokamak (2014)" },
  galperti2024: { title: "Galperti et al., Overview of the TCV digital real-time plasma control system and its applications (2024)" },
  moret2015: { title: "Moret et al., Tokamak equilibrium reconstruction code LIUQE and its real time implementation (2015)" }
};

// ---------- Layered block diagram (was in app.js) ----------

// The control system's layered view: supervision above, protection and archive
// beside, simulation below the real-time chain.
function renderLayers(diagram) {
  var colW = BOX_W + GAP_X;
  var width = PAD * 2 + 3 * BOX_W + 2 * GAP_X;
  var rowY = [PAD, PAD + BOX_H + GAP_Y, PAD + 2 * (BOX_H + GAP_Y), PAD + 3 * (BOX_H + GAP_Y)];
  var height = rowY[3] + BOX_H + PAD;
  var svg = diagramSvg(width, height, diagram.middle.join(" → "));
  var x = function (col) { return PAD + col * colW; };

  // Top: supervision above the real-time box; protection beside it.
  diagramBox(svg, x(1), rowY[0], diagram.above, diagram.aboveCaption, "bd-layer");
  diagramBox(svg, x(2), rowY[0], diagram.beside[0], "", "bd-layer");
  arrow(svg, "M" + (x(1) + BOX_W / 2) + " " + (rowY[0] + BOX_H) + " V" + (rowY[1] - 2));
  arrow(svg, "M" + (x(2) + BOX_W / 2) + " " + (rowY[0] + BOX_H) + " L" + (x(1) + BOX_W - 8) + " " + (rowY[1] - 2));

  // Middle: diagnostics → real-time control → actuators.
  diagram.middle.forEach(function (label, i) {
    diagramBox(svg, x(i), rowY[1], label, i === 1 ? diagram.middleCaption : "", i === 1 ? "bd-core" : "");
    if (i > 0) arrow(svg, "M" + (x(i - 1) + BOX_W) + " " + (rowY[1] + BOX_H / 2) + " H" + (x(i) - 2));
  });

  // Archive beside, below the chain; simulation underneath.
  diagramBox(svg, x(2), rowY[2], diagram.beside[1], "", "bd-layer");
  arrow(svg, "M" + (x(1) + BOX_W - 8) + " " + (rowY[1] + BOX_H) + " L" + (x(2) + BOX_W / 2) + " " + (rowY[2] - 2));
  diagramBox(svg, x(1), rowY[3], diagram.below, diagram.belowCaption, "bd-layer");
  arrow(svg, "M" + (x(1) + BOX_W / 2) + " " + rowY[3] + " V" + (rowY[1] + BOX_H + 2));
  return svg;
}

// ---------- Drawing (was in the cross-section SVG in index.html) ----------
/*
              <!-- Control system: outside the machine, commanding the coils -->
              <g class="part" data-part="control">
                <path class="shape link" d="M470 472 H366"/>
                <rect class="box" x="470" y="420" width="130" height="104" rx="4"/>
                <rect class="shape" x="484" y="438" width="30" height="20" rx="2"/>
                <rect class="shape" x="520" y="438" width="30" height="20" rx="2"/>
                <rect class="shape" x="556" y="438" width="30" height="20" rx="2"/>
                <text class="xs-label" x="535" y="500" text-anchor="middle" data-text="views.tokamak.labels.control"></text>
              </g>
*/

// ---------- Styles (were in style.css) ----------
/*
.bd-core {
  stroke: var(--select);
}

.bd-layer {
  stroke-dasharray: 3 3;
}
*/
