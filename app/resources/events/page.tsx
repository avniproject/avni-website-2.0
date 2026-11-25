/**
 * Events Page
 * Upcoming: read from the Avni Events Google Calendar when the site is built (lib/events.ts),
 * so the team keeps adding events in Google Calendar.
 * Past: blog posts in the Events category.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { CalendarPlus, MapPin, Video } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import { getUpcomingEvents, SUBSCRIBE_URL, CalendarEvent } from '@/lib/events';
import { getBlogsByCategory } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Events - Avni',
  description: 'Upcoming Avni webinars, community meetups and workshops, and stories from past events.',
  openGraph: {
    title: 'Events - Avni',
    description: 'Upcoming Avni webinars, community meetups and workshops, and stories from past events.',
    url: '/resources/events',
  },
  alternates: {
    canonical: '/resources/events',
  },
};

const PAST_EVENTS_SHOWN = 6;

const inIndia = (iso: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', ...options }).format(new Date(iso));

function EventCard({ event }: { event: CalendarEvent }) {
  const time = `${inIndia(event.start, { weekday: 'long', hour: 'numeric', minute: '2-digit' })} – ${inIndia(event.end, { hour: 'numeric', minute: '2-digit' })} IST`;

  return (
    <article className="flex gap-4 md:gap-6 bg-white rounded-2xl shadow-sm p-5 md:p-6">
      <div className="flex-shrink-0 w-16 md:w-20 h-16 md:h-20 rounded-xl bg-[#419372] text-white flex flex-col items-center justify-center">
        <span className="font-anek font-bold text-2xl md:text-3xl leading-none">{inIndia(event.start, { day: 'numeric' })}</span>
        <span className="font-anek font-medium text-xs md:text-sm uppercase tracking-wider mt-1">{inIndia(event.start, { month: 'short' })}</span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-anek font-bold text-lg md:text-xl leading-snug text-[#0b2540] mb-2">{event.title}</h3>
        <p className="font-noto text-sm text-[#475467] mb-1">{time}</p>
        <p className="font-noto text-sm text-[#475467] flex items-center gap-1.5 mb-3">
          {event.location ? <MapPin size={15} className="flex-shrink-0" /> : <Video size={15} className="flex-shrink-0" />}
          <span className="truncate">{event.location ?? 'Online'}</span>
        </p>
        {event.summary && (
          <p className="font-noto text-sm leading-relaxed text-[#344054] line-clamp-2 mb-4">{event.summary}</p>
        )}
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2 bg-[#419372] text-white rounded-full font-anek font-medium text-sm hover:bg-[#357a5e] transition-colors"
          >
            Register
          </a>
        )}
      </div>
    </article>
  );
}

export default async function EventsPage() {
  const upcomingEvents = await getUpcomingEvents();
  const pastEvents = (await getBlogsByCategory('Events')).slice(0, PAST_EVENTS_SHOWN);

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
                Meet The Avni Community
              </h1>
              <p className="font-noto text-base md:text-lg lg:text-xl leading-relaxed text-[#000000]/70">
                Webinars, community meetups and workshops from the Avni team
              </p>
            </div>
          </Container>
        </Section>

        {/* Upcoming */}
        <Section spacing="md">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                <h2 className="font-anek font-bold text-2xl md:text-3xl text-[#0b2540]">Upcoming Events</h2>
                <a
                  href={SUBSCRIBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-noto font-medium text-sm text-[#2a7559] hover:text-[#1f5a43]"
                >
                  <CalendarPlus size={18} />
                  Add Avni events to your Google Calendar
                </a>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map(event => <EventCard key={event.id} event={event} />)}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                  <p className="font-noto text-base text-[#344054]">
                    No upcoming events right now. Follow us on{' '}
                    <a href="https://www.linkedin.com/showcase/avniproject/" target="_blank" rel="noopener noreferrer" className="text-[#2a7559] font-medium underline underline-offset-2">
                      LinkedIn
                    </a>{' '}
                    to hear about the next one.
                  </p>
                </div>
              )}
            </div>
          </Container>
        </Section>

        {/* Past */}
        {pastEvents.length > 0 && (
          <Section spacing="md" className="bg-white">
            <Container>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                <h2 className="font-anek font-bold text-2xl md:text-3xl text-[#0b2540]">From Past Events</h2>
                <Link href="/blog" className="font-noto font-medium text-sm text-[#2a7559] hover:text-[#1f5a43]">
                  More on the blog →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {pastEvents.map(blog => <BlogCard key={blog.slug} blog={blog} />)}
              </div>
            </Container>
          </Section>
        )}
      </main>

      <Footer />
    </>
  );
}
