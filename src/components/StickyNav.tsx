"use client";

import React from 'react';
import { Phone, MapPin, Calendar } from 'lucide-react';

export function StickyNav() {
  const scrollToReservation = () => {
    const element = document.getElementById('reservation-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
      <div className="grid grid-cols-3 h-20 glass-effect-dark border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <a
          href="tel:0742331194"
          className="flex flex-col items-center justify-center gap-1 text-white btn-hover-effect"
          onClick={() => {
            // GA4 event will be added here
            (window as any).gtag?.('event', 'tel_click', { page_path: window.location.pathname });
          }}
        >
          <Phone className="w-6 h-6" />
          <span className="text-[10px] font-bold">電話</span>
        </a>
        <button
          onClick={scrollToReservation}
          className="flex flex-col items-center justify-center gap-1 bg-brand-primary text-white shadow-lg btn-hover-effect"
        >
          <div className="bg-white/20 p-2 rounded-full">
            <Calendar className="w-6 h-6" />
          </div>
          <span className="text-[12px] font-bold">予約する</span>
        </button>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=奈良県奈良市三条添川町36-1-2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-white btn-hover-effect"
          onClick={() => {
            // GA4 event will be added here
            (window as any).gtag?.('event', 'map_click', { page_path: window.location.pathname });
          }}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-[10px] font-bold">地図</span>
        </a>
      </div>
    </nav>
  );
}
