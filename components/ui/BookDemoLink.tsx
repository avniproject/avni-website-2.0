/**
 * Book Demo Link
 * Opens the Calendly booking pop-up for a product demo, as on the old site, so visitors
 * stay on the page. Calendly's script loads only when someone clicks. Without JavaScript,
 * or if the script can't load, the link opens Calendly in a new tab.
 */

'use client';

import { MouseEvent, ReactNode } from 'react';

export const DEMO_BOOKING_URL = 'https://calendly.com/avnisupport-samanvayfoundation/product-demo-and-discussion';

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_STYLES = 'https://assets.calendly.com/assets/external/widget.css';

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (options: { url: string }) => void };
  }
}

let calendlyLoading: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  calendlyLoading ??= new Promise((resolve, reject) => {
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = CALENDLY_STYLES;
    document.head.appendChild(styles);

    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      calendlyLoading = null;
      reject(new Error('Calendly failed to load'));
    };
    document.body.appendChild(script);
  });
  return calendlyLoading;
}

interface BookDemoLinkProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function BookDemoLink({ className, children, onClick }: BookDemoLinkProps) {
  const openPopup = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClick?.();
    try {
      await loadCalendly();
      window.Calendly?.initPopupWidget({ url: DEMO_BOOKING_URL });
    } catch {
      window.open(DEMO_BOOKING_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <a href={DEMO_BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={openPopup} className={className}>
      {children}
    </a>
  );
}
