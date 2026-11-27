/**
 * Why Choose Avni
 * Four reasons in a 2 x 2 grid, each with a large illustration, one line and a real proof point linking to its
 * source (pricing, the 2025 review, Launchpad, field visits).
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPinned } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import FadeIn from '@/components/ui/FadeIn';


// Illustrations for each card (built in code, no image files), sized for a large panel
function PriceVisual() {
  return (
    <div className="flex items-center justify-center gap-8 h-full px-6">
      <div className="rounded-2xl bg-white px-8 py-6 shadow-md text-center">
        <p className="font-noto text-xs uppercase tracking-wider text-[#667085]">Licence fee</p>
        <p className="font-anek font-bold text-6xl text-[#2a7559] leading-none mt-2">₹0</p>
      </div>
      <ul className="space-y-3">
        {['Open source', 'Free plan to start', 'Pay only for help and hosting'].map(t => (
          <li key={t} className="flex items-center gap-2.5 font-noto text-sm font-medium text-[#344054]">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#419372] text-white text-xs flex items-center justify-center">✓</span>{t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BuilderVisual() {
  return (
    <div className="flex items-center justify-center h-full px-6">
      <div className="w-full max-w-[340px] rounded-2xl bg-white shadow-md overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#F2F4F7] border-b border-[#EAECF0]">
          <span className="w-2 h-2 rounded-full bg-[#F97066]" /><span className="w-2 h-2 rounded-full bg-[#FDB022]" /><span className="w-2 h-2 rounded-full bg-[#32D583]" />
          <span className="ml-2 font-noto text-[11px] font-semibold text-[#667085]">Form designer · Home visit</span>
        </div>
        <div className="p-4 space-y-2">
          {[['Name', 'Text'], ['Age', 'Number'], ['Pregnant?', 'Yes / No']].map(([q, t], i) => (
            <div key={q} className={`flex justify-between items-center rounded-lg px-3 py-2 ${i === 2 ? 'bg-[#FFF1EA] ring-1 ring-[#F27A45]' : 'bg-[#F9FAFB]'}`}>
              <span className="font-noto text-sm text-[#0b2540]">{q}</span>
              <span className="font-noto text-xs text-[#98A2B3]">{t}</span>
            </div>
          ))}
          <div className="rounded-lg border border-dashed border-[#D0D5DD] py-2 text-center font-noto text-xs text-[#98A2B3]">+ Add question</div>
        </div>
      </div>
    </div>
  );
}

function RetentionVisual() {
  const r = 52, c = 2 * Math.PI * r, share = 26 / 27;
  return (
    <div className="flex items-center justify-center gap-8 h-full px-6">
      <svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#D9DAF4" strokeWidth="16" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="#6D6BD0" strokeWidth="16" strokeLinecap="round"
          strokeDasharray={`${c * share} ${c}`} transform="rotate(-90 70 70)" />
        <text x="70" y="78" textAnchor="middle" fontSize="26" fontWeight="700" fill="#0b2540">96%</text>
      </svg>
      <div>
        <p className="font-anek font-bold text-5xl text-[#0b2540] leading-none">26 / 27</p>
        <p className="font-noto text-sm text-[#475467] mt-2">partners continued<br />with Avni in 2025</p>
      </div>
    </div>
  );
}

function FieldVisual() {
  return (
    <div className="relative h-full overflow-hidden">
      <Image src="/img/2023-10-04-my-reflections-from-first-Avni-field-visit-after-joining-as-ba/arogya_saheli_using_avni.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
      <span className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 font-noto text-xs font-medium text-[#0b2540] shadow">
        <MapPinned size={14} className="text-[#A16207]" /> The Avni team on a field visit, Dharampur
      </span>
    </div>
  );
}

const reasons = [
  {
    visual: PriceVisual,
    visualBg: 'bg-[#E8F3EE]',
    title: 'Priced for non-profits',
    text: 'Avni is open source, so there is no licence fee. You pay only for help and hosting, if you need them.',
    proof: 'See plans, from free',
    href: '/pricing',
  },
  {
    visual: BuilderVisual,
    visualBg: 'bg-[#FFF1EA]',
    title: 'No coding needed',
    text: 'Your team builds forms, visits and rules in a browser. We train you to do it yourself.',
    proof: 'How Launchpad trains NGO teams',
    href: '/blog/2026-04-01-avni-launchpad-experience/',
  },
  {
    visual: RetentionVisual,
    visualBg: 'bg-[#E9EAF8]',
    title: 'Partners who stay',
    text: 'NGOs keep using Avni year after year, as their programmes grow.',
    proof: '26 of 27 partners continued in 2025',
    href: '/blog/2025-12-22-avni-in-2025/',
  },
  {
    visual: FieldVisual,
    visualBg: 'bg-[#FFF8DB]',
    title: 'A team that knows the field',
    text: 'An India-based team in your time zone, who visit programmes on the ground.',
    proof: 'Read our field visits',
    href: '/blog/',
  },
];

export default function WhyChooseAvni() {
  return (
    <Section spacing="none" bg="gray" className="py-14 md:py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="font-anek font-medium text-xs md:text-sm leading-tight text-[#fba47e] uppercase mb-3">
              SUSTAINABLE TECHNOLOGY FOR NGOS
            </p>
            <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
              Why Choose Avni?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map(({ visual: Visual, visualBg, title, text, proof, href }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg">
                  {/* Text first, then the visual filling the rest of the card (as on wati.io) */}
                  <div className="p-7 md:p-8 pb-6">
                    <h3 className="font-anek font-bold text-2xl md:text-[28px] leading-snug text-[#0b2540] mb-2">{title}</h3>
                    <p className="font-noto text-base leading-relaxed text-[#475467] mb-4">{text}</p>
                    <Link href={href} className="inline-flex items-center gap-1.5 font-noto text-sm font-medium text-[#2a7559] hover:text-[#1f5a43]">
                      {proof} <ArrowRight size={14} />
                    </Link>
                  </div>
                  <div className={`mt-auto mx-4 mb-4 rounded-2xl h-56 md:h-64 overflow-hidden ${visualBg}`}>
                    <Visual />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
