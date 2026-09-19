import * as Icons from 'lucide-react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import useReveal from '../hooks/useReveal';

export default function Specialties() {
  const { t, pick, teacher } = useApp();
  const [ref, visible] = useReveal();

  return (
    <section id="specialties" className="py-24 md:py-32 bg-sand-100/60 dark:bg-night-800/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader eyebrow={t.specialties.eyebrow} title={t.specialties.title} />

        <div
          ref={ref}
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {teacher.specialties.map((s, i) => {
            const Icon = Icons[s.icon] || Icons.Sparkles;
            return (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-white dark:bg-night-900 border border-palm-900/10 dark:border-sand-100/10 hover:border-gilt-500/60 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute top-3 end-3 w-2 h-2 rounded-full bg-gilt-500/0 group-hover:bg-gilt-500/70 transition-colors" />
                <div className="w-12 h-12 rounded-xl bg-palm-900/5 dark:bg-sand-100/5 grid place-items-center mb-5 group-hover:bg-palm-800 transition-colors">
                  <Icon
                    className="w-6 h-6 text-palm-800 dark:text-gilt-400 group-hover:text-sand-50 transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="font-arabicUI text-[15px] leading-6 text-palm-900 dark:text-sand-100">
                  {pick(s)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
