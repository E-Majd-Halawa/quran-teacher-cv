import { BookOpenText } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t, pick, teacher } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-palm-950 text-sand-100/70 py-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-start">
        <div className="flex items-center gap-2 font-arabicDisplay text-sand-50">
          <BookOpenText className="w-5 h-5 text-gilt-400" strokeWidth={1.5} />
          {pick(teacher.name)}
        </div>
        <p className="font-arabicUI text-sm">{t.footer.builtWith}</p>
        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="font-arabicUI text-sm">
            © {year} {pick(teacher.name)} — {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
