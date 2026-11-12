import { backgrounds } from '../content';

/**
 * A faint image behind a card. The image is set as an inline style so its
 * address is resolved against the page (a `url()` inside the stylesheet would
 * be resolved against the stylesheet's own folder instead).
 */
export default function CardBackground({ name }: { name: string }) {
  const src = backgrounds[name];
  if (!src) return null;
  return <span className="card-bg" style={{ backgroundImage: `url(${src})` }} aria-hidden="true" />;
}
