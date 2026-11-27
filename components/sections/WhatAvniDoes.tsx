/**
 * What Avni Does
 * Avni in three steps (build, collect, decide). Usage numbers are in the hero.
 */

import Link from 'next/link';
import { ArrowRight, BarChart3, FilePenLine, Smartphone } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/ui/FadeIn';

const steps = [
  {
    icon: FilePenLine,
    tone: 'bg-[#FFF1EA] text-[#C2410C]',
    title: 'Build',
    text: 'Set up your programme’s forms, visits and rules in a browser. No coding.',
  },
  {
    icon: Smartphone,
    tone: 'bg-[#E8F3EE] text-[#2a7559]',
    title: 'Collect',
    text: 'Field teams record every visit on their phones, even without internet.',
  },
  {
    icon: BarChart3,
    tone: 'bg-[#E9EAF8] text-[#4F46A5]',
    title: 'Decide',
    text: 'See progress live, spot who needs help, and report with confidence.',
  },
];

export default function WhatAvniDoes() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Three steps */}
          <div className="text-center mb-10 md:mb-12">
            <p className="font-anek font-medium text-sm md:text-base text-[#fba47e] uppercase mb-3">WHAT AVNI DOES</p>
            <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
              One App For Your Whole Field Programme
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {steps.map(({ icon: Icon, tone, title, text }, i) => (
              <FadeIn key={title} delay={i * 150}>
                <div className="relative h-full rounded-2xl border border-[#EAECF0] bg-white p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`flex items-center justify-center w-12 h-12 rounded-xl ${tone}`}>
                      <Icon size={24} />
                    </span>
                    <span className="font-anek font-semibold text-sm text-[#98A2B3]">0{i + 1}</span>
                  </div>
                  <h3 className="font-anek font-bold text-2xl text-[#0b2540] mb-2">{title}</h3>
                  <p className="font-noto text-base leading-relaxed text-[#475467]">{text}</p>
                  {/* Arrow to the next step on larger screens */}
                  {i < steps.length - 1 && (
                    <span aria-hidden="true" className="hidden md:flex absolute top-1/2 -right-[22px] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-[#EAECF0] items-center justify-center text-[#419372]">
                      <ArrowRight size={16} />
                    </span>
                  )}
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
