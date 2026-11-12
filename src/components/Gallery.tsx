import { useId, useState } from 'react';
import type { PhotoSet } from '../content';
import { openLightbox } from './Lightbox';

type Props = {
  set?: PhotoSet;
  /** What the button calls them: "image" for figures and screenshots, "photo" for photographs. */
  noun?: 'image' | 'photo';
};

/**
 * Images are kept out of the normal view. A button expands the set in place,
 * each image shown whole; selecting one opens it full size with its description.
 * Renders nothing when the set is empty.
 */
export default function Gallery({ set, noun = 'image' }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();
  if (!set || set.items.length === 0) return null;
  const count = set.items.length;
  const what = count === 1 ? noun : `${count} ${noun}s`;

  return (
    <div className="gallery">
      <button
        type="button"
        className={`gallery-toggle${open ? ' on' : ''}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        data-b
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          {open ? (
            <path
              d="M8 6.5 4.6 3.1M8 6.5l3.4-3.4M8 6.5V1M8 9.5l-3.4 3.4M8 9.5l3.4 3.4M8 9.5V15M2 8h12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M8 1 4.6 4.4M8 1l3.4 3.4M8 1v5M8 15l-3.4-3.4M8 15l3.4-3.4M8 15v-5M2 8h12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          )}
        </svg>
        {open ? `Hide ${count === 1 ? noun : `${noun}s`}` : `View ${what}`}
      </button>
      {open && (
        <ul id={id} className={`gallery-grid n${Math.min(count, 4)}`}>
          {set.items.map((photo, i) => (
            <li key={photo.src}>
              <button
                type="button"
                onClick={() => openLightbox(set, i)}
                aria-label={`Open full size: ${photo.alt}`}
              >
                <img src={count <= 2 ? photo.src : photo.thumb} alt={photo.alt} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
