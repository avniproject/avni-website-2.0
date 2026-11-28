/**
 * FAQ Page
 * All FAQs by category (data/faqs.ts), with ways to ask anything else
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BookDemoLink from '@/components/ui/BookDemoLink';
import FaqBrowser from '@/components/faq/FaqBrowser';
import { faqCategories } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'FAQ - Avni',
  description: 'Answers to common questions about getting started with Avni, pricing and hosting, open source and data.',
  openGraph: {
    title: 'FAQ - Avni',
    description: 'Answers to common questions about getting started with Avni, pricing and hosting, open source and data.',
    url: '/resources/faq',
  },
  alternates: {
    canonical: '/resources/faq',
  },
};

export default function FaqPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F5F5] pt-[72px]">
        <Section spacing="sm" className="bg-white py-8 md:py-12">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-anek font-semibold tracking-wide text-sm md:text-base leading-tight text-[#B8481F] uppercase mb-3">
                FAQ
              </p>
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540]">
                Frequently Asked Questions
              </h1>
            </div>
          </Container>
        </Section>

        <Section spacing="md" bg="gray">
          <Container>
            <div className="max-w-3xl mx-auto space-y-12">
              <FaqBrowser categories={faqCategories} />

              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 text-center">
                <MessageCircle size={32} className="mx-auto text-[#419372] mb-3" />
                <h2 className="font-anek font-bold text-2xl text-[#0b2540] mb-2">Still have a question?</h2>
                <p className="font-noto text-base text-[#475467] mb-6">
                  Ask the community on{' '}
                  <a href="https://discord.gg/4pcgcQW8pk" target="_blank" rel="noopener noreferrer" className="font-medium text-[#2a7559] underline underline-offset-2">Discord</a>
                  , or talk to our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <BookDemoLink className="inline-flex items-center justify-center px-8 py-3 bg-[#419372] text-white rounded-full font-anek font-semibold text-base hover:bg-[#357a5e] transition-colors">
                    Book a Demo
                  </BookDemoLink>
                  <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#419372] text-[#2a7559] rounded-full font-anek font-semibold text-base hover:bg-[#419372] hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
