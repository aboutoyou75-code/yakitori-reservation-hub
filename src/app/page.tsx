import { Hero } from '@/components/Hero';
import { ReservationForm } from '@/components/ReservationForm';
import { FAQ } from '@/components/FAQ';
import { StoreInfo } from '@/components/StoreInfo';
import { Footer } from '@/components/Footer';
import { StickyNav } from '@/components/StickyNav';
import { CookieConsent } from '@/components/CookieConsent';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Hero />
      <ReservationForm />
      <FAQ />
      <StoreInfo />
      <Footer />
      <StickyNav />
      <CookieConsent />
    </main>
  );
}
