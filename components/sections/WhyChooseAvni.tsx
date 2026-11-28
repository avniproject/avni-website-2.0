/**
 * Why Choose Avni
 * A bento grid: two large cards with real visuals (the form designer, a field visit) and two compact
 * cards stacked beside them that carry a single number (licence fee, partner renewals). Each links to its proof.
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPinned } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import FadeIn from '@/components/ui/FadeIn';

function BuilderVisual() {
  // The real Avni web app form designer
  return (
    <div className="h-full px-6 pt-6">
      <div className="h-full flex flex-col rounded-t-xl bg-white shadow-md overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F2F4F7] border-b border-[#EAECF0]">
          <span className="w-2 h-2 rounded-full bg-[#F97066]" /><span className="w-2 h-2 rounded-full bg-[#FDB022]" /><span className="w-2 h-2 rounded-full bg-[#32D583]" />
          <span className="ml-2 font-noto text-[11px] text-[#98A2B3]">app.avniproject.org · App Designer</span>
        </div>
        <div className="relative flex-1">
          <Image src="/img/home/form-designer.webp" alt="The Avni form designer in the web app, editing a question with its answers" fill sizes="(max-width: 768px) 90vw, 420px" className="object-cover object-left-top" />
        </div>
      </div>
    </div>
  );
}

function FieldVisual() {
  return (
    <div className="relative h-full overflow-hidden">
      <Image src="/img/2023-10-04-my-reflections-from-first-Avni-field-visit-after-joining-as-ba/arogya_saheli_using_avni.webp" alt="" fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" />
      <span className="absolute left-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 font-noto text-xs font-medium text-[#0b2540] shadow">
        <MapPinned size={14} className="text-[#A16207]" /> The Avni team on a field visit, Dharampur
      </span>
    </div>
  );
}

const featured = [
  {
    visual: BuilderVisual,
    cardBg: 'bg-[#FFF6F0]',
    visualBg: 'bg-[#FFE8D9]',
    title: 'No coding needed',
    text: 'Your team builds forms, visits and rules in a browser. We train you to do it yourself.',
    proof: 'How Launchpad trains NGO teams',
    href: '/blog/2026-04-01-avni-launchpad-experience/',
  },
  {
    visual: FieldVisual,
    cardBg: 'bg-[#FFFAEB]',
    visualBg: 'bg-[#FFF1C7]',
    title: 'A team that knows the field',
    text: 'An India-based team in your time zone, who visit programmes on the ground.',
    proof: 'Read our field visits',
    href: '/blog/',
  },
];

const compact = [
  {
    stat: '₹0',
    statLabel: 'licence fee',
    card: 'bg-[#FFE8D9]',
    statColor: 'text-[#B8481F]',
    blob: '#FDCDB0',
    title: 'Priced for non-profits',
    text: 'Open source. Pay only for help and hosting, if you need them.',
    proof: 'See plans, from free',
    href: '/pricing',
  },
  {
    stat: '26 of 27',
    statLabel: 'partners renewed in 2025',
    card: 'bg-[#E6E6FA]',
    statColor: 'text-[#4B49B0]',
    blob: '#CFCFF3',
    title: 'Partners who stay',
    text: 'Changing systems mid-programme is costly. Our partners stay for years.',
    proof: 'Read the 2025 review',
    href: '/blog/2025-12-22-avni-in-2025/',
  },
];

function ProofLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 font-noto text-sm font-medium text-[#2a7559] hover:text-[#1f5a43]">
      {children} <ArrowRight size={14} />
    </Link>
  );
}

export default function WhyChooseAvni() {
  return (
    <Section spacing="none" className="py-14 md:py-16">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="font-anek font-semibold tracking-wide text-xs md:text-sm leading-tight text-[#B8481F] uppercase mb-3">
              SUSTAINABLE TECHNOLOGY FOR NGOS
            </p>
            <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
              Why Choose Avni?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Two large cards: text first, then the visual (as on wati.io) */}
            {featured.map(({ visual: Visual, cardBg, visualBg, title, text, proof, href }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className={`h-full flex flex-col rounded-3xl overflow-hidden ${cardBg} transition-all duration-300 hover:shadow-lg`}>
                  <div className="p-7 pb-6">
                    <h3 className="font-anek font-bold text-2xl md:text-[26px] leading-snug text-[#0b2540] mb-2">{title}</h3>
                    <p className="font-noto text-base leading-relaxed text-[#475467] mb-4">{text}</p>
                    <ProofLink href={href}>{proof}</ProofLink>
                  </div>
                  <div className={`flex-1 min-h-60 md:min-h-64 mx-4 mb-4 rounded-2xl overflow-hidden ${visualBg}`}>
                    <Visual />
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* Two compact cards, stacked */}
            <div className="md:col-span-2 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
              {compact.map(({ stat, statLabel, card, statColor, blob, title, text, proof, href }, i) => (
                <FadeIn key={title} delay={200 + i * 100}>
                  <div className={`relative overflow-hidden h-full flex flex-col rounded-3xl p-7 transition-all duration-300 hover:shadow-lg ${card}`}>
                    <p className="relative mb-4">
                      <span className={`block font-anek font-bold text-6xl leading-none ${statColor}`}>{stat}</span>
                      <span className={`block font-noto text-sm font-semibold mt-1 ${statColor}`}>{statLabel}</span>
                    </p>
                    <h3 className="relative font-anek font-bold text-xl leading-snug text-[#0b2540] mb-1">{title}</h3>
                    <p className="relative font-noto text-sm leading-relaxed text-[#344054] mb-4">{text}</p>
                    <div className="relative mt-auto"><ProofLink href={href}>{proof}</ProofLink></div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
