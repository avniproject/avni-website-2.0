import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import Header from "@/components/layout/Header";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import { OrganizationSchema, WebsiteSchema, SoftwareApplicationSchema } from '@/components/seo/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import { pageMetadata } from '@/lib/seo/config';
import { getAllCaseStudies } from '@/lib/markdown';
import { sectors } from '@/data/sectors';
import type { ImpactStory } from '@/components/sections/ImpactStories';

export const metadata: Metadata = generateSEOMetadata({
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: pageMetadata.home.keywords,
  url: '/',
});

// Dynamic imports for below-the-fold components
const TrustedBy = dynamic(() => import("@/components/sections/TrustedBy"), {
  loading: () => <div className="h-32" />
});
const WhatAvniDoes = dynamic(() => import("@/components/sections/WhatAvniDoes"), {
  loading: () => <div className="h-screen" />
});
const ImpactStories = dynamic(() => import("@/components/sections/ImpactStories"), {
  loading: () => <div className="h-screen" />
});
const WhyChooseAvni = dynamic(() => import("@/components/sections/WhyChooseAvni"), {
  loading: () => <div className="h-screen" />
});
const Solutions = dynamic(() => import("@/components/sections/Solutions"), {
  loading: () => <div className="h-screen" />
});
const Transparency = dynamic(() => import("@/components/sections/Transparency"), {
  loading: () => <div className="h-screen" />
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => <div className="h-screen" />
});
const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
  loading: () => <div className="h-screen" />
});
const Newsletter = dynamic(() => import("@/components/sections/Newsletter"), {
  loading: () => <div className="h-screen" />
});

// A case study's summary, cut at the last full sentence within about 260 characters
function summarise(text: string, max = 260) {
  const clean = text.replace(/\s+/g, ' ').replace(/^[-*]\s*/, '').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const end = cut.lastIndexOf('. ');
  return end > max / 2 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

// One story per sector, in the Solutions page's order: that sector's latest case study
async function getImpactStories(): Promise<ImpactStory[]> {
  const caseStudies = await getAllCaseStudies(); // newest first
  return sectors.flatMap(({ name }) => {
    const latest = caseStudies.find(cs => cs.frontmatter.sector === name);
    if (!latest) return [];
    const { frontmatter, slug, htmlContent } = latest;
    // Some imported summaries were cut off mid-word ("..."); use the story's opening instead
    const description = frontmatter.description || '';
    const opening = (htmlContent ?? '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ');
    return [{
      sector: name,
      title: frontmatter.title,
      summary: summarise(/(\.\.\.|…)\s*$/.test(description) || !description ? opening : description),
      href: `/resources/case-studies/${slug}/`,
      image: frontmatter.image,
      logo: frontmatter.logo,
    }];
  });
}

export default async function Home() {
  const impactStories = await getImpactStories();
  return (
    <>
      {/* Structured Data for SEO */}
      <OrganizationSchema />
      <WebsiteSchema />
      <SoftwareApplicationSchema />
      
      <Header />
      <AnnouncementBanner />
      <main>
        <Hero />
        <TrustedBy />
        <WhatAvniDoes />
        <ImpactStories stories={impactStories} />
        <WhyChooseAvni />
        <Solutions />
        <Transparency />
        <Testimonials />
        <CTASection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
