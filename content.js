// All text content for the site lives here, as one plain object.
// Fields listed in a `verify` array could not be checked against a readable source.

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
      inspired:
        "Inspired by TCV (Tokamak à Configuration Variable) at EPFL's Swiss Plasma Center, Lausanne",
      intro:
        "The whole machine in 3D, and a poloidal cross-section: a slice through the doughnut. " +
        "Select a part in either view to see what it does and how it is controlled.",
      overviewLabel: "3D cutaway · cyan plane = the slice below",
      crossSectionLabel: "Cross-section · TCV-inspired · illustrative, not to scale",
      axisLabel: "axis of the doughnut",
      vesselLabel: "vacuum vessel",
      labels: {
        plasma: "Plasma",
        tf: "Toroidal field coil",
        pf: "Shaping coils",
        cs: "Central solenoid"
      },
      listTitle: "All parts",
      panelEmpty: "Click any part of the machine, in the 3D view or the cross-section, for more info.",
      panelEmptyTouch: "Tap any part of the machine, in the 3D view or the cross-section, for more info.",
      clickHint: "Click a part for more info",
      tapHint: "Tap a part for more info",
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
      modes: { simple: "Simple", complete: "Complete" },
      modeLabel: "Level of detail",
      sourcesLabel: "Sources"
    },
    why: {
      title: "Why I built this",
      intro:
        "I wanted to learn how nuclear fusion reactors really work."
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

  // "Why I built this" tab. [DAVID: …] in any text shows as a highlighted placeholder.
  why: {
    motivation: {
      title: "Why this page exists",
      points: [
        "Curiosity: I wanted to learn about nuclear fusion reactors. Science and " +
          "technology excite me, and fusion is one I wanted to understand properly.",
        "Understanding: I built the 3D cutaway and the cross-section from an " +
          "infographic of EPFL's TCV, to understand all the moving parts of the machine.",
        "Motivation: I built this page on published papers about TCV and " +
          "its plasma control, work Fusionality's founders were part of."
      ]
    },
    showcase: {
      title: "What it is meant to show",
      items: [
        {
          heading: "Fast learner.",
          text:
            "I knew nothing about how nuclear fusion reactors work. Building this page " +
            "is how the machine started to make sense."
        },
        {
          heading: "Control systems approach.",
          text:
            "Every part follows the same pattern: sensors, estimation, controller, " +
            "actuator, loop speed, testing, supervision. The same pattern as my " +
            "SCADA and hardware-in-the-loop work at CERN."
        },
        {
          heading: "Complex systems, explained simply.",
          text:
            "Written for an engineer outside fusion: the 3D view, the cross-section and " +
            "the shape picker do most of the explaining."
        },
        {
          heading: "Hands-on builder.",
          text:
            "A 3D cutaway, an interactive cross-section, plasma shapes that morph live: " +
            "plain HTML, CSS and JavaScript (three.js for the 3D), tested and deployed " +
            "like a small product."
        },
        {
          heading: "Accuracy first.",
          text:
            "Every number has a source, and every paper used is referenced. What I could " +
            "not check against a source, I left out or kept general: when unsure, I said less."
        }
      ]
    },
    // From David's CV (Sep 2026) and cover letter. Every line names a real
    // system, tool or deliverable.
    fit: {
      title: "Where I fit",
      intro: "My experience, from supervision down to real-time control hardware.",
      columns: { layer: "Layer", done: "What I've done", status: "Status" },
      statusLabels: {
        shipped: "Shipped in production",
        adjacent: "Adjacent",
        learning: "Learning now",
        personal: "Personal project"
      },
      rows: [
        {
          layer: "Supervisory & SCADA",
          speed: "seconds",
          done: ["WinCC OA and CTRL++ at CERN; C# and SQL and zenon at SKAN"],
          status: "shipped"
        },
        {
          layer: "Distributed control & integration",
          speed: "ms",
          done: ["CERN power converter plants: tens of Siemens PLCs, thousands of IO points; IEC-104, MODBUS, PROFINET, PROFIBUS, OPC-UA"],
          status: "shipped"
        },
        {
          layer: "Testing & hardware-in-the-loop",
          done: ["Led CERN's Python CI/CD framework for HIL and functional tests (pytest, GitLab CI)"],
          status: "shipped"
        },
        {
          layer: "Validation & commissioning",
          done: ["GMP test plans and on-site acceptance at SKAN; SCADA testing through CERN's Long Shutdown 2"],
          status: "shipped"
        },
        {
          layer: "Operations & support",
          done: ["24/7 standby at CERN; coordinated a five-person support team"],
          status: "shipped"
        },
        {
          layer: "Real-time control hardware",
          done: ["Supported real-time control hardware by integrating PLCs and custom current-regulation hardware into the SCADA"],
          status: "shipped"
        }
      ],
      links: [
        { label: "Website", url: "https://davidcarvalho.work" },
        { label: "GitHub", url: "https://github.com/dcarvalh" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/dcarvalh/" },
        { label: "Email", url: "mailto:david.belo.carvalho@gmail.com" }
      ]
    }
  },

  // All sources, referenced by key from parts and shapes. Every number must come from one of these.
  // Sources without a url are cited as plain text: their publisher links (ScienceDirect)
  // fail for readers without a login, so they are not linked.
  sources: {
    tcvWiki: { title: "Wikipedia: Tokamak à configuration variable", url: "https://en.wikipedia.org/wiki/Tokamak_%C3%A0_configuration_variable" },
    epflShapes: { title: "EPFL Swiss Plasma Center: TCV plasma shapes", url: "https://www.epfl.ch/research/domains/swiss-plasma-center/tcv-plasma-shapes/" },
    degrave2022: { title: "Degrave et al., Magnetic control of tokamak plasmas through deep reinforcement learning, Nature 602 (2022)", url: "https://www.nature.com/articles/s41586-021-04301-9" },
    hofmann1997: { title: "Hofmann et al., Feedback stabilization of axisymmetric modes in TCV (1997)", url: "https://www.osti.gov/etdeweb/biblio/587784" },
    dutch1995: { title: "Dutch et al., Experimental and theoretical growth rates of the vertical instability in TCV (1995)", url: "https://www.osti.gov/etdeweb/biblio/176266" },
    coda2010: { title: "Coda, Progress and scientific results in the TCV tokamak (2010)", url: "https://www.osti.gov/etdeweb/biblio/21562879" },
    porcelli2023: { title: "Porcelli et al., Vertical displacements close to ideal-MHD marginal stability (2023)" }
  },

  // The 4 tokamak parts, following EPFL's TCV infographic.
  // `verify` lists fields to double-check before sending.
  parts: [
    {
      id: "plasma",
      name: "Plasma",
      summary:
        "The hot, electrically charged gas being controlled. It follows the magnetic " +
        "field lines, which wind around the doughnut on nested surfaces.",
      simple: {
        does:
          "A gas so hot it becomes electrically charged. Magnetic fields hold it in the " +
          "middle of the vessel, away from the walls.",
        tech: ["Microwaves and particle beams heat it", "Gas valves add fuel"],
        control:
          "The control system keeps it in place, in the right shape and at the right " +
          "current, for the whole shot."
      },
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
      simple: {
        does:
          "Big coils around the doughnut that make the main magnetic field. The plasma's " +
          "particles follow that field instead of hitting the wall.",
        tech: ["Large copper coils", "One steady power supply"],
        control: "Set to a fixed current before the plasma starts, and held there.",
        verify: ["tech"]
      },
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
        "TCV has 16, each with its own power supply, plus a fast coil inside the vessel.",
      simple: {
        does:
          "Rings of coils that push and pull on the plasma to set where it sits and what " +
          "shape it has.",
        tech: ["16 coils, each powered separately", "A fast coil inside the vessel", "Magnetic sensors all around"],
        control:
          "A tall plasma wants to drift up or down. The coils catch it in well under a " +
          "millisecond, thousands of times per second."
      },
      does:
        "Set the plasma's position and shape. TCV's 16 independently powered shaping " +
        "coils, plus the ohmic coils and one internal fast coil for vertical control " +
        "(with parts in the top and bottom corners of the vessel), give 19 control coils in all.",
      tech: [
        "16 shaping coils, each with its own power supply",
        "Thyristor power supplies, driven by voltage references",
        "A fast coil inside the vessel for vertical stability (one circuit, top and bottom parts)",
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
      simple: {
        does:
          "A transformer in the middle. Changing its current makes a current flow in the " +
          "plasma, which heats it and helps hold it together.",
        tech: ["A stack of coils around the machine's axis", "The plasma acts as the transformer's second winding"],
        control: "The plasma current follows a planned ramp up, hold and ramp down, with feedback keeping it on track."
      },
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
    }
  ],

  // "Shape the plasma": EPFL's TCV plasma shapes, simplified.
  shapes: {
    title: "Shape the plasma",
    aboutTitle: "About the shapes",
    intro:
      "Plasma follows the magnetic field lines, so changing the field changes its shape. " +
      "TCV's tall vessel and 16 independently powered shaping coils let it make many " +
      "shapes with the same hardware: only the coil currents change.",
    note:
      "Shapes simplified from EPFL's published TCV equilibria; illustrative, not to scale. " +
      "The thin lines inside the plasma are magnetic surfaces: the field lines wind around " +
      "the doughnut on them.",
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
