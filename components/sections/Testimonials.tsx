/**
 * Testimonials
 * Short quote cards from partners' staff (data/testimonials.ts), each with the person,
 * organisation, logo and a link to the full story. A 3 × 2 grid on larger screens;
 * on phones they scroll sideways.
 */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { testimonials, TESTIMONIALS_SHOWN } from '@/data/testimonials';

// A different accent per card, from the site's palette
const ACCENTS = [
  { quote: 'text-[#419372]/35', edge: 'border-t-[#419372]' },
  { quote: 'text-[#F27A45]/35', edge: 'border-t-[#F27A45]' },
  { quote: 'text-[#6D6BD0]/35', edge: 'border-t-[#6D6BD0]' },
  { quote: 'text-[#E0A800]/40', edge: 'border-t-[#F5C518]' },
];

export default function Testimonials() {
  const shown = testimonials.slice(0, TESTIMONIALS_SHOWN);

  return (
    <Section spacing="none" bg="gray" className="pt-14 md:pt-16 pb-10 md:pb-12">
      <Container>
        <div className="text-center mb-10 md:mb-14">
          <p className="font-anek font-medium text-xs md:text-sm leading-tight text-[#fba47e] uppercase mb-3">
            IN THEIR WORDS
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540]">
            What Our Partners Say
          </h2>
        </div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-2">
          {shown.map((t, i) => (
            <figure
              key={t.id}
              className={`flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-auto snap-center flex flex-col bg-white rounded-2xl p-6 md:p-7 shadow-sm border-t-4 ${ACCENTS[i % ACCENTS.length].edge} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <span aria-hidden="true" className={`font-anek font-bold text-6xl leading-none -mb-3 ${ACCENTS[i % ACCENTS.length].quote}`}>“</span>
              <blockquote className="flex-1 font-noto text-base leading-relaxed text-[#344054]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-[#EAECF0] flex items-center gap-3">
                {t.photos ? (
                  <div className="flex flex-shrink-0 -space-x-3">
                    {t.photos.map(photo => (
                      <div key={photo} className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white">
                        <Image src={photo} alt="" fill sizes="48px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : t.logo && (
                  <div className="relative flex-shrink-0 w-14 h-10">
                    <Image src={t.logo} alt="" fill sizes="56px" className="object-contain object-left" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-anek font-semibold text-base text-[#0b2540] leading-tight">{t.name}</p>
                  <p className="font-noto text-sm text-[#667085] leading-snug">
                    {[t.role, t.organisation].filter(Boolean).join(', ')}
                  </p>
                </div>
              </figcaption>
              <Link href={t.href} className="mt-4 inline-flex items-center gap-1 font-noto text-sm font-medium text-[#2a7559] hover:text-[#1f5a43]">
                Read their story <ArrowRight size={14} />
              </Link>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
