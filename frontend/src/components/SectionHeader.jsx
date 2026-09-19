export default function SectionHeader({ eyebrow, title, align = 'start' }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center mx-auto' : 'text-start'} max-w-2xl`}>
      <p className="font-arabicUI text-sm tracking-wide text-gilt-600 dark:text-gilt-400 mb-2">
        {eyebrow}
      </p>
      <h2 className="font-arabicDisplay text-3xl md:text-4xl text-palm-900 dark:text-sand-100 relative inline-block">
        {title}
        <span className="absolute -bottom-3 start-0 h-[3px] w-16 bg-gilt-500 rounded-full" />
      </h2>
    </div>
  );
}
