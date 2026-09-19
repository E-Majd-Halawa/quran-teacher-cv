import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { createBookingRequest } from '../api/teacherService';

export default function BookingForm() {
  const { dir, t } = useApp();

  const [studentName, setStudentName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [requestedTime, setRequestedTime] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const isoTime = new Date(requestedTime).toISOString();
      await createBookingRequest({
        studentName,
        contactInfo,
        requestedTime: isoTime,
        notes: notes || undefined,
      });

      setSuccess(true);
      setStudentName('');
      setContactInfo('');
      setRequestedTime('');
      setNotes('');
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || t.booking.errorGeneric;
      setError(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-16 md:py-24 bg-sand-50 dark:bg-night-900" dir={dir}>
      <div className="max-w-lg mx-auto p-6 rounded-2xl border bg-white dark:bg-night-800 border-palm-900/10 dark:border-sand-100/10 shadow-sm font-arabicUI">
        <div className="text-center mb-8">
          <p className="font-arabicUI text-sm tracking-wide text-gilt-600 dark:text-gilt-400 mb-2">
            {t.booking.eyebrow}
          </p>
          <h2 className="font-arabicDisplay text-2xl md:text-3xl text-palm-900 dark:text-sand-100">
            {t.booking.title}
          </h2>
        </div>

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 text-emerald-800 dark:text-emerald-400 font-arabicUI text-sm">
            {t.booking.success}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-500/20 text-rose-800 dark:text-rose-400 font-arabicUI text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-palm-900 dark:text-sand-100 mb-1.5">
              {t.booking.studentName}
            </label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-palm-900/10 dark:border-sand-100/10 bg-sand-50/50 dark:bg-night-900/50 text-palm-900 dark:text-sand-100 focus:outline-none focus:ring-2 focus:ring-gilt-500/20 focus:border-gilt-500/60 transition-colors"
              placeholder={t.booking.studentNamePlaceholder}
            />
          </div>

          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium text-palm-900 dark:text-sand-100 mb-1.5">
              {t.booking.contactInfo}
            </label>
            <input
              type="text"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-palm-900/10 dark:border-sand-100/10 bg-sand-50/50 dark:bg-night-900/50 text-palm-900 dark:text-sand-100 focus:outline-none focus:ring-2 focus:ring-gilt-500/20 focus:border-gilt-500/60 transition-colors"
              placeholder={t.booking.contactInfoPlaceholder}
            />
          </div>

          <div>
            <label htmlFor="requestedTime" className="block text-sm font-medium text-palm-900 dark:text-sand-100 mb-1.5">
              {t.booking.requestedTime}
            </label>
            <input
              type="datetime-local"
              id="requestedTime"
              value={requestedTime}
              onChange={(e) => setRequestedTime(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-palm-900/10 dark:border-sand-100/10 bg-sand-50/50 dark:bg-night-900/50 text-palm-900 dark:text-sand-100 focus:outline-none focus:ring-2 focus:ring-gilt-500/20 focus:border-gilt-500/60 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-palm-900 dark:text-sand-100 mb-1.5">
              {t.booking.notes}
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-palm-900/10 dark:border-sand-100/10 bg-sand-50/50 dark:bg-night-900/50 text-palm-900 dark:text-sand-100 focus:outline-none focus:ring-2 focus:ring-gilt-500/20 focus:border-gilt-500/60 transition-colors resize-none"
              placeholder={t.booking.notesPlaceholder}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-5 rounded-xl bg-palm-800 text-sand-50 hover:bg-palm-700 font-medium transition-colors disabled:bg-palm-800/50 disabled:cursor-not-allowed text-center cursor-pointer"
          >
            {submitting ? t.booking.submitting : t.booking.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
