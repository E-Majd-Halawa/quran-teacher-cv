import { Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import useReveal from '../hooks/useReveal';

export default function Countries() {
  const { t, pick, teacher } = useApp();
  const [ref, visible] = useReveal();

  return (
    <section className="py-24 md:py-32 bg-sand-50 dark:bg-night-900">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader eyebrow={t.countries.eyebrow} title={t.countries.title} align="center" />

        <div
          ref={ref}
          className={`flex flex-wrap justify-center gap-3 max-w-3xl mx-auto transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {teacher.countries.map((c, i) => (
            <span
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-palm-900/15 dark:border-sand-100/15 bg-white dark:bg-night-800 font-arabicUI text-sm text-palm-900 dark:text-sand-100 hover:border-gilt-500/60 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-gilt-600 dark:text-gilt-400" strokeWidth={1.5} />
              {pick(c)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
