/**
 * Media Gallery
 * Photo albums for the Media Gallery page. Photos come from blog posts; each links back
 * to its story. Leave out close-ups of beneficiaries (especially children) and photos
 * with readable personal data on screens.
 */

export interface GalleryPhoto {
  src: string;
  caption: string;
  href: string; // the blog post the photo comes from
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  photos: GalleryPhoto[];
}

const blog = (slug: string) => `/blog/${slug}/`;

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 'field',
    title: 'In the field',
    description: 'Field workers, health workers and NGO teams using Avni where the work happens',
    photos: [
      { src: '/img/2023-10-04-my-reflections-from-first-Avni-field-visit-after-joining-as-ba/arogya_saheli_remote_village_visit.webp', caption: 'An Arogya Saheli on her way to a remote village, Dharampur', href: blog('2023-10-04-my-reflections-from-first-Avni-field-visit-after-joining-as-ba') },
      { src: '/img/2024-09-17-My-First-Field-Visit-to-Harsha-Trust-Seeing-Avni’s-Impact-in-Action/APF_Blog_5.webp', caption: 'Field workers recording visits on Avni, Odisha', href: blog('2024-09-17-my-first-field-visit-to-harsha-trust-seeing-avnis-impact-in-action') },
      { src: '/img/data-protection/field-worker-phone.webp', caption: 'A community health worker using Avni, ASHWINI, Nilgiris', href: blog('2026-06-16-inside-ashwini-community-healthcare-nilgiris') },
      { src: '/img/2023-10-04-my-reflections-from-first-Avni-field-visit-after-joining-as-ba/arogya_saheli_using_avni.webp', caption: 'Talking through the programme with field staff, Dharampur', href: blog('2023-10-04-my-reflections-from-first-Avni-field-visit-after-joining-as-ba') },
      { src: '/img/2026-03-05-naya-savera-field-week-rajasthan/uat-training-session.webp', caption: 'Testing the Naya Savera app with the field team, Rajasthan', href: blog('2026-03-05-naya-savera-field-week-rajasthan') },
      { src: '/img/2022-12-08-field-visit-APF/interaction_with_POSHAN_sathi_users.webp', caption: 'Meeting POSHAN Sathi users, Azim Premji Foundation', href: blog('2022-12-08-apf-field-visit') },
      { src: '/img/2026-07-16-visiting-jss-ganiyari/jss-9.webp', caption: 'Health workers at Jan Swasthya Sahyog, Ganiyari', href: blog('2026-07-16-visiting-jss-ganiyari') },
      { src: '/img/2023-10-04-my-reflections-from-first-Avni-field-visit-after-joining-as-ba/dharampur_arogya_saheli.webp', caption: 'Arogya Sahelis after a training session, Dharampur', href: blog('2023-10-04-my-reflections-from-first-Avni-field-visit-after-joining-as-ba') },
      { src: '/img/2026-03-05-naya-savera-field-week-rajasthan/vlm-training-group-photo.webp', caption: 'Village-level workers after their Avni training, Rajasthan', href: blog('2026-03-05-naya-savera-field-week-rajasthan') },
    ],
  },
  {
    id: 'community',
    title: 'Community and events',
    description: 'Avni Conference, Launchpad cohorts, and the gatherings where NGOs share what works',
    photos: [
      { src: '/img/2026-08-04-launchpad-2026-mumbai/launchpad-5.webp', caption: 'Avni Launchpad 2026, Mumbai', href: blog('2026-08-04-launchpad-2026-mumbai') },
      { src: '/img/2026-10-01-jal-chaupal-2026/group-photo@2x.webp', caption: 'Jal Chaupal 2026', href: blog('2026-10-01-jal-chaupal-2026') },
      { src: '/img/2026-04-01-avni-launchpad-experience/workshop-session.webp', caption: 'A Launchpad workshop session', href: blog('2026-04-01-avni-launchpad-experience') },
      { src: '/img/2026-10-01-jal-chaupal-2026/panel-discussion@2x.webp', caption: 'Panel discussion at Jal Chaupal 2026', href: blog('2026-10-01-jal-chaupal-2026') },
      { src: '/img/2026-08-04-launchpad-2026-mumbai/launchpad-2.webp', caption: 'Launchpad 2026 in session', href: blog('2026-08-04-launchpad-2026-mumbai') },
      { src: '/img/2026-04-01-avni-launchpad-experience/group-photo.webp', caption: 'Launchpad participants', href: blog('2026-04-01-avni-launchpad-experience') },
      { src: '/img/2025-11-28-charcha-2025-reflections-ashok/2.webp', caption: 'Conversations at Charcha 2025', href: blog('2025-11-28-charcha-2025-reflections-ashok') },
      { src: '/img/2026-09-25-glific-connect-2026/session@2x.webp', caption: 'Glific Connect 2026', href: blog('2026-09-25-glific-connect-2026') },
      { src: '/img/2025-11-28-charcha-2025-reflections-ashok/4.webp', caption: 'Charcha 2025', href: blog('2025-11-28-charcha-2025-reflections-ashok') },
    ],
  },
  {
    id: 'team',
    title: 'The Avni team',
    description: 'The people at Samanvay who build and support Avni',
    photos: [
      { src: '/img/2026-10-01-jal-chaupal-2026/with-the-team@2x.webp', caption: 'The team at Jal Chaupal 2026', href: blog('2026-10-01-jal-chaupal-2026') },
      { src: '/img/2024-09-03-avni-retreat-2024/1.webp', caption: 'Avni Retreat 2024', href: blog('2024-09-03-avni-retreat-2024') },
      { src: '/img/2024-09-03-avni-retreat-2024/2.webp', caption: 'A hike at the Avni Retreat 2024', href: blog('2024-09-03-avni-retreat-2024') },
      { src: '/img/2026-04-01-avni-launchpad-experience/collaborative-problem-solving.webp', caption: 'Working through problems together at Launchpad', href: blog('2026-04-01-avni-launchpad-experience') },
      { src: '/img/2024-06-03-avni-conference-goa/team.webp', caption: 'The team at the Avni Conference, Goa', href: blog('2024-01-22-avni-conference-goa') },
    ],
  },
];
