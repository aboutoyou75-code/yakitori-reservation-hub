"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ 
          backgroundImage: `url('/yakitori-hero.png')`, // Generated image will be copied here
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <span className="inline-block px-4 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-primary text-sm font-bold mb-6 animate-in fade-in slide-in-from-top-4 duration-1000">
          奈良・三条添川の味
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
          炭火で一串ずつ、<br />
          <span className="text-brand-primary">丁寧に</span>焼き上げる。
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed drop-shadow-lg">
          炭焼やきとり一番 三条添川店へようこそ。<br />
          鮮度と技が織りなす極上の焼き鳥を、和の温もりあふれる空間で。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('reservation-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-brand-primary hover:bg-red-600 text-white font-bold px-10 py-4 rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            今すぐ予約する
          </button>
          <a 
            href="tel:0742331194"
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold px-10 py-4 rounded-xl border border-white/20 transition-all"
          >
            お電話で相談
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
}
