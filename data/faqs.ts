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
    id: 'dpdp',
    title: 'Data protection (DPDP Act)',
    faqs: [
      {
        question: 'Does the DPDP Act apply to our programme on Avni?',
        answer: 'India’s Digital Personal Data Protection (DPDP) Act takes full effect on 13 May 2027. It covers personal information kept in digital form, meaning details that can identify someone, such as a beneficiary’s name or phone number. Paper records count once they are entered into Avni or uploaded as a photo. If your programme records only things like water sources, buildings or stock, much of it may not apply to you.',
      },
      {
        question: 'Who is responsible under the Act: our organisation or Samanvay?',
        answer: 'Both. Your organisation decides what beneficiary data to collect and why, so it has the main responsibilities. Samanvay also has responsibilities because we process that data on your behalf in Avni. Before May 2027 we will share a contract update that sets out what each of us is responsible for.',
      },
      {
        question: 'What will change for our field workers?',
        answer: 'From May 2027, field workers will need to show new beneficiaries a notice and get their consent before registering them. For a child, a parent or guardian gives consent. Beneficiaries already in Avni need the notice too, and you may need to take their consent as well.',
      },
      {
        question: 'Will Avni support notice and consent?',
        answer: 'Yes. Before registering a beneficiary, the field worker will show your notice and record their consent, on the phone even without the internet, and on the web. Your team sets up your own notice in Avni. Our target is March 2027, and we will help your team set it up.',
      },
      {
        question: 'Where is our data stored, and how is it protected?',
        answer: 'All data in Avni is stored in India, with backup copies at a second location in India, and it is encrypted on our servers. Phones can be encrypted too. A field worker’s phone holds only the records for their area, each record shows who created and last changed it, and only users you authorise can download data in bulk.',
      },
      {
        question: 'Does any data go outside India?',
        answer: 'Your programme data stays in India. A few tools we use to send login emails and to monitor the app run outside India. We are moving login emails to India and making sure the monitoring tools receive no personal data, with a target of March 2027.',
      },
      {
        question: 'What if a beneficiary withdraws consent or asks to see, correct or delete their data?',
        answer: 'By May 2027, we aim to let your team record in Avni when someone withdraws consent, and see which existing beneficiaries still need your notice. For requests to see, correct or delete personal data, your team initially passes the request to us and we act on it.',
      },
      {
        question: 'What happens if there is a security incident?',
        answer: 'We report security incidents to CERT-In, the government’s cybersecurity agency. If an incident affects your data, we will let you know quickly. If a field worker’s phone is lost or stolen, tell us within a day so we can block that user’s access.',
      },
      {
        question: 'We keep beneficiary data in other systems too. What then?',
        answer: 'The Act holds your organisation responsible for consent across all your systems. Such organisations usually manage consent in one place of their own, and Avni will be able to link to it in the second half of 2027. Until then, your team passes requests to us and we act on them.',
      },
      {
        question: 'What can our organisation start on now?',
        answer: 'Choose one person to look after data protection and include their contact details in your notice. Write the notice in simple language and in the languages your beneficiaries speak, explaining what data you collect, why, and their rights. Plan how you will share it with existing beneficiaries, which for field programmes usually means visiting them. For questions, write to avnisupport@samanvayfoundation.org. For what the law asks of your organisation in particular, your legal adviser is the best person to ask.',
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
