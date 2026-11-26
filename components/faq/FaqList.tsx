/**
 * FAQ List
 * Questions that open and close (no JavaScript needed). Answers can contain
 * [text](url) links; links to other sites open in a new tab.
 */

import { Fragment, ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Faq } from '@/data/faqs';

const linkClass = 'font-medium text-[#2a7559] underline underline-offset-2 decoration-[#419372]/50 hover:text-[#1f5a43]';

function withLinks(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <Fragment key={i}>{part}</Fragment>;
    const [, label, href] = match;
    return href.startsWith('/')
      ? <Link key={i} href={href} className={linkClass}>{label}</Link>
      : <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{label}</a>;
  });
}

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map(faq => (
        <details key={faq.question} className="group bg-white rounded-xl shadow-sm">
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-anek font-semibold text-lg text-[#0b2540] [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown size={20} className="flex-shrink-0 text-[#667085] transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-5 font-noto text-base leading-relaxed text-[#475467]">{withLinks(faq.answer)}</p>
        </details>
      ))}
    </div>
  );
}
