/**
 * Pricing Data
 * Prices and plan details for the Pricing page. Taken from the old site's pricing page;
 * edit here when the sales team updates them.
 */

export interface Plan {
  id: 'self-service' | 'assisted' | 'managed';
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: { label: string; action: 'signup' | 'demo' | 'contact' };
  highlighted?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'self-service',
    name: 'Self-Service',
    tagline: 'Build your app and reports yourself',
    price: 'Free',
    priceNote: 'One month of free hosting',
    features: [
      'Build your app and reports on the Avni low-code platform',
      'Support from the online community',
      'One month of free hosting',
    ],
    cta: { label: 'Try for Free', action: 'signup' },
  },
  {
    id: 'assisted',
    name: 'Assisted Self-Service',
    tagline: 'Build it yourself, with training and expert help',
    price: '₹40,000',
    priceNote: 'One-time',
    features: [
      '12 hours of live training on the Avni low-code platform',
      '8 hours of consulting support over the next month',
      'One month of free hosting after training',
    ],
    cta: { label: 'Sign Up', action: 'signup' },
    highlighted: true,
  },
  {
    id: 'managed',
    name: 'Avni Managed',
    tagline: 'We build Avni to your needs',
    price: 'Custom quote',
    priceNote: 'Based on your programme',
    features: [
      'We build and configure Avni for your programme',
      'Migration from your existing system, or integration with other systems',
      'Training for your master trainers',
    ],
    cta: { label: 'Talk to Us', action: 'contact' },
  },
];

// Avni Cloud Hosting, per month, paid upfront annually
export const hostingTiers = [
  { size: 'Up to 20 users', limits: '5,000 forms a month · 500 GB storage', selfService: '₹10,500', managed: '₹7,000' },
  { size: 'Up to 100 users', limits: '10,000 forms a month · 1 TB storage', selfService: '₹15,000', managed: '₹10,000' },
  { size: 'More than 100 users', limits: 'Higher limits to suit your programme', selfService: 'Custom quote', managed: 'Custom quote' },
];

export const hostingIncludes = [
  'Hosting of your app on the Avni cloud',
  'Regular upgrades of Avni and its components',
  'Data backups',
  'Maintenance of your app on the Play Store',
  'Priority support for your field users',
  'Metabase or Superset for reports and dashboards, pre-installed',
];

export const planGuidance = [
  {
    plan: 'Self-Service',
    when: 'Your project is simple',
    detail: 'A simple project has fewer than 5 forms with straightforward rules. If you could build it in Google Forms, you can build it in Avni on your own.',
  },
  {
    plan: 'Assisted Self-Service',
    when: 'Your project is simple, and you want a strong start',
    detail: 'New users often need some hand-holding. The training and consulting hours help your team get the most out of Avni from day one.',
  },
  {
    plan: 'Avni Managed',
    when: 'Your project is complex, or your team is stretched',
    detail: 'If your programme has many forms and rules, or nobody on your team has the time to build it, we build it with you.',
  },
];
