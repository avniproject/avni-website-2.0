"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export interface ImpactStory {
  sector: string;
  title: string;
  summary: string;
  href: string;
  image?: string;
  logo?: string;
}

/**
 * Impact Stories
 * One story per sector: the sector's latest case study, chosen on the homepage
 * (app/page.tsx). Sectors without a case study get no tab. Stories move on by themselves
 * every few seconds until someone hovers or picks a sector.
 */

const ADVANCE_MS = 7000;

export default function ImpactStories({ stories }: { stories: ImpactStory[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || stories.length < 2) return;
    const timer = setTimeout(() => setIndex(i => (i + 1) % stories.length), ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [index, paused, stories.length]);

  const story = stories[index];
  if (!story) return null;
  const activeSector = story.sector;
  const go = (step: number) => { setIndex(i => (i + step + stories.length) % stories.length); setPaused(true); };

  return (
    <Section spacing="none" bg="cream" className="pt-10 md:pt-12 pb-14 md:pb-16">
      <Container>
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <p className="font-anek font-semibold tracking-wide text-xs md:text-sm leading-tight text-[#B8481F] uppercase mb-3 md:mb-4">
            AVNI SCALING ACROSS SECTORS
          </p>
          <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-[64px] leading-tight text-[#0b2540] mb-3 md:mb-4">
            Impact Stories
          </h2>
          <p className="font-noto text-sm md:text-base lg:text-lg xl:text-[20px] leading-relaxed text-[#000000]">
            Empowering Every Mission, Adapting To Every Context
          </p>
        </div>

        {/* Sector Tabs */}
        <div className="flex justify-center gap-3 md:gap-4 mb-10 md:mb-12 flex-wrap">
          {stories.map(({ sector }, i) => (
            <button
              key={sector}
              onClick={() => { setIndex(i); setPaused(true); }}
              className={`relative overflow-hidden px-4 md:px-6 py-2 md:py-3 rounded-full font-anek font-medium text-xs md:text-sm leading-tight transition-all duration-300 ${
                activeSector === sector
                  ? "bg-[#419372] text-white shadow-lg scale-105"
                  : "bg-white text-[#0b2540] hover:bg-[#419372]/10 hover:scale-102"
              }`}
            >
              {sector}
              {/* Progress line while stories move on by themselves */}
              {activeSector === sector && !paused && (
                <span key={index} className="absolute left-0 bottom-0 h-[3px] bg-white/70 animate-[story-progress_7s_linear]" />
              )}
            </button>
          ))}
        </div>

        {/* Story, with arrows to the previous and next sector */}
        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <button onClick={() => go(-1)} aria-label="Previous story" className="hidden xl:flex absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md items-center justify-center text-[#0b2540] hover:text-[#2a7559]">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => go(1)} aria-label="Next story" className="hidden xl:flex absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md items-center justify-center text-[#0b2540] hover:text-[#2a7559]">
          <ChevronRight size={20} />
        </button>
        <div 
          className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[60px] items-center transition-all duration-500 ease-in-out"
          key={activeSector}
        >
          {/* Image */}
          <div className="relative w-full lg:w-[420px] aspect-video lg:aspect-[3/2] rounded-2xl lg:rounded-[24px] overflow-hidden shadow-xl flex-shrink-0 animate-fadeIn">
            {story.image ? (
              <Image src={story.image} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 420px" />
            ) : story.logo ? (
              // No photo: the partner's logo on white
              <div className="absolute inset-0 bg-white flex items-center justify-center p-14">
                <div className="relative w-full h-full">
                  <Image src={story.logo} alt="" fill className="object-contain" sizes="320px" />
                </div>
              </div>
            ) : null}
          </div>

          {/* Content */}
          <div className="w-full lg:w-auto lg:flex-1 lg:max-w-[538px] animate-slideIn">
            <h3 className="font-anek font-bold text-2xl md:text-3xl lg:text-[32px] leading-tight text-[#0b2540] mb-4 md:mb-5 lg:mb-[20px]">
              {story.title}
            </h3>
            <p className="font-noto text-sm md:text-base lg:text-[16px] leading-relaxed lg:leading-[26px] text-[#000000] mb-6 md:mb-8 lg:mb-[32px]">
              {story.summary}
            </p>
            <Link
              href={story.href}
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-3 border-2 border-[#419372] text-[#419372] rounded-full md:rounded-[20px] font-anek font-medium text-sm md:text-base hover:bg-[#419372] hover:text-white transition-all"
            >
              Read the Case Study →
            </Link>
            <Link href="/resources/case-studies" className="inline-block ml-5 font-noto text-sm font-medium text-[#2a7559] hover:text-[#1f5a43]">
              All case studies
            </Link>
          </div>
        </div>
        </div>

        {/* Dots on phones, where the sector tabs wrap */}
        <div className="flex xl:hidden justify-center gap-2 mt-8">
          {stories.map(({ sector }, i) => (
            <button key={sector} onClick={() => { setIndex(i); setPaused(true); }} aria-label={`Show ${sector} story`}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-[#419372]' : 'w-2 bg-[#D0D5DD]'}`} />
          ))}
        </div>
      </Container>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }

        @keyframes story-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </Section>
  );
}
