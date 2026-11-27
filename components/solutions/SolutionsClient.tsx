'use client';

/**
 * Solutions
 * Sector tabs (sidebar on desktop, scrolling row on phones) with each sector's text
 * (data/sectors.ts) and its case studies. The selected sector is kept in the URL
 * (?sector=education) so a sector can be shared.
 */

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookDemoLink from '@/components/ui/BookDemoLink';
import { sectors } from '@/data/sectors';

export interface SectorCaseStudy {
  title: string;
  href: string;
  image?: string;
  logo?: string;
}

const solutions = sectors.map(sector => sector.name);

// URL-friendly name for a solution, used in ?sector= so each tab can be shared,
// e.g. 'Water & Sanitation' -> 'water-sanitation'
const toSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const CASE_STUDIES_SHOWN = 2;

export default function SolutionsClient({ caseStudies }: { caseStudies: Record<string, SectorCaseStudy[]> }) {
  const [activeTab, setActiveTab] = useState(solutions[0]);

  // Handle URL parameter for pre-selected solution
  // Read the sector from the address after the page loads, so the page itself can be
  // pre-rendered. ?solution=Water & Sanitation is the older form of the same link.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sector = params.get('sector');
    const solution = solutions.find(s => toSlug(s) === sector) ?? params.get('solution');
    if (solution && solutions.includes(solution)) {
      setActiveTab(solution);
    }
  }, []);

  // Selecting a tab updates the address, so the page can be shared open on that sector
  const selectTab = (solution: string) => {
    setActiveTab(solution);
    window.history.replaceState(null, '', `?sector=${toSlug(solution)}`);
  };

  const currentContent = sectors.find(sector => sector.name === activeTab) ?? sectors[0];
  const sectorCaseStudies = (caseStudies[activeTab] ?? []).slice(0, CASE_STUDIES_SHOWN);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-[72px]">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-16 xl:px-24 py-12 lg:py-16">
          <div className="max-w-[1440px] mx-auto">
            <p className="font-anek font-bold text-[14px] leading-[20px] text-[#fba57f] uppercase tracking-[0.5px] mb-8">
              AVNI SOLUTIONS
            </p>

            {/* Mobile Horizontal Scroll */}
            <div className="lg:hidden overflow-x-auto pb-2 -mx-6 px-6 mb-8">
              <div className="flex gap-2 min-w-max">
                {solutions.map((solution) => (
                  <button
                    key={solution}
                    onClick={() => selectTab(solution)}
                    aria-current={activeTab === solution ? 'true' : undefined}
                    className={`px-4 py-2 rounded-full font-anek text-[15px] whitespace-nowrap transition-colors ${
                      activeTab === solution
                        ? 'bg-[#0b2540] text-white font-semibold'
                        : 'bg-white text-[#344054] border border-[#D0D5DD] font-medium'
                    }`}
                  >
                    {solution}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
              {/* Sidebar - Solutions Tabs (Desktop Only) */}
              <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
                <nav className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6 space-y-2">
                  {solutions.map((solution) => (
                    <button
                      key={solution}
                      onClick={() => selectTab(solution)}
                      aria-current={activeTab === solution ? 'true' : undefined}
                      className={`w-full text-left px-4 py-3 rounded-[10px] border-l-4 font-anek text-[16px] leading-[24px] transition-all ${
                        activeTab === solution
                          ? 'bg-[#E8F3EE] border-[#419372] font-bold text-[#1f5a43]'
                          : 'border-transparent font-medium text-[#5a6c7d] hover:bg-[#f7f9fc] hover:text-[#0a1f3d]'
                      }`}
                    >
                      {solution}
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Description Paragraphs - Right Side */}
              <div className="space-y-6">
                {currentContent.description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-noto text-[16px] lg:text-[17px] leading-[1.75] text-[#4a5568]"
                  >
                    {paragraph}
                  </p>
                ))}

                {currentContent.programmes && (
                  <div className="pt-4">
                    <h2 className="font-anek font-bold text-[20px] lg:text-[22px] text-[#0a1f3d] mb-4">
                      Programmes running on Avni
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentContent.programmes.map(programme => (
                        <li key={programme.name} className="rounded-[12px] bg-[#f7f9fc] px-4 py-3">
                          <p className="font-anek font-semibold text-[16px] text-[#0a1f3d]">{programme.name}</p>
                          <p className="font-noto text-[14px] leading-[1.6] text-[#5a6c7d]">
                            {programme.examples.map((example, i) => (
                              <span key={example.name + example.href}>
                                {i > 0 && ' · '}
                                <Link href={example.href} className="font-medium text-[#2a7559] underline decoration-[#419372]/40 underline-offset-2 hover:text-[#1f5a43]">
                                  {example.name}
                                </Link>
                              </span>
                            ))}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Cards Grid - Below Everything */}
            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* This sector's case studies */}
                  {sectorCaseStudies.map(caseStudy => (
                    <Link
                      key={caseStudy.href}
                      href={caseStudy.href}
                      className="group bg-white rounded-[16px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all"
                    >
                      <div className="relative aspect-[4/3] bg-gray-100">
                        {caseStudy.image ? (
                          <Image
                            src={caseStudy.image}
                            alt=""
                            fill
                            className="object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : caseStudy.logo ? (
                          // No photo: the partner's logo on white
                          <div className="absolute inset-0 bg-white flex items-center justify-center p-12">
                            <div className="relative w-full h-full">
                              <Image src={caseStudy.logo} alt="" fill className="object-contain" sizes="300px" />
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-anek font-semibold text-[16px] lg:text-[17px] leading-[1.4] text-[#0a1f3d] group-hover:text-[#419372] transition-colors">
                          {caseStudy.title}
                        </h3>
                        <p className="font-anek text-[14px] text-[#fba57f] uppercase tracking-wide">
                          Case Study
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* Demo card */}
                  <BookDemoLink className="group bg-[#f7f9fc] rounded-[16px] p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-all min-h-[280px]">
                    <div className="space-y-2">
                      <h3 className="font-anek font-bold text-[18px] lg:text-[19px] leading-[1.3] text-[#0a1f3d]">
                        Want To Know If Avni Fits Your {activeTab} Programme?
                      </h3>
                      <p className="font-noto text-[15px] leading-[1.5] text-[#5a6c7d]">
                        See it with a programme like yours in a one-hour demo
                      </p>
                    </div>
                    <span className="inline-flex items-center px-6 py-2.5 bg-[#419372] text-white rounded-full font-anek font-semibold text-[15px] group-hover:bg-[#357a5e] transition-colors">
                      Book a Demo
                    </span>
                  </BookDemoLink>
                </div>
              </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative px-6 lg:px-16 xl:px-24 py-20 lg:py-24 bg-[#e9eaf8]">
          <div className="max-w-[800px] mx-auto text-center space-y-6">
            <h2 className="font-anek font-bold text-[32px] lg:text-[36px] leading-[1.2] text-[#0b2540]">
              Stay Connected With Avni
            </h2>
            
            <p className="font-noto text-[18px] lg:text-[20px] leading-[1.6] text-[rgba(0,0,0,0.75)] max-w-[680px] mx-auto">
              Get the latest updates, releases, and event news in your inbox. Join to engage with the growing Avni community.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-4 max-w-[540px] mx-auto">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full sm:flex-1 h-[52px] px-6 border border-[#d0d0d0] rounded-[26px] text-[16px] font-noto placeholder:text-[#999] focus:outline-none focus:border-[#419372] focus:ring-2 focus:ring-[#419372]/20 transition-all bg-white"
              />
              <button className="w-full sm:w-auto px-8 h-[52px] bg-[#419372] text-white font-anek font-semibold text-[18px] rounded-[26px] hover:bg-[#357a5e] active:scale-[0.98] transition-all shadow-md hover:shadow-lg whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
