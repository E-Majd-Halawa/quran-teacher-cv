import { CheckCircle2, GraduationCap, Users, Globe2, Palette, Video } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import useReveal from '../hooks/useReveal';

export default function About() {
  const { t, pick, teacher } = useApp();
  const [ref, visible] = useReveal();
  const a = teacher.about;

  const facts = [
    { icon: GraduationCap, label: t.about.experience, value: `${a.experienceYears}+ ${t.about.years}` },
    { icon: Users, label: t.about.ageGroups, value: pick(a.ageGroups) },
    { icon: Globe2, label: t.about.languages, value: pick(a.languages).join(' · ') },
    { icon: Video, label: '', value: a.online ? t.about.online : '' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-sand-50 dark:bg-night-900">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} />

        <div
          ref={ref}
          className={`grid lg:grid-cols-5 gap-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="lg:col-span-3">
            <p className="font-arabicUI text-ink/80 dark:text-sand-200/80 leading-8 text-[17px] mb-8">
              {pick(a.bio)}
            </p>

            <h3 className="font-arabicUI font-semibold text-palm-900 dark:text-sand-100 mb-4">
              {t.about.qualifications}
            </h3>
            <ul className="space-y-3 mb-8">
              {pick(a.qualifications).map((q, i) => (
                <li key={i} className="flex items-start gap-3 font-arabicUI text-ink/80 dark:text-sand-200/80">
                  <CheckCircle2 className="w-5 h-5 text-gilt-600 dark:text-gilt-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>{q}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-3 p-5 rounded-2xl bg-palm-900/5 dark:bg-sand-100/5 border border-palm-900/10 dark:border-sand-100/10">
              <Palette className="w-5 h-5 text-gilt-600 dark:text-gilt-400 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="font-arabicUI font-semibold text-palm-900 dark:text-sand-100 mb-1">
                  {t.about.style}
                </p>
                <p className="font-arabicUI text-ink/75 dark:text-sand-200/75 leading-7">
                  {pick(a.teachingStyle)}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-start">
            {facts.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-palm-900/10 dark:border-sand-100/10 bg-white/60 dark:bg-night-800/60 p-5 hover:border-gilt-500/50 transition-colors"
              >
                <f.icon className="w-6 h-6 text-palm-700 dark:text-gilt-400 mb-3" strokeWidth={1.5} />
                {f.label && (
                  <p className="text-xs font-arabicUI text-ink/50 dark:text-sand-200/50 mb-1">{f.label}</p>
                )}
                <p className="font-arabicUI text-sm md:text-[15px] text-palm-900 dark:text-sand-100 leading-6">
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
