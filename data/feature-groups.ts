/**
 * Feature Groups
 * Avni's features for the Features page, grouped by what an organisation wants to do.
 * Text and screenshots come from the old site's features page. Media are files in
 * public/img/features (.webp images, .mp4 screen recordings).
 */

export interface FeatureMedia {
  src: string;
  alt: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  media: FeatureMedia[];
  link?: { label: string; href: string };
}

export interface FeatureGroup {
  id: string;
  title: string;
  summary: string;
  features: Feature[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: 'build',
    title: 'Build your app',
    summary: 'Set up Avni to match your programme, in the browser, without writing code',
    features: [
      {
        id: 'model-your-programme',
        title: 'Model your programme',
        description: 'Define the people, households, groups and places you work with, the programmes they enrol in and the visits they get. Much more than forms and case management.',
        media: [
          { src: '/img/features/data-model-1.webp', alt: 'Programme model: a beneficiary enrolled in pregnancy and child programmes' },
          { src: '/img/features/data-model-3.webp', alt: 'Household model with members and their relationships' },
          { src: '/img/features/data-model-2.webp', alt: 'Programme model for a water body desilting project' },
          { src: '/img/features/household.webp', alt: 'Household registration with members in the field app' },
        ],
      },
      {
        id: 'design-in-browser',
        title: 'Design forms in your browser',
        description: 'Create and change forms, questions and your data model from the web app. Your field workers get the changes on their next sync.',
        media: [
          { src: '/img/features/self-design-1.webp', alt: 'Form designer in the web app' },
          { src: '/img/features/self-design-2.webp', alt: 'List of forms in the web app' },
        ],
      },
      {
        id: 'powerful-forms',
        title: 'Powerful forms',
        description: 'Skip logic shows only the questions that apply, calculated fields fill in values like age or BMI, and validations catch mistakes before they are saved.',
        media: [
          { src: '/img/features/skip-logic.mp4', alt: 'Skip logic hiding questions that do not apply' },
          { src: '/img/features/calculated-field.mp4', alt: 'A calculated field filling in automatically' },
        ],
      },
      {
        id: 'reuse-programmes',
        title: 'Start from an existing programme',
        description: 'Copy another organisation’s Avni setup, such as a maternal and child health programme, and adapt it instead of starting from scratch.',
        media: [],
      },
    ],
  },
  {
    id: 'field',
    title: 'Work in the field',
    summary: 'A mobile app built for field workers in places with poor connectivity',
    features: [
      {
        id: 'offline',
        title: 'Works fully offline',
        description: 'Every feature works without the internet. Field workers collect data all day and sync when they find a signal.',
        media: [],
      },
      {
        id: 'languages',
        title: 'In your field workers’ languages',
        description: 'Run one programme in several languages, with a translation manager to keep them up to date.',
        media: [],
      },
      {
        id: 'search-dashboard',
        title: 'Find people and plan the day',
        description: 'Search beneficiaries by what matters to you, like phone number, ID, class or health status, and see the day’s work on the field worker dashboard.',
        media: [
          { src: '/img/features/my-dashboard.webp', alt: 'Field worker dashboard in the mobile app' },
          { src: '/img/features/customisable-search.webp', alt: 'Setting up search filters' },
          { src: '/img/features/my-dashboard-filters.webp', alt: 'Setting up dashboard filters' },
        ],
      },
      {
        id: 'identifiers',
        title: 'IDs generated in the field',
        description: 'Assign each field worker a range of IDs, and the app generates unique IDs for new registrations, even offline.',
        media: [{ src: '/img/features/identifier-assignment.webp', alt: 'Assigning ID ranges to field workers' }],
      },
      {
        id: 'attendance',
        title: 'Take attendance',
        description: 'Record attendance for any group, such as a class, a self-help group or a training batch.',
        media: [],
      },
    ],
  },
  {
    id: 'guide',
    title: 'Guide field workers',
    summary: 'The app helps field workers decide what to do next, not just record data',
    features: [
      {
        id: 'decision-support',
        title: 'Decision support',
        description: 'Add your own rules to flag high-risk cases and recommend actions, so every field worker follows the same protocol.',
        media: [{ src: '/img/features/encounter-scheduling-1.webp', alt: 'System recommendations flagging a high-risk pregnancy' }],
      },
      {
        id: 'counselling',
        title: 'Counselling checklists',
        description: 'Step-by-step checklists help field workers counsel beneficiaries on topics like nutrition, hygiene or addiction.',
        media: [
          { src: '/img/features/counselling2.webp', alt: 'Counselling checklist on menstrual hygiene' },
          { src: '/img/features/counselling1.webp', alt: 'Counselling checklist on addiction' },
        ],
      },
      {
        id: 'scheduling',
        title: 'Visit scheduling',
        description: 'Follow-up visits are scheduled automatically from your rules, and field workers can adjust them. Overdue visits stand out.',
        media: [{ src: '/img/features/encounter-scheduling-2.webp', alt: 'Planned visits for a beneficiary' }],
      },
    ],
  },
  {
    id: 'data',
    title: 'Use your data',
    summary: 'All field data in one place, ready for reports, exports and other systems',
    features: [
      {
        id: 'central-database',
        title: 'One central database',
        description: 'Data from every field worker comes together in one place. Download exports, including the full history of each person or case.',
        media: [{ src: '/img/features/longitudinal-export.webp', alt: 'Setting up a data export' }],
      },
      {
        id: 'reports',
        title: 'Reports and dashboards',
        description: 'Build reports and dashboards on your programme data with Metabase or Superset, set up for you on the Avni cloud.',
        media: [],
      },
      {
        id: 'api',
        title: 'API',
        description: 'Pull data out of Avni into your other systems with a REST and JSON API.',
        media: [],
        link: { label: 'API guide', href: 'https://avni.readme.io/docs/api-guide' },
      },
    ],
  },
  {
    id: 'security',
    title: 'Keep data safe',
    summary: 'Control who sees and changes what',
    features: [
      {
        id: 'access-control',
        title: 'Access control',
        description: 'Decide which user groups can view, register, edit or delete each kind of record. Log in with OTP.',
        media: [{ src: '/img/features/access-control.webp', alt: 'Access control settings for a user group' }],
      },
    ],
  },
  {
    id: 'health',
    title: 'For health programmes',
    summary: 'Ready-made features you can switch on for health work',
    features: [
      {
        id: 'growth-charts',
        title: 'WHO growth charts',
        description: 'Plot each child’s weight and height on WHO standard growth charts to spot malnutrition early.',
        media: [{ src: '/img/features/child-growth-chart.webp', alt: 'Weight-for-age chart for a child' }],
      },
      {
        id: 'immunisation',
        title: 'Immunisation schedules',
        description: 'Track standard vaccinations, see what is due or overdue, and add your own vaccines.',
        media: [{ src: '/img/features/child-immunisation.webp', alt: 'Immunisation checklist showing overdue and due vaccines' }],
      },
    ],
  },
];
