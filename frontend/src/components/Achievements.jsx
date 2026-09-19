import { Users, CalendarClock, BookMarked, Clock3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import useReveal from '../hooks/useReveal';
import AnimatedCounter from './AnimatedCounter';

export default function Achievements() {
  const { t, teacher } = useApp();
  const [ref, visible] = useReveal(0.3);
  const s = teacher.stats;

  const items = [
    { icon: Users, value: s.students, label: t.achievements.students },
    { icon: CalendarClock, value: s.experienceYears, label: t.achievements.years },
    { icon: BookMarked, value: s.surahsTaught, label: t.achievements.surahs },
    { icon: Clock3, value: s.teachingHours, label: t.achievements.hours },
  ];

  return (
    <section
      id="achievements"
      className="py-24 md:py-32 bg-palm-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-geo-pattern bg-[length:84px_84px] opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-14 text-center">
          <p className="font-arabicUI text-sm tracking-wide text-gilt-400 mb-2">{t.achievements.eyebrow}</p>
          <h2 className="font-arabicDisplay text-3xl md:text-4xl text-sand-50">{t.achievements.title}</h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <div key={i} className="text-center px-4">
              <it.icon className="w-7 h-7 mx-auto mb-4 text-gilt-400" strokeWidth={1.5} />
              <p className="font-arabicDisplay text-4xl md:text-5xl text-sand-50 mb-2">
                <AnimatedCounter target={it.value} start={visible} />+
              </p>
              <p className="font-arabicUI text-sand-100/70 text-sm">{it.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
