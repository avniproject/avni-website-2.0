/**
 * FAQ Browser
 * Category tabs (same style as the Features page tabs) over the FAQ lists.
 * "All questions" shows every category with its heading.
 */

'use client';

import { useState } from 'react';
import FaqList from '@/components/faq/FaqList';
import { FaqCategory } from '@/data/faqs';

const ALL = 'all';

export default function FaqBrowser({ categories }: { categories: FaqCategory[] }) {
  const [selected, setSelected] = useState(ALL);
  const tabs = [{ id: ALL, title: 'All questions' }, ...categories];
  const shown = selected === ALL ? categories : categories.filter(c => c.id === selected);

  return (
    <div>
      <div role="tablist" aria-label="FAQ categories" className="flex gap-2 overflow-x-auto md:flex-wrap md:justify-center pb-2 mb-10 -mx-4 px-4 md:mx-0 md:px-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === selected}
            onClick={() => setSelected(tab.id)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full font-anek font-medium text-base transition-colors ${
              tab.id === selected
                ? 'bg-[#0b2540] text-white'
                : 'bg-white text-[#344054] border border-[#D0D5DD] hover:border-[#419372] hover:text-[#2a7559]'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {shown.map(category => (
          <section key={category.id} id={category.id}>
            <h2 className="font-anek font-bold text-2xl md:text-3xl text-[#0b2540] mb-5">{category.title}</h2>
            <FaqList faqs={category.faqs} />
          </section>
        ))}
      </div>
    </div>
  );
}
