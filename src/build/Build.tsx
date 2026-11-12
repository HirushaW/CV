import {
  createElement,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { buildStore, fontsReady, isEnabled, runGroup, skipAll, toggleAuto } from './engine';

export function useBuild() {
  return useSyncExternalStore(buildStore.subscribe, buildStore.get);
}

type GroupProps = HTMLAttributes<HTMLElement> & {
  as?: string;
  intro?: boolean;
  children: ReactNode;
};

/** A region of the page whose `data-b` elements are assembled when it scrolls in. */
export function BuildGroup({ as = 'div', intro, className, children, ...rest }: GroupProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isEnabled()) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting || e.boundingClientRect.top < 0)) {
          io.disconnect();
          void fontsReady.then(() => {
            if (!cancelled) void runGroup(el, { intro });
          });
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [intro]);

  return createElement(
    as,
    { ref, className: `b-group${className ? ` ${className}` : ''}`, ...rest },
    children,
  );
}

/** Text that appears word by word once its `data-b` parent has been revealed. */
export function Typed({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span className="typed">
      {words.map((word, i) => (
        <span key={i} className="w" style={{ ['--i' as string]: i }}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

type CountProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

function format(n: number, decimals: number) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** A number that counts up when its `data-b` parent is revealed. */
export function CountUp({ value, decimals = 0, prefix = '', suffix = '' }: CountProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const host = ref.current?.closest<HTMLElement>('[data-b]');
    if (!host || !isEnabled() || host.classList.contains('b-in')) return;

    setShown(0);
    let raf = 0;
    const onIn = (event: Event) => {
      if ((event as CustomEvent<{ instant?: boolean }>).detail?.instant) {
        setShown(value);
        return;
      }
      const start = performance.now();
      const dur = 1000;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(value * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    host.addEventListener('b:in', onIn, { once: true });
    return () => {
      host.removeEventListener('b:in', onIn);
      cancelAnimationFrame(raf);
      setShown(value);
    };
  }, [value]);

  return (
    <span ref={ref} className="count">
      {prefix}
      {format(shown, decimals)}
      {suffix}
    </span>
  );
}

/** The floating progress pill at the bottom of the screen. */
export function StatusPill() {
  const { total, done, agents, enabled, skipped, auto } = useBuild();
  const [gone, setGone] = useState(false);
  const complete = total > 0 && done >= total;
  // Stay on screen while the page is still gliding down by itself.
  const finished = (complete || skipped) && auto !== 'running';

  useEffect(() => {
    if (!finished) {
      setGone(false);
      return;
    }
    const id = window.setTimeout(() => setGone(true), skipped ? 0 : 2600);
    return () => window.clearTimeout(id);
  }, [finished, skipped]);

  if ((!enabled && !complete && auto !== 'running') || gone || total === 0) return null;

  const pct = Math.round((done / total) * 100);
  const scrolling = auto === 'running';
  const canTour = auto !== 'finished' && !(complete && auto === 'idle');

  return (
    <div className={`pill${complete ? ' pill-done' : ''}`} role="status" aria-live="off">
      {canTour && (
        <button
          type="button"
          className={`pill-auto${scrolling ? ' on' : ''}`}
          onClick={toggleAuto}
          aria-pressed={scrolling}
          aria-label={scrolling ? 'Pause automatic scrolling' : 'Start automatic scrolling'}
          title={scrolling ? 'Pause automatic scrolling' : 'Scroll the page automatically'}
        >
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
            {scrolling ? (
              <path d="M2 1.5h3v9H2zM7 1.5h3v9H7z" fill="currentColor" />
            ) : (
              <path d="M2.5 1.2 10.5 6l-8 4.8z" fill="currentColor" />
            )}
          </svg>
          <span>Auto</span>
        </button>
      )}
      <span className="pill-dots" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="pill-text">
        <span className="pill-word">
          {complete ? 'Assembly complete' : agents > 0 ? 'Assembling' : 'Scroll to continue'}
          <span className="pill-sep">·</span>
        </span>
        <b>{done}</b> / {total}
        <span className="pill-sep">·</span>
        yield <b>{pct}%</b>
      </span>
      <span className="pill-bar" aria-hidden="true">
        <i style={{ width: `${pct}%` }} />
      </span>
      {!complete && !skipped && (
        <button type="button" className="pill-skip" onClick={skipAll}>
          Skip
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
            <path d="M1 1.5 6.5 6 1 10.5zM7 1.5 12 6l-5 4.5z" fill="currentColor" />
          </svg>
        </button>
      )}
    </div>
  );
}
