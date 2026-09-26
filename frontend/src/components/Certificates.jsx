import { useState } from 'react';
import { Award, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SectionHeader from './SectionHeader';
import useReveal from '../hooks/useReveal';
import CertificateModal from './CertificateModal';

export default function Certificates() {
  const { t, pick, teacher } = useApp();
  const [ref, visible] = useReveal();
  const [active, setActive] = useState(null);

  if (!teacher.certificates || teacher.certificates.length === 0) return null;

  const items = teacher.certificates;

  return (
    <section id="certificates" className="py-24 md:py-32 bg-sand-50 dark:bg-night-900">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader eyebrow={t.certificates.eyebrow} title={t.certificates.title} />

        <div ref={ref} className="relative">
          <div className="absolute start-[27px] md:start-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-gilt-500/60 via-gilt-500/30 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {items.map((c, i) => (
              <div
                key={i}
                className={`relative flex md:items-center gap-6 md:gap-0 transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                } ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="absolute start-0 md:start-1/2 md:-translate-x-1/2 w-14 h-14 rounded-full bg-sand-50 dark:bg-night-900 border-2 border-gilt-500 grid place-items-center shrink-0 z-10">
                  <Award className="w-6 h-6 text-gilt-600 dark:text-gilt-400" strokeWidth={1.5} />
                </div>

                <div className={`ms-20 md:ms-0 md:w-1/2 ${i % 2 === 0 ? 'md:pe-14' : 'md:ps-14'}`}>
                  <div className="rounded-2xl border border-palm-900/10 dark:border-sand-100/10 bg-white dark:bg-night-800 p-6 hover:border-gilt-500/50 transition-colors">
                    {c.year && (
                      <p className="font-arabicUI text-gilt-600 dark:text-gilt-400 text-sm mb-1">{c.year}</p>
                    )}
                    <h3 className="font-arabicDisplay text-xl text-palm-900 dark:text-sand-100 mb-2">
                      {pick(c.title)}
                    </h3>
                    {c.issuer && (
                      <p className="font-arabicUI text-sm text-ink/70 dark:text-sand-200/70 mb-1">
                        {t.certificates.issuer}: {pick(c.issuer)}
                      </p>
                    )}
                    <p className="font-arabicUI text-sm text-ink/70 dark:text-sand-200/70 mb-4">
                      {t.certificates.type}: {pick(c.type)}
                    </p>
                    <button
                      onClick={() => setActive(c)}
                      className="inline-flex items-center gap-2 text-sm font-arabicUI text-palm-800 dark:text-gilt-400 hover:text-gilt-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" strokeWidth={1.5} />
                      {t.certificates.view}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CertificateModal certificate={active} onClose={() => setActive(null)} />
    </section>
  );
}
