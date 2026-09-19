import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { login } from '../api/authService';

export default function LoginPage() {
  const { dir, loginUser, t } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await login({ email, password });
      loginUser(response.user);
      navigate('/');
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || t.auth.invalidCredentials;
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
        <h2 className="font-arabicDisplay text-3xl text-palm-950 dark:text-sand-50 mb-6 text-center">{t.auth.loginTitle}</h2>
        
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-500/20 text-rose-800 dark:text-rose-400 text-sm font-arabicUI">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder={t.auth.email} value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} />
          <input type="password" placeholder={t.auth.password} value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass} />
          <button type="submit" disabled={submitting} className={buttonClass}>
            {submitting ? t.auth.loggingIn : t.auth.login}
          </button>
        </form>
        
        <div className="mt-6 text-center space-y-2">
          <Link to="/signup" className="block text-gilt-600 dark:text-gilt-400 hover:underline text-sm font-arabicUI transition-colors">{t.auth.noAccount}</Link>
          <Link to="/" className="block text-gilt-600 dark:text-gilt-400 hover:underline text-sm font-arabicUI transition-colors">{t.auth.backToHome}</Link>
        </div>
      </div>
    </div>
  );
}
