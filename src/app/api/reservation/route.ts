import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Resend } from 'resend';
import { hashString } from '@/lib/utils';

// 環境変数の取得
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@example.com';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      date, time, party_size, customer_name, phone, email, note, honeypot,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term 
    } = body;

    // 1. Honeypot check
    if (honeypot) {
      return NextResponse.json({ ok: false, message: 'Spam detected' }, { status: 400 });
    }

    // 2. Validation (Server-side)
    if (!date || !time || !party_size || !customer_name || !phone) {
      return NextResponse.json({ ok: false, message: '必須項目が不足しています' }, { status: 400 });
    }

    // 3. IP Hashing for privacy
    const ip = req.headers.get('x-forwarded-for') || '0.0.0.0';
    const ipHash = await hashString(ip);
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // 4. Save to Google Sheets
    if (GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY && GOOGLE_SHEET_ID) {
      const auth = new JWT({
        email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: GOOGLE_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, auth);
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];

      await sheet.addRow({
        created_at: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
        store_name: '炭焼やきとり一番 三条添川店',
        date,
        time,
        party_size,
        customer_name,
        phone,
        email: email || '',
        note: note || '',
        utm_source: utm_source || '',
        utm_medium: utm_medium || '',
        utm_campaign: utm_campaign || '',
        utm_content: utm_content || '',
        utm_term: utm_term || '',
        user_agent: userAgent,
        ip_hash: ipHash,
      });
    }

    // 5. Send Emails
    if (resend) {
      // 店舗宛て通知
      await resend.emails.send({
        from: 'Reservation Hub <onboarding@resend.dev>',
        to: ADMIN_EMAIL,
        subject: `[仮予約] 炭焼やきとり一番 三条添川店 ${date} ${time} ${party_size}名`,
        html: `
          <h1>仮予約通知</h1>
          <p>以下の内容で仮予約の申し込みがありました。</p>
          <hr />
          <ul>
            <li><strong>日時:</strong> ${date} ${time}</li>
            <li><strong>人数:</strong> ${party_size}名</li>
            <li><strong>お名前:</strong> ${customer_name} 様</li>
            <li><strong>電話番号:</strong> ${phone}</li>
            <li><strong>メール:</strong> ${email || '未入力'}</li>
            <li><strong>要望:</strong> ${note || 'なし'}</li>
          </ul>
          <hr />
          <p><strong>流入元情報:</strong></p>
          <ul>
            <li>Source: ${utm_source || '-'}</li>
            <li>Medium: ${utm_medium || '-'}</li>
            <li>Campaign: ${utm_campaign || '-'}</li>
          </ul>
          <p>※本予約は「仮受付」です。店舗から連絡して確定させてください。</p>
        `,
      });

      // ユーザー宛て自動返信（メールアドレスがある場合のみ）
      if (email) {
        await resend.emails.send({
          from: '炭焼やきとり一番 三条添川店 <onboarding@resend.dev>',
          to: email,
          subject: '【仮受付】ご予約申し込みありがとうございます（炭焼やきとり一番 三条添川店）',
          html: `
            <p>${customer_name} 様</p>
            <p>この度は「炭焼やきとり一番 三条添川店」へご予約のお申し込みをいただき、誠にありがとうございます。</p>
            <p>現在、お申し込みは<strong>「仮受付」</strong>の状態です。店舗にて内容を確認後、お電話またはメールにてご連絡を差し上げます。その連絡をもちまして<strong>「予約確定」</strong>となりますので、今しばらくお待ちください。</p>
            <hr />
            <h3>お申し込み内容</h3>
            <ul>
              <li>日時: ${date} ${time}</li>
              <li>人数: ${party_size}名</li>
            </ul>
            <p>※当日のキャンセル・変更、またはお急ぎの場合は直接お電話にてご連絡ください。</p>
            <hr />
            <p><strong>炭焼やきとり一番 三条添川店</strong></p>
            <p>TEL: 0742-33-1194</p>
            <p>営業時間: 18:00 〜 翌02:00（水曜定休）</p>
          `,
        });
      }
    }

    // 6. Demo Mode Response (If no integrations are configured)
    const isConfigured = !!(GOOGLE_SHEET_ID && RESEND_API_KEY);
    if (!isConfigured) {
      console.log('Demo Mode: Simulating success response');
      // ネットワーク遅延をシミュレート
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ ok: true, message: 'Demo Mode: Success simulation' });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Reservation API Error:', error);
    return NextResponse.json(
      { ok: false, message: 'エラーが発生しました。時間をおいて再度お試しいただくか、お電話にてご予約ください。' }, 
      { status: 500 }
    );
  }
}
