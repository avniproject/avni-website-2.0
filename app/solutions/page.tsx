/**
 * Solutions Page
 * Sector tabs with each sector's case studies, which are read from content/case-studies
 */

import SolutionsClient, { SectorCaseStudy } from '@/components/solutions/SolutionsClient';
import { getAllCaseStudies } from '@/lib/markdown';

export default async function SolutionsPage() {
  const caseStudies: Record<string, SectorCaseStudy[]> = {};
  for (const { slug, frontmatter } of await getAllCaseStudies()) {
    if (!frontmatter.sector) continue;
    (caseStudies[frontmatter.sector] ??= []).push({
      title: frontmatter.title,
      href: `/resources/case-studies/${slug}/`,
      image: frontmatter.image,
      logo: frontmatter.logo,
    });
  }
  return <SolutionsClient caseStudies={caseStudies} />;
}
