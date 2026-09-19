import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, Languages, BookOpenText, User, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getMyNotifications } from '../api/teacherService';

const sectionIds = [
  'home',
  'about',
  'specialties',
  'certificates',
  'experience',
  'achievements',
  'testimonials',
  'contact',
];

export default function Navbar() {
  const { t, lang, toggleLang, theme, toggleTheme, pick, teacher, user } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (user && user.role !== 'ADMIN') {
        try {
          const data = await getMyNotifications();
          const count = data.filter(s => s.adminReply && !s.replySeenAt).length;
          setUnreadCount(count);
        } catch (err) {
          // Silent fail
        }
      }
    };
    fetchUnreadCount();
  }, [user, location.pathname]);

  const links = sectionIds.map((id) => ({ id, label: t.nav[id === 'home' ? 'home' : id] }));

  const handleClick = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-sand-50/80 dark:bg-night-900/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(199,168,85,0.25)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <button
          onClick={() => handleClick('home')}
          className="flex items-center gap-2 font-arabicDisplay text-lg md:text-xl text-palm-900 dark:text-sand-100"
        >
          <BookOpenText className="w-6 h-6 text-gilt-600 dark:text-gilt-400" strokeWidth={1.5} />
          <span>{pick(teacher.name)}</span>
        </button>

        <ul className="hidden lg:flex items-center gap-7 font-arabicUI text-[15px] text-ink/80 dark:text-sand-200/80">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => handleClick(l.id)}
                className="relative py-1 hover:text-palm-800 dark:hover:text-gilt-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:start-0 after:h-[1.5px] after:w-0 after:bg-gilt-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {user && user.role !== 'ADMIN' && (
            <Link to="/notifications" className="relative p-2 rounded-full hover:bg-palm-900/5 dark:hover:bg-sand-100/5 transition-colors">
              <Bell className="w-5 h-5 text-palm-900 dark:text-sand-100" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -end-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}
          {user ? (
            <Link to="/profile" className="flex items-center gap-2 text-sm font-arabicUI px-4 py-1.5 rounded-full border border-palm-800/20 dark:border-sand-100/20 text-palm-900 dark:text-sand-100 hover:border-gilt-500 transition-colors">
              <User className="w-4 h-4" />
              {lang === 'ar' ? 'حسابي' : 'My Profile'}
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-sm font-arabicUI px-4 py-1.5 rounded-full border border-palm-800/20 dark:border-sand-100/20 text-palm-900 dark:text-sand-100 hover:border-gilt-500 transition-colors">
              <User className="w-4 h-4" />
              {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Link>
          )}
          <button
            onClick={toggleLang}
            aria-label="switch language"
            className="flex items-center gap-1.5 text-sm font-latinUI px-3 py-1.5 rounded-full border border-palm-800/20 dark:border-sand-100/20 text-ink/80 dark:text-sand-200 hover:border-gilt-500 transition-colors"
          >
            <Languages className="w-4 h-4" strokeWidth={1.5} />
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="toggle theme"
            className="w-9 h-9 grid place-items-center rounded-full border border-palm-800/20 dark:border-sand-100/20 text-ink/80 dark:text-sand-200 hover:border-gilt-500 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" strokeWidth={1.5} /> : <Moon className="w-4 h-4" strokeWidth={1.5} />}
          </button>
        </div>

        <button
          className="lg:hidden w-10 h-10 grid place-items-center text-palm-900 dark:text-sand-100"
          onClick={() => setOpen((o) => !o)}
          aria-label="menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-sand-50 dark:bg-night-900 border-t border-gilt-500/20 px-5 pb-6 pt-2">
          <ul className="flex flex-col gap-1 font-arabicUI text-[15px]">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => handleClick(l.id)}
                  className="w-full text-start py-2.5 text-ink/80 dark:text-sand-200/90 border-b border-black/5 dark:border-white/5"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-4">
            {user ? (
                <Link to="/profile" className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-palm-800/20 dark:border-sand-100/20">
                  <User className="w-4 h-4" />
                  {lang === 'ar' ? 'حسابي' : 'My Profile'}
                </Link>
            ) : (
                <Link to="/login" className="flex items-center justify-center gap-2 py-2.5 rounded-full border border-palm-800/20 dark:border-sand-100/20">
                    <User className="w-4 h-4" />
                    {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
                </Link>
            )}
            <div className="flex items-center gap-3">
                <button
                onClick={toggleLang}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm px-3 py-2 rounded-full border border-palm-800/20 dark:border-sand-100/20"
                >
                <Languages className="w-4 h-4" strokeWidth={1.5} />
                {lang === 'ar' ? 'English' : 'العربية'}
                </button>
                <button
                onClick={toggleTheme}
                className="flex-1 flex items-center justify-center gap-1.5 text-sm px-3 py-2 rounded-full border border-palm-800/20 dark:border-sand-100/20"
                >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? t.lightMode : t.darkMode}
                </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
