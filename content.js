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
      paragraphs: [
        "Fusionality's founders estimate that about 80% of every fusion company's " +
          "control system is the same, whatever the machine. I wanted to understand " +
          "that claim from the inside, so I took one machine, the tokamak, and mapped " +
          "each of its main parts to the loops that control it: what is measured, " +
          "what acts, how fast, how it is tested and what the operators watch.",
        "I built it in the days before our conversation, working from published " +
          "papers on TCV and its control system. Every number on the page links to " +
          "its source. [DAVID: one line in your own words on why fusion, and why now]"
      ]
    },
    showcase: {
      title: "What it is meant to show",
      items: [
        {
          heading: "I learn a new domain fast",
          text:
            "[DAVID: confirm: tokamak control was new to me.] The page goes from the " +
            "machine's parts to its control loops using only published sources, each one cited."
        },
        {
          heading: "I think in control systems",
          text:
            "Every part is described the same way: sensors, estimation, controller, " +
            "actuator, loop speed, testing and supervision. This is how I worked on " +
            "SCADA and hardware-in-the-loop test systems at CERN."
        },
        {
          heading: "I take work into operation, not just prototypes",
          text:
            "The page is designed, tested and deployed like a small product. " +
            "[DAVID: one example of a system you commissioned]"
        },
        {
          heading: "I explain complex systems simply",
          text:
            "The page is written for a smart engineer outside fusion, " +
            "without giving up accuracy."
        },
        {
          heading: "I care about getting it right",
          text:
            "Uncertain claims are flagged and checked before publishing. " +
            "When I was unsure, I said less."
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
