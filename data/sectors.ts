/**
 * Sectors
 * Sectors on the Solutions page. Each sector's case studies are added automatically from
 * content/case-studies (matched on their `sector`). Edit the text here, sector by sector.
 * `programmes` lists the kinds of programmes run on Avni, each linking to the organisations'
 * case studies or blog posts.
 */

export interface ProgrammeExample {
  name: string;
  href: string;
}

export interface Programme {
  name: string;
  examples: ProgrammeExample[];
}

export interface Sector {
  name: string;
  description: string[];
  programmes?: Programme[];
}

export const sectors: Sector[] = [
  {
    name: 'Education',
    description: [
      'Education programmes run across schools, anganwadis and community learning centres, often in remote and tribal areas. When attendance, learning levels and teacher support are tracked on paper, it is hard to see which children are falling behind, which classrooms need help, and whether the programme is working.',
      'With Avni, field teams record attendance, assessments and classroom observations on their phones, even offline, and follow each child or teacher over time. Programme managers and government partners see learning gaps across schools in real time and target support where it is needed, at the scale of a whole state.',
    ],
    programmes: [
      {
        name: 'Classroom observation and teacher development',
        examples: [
          { name: 'Leadership for Equity, Andhra Pradesh', href: '/resources/case-studies/classroom-observation-tool-for-andhra-pradesh/' },
          { name: 'Teach Nagaland', href: '/blog/2024-12-20-avni-in-2024/' },
        ],
      },
      {
        name: 'Foundational literacy, numeracy and life skills',
        examples: [
          { name: 'CInI (Tata Trusts)', href: '/resources/case-studies/2024-09-19-Scaling-Rural-Education/' },
        ],
      },
      {
        name: 'Early childhood care and creches',
        examples: [
          { name: 'Mobile Creches', href: '/blog/2024-01-05-a-review-of-2023/' },
          { name: 'BHS Phulwari', href: '/blog/2023-07-14-avni-sprint-udaipur-day-2/' },
        ],
      },
      {
        name: 'Community education for children',
        examples: [
          { name: 'Animedh Charitable Trust', href: '/blog/2025-10-31-ACT-Transformation-with-Avni/' },
        ],
      },
    ],
  },
  {
    name: 'Healthcare',
    description: [
      'Community health programmes depend on frontline workers (ASHAs, ANMs and health volunteers) who visit families in remote villages and urban slums. On paper registers, follow-ups get missed, high-risk pregnancies and malnourished children are spotted too late, and programme managers wait weeks for numbers they need today.',
      'With Avni, health workers register families, record every visit and are prompted when a pregnancy is high-risk, a child’s growth falters or a follow-up is due, even without internet. WHO growth charts and immunisation schedules are built in, and supervisors see every case in real time so they can act early.',
    ],
    programmes: [
      {
        name: 'Maternal and child health',
        examples: [
          { name: 'Calcutta Kids', href: '/resources/case-studies/calcutta-kids-avni-implemented-for-maternal-and-child-health-program/' },
          { name: 'APF Odisha', href: '/resources/case-studies/2025-05-28-bridging-the-nutrition-gap-apf-odisha/' },
          { name: 'ASHWINI', href: '/blog/how-avni-has-become-pillar-of-community-MIS-at-ASHWINI/' },
        ],
      },
      {
        name: 'Child malnutrition',
        examples: [
          { name: 'JNPCT', href: '/resources/case-studies/use-of-avni-in-jnpct-malnutrition-project-case-study/' },
          { name: 'APF Odisha', href: '/resources/case-studies/2025-05-28-bridging-the-nutrition-gap-apf-odisha/' },
        ],
      },
      {
        name: 'Sickle cell screening and treatment',
        examples: [
          { name: 'Jan Swasthya Sahyog', href: '/resources/case-studies/avni-for-sickle-cell-disease-screening-and-treatment/' },
          { name: 'ASHWINI', href: '/blog/how-avni-has-become-pillar-of-community-MIS-at-ASHWINI/' },
        ],
      },
      {
        name: 'Adolescent health and menstrual hygiene',
        examples: [
          { name: 'IHMP Pachod', href: '/resources/case-studies/2025-05-02-ihmp-strengthening-adolescent-health/' },
          { name: 'SEWA Rural', href: '/blog/2024-06-25-digitising-adolescent-community-program-using-avni/' },
        ],
      },
      {
        name: 'NCD and cancer screening',
        examples: [
          { name: 'Yenepoya', href: '/blog/2024-06-20-yenepoya-visit/' },
          { name: 'ASHWINI', href: '/blog/2026-06-16-inside-ashwini-community-healthcare-nilgiris/' },
          { name: 'Purna Clinic', href: '/resources/case-studies/2026-05-05-purna-clinic-tide-trust-dangs/' },
        ],
      },
      {
        name: 'Tuberculosis',
        examples: [
          { name: 'ASHWINI', href: '/blog/how-avni-has-become-pillar-of-community-MIS-at-ASHWINI/' },
        ],
      },
      {
        name: 'Eye care camps',
        examples: [
          { name: 'Project Chashma', href: '/resources/case-studies/2024-05-22-empowering-vision-care-chashma-tech4dev/' },
        ],
      },
      {
        name: 'Primary care in remote villages',
        examples: [
          { name: 'Purna Clinic', href: '/resources/case-studies/2026-05-05-purna-clinic-tide-trust-dangs/' },
          { name: 'Lok Biradari Prakalp', href: '/resources/case-studies/2019-09-02-prescription-tool/' },
        ],
      },
    ],
  },
  {
    name: 'Water & Sanitation',
    description: [
      'WASH programs face challenges in monitoring water quality, tracking infrastructure maintenance, and ensuring sustained behavior change across communities. Paper-based systems make it difficult to identify non-functional water points, track sanitation coverage, and measure program impact at scale.',
      'Avni streamlines WASH program management with digital asset registers, automated maintenance schedules, and household-level tracking. Field teams can conduct water quality tests, monitor toilet construction, and track hygiene behavior adoption while program managers access real-time dashboards showing coverage gaps and infrastructure status.',
    ],
  },
  {
    name: 'Waste Management',
    description: [
      'Waste management initiatives struggle with inefficient collection routes, limited visibility into waste segregation practices, and difficulty tracking waste-picker livelihoods. Manual systems make it hard to optimize operations, ensure fair compensation, and demonstrate environmental impact to stakeholders.',
      'Avni digitizes waste management with GPS-enabled route tracking, household-level waste segregation monitoring, and waste-picker welfare management. Organizations can track collection efficiency, measure recycling rates, manage payments to waste-pickers, and generate impact reports showing waste diverted from landfills and carbon emissions reduced.',
    ],
  },
  {
    name: 'Social Security',
    description: [
      'Social protection programs face challenges in identifying eligible beneficiaries, preventing duplication, and ensuring timely benefit delivery — especially for vulnerable populations like elderly, disabled, and marginalized communities. Paper-based systems create delays, errors, and limited accountability in benefit distribution.',
      'Avni enables efficient social security management with digital beneficiary databases, automated eligibility assessment, and benefit tracking workflows. Field workers can conduct household surveys, verify documents, and process applications while administrators monitor disbursement status, identify coverage gaps, and generate compliance reports for government and donor requirements.',
    ],
  },
  {
    name: 'Livelihood',
    description: [
      'Livelihood programmes work with artisans, self-help groups, farmers and small producers over months and years. Keeping track of who was trained, what they produce, what material and support reached them, and how their work is growing is hard on paper and scattered spreadsheets, and harder still to show to funders.',
      'With Avni, field teams register each person or group, record trainings, production, material and sales, and follow their progress over time, even offline. Programme teams see everything in one place, so the change in people’s livelihoods becomes something they can track and show.',
    ],
    programmes: [
      {
        name: 'Women artisans and handicraft enterprises',
        examples: [
          { name: 'Udgam Handicrafts', href: '/blog/2026-08-06-udgam-handicrafts-mumbai/' },
        ],
      },
      {
        name: 'Community development and material distribution',
        examples: [
          { name: 'Goonj', href: '/resources/case-studies/2025-09-03-how-goonj-uses-avni/' },
        ],
      },
    ],
  },
  {
    name: 'Legal Aid',
    description: [
      'Legal aid organizations face challenges in managing high caseloads, tracking case progress across multiple hearings, and ensuring timely follow-ups with vulnerable clients. Paper-based systems create delays in accessing case history, difficulty coordinating between lawyers and paralegals, and limited visibility into program outcomes.',
      'Avni streamlines legal aid delivery with digital case management, automated hearing reminders, and client communication tracking. Legal teams can maintain comprehensive case files, track court dates and documentation, coordinate with clients through SMS/call logs, and generate reports showing case resolution rates, types of legal issues addressed, and impact on beneficiary rights.',
    ],
  },
  {
    name: 'Sports',
    description: [
      'Grassroots sports programs struggle to track athlete development, monitor training attendance, and identify talent across diverse communities. Manual systems make it difficult to maintain performance records, coordinate tournaments, and demonstrate program impact in building athletic skills and life skills among youth.',
      'Avni empowers sports programs with digital athlete profiles, training attendance tracking, and performance monitoring tools. Coaches can record fitness assessments, track skill progression, manage team selections, and coordinate events while program managers access dashboards showing participation rates, performance improvements, and tournament outcomes across different age groups and locations.',
    ],
  },
];
