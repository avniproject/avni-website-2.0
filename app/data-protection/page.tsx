/**
 * Data Protection Page
 * How Avni protects beneficiary data today and prepares for India's DPDP Act. Content from
 * the Avni team's note "Avni and the DPDP Act: where we stand" (November 2026). It says
 * "preparing for" the Act on purpose: the Act takes full effect on 13 May 2027.
 */

import { Metadata } from 'next';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Check, Copy, Download, FileCheck2, History, Lock, MapPin, Server, ShieldAlert, Smartphone,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import FadeIn from '@/components/ui/FadeIn';

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

// Accent colours from the site's palette (homepage oranges and yellows, newsletter lavender)
const TONES = {
  green: { tile: 'bg-[#E8F3EE] text-[#2a7559]', edge: 'border-t-[#419372]', solid: 'bg-[#419372]' },
  orange: { tile: 'bg-[#FFF1EA] text-[#C2410C]', edge: 'border-t-[#F27A45]', solid: 'bg-[#F27A45]' },
  yellow: { tile: 'bg-[#FFF8DB] text-[#A16207]', edge: 'border-t-[#F5C518]', solid: 'bg-[#E0A800]' },
  lavender: { tile: 'bg-[#E9EAF8] text-[#4F46A5]', edge: 'border-t-[#7C7BD9]', solid: 'bg-[#6D6BD0]' },
} as const;

// The path data takes, shown as a diagram
const dataJourney = [
  { icon: Smartphone, tone: TONES.orange, title: 'Field worker’s phone', detail: 'Holds only the records for their area. Phones can be encrypted.' },
  { icon: Server, tone: TONES.green, title: 'Avni servers in India', detail: 'Data is encrypted on our servers.' },
  { icon: Copy, tone: TONES.lavender, title: 'Backup in India', detail: 'Copies kept at a second location, also in India.' },
];

const safeguards = [
  { icon: History, tone: TONES.green, title: 'Every change recorded', detail: 'Each record shows who created it and who last changed it.' },
  { icon: Download, tone: TONES.yellow, title: 'Controlled downloads', detail: 'Only users you authorise can download data in bulk.' },
  { icon: ShieldAlert, tone: TONES.orange, title: 'Incidents reported', detail: 'We report security incidents to CERT-In, and tell you quickly if your data is affected.' },
];

const timeline = [
  { when: 'December 2026', what: 'Training our own team on the Act' },
  { when: 'March 2027 (target)', what: 'Notice and consent in the app, on the phone even offline, and on the web' },
  { when: 'March 2027 (target)', what: 'Personal data kept out of our support tools: login emails move to India, and monitoring tools receive no personal data' },
  { when: 'Before 13 May 2027', what: 'A contract update setting out what your organisation and Samanvay are each responsible for, and help to set up your notice and consent' },
  { when: '13 May 2027', what: 'The DPDP Act takes full effect', milestone: true },
  { when: 'Second half of 2027', what: 'Avni can link to your organisation’s own consent system, if you keep data in other software too' },
];

const startNow = [
  'Choose one person to look after data protection, and include their contact details in your notice',
  'Write your notice in simple language, in the languages your beneficiaries speak: what data you collect, why, and their rights',
  'Plan how to share the notice with beneficiaries already in Avni; for field programmes this usually means visiting them',
  'If a field worker’s phone is lost or stolen, tell us within a day so we can block that user’s access',
];

// A drawing of the planned consent step, not a screenshot: the feature is still being built
function ConsentMockup() {
  return (
    <div className="mx-auto w-[260px] rounded-[36px] bg-[#0b2540] p-3 shadow-2xl">
      <div className="rounded-[28px] bg-white overflow-hidden">
        <div className="bg-[#0b2540] px-4 pt-6 pb-3 text-white">
          <p className="font-noto text-[11px] opacity-70">Register beneficiary</p>
          <p className="font-anek font-semibold text-[15px]">Before you begin</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="rounded-xl bg-[#F6FBF8] border border-[#B7DCCB] p-3">
            <p className="font-anek font-semibold text-[12px] text-[#1f5a43] mb-1">Notice from your organisation</p>
            <div className="space-y-1.5">
              <div className="h-1.5 rounded bg-[#B7DCCB] w-full" />
              <div className="h-1.5 rounded bg-[#B7DCCB] w-[90%]" />
              <div className="h-1.5 rounded bg-[#B7DCCB] w-[75%]" />
            </div>
          </div>
          <p className="font-noto text-[11px] text-[#475467]">Consent given by</p>
          <div className="flex gap-2">
            <span className="flex-1 rounded-lg border-2 border-[#419372] bg-[#E8F3EE] py-1.5 text-center font-noto text-[11px] font-semibold text-[#1f5a43]">Beneficiary</span>
            <span className="flex-1 rounded-lg border border-[#D0D5DD] py-1.5 text-center font-noto text-[11px] text-[#475467]">Parent / guardian</span>
          </div>
          <label className="flex items-start gap-2 font-noto text-[11px] text-[#344054]">
            <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded bg-[#419372] text-white"><Check size={11} /></span>
            The notice was shown and consent was given
          </label>
          <div className="rounded-full bg-[#419372] py-2 text-center font-anek font-semibold text-[12px] text-white">Continue registration</div>
          <p className="text-center font-noto text-[10px] text-[#98A2B3]">Works offline</p>
        </div>
      </div>
    </div>
  );
}

export default function DataProtectionPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Hero: text beside a real field photo */}
        <section className="bg-white">
          <Container>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 lg:gap-16 items-center py-10 md:py-16">
              <div>
                <p className="font-anek font-medium text-sm md:text-base leading-tight text-[#fba47e] uppercase mb-3">
                  DATA PROTECTION
                </p>
                <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540] mb-5">
                  Your Beneficiaries’ Data, Protected
                </h1>
                <p className="font-noto text-base md:text-lg leading-relaxed text-[#475467] mb-6">
                  Field workers collect some of the most personal information there is: health, family, income. Here is
                  how Avni protects it today, and how we are preparing with you for India’s Digital Personal Data
                  Protection (DPDP) Act, which takes full effect on <strong className="text-[#0b2540]">13 May 2027</strong>.
                </p>
                <div className="flex flex-wrap gap-2">
                  {([['Stored in India', TONES.green], ['Encrypted', TONES.orange], ['Access you control', TONES.lavender]] as const).map(([point, tone]) => (
                    <span key={point} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-noto text-sm font-medium ${tone.tile}`}>
                      <Check size={15} /> {point}
                    </span>
                  ))}
                </div>
              </div>
              <figure className="relative">
                {/* Soft shapes behind the photo, like the homepage hero */}
                <div aria-hidden="true" className="absolute -top-8 -right-2 w-64 h-64 rounded-[40%] bg-[#FFD84D]/60 blur-xl" />
                <div aria-hidden="true" className="absolute -bottom-6 -left-4 w-72 h-72 rounded-[45%] bg-[#fba47e]/50 blur-xl" />
                <div className="relative aspect-[4/5] w-full max-w-[420px] mx-auto rounded-[28px] overflow-hidden shadow-xl ring-8 ring-white">
                  <Image
                    src="/img/data-protection/field-worker-phone.webp"
                    alt="A health worker’s hands holding a phone with the Avni app"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="relative max-w-[420px] mx-auto mt-3 font-noto text-xs text-[#98A2B3]">
                  A community health worker at ASHWINI, Nilgiris, using Avni. Names on the screen are blurred.
                </figcaption>
              </figure>
            </div>
          </Container>
        </section>

        {/* Data journey */}
        <Section spacing="md" bg="gray">
          <Container>
            <div className="max-w-6xl mx-auto">
              <FadeIn>
                <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-2">Where Your Data Lives</h2>
                <p className="font-noto text-base text-[#475467] mb-10">From the field worker’s phone to our servers, it never leaves India.</p>
              </FadeIn>

              <div className="relative rounded-3xl bg-white shadow-sm p-6 md:p-10">
                <span className="absolute -top-3 left-6 md:left-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b2540] font-noto text-xs font-semibold text-white">
                  <MapPin size={13} /> India
                </span>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-4 md:gap-2">
                  {dataJourney.map((step, i) => (
                    <Fragment key={step.title}>
                      <FadeIn delay={i * 150} className="flex md:flex-col items-center md:text-center gap-4 md:gap-3">
                        <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${step.tone.tile} flex items-center justify-center`}>
                          <step.icon size={30} />
                        </div>
                        <div>
                          <h3 className="font-anek font-semibold text-lg text-[#0b2540]">{step.title}</h3>
                          <p className="font-noto text-sm leading-relaxed text-[#475467] md:max-w-[220px]">{step.detail}</p>
                        </div>
                      </FadeIn>
                      {i < dataJourney.length - 1 && (
                        // Connector: a dashed line with a small label on it
                        <div className="hidden md:flex relative items-center w-36 lg:w-44 self-start mt-8" aria-hidden="true">
                          <div className="w-full border-t-2 border-dashed border-[#B7DCCB]" />
                          <span className="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-white border border-[#B7DCCB] px-2.5 py-1 font-noto text-[11px] font-medium text-[#2a7559]">
                            <Lock size={11} /> {i === 0 ? 'Encrypted sync' : 'Encrypted backup'}
                          </span>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                {safeguards.map(({ icon: Icon, tone, title, detail }, i) => (
                  <FadeIn key={title} delay={i * 120}>
                    <div className={`h-full bg-white rounded-2xl shadow-sm p-6 border-t-4 ${tone.edge}`}>
                      <div className={`w-10 h-10 rounded-xl ${tone.tile} flex items-center justify-center mb-3`}>
                        <Icon size={20} />
                      </div>
                      <h3 className="font-anek font-semibold text-lg text-[#0b2540] mb-1">{title}</h3>
                      <p className="font-noto text-sm leading-relaxed text-[#475467]">{detail}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Key statement */}
        <section className="bg-[#0b2540] py-14 md:py-20">
          <Container>
            <FadeIn>
              <p className="max-w-4xl mx-auto text-center font-anek font-semibold text-2xl md:text-4xl leading-snug text-white">
                Your organisation decides what data to collect and why.{' '}
                <span className="text-[#7FD1AE]">We look after it on your behalf, in India.</span>
              </p>
              <p className="max-w-3xl mx-auto text-center font-noto text-base text-white/70 mt-5">
                Under the Act, your organisation has the main responsibilities, and Samanvay has responsibilities too,
                because we process the data for you. It covers details that can identify a person, like a name or phone
                number. If your programme records only things like water sources, buildings or stock, much of it may not apply.
              </p>
            </FadeIn>
          </Container>
        </section>

        {/* Getting ready: timeline beside the consent drawing */}
        <Section spacing="md">
          <Container>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 lg:gap-16">
              <div>
                <FadeIn>
                  <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-3">Getting Ready for the DPDP Act</h2>
                  <p className="font-noto text-base text-[#475467] mb-8">
                    The biggest change for most programmes: from May 2027, field workers show new beneficiaries a notice
                    and get their consent before registering them. For a child, a parent or guardian gives consent.
                  </p>
                </FadeIn>
                <ol className="relative border-l-2 border-[#B7DCCB] ml-2 space-y-7">
                  {timeline.map((step, i) => (
                    <li key={step.when + step.what} className="pl-6 relative">
                      <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white ${step.milestone ? 'bg-[#F27A45] scale-125' : 'bg-[#419372]'}`} />
                      <FadeIn delay={i * 80}>
                        <p className={`font-anek font-semibold text-sm uppercase tracking-wider mb-1 ${step.milestone ? 'text-[#B4441A]' : 'text-[#2a7559]'}`}>{step.when}</p>
                        <p className={`font-noto leading-relaxed ${step.milestone ? 'text-lg font-semibold text-[#0b2540]' : 'text-base text-[#344054]'}`}>{step.what}</p>
                      </FadeIn>
                    </li>
                  ))}
                </ol>
                <p className="font-noto text-sm text-[#667085] mt-6">We’ll let you know early if any of these target dates change.</p>
              </div>

              <FadeIn className="lg:sticky lg:top-28 self-start">
                <ConsentMockup />
                <p className="text-center font-noto text-xs text-[#98A2B3] mt-4 max-w-[260px] mx-auto">
                  How the consent step is planned to look. An illustration; the feature is in development.
                </p>
              </FadeIn>
            </div>
          </Container>
        </Section>

        {/* Start now */}
        <Section spacing="md" bg="gray">
          <Container>
            <div className="max-w-6xl mx-auto">
              <FadeIn>
                <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-8">What Your Organisation Can Start On Now</h2>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {startNow.map((item, i) => (
                  <FadeIn key={item} delay={i * 100}>
                    <div className="h-full flex gap-4 bg-white rounded-2xl shadow-sm p-6">
                      <span className={`flex-shrink-0 w-9 h-9 rounded-full ${[TONES.green, TONES.orange, TONES.lavender, TONES.yellow][i % 4].solid} text-white font-anek font-bold flex items-center justify-center`}>{i + 1}</span>
                      <p className="font-noto text-base leading-relaxed text-[#344054]">{item}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Contact */}
        <Section spacing="md">
          <Container>
            <FadeIn>
              <div className="max-w-4xl mx-auto rounded-2xl bg-[#E8F3EE] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
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
            </FadeIn>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
