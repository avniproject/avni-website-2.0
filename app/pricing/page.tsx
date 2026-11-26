/**
 * Pricing Page
 * Plan cards with their hosting prices, custom-needs band, expert services and FAQ.
 * All prices and text live in data/pricing.ts
 */

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BookDemoLink from '@/components/ui/BookDemoLink';
import { plans, hostingIncludes, addOns, AddOn } from '@/data/pricing';
import { faqCategories } from '@/data/faqs';
import FaqList from '@/components/faq/FaqList';

export const metadata: Metadata = {
  title: 'Pricing - Avni',
  description: 'Avni is open source and free to use. Our plans cover help to build your app and hosting on the Avni cloud.',
  openGraph: {
    title: 'Pricing - Avni',
    description: 'Avni is open source and free to use. Our plans cover help to build your app and hosting on the Avni cloud.',
    url: '/pricing',
  },
  alternates: {
    canonical: '/pricing',
  },
};

const primaryButton = 'inline-flex items-center justify-center px-8 py-3 bg-[#419372] text-white rounded-full font-anek font-semibold text-base hover:bg-[#357a5e] transition-colors';
const secondaryButton = 'inline-flex items-center justify-center px-8 py-3 border-2 border-[#419372] text-[#2a7559] rounded-full font-anek font-semibold text-base hover:bg-[#419372] hover:text-white transition-colors';

function AddOnCard({ addOn }: { addOn: AddOn }) {
  return (
    <div className="flex flex-col rounded-2xl border border-[#EAECF0] p-6">
      <h3 className="font-anek font-bold text-xl text-[#0b2540] mb-2">{addOn.title}</h3>
      <p className="font-noto text-sm leading-relaxed text-[#475467] mb-4">{addOn.detail}</p>
      {addOn.integratedWith && (
        <div className="mb-4">
          <p className="font-noto text-xs font-medium uppercase tracking-wider text-[#667085] mb-2">Already integrated with</p>
          <div className="grid grid-cols-2 gap-2">
            {addOn.integratedWith.map(({ name, logo }) => (
              <div key={name} className="relative h-16 rounded-lg border border-[#EAECF0] bg-white" title={name}>
                <Image src={logo} alt={name} fill sizes="160px" className="object-contain px-4 py-2.5" />
              </div>
            ))}
          </div>
        </div>
      )}
      <ul className="space-y-2 mb-6 flex-1">
        {addOn.points.map(point => (
          <li key={point} className="flex gap-2 font-noto text-sm text-[#344054]">
            <Check size={16} className="flex-shrink-0 text-[#419372] mt-0.5" />
            {point}
          </li>
        ))}
      </ul>
      {/* Same button style as the plan cards, after the content */}
      <Link href={`/contact?quote=${encodeURIComponent(addOn.quoteFor)}`} className={`${secondaryButton} self-start`}>
        Get a Quote
      </Link>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F5F5] pt-[72px]">
        {/* Hero */}
        <Section spacing="sm" className="bg-white py-8 md:py-12">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-anek font-medium text-sm md:text-base leading-tight text-[#fba47e] uppercase mb-3">
                PRICING
              </p>
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540] mb-4">
                Free Software. Pay Only For Help And Hosting.
              </h1>
              <p className="font-noto text-base md:text-lg leading-relaxed text-[#000000]/70 mb-6">
                Plans cover a one-time cost to build your app, and a monthly cost to host it on the Avni cloud.
              </p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {['Open source', 'No licence fee', 'First month of hosting free'].map(point => (
                  <span key={point} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8F3EE] font-noto text-sm font-medium text-[#1f5a43]">
                    <Check size={15} /> {point}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Plans */}
        <Section spacing="md">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plans.map(plan => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col bg-white rounded-2xl p-6 md:p-8 ${plan.badge ? 'shadow-lg ring-2 ring-[#419372]' : 'shadow-sm'}`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#419372] text-white font-anek font-medium text-xs uppercase tracking-wider whitespace-nowrap">
                      {plan.badge}
                    </span>
                  )}
                  <h2 className="font-anek font-bold text-2xl text-[#0b2540] mb-1">{plan.name}</h2>
                  <p className="font-noto text-sm text-[#475467] min-h-[40px] mb-5">{plan.bestFor}</p>
                  <p className="font-anek font-bold text-4xl text-[#0b2540]">{plan.price}</p>
                  <p className="font-noto text-sm text-[#667085] mb-6">{plan.priceNote}</p>
                  <Link href={plan.cta.href} className={`${plan.badge ? primaryButton : secondaryButton} w-full mb-8`}>
                    {plan.cta.label}
                  </Link>

                  <p className="font-anek font-semibold text-sm uppercase tracking-wider text-[#667085] mb-3">What you get</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(feature => (
                      <li key={feature.label} className="flex gap-3 font-noto text-sm leading-relaxed text-[#344054]">
                        <Check size={18} className="flex-shrink-0 text-[#419372] mt-0.5" />
                        <span><strong className="font-semibold text-[#0b2540]">{feature.label}:</strong> {feature.detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5 border-t border-[#EAECF0]">
                    <p className="font-anek font-semibold text-sm uppercase tracking-wider text-[#667085] mb-3">{plan.hostingTitle}</p>
                    <dl className="space-y-2">
                      {plan.hosting.map(row => (
                        <div key={row.size} className="flex justify-between gap-4 font-noto text-sm">
                          <dt className="text-[#475467]">
                            {row.size}
                            {row.limits && <span className="block text-xs text-[#98A2B3]">{row.limits}</span>}
                          </dt>
                          <dd className="font-semibold text-[#0b2540] text-right">
                            {row.price}{row.price.startsWith('₹') && <span className="font-normal text-[#667085]"> /month</span>}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              ))}
            </div>

            <p className="max-w-6xl mx-auto mt-4 text-center font-noto text-sm text-[#667085]">
              Hosting is paid upfront for the year. All prices exclude taxes.
            </p>

            <div className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <h3 className="font-anek font-bold text-xl text-[#0b2540] mb-5">Every hosting plan includes</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                {hostingIncludes.map(item => (
                  <li key={item} className="flex gap-3 font-noto text-sm text-[#344054]">
                    <Check size={18} className="flex-shrink-0 text-[#419372] mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* Custom needs */}
        <section className="bg-[#0b2540] py-12 md:py-16">
          <Container>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="font-anek font-bold text-2xl md:text-3xl text-white mb-2">Have custom needs?</h2>
                <p className="font-noto text-base text-white/80">
                  Large programmes or special requirements? Let&apos;s work out what fits you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <BookDemoLink className={primaryButton}>Book a Demo</BookDemoLink>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-full font-anek font-semibold text-base hover:bg-white hover:text-[#0b2540] transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Add-ons */}
        <Section spacing="md" className="bg-white">
          <Container>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-10">
                <h2 id="add-ons" className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-3 scroll-mt-28">Add-ons</h2>
                <p className="font-noto text-base text-[#475467]">Add these to any plan. Tell us what you need and we&apos;ll send a quote.</p>
              </div>
              {/* Short add-ons stack on the left, beside the taller Integrations card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6 [&>*]:flex-1">
                  {addOns.filter(addOn => !addOn.integratedWith).map(addOn => <AddOnCard key={addOn.title} addOn={addOn} />)}
                </div>
                {addOns.filter(addOn => addOn.integratedWith).map(addOn => <AddOnCard key={addOn.title} addOn={addOn} />)}
              </div>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section spacing="md">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] text-center mb-8 md:mb-10">
                Frequently Asked Questions
              </h2>
              <FaqList faqs={faqCategories.find(c => c.id === 'pricing')?.faqs ?? []} />
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
