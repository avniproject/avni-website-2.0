/**
 * Hero Story
 * Two floating cards over the hero photo that act out what Avni does, in a loop:
 * a health worker's phone records a home visit offline, Avni flags a high-risk pregnancy,
 * the phone syncs, and the programme dashboard counts it. Illustrative data, styled on the
 * real app. Visitors who prefer reduced motion see the final step without animation.
 */

'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, CloudOff, RefreshCw } from 'lucide-react';

const STEP_MS = 2600;
const STEPS = 4; // 0 form, 1 risk flagged, 2 syncing, 3 synced and counted

export default function HeroStory() {
  const [step, setStep] = useState(STEPS - 1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setStep(0);
    const timer = setInterval(() => setStep(s => (s + 1) % STEPS), STEP_MS);
    return () => clearInterval(timer);
  }, []);

  const flagged = step >= 1;
  const synced = step === 3;

  return (
    <>
      {/* Phone card: the field worker's visit */}
      <div className="absolute -left-2 sm:-left-6 bottom-4 sm:bottom-10 w-[210px] max-sm:scale-[0.68] origin-bottom-left rounded-[22px] bg-[#0b2540] p-1.5 shadow-2xl z-10" aria-hidden="true">
        <div className="rounded-[17px] bg-white overflow-hidden">
          <div className="flex items-center justify-between bg-[#0b2540] px-3 py-2">
            <span className="font-noto text-[11px] font-semibold text-white">Home visit</span>
            <span className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 font-noto text-[9px] font-medium transition-colors ${
              synced ? 'bg-[#32D583] text-[#0b2540]' : step === 2 ? 'bg-[#FDB022] text-[#0b2540]' : 'bg-white/15 text-white'
            }`}>
              {synced ? <><CheckCircle2 size={10} /> Synced</> : step === 2 ? <><RefreshCw size={10} className="animate-spin" /> Syncing</> : <><CloudOff size={10} /> Offline</>}
            </span>
          </div>
          <div className="p-3 space-y-2">
            <div>
              <p className="font-noto text-[12px] font-semibold text-[#0b2540] leading-tight">Sunita Devi, 24</p>
              <p className="font-noto text-[10px] text-[#667085]">7 months pregnant · ANC visit</p>
            </div>
            {[['Blood pressure', '140/90'], ['Haemoglobin', '6.8 g/dL']].map(([label, value], i) => (
              <div key={label} className="flex justify-between items-center rounded-md bg-[#F9FAFB] px-2 py-1.5">
                <span className="font-noto text-[10px] text-[#475467]">{label}</span>
                <span className={`font-noto text-[10px] font-semibold ${flagged && i === 1 ? 'text-[#D92D20]' : 'text-[#0b2540]'}`}>{value}</span>
              </div>
            ))}
            <div className={`rounded-lg border px-2 py-1.5 transition-all duration-500 ${
              flagged ? 'opacity-100 translate-y-0 border-[#FDA29B] bg-[#FEF3F2]' : 'opacity-0 translate-y-1 border-transparent'
            }`}>
              <p className="flex items-center gap-1 font-noto text-[10px] font-semibold text-[#B42318]">
                <AlertTriangle size={11} /> High-risk pregnancy
              </p>
              <p className="font-noto text-[9px] text-[#B42318]/80">Refer to PHC · follow-up in 7 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard card: the programme manager's view */}
      <div className="absolute -right-2 sm:-right-4 top-2 sm:top-8 w-[200px] max-sm:scale-[0.68] origin-top-right rounded-2xl bg-white p-3.5 shadow-2xl border border-[#EAECF0] z-10" aria-hidden="true">
        <p className="font-noto text-[10px] font-medium uppercase tracking-wider text-[#667085]">Programme dashboard</p>
        <p className="font-noto text-[11px] text-[#475467] mt-1">High-risk pregnancies</p>
        <div className="flex items-end justify-between mt-0.5">
          <span key={synced ? 'after' : 'before'} className="font-anek font-bold text-3xl text-[#0b2540] animate-[hero-count_400ms_ease-out]">
            {synced ? 33 : 32}
          </span>
          <span className={`font-noto text-[10px] font-semibold transition-opacity ${synced ? 'text-[#2a7559] opacity-100' : 'opacity-0'}`}>+1 just now</span>
        </div>
        {/* Small bar chart of the week */}
        <div className="flex items-end gap-1 h-8 mt-2">
          {[40, 55, 35, 60, 50, 70].map((h, i) => (
            <span key={i} className="flex-1 rounded-sm bg-[#B7DCCB]" style={{ height: `${h}%` }} />
          ))}
          <span className={`flex-1 rounded-sm transition-all duration-500 ${synced ? 'bg-[#419372]' : 'bg-[#B7DCCB]'}`} style={{ height: synced ? '85%' : '70%' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-count {
          from { transform: translateY(6px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
