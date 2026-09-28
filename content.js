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
      overviewLabel: "Overview",
      crossSectionLabel: "Cross-section · illustrative, not to scale",
      panelEmpty: "Select a part of the machine to see how it works."
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

  parts: []
};
