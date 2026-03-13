import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSSのクラス名を結合し、競合を解決するユーティリティ
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 予約時間（18:00〜25:00）を30分刻みで生成する
 */
export function generateTimeSlots() {
  const slots: string[] = [];
  for (let hour = 18; hour <= 24; hour++) {
    const paddedHour = hour === 24 ? '00' : hour.toString().padStart(2, '0');
    const displayHour = hour === 24 ? '00' : hour.toString(); // 24時を0時として扱うか、文字列表記するか検討

    // 00分
    slots.push(`${paddedHour}:00`);
    
    // 01:00以降はループ外で調整が必要だが、要件は25:00(01:00)まで
    if (hour < 25) {
        // 30分
        slots.push(`${paddedHour}:30`);
    }
  }
  // 最後に01:00を追加 (翌01:00 = 25:00)
  slots.push('01:00');
  
  // 要件に合わせてフィルタリングと表示名の調整をする場合があるが、まずはシンプルに
  return slots.filter(time => {
    const [h, m] = time.split(':').map(Number);
    // 18:00から翌01:00 (25:00) まで
    if (h >= 18 && h <= 23) return true;
    if (h >= 0 && h <= 1) return true;
    return false;
  });
}

/**
 * UTF-8文字列をSHA-256でハッシュ化（IP匿名化用）
 */
export async function hashString(str: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
