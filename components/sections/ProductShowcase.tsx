/**
 * Product Showcase
 * "What Avni Does" as tabs: each tab is an audience, a benefit line and concept tags, with proof,
 * beside a real Avni screen in a phone or browser frame. Tabs advance on
 * their own every few seconds until someone hovers or picks one.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

export interface ShowcaseItem {
  icon: LucideIcon;
  tone: string; // icon tile colours
  audience: string;
  title: string;
  text: string;
  tags: string[];
  proof: string;
  href: string;
  // frame 'card': a finished card image shown as it is; `extra` adds a second card overlapping it
  media: { src: string; kind: 'video' | 'image'; frame: 'phone' | 'browser' | 'card'; alt: string; caption: string; extra?: { src: string; alt: string } };
}

const ADVANCE_MS = 8000;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[250px] md:w-[270px] rounded-[38px] bg-[#0b2540] p-2.5 shadow-2xl">
      <div className="relative aspect-[400/638] rounded-[30px] overflow-hidden bg-white">{children}</div>
    </div>
  );
}

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-xl bg-white shadow-2xl overflow-hidden border border-[#EAECF0]">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#F2F4F7] border-b border-[#EAECF0]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#F97066]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FDB022]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#32D583]" />
        <span className="ml-3 flex-1 rounded-md bg-white px-3 py-1 font-noto text-[11px] text-[#98A2B3]">app.avniproject.org</span>
      </div>
      <div className="relative bg-white p-4">{children}</div>
    </div>
  );
}

function Media({ media }: { media: ShowcaseItem['media'] }) {
  if (media.frame === 'card') {
    return (
      <div className="relative mx-auto max-w-[300px]">
        <Image key={media.src} src={media.src} alt={media.alt} width={720} height={800} className="w-full h-auto drop-shadow-2xl" />
        {media.extra && (
          <Image src={media.extra.src} alt={media.extra.alt} width={660} height={493} className="absolute -right-6 md:-right-12 -bottom-8 w-[62%] h-auto drop-shadow-2xl" />
        )}
      </div>
    );
  }

  const content = media.kind === 'video'
    ? <video key={media.src} src={media.src} aria-label={media.alt} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
    : media.frame === 'phone'
      ? <Image key={media.src} src={media.src} alt={media.alt} fill sizes="270px" className="object-cover" />
      : <Image key={media.src} src={media.src} alt={media.alt} width={1288} height={444} className="w-full h-auto" />;

  if (media.frame === 'phone') return <PhoneFrame>{content}</PhoneFrame>;
  return (
    <div className="relative">
      <BrowserFrame>{content}</BrowserFrame>
      {media.extra && (
        <Image src={media.extra.src} alt={media.extra.alt} width={660} height={493} className="absolute -right-4 md:-right-10 -top-12 md:-top-16 w-[34%] h-auto drop-shadow-2xl" />
      )}
    </div>
  );
}

export default function ProductShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => setActive(i => (i + 1) % items.length), ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, items.length]);

  const current = items[active];

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-8 lg:gap-14 items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Tabs */}
      <ul className="space-y-3">
        {items.map((item, i) => {
          const isActive = i === active;
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className={`relative rounded-2xl border transition-all overflow-hidden ${
                isActive ? 'bg-white border-[#B7DCCB] shadow-md' : 'border-transparent hover:bg-white/70'
              }`}
            >
              <button
                onClick={() => { setActive(i); setPaused(true); }}
                aria-expanded={isActive}
                className="w-full text-left flex items-center gap-3 p-5 pb-4"
              >
                <span className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${item.tone}`}>
                  <Icon size={20} />
                </span>
                <span>
                  <span className="block font-noto text-xs font-semibold uppercase tracking-wider text-[#fba47e]">{item.audience}</span>
                  <span className={`block font-anek font-bold text-lg md:text-xl leading-snug ${isActive ? 'text-[#0b2540]' : 'text-[#475467]'}`}>
                    {item.title}
                  </span>
                </span>
              </button>
              {isActive && (
                <div className="px-5 pb-5 pl-[72px] space-y-2">
                  <p className="font-noto text-[15px] leading-relaxed text-[#475467]">{item.text}</p>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {item.tags.map(tag => (
                      <li key={tag} className="px-3 py-1 rounded-full bg-[#E8F3EE] font-noto text-xs font-medium text-[#1f5a43]">{tag}</li>
                    ))}
                  </ul>
                  <Link href={item.href} className="inline-flex items-start gap-1.5 pt-1 font-noto text-sm font-medium text-[#2a7559] hover:text-[#1f5a43]">
                    <ArrowRight size={15} className="flex-shrink-0 mt-0.5" /> {item.proof}
                  </Link>
                </div>
              )}
              {/* Progress bar while the tab advances on its own */}
              {isActive && !paused && (
                <span key={active} className="absolute left-0 bottom-0 h-0.5 bg-[#419372] animate-[showcase-progress_8s_linear]" />
              )}
            </li>
          );
        })}
      </ul>

      {/* Screen */}
      <figure className="relative rounded-3xl bg-gradient-to-br from-[#E8F3EE] to-[#F6FBF8] px-6 py-10 md:px-10 md:py-12">
        <Media media={current.media} />
        <figcaption className="text-center font-noto text-xs text-[#667085] mt-5">{current.media.caption}</figcaption>
      </figure>

      <style jsx>{`
        @keyframes showcase-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
