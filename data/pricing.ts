/**
 * Pricing Data
 * Prices and plan details for the Pricing page. Taken from the old site's pricing and FAQ
 * pages; edit here when the sales team updates them.
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

// Shown as "Work with Avni experts"; descriptions match the Services page
export const expertServices = [
  {
    title: 'Implementation',
    detail: 'We turn your programme needs into a working Avni app, from mapping requirements to rollout.',
    points: ['Requirement analysis and programme mapping', 'Form and workflow configuration', 'Data migration and testing', 'Go-live support'],
    href: '/services#implementation',
  },
  {
    title: 'Training & Support',
    detail: 'Hands-on training and ongoing support so your team can run Avni with confidence.',
    points: ['Structured onboarding sessions', 'Admin and field worker training', 'Ongoing technical support'],
    href: '/services#training-support',
  },
  {
    title: 'Dedicated Hosting',
    detail: 'Run Avni on your own servers or private cloud, for full control over data and infrastructure.',
    points: ['Full control over data and infrastructure', 'Custom security and compliance settings', 'Optional technical guidance from the Avni team'],
    href: '/services#dedicated-hosting',
  },
];

export const pricingFaqs = [
  {
    question: 'If Avni is open source, why do I have to pay?',
    answer: 'You don’t pay for the software, it is free. The plans cover the people and computing costs of building your app and hosting it on the Avni cloud.',
  },
  {
    question: 'Can I host Avni myself?',
    answer: 'Yes. You can run Avni on your own servers at no licence cost. A typical setup on AWS costs around ₹12,000 a month, excluding the people who manage it. Our documentation explains the components you need.',
  },
  {
    question: 'How is hosting billed?',
    answer: 'Hosting is priced per month and paid upfront for the year. Self-Service and Assisted plans include the first month free.',
  },
  {
    question: 'Are taxes included?',
    answer: 'No, all prices are exclusive of taxes.',
  },
  {
    question: 'Can I modify Avni?',
    answer: 'Yes, under the terms of the AGPL 3 licence.',
  },
];
