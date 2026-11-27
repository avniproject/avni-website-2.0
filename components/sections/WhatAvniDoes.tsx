/**
 * What Avni Does
 * What Avni does for each audience (one benefit line, concept tags, proof from a partner's
 * story), shown as tabs beside real Avni screens. Usage numbers are in the hero.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, HeartPulse, Smartphone } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import ProductShowcase, { ShowcaseItem } from '@/components/sections/ProductShowcase';

// Each tab: one audience, one benefit line, a few concept tags, and proof from a partner's story
const steps: ShowcaseItem[] = [
  {
    icon: Smartphone,
    tone: 'bg-[#FFF1EA] text-[#C2410C]',
    audience: 'For field workers',
    title: 'Guided forms that make every visit count',
    text: 'Field workers register people and record every visit on their phone, guided step by step, with or without internet.',
    tags: ['Guided forms', 'Quality data at entry', 'Works offline', 'In their language'],
    proof: 'Hasiru Dala: registrations doubled, from 3 to 6 people an hour',
    href: '/resources/case-studies/2025-08-01-empowering-waste-pickers/',
    media: { src: '/img/home/visit-card.webp', kind: 'image', frame: 'card', alt: 'A home visit form in Avni: values entered, a high-risk pregnancy flagged, synced', caption: 'A guided home visit: Avni flags the risk as values are entered (illustration)' },
  },
  {
    icon: HeartPulse,
    tone: 'bg-[#E8F3EE] text-[#2a7559]',
    audience: 'For supervisors',
    title: 'Know who needs attention, every day',
    text: 'Avni plans each next visit, shows who is due, and flags anyone at risk, like a malnourished child or a high-risk pregnancy.',
    tags: ['Risk alerts', 'Timely follow-ups', 'Built-in approvals', 'Dashboards on the go'],
    proof: 'SEWA Rural: the app now picks which children need a visit',
    href: '/blog/2022-05-03-field-visit-sewa-rural-adolescent-and-sncu/',
    media: { src: '/img/home/supervisor-card.webp', kind: 'image', frame: 'card', alt: 'A supervisor’s attention list in Avni: high-risk pregnancy, SAM child, overdue visit, visits to approve', caption: 'A supervisor’s list for the day: risks, overdue visits and approvals (illustration)' },
  },
  {
    icon: BarChart3,
    tone: 'bg-[#E9EAF8] text-[#4F46A5]',
    audience: 'For programme managers',
    title: 'Decide on live, trusted data',
    text: 'Every visit reaches your dashboards as soon as a phone syncs, ready for decisions and for reporting to funders.',
    tags: ['Live insights', 'Funder-ready reports', 'Connected systems', 'Secure access'],
    proof: 'Purna Clinic: 22× more visits recorded within nine months',
    href: '/resources/case-studies/2026-05-05-purna-clinic-tide-trust-dangs/',
    media: { src: '/img/2026-05-05-purna-clinic-tide-trust-dangs/encounters-growth-graph.webp', kind: 'image', frame: 'browser', alt: 'Monthly visits recorded at Purna Clinic, growing month on month', caption: 'Live counts and a real Avni report (Purna Clinic)', extra: { src: '/img/home/dash-card.webp', alt: 'Programme dashboard: high-risk pregnancies 33, +1 just now' } },
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
              From Field To Dashboard, In One App
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
