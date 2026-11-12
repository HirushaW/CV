// The "self-building page" engine.
//
// Any element marked with a `data-b` attribute starts invisible. When its group
// scrolls into view, a few small cursors ("agents") fly to it, drag out a
// wireframe box, fill it with a placeholder and then reveal the real element.
// Purely visual: with reduced motion, or after "skip", everything just shows.

const root = document.documentElement;

type Listener = () => void;

const state = {
  total: 0,
  done: 0,
  agents: 0,
  skipped: false,
};

const listeners = new Set<Listener>();
const waiters = new Set<() => void>();
let snapshot = { ...state, enabled: root.classList.contains('build-on') };

function emit() {
  snapshot = { ...state, enabled: isEnabled() };
  listeners.forEach((fn) => fn());
}

export function isEnabled() {
  return root.classList.contains('build-on') && !state.skipped;
}

export const buildStore = {
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  get() {
    return snapshot;
  },
};

/** Count every buildable element once the page has rendered. */
export function scan() {
  state.total = document.querySelectorAll('[data-b]').length;
  state.done = document.querySelectorAll('[data-b].b-in').length;
  emit();
}

export function markIn(el: HTMLElement, instant = false) {
  if (el.classList.contains('b-in')) return;
  if (instant) el.classList.add('b-instant');
  el.classList.add('b-in');
  state.done = Math.min(state.total, state.done + 1);
  el.dispatchEvent(new CustomEvent('b:in', { detail: { instant } }));
  emit();
}

/** Reveal everything inside a container immediately (used by filters). */
export function revealWithin(container: HTMLElement) {
  container.querySelectorAll<HTMLElement>('[data-b]').forEach((el) => markIn(el, true));
}

export function skipAll() {
  if (state.skipped) return;
  state.skipped = true;
  document.querySelectorAll<HTMLElement>('[data-b]').forEach((el) => markIn(el, true));
  waiters.forEach((resolve) => resolve());
  waiters.clear();
  document.querySelectorAll('.b-overlay').forEach((o) => o.remove());
  root.classList.remove('build-on');
  state.agents = 0;
  emit();
}

const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

/** Resolves once fonts are ready, so boxes are measured at their final size. */
export const fontsReady: Promise<void> = Promise.race([
  (document.fonts?.ready ?? Promise.resolve()).then(() => undefined),
  sleep(1500),
]);

const AGENT_COLORS = ['#7df3ff', '#ffffff', '#ffd166', '#7df3ff', '#ffffff', '#ff9aa2', '#b8ffcf', '#ffffff'];

const CURSOR_SVG =
  '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M2 1.2 13.6 7.4 8.3 8.9 6.2 14z" fill="currentColor" stroke="#050505" stroke-width="1" stroke-linejoin="round"/></svg>';

class Agent {
  el: HTMLDivElement;
  x = 0;
  y = 0;

  constructor(overlay: HTMLElement, index: number, x: number, y: number) {
    this.el = document.createElement('div');
    this.el.className = 'b-agent';
    this.el.style.color = AGENT_COLORS[index % AGENT_COLORS.length];
    this.el.innerHTML = CURSOR_SVG;
    this.x = x;
    this.y = y;
    this.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    overlay.appendChild(this.el);
    // Fade in on the next frame.
    requestAnimationFrame(() => this.el.classList.add('on'));
  }

  async to(x: number, y: number, ms?: number) {
    const dist = Math.hypot(x - this.x, y - this.y);
    const dur = ms ?? Math.max(130, Math.min(300, dist * 0.42));
    this.el.style.transitionDuration = `${dur}ms, 300ms`;
    this.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    this.x = x;
    this.y = y;
    await sleep(dur);
  }
}

type GroupOptions = { intro?: boolean };

export async function runGroup(group: HTMLElement, opts: GroupOptions = {}) {
  if (!isEnabled() || group.dataset.bRun) return;
  group.dataset.bRun = '1';

  const targets = Array.from(group.querySelectorAll<HTMLElement>('[data-b]')).filter(
    (el) => !el.classList.contains('b-in'),
  );
  if (!targets.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'b-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  group.appendChild(overlay);

  const mobile = window.innerWidth < 720;
  const count = Math.max(2, Math.min(mobile ? 4 : 8, Math.ceil(targets.length / 3)));

  // One observer tells waiting agents when their target is close to the viewport.
  const pending = new Map<Element, () => void>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          const resolve = pending.get(entry.target);
          if (resolve) {
            pending.delete(entry.target);
            io.unobserve(entry.target);
            waiters.delete(resolve);
            resolve();
          }
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px' },
  );
  const waitNear = (el: HTMLElement) =>
    new Promise<void>((resolve) => {
      pending.set(el, resolve);
      waiters.add(resolve);
      io.observe(el);
    });

  const gRect = () => group.getBoundingClientRect();
  const g0 = gRect();
  // Where the visitor is currently looking, in the group's own coordinates.
  const viewTop = Math.max(0, -g0.top);
  const viewH = Math.min(window.innerHeight, g0.height);
  const cx = g0.width / 2;
  const cy = viewTop + viewH / 2;

  const agents: Agent[] = [];
  for (let i = 0; i < count; i++) {
    if (opts.intro) {
      const a = (i / count) * Math.PI * 2;
      agents.push(new Agent(overlay, i, cx + Math.cos(a) * 44, cy + Math.sin(a) * 44));
    } else {
      const side = i % 2 === 0 ? -20 : g0.width + 20;
      agents.push(new Agent(overlay, i, side, viewTop + Math.random() * viewH));
    }
  }
  state.agents += count;
  emit();

  if (opts.intro) {
    // The swarm circles a small core before it gets to work.
    const core = document.createElement('div');
    core.className = 'b-core';
    core.style.left = `${cx}px`;
    core.style.top = `${cy}px`;
    overlay.appendChild(core);
    for (let step = 1; step <= 3 && isEnabled(); step++) {
      agents.forEach((agent, i) => {
        const a = (i / count) * Math.PI * 2 + step * 0.85;
        const r = 44 + (step % 2) * 14;
        void agent.to(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 240);
      });
      await sleep(240);
    }
    core.classList.add('out');
    window.setTimeout(() => core.remove(), 400);
  }

  let next = 0;

  const work = async (agent: Agent) => {
    while (isEnabled()) {
      const el = targets[next++];
      if (!el) break;
      if (el.classList.contains('b-in')) continue;

      await waitNear(el);
      if (!isEnabled()) break;
      if (el.classList.contains('b-in')) continue;

      const r = el.getBoundingClientRect();
      // Already scrolled past, or not laid out: show it without ceremony.
      if (r.bottom < -30 || (r.width === 0 && r.height === 0)) {
        markIn(el, true);
        continue;
      }

      const g = gRect();
      const x = r.left - g.left;
      const y = r.top - g.top;
      const w = r.width;
      const h = r.height;

      await agent.to(x, y);
      if (!isEnabled()) break;

      const box = document.createElement('div');
      box.className = 'b-box';
      box.style.left = `${x}px`;
      box.style.top = `${y}px`;
      box.innerHTML = `<i class="h1"></i><i class="h2"></i><span class="b-dim">${Math.round(w)} × ${Math.round(h)}</span>`;
      overlay.appendChild(box);
      // Read a layout value to commit the 0×0 start before growing.
      void box.offsetWidth;
      box.style.width = `${w}px`;
      box.style.height = `${h}px`;
      await agent.to(x + w, y + h, 210);

      box.classList.add('fill');
      await sleep(95);

      markIn(el);
      box.classList.add('out');
      window.setTimeout(() => box.remove(), 420);
      await sleep(50);
    }
  };

  await Promise.all(agents.map(work));
  io.disconnect();

  state.agents = Math.max(0, state.agents - count);
  emit();

  // Leave a couple of cursors drifting; retire the rest.
  agents.forEach((agent, i) => {
    if (i < 2 && isEnabled()) {
      agent.el.classList.add('idle');
      agent.el.style.setProperty('--d', `${i * -1.7}s`);
    } else {
      agent.el.classList.remove('on');
      window.setTimeout(() => agent.el.remove(), 400);
    }
  });
}
