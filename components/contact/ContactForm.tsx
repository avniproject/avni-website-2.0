/**
 * Contact Form
 * Sent through Netlify Forms, like the old site's contact form, so messages keep reaching
 * the same inbox. Netlify finds the form from public/__forms.html when the site deploys;
 * keep the field names there in step with this form. Submitting only works on Netlify.
 */

'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const FORM_NAME = 'contact';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClass = 'w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-noto text-sm transition-colors focus:outline-none focus:border-[#419372]';
const labelClass = 'block font-anek font-semibold text-sm text-[#0b2540] mb-2';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="text-center py-12">
        <CheckCircle2 size={48} className="mx-auto text-[#419372] mb-4" />
        <h3 className="font-anek font-bold text-2xl text-[#0b2540] mb-2">Thank you!</h3>
        <p className="font-noto text-base text-[#475467]">We&apos;ve received your message and will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form name={FORM_NAME} onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {/* Spam trap: hidden from people, bots fill it in */}
      <p className="hidden">
        <label>Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Name *</label>
          <input id="contact-name" name="name" type="text" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email *</label>
          <input id="contact-email" name="email" type="email" required className={inputClass} placeholder="you@organisation.org" />
        </div>
      </div>

      <div>
        <label htmlFor="contact-organisation" className={labelClass}>Organisation</label>
        <input id="contact-organisation" name="organisation" type="text" className={inputClass} placeholder="Your NGO or organisation" />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>Message *</label>
        <textarea id="contact-message" name="message" required rows={6} maxLength={6000} className={inputClass} placeholder="Tell us about your programme and how we can help" />
      </div>

      {status === 'error' && (
        <p className="font-noto text-sm text-red-600">
          Sorry, your message couldn&apos;t be sent. Please try again, or email us at{' '}
          <a href="mailto:avnipartnerships@samanvayfoundation.org" className="underline">avnipartnerships@samanvayfoundation.org</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full md:w-auto px-10 py-3.5 bg-[#419372] text-white font-anek font-semibold text-base rounded-full hover:bg-[#357a5e] transition-colors disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
