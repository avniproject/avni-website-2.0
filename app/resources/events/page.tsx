/**
 * Events Page
 * Calendar: read from the Avni Events Google Calendar when the site is built (lib/events.ts),
 * so the team keeps adding events in Google Calendar.
 * Past: blog posts in the Events category.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { CalendarPlus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import EventsCalendar from '@/components/events/EventsCalendar';
import { getAllEvents, SUBSCRIBE_URL } from '@/lib/events';
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

export default async function EventsPage() {
  const events = await getAllEvents();
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

        {/* Calendar */}
        <Section spacing="md">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <h2 className="font-anek font-bold text-2xl md:text-3xl text-[#0b2540]">Event Calendar</h2>
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
            <EventsCalendar events={events} />
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
