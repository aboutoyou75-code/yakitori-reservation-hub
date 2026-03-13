"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: "当日予約はできますか？",
    a: "はい。ただし、直前のお時間や混雑状況によってはWEBフォームの確認が遅れる場合がございます。当日のご予約やお急ぎの場合は、直接お電話（0742-33-1194）にてお問い合わせいただくのが最も確実です。"
  },
  {
    q: "予約はいつ確定しますか？",
    a: "WEBフォームからの送信は「仮受付」となります。店舗スタッフが内容を確認した上で、お電話やメール等でご連絡を差し上げ、その連絡をもって「予約確定」となります。24時間以内に連絡がない場合は、お手数ですがお電話ください。"
  },
  {
    q: "キャンセルや人数の変更をしたい場合は？",
    a: "予約確定後、変更やキャンセルが生じた場合はお早めにお電話でご連絡ください。直前のキャンセルは他のお客様をお断りしている都合上、ご遠慮いただけますと幸いです。"
  },
  {
    q: "店内での喫煙は可能ですか？",
    a: "はい、店内での喫煙は全席可能です。"
  },
  {
    q: "クレジットカードや電子マネーは使えますか？",
    a: "クレジットカード各社、およびPayPayでの決済に対応しております。"
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-950 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
            <HelpCircle className="text-brand-primary" /> よくある質問
          </h2>
          <p className="text-gray-500">ご不明な点がございましたらご確認ください</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800/50"
              >
                <span className="font-bold pr-8">{faq.q}</span>
                <ChevronDown className={cn(
                  "w-5 h-5 text-gray-400 transition-transform duration-300",
                  openIndex === index && "rotate-180"
                )} />
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                openIndex === index ? "max-h-96" : "max-h-0"
              )}>
                <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-50 dark:border-white/5">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
