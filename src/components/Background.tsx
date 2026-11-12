import { useEffect, useRef } from 'react';

// A quiet animated backdrop: skeletal molecules and drifting chemistry
// equations and molecular-simulation terms. Everything is drawn faintly on one
// canvas that sits behind the page.

type Atom = { x: number; y: number; label?: string; dot?: boolean };
type Bond = [number, number, number];
type Template = { atoms: Atom[]; bonds: Bond[] };

const TAU = Math.PI * 2;

function ring(n: number, cx = 0, cy = 0, rot = Math.PI / 2): Atom[] {
  return Array.from({ length: n }, (_, i) => {
    const a = rot + (i * TAU) / n;
    return { x: cx + Math.cos(a), y: cy + Math.sin(a) };
  });
}

function benzene(): Template {
  const atoms = ring(6);
  const bonds: Bond[] = atoms.map((_, i) => [i, (i + 1) % 6, i % 2 === 0 ? 2 : 1]);
  return { atoms, bonds };
}

function triazine(): Template {
  const t = benzene();
  [0, 2, 4].forEach((i) => (t.atoms[i].label = 'N'));
  return t;
}

function naphthalene(): Template {
  const s = Math.sqrt(3);
  const a = ring(6, -s / 2, 0);
  const b = ring(6, s / 2, 0);
  const atoms: Atom[] = [];
  const index = (p: Atom) => {
    const found = atoms.findIndex((q) => Math.hypot(q.x - p.x, q.y - p.y) < 0.01);
    if (found >= 0) return found;
    atoms.push(p);
    return atoms.length - 1;
  };
  const bonds: Bond[] = [];
  const seen = new Set<string>();
  [a, b].forEach((hex) => {
    const ids = hex.map(index);
    ids.forEach((id, i) => {
      const j = ids[(i + 1) % 6];
      const key = id < j ? `${id}-${j}` : `${j}-${id}`;
      if (seen.has(key)) return;
      seen.add(key);
      bonds.push([id, j, bonds.length % 2 === 0 ? 2 : 1]);
    });
  });
  return { atoms, bonds };
}

/** A flat sketch of a dendrimer: a core, three arms, two branching generations. */
function dendrimer(): Template {
  const atoms: Atom[] = [{ x: 0, y: 0, dot: true }];
  const bonds: Bond[] = [];
  const grow = (parent: number, angle: number, depth: number, length: number) => {
    const p = atoms[parent];
    const node: Atom = {
      x: p.x + Math.cos(angle) * length,
      y: p.y + Math.sin(angle) * length,
      dot: true,
    };
    atoms.push(node);
    const id = atoms.length - 1;
    bonds.push([parent, id, 1]);
    if (depth < 3) {
      grow(id, angle - 0.55, depth + 1, length * 0.78);
      grow(id, angle + 0.55, depth + 1, length * 0.78);
    }
  };
  for (let i = 0; i < 3; i++) grow(0, (i * TAU) / 3 - Math.PI / 2, 1, 1.25);
  return { atoms, bonds };
}

/** An amide-linked chain, the kind of repeat unit found in PAMAM. */
function amideChain(): Template {
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  const step = Math.cos(Math.PI / 6);
  const labels: Record<number, string> = { 0: 'N', 4: 'NH', 7: 'N' };
  for (let i = 0; i < 8; i++) {
    atoms.push({ x: (i - 3.5) * step, y: i % 2 === 0 ? 0.25 : -0.25, label: labels[i] });
    if (i > 0) bonds.push([i - 1, i, 1]);
  }
  atoms.push({ x: (3 - 3.5) * step, y: -1.25, label: 'O' });
  bonds.push([3, 8, 2]);
  return { atoms, bonds };
}

function water(): Template {
  const half = (104.5 / 2) * (Math.PI / 180);
  return {
    atoms: [
      { x: 0, y: 0, label: 'O' },
      { x: -Math.sin(half), y: Math.cos(half), label: 'H' },
      { x: Math.sin(half), y: Math.cos(half), label: 'H' },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
    ],
  };
}

const TEMPLATES: Template[] = [
  benzene(),
  dendrimer(),
  naphthalene(),
  amideChain(),
  triazine(),
  dendrimer(),
  water(),
];

const TOKENS = [
  'ΔG = ΔH − TΔS',
  'k = A·exp(−Ea / RT)',
  'A = ε·l·c',
  'pH = pKa + log([A⁻]/[HA])',
  'PV = nRT',
  'ΔG° = −RT ln K',
  'F = −∇V(r)',
  'V(r) = 4ε[(σ/r)¹² − (σ/r)⁶]',
  '⟨R²⟩ ~ N^2ν',
  'Rg² = (1/N) Σ (rᵢ − r̄)²',
  'D = kT / 6πηRh',
  'exp(−ΔE / kT)',
  'T = 300 K',
  'Δt = 2 fs',
  'GAFF2 · AM1-BCC',
  'PAMAM G4',
  'C₆H₆',
  'H₂N–CH₂–CH₂–NH₂',
  'NaCl + AgNO₃ → AgCl↓ + NaNO₃',
  'antechamber → parmchk2 → tleap',
  'NVT → NPT → production',
  'HPLC · GC · TOC',
];

type Mol = {
  t: Template;
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  va: number;
  scale: number;
  alpha: number;
  red: boolean;
  depth: number;
};

type Token = {
  text: string;
  x: number;
  y: number;
  vy: number;
  alpha: number;
  size: number;
  depth: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let mols: Mol[] = [];
    let tokens: Token[] = [];
    let raf = 0;
    let last = performance.now();
    const pointer = { x: -9999, y: -9999 };
    const margin = 140;

    const populate = () => {
      const area = width * height;
      const molCount = Math.max(5, Math.min(15, Math.round(area / 110000)));
      const tokenCount = Math.max(5, Math.min(16, Math.round(area / 120000)));
      mols = Array.from({ length: molCount }, (_, i) => {
        const depth = rand(0.35, 1);
        return {
          t: TEMPLATES[i % TEMPLATES.length],
          x: rand(0, width),
          y: rand(0, height),
          vx: rand(-7, 7),
          vy: rand(-6, 6),
          a: rand(0, TAU),
          va: rand(-0.09, 0.09),
          scale: rand(15, 30) * depth,
          alpha: rand(0.15, 0.28) * (0.5 + depth * 0.5),
          red: i % 3 === 1,
          depth,
        };
      });
      tokens = Array.from({ length: tokenCount }, (_, i) => {
        const depth = rand(0.4, 1);
        return {
          text: TOKENS[i % TOKENS.length],
          x: rand(10, Math.max(20, width - 180)),
          y: rand(0, height),
          vy: rand(-11, -4),
          alpha: rand(0.13, 0.24),
          size: Math.round(rand(10, 12.5)),
          depth,
        };
      });
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Phone browsers resize constantly as the address bar hides; ignore that.
      if (w === width && Math.abs(h - height) < 140) return;
      width = w;
      height = h;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populate();
      if (reduced) draw(0);
    };

    const drawMol = (m: Mol, sy: number) => {
      const span = height + margin * 2;
      const y = mod(m.y - sy * m.depth * 0.18 + margin, span) - margin;
      const x = mod(m.x + margin, width + margin * 2) - margin;
      const near = Math.max(0, 1 - Math.hypot(pointer.x - x, pointer.y - y) / 260);
      const alpha = Math.min(0.6, m.alpha + near * 0.3);
      const color = m.red ? `rgba(255, 64, 80, ${alpha})` : `rgba(235, 240, 245, ${alpha})`;
      const cos = Math.cos(m.a);
      const sin = Math.sin(m.a);
      const pts = m.t.atoms.map((p) => ({
        x: x + (p.x * cos - p.y * sin) * m.scale,
        y: y + (p.x * sin + p.y * cos) * m.scale,
      }));

      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const [i, j, order] of m.t.bonds) {
        const p = pts[i];
        const q = pts[j];
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        if (order === 2) {
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const len = Math.hypot(dx, dy) || 1;
          const ox = (-dy / len) * 3.2;
          const oy = (dx / len) * 3.2;
          ctx.moveTo(p.x + ox + dx * 0.14, p.y + oy + dy * 0.14);
          ctx.lineTo(q.x + ox - dx * 0.14, q.y + oy - dy * 0.14);
        }
      }
      ctx.stroke();

      const fontSize = Math.max(9, Math.round(m.scale * 0.5));
      ctx.font = `500 ${fontSize}px "JetBrains Mono Variable", ui-monospace, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      m.t.atoms.forEach((atom, i) => {
        const p = pts[i];
        if (atom.label) {
          ctx.fillStyle = '#060606';
          ctx.beginPath();
          ctx.arc(p.x, p.y, fontSize * 0.72, 0, TAU);
          ctx.fill();
          ctx.fillStyle = color;
          ctx.fillText(atom.label, p.x, p.y + 0.5);
        } else if (atom.dot) {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.7, 0, TAU);
          ctx.fill();
        }
      });
    };

    const draw = (dt: number) => {
      const sy = window.scrollY;
      ctx.clearRect(0, 0, width, height);

      for (const m of mols) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.a += m.va * dt;
        drawMol(m, sy);
      }

      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const span = height + 80;
      for (const t of tokens) {
        t.y += t.vy * dt;
        const y = mod(t.y - sy * t.depth * 0.1 + 40, span) - 40;
        ctx.font = `400 ${t.size}px "JetBrains Mono Variable", ui-monospace, monospace`;
        ctx.fillStyle = `rgba(190, 200, 210, ${t.alpha})`;
        ctx.fillText(t.text, t.x, y);
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onScroll = () => {
      if (reduced) draw(0);
    };

    resize();
    start();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', start);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', start);
    };
  }, []);

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop-glow" />
      <div className="backdrop-grid" />
      <canvas ref={ref} />
    </div>
  );
}
