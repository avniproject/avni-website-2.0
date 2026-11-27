/**
 * Solutions That Power Your Programs
 * The five kinds of work Avni is used for, in one compact row; each links to its section on the Use Cases page.
 */

import Link from "next/link";
import { ArrowRight, BarChart3, ClipboardList, LucideIcon, Stethoscope, UsersRound, Repeat } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import FadeIn from "@/components/ui/FadeIn";

const solutions: { id: string; title: string; text: string; icon: LucideIcon; tone: string }[] = [
  {
    id: "case-management",
    title: "Case management",
    text: "Follow each person or household over months, with visits scheduled for you.",
    icon: UsersRound,
    tone: "bg-[#E8F3EE] text-[#2a7559]",
  },
  {
    id: "surveys",
    title: "Surveys",
    text: "Run surveys across thousands of homes, offline, with skip logic and checks.",
    icon: ClipboardList,
    tone: "bg-[#FFF1EA] text-[#C4552B]",
  },
  {
    id: "reporting",
    title: "Reporting",
    text: "Dashboards for field workers, managers and funders, from the same data.",
    icon: BarChart3,
    tone: "bg-[#E9EAF8] text-[#5452B8]",
  },
  {
    id: "cohort-studies",
    title: "Cohort studies",
    text: "Visit the same people round after round, with every record linked.",
    icon: Repeat,
    tone: "bg-[#FFF8DB] text-[#A16207]",
  },
  {
    id: "mobile-medical",
    title: "Health camps",
    text: "Every desk at a camp shares patient records, even with no internet.",
    icon: Stethoscope,
    tone: "bg-[#E6F4F8] text-[#1D7A94]",
  },
];

export default function Solutions() {
  return (
    <Section spacing="none" className="pt-14 md:pt-16 pb-4 md:pb-6 [&_p]:hyphens-none">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540] mb-3">
              Solutions That Power Your Programs
            </h2>
            <p className="font-noto text-base text-[#475467]">One app for the different kinds of work your programme does.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {solutions.map(({ id, title, text, icon: Icon, tone }, i) => (
              <FadeIn key={id} delay={i * 80}>
                <Link
                  href={`/use-cases#${id}`}
                  className="group h-full flex flex-col rounded-2xl border border-[#EAECF0] bg-white p-5 transition-all hover:border-[#B7DCCB] hover:shadow-md"
                >
                  <span className={`flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${tone}`}>
                    <Icon size={22} />
                  </span>
                  <h3 className="font-anek font-bold text-xl leading-snug text-[#0b2540] mb-1.5">{title}</h3>
                  <p className="font-noto text-sm leading-relaxed text-[#475467] mb-4">{text}</p>
                  <span className="mt-auto inline-flex items-center gap-1 font-noto text-sm font-medium text-[#2a7559]">
                    See how <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
