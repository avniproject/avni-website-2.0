/**
 * Testimonials
 * Real quotes from partners' staff, taken word for word from our case studies, blog posts
 * and the old site's testimonials (shortened only with "…"). Each links to its story. The homepage
 * shows the first TESTIMONIALS_SHOWN.
 */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role?: string;
  organisation: string;
  logo?: string;
  photos?: string[]; // round portrait(s); used instead of the logo
  href: string; // the case study or blog post the quote comes from
}

export const TESTIMONIALS_SHOWN = 6;

export const testimonials: Testimonial[] = [
  {
    id: 'calcutta-kids',
    quote: 'Now with Avni, our health workers manage the data in the field, make monthly data presentation themselves, and have gained even more respect in the community. … Our health workers love Avni.',
    name: 'Noah Levinson',
    role: 'Co-founder',
    organisation: 'Calcutta Kids',
    photos: ['/img/testimonials/noah-levinson.webp'],
    href: '/resources/case-studies/calcutta-kids-avni-implemented-for-maternal-and-child-health-program/',
  },
  {
    id: 'sewa-rural-leads',
    quote: 'Because of Avni analytics, we uncovered vulnerable adolescents having different problems. … Avni has helped us address the most pressing problems of our clients.',
    name: 'Dr Shobha Shah and Maitri Vayeda',
    organisation: 'SEWA Rural',
    photos: ['/img/testimonials/shobha-shah.webp', '/img/testimonials/maitri-vayeda.webp'],
    href: '/blog/2024-06-25-digitising-adolescent-community-program-using-avni/',
  },
  {
    id: 'hasiru-dala',
    quote: 'Thanks to Avni, reporting, data quality checks, analysis, and many other processes have become much easier for us. … Avni is user-friendly and loaded with features.',
    name: 'Charan Kumar',
    role: 'Avni Admin and Data Supervisor',
    organisation: 'Hasiru Dala',
    logo: '/logos/HD-Main-Logo.webp',
    href: '/resources/case-studies/2025-08-01-empowering-waste-pickers/',
  },
  {
    id: 'project-potential',
    quote: 'With Avni, health card registration has become so streamlined. I can work offline, edit and track everything — right from eKYC to card distribution. This has reduced our workload significantly.',
    name: 'Poornima',
    role: 'Panchayat Coordinator',
    organisation: 'Project Potential',
    logo: '/logos/Project-Potential-logo.webp',
    href: '/resources/case-studies/2024-11-27-Project-Potential-Bihar-Health-Access-Digitisation-Case-study/',
  },
  {
    id: 'animedh',
    quote: 'For ACT, Avni has not just digitised data — it has strengthened our foundation for impact through greater efficiency and transparency.',
    name: 'Nivedita Desai',
    role: 'Managing Trustee',
    organisation: 'Animedh Charitable Trust',
    href: '/blog/2025-10-31-ACT-Transformation-with-Avni/',
  },
  {
    id: 'iph-kollegal',
    quote: 'Earlier, we relied on manual data entry, but now our team inputs everything directly through mobile devices — it’s become second nature. The paperwork has reduced drastically.',
    name: 'Dr. Swati',
    organisation: 'IPH, Kollegal',
    href: '/blog/2025-06-12-field-visit-to-kollegal-government-hospital/',
  },
  {
    id: 'maha-peconet',
    quote: 'In 3 words, Avni MIS has been versatile, impactful and qualitative.',
    name: 'Shilpa Mirashi',
    role: 'Director',
    organisation: 'Indian Institute of Youth Welfare, Nagpur (Maha PECOnet)',
    logo: '/logos/Maharashtra-PECOnet-logo.webp',
    href: '/resources/case-studies/mahapeconet-use-of-avni-in-covid-relief/',
  },
  {
    id: 'sewa-rural',
    quote: 'Now I do not have to come to look at thousands of forms everyday, identify children which need to be visited and allocate the work among my peers as that is now done by the application.',
    name: 'Jyotsana Ben',
    organisation: 'SEWA Rural',
    logo: '/logos/SEWA-Rural-logo.webp',
    href: '/blog/2022-05-03-field-visit-sewa-rural-adolescent-and-sncu/',
  },
];
