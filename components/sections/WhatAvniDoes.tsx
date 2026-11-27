/**
 * What Avni Does
 * Three things Avni does (with proof from a partner's story), shown as tabs beside real
 * Avni screens. Usage numbers are in the hero.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, HeartPulse, Smartphone } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import ProductShowcase, { ShowcaseItem } from '@/components/sections/ProductShowcase';

// Each tab: something Avni does, in plain words, with proof from a partner's story
const steps: ShowcaseItem[] = [
  {
    icon: Smartphone,
    tone: 'bg-[#FFF1EA] text-[#C2410C]',
    title: 'Collect data in the field, even offline',
    text: 'Field workers register people and record every visit on their phone, with or without internet. Forms guide them step by step, in their own language.',
    proof: 'Hasiru Dala: registrations doubled, from 3 to 6 people an hour',
    href: '/resources/case-studies/2025-08-01-empowering-waste-pickers/',
    media: { src: '/img/home/offline-dashboard.mp4', kind: 'video', frame: 'phone', alt: 'The Avni field app home screen with dashboard cards', caption: 'The field app’s home screen works offline (test data)' },
  },
  {
    icon: HeartPulse,
    tone: 'bg-[#E8F3EE] text-[#2a7559]',
    title: 'Follow up every person, on time',
    text: 'Avni schedules each next visit, shows every worker who is due, and flags anyone at risk, like a malnourished child or a high-risk pregnancy.',
    proof: 'SEWA Rural: the app now picks which children need a visit',
    href: '/blog/2022-05-03-field-visit-sewa-rural-adolescent-and-sncu/',
    media: { src: '/img/home/individual-dashboard-child.mp4', kind: 'video', frame: 'phone', alt: 'A child’s profile in the Avni app with scheduled and overdue visits', caption: 'A child’s profile with scheduled and overdue visits (test data)' },
  },
  {
    icon: BarChart3,
    tone: 'bg-[#E9EAF8] text-[#4F46A5]',
    title: 'See your programme’s progress live',
    text: 'Every visit reaches your dashboards as soon as a phone syncs, so managers track progress and report without waiting for spreadsheets.',
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
