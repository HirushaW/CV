# Hirusha Walgampaya: Portfolio

Personal portfolio site for Hirusha Walgampaya (computational chemistry, drug design,
nanoscale drug carriers). The page assembles itself on screen as you scroll, over an
animated backdrop of molecules and chemistry equations.

Built with Vite, React and TypeScript. No backend.

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build in dist/
```

## Edit the content

All text lives in [`src/content.ts`](src/content.ts): name, tagline, research, projects,
skills, experience, leadership and contact links. Change it there and the layout and
animation follow.

### The portrait photo

`public/portrait.webp` is a greyscale cut-out of the photo with a transparent background, so
it sits on the red panel in the hero. To replace it, export a new cut-out at about
920 px wide to the same file name. `person.portrait` in `src/content.ts` points to it; if
that is left empty, the hero shows a rotating dendrimer instead.

### The 3D structures

The viewer in the research section shows real, energy-minimised structures built with UDB:
eight families, generations G1 to G4, taken from `examples/Structures.tar.gz` in the UDB
repository. Each MOL2 file is converted to a small JSON file in `public/structures/`:

```bash
python3 scripts/mol2json.py dendrimer_pamam_gen2_min_gaff.mol2 public/structures/pamam_g2.json
```

The script keeps the heavy atoms and their bonds and reports the heavy-atom radius of
gyration. For PAMAM G2 it gives 13.922 Å, the same value the UDB Characteriser reports.

### Project screenshots

The images in `public/projects/` come from the README files of the SimQ and UDB
Characterization Tools repositories.

## Where things are

| Path | What it does |
|---|---|
| `src/content.ts` | Every word on the site |
| `src/sections/` | One file per page section |
| `src/build/engine.ts` | The self-building animation (cursors, wireframes, reveal) |
| `src/components/Background.tsx` | Animated backdrop of molecules and chemistry equations |
| `src/components/Molecule.tsx` | 3D viewer for the UDB structures |
| `scripts/mol2json.py` | Converts a MOL2 structure for the viewer |
| `src/styles.css` | All styling; colours are variables at the top |

## Deploy

The build is a static site. On Vercel, import the repository and accept the detected
Vite settings (build command `npm run build`, output `dist`).

## Notes

- The build animation is skipped for visitors who prefer reduced motion, and there is a
  Skip button for everyone else.
- The phone number and the referees' contact details are deliberately left off the site.
