/**
 * Partners By Sector
 * Partner logos grouped by sector, built from the case studies (their `logo` and `sector`),
 * so a new case study with a logo appears here automatically. Each logo opens its case study.
 * Logos are shown exactly as the partners publish them: no greyscale or other filters.
 */

import Image from 'next/image';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getAllCaseStudies } from '@/lib/markdown';

const SECTOR_ICONS: Record<string, string> = {
  'Healthcare': '/icons/navigation/healthcare.svg',
  'Education': '/icons/navigation/education.svg',
  'Water & Sanitation': '/icons/navigation/water.svg',
  'Waste Management': '/icons/navigation/waste.svg',
  'Social Security': '/icons/navigation/social-security.svg',
  'Livelihood': '/icons/navigation/livlihood.svg',
  'Legal Aid': '/icons/navigation/legal-aid.svg',
};

interface PartnerLogo {
  logo: string;
  name: string;
  href: string;
}

async function getPartnersBySector() {
  const sectors = new Map<string, PartnerLogo[]>();
  for (const { slug, frontmatter } of await getAllCaseStudies()) {
    if (!frontmatter.logo || !frontmatter.sector) continue;
    const partners = sectors.get(frontmatter.sector) ?? [];
    // One tile per partner, even with several case studies
    if (!partners.some(p => p.logo === frontmatter.logo)) {
      partners.push({ logo: frontmatter.logo, name: frontmatter.title, href: `/resources/case-studies/${slug}/` });
    }
    sectors.set(frontmatter.sector, partners);
  }
  // Biggest sectors first
  return [...sectors.entries()].sort((a, b) => b[1].length - a[1].length);
}

function SectorLabel({ sector, count }: { sector: string; count: number }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E8F3EE]">
        {SECTOR_ICONS[sector]
          ? <Image src={SECTOR_ICONS[sector]} alt="" width={16} height={16} />
          // The menu icon set has no Sports icon; this matches its colour
          : <Trophy size={16} className="text-[#FF8854]" />}
      </span>
      <h3 className="font-anek font-semibold text-lg text-[#0b2540]">{sector}</h3>
      <span className="font-noto text-sm text-[#667085]">· {count} {count === 1 ? 'partner' : 'partners'}</span>
    </div>
  );
}

function LogoTile({ partner }: { partner: PartnerLogo }) {
  return (
    <Link
      href={partner.href}
      title={partner.name}
      className="relative block h-16 md:h-20 rounded-xl border border-[#EAECF0] bg-white hover:border-[#419372] hover:shadow-sm transition-all"
    >
      <Image src={partner.logo} alt={partner.name} fill sizes="200px" className="object-contain p-3" />
    </Link>
  );
}

export default async function PartnersBySector() {
  const [[mainSector, mainPartners], ...otherSectors] = await getPartnersBySector();

  return (
    <Section spacing="md">
      <Container>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-anek font-medium text-base md:text-lg lg:text-xl leading-tight text-[#fba47e] uppercase mb-2">
            Trusted by 60+ NGOs
          </h2>
          <p className="font-noto text-base text-[#475467]">Across sectors. Click a logo to read their story.</p>
        </div>

        <div className="max-w-6xl mx-auto space-y-5">
          {/* The largest sector gets a full-width row */}
          <div className="rounded-2xl bg-[#F9FAFB] p-5 md:p-6">
            <SectorLabel sector={mainSector} count={mainPartners.length} />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {mainPartners.map(partner => <LogoTile key={partner.logo} partner={partner} />)}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherSectors.map(([sector, partners]) => (
              <div key={sector} className="rounded-2xl bg-[#F9FAFB] p-5 md:p-6">
                <SectorLabel sector={sector} count={partners.length} />
                <div className="grid grid-cols-2 gap-3">
                  {partners.map(partner => <LogoTile key={partner.logo} partner={partner} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
