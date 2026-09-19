import { MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WhatsAppButton() {
  const { t, pick, teacher } = useApp();
  const href = `${teacher.contact.whatsapp.link}?text=${encodeURIComponent(pick(teacher.whatsappMessage))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsappFloat}
      className="fixed bottom-6 end-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-transform"
    >
      <MessageCircle className="w-7 h-7" strokeWidth={1.75} fill="currentColor" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40 -z-10" />
    </a>
  );
}
