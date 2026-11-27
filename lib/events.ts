/**
 * Events from the public "Avni Events" Google Calendar
 * Read from the calendar's public iCal feed when the site is built, so no API key is needed.
 * Events added to the calendar appear on the site after the next build.
 */

import { fetchVideos, Video } from './youtube';

export const EVENTS_CALENDAR_ID = 'c_1f28563b52f3a01f8f7ceee9c339700e8dbb256a398571f131db0ec351c214de@group.calendar.google.com';

const ICAL_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(EVENTS_CALENDAR_ID)}/public/basic.ics`;

// Opens Google Calendar with an "Add this calendar" prompt
export const SUBSCRIBE_URL = `https://calendar.google.com/calendar/u/0?cid=${btoa(EVENTS_CALENDAR_ID)}`;

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO
  end: string;
  location: string | null; // venue for in-person events, null when online
  registrationUrl: string | null;
  recordingUrl: string | null; // YouTube recording of a past event
  summary: string; // plain-text description, shortened
}

export type EventKind = 'Webinar' | 'Community Meetup' | 'Workshop';

export function eventKind(title: string): EventKind {
  if (/meetup/i.test(title)) return 'Community Meetup';
  if (/webinar|q&a/i.test(title)) return 'Webinar';
  return 'Workshop';
}

// Turns an iCal date (20261124T093000Z, or 20250506T150000 with TZID=Asia/Kolkata, or 20250506) into ISO
function parseIcalDate(value: string): string {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
  if (!m) return value;
  const [, y, mo, d, h = '00', mi = '00', s = '00', utc] = m;
  // The calendar is in India time, so times without Z are IST
  return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}${utc ? 'Z' : '+05:30'}`).toISOString();
}

function unescapeText(text: string): string {
  return text.replace(/\\n/gi, '\n').replace(/\\([,;\\])/g, '$1');
}

function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>|<\/(p|li)>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/[​]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Cuts at the last full sentence (or word) within the limit
function shorten(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sentenceEnd = cut.lastIndexOf('. ');
  return sentenceEnd > max / 2 ? cut.slice(0, sentenceEnd + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

export function parseIcal(ics: string): CalendarEvent[] {
  // Long lines are folded onto continuation lines that start with a space
  const lines = ics.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '').split('\n');
  const events: CalendarEvent[] = [];
  let current: Record<string, { value: string; params: string }> | null = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') { current = {}; continue; }
    if (line === 'END:VEVENT' && current) {
      const get = (key: string) => current?.[key]?.value ?? '';
      if (get('STATUS') !== 'CANCELLED' && current.DTSTART) {
        const description = unescapeText(get('DESCRIPTION'));
        const location = unescapeText(get('LOCATION')).trim();
        const urls = `${location} ${description}`.match(/https?:\/\/[^\s"<>]+/g) ?? [];
        const isYouTube = (url: string) => /youtube\.com|youtu\.be/.test(url);
        const start = parseIcalDate(current.DTSTART.value);
        events.push({
          id: get('UID'),
          title: unescapeText(get('SUMMARY')).trim(),
          start,
          end: current.DTEND ? parseIcalDate(current.DTEND.value) : start,
          location: location && !/^https?:\/\//.test(location) ? location : null,
          registrationUrl: urls.find(url => !isYouTube(url)) ?? null,
          // Added to the calendar event by hand as "Recording: <YouTube link>"
          recordingUrl: urls.find(isYouTube) ?? null,
          summary: shorten(htmlToText(description)
            .replace(/^Registration\s*-\s*https?:\/\/\S+\s*/i, '')
            .replace(/Recording\s*[:-]\s*https?:\/\/\S+\s*/i, ''), 600),
        });
      }
      current = null;
      continue;
    }
    if (!current) continue;
    const colon = line.indexOf(':');
    if (colon < 0) continue;
    const [key, ...params] = line.slice(0, colon).split(';');
    current[key] = { value: line.slice(colon + 1), params: params.join(';') };
  }
  return events;
}

/*
 * Recordings: past community meetups are matched to videos on the Avni YouTube channel
 * (lib/youtube.ts), uploaded within RECORDING_UPLOAD_WINDOW_DAYS after the meetup.
 */
const RECORDING_UPLOAD_WINDOW_DAYS = 45;
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

// A meetup's recording: a "meetup" video naming the meetup's month, uploaded soon after it
function findRecording(event: CalendarEvent, videos: Video[]): string | null {
  const start = new Date(event.start);
  const month = MONTHS[Number(new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', month: 'numeric' }).format(start)) - 1];
  const latest = start.getTime() + RECORDING_UPLOAD_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const match = videos.find(video => {
    const title = video.title.toLowerCase();
    const published = new Date(video.published).getTime();
    return /meet\s?up/.test(title)
      && (title.includes(month) || new RegExp(`\\b${month.slice(0, 3)}\\b`).test(title))
      && published >= start.getTime() && published <= latest;
  });
  return match?.url ?? null;
}

async function fetchEvents(): Promise<CalendarEvent[]> {
  const res = await fetch(ICAL_URL, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const events = parseIcal(await res.text()).sort((a, b) => a.start.localeCompare(b.start));
  const videos = await fetchVideos();
  return events.map(event =>
    event.recordingUrl || eventKind(event.title) !== 'Community Meetup'
      ? event
      : { ...event, recordingUrl: findRecording(event, videos) });
}

/**
 * All events, oldest first. Returns [] if the calendar can't be reached,
 * so the build never fails because of it.
 */
export async function getAllEvents(): Promise<CalendarEvent[]> {
  try {
    return await fetchEvents();
  } catch {
    return [];
  }
}
