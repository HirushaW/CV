import { useEffect, useRef, useState } from 'react';

// Draws a real molecular structure (heavy atoms and bonds) on a rotating canvas.
// The data files in public/structures/ are made from MOL2 files by scripts/mol2json.py.

export type StructureInfo = {
  atoms: number;
  heavy: number;
  rg: number;
  elements: string[];
};

type Structure = StructureInfo & {
  e: number[];
  p: number[];
  b: number[];
};

const COLORS: Record<string, [number, number, number]> = {
  C: [206, 210, 216],
  N: [96, 165, 255],
  O: [255, 72, 88],
  Si: [240, 200, 120],
  P: [255, 150, 60],
  S: [250, 225, 80],
  Cl: [110, 225, 140],
};

export const ELEMENT_NAMES: Record<string, string> = {
  C: 'Carbon',
  N: 'Nitrogen',
  O: 'Oxygen',
  Si: 'Silicon',
  P: 'Phosphorus',
  S: 'Sulfur',
  Cl: 'Chlorine',
};

export function elementColor(symbol: string) {
  const [r, g, b] = COLORS[symbol] ?? COLORS.C;
  return `rgb(${r}, ${g}, ${b})`;
}

type Props = {
  src: string;
  className?: string;
  label: string;
  onInfo?: (info: StructureInfo | null) => void;
};

export default function Molecule({ src, className, label, onInfo }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const srcRef = useRef(src);
  srcRef.current = src;
  const infoRef = useRef(onInfo);
  infoRef.current = onInfo;
  // The drawing loop lives for the life of the component; `load` swaps the data.
  const loadRef = useRef<(url: string) => void>(() => {});

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let data: Structure | null = null;
    let radius = 1;
    let shownRadius = 1;
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = false;
    let alive = true;
    let last = performance.now();
    let yaw = 0.4;
    let pitch = 0.3;
    let spin = 0.3;
    let dragging = false;
    let px = 0;
    let py = 0;
    let request = 0;

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
      if (!data) return;
      const n = data.e.length;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      // Ease the zoom when a structure of a different size is loaded.
      shownRadius += (radius - shownRadius) * (reduced ? 1 : 0.12);
      const focal = shownRadius * 4;
      const scale = (Math.min(width, height) * 0.36) / shownRadius;

      const sx = new Float32Array(n);
      const sY = new Float32Array(n);
      const sz = new Float32Array(n);
      const sk = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const x = data.p[i * 3];
        const y = data.p[i * 3 + 1];
        const z = data.p[i * 3 + 2];
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y1 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        const k = focal / (focal - z2);
        sx[i] = width / 2 + x1 * scale * k;
        sY[i] = height / 2 + y1 * scale * k;
        sz[i] = z2;
        sk[i] = k;
      }
      const depth = (z: number) =>
        Math.max(0, Math.min(1, (z + shownRadius) / (2 * shownRadius)));
      // Atoms look right at about 0.45 Å; never smaller than a visible dot.
      const atomSize = Math.max(1.5, Math.min(5.5, scale * 0.45));

      ctx.lineCap = 'round';
      for (let i = 0; i < data.b.length; i += 2) {
        const a = data.b[i];
        const b = data.b[i + 1];
        const d = depth((sz[a] + sz[b]) / 2);
        ctx.strokeStyle = `rgba(214, 219, 226, ${0.12 + d * 0.5})`;
        ctx.lineWidth = Math.max(0.6, atomSize * 0.42) * (0.6 + d * 0.6);
        ctx.beginPath();
        ctx.moveTo(sx[a], sY[a]);
        ctx.lineTo(sx[b], sY[b]);
        ctx.stroke();
      }

      const order = Array.from({ length: n }, (_, i) => i).sort((a, b) => sz[a] - sz[b]);
      for (const i of order) {
        const d = depth(sz[i]);
        const symbol = data.elements[data.e[i]];
        const [r, g, b] = COLORS[symbol] ?? COLORS.C;
        const size = atomSize * (symbol === 'C' ? 0.85 : 1.15) * sk[i] * (0.7 + d * 0.5);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.3 + d * 0.7})`;
        ctx.beginPath();
        ctx.arc(sx[i], sY[i], size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!dragging) yaw += spin * dt;
      draw();
      if (visible) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced || !visible) {
        draw();
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    loadRef.current = (url: string) => {
      const mine = ++request;
      setStatus('loading');
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error(String(res.status));
          return res.json() as Promise<Structure>;
        })
        .then((json) => {
          if (!alive || mine !== request) return;
          let r = 1;
          for (let i = 0; i < json.p.length; i += 3) {
            r = Math.max(r, Math.hypot(json.p[i], json.p[i + 1], json.p[i + 2]));
          }
          if (!data) shownRadius = r;
          data = json;
          radius = r;
          setStatus('ready');
          infoRef.current?.({
            atoms: json.atoms,
            heavy: json.heavy,
            rg: json.rg,
            elements: json.elements,
          });
          start();
        })
        .catch(() => {
          if (!alive || mine !== request) return;
          data = null;
          setStatus('error');
          infoRef.current?.(null);
          draw();
        });
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    const ro = new ResizeObserver(() => {
      resize();
      draw();
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
      pitch = Math.max(-1.3, Math.min(1.3, pitch + (e.clientY - py) * 0.01));
      if (dx !== 0) spin = dx > 0 ? 0.3 : -0.3;
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
    loadRef.current(srcRef.current);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    };
  }, []);

  // Load a new structure whenever the file changes (skip the first run: the
  // effect above has already loaded it).
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    loadRef.current(src);
  }, [src]);

  return (
    <>
      <canvas ref={ref} className={className} role="img" aria-label={label} />
      {status !== 'ready' && (
        <p className="viewer-status" role="status">
          {status === 'loading' ? 'Loading structure…' : 'This structure could not be loaded.'}
        </p>
      )}
    </>
  );
}
