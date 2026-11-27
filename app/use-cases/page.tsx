'use client';

/**
 * Use Cases Page
 * Showcases different use cases with alternating image-text layouts
 * Supports anchor links for direct navigation from dropdown
 */

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const useCases = [
  {
    id: 'case-management',
    title: 'Case Management',
    description: 'Follow every person, household or group over months and years, not just one form at a time. Register them once, enrol them in programmes, and record every visit, service and outcome against their profile. Avni schedules the next visit from your rules, flags who is due or at risk, and keeps the full history on the field worker’s phone, even offline.',
    image: '/img/2024-09-17-My-First-Field-Visit-to-Harsha-Trust-Seeing-Avni’s-Impact-in-Action/APF_Blog_5.webp',
    features: [
      'Individual And Household Profiles',
      'Programme Enrolment And Exit',
      'Automatic Visit Scheduling',
      'Due And Overdue Visit Lists',
      'Risk Flags And Recommendations',
      'Full Case History, Offline'
    ],
    commonUseCases: [
      'MATERNAL AND CHILD HEALTH',
      'NUTRITION PROGRAMMES',
      'SOCIAL SECURITY ACCESS',
      'WASTE PICKER SUPPORT'
    ],
    stories: [
      { name: 'Calcutta Kids', href: '/resources/case-studies/calcutta-kids-avni-implemented-for-maternal-and-child-health-program/' },
      { name: 'Hasiru Dala', href: '/resources/case-studies/2025-08-01-empowering-waste-pickers/' },
      { name: 'Purna Clinic', href: '/resources/case-studies/2026-05-05-purna-clinic-tide-trust-dangs/' }
    ],
    imagePosition: 'right'
  },
  {
    id: 'reporting',
    title: 'Reporting',
    description: 'All field data comes together in one place, so programme managers stop chasing spreadsheets. Field workers see their own numbers in dashboard cards on the phone, even offline. Managers and funders get dashboards in Metabase or Superset, set up on the Avni cloud, and anyone can download exports with each person’s full history for deeper analysis.',
    image: '/img/shelter-remoulding-data-collection/SA_slum_data_dashboard_on_website.webp',
    imageFit: 'contain',
    features: [
      'Dashboards In Metabase Or Superset',
      'Offline Dashboard Cards On The Phone',
      'Longitudinal Data Exports',
      'Filters By Location And Programme',
      'API To Your Other Systems',
      'Access Control On Reports'
    ],
    commonUseCases: [
      'PROGRAMME MONITORING',
      'FUNDER AND GOVERNMENT REPORTING',
      'PUBLIC DASHBOARDS',
      'IMPACT MEASUREMENT'
    ],
    stories: [
      { name: 'Shelter Associates', href: '/blog/shelter-journey-remoulding-data-collection-paper-kobotoolbox-avni/' },
      { name: 'Arghyam, Jal Jeevan Mission', href: '/resources/case-studies/2024-11-11-jal-jeevan-mission-arghyam/' }
    ],
    imagePosition: 'left'
  },
  {
    id: 'surveys',
    title: 'Surveys',
    description: 'Run one-time or repeated surveys across thousands of households, without internet. Build the questionnaire in the browser with skip logic and validations, send it to surveyors’ phones, and watch responses arrive as they sync. A survey can also become the starting point of a programme: the households you survey today are the people you follow up tomorrow.',
    image: '/img/shelter-remoulding-data-collection/SA_surveyors_using_android_technology_for_data_collection.webp',
    features: [
      'Questionnaires Built In The Browser',
      'Skip Logic And Validations',
      'Works Offline, Syncs Later',
      'Photos And GPS Location',
      'Several Languages',
      'Follow Up Surveyed Households'
    ],
    commonUseCases: [
      'HOUSEHOLD AND SLUM SURVEYS',
      'BASELINE AND ENDLINE',
      'EMERGENCY AND RELIEF',
      'ELIGIBILITY SCREENING'
    ],
    stories: [
      { name: 'Shelter Associates', href: '/blog/shelter-journey-remoulding-data-collection-paper-kobotoolbox-avni/' },
      { name: 'Maha PECOnet', href: '/resources/case-studies/mahapeconet-use-of-avni-in-covid-relief/' }
    ],
    imagePosition: 'right'
  },
  {
    id: 'cohort-studies',
    title: 'Cohort Based Research Study',
    description: 'Research studies follow the same people over time: a defined population visited again and again, with every visit linked to the person. Avni keeps each participant’s full record across rounds, schedules follow-ups, and lets you export the complete history for analysis. It is used to run health and demographic surveillance sites that support long-term studies.',
    image: '/img/yenepoya-visit-20-06-2024/Continuum-of-care.webp',
    features: [
      'Defined Study Population',
      'Repeated Visits Linked To Each Person',
      'Follow-Up Scheduling',
      'Data Validations At Entry',
      'Longitudinal Exports For Analysis',
      'Role-Based Access To Data'
    ],
    commonUseCases: [
      'HEALTH AND DEMOGRAPHIC SURVEILLANCE',
      'LONGITUDINAL STUDIES',
      'PROGRAMME EVALUATIONS',
      'PUBLIC HEALTH RESEARCH'
    ],
    stories: [
      { name: 'Yenepoya HDSS', href: '/blog/2024-06-20-yenepoya-visit/' }
    ],
    imagePosition: 'left'
  },
  {
    id: 'mobile-medical',
    title: 'Mobile Medical Unit & Camps',
    description: 'A health camp or mobile medical unit sees dozens of patients in a day, often with no internet. Registration, check-up, consultation and medicines happen at different desks, so on paper, or on phones that cannot share, the same patient gets registered twice and follow-up gets lost. With Avni’s camp mode, every phone in the camp shares records through one phone acting as a hub, without internet: a patient registered at the front desk appears straight away for the nurse, doctor and pharmacist. Each phone syncs with the server when the camp ends.',
    image: '/img/camp-mode/camp-mode-cover.webp',
    features: [
      'Camp Mode: Phones Share Records Offline',
      'One Registration Per Patient',
      'Desk-By-Desk Patient Flow',
      'Screening And Consultation Forms',
      'Referrals And Follow-Up After The Camp',
      'Sync With The Server When The Camp Ends'
    ],
    commonUseCases: [
      'MOBILE MEDICAL UNITS',
      'HEALTH CAMPS',
      'EYE CARE CAMPS',
      'LEGAL AID AND SURVEY CAMPS'
    ],
    stories: [
      { name: 'Camp mode: how it works', href: '/blog/2026-10-29-camp-mode/' },
      { name: 'Project Chashma eye camps', href: '/resources/case-studies/2024-05-22-empowering-vision-care-chashma-tech4dev/' }
    ],
    imagePosition: 'right'
  }
];

function UseCasesContent() {
  // Menu links use #section anchors; ?section= is an older form of the same link
  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get('section');
    const element = section ? document.getElementById(section) : null;
    if (element) {
      setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, []);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-[72px]">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-16 xl:px-24 py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto text-center">
            <p className="font-anek font-bold text-[14px] leading-[20px] text-[#fba57f] uppercase tracking-[0.5px] mb-6">
              AVNI USE CASES
            </p>
            
            <h1 className="font-anek font-bold text-[36px] lg:text-[48px] leading-[1.2] text-[#0a1f3d] mb-6">
              Solutions That Work For{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Every</span>
                <span className="absolute bottom-[4px] left-0 right-0 h-[8px] bg-[#FFD84D] -z-0"></span>
              </span>
              {' '}Use Case
            </h1>
            
            <p className="font-noto text-[17px] lg:text-[19px] leading-[1.6] text-[#5a6c7d] max-w-[720px] mx-auto">
              Whether you're managing cases, running surveys, or tracking impact, Avni adapts to your workflow — empowering NGOs across sectors to digitize their programs with ease.
            </p>
          </div>
        </section>

        {/* Use Cases Sections */}
        {useCases.map((useCase, index) => (
          <section
            key={useCase.id}
            id={useCase.id}
            className={`relative px-6 lg:px-16 xl:px-24 py-12 lg:py-16 scroll-mt-24 ${
              index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
            }`}
          >
            <div className="max-w-[1200px] mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                useCase.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Text Content */}
                <div className={`space-y-6 ${useCase.imagePosition === 'left' ? 'lg:order-2' : ''}`}>
                  <h2 className="font-anek font-bold text-[28px] lg:text-[36px] leading-[1.2] text-[#0a1f3d]">
                    {useCase.title}
                  </h2>
                  
                  <p className="font-noto text-[16px] lg:text-[17px] leading-[1.7] text-[#5a6c7d]">
                    {useCase.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-4">
                    <h3 className="font-anek font-semibold text-[14px] uppercase tracking-wide text-[#0a1f3d]">
                      KEY FEATURES
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {useCase.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="relative w-[17px] h-[17px] flex-shrink-0">
                            <Image
                              src="/icons/general/tick.svg"
                              alt="Check"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="font-noto text-[15px] text-[#5a6c7d]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Use Cases */}
                  <div className="space-y-3">
                    <h3 className="font-anek font-semibold text-[14px] uppercase tracking-wide text-[#0a1f3d]">
                      COMMON USE CASES
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {useCase.commonUseCases.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-[#fff5f0] text-[#fba57f] font-anek text-[13px] font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Real examples */}
                  {'stories' in useCase && useCase.stories && (
                    <p className="font-noto text-[15px] text-[#5a6c7d]">
                      <span className="font-anek font-semibold text-[14px] uppercase tracking-wide text-[#0a1f3d] mr-2">See it in action:</span>
                      {useCase.stories.map((story, i) => (
                        <span key={story.href}>
                          {i > 0 && ' · '}
                          <Link href={story.href} className="font-medium text-[#2a7559] underline decoration-[#419372]/40 underline-offset-2 hover:text-[#1f5a43]">
                            {story.name}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}

                  {/* Try Avni Button */}
                  <div className="pt-2">
                    <Link href="/signup" className="inline-block px-6 py-3 border-2 border-[#419372] text-[#419372] font-anek font-semibold text-[16px] rounded-full hover:bg-[#419372] hover:text-white transition-all">
                      Try Avni →
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className={`relative ${useCase.imagePosition === 'left' ? 'lg:order-1' : ''}`}>
                    <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden shadow-lg">
                    <Image
                      src={useCase.image}
                      alt={useCase.title}
                      fill
                      className={'imageFit' in useCase && useCase.imageFit === 'contain' ? 'object-contain bg-white p-4' : 'object-cover'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default function UseCasesPage() {
  return <UseCasesContent />;
}
