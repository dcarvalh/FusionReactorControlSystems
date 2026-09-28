// All text content for the site lives here, as one plain object.
// Tokamak parts are added in a later milestone.
// Fields listed in a `verify` array need a human accuracy check before sending.

window.CONTENT = {
  site: {
    title: "Fusion Reactor Control Systems",
    author: "David Carvalho",
    repoUrl: "https://github.com/dcarvalh/FusionReactorControlSystems",
    repoLabel: "Source on GitHub",
    footer:
      "Simplified, TCV-inspired illustration for learning. " +
      "Not an official representation of TCV, EPFL or Fusionality."
  },

  nav: {
    home: "Select your machine",
    why: "Why I built this"
  },

  views: {
    home: {
      title: "Select your machine",
      intro:
        "Fusion companies are building different kinds of machines. " +
        "Pick one to see its main parts and how each one is controlled."
    },
    tokamak: {
      back: "← All machines",
      title: "Tokamak",
      intro:
        "A poloidal cross-section: a slice through the doughnut. " +
        "Select a part to see what it does and how it is controlled.",
      overviewLabel: "Overview · 3D view coming later",
      crossSectionLabel: "Cross-section · TCV-inspired · illustrative, not to scale",
      axisLabel: "axis of the doughnut",
      vesselLabel: "vacuum vessel",
      labels: {
        plasma: "Plasma",
        tf: "Toroidal field coil",
        pf: "Shaping coils",
        cs: "Central solenoid",
        control: "Control system"
      },
      listTitle: "All parts",
      panelEmpty: "Select a part of the machine to see how it works.",
      panelLabels: {
        does: "What it does",
        tech: "Key technologies",
        control: "How it's controlled",
        testing: "How it's tested",
        monitoring: "What's monitored",
        diagram: "Block diagram",
        sources: "Sources"
      },
      speedTitle: "Fastest loop timescale",
      sourcesLabel: "Sources"
    },
    why: {
      title: "Why I built this",
      intro:
        "I wanted to show, rather than tell, how I approach a new control problem."
    }
  },

  // Home page cards. Only the tokamak is active for now.
  machines: [
    {
      id: "tokamak",
      name: "Tokamak",
      active: true,
      summary:
        "A doughnut of plasma; a current flowing in the plasma helps hold it.",
      examples: "Example of a company building this type: Commonwealth Fusion Systems.",
      cta: "Explore the tokamak →",
      verify: ["summary"]
    },
    {
      id: "stellarator",
      name: "Stellarator",
      active: false,
      summary:
        "Twisted 3D coils create the whole magnetic cage, so no plasma current is needed.",
      examples: "Examples of companies building this type: Proxima Fusion, Type One Energy.",
      verify: ["summary"]
    },
    {
      id: "mirror",
      name: "Magnetic mirror",
      active: false,
      summary:
        "A straight magnetic tube, plugged at both ends by strong magnets.",
      examples: "Example of a company building this type: Realta Fusion.",
      verify: ["summary"]
    }
  ],
  comingSoon: "Coming soon",

  // "Why I built this" tab.
  // DRAFT for David to edit. [DAVID: …] markers stay visible until filled in.
  why: {
    motivation: {
      title: "Why this page exists",
      points: [
        "Fusionality's founders estimate that about 80% of every fusion " +
          "company's control system is the same, whatever the machine.",
        "I wanted to see that from the inside: one machine, each part mapped " +
          "to the loops that control it.",
        "Built from published papers on TCV; every number links to its source. " +
          "[DAVID: why fusion, and why now]"
      ]
    },
    showcase: {
      title: "What it is meant to show",
      items: [
        {
          heading: "I learn fast.",
          text:
            "[DAVID: confirm: tokamak control was new to me.] " +
            "From machine parts to control loops, using only cited, published sources."
        },
        {
          heading: "I think in control systems.",
          text:
            "Every part follows the same pattern: sensors, estimation, controller, " +
            "actuator, loop speed, testing, supervision. The same pattern as my " +
            "SCADA and hardware-in-the-loop work at CERN."
        },
        {
          heading: "I take work into operation.",
          text:
            "Designed, tested and deployed like a small product. " +
            "[DAVID: one example of a system you commissioned]"
        },
        {
          heading: "I explain complex systems simply.",
          text: "Written for an engineer outside fusion, without giving up accuracy."
        },
        {
          heading: "I care about getting it right.",
          text: "Uncertain claims are flagged and checked. When unsure, I said less."
        }
      ]
    },
    fit: {
      title: "Where I fit",
      intro:
        "My work experience, mapped onto the same control stack: supervisory and " +
        "SCADA, plant integration and fieldbuses, hardware-in-the-loop testing, " +
        "real-time software, and commissioning.",
      placeholder: "Coming in a later update."
    }
  },

  // All sources, referenced by key from parts and shapes. Every number must come from one of these.
  sources: {
    tcvWiki: { title: "Wikipedia: Tokamak à configuration variable", url: "https://en.wikipedia.org/wiki/Tokamak_%C3%A0_configuration_variable" },
    epflShapes: { title: "EPFL Swiss Plasma Center: TCV plasma shapes", url: "https://www.epfl.ch/research/domains/swiss-plasma-center/tcv-plasma-shapes/" },
    degrave2022: { title: "Degrave et al., Magnetic control of tokamak plasmas through deep reinforcement learning, Nature 602 (2022)", url: "https://www.nature.com/articles/s41586-021-04301-9" },
    hofmann1997: { title: "Hofmann et al., Feedback stabilization of axisymmetric modes in TCV (1997)", url: "https://www.osti.gov/etdeweb/biblio/587784" },
    dutch1995: { title: "Dutch et al., Experimental and theoretical growth rates of the vertical instability in TCV (1995)", url: "https://www.osti.gov/etdeweb/biblio/176266" },
    coda2010: { title: "Coda, Progress and scientific results in the TCV tokamak (2010)", url: "https://www.osti.gov/etdeweb/biblio/21562879" },
    porcelli2023: { title: "Porcelli et al., Vertical displacements close to ideal-MHD marginal stability (2023)", url: "https://doi.org/10.1016/j.fpp.2023.100017" },
    le2014: { title: "Le et al., Distributed digital real-time control system for TCV tokamak (2014)", url: "https://doi.org/10.1016/j.fusengdes.2013.11.001" },
    galperti2024: { title: "Galperti et al., Overview of the TCV digital real-time plasma control system and its applications (2024)", url: "https://doi.org/10.1016/j.fusengdes.2024.114640" },
    moret2015: { title: "Moret et al., Tokamak equilibrium reconstruction code LIUQE and its real time implementation (2015)", url: "https://doi.org/10.1016/j.fusengdes.2014.09.019" },
    velasco2023: { title: "Velasco de la Fuente et al., Control upgrade for the TCV coils power supplies (2023)", url: "https://doi.org/10.1016/j.fusengdes.2023.113539" },
    karpushov2023: { title: "Karpushov et al., Upgrade of the neutral beam heating system on TCV (2023)", url: "https://doi.org/10.1016/j.fusengdes.2022.113384" }
  },

  // The 5 tokamak parts, following EPFL's TCV infographic.
  // `verify` lists fields to double-check before sending.
  parts: [
    {
      id: "plasma",
      name: "Plasma",
      summary:
        "The hot, electrically charged gas being controlled. It follows the magnetic " +
        "field lines, which wind around the doughnut on nested surfaces.",
      shapeLink: true,
      does:
        "Gas so hot its atoms split into ions and electrons, held away from the wall by " +
        "magnetic fields. It carries its own current (up to 1.2 MA on TCV). Its position, " +
        "shape, current and heating are what the control system steers.",
      tech: [
        "Microwave heating (ECRH) from gyrotrons, which can also drive current (ECCD)",
        "TCV: 4.5 MW of ECRH with 7 launchers steerable in real time (2010)",
        "Neutral beam heating (NBI): the first TCV beam gives up to 1.3 MW",
        "Gas valves for fuelling"
      ],
      control: {
        text:
          "Through its actuators: coil voltages set position, shape and current; " +
          "heating power and launcher angles set where energy goes; gas valves set " +
          "density. Holding the vertical position is the fastest loop.",
        speed: "ms"
      },
      testing:
        "Control code is tried on a plasma simulator first. TCV's free-boundary " +
        "simulator (FGE) models how plasma and coil currents evolve, and produces " +
        "synthetic sensor signals.",
      monitoring:
        "Position and shape, rebuilt from magnetic sensors, and the plasma current. " +
        "Cameras record each shot for analysis afterwards; on TCV they are not used in real time.",
      diagram: {
        nodes: [
          { label: "Plasma" },
          { label: "Sensors", caption: "magnetic, optical" },
          { label: "Control system" },
          { label: "Actuators", caption: "coils, heating, gas" }
        ],
        loopRate: "every shot, in real time"
      },
      sources: ["tcvWiki", "coda2010", "degrave2022"],
      verify: ["control", "diagram"]
    },
    {
      id: "tf",
      name: "Toroidal field coils",
      summary:
        "The large coils wrapped around the doughnut. They make the main magnetic " +
        "field, which runs the long way round.",
      does:
        "Make the strong main field that runs the long way round the doughnut: 1.43 T " +
        "on TCV. Charged particles spiral along the field lines instead of flying into the wall.",
      tech: [
        "Large water-cooled copper coils, not superconducting",
        "A dedicated power supply",
        "Current held flat during the pulse (about 2 s on TCV)"
      ],
      control: {
        text:
          "Mostly a fixed current setpoint: ramped up before the plasma, held flat " +
          "through the pulse, ramped down after.",
        speed: "s"
      },
      testing:
        "Commissioned without plasma: current raised in steps while temperatures, " +
        "forces and protection trips are checked.",
      monitoring: "Coil current and temperature, cooling, and the interlocks that ramp the current down on a fault.",
      diagram: {
        nodes: [
          { label: "Setpoint" },
          { label: "Power supply" },
          { label: "TF coils" },
          { label: "Current sensor" }
        ],
        loopRate: "slow: held flat"
      },
      sources: ["tcvWiki"],
      verify: ["tech", "control", "testing", "monitoring"]
    },
    {
      id: "pf",
      name: "Shaping coils (poloidal field)",
      summary:
        "Rings of coils inside and outside the plasma that set its position and shape. " +
        "TCV has 16, each with its own power supply, plus fast coils inside the vessel.",
      shapeLink: true,
      does:
        "Set the plasma's position and shape. TCV's 16 independently powered shaping " +
        "coils, plus an internal fast coil for vertical control and the ohmic coils, " +
        "give 19 control coils in all.",
      tech: [
        "16 shaping coils, each with its own power supply",
        "Thyristor power supplies, driven by voltage references",
        "A fast coil inside the vessel for vertical stability",
        "Magnetic sensors: 34 flux loops and 38 field probes feed the loop"
      ],
      control: {
        text:
          "Two loops. Vertical position: tall plasmas are unstable, and TCV holds growth " +
          "rates up to 4400 per second, so the coils must react within a fraction of a " +
          "millisecond. Shape: tracked over milliseconds. Rule of thumb: you can't hold " +
          "an instability much faster than 1 / (power-supply response time).",
        speed: "µs"
      },
      testing:
        "New controllers run on the FGE simulator first. DeepMind's controller was " +
        "trained there and then ran on TCV with no further tuning ('zero-shot').",
      monitoring:
        "Currents in all 19 control coils, plus limits on current and force. Unbalanced " +
        "ohmic coil currents cause forces on the machine structure, so they are kept balanced.",
      diagram: {
        nodes: [
          { label: "Magnetic sensors", caption: "34 loops · 38 probes" },
          { label: "Estimate shape" },
          { label: "Controller" },
          { label: "Power supplies", caption: "thyristor" },
          { label: "Coils", caption: "19 on TCV" },
          { label: "Plasma" }
        ],
        loopRate: "10 kHz (DeepMind controller)"
      },
      sources: ["tcvWiki", "degrave2022", "hofmann1997", "dutch1995", "porcelli2023"],
      verify: ["does"]
    },
    {
      id: "cs",
      name: "Central solenoid",
      summary:
        "The transformer at the centre. Changing its current induces the electric " +
        "current that flows in the plasma.",
      does:
        "Drives the plasma current. Ramping the current in the central coils induces a " +
        "voltage around the doughnut, which pushes up to 1.2 MA through the plasma on TCV.",
      tech: [
        "Ohmic coils on the central column, plus coils above and below",
        "The plasma acts as the transformer's single-turn secondary",
        "Coil currents measured in real time"
      ],
      control: {
        text:
          "The plasma current follows a programmed waveform (ramp-up, flat-top, " +
          "ramp-down), with feedback keeping it on target. A transformer can only ramp " +
          "so far, which is one reason tokamak pulses are short.",
        speed: "ms"
      },
      testing:
        "The current waveform is rehearsed in simulation first; FGE models the plasma " +
        "current with a circuit equation.",
      monitoring:
        "Plasma current and ohmic coil currents. On TCV the two ohmic coil currents are " +
        "kept close, to limit forces on the machine.",
      diagram: {
        nodes: [
          { label: "Current target" },
          { label: "Controller" },
          { label: "Power supply" },
          { label: "Central solenoid" },
          { label: "Plasma current" }
        ],
        loopRate: "measured plasma current"
      },
      sources: ["tcvWiki", "degrave2022"],
      verify: ["tech", "control"]
    },
    {
      id: "control",
      name: "Control system",
      summary:
        "Measures the plasma with sensors and adjusts the coils, heating and fuelling in real time.",
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
    }
  ],

  // "Shape the plasma": EPFL's TCV plasma shapes, simplified.
  shapes: {
    title: "Shape the plasma",
    intro:
      "Plasma follows the magnetic field lines, so changing the field changes its shape. " +
      "TCV's tall vessel and 16 independently powered shaping coils let it make many " +
      "shapes with the same hardware: only the coil currents change.",
    note:
      "Shapes simplified from EPFL's published TCV equilibria; illustrative, not to scale. " +
      "The thin lines inside the plasma are magnetic surfaces: the field lines wind around " +
      "the doughnut on them.",
    cta: "Try it: shape the plasma ↓",
    defaultId: "diverted",
    items: [
      {
        id: "limited",
        name: "Limited",
        text: "The plasma's edge rests directly on a wall surface."
      },
      {
        id: "diverted",
        name: "Diverted",
        text:
          "The edge is set by an X-point, where the poloidal field vanishes. Exhaust heat " +
          "flows along the legs to the divertor, away from the main plasma.",
        verify: ["text"]
      },
      {
        id: "elongated",
        name: "Elongated",
        text:
          "Stretched tall. TCV experiments showed extreme elongation helps raise plasma " +
          "pressure while keeping it stable. The catch: tall plasmas are vertically " +
          "unstable and need fast feedback to stay in place.",
        verify: ["text"]
      },
      {
        id: "positive",
        name: "Positive triangularity",
        short: "D shape",
        text: "The classic D shape, with its flat side facing the machine's axis.",
        verify: ["text"]
      },
      {
        id: "negative",
        name: "Negative triangularity",
        short: "Reversed D",
        text: "The D reversed. Same coils, different currents: TCV can make both."
      },
      {
        id: "doubleNull",
        name: "Double null",
        text: "Two X-points, one above and one below the plasma."
      },
      {
        id: "snowflake",
        name: "Snowflake",
        text:
          "First produced on TCV. A second-order null splits the exhaust into more legs, " +
          "to spread the heat.",
        verify: ["text"]
      },
      {
        id: "droplets",
        name: "Droplets",
        text: "Two separate plasmas held at once in one vessel."
      }
    ],
    sources: ["epflShapes", "tcvWiki", "porcelli2023"]
  }
};
