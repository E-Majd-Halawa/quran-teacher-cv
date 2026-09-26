import { Download, MessageCircle, FileText, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const { t, pick, teacher } = useApp();

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-sand-50 via-sand-50 to-sand-100 dark:from-night-900 dark:via-night-900 dark:to-night-800"
    >
      <div className="absolute inset-0 bg-geo-pattern bg-[length:84px_84px] opacity-60 pointer-events-none" />
      <div className="absolute -top-24 start-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-palm-700/10 dark:bg-palm-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-14 items-center w-full">
        <div className="order-2 md:order-1 animate-fadeUp">
          <p className="font-arabicDisplay text-gilt-600 dark:text-gilt-400 text-xl md:text-2xl mb-5 leading-relaxed">
            {pick(teacher.verse)}
          </p>

          <h1 className="font-arabicDisplay text-4xl md:text-6xl leading-[1.15] text-palm-950 dark:text-sand-50 mb-4">
            {pick(teacher.name)}
          </h1>
          <p className="font-arabicUI text-lg md:text-xl text-gilt-600 dark:text-gilt-400 mb-6">
            {pick(teacher.title)}
          </p>
          <p className="font-arabicUI text-base md:text-lg text-ink/75 dark:text-sand-200/75 max-w-xl leading-8 mb-9">
            {pick(teacher.tagline)}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('about')}
              className="px-6 py-3 rounded-full bg-palm-800 hover:bg-palm-700 text-sand-50 font-arabicUI text-sm md:text-base transition-colors shadow-lg shadow-palm-900/20"
            >
              {t.hero.cta1}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 rounded-full border border-palm-800/30 dark:border-sand-100/25 text-palm-900 dark:text-sand-100 hover:border-gilt-500 font-arabicUI text-sm md:text-base transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              {t.hero.cta2}
            </button>
            {teacher.cvFile && (
              <a
                href={teacher.cvFile}
                download={teacher.cvFile.split('/').pop()}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full border border-gilt-500/60 text-gilt-600 dark:text-gilt-400 hover:bg-gilt-500/10 font-arabicUI text-sm md:text-base transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" strokeWidth={1.5} />
                {t.hero.cta3}
                <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end animate-fadeUp">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-gilt-500/40" />
            <div className="w-64 h-80 md:w-80 md:h-[26rem] rounded-[1.75rem] overflow-hidden ring-1 ring-black/5 shadow-2xl shadow-palm-950/20">
              <img
                src={teacher.photo}
                alt={pick(teacher.name)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -start-5 bg-palm-900 text-sand-50 rounded-2xl px-5 py-3 shadow-xl font-arabicUI text-sm">
              <p className="text-gilt-400 text-lg leading-none font-semibold mb-1">
                {teacher.about.experienceYears}+
              </p>
              <p className="opacity-80 text-xs">{t.about.experience}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo('about')}
        className="hidden md:flex flex-col items-center gap-1 absolute bottom-8 start-1/2 -translate-x-1/2 text-ink/50 dark:text-sand-200/50 text-xs font-arabicUI"
        aria-label={t.hero.scroll}
      >
        {t.hero.scroll}
        <ChevronDown className="w-4 h-4 animate-bounce" strokeWidth={1.5} />
      </button>
    </section>
  );
}
