"use client";

import { useState } from "react";
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
 * (app/page.tsx). Sectors without a case study get no tab.
 */

export default function ImpactStories({ stories }: { stories: ImpactStory[] }) {
  const [activeSector, setActiveSector] = useState(stories[0]?.sector);
  const story = stories.find(s => s.sector === activeSector) ?? stories[0];
  if (!story) return null;

  return (
    <Section spacing="none" bg="gray" className="pt-10 md:pt-12 pb-14 md:pb-16">
      <Container>
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <p className="font-anek font-medium text-xs md:text-sm leading-tight text-[#fba47e] uppercase mb-3 md:mb-4">
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
          {stories.map(({ sector }) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-anek font-medium text-xs md:text-sm leading-tight transition-all duration-300 ${
                activeSector === sector
                  ? "bg-[#419372] text-white shadow-lg scale-105"
                  : "bg-white text-[#0b2540] hover:bg-[#419372]/10 hover:scale-102"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Story Content with Animation */}
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
      `}</style>
    </Section>
  );
}
