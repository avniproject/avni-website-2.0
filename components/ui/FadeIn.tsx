/**
 * Fade In
 * Fades and lifts its content into view the first time it scrolls into the screen.
 * Content stays visible without JavaScript, and for visitors who prefer reduced motion.
 */

'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms, to stagger items in a row
}

export default function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'static' | 'hidden' | 'shown'>('static');

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Already on screen when the page loads: leave it as is
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    setState('hidden');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setState('shown');
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${state === 'static' ? '' : 'transition-all duration-700 ease-out'} ${
        state === 'hidden' ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
      } ${className}`}
      style={state === 'shown' ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
