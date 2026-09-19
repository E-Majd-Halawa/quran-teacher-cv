import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import useReveal from '../hooks/useReveal';

function Bar({ label, sub, percent, visible, delay = 0 }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-arabicUI text-[15px] text-palm-900 dark:text-sand-100">{label}</span>
        {sub && <span className="font-arabicUI text-xs text-ink/50 dark:text-sand-200/50">{sub}</span>}
      </div>
      <div className="h-2 rounded-full bg-palm-900/10 dark:bg-sand-100/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-palm-700 to-gilt-500 transition-all duration-1000 ease-out"
          style={{ width: visible ? `${percent}%` : '0%', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export default function LanguagesSkills() {
  const { t, pick, teacher } = useApp();
  const [ref, visible] = useReveal(0.2);

  return (
    <section className="py-24 md:py-32 bg-sand-100/60 dark:bg-night-800/40">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16" ref={ref}>
        <div>
          <SectionHeader eyebrow={t.languageSkills.eyebrow} title={t.languageSkills.title} />
          <div className="space-y-6">
            {teacher.languageSkills.map((l, i) => (
              <Bar
                key={i}
                label={pick(l.lang)}
                sub={pick(l.level)}
                percent={l.percent}
                visible={visible}
                delay={i * 120}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader eyebrow={t.skills.eyebrow} title={t.skills.title} />
          <div className="space-y-6">
            {teacher.skills.map((s, i) => (
              <Bar key={i} label={pick(s)} percent={s.percent} visible={visible} delay={i * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
