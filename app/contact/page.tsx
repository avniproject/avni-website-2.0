/**
 * Contact Page
 * Message form, plus direct ways to reach the right team
 */

import { Metadata } from 'next';
import { CalendarDays, Handshake, LifeBuoy, Mail, MapPin, Rocket } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BookDemoLink from '@/components/ui/BookDemoLink';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Avni',
  description: 'Get in touch with the Avni team about digitising your field programme, partnerships, pricing or support.',
  openGraph: {
    title: 'Contact Us - Avni',
    description: 'Get in touch with the Avni team about digitising your field programme, partnerships, pricing or support.',
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  },
};

const EMAIL_CONTACTS = [
  {
    icon: Handshake,
    title: 'Partnerships & pricing',
    description: 'Implementation, hosting and costs for your programme',
    email: 'avnipartnerships@samanvayfoundation.org',
  },
  {
    icon: LifeBuoy,
    title: 'Support',
    description: 'Help for organisations already using Avni',
    email: 'avnisupport@samanvayfoundation.org',
  },
  {
    icon: Rocket,
    title: 'Avni Launchpad',
    description: 'Questions about the Launchpad programme',
    email: 'avnilaunchpad@samanvayfoundation.org',
  },
];

const OFFICE_ADDRESS = '1st Floor, 147, 10th Cross Rd, Binnamangala, Hoysala Nagar, Indiranagar, Bengaluru, Karnataka 560038';

const cardClass = 'flex gap-4 bg-white rounded-2xl shadow-sm p-5';
const iconClass = 'flex-shrink-0 w-10 h-10 rounded-xl bg-[#E8F3EE] text-[#2a7559] flex items-center justify-center';

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F5F5] pt-[72px]">
        <Section spacing="sm" className="bg-white py-8 md:py-12">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <p className="font-anek font-semibold tracking-wide text-sm md:text-base leading-tight text-[#B8481F] uppercase mb-3">
                CONTACT US
              </p>
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540] mb-3">
                Let&apos;s Talk About Your Programme
              </h1>
              <p className="font-noto text-base md:text-lg lg:text-xl leading-relaxed text-[#000000]/70">
                We respond to every message. Ask us anything.
              </p>
            </div>
          </Container>
        </Section>

        <Section spacing="md">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-6 lg:gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="font-anek font-bold text-2xl text-[#0b2540] mb-6">Send us a message</h2>
                <ContactForm />
              </div>

              <div className="space-y-4">
                <div className={cardClass}>
                  <div className={iconClass}><CalendarDays size={20} /></div>
                  <div>
                    <h3 className="font-anek font-semibold text-lg text-[#0b2540]">See Avni in action</h3>
                    <p className="font-noto text-sm text-[#475467] mb-3">Book a one-hour demo and discussion with our team</p>
                    <BookDemoLink className="inline-flex items-center px-5 py-2 bg-[#419372] text-white rounded-full font-anek font-medium text-sm hover:bg-[#357a5e] transition-colors">
                      Book a Demo
                    </BookDemoLink>
                  </div>
                </div>

                {EMAIL_CONTACTS.map(({ icon: Icon, title, description, email }) => (
                  <div key={email} className={cardClass}>
                    <div className={iconClass}><Icon size={20} /></div>
                    <div className="min-w-0">
                      <h3 className="font-anek font-semibold text-lg text-[#0b2540]">{title}</h3>
                      <p className="font-noto text-sm text-[#475467] mb-3">{description}</p>
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-2 max-w-full px-3 py-2 rounded-lg bg-[#E8F3EE] font-noto text-[13px] font-semibold text-[#1f5a43] hover:bg-[#d3eadf] transition-colors"
                      >
                        <Mail size={16} className="flex-shrink-0" />
                        <span>{email.split('@')[0]}@<wbr />{email.split('@')[1]}</span>
                      </a>
                    </div>
                  </div>
                ))}

                <div className={cardClass}>
                  <div className={iconClass}><MapPin size={20} /></div>
                  <div>
                    <h3 className="font-anek font-semibold text-lg text-[#0b2540]">Office</h3>
                    <p className="font-noto text-sm leading-relaxed text-[#475467] mb-3">
                      Samanvay Research &amp; Development Foundation<br />
                      {OFFICE_ADDRESS}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Samanvay Research and Development Foundation, ${OFFICE_ADDRESS}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#E8F3EE] font-noto text-[13px] font-semibold text-[#1f5a43] hover:bg-[#d3eadf] transition-colors"
                    >
                      <MapPin size={16} />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
