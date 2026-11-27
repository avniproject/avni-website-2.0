/**
 * Why Choose Avni
 * Four reasons, each with a matching icon, one line and a real proof point linking to its
 * source (pricing, the 2025 review, Launchpad, field visits).
 */

import Link from 'next/link';
import { ArrowRight, HandCoins, Handshake, MapPinned, MousePointerClick } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import FadeIn from '@/components/ui/FadeIn';

const reasons = [
  {
    icon: HandCoins,
    tone: 'bg-[#E8F3EE] text-[#2a7559]',
    title: 'Priced for non-profits',
    text: 'Avni is open source, so there is no licence fee. You pay only for help and hosting, if you need them.',
    proof: 'See plans, from free',
    href: '/pricing',
  },
  {
    icon: MousePointerClick,
    tone: 'bg-[#FFF1EA] text-[#C2410C]',
    title: 'No coding needed',
    text: 'Your team builds forms, visits and rules in a browser. We train you to do it yourself.',
    proof: 'How Launchpad trains NGO teams',
    href: '/blog/2026-04-01-avni-launchpad-experience/',
  },
  {
    icon: Handshake,
    tone: 'bg-[#E9EAF8] text-[#4F46A5]',
    title: 'Partners who stay',
    text: 'NGOs keep using Avni year after year, as their programmes grow.',
    proof: '26 of 27 partners continued in 2025',
    href: '/blog/2025-12-22-avni-in-2025/',
  },
  {
    icon: MapPinned,
    tone: 'bg-[#FFF8DB] text-[#A16207]',
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {reasons.map(({ icon: Icon, tone, title, text, proof, href }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="h-full flex flex-col bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className={`flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${tone}`}>
                    <Icon size={24} />
                  </span>
                  <h3 className="font-anek font-bold text-xl text-[#0b2540] mb-2">{title}</h3>
                  <p className="font-noto text-[15px] leading-relaxed text-[#475467] mb-5">{text}</p>
                  <Link href={href} className="mt-auto inline-flex items-center gap-1.5 font-noto text-sm font-medium text-[#2a7559] hover:text-[#1f5a43]">
                    {proof} <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
