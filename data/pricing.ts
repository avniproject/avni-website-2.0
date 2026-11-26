/**
 * Pricing Data
 * Prices and plan details for the Pricing page. Taken from the old site's pricing page;
 * edit here when the sales team updates them. Pricing FAQs are in data/faqs.ts
 */

export interface PlanFeature {
  label: string;
  detail: string;
}

export interface HostingPrice {
  size: string;
  price: string;
}

export interface Plan {
  id: 'self-service' | 'assisted' | 'managed';
  name: string;
  bestFor: string;
  price: string;
  priceNote: string;
  cta: { label: string; href: string };
  features: PlanFeature[];
  hostingTitle: string;
  hosting: HostingPrice[];
  badge?: string;
}

// Hosting limits per size: up to 20 users = 5,000 forms a month and 500 GB storage;
// up to 100 users = 10,000 forms a month and 1 TB storage. Prices per month, paid upfront annually.
export const plans: Plan[] = [
  {
    id: 'self-service',
    name: 'Self-Service',
    bestFor: 'Simple projects: fewer than 5 forms with straightforward rules',
    price: 'Free',
    priceNote: 'No setup fee',
    cta: { label: 'Try for Free', href: '/signup' },
    features: [
      { label: 'Build it yourself', detail: 'Create your app and reports on the Avni low-code platform' },
      { label: 'Community support', detail: 'Get help from the online Avni community' },
      { label: 'Free first month', detail: 'One month of hosting at no cost' },
    ],
    hostingTitle: 'Hosting after the first month',
    hosting: [
      { size: 'Up to 20 users', price: '₹10,500' },
      { size: 'Up to 100 users', price: '₹15,000' },
      { size: 'More than 100 users', price: 'Custom quote' },
    ],
  },
  {
    id: 'assisted',
    name: 'Assisted Self-Service',
    bestFor: 'Simple projects, with training so your team starts strong',
    price: '₹40,000',
    priceNote: 'One-time',
    cta: { label: 'Sign Up', href: '/signup' },
    features: [
      { label: 'Live training', detail: '12 hours of hands-on training on the Avni low-code platform' },
      { label: 'Consulting support', detail: '8 hours of expert help over the following month' },
      { label: 'Free first month', detail: 'One month of hosting at no cost after training' },
    ],
    hostingTitle: 'Hosting after the first month',
    hosting: [
      { size: 'Up to 20 users', price: '₹10,500' },
      { size: 'Up to 100 users', price: '₹15,000' },
      { size: 'More than 100 users', price: 'Custom quote' },
    ],
    badge: 'Includes training',
  },
  {
    id: 'managed',
    name: 'Avni Managed',
    bestFor: 'Complex programmes, or teams without time to build',
    price: 'Custom quote',
    priceNote: 'Based on your programme',
    cta: { label: 'Talk to Us', href: '/contact' },
    features: [
      { label: 'Built for you', detail: 'We configure Avni to your programme’s needs' },
      { label: 'Migration and integration', detail: 'Move from your existing system, or connect Avni to other systems' },
      { label: 'Train the trainers', detail: 'We train your master trainers to roll Avni out' },
    ],
    hostingTitle: 'Hosting after go-live',
    hosting: [
      { size: 'Up to 20 users', price: '₹7,000' },
      { size: 'Up to 100 users', price: '₹10,000' },
      { size: 'More than 100 users', price: 'Custom quote' },
    ],
  },
];

export const hostingIncludes = [
  'Hosting of your app on the Avni cloud',
  'Regular upgrades of Avni and its components',
  'Data backups',
  'Maintenance of your app on the Play Store',
  'Priority support for your field users',
  'Metabase or Superset for reports, pre-installed',
];

// Extras on top of any plan. Each "Get a quote" opens the contact form with `quoteFor` pre-filled.
// To confirm with the sales team: which of these are sold separately
export interface AddOn {
  title: string;
  detail: string;
  points: string[];
  integratedWith?: { name: string; logo: string }[];
  quoteFor: string;
}

export const addOns: AddOn[] = [
  {
    title: 'Dedicated Hosting',
    detail: 'Run Avni on your own servers or private cloud, for full control over your data.',
    points: ['Full control over data and infrastructure', 'Custom security and compliance settings', 'Technical guidance from the Avni team'],
    quoteFor: 'Dedicated Hosting',
  },
  {
    title: 'Extra Training',
    detail: 'More hands-on sessions for your admins and field workers, beyond what your plan includes.',
    points: ['Admin and field worker training', 'Refresher sessions for new staff', 'Training for your master trainers'],
    quoteFor: 'Extra Training',
  },
  {
    title: 'Integrations',
    detail: 'Connect Avni to the other systems your programme relies on.',
    points: ['WhatsApp messaging through Glific or Wati', 'Calls and SMS through Exotel', 'Hospital records with Bahmni', 'Custom integrations with your own systems'],
    integratedWith: [
      { name: 'Bahmni', logo: '/logos/integrations/bahmni.webp' },
      { name: 'Exotel', logo: '/logos/integrations/exotel.svg' },
      { name: 'Glific', logo: '/logos/integrations/glific.svg' },
      { name: 'Wati', logo: '/logos/integrations/wati.svg' },
    ],
    quoteFor: 'Integrations',
  },
];
