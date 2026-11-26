/**
 * Events Calendar
 * "Next up" strip for the next event, then a month grid of Avni events.
 * Clicking an event (or, on phones, a day) opens its details in a pop-up.
 */

'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, PlayCircle, Video, X } from 'lucide-react';
import { CalendarEvent, EventKind, eventKind } from '@/lib/events';

interface EventsCalendarProps {
  events: CalendarEvent[];
}

const KIND_STYLES: Record<EventKind, { chip: string; dot: string }> = {
  'Webinar': { chip: 'bg-[#E8F3EE] text-[#1f5a43] hover:bg-[#d3eadf]', dot: 'bg-[#419372]' },
  'Community Meetup': { chip: 'bg-[#FFF1EA] text-[#B4441A] hover:bg-[#ffe2d4]', dot: 'bg-[#F27A45]' },
  'Workshop': { chip: 'bg-[#E9EEF5] text-[#0b2540] hover:bg-[#d8e1ee]', dot: 'bg-[#0b2540]' },
};

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// All dates are shown in India time, whatever the visitor's time zone
const ist = (iso: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', ...options }).format(new Date(iso));

// "2026-12-01" for an event's day in India time
const dayKey = (iso: string) => ist(iso, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');

const pad = (n: number) => String(n).padStart(2, '0');

interface Month { year: number; month: number } // month 0-11

function monthOf(iso: string): Month {
  const [year, month] = dayKey(iso).split('-').map(Number);
  return { year, month: month - 1 };
}

function shiftMonth({ year, month }: Month, by: number): Month {
  const d = new Date(Date.UTC(year, month + by, 1));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
}

const shortTime = (iso: string) => ist(iso, { hour: 'numeric', minute: '2-digit' }).replace(/\s([ap]m)$/i, '$1');

function RegisterButton({ event }: { event: CalendarEvent }) {
  if (!event.registrationUrl) return null;
  return (
    <a
      href={event.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-5 py-2 bg-[#419372] text-white rounded-full font-anek font-medium text-sm hover:bg-[#357a5e] transition-colors"
    >
      Register
    </a>
  );
}

function EventDetails({ event, isPast }: { event: CalendarEvent; isPast: boolean }) {
  const kind = eventKind(event.title);
  return (
    <div className="space-y-3">
      <span className="inline-flex items-center gap-1.5 font-noto text-xs text-[#667085]">
        <span className={`w-2 h-2 rounded-full ${KIND_STYLES[kind].dot}`} />
        {kind}{isPast ? ' · This event has ended' : ''}
      </span>
      <h3 className="font-anek font-bold text-xl md:text-2xl leading-snug text-[#0b2540]">{event.title}</h3>
      <div className="space-y-1.5">
        <p className="flex items-center gap-2 font-noto text-sm text-[#475467]">
          <Clock size={15} className="flex-shrink-0" />
          {ist(event.start, { weekday: 'long', day: 'numeric', month: 'long' })}, {shortTime(event.start)} – {shortTime(event.end)} IST
        </p>
        <p className="flex items-start gap-2 font-noto text-sm text-[#475467]">
          {event.location ? <MapPin size={15} className="flex-shrink-0 mt-0.5" /> : <Video size={15} className="flex-shrink-0 mt-0.5" />}
          {event.location ?? 'Online'}
        </p>
      </div>
      {event.summary && <p className="font-noto text-sm leading-relaxed text-[#344054]">{event.summary}</p>}
      {!isPast && <RegisterButton event={event} />}
      {isPast && event.recordingUrl && (
        <a
          href={event.recordingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 border-2 border-[#419372] text-[#2a7559] rounded-full font-anek font-medium text-sm hover:bg-[#419372] hover:text-white transition-colors"
        >
          <PlayCircle size={18} />
          Watch recording
        </a>
      )}
    </div>
  );
}

export default function EventsCalendar({ events }: EventsCalendarProps) {
  const [now, setNow] = useState<string | null>(null);
  const [visible, setVisible] = useState<Month>(() => monthOf(events.at(-1)?.start ?? new Date().toISOString()));
  const [openEvents, setOpenEvents] = useState<CalendarEvent[] | null>(null);

  // "Today" comes from the visitor's clock, not from when the site was built
  useEffect(() => {
    const today = new Date().toISOString();
    setNow(today);
    setVisible(monthOf(today));
  }, []);

  useEffect(() => {
    if (!openEvents) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenEvents(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openEvents]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const key = dayKey(event.start);
      map.set(key, [...(map.get(key) ?? []), event]);
    }
    return map;
  }, [events]);

  const nextEvent = now ? events.find(e => e.end >= now) : undefined;
  // Newest first; only YouTube links we can show a thumbnail for
  const recordings = events
    .map(event => ({ event, videoId: event.recordingUrl?.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1] }))
    .filter((r): r is { event: CalendarEvent; videoId: string } => Boolean(r.videoId))
    .reverse();
  const isPast = (event: CalendarEvent) => now !== null && event.end < now;
  const monthPrefix = `${visible.year}-${pad(visible.month + 1)}`;
  const todayKey = now ? dayKey(now) : null;

  // Grid cells from the Monday on or before the 1st to fill whole weeks
  const firstWeekday = (new Date(Date.UTC(visible.year, visible.month, 1)).getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(visible.year, visible.month + 1, 0)).getUTCDate();
  const cells = Array.from({ length: Math.ceil((firstWeekday + daysInMonth) / 7) * 7 }, (_, i) => {
    const day = i - firstWeekday + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });

  const monthLabel = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(visible.year, visible.month, 1)));

  return (
    <div className="space-y-6">
      {/* Next up */}
      {nextEvent && (
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4 border-l-4 border-[#419372]">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#419372] text-white flex flex-col items-center justify-center">
            <span className="font-anek font-bold text-xl leading-none">{ist(nextEvent.start, { day: 'numeric' })}</span>
            <span className="font-anek text-[11px] uppercase tracking-wider">{ist(nextEvent.start, { month: 'short' })}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-noto text-xs font-medium uppercase tracking-wider text-[#fba47e] mb-0.5">Next up</p>
            <p className="font-anek font-semibold text-lg leading-snug text-[#0b2540]">{nextEvent.title}</p>
            <p className="font-noto text-sm text-[#475467]">
              {ist(nextEvent.start, { weekday: 'long' })}, {shortTime(nextEvent.start)} IST · {nextEvent.location ?? 'Online'}
            </p>
          </div>
          <RegisterButton event={nextEvent} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6">
      {/* Month grid */}
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="font-anek font-bold text-xl md:text-2xl text-[#0b2540]">{monthLabel}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => now && setVisible(monthOf(now))}
              className="px-3 py-1.5 rounded-full border border-[#D0D5DD] font-noto text-sm text-[#344054] hover:border-[#419372] hover:text-[#2a7559]"
            >
              Today
            </button>
            <button onClick={() => setVisible(v => shiftMonth(v, -1))} aria-label="Previous month" className="p-1.5 rounded-full hover:bg-gray-100 text-[#344054]">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => setVisible(v => shiftMonth(v, 1))} aria-label="Next month" className="p-1.5 rounded-full hover:bg-gray-100 text-[#344054]">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-t border-l border-[#EAECF0] rounded-lg overflow-hidden">
          {WEEKDAYS.map(d => (
            <div key={d} className="border-r border-b border-[#EAECF0] bg-[#F9FAFB] py-2 text-center font-noto text-xs font-medium text-[#667085] uppercase">
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            const key = day ? `${monthPrefix}-${pad(day)}` : null;
            const dayEvents = key ? eventsByDay.get(key) ?? [] : [];
            const isToday = key === todayKey;
            const cellClass = `border-r border-b border-[#EAECF0] min-h-[56px] md:min-h-[112px] p-1 md:p-1.5 text-left align-top ${day ? 'bg-white' : 'bg-[#FCFCFD]'}`;
            const dayNumber = day && (
              <span className={`inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full font-noto text-xs md:text-sm ${isToday ? 'bg-[#419372] text-white font-semibold' : 'text-[#344054]'}`}>
                {day}
              </span>
            );
            return (
              <div key={i} className={cellClass}>
                {/* Phones: the whole day is a button with a dot per event */}
                {dayEvents.length > 0 ? (
                  <button onClick={() => setOpenEvents(dayEvents)} className="md:hidden w-full h-full text-left" aria-label={`Events on ${day} ${monthLabel}`}>
                    {dayNumber}
                    <span className="flex flex-wrap gap-1 mt-1 px-0.5">
                      {dayEvents.map(event => <span key={event.id} className={`w-2 h-2 rounded-full ${KIND_STYLES[eventKind(event.title)].dot} ${isPast(event) ? 'opacity-40' : ''}`} />)}
                    </span>
                  </button>
                ) : (
                  <span className="md:hidden">{dayNumber}</span>
                )}
                {/* Larger screens: a chip per event */}
                <div className="hidden md:block">
                  {dayNumber}
                  <div className="space-y-1 mt-1">
                    {dayEvents.map(event => (
                      <button
                        key={event.id}
                        onClick={() => setOpenEvents([event])}
                        className={`block w-full text-left rounded-md px-1.5 py-1 font-noto text-[11px] leading-[14px] font-medium transition-colors cursor-pointer ${KIND_STYLES[eventKind(event.title)].chip} ${isPast(event) ? 'opacity-60' : ''}`}
                        title={event.title}
                      >
                        <span className="flex items-center gap-1 opacity-75">
                          {shortTime(event.start)}
                          {isPast(event) && event.recordingUrl && <PlayCircle size={11} aria-label="Recording available" />}
                        </span>
                        <span className="line-clamp-2">{event.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
          <div className="flex flex-wrap gap-4">
            {(Object.keys(KIND_STYLES) as EventKind[]).map(kind => (
              <span key={kind} className="inline-flex items-center gap-1.5 font-noto text-xs text-[#475467]">
                <span className={`w-2.5 h-2.5 rounded-full ${KIND_STYLES[kind].dot}`} />
                {kind}
              </span>
            ))}
          </div>
          <span className="font-noto text-xs text-[#667085]">Click an event for details · Times in IST</span>
        </div>
      </div>

      {/* Recordings: on larger screens a column as tall as the calendar, scrolling inside */}
      {recordings.length > 0 && (
        <div className="lg:relative">
          <div className="lg:absolute lg:inset-0 flex flex-col bg-white rounded-2xl shadow-sm p-4 md:p-5">
            <h3 className="font-anek font-bold text-lg text-[#0b2540] mb-1">Meetup recordings</h3>
            <p className="font-noto text-xs text-[#667085] mb-4">Watch past community meetups on YouTube</p>
            <ul className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto -mx-1 px-1 pb-1 lg:flex-1 lg:min-h-0">
              {recordings.map(({ event, videoId }) => (
                <li key={event.id} className="flex-shrink-0 w-56 lg:w-auto">
                  <a href={event.recordingUrl!} target="_blank" rel="noopener noreferrer" className="group block">
                    <span className="relative block aspect-video rounded-lg overflow-hidden bg-[#EAECF0]">
                      {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail */}
                      <img src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                        <PlayCircle size={36} className="text-white drop-shadow" />
                      </span>
                    </span>
                    <span className="block font-noto text-xs text-[#667085] mt-2">{ist(event.start, { month: 'long', year: 'numeric' })}</span>
                    <span className="font-anek font-semibold text-sm leading-snug text-[#0b2540] group-hover:text-[#2a7559] line-clamp-2">{event.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      </div>

      {/* Event details pop-up */}
      {openEvents && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={() => setOpenEvents(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative bg-white w-full sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-xl p-6 md:p-8"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setOpenEvents(null)} aria-label="Close" className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-[#667085]">
              <X size={20} />
            </button>
            <div className="divide-y divide-[#EAECF0] [&>*:not(:first-child)]:pt-6 [&>*:not(:last-child)]:pb-6">
              {openEvents.map(event => <EventDetails key={event.id} event={event} isPast={isPast(event)} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
