import type { PhotoSet } from '../content';
import { openLightbox } from './Lightbox';

type Props = {
  set?: PhotoSet;
  /** Skip this many items at the start (they are shown elsewhere on the card). */
  from?: number;
  className?: string;
};

/**
 * A strip of photographs or figures. Clicking one opens it in the viewer with
 * its title and details. Renders nothing when there is nothing to show.
 */
export default function Photos({ set, from = 0, className }: Props) {
  if (!set || set.items.length <= from) return null;
  return (
    <ul className={`photos${className ? ` ${className}` : ''}`}>
      {set.items.slice(from).map((photo, i) => (
        <li key={photo.src} data-b>
          <button
            type="button"
            onClick={() => openLightbox(set, from + i)}
            aria-label={`${photo.title}: open with details`}
          >
            <img src={photo.thumb} alt={photo.alt} loading="lazy" />
            <span className="photos-title">{photo.title}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
