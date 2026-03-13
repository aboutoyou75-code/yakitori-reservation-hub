"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { generateTimeSlots } from '@/lib/utils';

const reservationSchema = z.object({
  date: z.string().min(1, '日付を選択してください'),
  time: z.string().min(1, '時間を選択してください'),
  party_size: z.string().min(1, '人数を選択してください'),
  customer_name: z.string().min(1, 'お名前を入力してください'),
  phone: z.string().regex(/^[0-9-]+$/, '数字とハイフンのみで入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください').optional().or(z.literal('')),
  note: z.string().max(500, '要望は500文字以内で入力してください').optional(),
  honeypot: z.string().max(0).optional(), // 隠しフィールド
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

export function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormValues) => {
    // UTMパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const utm = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_content: urlParams.get('utm_content'),
      utm_term: urlParams.get('utm_term'),
    };

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...utm }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        // GA4イベント発火
        (window as any).gtag?.('event', 'reserve_form_submit', {
          page_path: window.location.pathname,
          ...utm
        });
      } else {
        throw new Error(result.message || '送信に失敗しました。');
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-green-500/20 rounded-3xl p-8 text-center shadow-2xl animate-in zoom-in duration-500">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">仮予約を受け付けました</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          ご入力ありがとうございます。確定は店舗からのご連絡（お電話等）をもって完了となります。<br />
          しばらくお待ちください。
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="bg-brand-primary text-white font-bold px-8 py-3 rounded-xl transition-all hover:brightness-110"
        >
          ページに戻る
        </button>
      </div>
    );
  }

  return (
    <section id="reservation-form" className="py-20 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">ご予約フォーム</h2>
          <p className="text-brand-primary font-bold">
            ※仮受付です。確定は店舗連絡で完了します。
          </p>
          <p className="text-sm text-gray-500 mt-2">
            当日・お急ぎの場合はお電話（<a href="tel:0742331194" className="underline">0742-33-1194</a>）が確実です。
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-white/5">
          {/* Honeypot */}
          <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">日付 <span className="text-brand-primary">*</span></label>
              <input 
                type="date" 
                {...register('date')}
                className={cn(
                  "w-full p-4 rounded-xl border appearance-none dark:bg-zinc-800",
                  errors.date ? "border-brand-primary" : "border-gray-200 dark:border-white/10"
                )}
              />
              {errors.date && <p className="text-brand-primary text-xs mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">時間 <span className="text-brand-primary">*</span></label>
              <select 
                {...register('time')}
                className={cn(
                  "w-full p-4 rounded-xl border appearance-none dark:bg-zinc-800",
                  errors.time ? "border-brand-primary" : "border-gray-200 dark:border-white/10"
                )}
              >
                <option value="">選択</option>
                {generateTimeSlots().map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
              {errors.time && <p className="text-brand-primary text-xs mt-1">{errors.time.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">人数 <span className="text-brand-primary">*</span></label>
            <select 
              {...register('party_size')}
              className={cn(
                "w-full p-4 rounded-xl border appearance-none dark:bg-zinc-800",
                errors.party_size ? "border-brand-primary" : "border-gray-200 dark:border-white/10"
              )}
            >
              <option value="">選択</option>
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}名</option>
              ))}
              <option value="21+">21名以上（要相談）</option>
            </select>
            {errors.party_size && <p className="text-brand-primary text-xs mt-1">{errors.party_size.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">お名前 <span className="text-brand-primary">*</span></label>
            <input 
              type="text" 
              placeholder="山田 太郎"
              {...register('customer_name')}
              className={cn(
                "w-full p-4 rounded-xl border dark:bg-zinc-800",
                errors.customer_name ? "border-brand-primary" : "border-gray-200 dark:border-white/10"
              )}
            />
            {errors.customer_name && <p className="text-brand-primary text-xs mt-1">{errors.customer_name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">電話番号 <span className="text-brand-primary">*</span></label>
            <input 
              type="tel" 
              placeholder="090-0000-0000"
              {...register('phone')}
              className={cn(
                "w-full p-4 rounded-xl border dark:bg-zinc-800",
                errors.phone ? "border-brand-primary" : "border-gray-200 dark:border-white/10"
              )}
            />
            {errors.phone && <p className="text-brand-primary text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">メールアドレス（任意）</label>
            <p className="text-[10px] text-gray-500 mb-1">※自動返信をご希望の場合は入力してください</p>
            <input 
              type="email" 
              placeholder="example@example.com"
              {...register('email')}
              className={cn(
                "w-full p-4 rounded-xl border dark:bg-zinc-800",
                errors.email ? "border-brand-primary" : "border-gray-200 dark:border-white/10"
              )}
            />
            {errors.email && <p className="text-brand-primary text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">ご要望（任意）</label>
            <textarea 
              placeholder="お席のご希望やアレルギー、お祝いなど"
              {...register('note')}
              className="w-full p-4 rounded-xl border border-gray-200 dark:border-white/10 dark:bg-zinc-800 h-32"
            />
          </div>

          {submitStatus === 'error' && (
            <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl flex items-start gap-3 border border-red-200 dark:border-red-900/30">
              <AlertCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-brand-primary">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-primary text-white font-bold py-5 rounded-xl text-lg shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                送信中...
              </>
            ) : (
              '仮予約を申し込む'
            )}
          </button>
          
          <p className="text-[10px] text-gray-500 text-center leading-relaxed">
            送信前に<Link href="/privacy" className="underline">プライバシーポリシー</Link>をご確認ください。<br />
            送信をもって、内容に同意したものとみなされます。
          </p>
        </form>
      </div>
    </section>
  );
}

import { cn } from '@/lib/utils';
