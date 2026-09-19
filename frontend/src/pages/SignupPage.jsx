import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import axiosInstance from '../api/axiosInstance';

export default function SignupPage() {
  const { dir, loginUser, t } = useApp();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/auth/signup', { firstName, lastName, email, password });
      loginUser(response.data.user);
      navigate('/');
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || t.auth.signupError;
      setError(Array.isArray(errMsg) ? errMsg.join(', ') : errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-palm-900/10 dark:border-sand-100/10 bg-sand-50/50 dark:bg-night-900/50 text-palm-900 dark:text-sand-100 font-arabicUI focus:outline-none focus:ring-2 focus:ring-gilt-500/20 focus:border-gilt-500/60 transition-colors";
  const buttonClass = "w-full py-3 px-5 rounded-full bg-palm-800 hover:bg-palm-700 text-sand-50 font-arabicUI font-medium transition-colors shadow-lg shadow-palm-900/20 disabled:bg-palm-800/50 disabled:cursor-not-allowed";

  return (
    <div dir={dir} className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-sand-50 via-sand-50 to-sand-100 dark:from-night-900 dark:via-night-900 dark:to-night-800">
      <div className="w-full max-w-lg p-8 rounded-2xl border bg-white dark:bg-night-800 border-palm-900/10 dark:border-sand-100/10 shadow-xl shadow-palm-950/10 font-arabicUI">
        <h2 className="font-arabicDisplay text-3xl text-palm-950 dark:text-sand-50 mb-6 text-center">{t.auth.signupTitle}</h2>
        
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-500/20 text-rose-800 dark:text-rose-400 text-sm font-arabicUI">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder={t.auth.firstName} value={firstName} onChange={(e) => setFirstName(e.target.value)} required className={inputClass} />
          <input type="text" placeholder={t.auth.lastName} value={lastName} onChange={(e) => setLastName(e.target.value)} required className={inputClass} />
          <input type="email" placeholder={t.auth.email} value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
          <div>
            <input type="password" placeholder={t.auth.password} value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
            <p className="text-xs text-palm-900/60 dark:text-sand-100/60 mt-1 font-arabicUI">{t.auth.passwordHint}</p>
          </div>
          <button type="submit" disabled={submitting} className={buttonClass}>
            {submitting ? t.auth.creatingAccount : t.auth.signupTitle}
          </button>
        </form>
        
        <div className="mt-6 text-center space-y-2">
          <Link to="/login" className="block text-gilt-600 dark:text-gilt-400 hover:underline text-sm font-arabicUI transition-colors">{t.auth.haveAccount}</Link>
          <Link to="/" className="block text-gilt-600 dark:text-gilt-400 hover:underline text-sm font-arabicUI transition-colors">{t.auth.backToHome}</Link>
        </div>
      </div>
    </div>
  );
}
