"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ga_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ga_consent', 'granted');
    setShow(false);
    // GA4の読み込みをトリガー（実際の読み込みは別途GTMやScriptタグで制御）
    window.location.reload();
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-effect-dark p-6 rounded-2xl shadow-2xl border border-white/10">
        <h3 className="text-white font-bold mb-2">Cookieと計測への同意</h3>
        <p className="text-gray-300 text-sm mb-4">
          当サイトでは、利便性向上および利用状況把握のためにCookieとGoogle Analyticsを使用しています。
          「同意する」を選択すると、計測が開始されます。詳細は
          <Link href="/privacy" className="text-brand-primary underline ml-1">プライバシーポリシー</Link>
          をご確認ください。
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="flex-1 bg-white text-black font-bold py-3 rounded-xl btn-hover-effect"
          >
            同意して利用する
          </button>
          <button
            onClick={() => setShow(false)}
            className="flex-1 bg-white/10 text-white font-bold py-3 rounded-xl btn-hover-effect"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
