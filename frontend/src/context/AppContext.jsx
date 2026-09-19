import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import translations from '../data/translations';
import useTeacherProfile from '../hooks/useTeacherProfile';

const AppContext = createContext(null);

function getInitialLang() {
  const saved = localStorage.getItem('cv-lang');
  if (saved === 'ar' || saved === 'en') return saved;
  return 'ar';
}

function getInitialTheme() {
  const saved = localStorage.getItem('cv-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);
  const [theme, setTheme] = useState(getInitialTheme);
  const { teacher, loading, error } = useTeacherProfile();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('authUser');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('cv-lang', lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('cv-theme', theme);
  }, [theme]);

  const loginUser = (userData) => {
    localStorage.setItem('authUser', JSON.stringify(userData));
    setUser(userData);
  };
  const logoutUser = () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      toggleLang: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
      theme,
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
      t: translations[lang],
      // pick the localized field of a bilingual object, e.g. pick(item.title)
      pick: (field) => (field && typeof field === 'object' ? field[lang] : field),
      teacher,
      loading,
      error,
      user,
      loginUser,
      logoutUser,
    }),
    [lang, theme, teacher, loading, error, user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
