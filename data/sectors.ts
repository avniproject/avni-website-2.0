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
      'Water and sanitation programmes build and look after physical assets, such as water bodies, household tap connections and toilets, across hundreds of villages and settlements. With work spread over many sites and seasons, it is hard to know on paper which work is done and verified, and whether the assets keep working.',
      'With Avni, field teams record each site with photos and location, follow work like desilting or tap connections from start to finish, and capture household and community details along the way. Programme teams, partners and funders see progress across every site and district in one place.',
    ],
    programmes: [
      {
        name: 'Restoring water bodies',
        examples: [
          { name: 'ATECF', href: '/resources/case-studies/2025-04-30-restoring-waterbodies-avni-atecf/' },
          { name: 'Dam desilting monitoring', href: '/resources/case-studies/dam-and-water-bodies-desilting-work-monitoring-1/' },
        ],
      },
      {
        name: 'Drinking water for every household',
        examples: [
          { name: 'Arghyam, Jal Jeevan Mission', href: '/resources/case-studies/2024-11-11-jal-jeevan-mission-arghyam/' },
        ],
      },
      {
        name: 'Sanitation and housing in urban slums',
        examples: [
          { name: 'Shelter Associates', href: '/blog/shelter-journey-remoulding-data-collection-paper-kobotoolbox-avni/' },
        ],
      },
    ],
  },
  {
    name: 'Agriculture',
    description: [
      'Agriculture programmes support farmers across scattered villages and changing seasons, with inputs, training, water and soil improvement. Knowing which farmers were reached, what support they received and what changed on their land is hard to keep track of on paper.',
      'With Avni, field teams register farmers and their land, record visits, trainings and support, and follow results season after season, even offline. Programme teams can see which farmers benefited and show the change on the ground.',
    ],
    programmes: [
      {
        name: 'Silt from water bodies for farmland',
        examples: [
          { name: 'ATECF', href: '/blog/2026-10-01-jal-chaupal-2026/' },
        ],
      },
    ],
  },
  {
    name: 'Waste Management',
    description: [
      'Waste pickers keep cities clean, yet their work is often unrecognised and they miss out on IDs, welfare schemes and fair income. Organisations that support them need to keep track of people, documents and services across many sites, and paper records get lost and slow down follow-ups.',
      'With Avni, field teams register waste pickers with digital profiles, track access to services such as KYC and scheme enrolment, and follow up from the field, even offline. Dashboards and exports show progress across projects at a glance.',
    ],
    programmes: [
      {
        name: 'Rights and services for waste pickers',
        examples: [
          { name: 'Hasiru Dala', href: '/resources/case-studies/2025-08-01-empowering-waste-pickers/' },
        ],
      },
    ],
  },
  {
    name: 'Social Security',
    description: [
      'Millions of eligible families miss out on government schemes, such as health insurance, ration cards and pensions, because of paperwork, low awareness and hard-to-reach offices. NGOs help them apply and follow up, often over many visits and many schemes.',
      'With Avni, field workers find out which schemes a family is eligible for, track each application until the benefit is received, and follow up even offline. Organisations see how many people they have helped, with which schemes, and where applications are stuck.',
    ],
    programmes: [
      {
        name: 'Access to health insurance schemes',
        examples: [
          { name: 'Project Potential', href: '/resources/case-studies/2024-11-27-Project-Potential-Bihar-Health-Access-Digitisation-Case-study/' },
        ],
      },
      {
        name: 'Relief and entitlements in emergencies',
        examples: [
          { name: 'Maha PECOnet', href: '/resources/case-studies/mahapeconet-use-of-avni-in-covid-relief/' },
        ],
      },
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
    name: 'Child Protection',
    description: [
      'Child protection programmes work with children at risk of labour, trafficking, child marriage and dropping out of school. Each child’s situation changes over time, and following them across families, schools and services is hard on paper.',
      'With Avni, field workers keep a record for each child and family, note risks and follow-ups, and make sure no case is lost. Access control keeps sensitive information visible only to the people who need it.',
    ],
    programmes: [
      {
        name: 'Children in tea plantations',
        examples: [
          { name: 'Save the Children', href: '/blog/2021-12-30-savethechildren-golive/' },
        ],
      },
    ],
  },
  {
    name: 'Legal Aid',
    description: [
      'Legal aid organisations help people who cannot otherwise reach justice, such as survivors of violence, workers and marginalised communities. Each case moves through many steps over months or years, with documents, hearings and follow-ups that are easy to lose track of on paper.',
      'With Avni, paralegals and field teams register cases, record each step and the next date, and follow up with clients from the field. Managers see every open case and where it stands.',
    ],
  },
  {
    name: 'Human Rights',
    description: [
      'Human rights organisations document violations, support survivors and help communities claim their rights. This work needs careful, consistent records collected in the field, often in places with poor connectivity and from people who must be protected.',
      'With Avni, field teams document cases in a structured way, even offline, track support and follow-up, and control exactly who can see sensitive information. The organisation gets reliable evidence for advocacy and action.',
    ],
  },
  {
    name: 'Sports',
    description: [
      'Sports-for-development programmes use games like netball and kho-kho to build confidence, life skills and gender equality, often with adolescent girls. Across hundreds of sessions and thousands of children in many places, attendance and progress are hard to track on spreadsheets.',
      'With Avni, coaches record attendance and sessions, track each participant’s progress over time, and programmes measure their impact across cities. No child gets left behind because their records got lost.',
    ],
    programmes: [
      {
        name: 'Sports for gender equality',
        examples: [
          { name: 'Maitrayana', href: '/resources/case-studies/2025-07-31-scoring-for-equality/' },
        ],
      },
      {
        name: 'Kho-kho and play for children',
        examples: [
          { name: 'KhelMel', href: '/blog/2026-07-20-visiting-khelmel-raigarh/' },
        ],
      },
    ],
  },
];
