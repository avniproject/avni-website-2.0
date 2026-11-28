/**
 * Solutions That Power Your Programs
 * The five kinds of work Avni is used for, in one compact row. Each card has a small illustration of that work
 * (built in code, illustrative data) and links to its section on the Use Cases page.
 */

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import FadeIn from "@/components/ui/FadeIn";

// A person's visits over time: done, done, due next
function CaseVisual() {
  const visits: [string, 'done' | 'due'][] = [["Jan", "done"], ["Mar", "done"], ["May", "due"]];
  return (
    <div className="w-full rounded-xl bg-white p-3 shadow-sm">
      <p className="font-noto text-[11px] font-semibold text-[#0b2540] mb-2.5">Meena, household 14</p>
      <div className="relative flex justify-between">
        <span className="absolute left-3 right-3 top-2.5 h-0.5 bg-[#B7DCCB]" />
        {visits.map(([month, state]) => (
          <span key={month} className="relative flex flex-col items-center gap-1">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full ${state === "done" ? "bg-[#419372] text-white" : "bg-white border-2 border-dashed border-[#419372]"}`}>
              {state === "done" && <Check size={11} strokeWidth={3} />}
            </span>
            <span className={`font-noto text-[10px] ${state === "due" ? "font-semibold text-[#2a7559]" : "text-[#667085]"}`}>{state === "due" ? "Due" : month}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Responses arriving as phones sync
function SurveyVisual() {
  return (
    <div className="w-full rounded-xl bg-white p-3 shadow-sm">
      <p className="font-noto text-[11px] text-[#667085]">Households surveyed</p>
      <p className="font-anek font-bold text-2xl leading-none text-[#0b2540] mt-1">1,240 <span className="font-noto text-[11px] font-medium text-[#667085]">of 1,500</span></p>
      <div className="h-1.5 rounded-full bg-[#FBE3D6] mt-2.5"><div className="h-full w-[83%] rounded-full bg-[#E07A4F]" /></div>
    </div>
  );
}

// A small chart
function ReportVisual() {
  return (
    <div className="w-full rounded-xl bg-white p-3 shadow-sm">
      <p className="font-noto text-[11px] text-[#667085] mb-2">Visits this month</p>
      <div className="flex items-end gap-1.5 h-10">
        {[45, 60, 40, 70, 55, 85].map((h, i) => (
          <span key={i} className={`flex-1 rounded-sm ${i === 5 ? "bg-[#6D6BD0]" : "bg-[#D9DAF4]"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

// The same participant across study rounds
function CohortVisual() {
  return (
    <div className="w-full rounded-xl bg-white p-3 shadow-sm">
      <p className="font-noto text-[11px] font-semibold text-[#0b2540] mb-2.5">Participant P-0231</p>
      <div className="flex gap-1.5">
        {["Round 1", "Round 2", "Round 3"].map((r, i) => (
          <span key={r} className={`flex-1 rounded-md py-1.5 text-center font-noto text-[10px] font-medium ${i < 2 ? "bg-[#FDF0B8] text-[#7A4D06]" : "border border-dashed border-[#E4C65B] text-[#A16207]"}`}>{r}</span>
        ))}
      </div>
    </div>
  );
}

// One patient passing between desks at a camp
function CampVisual() {
  return (
    <div className="w-full rounded-xl bg-white p-3 shadow-sm">
      <p className="font-noto text-[11px] font-semibold text-[#0b2540] mb-2.5">Patient #27, no internet</p>
      <div className="flex items-center justify-between">
        {["Desk", "Doctor", "Meds"].map((d, i) => (
          <span key={d} className="flex items-center">
            <span className="rounded-md bg-[#D6EEF5] px-2 py-1 font-noto text-[10px] font-medium text-[#155E75]">{d}</span>
            {i < 2 && <ArrowRight size={11} className="mx-1 text-[#1D7A94]" />}
          </span>
        ))}
      </div>
    </div>
  );
}

const solutions = [
  { id: "case-management", title: "Case management", text: "Follow each person or household over months, with visits scheduled for you.", visual: CaseVisual, panel: "bg-[#E8F3EE]" },
  { id: "surveys", title: "Surveys", text: "Run surveys across thousands of homes, offline, with skip logic and checks.", visual: SurveyVisual, panel: "bg-[#FFF1EA]" },
  { id: "reporting", title: "Reporting", text: "Dashboards for field workers, managers and funders, from the same data.", visual: ReportVisual, panel: "bg-[#E9EAF8]" },
  { id: "cohort-studies", title: "Cohort studies", text: "Visit the same people round after round, with every record linked.", visual: CohortVisual, panel: "bg-[#FFF8DB]" },
  { id: "mobile-medical", title: "Health camps", text: "Every desk at a camp shares patient records, even with no internet.", visual: CampVisual, panel: "bg-[#E6F4F8]" },
];

export default function Solutions() {
  return (
    <Section spacing="none" bg="gray" className="py-14 md:py-16 [&_p]:hyphens-none">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540] mb-3">
              Solutions That Power Your Programs
            </h2>
            <p className="font-noto text-base text-[#475467]">One app for the different kinds of work your programme does.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {solutions.map(({ id, title, text, visual: Visual, panel }, i) => (
              <FadeIn key={id} delay={i * 80}>
                <Link
                  href={`/use-cases#${id}`}
                  className="group h-full flex flex-col rounded-2xl bg-white p-2.5 transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className={`flex items-center h-32 rounded-xl px-4 ${panel}`}>
                    <Visual />
                  </div>
                  <div className="flex flex-col flex-1 px-2.5 pt-4 pb-2.5">
                    <h3 className="font-anek font-bold text-xl leading-snug text-[#0b2540] mb-1.5">{title}</h3>
                    <p className="font-noto text-sm leading-relaxed text-[#475467] mb-4">{text}</p>
                    <span className="mt-auto inline-flex items-center gap-1 font-noto text-sm font-medium text-[#2a7559]">
                      See how <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
