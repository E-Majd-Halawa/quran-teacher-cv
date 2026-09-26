import { useEffect } from "react";
import { X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function CertificateModal({ certificate, onClose }) {
  const { pick } = useApp();

  useEffect(() => {
    if (!certificate) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-night-950/70 backdrop-blur-sm animate-[fadeUp_0.25s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-sand-50 dark:bg-night-800 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 w-9 h-9 grid place-items-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
          aria-label="close"
        >
          <X className="w-5 h-5" />
        </button>
        <img
          src={certificate.image}
          alt={pick(certificate.title)}
          className="w-full max-h-[70vh] object-contain bg-sand-100 dark:bg-night-900"
        />
        <div className="p-6">
          <h3 className="font-arabicDisplay text-xl text-palm-900 dark:text-sand-100 mb-1">
            {pick(certificate.title)}
          </h3>
          <p className="font-arabicUI text-sm text-ink/70 dark:text-sand-200/70">
            {[certificate.issuer && pick(certificate.issuer), certificate.year].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
