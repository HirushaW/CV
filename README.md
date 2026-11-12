# Hirusha Walgampaya: Portfolio

Personal portfolio site for Hirusha Walgampaya (computational chemistry, drug design,
nanoscale drug carriers). The page assembles itself on screen as you scroll, over an
animated backdrop of molecules and simulation snippets.

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

### Add the portrait photo

1. Put the photo in `public/`, for example `public/portrait.jpg` (portrait orientation,
   about 800 × 1000 px).
2. In `src/content.ts`, set `person.portrait` to `'./portrait.jpg'`.

Until a photo is set, the hero shows a rotating dendrimer in that frame.

## Where things are

| Path | What it does |
|---|---|
| `src/content.ts` | Every word on the site |
| `src/sections/` | One file per page section |
| `src/build/engine.ts` | The self-building animation (cursors, wireframes, reveal) |
| `src/components/Background.tsx` | Animated chemistry and code backdrop |
| `src/components/Dendrimer.tsx` | Rotating 3D dendrimer schematic |
| `src/styles.css` | All styling; colours are variables at the top |

## Deploy

The build is a static site. On Vercel, import the repository and accept the detected
Vite settings (build command `npm run build`, output `dist`).

## Notes

- The build animation is skipped for visitors who prefer reduced motion, and there is a
  Skip button for everyone else.
- The dendrimer graphics are schematic illustrations, not structures produced by UDB.
