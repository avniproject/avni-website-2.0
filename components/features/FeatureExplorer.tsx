/**
 * Feature Explorer
 * Tabs for the feature groups; within a group, clicking a feature shows its screenshots
 * or screen recordings. On phones, a feature's media opens under it in the list.
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Smartphone } from 'lucide-react';
import { Feature, FeatureGroup } from '@/data/feature-groups';

function Media({ src, alt }: { src: string; alt: string }) {
  if (src.endsWith('.mp4')) {
    return <video key={src} src={src} aria-label={alt} autoPlay loop muted playsInline className="w-full h-full object-contain" />;
  }
  return <Image key={src} src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 640px" className="object-contain" />;
}

function FeatureMedia({ feature }: { feature: Feature }) {
  const [index, setIndex] = useState(0);
  const current = feature.media[index] ?? feature.media[0];

  if (!current) {
    // Features without a screenshot get a quiet title panel instead of an empty box
    return (
      <div className="h-full min-h-[240px] flex flex-col items-center justify-center text-center rounded-2xl bg-[#F6FBF8] border border-[#E3F1EA] p-8">
        <Smartphone size={40} className="text-[#419372] mb-4" />
        <p className="font-anek font-semibold text-xl text-[#0b2540]">{feature.title}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#F9FAFB] border border-[#EAECF0] overflow-hidden p-3">
        <div className="relative w-full h-full">
          <Media src={current.src} alt={current.alt} />
        </div>
      </div>
      <p className="font-noto text-sm text-[#667085] mt-3">{current.alt}</p>
      {feature.media.length > 1 && (
        <div className="flex gap-2 mt-3">
          {feature.media.map((item, i) => (
            <button
              key={item.src}
              onClick={() => setIndex(i)}
              aria-label={`Show: ${item.alt}`}
              className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-[#419372]' : 'w-2.5 bg-[#D0D5DD] hover:bg-[#98A2B3]'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FeatureExplorer({ groups }: { groups: FeatureGroup[] }) {
  const [groupId, setGroupId] = useState(groups[0].id);
  const group = groups.find(g => g.id === groupId) ?? groups[0];
  const [featureId, setFeatureId] = useState(group.features[0].id);
  const feature = group.features.find(f => f.id === featureId) ?? group.features[0];

  const selectGroup = (next: FeatureGroup) => {
    setGroupId(next.id);
    setFeatureId(next.features[0].id);
  };

  return (
    <div>
      {/* Group tabs: wrap on larger screens, scroll sideways on phones */}
      <div role="tablist" className="flex gap-2 overflow-x-auto md:flex-wrap md:justify-center pb-2 mb-8 -mx-4 px-4 md:mx-0 md:px-0">
        {groups.map(g => (
          <button
            key={g.id}
            role="tab"
            aria-selected={g.id === group.id}
            onClick={() => selectGroup(g)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full font-anek font-medium text-base transition-colors ${
              g.id === group.id ? 'bg-[#0b2540] text-white' : 'bg-white text-[#344054] border border-[#D0D5DD] hover:border-[#419372] hover:text-[#2a7559]'
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm p-5 md:p-8 lg:p-10">
        <p className="font-noto text-base text-[#475467] mb-6 md:mb-8">{group.summary}</p>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12">
          {/* Feature list */}
          <ul className="space-y-2">
            {group.features.map(f => {
              const isOpen = f.id === feature.id;
              return (
                <li key={f.id}>
                  <button
                    onClick={() => setFeatureId(f.id)}
                    aria-expanded={isOpen}
                    className={`w-full text-left rounded-xl p-4 transition-colors border ${
                      isOpen ? 'bg-[#F6FBF8] border-[#419372]' : 'border-transparent hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className={`font-anek font-semibold text-lg ${isOpen ? 'text-[#1f5a43]' : 'text-[#0b2540]'}`}>{f.title}</span>
                      <ChevronDown size={18} className={`flex-shrink-0 text-[#667085] transition-transform lg:-rotate-90 ${isOpen ? 'rotate-180 lg:rotate-0' : ''}`} />
                    </span>
                    {isOpen && <span className="block font-noto text-sm leading-relaxed text-[#475467] mt-2">{f.description}</span>}
                  </button>
                  {isOpen && f.link && (
                    <a href={f.link.href} {...(f.link.href.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })} className="inline-flex items-center gap-1 ml-4 mt-2 font-noto text-sm font-medium text-[#2a7559] hover:text-[#1f5a43]">
                      {f.link.label} <ArrowUpRight size={14} />
                    </a>
                  )}
                  {/* Phones: media opens under the feature */}
                  {isOpen && (
                    <div className="lg:hidden mt-4">
                      <FeatureMedia key={f.id} feature={f} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Larger screens: media beside the list */}
          <div className="hidden lg:block">
            <FeatureMedia key={feature.id} feature={feature} />
          </div>
        </div>
      </div>
    </div>
  );
}
