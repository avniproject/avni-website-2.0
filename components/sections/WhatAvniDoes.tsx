/**
 * What Avni Does
 * Three real problems Avni solves, each with what changes and proof from a partner's story.
 * Usage numbers are in the hero.
 */

import Link from 'next/link';
import { ArrowRight, BarChart3, HeartPulse, Smartphone } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/ui/FadeIn';

// Each card: a real problem, what changes with Avni, and proof from a partner's story
const steps = [
  {
    icon: Smartphone,
    tone: 'bg-[#FFF1EA] text-[#C2410C]',
    title: 'No more nights copying registers',
    problem: 'Field workers fill paper registers all day, then copy them again in the evening.',
    change: 'With Avni they record each visit once, on their phone, even where there is no signal.',
    proof: 'Purna Clinic: 22× more visits recorded within nine months',
    href: '/resources/case-studies/2026-05-05-purna-clinic-tide-trust-dangs/',
  },
  {
    icon: HeartPulse,
    tone: 'bg-[#E8F3EE] text-[#2a7559]',
    title: 'No one slips through the cracks',
    problem: 'A missed follow-up can mean a high-risk pregnancy or a malnourished child is noticed too late.',
    change: 'Avni tells each worker who is due for a visit and flags who is at risk.',
    proof: 'SEWA Rural: the app now picks which children need a visit',
    href: '/blog/2022-05-03-field-visit-sewa-rural-adolescent-and-sncu/',
  },
  {
    icon: BarChart3,
    tone: 'bg-[#E9EAF8] text-[#4F46A5]',
    title: 'Decide on today’s data, not last quarter’s',
    problem: 'Programme managers wait weeks for reports compiled by hand.',
    change: 'Every visit reaches your dashboards as soon as a phone syncs.',
    proof: 'Hasiru Dala: registrations doubled, from 3 to 6 people an hour',
    href: '/resources/case-studies/2025-08-01-empowering-waste-pickers/',
  },
];

export default function WhatAvniDoes() {
  return (
    <Section spacing="none" className="pt-10 md:pt-12 pb-16 md:pb-20">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Three steps */}
          <div className="text-center mb-8 md:mb-10">
            <p className="font-anek font-medium text-sm md:text-base text-[#fba47e] uppercase mb-3">WHAT AVNI DOES</p>
            <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
              Built For The People Doing The Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {steps.map(({ icon: Icon, tone, title, problem, change, proof, href }, i) => (
              <FadeIn key={title} delay={i * 150}>
                <div className="h-full flex flex-col rounded-2xl border border-[#EAECF0] bg-white p-6 md:p-7">
                  <span className={`flex items-center justify-center w-12 h-12 rounded-xl mb-5 ${tone}`}>
                    <Icon size={24} />
                  </span>
                  <h3 className="font-anek font-bold text-xl md:text-2xl leading-snug text-[#0b2540] mb-3">{title}</h3>
                  <p className="font-noto text-base leading-relaxed text-[#667085] mb-2">{problem}</p>
                  <p className="font-noto text-base leading-relaxed text-[#0b2540] font-medium mb-5">{change}</p>
                  <Link
                    href={href}
                    className="mt-auto flex items-start gap-2 rounded-xl bg-[#F6FBF8] px-4 py-3 font-noto text-sm text-[#1f5a43] hover:bg-[#E8F3EE] transition-colors"
                  >
                    <ArrowRight size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{proof}</span>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-7 py-3 border-2 border-[#419372] text-[#2a7559] rounded-full font-anek font-semibold text-base hover:bg-[#419372] hover:text-white transition-colors"
            >
              See All Features <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
