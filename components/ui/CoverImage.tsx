/**
 * Cover Image
 * Fills a fixed card frame. Wide images are cropped to fit; tall or square ones
 * (phone screenshots, portrait photos) are shown whole over a blurred copy of
 * themselves, so nothing important gets cut off.
 */

import Image from 'next/image';

interface CoverImageProps {
  src: string;
  alt: string;
  aspect?: number; // width / height
  sizes: string;
  priority?: boolean;
  className?: string;
}

const MIN_CROPPABLE_ASPECT = 1.2;

export default function CoverImage({ src, alt, aspect, sizes, priority, className = '' }: CoverImageProps) {
  if (!aspect || aspect >= MIN_CROPPABLE_ASPECT) {
    return <Image src={src} alt={alt} fill className={`object-cover ${className}`} sizes={sizes} priority={priority} />;
  }

  return (
    <>
      <Image src={src} alt="" aria-hidden fill className="object-cover scale-110 blur-xl opacity-60" sizes={sizes} priority={priority} />
      <Image src={src} alt={alt} fill className={`object-contain ${className}`} sizes={sizes} priority={priority} />
    </>
  );
}
