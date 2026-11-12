import type { Photo } from '../content';

/**
 * A strip of photographs for one part of the site. Renders nothing when the
 * list is empty, so sections without photos are unaffected.
 */
export default function Photos({ items }: { items?: Photo[] }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className={`photos${items.length === 1 ? ' single' : ''}`}>
      {items.map((photo) => (
        <li key={photo.src} data-b>
          <figure>
            <a
              href={photo.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open the full-size photo: ${photo.caption ?? photo.alt}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
            </a>
            {photo.caption && <figcaption>{photo.caption}</figcaption>}
          </figure>
        </li>
      ))}
    </ul>
  );
}
