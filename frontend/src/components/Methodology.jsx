import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import useReveal from '../hooks/useReveal';

export default function Methodology() {
  const { t, pick, teacher } = useApp();
  const [ref, visible] = useReveal();

  return (
    <section className="py-24 md:py-32 bg-sand-50 dark:bg-night-900">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader eyebrow={t.methodology.eyebrow} title={t.methodology.title} />

        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10"
        >
          {teacher.methodology.map((step, i) => (
            <div
              key={i}
              className={`relative pt-2 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="font-arabicDisplay text-3xl text-gilt-500/80">{i + 1}</span>
                <div className="h-px flex-1 bg-palm-900/10 dark:bg-sand-100/15" />
              </div>
              <p className="font-arabicUI text-[17px] text-palm-900 dark:text-sand-100 leading-7">
                {pick(step)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
