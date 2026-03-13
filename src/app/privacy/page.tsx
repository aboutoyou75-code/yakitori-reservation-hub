import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-primary transition-colors mb-10 text-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページへ戻る
        </Link>
        
        <h1 className="text-3xl font-bold mb-10">プライバシーポリシー</h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">1. 収集する情報</h2>
            <p>当サイトのご利用にあたり、以下の情報を「仮予約フォーム」を通じて取得します。</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>氏名</li>
              <li>電話番号</li>
              <li>メールアドレス（任意入力時のみ）</li>
              <li>ご要望事項</li>
              <li>UTMパラメータ（広告流入元情報）</li>
              <li>ユーザーエージェント、およびハッシュ化されたIPアドレス（セキュリティおよび統計のため）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">2. 利用目的</h2>
            <p>取得した情報は、以下の目的でのみ利用いたします。</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>仮予約に対する店舗からの連絡（予約確定のため）</li>
              <li>ご来店時の予約情報の照合</li>
              <li>ウェブサイトの運用改善および広告効果の計測</li>
              <li>不正な送信（スパム等）の防止</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">3. 第三者提供について</h2>
            <p>当サイトは、法令に基づく場合を除き、取得した個人情報を第三者に提供することはありません。ただし、ウェブサイトの動作に必要な業務委託先（ホスティングサービス：Vercel、通知メール送信：Resend等）において、適切な管理のもとで情報を処理する場合があります。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">4. 情報の保存期間</h2>
            <p>送信されたご予約情報は、予約対応の完了および統計的な分析、運用上の必要性が認められる期間（通常1ヶ月〜1年程度。ただし法的義務がある場合はその限りではありません）保存されます。</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">5. お問い合わせ先</h2>
            <p>収集した情報の開示、訂正、削除等のお問い合わせについては、下記店舗まで直接お電話にてご連絡ください。</p>
            <p className="mt-4 font-bold text-zinc-900 dark:text-white">
              炭焼やきとり一番 三条添川店<br />
              TEL: 0742-33-1194
            </p>
          </section>
        </div>
        
        <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/5 text-center">
          <p className="text-xs text-gray-500">
            最終更新日: 2024年3月13日
          </p>
        </div>
      </div>
    </main>
  );
}
