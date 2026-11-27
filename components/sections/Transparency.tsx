/**
 * Transparency You Can Trust (for donors)
 * One dark band: the promise on the left, four short points on the right.
 */

import { Activity, Download, LucideIcon, ShieldCheck, Smartphone } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const points: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Recorded at the doorstep", text: "Data is entered during the visit, not copied from registers later.", icon: Smartphone },
  { title: "Checked as it is entered", text: "Validations and rules catch mistakes before they reach a report.", icon: ShieldCheck },
  { title: "Progress, live", text: "Dashboards update as phones sync, with no waiting for month-end.", icon: Activity },
  { title: "Yours to export", text: "Download the full data any time, or connect it to your own tools.", icon: Download },
];

export default function Transparency() {
  return (
    <Section spacing="none" className="py-10 md:py-12 [&_p]:hyphens-none">
      <Container>
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#0b2540] px-7 py-10 md:px-12 md:py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 lg:gap-12 items-center">
          <div>
            <p className="font-anek font-medium text-xs md:text-sm leading-tight text-[#fba47e] uppercase mb-3">For donors</p>
            <h2 className="font-anek font-bold text-3xl md:text-4xl leading-tight text-white mb-3">Transparency You Can Trust</h2>
            <p className="font-noto text-base leading-relaxed text-white/75">
              Funders see what is happening on the ground as it happens, from data they can rely on.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {points.map(({ title, text, icon: Icon }) => (
              <li key={title} className="flex gap-3.5">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-[#7DD3B0]">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="font-anek font-bold text-lg leading-snug text-white">{title}</h3>
                  <p className="font-noto text-sm leading-relaxed text-white/70">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
