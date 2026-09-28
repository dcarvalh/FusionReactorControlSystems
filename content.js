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
        common: "Shared across machine types?",
        sources: "Sources"
      },
      panelPending: "Content coming in the next milestone."
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

  // The 5 tokamak parts, following EPFL's TCV infographic. Detailed content comes next.
  parts: [
    {
      id: "plasma",
      name: "Plasma",
      summary:
        "The hot, electrically charged gas being controlled. It follows the magnetic " +
        "field lines, which wind around the doughnut on nested surfaces.",
      shapeLink: true
    },
    {
      id: "tf",
      name: "Toroidal field coils",
      summary:
        "The large coils wrapped around the doughnut. They make the main magnetic " +
        "field, which runs the long way round."
    },
    {
      id: "pf",
      name: "Shaping coils (poloidal field)",
      summary:
        "Rings of coils inside and outside the plasma that set its position and shape. " +
        "TCV has 16, each with its own power supply, plus two fast coils inside the vessel.",
      shapeLink: true
    },
    {
      id: "cs",
      name: "Central solenoid",
      summary:
        "The transformer at the centre. Changing its current induces the electric " +
        "current that flows in the plasma."
    },
    {
      id: "control",
      name: "Control system",
      summary:
        "Measures the plasma with sensors and adjusts the coils, heating and fuelling in real time."
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
    sources: [
      { title: "EPFL Swiss Plasma Center: TCV plasma shapes", url: "https://www.epfl.ch/research/domains/swiss-plasma-center/tcv-plasma-shapes/" },
      { title: "Wikipedia: Tokamak à configuration variable", url: "https://en.wikipedia.org/wiki/Tokamak_%C3%A0_configuration_variable" },
      { title: "Vertical displacements close to ideal-MHD marginal stability (2023)", url: "https://www.sciencedirect.com/science/article/pii/S2772828523000109" }
    ]
  }
};
