import { useEffect, useRef } from 'react';

// A schematic dendrimer drawn in 3D on a canvas. It is an illustration of how a
// dendrimer branches generation by generation, not a structure produced by UDB.
// Child directions follow the same cone construction UDB uses:
//   d = cos(θ)·axis + sin(θ)·(cos(φ)·p1 + sin(φ)·p2)

type Vec = [number, number, number];
type Node = { p: Vec; parent: number; gen: number; terminal: boolean };

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

const norm = (v: Vec): Vec => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
};
const cross = (a: Vec, b: Vec): Vec => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

function buildTree(maxGen: number): Node[] {
  const nodes: Node[] = [{ p: [0, 0, 0], parent: -1, gen: 0, terminal: false }];
  const lengths = [0, 1, 0.86, 0.74, 0.64, 0.56];
  const cones = [0, 0, 0.92, 0.78, 0.66, 0.56];
  let frontier: { id: number; dir: Vec }[] = [];

  const core: Vec[] = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ];
  core.forEach((d) => {
    const dir = norm(d);
    nodes.push({ p: [dir[0], dir[1], dir[2]], parent: 0, gen: 1, terminal: maxGen === 1 });
    frontier.push({ id: nodes.length - 1, dir });
  });

  for (let g = 2; g <= maxGen; g++) {
    const nextFrontier: typeof frontier = [];
    frontier.forEach(({ id, dir }, k) => {
      const helper: Vec = Math.abs(dir[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
      const p1 = norm(cross(dir, helper));
      const p2 = cross(dir, p1);
      const theta = cones[g];
      const phi0 = k * GOLDEN + g;
      for (let b = 0; b < 2; b++) {
        const phi = phi0 + b * Math.PI;
        const d = norm([
          Math.cos(theta) * dir[0] + Math.sin(theta) * (Math.cos(phi) * p1[0] + Math.sin(phi) * p2[0]),
          Math.cos(theta) * dir[1] + Math.sin(theta) * (Math.cos(phi) * p1[1] + Math.sin(phi) * p2[1]),
          Math.cos(theta) * dir[2] + Math.sin(theta) * (Math.cos(phi) * p1[2] + Math.sin(phi) * p2[2]),
        ]);
        const parent = nodes[id].p;
        // Lean each branch a little away from the core so shells stay open.
        const out = norm([parent[0] + d[0] * 2, parent[1] + d[1] * 2, parent[2] + d[2] * 2]);
        const grow = norm([d[0] * 0.7 + out[0] * 0.3, d[1] * 0.7 + out[1] * 0.3, d[2] * 0.7 + out[2] * 0.3]);
        const len = lengths[g];
        nodes.push({
          p: [parent[0] + grow[0] * len, parent[1] + grow[1] * len, parent[2] + grow[2] * len],
          parent: id,
          gen: g,
          terminal: g === maxGen,
        });
        nextFrontier.push({ id: nodes.length - 1, dir: grow });
      }
    });
    frontier = nextFrontier;
  }
  return nodes;
}

const MAX_GEN = 5;
const TREE = buildTree(MAX_GEN);
const RADIUS = TREE.reduce((r, n) => Math.max(r, Math.hypot(n.p[0], n.p[1], n.p[2])), 0);

type Props = {
  generation: number;
  className?: string;
  label?: string;
};

export default function Dendrimer({ generation, className, label }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const target = useRef(generation);
  target.current = generation;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let yaw = 0.6;
    let pitch = 0.42;
    let shown = reduced ? target.current : 0;
    let fit = 1;
    let dragging = false;
    let px = 0;
    let py = 0;
    let spin = 0.32;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const top = Math.ceil(shown);
      const frac = shown - Math.floor(shown) || 1;

      // The outermost radius currently on screen, so the molecule fills the frame.
      let extent = 0.6;
      for (const n of TREE) {
        if (n.gen <= Math.floor(shown)) extent = Math.max(extent, Math.hypot(n.p[0], n.p[1], n.p[2]));
      }
      fit += (extent - fit) * 0.08;
      const scale = (Math.min(width, height) * 0.34) / Math.max(fit, 0.6);
      const focal = RADIUS * 3.4;

      const projected = TREE.map((n) => {
        let [x, y, z] = n.p;
        if (n.gen === top && frac < 1 && n.parent >= 0) {
          const q = TREE[n.parent].p;
          x = q[0] + (x - q[0]) * frac;
          y = q[1] + (y - q[1]) * frac;
          z = q[2] + (z - q[2]) * frac;
        }
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y1 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        const k = focal / (focal - z2);
        return { x: width / 2 + x1 * scale * k, y: height / 2 + y1 * scale * k, z: z2, k };
      });

      const order = TREE.map((_, i) => i)
        .filter((i) => TREE[i].gen <= top)
        .sort((a, b) => projected[a].z - projected[b].z);

      for (const i of order) {
        const n = TREE[i];
        const p = projected[i];
        const depth = Math.max(0, Math.min(1, (p.z + RADIUS) / (2 * RADIUS)));
        const alpha = 0.22 + depth * 0.72;
        if (n.parent >= 0) {
          const q = projected[n.parent];
          ctx.strokeStyle = `rgba(225, 230, 236, ${alpha * 0.55})`;
          ctx.lineWidth = 1 + depth * 0.8;
          ctx.beginPath();
          ctx.moveTo(q.x, q.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        const outer = n.gen === Math.max(1, Math.round(shown));
        const r = (n.gen === 0 ? 5.5 : outer ? 3.4 : 2.5) * p.k * (0.75 + depth * 0.45);
        if (outer || n.gen === 0) {
          ctx.shadowColor = 'rgba(255, 45, 61, 0.9)';
          ctx.shadowBlur = 10 * depth;
          ctx.fillStyle = `rgba(255, 58, 74, ${0.35 + depth * 0.65})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(240, 242, 245, ${alpha})`;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging) yaw += spin * dt;
      const goal = target.current;
      if (shown < goal) shown = Math.min(goal, shown + dt * 2.4);
      else if (shown > goal) shown = Math.max(goal, shown - dt * 3.2);
      draw();
      if (visible) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) {
        shown = target.current;
        fit = RADIUS;
        draw();
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });

    const down = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - px;
      yaw += dx * 0.01;
      pitch = Math.max(-1.2, Math.min(1.2, pitch + (e.clientY - py) * 0.01));
      spin = dx >= 0 ? 0.32 : -0.32;
      px = e.clientX;
      py = e.clientY;
      if (reduced) draw();
    };
    const up = () => {
      dragging = false;
    };

    resize();
    io.observe(canvas);
    ro.observe(canvas);
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      role="img"
      aria-label={label ?? `Schematic of a generation ${generation} dendrimer, rotating`}
    />
  );
}
