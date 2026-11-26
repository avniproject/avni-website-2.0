/**
 * Sectors
 * Sectors on the Solutions page. Each sector's case studies are added automatically from
 * content/case-studies (matched on their `sector`). Edit the text here, sector by sector.
 */

export interface Sector {
  name: string;
  description: string[];
}

export const sectors: Sector[] = [
  {
    name: 'Education',
    description: [
      'Education-focused NGOs deal with challenges in tracking student attendance, learning progress, and teacher interventions — especially in rural or low-resource settings. Paper-based systems make it difficult to evaluate program effectiveness and scale successful models.',
      'Avni simplifies education data management with digital classroom records, assessment tracking, and cohort monitoring. Real-time dashboards help organizations identify learning gaps early and improve program delivery across schools and community centers.',
    ],
  },
  {
    name: 'Healthcare',
    description: [
      'Community health programs struggle with fragmented patient data, inconsistent follow-ups, and limited visibility into health outcomes — especially in underserved areas. Manual record-keeping makes it difficult to track chronic conditions, maternal health, immunization schedules, and disease surveillance effectively.',
      'Avni transforms healthcare delivery with digital patient profiles, automated visit scheduling, and real-time health monitoring. Field workers can track vital signs, medication adherence, and treatment outcomes while supervisors gain actionable insights through comprehensive dashboards and alerts for high-risk cases.',
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
      'Livelihood programs struggle to track skill development progress, monitor job placements, and measure income improvements across diverse beneficiaries. Manual systems make it difficult to match candidates with opportunities, track training effectiveness, and demonstrate long-term economic impact to funders.',
      'Avni transforms livelihood programming with digital trainee profiles, skill assessment tracking, and placement monitoring systems. Organizations can manage training batches, track attendance and performance, facilitate employer connections, monitor post-placement income growth, and generate impact reports showing employment rates and income improvements over time.',
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
