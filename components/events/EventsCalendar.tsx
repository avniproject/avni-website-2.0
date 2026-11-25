/**
 * Events Calendar
 * Month grid of Avni events with a side panel listing the month's events.
 * Clicking an event, in the grid or the list, shows its details.
 */

'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Video } from 'lucide-react';
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

function timeRange(event: CalendarEvent) {
  return `${ist(event.start, { hour: 'numeric', minute: '2-digit' })} – ${ist(event.end, { hour: 'numeric', minute: '2-digit' })} IST`;
}

export default function EventsCalendar({ events }: EventsCalendarProps) {
  const [now, setNow] = useState<string | null>(null);
  const [visible, setVisible] = useState<Month>(() => monthOf(events.at(-1)?.start ?? new Date().toISOString()));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // "Today" comes from the visitor's clock, not from when the site was built
  useEffect(() => {
    const today = new Date().toISOString();
    setNow(today);
    setVisible(monthOf(today));
    const next = events.find(e => e.end >= today);
    if (next) setSelectedId(next.id);
  }, [events]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const key = dayKey(event.start);
      map.set(key, [...(map.get(key) ?? []), event]);
    }
    return map;
  }, [events]);

  const monthPrefix = `${visible.year}-${pad(visible.month + 1)}`;
  const monthEvents = events.filter(e => dayKey(e.start).startsWith(monthPrefix));
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

  const select = (event: CalendarEvent) => setSelectedId(id => (id === event.id ? null : event.id));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6">
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
            return (
              <div key={i} className={`border-r border-b border-[#EAECF0] min-h-[56px] md:min-h-[104px] p-1 md:p-1.5 ${day ? 'bg-white' : 'bg-[#FCFCFD]'}`}>
                {day && (
                  <>
                    <span className={`inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full font-noto text-xs md:text-sm ${isToday ? 'bg-[#419372] text-white font-semibold' : 'text-[#344054]'}`}>
                      {day}
                    </span>
                    {/* Chips on larger screens, dots on phones */}
                    <div className="hidden md:block space-y-1 mt-1">
                      {dayEvents.map(event => (
                        <button
                          key={event.id}
                          onClick={() => select(event)}
                          className={`block w-full text-left truncate rounded px-1.5 py-0.5 font-noto text-[11px] leading-4 font-medium transition-colors ${KIND_STYLES[eventKind(event.title)].chip} ${selectedId === event.id ? 'ring-2 ring-[#419372]' : ''}`}
                          title={event.title}
                        >
                          {ist(event.start, { hour: 'numeric', minute: '2-digit' }).replace(/\s?[ap]m$/i, m => m.trim().toLowerCase())} {event.title}
                        </button>
                      ))}
                    </div>
                    <div className="flex md:hidden flex-wrap gap-1 mt-1 px-0.5">
                      {dayEvents.map(event => (
                        <button key={event.id} onClick={() => select(event)} aria-label={event.title} className={`w-2 h-2 rounded-full ${KIND_STYLES[eventKind(event.title)].dot}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {(Object.keys(KIND_STYLES) as EventKind[]).map(kind => (
            <span key={kind} className="inline-flex items-center gap-1.5 font-noto text-xs text-[#475467]">
              <span className={`w-2.5 h-2.5 rounded-full ${KIND_STYLES[kind].dot}`} />
              {kind}
            </span>
          ))}
        </div>
      </div>

      {/* This month's events */}
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 lg:max-h-[760px] lg:overflow-y-auto">
        <h3 className="font-anek font-bold text-lg md:text-xl text-[#0b2540] mb-4">
          Events in {monthLabel.split(' ')[0]}
        </h3>
        {monthEvents.length === 0 && (
          <p className="font-noto text-sm text-[#667085]">No events this month.</p>
        )}
        <ul className="space-y-3">
          {monthEvents.map(event => {
            const isOpen = selectedId === event.id;
            const isPast = now !== null && event.end < now;
            const kind = eventKind(event.title);
            return (
              <li key={event.id} className={`rounded-xl border transition-colors ${isOpen ? 'border-[#419372] bg-[#F6FBF8]' : 'border-[#EAECF0] hover:border-[#B7DCCB]'}`}>
                <button onClick={() => select(event)} className="w-full text-left flex gap-3 p-3" aria-expanded={isOpen}>
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center ${isPast ? 'bg-[#F2F4F7] text-[#667085]' : 'bg-[#419372] text-white'}`}>
                    <span className="font-anek font-bold text-lg leading-none">{ist(event.start, { day: 'numeric' })}</span>
                    <span className="font-anek text-[10px] uppercase tracking-wider">{ist(event.start, { weekday: 'short' })}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1.5 font-noto text-[11px] text-[#667085] mb-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${KIND_STYLES[kind].dot}`} />
                      {kind}{isPast ? ' · Past' : ''}
                    </span>
                    <p className="font-anek font-semibold text-base leading-snug text-[#0b2540]">{event.title}</p>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-3 pb-4 pl-[72px] space-y-2">
                    <p className="flex items-center gap-1.5 font-noto text-sm text-[#475467]">
                      <Clock size={14} className="flex-shrink-0" /> {timeRange(event)}
                    </p>
                    <p className="flex items-start gap-1.5 font-noto text-sm text-[#475467]">
                      {event.location ? <MapPin size={14} className="flex-shrink-0 mt-0.5" /> : <Video size={14} className="flex-shrink-0 mt-0.5" />}
                      {event.location ?? 'Online'}
                    </p>
                    {event.summary && (
                      <p className="font-noto text-sm leading-relaxed text-[#344054] line-clamp-5">{event.summary}</p>
                    )}
                    {event.registrationUrl && !isPast && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2 mt-1 bg-[#419372] text-white rounded-full font-anek font-medium text-sm hover:bg-[#357a5e] transition-colors"
                      >
                        Register
                      </a>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
