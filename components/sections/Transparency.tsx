/**
 * Transparency You Can Trust (for donors)
 * The promise and four short points on the left, a programme dashboard card on the right.
 */

import Image from "next/image";
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
    <Section spacing="none" className="py-10 md:py-14 [&_p]:hyphens-none">
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

          {/* The dashboard a funder would see */}
          <div className="rounded-3xl bg-gradient-to-br from-[#E8F3EE] to-[#F6FBF8] px-8 py-10 md:px-14 md:py-12 flex justify-center">
            <Image src="/img/home/dash-card.webp" alt="A programme dashboard card in Avni, showing live counts" width={660} height={493} className="w-full max-w-[420px] h-auto drop-shadow-xl" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
