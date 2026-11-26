/**
 * FAQs
 * Questions for the FAQ page, by category. Answers come from the old site's FAQ, pricing
 * and features pages. The Pricing page shows the 'pricing' category.
 * Answers may contain links: [text](url), turned into links by the FAQ list.
 */

export interface Faq {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  faqs: Faq[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    faqs: [
      {
        question: 'I want to use Avni. Where do I start?',
        answer: 'Book a demo to see Avni with a programme like yours, or sign up and try it yourself. The [documentation](https://avni.readme.io/docs) explains how to set it up, and you can ask questions on our [Discord community](https://discord.gg/4pcgcQW8pk) or through the [contact form](/contact).',
      },
      {
        question: 'I can’t set Avni up myself. Can someone do it for us?',
        answer: 'Yes. Our team can build and host Avni for you under the [Avni Managed plan](/pricing). We can also help you find an implementation partner near you, or help a partner you already work with learn Avni.',
      },
      {
        question: 'Does Avni work without the internet?',
        answer: 'Yes. Every feature of the field app works offline. Field workers collect data all day and sync when they have a signal.',
      },
      {
        question: 'Can field workers use Avni in their own language?',
        answer: 'Yes. One programme can run in several languages, and a translation manager helps you keep them up to date.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing and hosting',
    faqs: [
      {
        question: 'If Avni is open source, why do I have to pay?',
        answer: 'You don’t pay for the software, it is free. The [plans](/pricing) cover the people and computing costs of building your app and hosting it on the Avni cloud.',
      },
      {
        question: 'How much does an implementation cost?',
        answer: 'There is no licence cost. The costs are for building your app, hosting it and supporting your users, and depend on how complex your programme is, the number of users and the workload. See the [pricing page](/pricing), or write to avnipartnerships@samanvayfoundation.org for a quote.',
      },
      {
        question: 'Can I host Avni myself?',
        answer: 'Yes. You can run Avni on your own servers at no licence cost. A typical setup on AWS costs around ₹12,000 a month, excluding the people who manage it. The [setup guides](https://avni.readme.io/docs/environment-setup-guides) explain the components you need.',
      },
      {
        question: 'How is hosting billed?',
        answer: 'Hosting is priced per month and paid upfront for the year. Self-Service and Assisted plans include the first month free.',
      },
      {
        question: 'Are taxes included?',
        answer: 'No, all prices are exclusive of taxes.',
      },
    ],
  },
  {
    id: 'open-source',
    title: 'Open source and data',
    faqs: [
      {
        question: 'Can I modify Avni?',
        answer: 'Yes, under the terms of the AGPL 3 licence.',
      },
      {
        question: 'Who can see our programme’s data?',
        answer: 'You decide. Access control lets you set which user groups can view, register, edit or delete each kind of record.',
      },
      {
        question: 'Can we get our data out of Avni?',
        answer: 'Yes. Download exports from the web app, or pull data into your other systems with the [API](https://avni.readme.io/docs/api-guide).',
      },
    ],
  },
];
