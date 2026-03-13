import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white py-16 px-4 pb-32 md:pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">炭焼やきとり一番 三条添川店</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              奈良・三条添川で愛される、炭火焼の実力店。<br />
              一本一本真心を込めて焼き上げる串焼きと、<br />
              心地よい空間をご提供します。
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">リンク</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-brand-primary transition-colors">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <a href="#reservation-form" className="hover:text-brand-primary transition-colors">
                  ご予約はこちら
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 pt-8">
          <p className="text-[10px] text-gray-500 leading-relaxed">
            ※掲載されている情報は予告なく変更される場合がございます。ご来店前に最新情報を店舗（0742-33-1194）へご確認ください。<br />
            ※当日のご予約は基本的にお電話での受付となります。
          </p>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} 炭焼やきとり一番 三条添川店. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
