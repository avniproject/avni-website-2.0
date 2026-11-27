/**
 * YouTube
 * Latest videos from the Avni YouTube channel and the meetup playlist, read from YouTube's
 * public feeds when the site is built (no API key). Each feed lists its latest 15 videos.
 */

const CHANNEL_FEED = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCShsfKJlw0B3B6Pg2DmQkSQ';
const MEETUP_PLAYLIST_FEED = 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLEy8ff0CKDBl1qKXjYPFXH63MHnvogxyi';

export interface Video {
  id: string;
  title: string;
  url: string;
  published: string; // ISO
}

const decode = (text: string) =>
  text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

async function readFeed(url: string): Promise<Video[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap(([, entry]) => {
      const id = entry.match(/<yt:videoId>([^<]+)/)?.[1];
      const title = entry.match(/<title>([^<]*)/)?.[1];
      const published = entry.match(/<published>([^<]+)/)?.[1];
      return id && title && published
        ? [{ id, title: decode(title), url: `https://www.youtube.com/watch?v=${id}`, published }]
        : [];
    });
  } catch {
    return [];
  }
}

/** The channel's latest videos plus the meetup playlist's, newest first, without duplicates. */
export async function fetchVideos(): Promise<Video[]> {
  const feeds = await Promise.all([readFeed(CHANNEL_FEED), readFeed(MEETUP_PLAYLIST_FEED)]);
  const byId = new Map(feeds.flat().map(video => [video.id, video]));
  return [...byId.values()].sort((a, b) => b.published.localeCompare(a.published));
}
