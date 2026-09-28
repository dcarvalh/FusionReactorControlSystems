// All text content for the site lives here, as one plain object.
// Parts, machines and game text are added in later milestones.

window.CONTENT = {
  site: {
    title: "Tokamak Control Map",
    author: "David Carvalho",
    repoUrl: "https://github.com/dcarvalh/FusionReactorControlSystems",
    repoLabel: "Source on GitHub",
    footer:
      "Simplified, TCV-inspired illustration for learning. " +
      "Not an official representation of TCV, EPFL or Fusionality."
  },

  nav: {
    home: "Machines",
    tokamak: "Tokamak",
    game: "Control game",
    fit: "Where I fit"
  },

  views: {
    home: {
      title: "Select your machine",
      intro:
        "Fusion companies are building different kinds of machines. " +
        "Pick one to see its main parts and how each is controlled."
    },
    tokamak: {
      title: "Tokamak",
      intro:
        "A poloidal cross-section: a slice through the doughnut. " +
        "Select a part to see what it does and how it is controlled.",
      overviewLabel: "Overview",
      crossSectionLabel: "Cross-section · illustrative, not to scale",
      panelEmpty: "Select a part of the machine to see how it works."
    },
    game: {
      title: "Keep the plasma in the middle",
      intro: "Why tokamaks need fast feedback control."
    },
    fit: {
      title: "Where I fit",
      intro: "My experience, mapped onto the same control stack."
    }
  },

  placeholder: "Coming in a later milestone.",

  machines: [],
  parts: []
};
