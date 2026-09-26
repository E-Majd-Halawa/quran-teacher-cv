import { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Specialties from './components/Specialties';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Methodology from './components/Methodology';
import Achievements from './components/Achievements';
import Virtue from './components/Virtue';
import Testimonials from './components/Testimonials';
import Countries from './components/Countries';
import LanguagesSkills from './components/LanguagesSkills';
import Contact from './components/Contact';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminSessionsPage from './pages/AdminSessionsPage';
import NotificationsPage from './pages/NotificationsPage';

function AppContent() {
  const { loading, error, user, t, dir } = useApp();
  const [longLoading, setLongLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (loading) {
      setLongLoading(false);
      timer = setTimeout(() => {
        setLongLoading(true);
      }, 5000);
    } else {
      setLongLoading(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-sand-50 dark:bg-night-900 text-palm-900 dark:text-sand-100">
        <div className="w-12 h-12 border-4 border-gilt-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-arabicUI text-base md:text-lg mb-2">
          {dir === 'rtl'
            ? 'جاري تحميل البيانات… قد يستغرق هذا حتى دقيقة عند أول زيارة بعد فترة خمول'
            : 'Loading data… this may take up to a minute on the first visit after inactivity'}
        </p>
        {longLoading && (
          <p className="font-arabicUI text-xs md:text-sm text-ink/60 dark:text-sand-200/60 animate-pulse">
            {dir === 'rtl'
              ? 'الخادم قيد الاستيقاظ من وضع السكون، شكرًا لصبرك...'
              : 'Server is waking up from inactivity, thank you for your patience...'}
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-arabicUI text-lg text-red-600">Error loading data: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-gilt-500/30 selection:text-palm-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Specialties />
        <Certificates />
        <Experience />
        <Methodology />
        <Achievements />
        <Virtue />
        <Testimonials />
        <Countries />
        <LanguagesSkills />
        <Contact />
        {user?.role === 'ADMIN' ? (
          <section id="booking" className="py-16 md:py-24 bg-sand-50 dark:bg-night-900">
            <div className="max-w-lg mx-auto p-8 rounded-2xl border bg-white dark:bg-night-800 border-palm-900/10 dark:border-sand-100/10 shadow-sm text-center">
              <h2 className="font-arabicDisplay text-2xl md:text-3xl text-palm-900 dark:text-sand-100 mb-3">
                {dir === 'rtl' ? 'لوحة تحكم المعلم' : 'Teacher Dashboard'}
              </h2>
              <p className="text-palm-900/70 dark:text-sand-100/70 mb-6">
                {dir === 'rtl' ? 'يمكنك إدارة طلبات الحجز الواردة من هنا.' : 'You can manage incoming booking requests from here.'}
              </p>
              <Link to="/admin/sessions" className="inline-block px-6 py-3 rounded-full bg-gilt-600 hover:bg-gilt-700 text-white font-medium transition-colors">
                {dir === 'rtl' ? 'إدارة الطلبات' : 'Manage Requests'}
              </Link>
            </div>
          </section>
        ) : user ? (
          <BookingForm />
        ) : (
          <section id="booking" className="py-16 md:py-24 bg-sand-50 dark:bg-night-900">
            <div className="max-w-lg mx-auto p-8 rounded-2xl border bg-white dark:bg-night-800 border-palm-900/10 dark:border-sand-100/10 shadow-sm text-center">
              <h2 className="font-arabicDisplay text-2xl md:text-3xl text-palm-900 dark:text-sand-100 mb-3">
                {t.auth.bookingPromptTitle}
              </h2>
              <p className="text-palm-900/70 dark:text-sand-100/70 mb-6">
                {t.auth.bookingPromptText}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/signup" className="px-6 py-3 rounded-full bg-palm-800 hover:bg-palm-700 text-sand-50 font-medium transition-colors">
                  {t.auth.createAccount}
                </Link>
                <Link to="/login" className="px-6 py-3 rounded-full border border-palm-800/30 dark:border-sand-100/25 text-palm-900 dark:text-sand-100 hover:border-gilt-500 font-medium transition-colors">
                  {t.auth.login}
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/sessions" element={<AdminSessionsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </AppProvider>
  );
}
