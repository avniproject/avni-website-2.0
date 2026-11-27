/**
 * What Avni Does
 * Three real problems Avni solves (what changes, proof from a partner's story), shown as
 * tabs beside real Avni screens. Usage numbers are in the hero.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, HeartPulse, Smartphone } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import ProductShowcase, { ShowcaseItem } from '@/components/sections/ProductShowcase';

// Each card: a real problem, what changes with Avni, and proof from a partner's story
const steps: ShowcaseItem[] = [
  {
    icon: Smartphone,
    tone: 'bg-[#FFF1EA] text-[#C2410C]',
    title: 'No more nights copying registers',
    problem: 'Field workers fill paper registers all day, then copy them again in the evening.',
    change: 'With Avni they record each visit once, on their phone, even where there is no signal.',
    proof: 'Hasiru Dala: registrations doubled, from 3 to 6 people an hour',
    href: '/resources/case-studies/2025-08-01-empowering-waste-pickers/',
    media: { src: '/img/2025-05-28-bridging-the-nutrition-gap-apf-odisha/offline-dashboard.mp4', kind: 'video', frame: 'phone', alt: 'The Avni field app home screen with dashboard cards', caption: 'The field app’s home screen works offline (test data)' },
  },
  {
    icon: HeartPulse,
    tone: 'bg-[#E8F3EE] text-[#2a7559]',
    title: 'No one slips through the cracks',
    problem: 'A missed follow-up can mean a high-risk pregnancy or a malnourished child is noticed too late.',
    change: 'Avni tells each worker who is due for a visit and flags who is at risk.',
    proof: 'SEWA Rural: the app now picks which children need a visit',
    href: '/blog/2022-05-03-field-visit-sewa-rural-adolescent-and-sncu/',
    media: { src: '/img/2025-05-28-bridging-the-nutrition-gap-apf-odisha/individual-dashboard-child.mp4', kind: 'video', frame: 'phone', alt: 'A child’s profile in the Avni app with scheduled and overdue visits', caption: 'A child’s profile with scheduled and overdue visits (test data)' },
  },
  {
    icon: BarChart3,
    tone: 'bg-[#E9EAF8] text-[#4F46A5]',
    title: 'Decide on today’s data, not last quarter’s',
    problem: 'Programme managers wait weeks for reports compiled by hand.',
    change: 'Every visit reaches your dashboards as soon as a phone syncs.',
    proof: 'Purna Clinic: 22× more visits recorded within nine months',
    href: '/resources/case-studies/2026-05-05-purna-clinic-tide-trust-dangs/',
    media: { src: '/img/2026-05-05-purna-clinic-tide-trust-dangs/encounters-growth-graph.webp', kind: 'image', frame: 'browser', alt: 'Monthly visits recorded at Purna Clinic, growing month on month', caption: 'Monthly visits recorded at Purna Clinic, from a real Avni report' },
  },
];

export default function WhatAvniDoes() {
  return (
    <Section spacing="none" className="pt-10 md:pt-12 pb-8 md:pb-10">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Three steps */}
          <div className="text-center mb-8 md:mb-10">
            <p className="font-anek font-medium text-sm md:text-base text-[#fba47e] uppercase mb-3">WHAT AVNI DOES</p>
            <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
              Built For The People Doing The Work
            </h2>
          </div>

          <ProductShowcase items={steps} />

          <div className="text-center mt-8">
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
