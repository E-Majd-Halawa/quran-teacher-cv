import { MessageCircle, Mail, Send, Facebook, Linkedin, ArrowUpLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import useReveal from '../hooks/useReveal';

export default function Contact() {
  const { t, lang, pick, teacher } = useApp();
  const [ref, visible] = useReveal();
  const c = teacher.contact;

  const waHref = `${c.whatsapp.link}?text=${encodeURIComponent(pick(teacher.whatsappMessage))}`;

  const channels = [
    { icon: MessageCircle, label: t.contact.whatsapp, href: waHref, accent: true },
    { icon: Mail, label: t.contact.email, href: `mailto:${c.email}` },
    { icon: Send, label: t.contact.telegram, href: c.telegram },
    { icon: Facebook, label: t.contact.facebook, href: c.facebook },
    { icon: Linkedin, label: t.contact.linkedin, href: c.linkedin },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-sand-50 dark:bg-night-900">
      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
        <p className="font-arabicUI text-sm tracking-wide text-gilt-600 dark:text-gilt-400 mb-2">
          {t.contact.eyebrow}
        </p>
        <h2 className="font-arabicDisplay text-3xl md:text-4xl text-palm-900 dark:text-sand-100 mb-4">
          {t.contact.title}
        </h2>
        <p className="font-arabicUI text-ink/70 dark:text-sand-200/70 max-w-xl mx-auto mb-12 leading-7">
          {t.contact.subtitle}
        </p>

        <div
          ref={ref}
          className={`grid sm:grid-cols-2 md:grid-cols-3 gap-4 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {channels.map((ch, i) => (
            <a
              key={i}
              href={ch.href}
              target="_blank"
              rel="noreferrer"
              className={`group flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border transition-colors ${
                ch.accent
                  ? 'bg-palm-800 border-palm-800 text-sand-50 hover:bg-palm-700'
                  : 'bg-white dark:bg-night-800 border-palm-900/10 dark:border-sand-100/10 text-palm-900 dark:text-sand-100 hover:border-gilt-500/60'
              }`}
            >
              <span className="flex items-center gap-3 font-arabicUI text-[15px]">
                <ch.icon className="w-5 h-5" strokeWidth={1.5} />
                {ch.label}
              </span>
              <ArrowUpLeft
                className={`w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity ${
                  lang === 'ar' ? '' : 'rotate-90'
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
