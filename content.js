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
      plantLabel: "Power supplies · flywheel generator · cooling · vacuum",
      controlLabel: "Control room",
      nbiLabel: "NBI",
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

  // The 9 tokamak parts. Detailed content is filled in milestone M3.
  parts: [
    { id: "plasma", name: "Plasma", summary: "The thing being controlled." },
    { id: "tf", name: "Toroidal field coils", summary: "The large coils that make the main magnetic field." },
    { id: "pf", name: "Poloidal field system", summary: "Ohmic transformer, shaping coils and fast in-vessel coils." },
    { id: "vessel", name: "Vacuum vessel & divertor", summary: "The vacuum chamber, and where the exhaust heat lands." },
    { id: "heating", name: "Heating", summary: "Microwaves (ECRH) and neutral beams (NBI)." },
    { id: "fuelling", name: "Fuelling", summary: "Gas valves that feed fuel into the plasma." },
    { id: "diagnostics", name: "Diagnostics", summary: "The measurement layer." },
    { id: "plant", name: "Power supplies & plant", summary: "Power for coils and heating, plus cooling and vacuum." },
    { id: "control", name: "Control room", summary: "The control and data system." }
  ]
};
