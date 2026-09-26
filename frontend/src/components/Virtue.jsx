import { Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import useReveal from '../hooks/useReveal';

export default function Virtue() {
  const { t } = useApp();
  const [ref, visible] = useReveal();

  return (
    <section className="py-24 md:py-32 bg-sand-50 dark:bg-night-900">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader eyebrow={t.virtue.eyebrow} title={t.virtue.title} align="center" />

        <figure
          ref={ref}
          className={`max-w-3xl mx-auto text-center rounded-3xl border border-gilt-500/30 bg-white dark:bg-night-800 px-8 py-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Quote className="w-8 h-8 mx-auto mb-5 text-gilt-500/60" strokeWidth={1.5} />
          <blockquote className="font-arabicDisplay text-2xl md:text-3xl leading-[1.9] text-palm-900 dark:text-sand-100">
            « {t.virtue.hadith} »
          </blockquote>
          <figcaption className="font-arabicUI text-sm text-gilt-600 dark:text-gilt-400 mt-5">
            {t.virtue.source}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
