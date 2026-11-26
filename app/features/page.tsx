/**
 * Features Page
 * Interactive explorer of Avni's features (data/feature-groups.ts), the integrations,
 * and links to the roadmap and documentation
 */

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BookDemoLink from '@/components/ui/BookDemoLink';
import FeatureExplorer from '@/components/features/FeatureExplorer';
import { featureGroups } from '@/data/feature-groups';
import { addOns } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Features - Avni',
  description: 'Build your field app without code, work offline in your language, guide field workers with decision support, and use your data in reports and other systems.',
  openGraph: {
    title: 'Features - Avni',
    description: 'Build your field app without code, work offline in your language, guide field workers with decision support, and use your data in reports and other systems.',
    url: '/features',
  },
  alternates: {
    canonical: '/features',
  },
};

const integrations = addOns.find(addOn => addOn.integratedWith)?.integratedWith ?? [];

export default function FeaturesPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F5F5] pt-[72px]">
        <Section spacing="sm" className="bg-white py-8 md:py-12">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-anek font-medium text-sm md:text-base leading-tight text-[#fba47e] uppercase mb-3">
                FEATURES
              </p>
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540] mb-4">
                Everything Your Field Programme Needs
              </h1>
              <p className="font-noto text-base md:text-lg leading-relaxed text-[#000000]/70 mb-6">
                Build your app without code, collect data anywhere, and turn it into decisions.
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {['Works offline', 'Many languages', 'No coding needed', 'Open source'].map(point => (
                  <span key={point} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F3EE] font-noto text-sm font-medium text-[#1f5a43]">
                    <Check size={15} /> {point}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section spacing="md" bg="gray">
          <Container>
            <div className="max-w-6xl mx-auto">
              <FeatureExplorer groups={featureGroups} />
            </div>
          </Container>
        </Section>

        {/* Integrations */}
        <Section spacing="md">
          <Container>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-3">Works With Tools You Already Use</h2>
                <p className="font-noto text-base leading-relaxed text-[#475467] mb-5">
                  Avni connects with WhatsApp, telephony and hospital systems, and its API links it to your other systems.
                </p>
                <Link href="/pricing#add-ons" className="inline-flex items-center gap-1 font-noto font-medium text-[#2a7559] hover:text-[#1f5a43]">
                  Integrations as an add-on <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {integrations.map(({ name, logo }) => (
                  <div key={name} className="relative h-20 md:h-24 rounded-xl border border-[#EAECF0] bg-white" title={name}>
                    <Image src={logo} alt={name} fill sizes="240px" className="object-contain px-6 py-4" />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* What's next + CTA */}
        <Section spacing="md" bg="gray">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-3">See It With Your Own Programme</h2>
              <p className="font-noto text-base text-[#475467] mb-8">
                We&apos;ll show you how these features fit the way your team works.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <BookDemoLink className="inline-flex items-center justify-center px-8 py-3 bg-[#419372] text-white rounded-full font-anek font-semibold text-base hover:bg-[#357a5e] transition-colors">
                  Book a Demo
                </BookDemoLink>
                <Link href="/signup" className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#419372] text-[#2a7559] rounded-full font-anek font-semibold text-base hover:bg-[#419372] hover:text-white transition-colors">
                  Try for Free
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 font-noto text-sm">
                <a href="https://github.com/orgs/avniproject/projects/2/views/7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#2a7559] hover:text-[#1f5a43]">
                  Roadmap of upcoming features <ArrowUpRight size={14} />
                </a>
                <a href="https://avni.readme.io/docs/getting-started" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#2a7559] hover:text-[#1f5a43]">
                  Full documentation <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
