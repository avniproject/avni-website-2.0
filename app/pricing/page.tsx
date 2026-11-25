/**
 * Pricing Page
 * Plans, Avni Cloud Hosting prices and guidance. All prices live in data/pricing.ts
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BookDemoLink from '@/components/ui/BookDemoLink';
import { plans, hostingTiers, hostingIncludes, planGuidance, Plan } from '@/data/pricing';

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

function PlanButton({ plan }: { plan: Plan }) {
  const className = `block w-full text-center px-6 py-3 rounded-full font-anek font-semibold text-base transition-colors ${
    plan.highlighted
      ? 'bg-[#419372] text-white hover:bg-[#357a5e]'
      : 'border-2 border-[#419372] text-[#2a7559] hover:bg-[#419372] hover:text-white'
  }`;
  if (plan.cta.action === 'demo') return <BookDemoLink className={className}>{plan.cta.label}</BookDemoLink>;
  return <Link href={plan.cta.action === 'signup' ? '/signup' : '/contact'} className={className}>{plan.cta.label}</Link>;
}

export default function PricingPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F5F5] pt-[72px]">
        <Section spacing="sm" className="bg-white py-8 md:py-12">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-anek font-medium text-sm md:text-base leading-tight text-[#fba47e] uppercase mb-3">
                PRICING
              </p>
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540] mb-4">
                Free Software. Pay Only For Help And Hosting.
              </h1>
              <p className="font-noto text-base md:text-lg leading-relaxed text-[#000000]/70">
                Avni is fully open source, so the software itself is free. Our plans cover a one-time cost to build your
                app, and a monthly cost to host it on the Avni cloud.
              </p>
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
                  className={`relative flex flex-col bg-white rounded-2xl p-6 md:p-8 ${
                    plan.highlighted ? 'shadow-lg ring-2 ring-[#419372]' : 'shadow-sm'
                  }`}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#419372] text-white font-anek font-medium text-xs uppercase tracking-wider">
                      Includes training
                    </span>
                  )}
                  <h2 className="font-anek font-bold text-2xl text-[#0b2540] mb-1">{plan.name}</h2>
                  <p className="font-noto text-sm text-[#475467] mb-6">{plan.tagline}</p>
                  <p className="font-anek font-bold text-4xl text-[#0b2540]">{plan.price}</p>
                  <p className="font-noto text-sm text-[#667085] mb-6">{plan.priceNote}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex gap-3 font-noto text-sm leading-relaxed text-[#344054]">
                        <Check size={18} className="flex-shrink-0 text-[#419372] mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <PlanButton plan={plan} />
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Hosting */}
        <Section spacing="md" className="bg-white">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-3">Avni Cloud Hosting</h2>
                <p className="font-noto text-base text-[#475467]">
                  Once your app is built, we host it for you. Prices are per month, paid upfront annually.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#EAECF0]">
                <table className="w-full min-w-[560px] text-left">
                  <thead className="bg-[#F9FAFB]">
                    <tr>
                      <th className="p-4 md:p-5 font-anek font-semibold text-sm text-[#475467]">Programme size</th>
                      <th className="p-4 md:p-5 font-anek font-semibold text-sm text-[#475467]">Self-Service &amp; Assisted</th>
                      <th className="p-4 md:p-5 font-anek font-semibold text-sm text-[#475467]">Avni Managed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hostingTiers.map(tier => (
                      <tr key={tier.size} className="border-t border-[#EAECF0]">
                        <td className="p-4 md:p-5">
                          <p className="font-anek font-semibold text-base text-[#0b2540]">{tier.size}</p>
                          <p className="font-noto text-sm text-[#667085]">{tier.limits}</p>
                        </td>
                        <td className="p-4 md:p-5 font-anek font-semibold text-lg text-[#0b2540]">{tier.selfService}</td>
                        <td className="p-4 md:p-5 font-anek font-semibold text-lg text-[#0b2540]">{tier.managed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-noto text-sm text-[#667085] mt-3">
                Self-Service and Assisted plans include the first month free. All prices are exclusive of taxes.
              </p>

              <h3 className="font-anek font-bold text-xl md:text-2xl text-[#0b2540] mt-12 mb-5">Every hosting plan includes</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {hostingIncludes.map(item => (
                  <li key={item} className="flex gap-3 font-noto text-base text-[#344054]">
                    <Check size={20} className="flex-shrink-0 text-[#419372] mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* Which plan */}
        <Section spacing="md">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] text-center mb-8 md:mb-10">
                Which Plan Is Right For You?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {planGuidance.map(item => (
                  <div key={item.plan} className="bg-white rounded-2xl shadow-sm p-6">
                    <p className="font-anek font-medium text-sm uppercase tracking-wider text-[#fba47e] mb-2">{item.plan}</p>
                    <h3 className="font-anek font-bold text-xl text-[#0b2540] mb-3">{item.when}</h3>
                    <p className="font-noto text-sm leading-relaxed text-[#475467]">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="font-noto text-base text-[#344054] mb-5">Not sure yet? Talk it through with our team.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <BookDemoLink className="px-8 py-3 bg-[#419372] text-white rounded-full font-anek font-medium text-base hover:bg-[#357a5e] transition-colors">
                    Book a Demo
                  </BookDemoLink>
                  <Link href="/contact" className="px-8 py-3 border-2 border-[#419372] text-[#2a7559] rounded-full font-anek font-medium text-base hover:bg-[#419372] hover:text-white transition-colors">
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
