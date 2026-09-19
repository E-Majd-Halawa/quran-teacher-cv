import { Users2, MonitorSmartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import useReveal from '../hooks/useReveal';

export default function Experience() {
  const { t, pick, teacher } = useApp();
  const [ref, visible] = useReveal();

  return (
    <section id="experience" className="py-24 md:py-32 bg-sand-100/60 dark:bg-night-800/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader eyebrow={t.experience.eyebrow} title={t.experience.title} />

        <div ref={ref} className="relative border-s-2 border-palm-900/15 dark:border-sand-100/15 ps-8 space-y-10">
          {teacher.experience.map((e, i) => (
            <div
              key={i}
              className={`relative transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="absolute -start-[41px] top-1 w-4 h-4 rounded-full bg-palm-800 ring-4 ring-sand-50 dark:ring-night-800" />

              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h3 className="font-arabicUI font-semibold text-lg text-palm-900 dark:text-sand-100">
                  {pick(e.role)} — {pick(e.place)}
                </h3>
                <span className="text-sm font-arabicUI text-gilt-600 dark:text-gilt-400">{pick(e.period)}</span>
              </div>

              <ul className="space-y-1.5 mb-3">
                {pick(e.tasks).map((task, j) => (
                  <li key={j} className="font-arabicUI text-[15px] text-ink/75 dark:text-sand-200/75 flex gap-2">
                    <span className="text-gilt-500 mt-2 w-1 h-1 rounded-full bg-gilt-500 shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 text-sm font-arabicUI text-ink/60 dark:text-sand-200/60">
                {e.students && (
                  <span className="flex items-center gap-1.5">
                    <Users2 className="w-4 h-4" strokeWidth={1.5} />
                    {t.experience.students}: {e.students}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <MonitorSmartphone className="w-4 h-4" strokeWidth={1.5} />
                  {t.experience.mode}: {pick(e.mode)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
