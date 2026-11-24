/**
 * Blog Cover Fallback
 * Shown in place of a cover image for posts that don't have one
 */

import Image from 'next/image';

export default function BlogCoverFallback({ category }: { category: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#419372] to-[#0b2540]">
      <div className="relative w-16 h-16 rounded-2xl bg-white p-2.5 shadow-md">
        <Image src="/logos/avni-logo.webp" alt="" fill className="object-contain p-2.5" sizes="64px" />
      </div>
      <span className="font-anek font-medium text-sm uppercase tracking-wider text-white/80">{category}</span>
    </div>
  );
}
