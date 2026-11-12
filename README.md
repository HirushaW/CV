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

## The database

Everything the site says and shows is stored in one file,
[`database/portfolio.json`](database/portfolio.json). The pages read from it, so changing
the site means changing that file; no page code needs to be touched.

| Table | What it holds |
|---|---|
| `person` | Name, role, location, email, links, portrait |
| `hero` | Headline word, tagline, the "Currently" list |
| `about` | Profile paragraphs, focus areas, education |
| `udb` | Universal Dendrimer Builder: description, seven stages, contributions, capabilities, families, links, 3D viewer settings |
| `polybuilder`, `software`, `colorimeter` | The other projects |
| `skills` | Six categories, each with its skills |
| `experience` | Internships: role, organisation, dates, bullet points |
| `leadership`, `membership`, `referees` | Roles, membership, referees |
| `quote` | The quotation in the contact section |
| `photos` | Every photograph and figure, grouped by the part of the site it belongs to |
| `backgrounds` | The faint image behind each project and internship card |
| `sections` | The six sections and their tile symbols |

### Add something

- **A leadership role:** add `{ "role": "...", "org": "...", "place": "...", "when": "..." }`
  to `leadership`.
- **A skill:** add `{ "title": "...", "items": ["...", "..."] }` to the right category in
  `skills` (`items` is optional).
- **A photograph:** put the image in `public/photos/` as `name.jpg`, plus a small copy
  about 720 px wide as `name-t.jpg`, then add an entry to the right list in `photos`:

  ```json
  {
    "src": "./photos/name.jpg",
    "thumb": "./photos/name-t.jpg",
    "alt": "What the photo shows, for people who cannot see it",
    "title": "Short title",
    "details": "The sentence or two shown when the photo is opened."
  }
  ```

### The check

`npm run check` reads the database and stops with a list of problems if an image file is
missing, a cross-reference does not resolve, a required text is empty or a link is
malformed. It also runs at the start of every `npm run build`, so a slip in the data cannot
reach the live site.

### The portrait

`public/portrait.webp` is a greyscale cut-out of the photo with a transparent background, so
it sits on the red panel in the hero. To replace it, export a new cut-out at about
920 px wide to the same file name.

### The 3D structures

The viewer in the research section shows real, energy-minimised structures built with UDB:
eight families, generations G1 to G4, taken from `examples/Structures.tar.gz` in the UDB
repository. Each MOL2 file is converted to a small JSON file in `public/structures/`:

```bash
python3 scripts/mol2json.py dendrimer_pamam_gen2_min_gaff.mol2 public/structures/pamam_g2.json
```

The script keeps the heavy atoms and their bonds and reports the heavy-atom radius of
gyration. For PAMAM G2 it gives 13.922 Å, the same value the UDB Characteriser reports.

### Where the images come from

Photographs were supplied by the site's owner; location data has been removed from them.
Screenshots and diagrams of the software come from the README files of the SimQ and UDB
Characterization Tools repositories and from the UDB website.

## Where things are

| Path | What it does |
|---|---|
| `database/portfolio.json` | Every word and image reference on the site |
| `src/content.ts` | Gives the database its types |
| `scripts/check-database.mjs` | Checks the database before each build |
| `src/sections/` | One file per page section |
| `src/build/engine.ts` | The self-building animation (cursors, wireframes, reveal) |
| `src/components/Background.tsx` | Animated backdrop of molecules and chemistry equations |
| `src/components/Molecule.tsx` | 3D viewer for the UDB structures |
| `src/components/Lightbox.tsx` | Opens a photo or figure with its details |
| `scripts/mol2json.py` | Converts a MOL2 structure for the viewer |
| `src/styles.css` | All styling; colours are variables at the top |

## Deploy

The build is a static site. On Vercel, import the repository and accept the detected
Vite settings (build command `npm run build`, output `dist`).

## Notes

- The build animation is skipped for visitors who prefer reduced motion, and there is a
  Skip button for everyone else.
- After the hero has assembled, the page scrolls down by itself. Any touch, scroll, key
  press or click stops it, and the pill at the bottom has a button to pause and resume.
- The phone number is deliberately left off the site.
