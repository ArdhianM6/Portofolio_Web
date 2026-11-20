import { assetUrl } from '../utils/assetUrl.js';

export function handleImageFallback(event) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied) return;

  image.dataset.fallbackApplied = 'true';
  if (image.alt) image.alt = 'Image preview unavailable';
  image.src = assetUrl('/images/image-fallback.svg');
}
