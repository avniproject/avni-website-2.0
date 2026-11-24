/**
 * Blog Cover Fallback
 * Shown in place of a cover image: a release-notes card for release posts,
 * a branded card with the category for other posts without a cover
 */

import Image from 'next/image';

interface BlogCoverFallbackProps {
  category: string;
  title: string;
  date: string;
}

export const isReleasePost = (title: string) => /releas/i.test(title);

function AvniTile({ size }: { size: string }) {
  return (
    <div className={`relative ${size} rounded-xl bg-white shadow-md`}>
      <Image src="/logos/avni-logo.webp" alt="" fill className="object-contain p-1.5" sizes="64px" />
    </div>
  );
}

export default function BlogCoverFallback({ category, title, date }: BlogCoverFallbackProps) {
  if (isReleasePost(title)) {
    const monthYear = new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#419372] to-[#0b2540]">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -right-8 w-44 h-44 rounded-full bg-[#FFD166]/10" />
        <div className="absolute top-6 left-6">
          <AvniTile size="w-11 h-11" />
        </div>
        <div className="absolute left-6 bottom-6">
          <p className="font-anek font-semibold text-xs tracking-[0.2em] text-[#FFD166]">AVNI RELEASE NOTES</p>
          <p className="font-anek font-semibold text-3xl leading-tight text-white">{monthYear}</p>
          <div className="mt-2 w-12 h-1 rounded-full bg-[#FFD166]" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#419372] to-[#0b2540]">
      <AvniTile size="w-16 h-16" />
      <span className="font-anek font-medium text-sm uppercase tracking-wider text-white/80">{category}</span>
    </div>
  );
}
