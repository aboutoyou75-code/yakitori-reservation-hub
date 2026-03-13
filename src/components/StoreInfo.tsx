import React from 'react';
import { Clock, CalendarOff, MapPin, Phone, Car } from 'lucide-react';

export function StoreInfo() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">店舗情報</h2>
          <p className="text-gray-500">アクセスと営業のご案内</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="bg-brand-primary/10 p-3 rounded-xl h-fit">
                <Clock className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">営業時間</h3>
                <p className="text-gray-600 dark:text-gray-400">18:00 〜 翌02:00</p>
                <p className="text-xs text-gray-400 mt-1">（料理L.O. 01:30 / ドリンクL.O. 01:30）</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-brand-primary/10 p-3 rounded-xl h-fit">
                <CalendarOff className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">定休日</h3>
                <p className="text-gray-600 dark:text-gray-400">水曜日</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-brand-primary/10 p-3 rounded-xl h-fit">
                <MapPin className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">住所</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  〒630-8115 奈良県奈良市三条添川町36-1-2<br />
                  <span className="text-xs text-gray-400">（近鉄奈良線 新大宮駅 徒歩圏内）</span>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-brand-primary/10 p-3 rounded-xl h-fit">
                <Phone className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">電話番号</h3>
                <a href="tel:0742331194" className="text-brand-primary font-bold text-lg hover:underline decoration-2">
                  0742-33-1194
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-brand-primary/10 p-3 rounded-xl h-fit">
                <Car className="w-6 h-6 text-brand-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">お支払い / 喫煙 / 駐車場</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  クレジットカード / PayPay 利用可<br />
                  全席喫煙可能<br />
                  <span className="font-bold">駐車場：</span> 専用駐車場はございません。近隣のコインパーキング（タイムズ新大宮大宮町・ワンパーク三条大宮通りなど）をご利用ください。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-lg h-64 md:h-full min-h-[350px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.79124436531!2d135.8116491!3d34.6802081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600139994c9f1345%3A0xe726875b1441b44b!2z54Kt54S844KE44GN44Go44KK5LiA55WqIOS4ieeVocWhu-W3neW6lw!5e0!3m2!1sja!2sjp!4v1710300000000" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
