/**
 * Authors
 * The author directory (content/authors, one file per person, edited in Pages CMS) and the
 * lookup from a post's author text to directory entries. Posts may name several authors
 * ("A & B", "A, B"); old spellings are listed as `aliases` on the author.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Author {
  name: string;
  role?: string;
  organisation?: string;
  linkedin?: string;
  photo?: string;
  bio?: string;
}

const AUTHORS_DIR = path.join(process.cwd(), 'content/authors');

let byName: Map<string, Author> | null = null;

const key = (name: string) => name.toLowerCase().replace(/\s+/g, ' ').trim();

function directory(): Map<string, Author> {
  if (byName) return byName;
  byName = new Map();
  if (!fs.existsSync(AUTHORS_DIR)) return byName;
  for (const file of fs.readdirSync(AUTHORS_DIR).filter(f => f.endsWith('.md'))) {
    const { data, content } = matter(fs.readFileSync(path.join(AUTHORS_DIR, file), 'utf8'));
    if (!data.name) continue;
    const author: Author = {
      name: data.name,
      role: data.role || undefined,
      organisation: data.organisation || undefined,
      linkedin: data.linkedin || undefined,
      photo: data.photo || undefined,
      bio: content.trim() || undefined,
    };
    for (const name of [data.name, ...(data.aliases ?? [])]) byName.set(key(name), author);
  }
  return byName;
}

/**
 * The authors of a post, from its author text. Names not in the directory still appear,
 * with just their name.
 */
export function getPostAuthors(authorText?: string): Author[] {
  const text = (authorText || 'Avni Team').trim();
  const known = directory();
  // A whole-text alias first ("Siddhant Singh, Project Tech4Dev"), then split co-authors
  const whole = known.get(key(text));
  if (whole) return [whole];
  return text
    .split(/\s*(?:&|,| and )\s*/)
    .filter(Boolean)
    .map(name => known.get(key(name)) ?? { name });
}
