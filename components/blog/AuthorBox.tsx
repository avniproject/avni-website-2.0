/**
 * Author Box
 * "About the author" at the end of a post: photo (or initials), name, role and organisation,
 * short bio and LinkedIn, from the author directory (lib/authors.ts). Shows whatever is filled.
 */

import Image from 'next/image';
import { Linkedin } from 'lucide-react';
import { Author } from '@/lib/authors';

const initials = (name: string) =>
  name.split(/\s+/).filter(word => /^[A-Za-z]/.test(word)).slice(0, 2).map(word => word[0].toUpperCase()).join('');

export default function AuthorBox({ authors }: { authors: Author[] }) {
  return (
    <div className="mt-12 p-6 md:p-8 bg-[#F6FBF8] rounded-2xl border border-[#E3F1EA]">
      <h3 className="font-anek font-semibold text-sm uppercase tracking-wider text-[#2a7559] mb-5">
        {authors.length > 1 ? 'About the authors' : 'About the author'}
      </h3>
      <div className="space-y-6">
        {authors.map(author => {
          const subtitle = [author.role, author.organisation].filter(Boolean).join(', ');
          return (
            <div key={author.name} className="flex gap-4">
              <div className="relative flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-[#419372] flex items-center justify-center">
                {author.photo ? (
                  <Image src={author.photo} alt={author.name} fill sizes="56px" className="object-cover" />
                ) : (
                  <span className="font-anek font-bold text-lg text-white">{initials(author.name)}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-anek font-semibold text-lg text-[#0b2540] leading-tight">{author.name}</p>
                {subtitle && <p className="font-noto text-sm text-[#475467]">{subtitle}</p>}
                {author.bio && <p className="font-noto text-sm leading-relaxed text-[#344054] mt-2">{author.bio}</p>}
                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 font-noto text-sm font-medium text-[#2a7559] hover:text-[#1f5a43]"
                  >
                    <Linkedin size={15} /> Connect on LinkedIn
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
