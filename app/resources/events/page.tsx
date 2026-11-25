/**
 * Events Page
 * Shows the Avni events Google Calendar (same calendar as the old site), so the team
 * adds events in Google Calendar and they appear here without a site change
 */

import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Events - Avni',
  description: 'Upcoming Avni events, webinars, community meetups and conferences.',
  openGraph: {
    title: 'Events - Avni',
    description: 'Upcoming Avni events, webinars, community meetups and conferences.',
    url: '/resources/events',
  },
  alternates: {
    canonical: '/resources/events',
  },
};

const CALENDAR_ID = 'c_1f28563b52f3a01f8f7ceee9c339700e8dbb256a398571f131db0ec351c214de@group.calendar.google.com';

const calendarEmbedUrl = 'https://calendar.google.com/calendar/embed?' + new URLSearchParams({
  src: CALENDAR_ID,
  ctz: 'Asia/Kolkata',
  mode: 'AGENDA',
  wkst: '1',
  showPrint: '0',
  showNav: '0',
  showTitle: '0',
  showDate: '0',
  showCalendars: '0',
  showTabs: '0',
  color: '#419372',
}).toString();

export default function EventsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F5F5] pt-[72px]">
        <Section spacing="sm" className="bg-white py-8 md:py-12">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <p className="font-anek font-medium text-sm md:text-base leading-tight text-[#fba47e] uppercase mb-3">
                EVENTS
              </p>
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540] mb-3">
                Event Calendar
              </h1>
              <p className="font-noto text-base md:text-lg lg:text-xl leading-relaxed text-[#000000]/70">
                Webinars, community meetups and conferences from the Avni team
              </p>
            </div>
          </Container>
        </Section>

        <Section spacing="md">
          <Container>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-4 md:p-8">
              <iframe
                src={calendarEmbedUrl}
                title="Avni events calendar"
                className="w-full h-[600px] border-0"
                loading="lazy"
              />
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
