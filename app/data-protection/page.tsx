/**
 * Data Protection Page
 * How Avni protects beneficiary data today and prepares for India's DPDP Act. Content from
 * the Avni team's note "Avni and the DPDP Act: where we stand" (November 2026). It says
 * "preparing for" the Act on purpose: the Act takes full effect on 13 May 2027.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Download, FileCheck2, History, MapPin, ShieldAlert, Smartphone, Lock, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Data Protection and the DPDP Act - Avni',
  description: 'How Avni protects your beneficiaries’ data today, and how we are preparing for India’s Digital Personal Data Protection (DPDP) Act.',
  openGraph: {
    title: 'Data Protection and the DPDP Act - Avni',
    description: 'How Avni protects your beneficiaries’ data today, and how we are preparing for India’s DPDP Act.',
    url: '/data-protection',
  },
  alternates: {
    canonical: '/data-protection',
  },
};

const inPlace = [
  { icon: MapPin, title: 'Stored in India', detail: 'All data in Avni is stored in India, with backup copies at a second location in India.' },
  { icon: Lock, title: 'Encrypted', detail: 'Data is encrypted on our servers. Field workers’ phones can be encrypted too.' },
  { icon: Smartphone, title: 'Only what each worker needs', detail: 'A field worker’s phone holds only the records for their area.' },
  { icon: History, title: 'Every change recorded', detail: 'Each record shows who created it and who last changed it.' },
  { icon: Download, title: 'Controlled downloads', detail: 'Only users you authorise can download data in bulk.' },
  { icon: ShieldAlert, title: 'Incidents reported', detail: 'We report security incidents to CERT-In, and tell you quickly if your data is affected.' },
];

const timeline = [
  { when: 'December 2026', what: 'Training our own team on the Act' },
  { when: 'March 2027 (target)', what: 'Notice and consent in the app: on the phone, even offline, and on the web. Your team sets up your own notice.' },
  { when: 'March 2027 (target)', what: 'Personal data kept out of our support tools: login emails move to India, and monitoring tools receive no personal data' },
  { when: 'Before 13 May 2027', what: 'A contract update setting out what your organisation and Samanvay are each responsible for. Help to set up your notice and consent. We also aim to let your team record when a beneficiary withdraws consent.' },
  { when: '13 May 2027', what: 'The DPDP Act takes full effect' },
  { when: 'Second half of 2027', what: 'Avni can link to your organisation’s own consent system, if you keep data in other software too' },
];

const startNow = [
  'Choose one person to look after data protection, and include their contact details in your notice',
  'Write your notice in simple language, in the languages your beneficiaries speak: what data you collect, why, and their rights',
  'Plan how to share the notice with beneficiaries already in Avni; for field programmes this usually means visiting them',
  'If a field worker’s phone is lost or stolen, tell us within a day so we can block that user’s access',
];

export default function DataProtectionPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F5F5] pt-[72px]">
        <Section spacing="sm" className="bg-white py-8 md:py-12">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-anek font-medium text-sm md:text-base leading-tight text-[#fba47e] uppercase mb-3">
                DATA PROTECTION
              </p>
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540] mb-4">
                Your Beneficiaries’ Data, Protected
              </h1>
              <p className="font-noto text-base md:text-lg leading-relaxed text-[#000000]/70">
                How Avni protects personal data today, and how we are preparing with you for India’s Digital Personal
                Data Protection (DPDP) Act, which takes full effect on 13 May 2027.
              </p>
            </div>
          </Container>
        </Section>

        {/* In place today */}
        <Section spacing="md" bg="gray">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-8">In Place Today</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {inPlace.map(({ icon: Icon, title, detail }) => (
                  <div key={title} className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F3EE] text-[#2a7559] flex items-center justify-center mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-anek font-semibold text-lg text-[#0b2540] mb-1">{title}</h3>
                    <p className="font-noto text-sm leading-relaxed text-[#475467]">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Who is responsible */}
        <Section spacing="md">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-4">Who Is Responsible</h2>
              <p className="font-noto text-base md:text-lg leading-relaxed text-[#344054] mb-4">
                Your organisation decides what beneficiary data to collect and why, so it has the main responsibilities
                under the Act. Samanvay also has responsibilities, because we process that data on your behalf in Avni.
              </p>
              <p className="font-noto text-base md:text-lg leading-relaxed text-[#344054]">
                The Act covers details that can identify a person, such as a name or phone number, once they are in
                digital form, including paper records entered into Avni or uploaded as a photo. If your programme records
                only things like water sources, buildings or stock, much of it may not apply to you.
              </p>
            </div>
          </Container>
        </Section>

        {/* Timeline */}
        <Section spacing="md" bg="gray">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-3">Getting Ready for the DPDP Act</h2>
              <p className="font-noto text-base text-[#475467] mb-8">
                The biggest change for most programmes: from May 2027, field workers show new beneficiaries a notice and
                get their consent before registering them. For a child, a parent or guardian gives consent.
              </p>
              <ol className="relative border-l-2 border-[#B7DCCB] ml-2 space-y-7">
                {timeline.map(step => (
                  <li key={step.when + step.what} className="pl-6 relative">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#419372] border-4 border-[#F5F5F5]" />
                    <p className="font-anek font-semibold text-sm uppercase tracking-wider text-[#2a7559] mb-1">{step.when}</p>
                    <p className="font-noto text-base leading-relaxed text-[#344054]">{step.what}</p>
                  </li>
                ))}
              </ol>
              <p className="font-noto text-sm text-[#667085] mt-6">We’ll let you know early if any of these target dates change.</p>
            </div>
          </Container>
        </Section>

        {/* Start now */}
        <Section spacing="md">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-6">What Your Organisation Can Start On Now</h2>
              <ul className="space-y-4">
                {startNow.map(item => (
                  <li key={item} className="flex gap-3 font-noto text-base leading-relaxed text-[#344054]">
                    <Check size={20} className="flex-shrink-0 text-[#419372] mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* Contact */}
        <Section spacing="md" bg="gray">
          <Container>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
              <FileCheck2 size={40} className="flex-shrink-0 text-[#419372]" />
              <div className="flex-1">
                <h2 className="font-anek font-bold text-2xl text-[#0b2540] mb-1">Questions about your programme?</h2>
                <p className="font-noto text-base text-[#475467]">
                  Write to{' '}
                  <a href="mailto:avnisupport@samanvayfoundation.org" className="font-medium text-[#2a7559] underline underline-offset-2">avnisupport@samanvayfoundation.org</a>
                  , or see the{' '}
                  <Link href="/resources/faq" className="font-medium text-[#2a7559] underline underline-offset-2">FAQ</Link>.
                  For what the law asks of your organisation in particular, your legal adviser is the best person to ask.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
