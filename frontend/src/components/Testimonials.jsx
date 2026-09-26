import { Star, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import useReveal from '../hooks/useReveal';

export default function Testimonials() {
  const { t, pick, teacher } = useApp();
  const [ref, visible] = useReveal();

  if (!teacher.testimonials || teacher.testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-sand-100/60 dark:bg-night-800/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />

        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {teacher.testimonials.map((tm, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white dark:bg-night-900 border border-palm-900/10 dark:border-sand-100/10 p-6 flex flex-col"
            >
              <Quote className="w-6 h-6 text-gilt-500/50 mb-3" strokeWidth={1.5} />
              <p className="font-arabicUI text-[15px] text-ink/80 dark:text-sand-200/80 leading-7 mb-5 grow">
                {pick(tm.text)}
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${
                      j < tm.rating ? 'fill-gilt-500 text-gilt-500' : 'text-palm-900/20 dark:text-sand-100/20'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img src={tm.photo} alt={pick(tm.name)} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-arabicUI text-sm font-semibold text-palm-900 dark:text-sand-100">
                    {pick(tm.name)}
                  </p>
                  <p className="font-arabicUI text-xs text-ink/50 dark:text-sand-200/50">{pick(tm.country)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
