import { useEffect, useRef, useSyncExternalStore } from 'react';
import type { PhotoSet } from '../content';

// A full-screen viewer: the image on one side, its details on the other.
// Any photo or figure on the site opens here when clicked.

type State = { set: PhotoSet; index: number } | null;

let state: State = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((fn) => fn());

export function openLightbox(set: PhotoSet, index: number) {
  state = { set, index };
  emit();
}

function close() {
  state = null;
  emit();
}

function step(by: number) {
  if (!state) return;
  const n = state.set.items.length;
  state = { set: state.set, index: (state.index + by + n) % n };
  emit();
}

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export default function Lightbox() {
  const current = useSyncExternalStore(subscribe, () => state);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  const open = current !== null;

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowRight') step(1);
      else if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
      if (opener.current instanceof HTMLElement) opener.current.focus();
    };
  }, [open]);

  if (!current) return null;
  const { set, index } = current;
  const item = set.items[index];
  const many = set.items.length > 1;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="lightbox-frame">
        <div className="lightbox-image">
          <img key={item.src} src={item.src} alt={item.alt} />
          {many && (
            <>
              <button type="button" className="lightbox-nav prev" onClick={() => step(-1)} aria-label="Previous image">
                <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true">
                  <path d="M8 1 3 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
              <button type="button" className="lightbox-nav next" onClick={() => step(1)} aria-label="Next image">
                <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true">
                  <path d="m4 1 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </>
          )}
        </div>
        <aside className="lightbox-info">
          <p className="micro">{set.context}</p>
          <h3>{item.title}</h3>
          <p className="lightbox-details">{item.details}</p>
          <div className="lightbox-foot">
            {many && (
              <span className="lightbox-count">
                {String(index + 1).padStart(2, '0')} / {String(set.items.length).padStart(2, '0')}
              </span>
            )}
            <a href={item.src} target="_blank" rel="noreferrer">
              Open full size <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
        <button type="button" className="lightbox-close" onClick={close} ref={closeRef} aria-label="Close">
          <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
            <path d="m1 1 10 10M11 1 1 11" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
