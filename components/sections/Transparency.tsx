/**
 * Transparency You Can Trust (for donors)
 * The promise and four short points on the left; on the right, a real public dashboard a partner runs on Avni data.
 */

import Image from "next/image";
import Link from "next/link";
import { Activity, Download, LucideIcon, ShieldCheck, Smartphone } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const points: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Recorded at the doorstep", text: "Entered during the visit, not copied from registers later.", icon: Smartphone },
  { title: "Checked as it is entered", text: "Rules catch mistakes before they reach a report.", icon: ShieldCheck },
  { title: "Progress, live", text: "Dashboards update as phones sync.", icon: Activity },
  { title: "Yours to export", text: "Download the full data any time.", icon: Download },
];

export default function Transparency() {
  return (
    <Section spacing="none" className="py-14 md:py-16 [&_p]:hyphens-none">
      <Container>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="font-anek font-semibold tracking-wide text-xs md:text-sm leading-tight text-[#B8481F] uppercase mb-3">For donors</p>
            <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540] mb-3">Transparency You Can Trust</h2>
            <p className="font-noto text-base leading-relaxed text-[#475467] mb-7">
              Funders see what is happening on the ground as it happens, from data they can rely on.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {points.map(({ title, text, icon: Icon }) => (
                <li key={title} className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-[#E8F3EE] text-[#2a7559]">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="font-anek font-bold text-lg leading-snug text-[#0b2540]">{title}</h3>
                    <p className="font-noto text-sm leading-relaxed text-[#475467]">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* A real public dashboard: Shelter Associates, from their Avni data */}
          <figure className="rounded-3xl bg-gradient-to-br from-[#FFEBDD] to-[#FFF7E0] p-6 md:p-8">
            <div className="relative rounded-xl bg-white shadow-xl overflow-hidden border border-[#EAECF0]">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-[#F2F4F7] border-b border-[#EAECF0]">
                <span className="w-2 h-2 rounded-full bg-[#F97066]" /><span className="w-2 h-2 rounded-full bg-[#FDB022]" /><span className="w-2 h-2 rounded-full bg-[#32D583]" />
                <span className="ml-2 font-noto text-[11px] text-[#98A2B3]">shelter-associates.org · live dashboard</span>
              </div>
              <Image src="/img/home/shelter-dashboard.webp" alt="Shelter Associates' public dashboard: slums surveyed, households and quality-of-living scores for Kolhapur, Navi Mumbai and Panvel" width={1010} height={749} className="w-full h-auto" />
            </div>
            <figcaption className="relative text-center font-noto text-xs text-[#667085] mt-4">
              Shelter Associates publishes live slum data from Avni on its website.{' '}
              <Link href="/blog/shelter-journey-remoulding-data-collection-paper-kobotoolbox-avni/" className="font-medium text-[#2a7559] hover:text-[#1f5a43]">Read their story</Link>
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}
