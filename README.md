# Fusion Reactor Control Systems

An interactive, static web page about how a tokamak is controlled, inspired by TCV at EPFL's Swiss Plasma Center. It shows the machine as a 3D cutaway and a clickable cross-section; each part (plasma, toroidal field coils, shaping coils, central solenoid) opens a Simple or Complete panel on what it does, how it's controlled, tested and monitored, with a block diagram and sources. "Shape the plasma" morphs the plasma through eight shapes TCV has made. A "Why I built this" tab explains the motivation. It is a simplified illustration for learning, not an official representation of TCV, EPFL or Fusionality.

Plain HTML, CSS and vanilla JavaScript: no framework, no build step. The 3D view uses three.js from a CDN.

| File | What it holds |
|---|---|
| `index.html` | Page structure and the cross-section SVG |
| `content.js` | All text, sources and `verify` flags |
| `app.js` | Views, cross-section, panel, block diagrams, shape picker |
| `shapes.js` | Plasma shape geometry (pure functions) |
| `overview.js` | 3D cutaway (ES module, three.js) |
| `style.css` | Design tokens and layout |
| `archive/` | Removed content kept for reference (not loaded) |

**Live:** https://dcarvalh.github.io/FusionReactorControlSystems/

## Run locally

```sh
python3 -m http.server
```

Then open http://localhost:8000.
