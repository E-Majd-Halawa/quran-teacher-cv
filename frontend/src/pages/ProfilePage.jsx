import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { updateProfile, changePassword } from '../api/authService';
import { getMySessions } from '../api/teacherService';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const { dir, user, logoutUser, loginUser, t } = useApp();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [sessionsError, setSessionsError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      getMySessions()
        .then(setSessions)
        .catch((err) => setSessionsError(err.message || 'Failed to load sessions'))
        .finally(() => setSessionsLoading(false));
    }
  }, [user]);

  if (!user) return null;

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const payload = { firstName, lastName };
      if (user?.role === 'ADMIN') {
        payload.email = email;
      }
      const updatedUser = await updateProfile(payload);
      loginUser(updatedUser);
      setSaveSuccess(true);
    } catch (err) {
      setSaveError(err.response?.data?.message ? (Array.isArray(err.response.data.message) ? err.response.data.message.join(', ') : err.response.data.message) : 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setChangingPassword(true);
    setPasswordError(null);
    setPasswordSuccess(false);
    try {
      await changePassword({ currentPassword, newPassword });
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPasswordError(err.response?.data?.message ? (Array.isArray(err.response.data.message) ? err.response.data.message.join(', ') : err.response.data.message) : 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-palm-900/10 dark:border-sand-100/10 bg-sand-50/50 dark:bg-night-900/50 text-palm-900 dark:text-sand-100 font-arabicUI focus:outline-none focus:ring-2 focus:ring-gilt-500/20 focus:border-gilt-500/60 transition-colors";
  const buttonClass = "w-full py-3 px-5 rounded-full bg-palm-800 hover:bg-palm-700 text-sand-50 font-arabicUI font-medium transition-colors shadow-lg shadow-palm-900/20 disabled:bg-palm-800/50 disabled:cursor-not-allowed";

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-b from-sand-50 via-sand-50 to-sand-100 dark:from-night-900 dark:via-night-900 dark:to-night-800 py-12 px-5">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-2">
          <Link to="/" className="text-sm text-gilt-600 dark:text-gilt-400 hover:underline font-arabicUI">
            {dir === 'rtl' ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded-full border border-rose-500/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/70 text-sm font-arabicUI font-medium transition-colors"
          >
            {dir === 'rtl' ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </div>
        {user?.role === 'ADMIN' && (
          <Link
            to="/admin/sessions"
            className="flex items-center justify-between gap-3 w-full p-4 rounded-2xl border border-palm-900/10 dark:border-sand-100/10 bg-white dark:bg-night-800 shadow-sm hover:shadow-md hover:border-gilt-500/40 transition-all duration-200 mb-6 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gilt-500/10 text-gilt-600 dark:text-gilt-400 flex items-center justify-center shrink-0">
                📋
              </div>
              <div>
                <p className="font-arabicUI font-semibold text-palm-900 dark:text-sand-100">
                  {dir === 'rtl' ? 'لوحة تحكم طلبات الحجز' : 'Manage Booking Requests'}
                </p>
                <p className="font-arabicUI text-xs text-palm-900/60 dark:text-sand-100/60">
                  {dir === 'rtl' ? 'عرض وإدارة طلبات الحجز الواردة' : 'View and manage incoming booking requests'}
                </p>
              </div>
            </div>
            {dir === 'rtl' ? (
              <ArrowLeft className="w-4 h-4 text-palm-900/40 dark:text-sand-100/40 group-hover:text-gilt-500 transition-colors" />
            ) : (
              <ArrowRight className="w-4 h-4 text-palm-900/40 dark:text-sand-100/40 group-hover:text-gilt-500 transition-colors" />
            )}
          </Link>
        )}
        <div className="rounded-2xl border bg-white dark:bg-night-800 shadow-xl shadow-palm-950/10 border-palm-900/10 dark:border-sand-100/10 p-8 font-arabicUI">
          <h1 className="text-2xl font-semibold mb-6 text-palm-900 dark:text-sand-100 font-arabicDisplay">
            {dir === 'rtl' ? 'حسابي' : 'My Profile'}
          </h1>
          {user?.role !== 'ADMIN' && (
            <p className="text-sm text-palm-900/60 dark:text-sand-100/60 mb-6 font-arabicUI">{user?.email}</p>
          )}
          
          <form onSubmit={handleProfileSubmit} className="space-y-4 mb-8">
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className={inputClass} />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className={inputClass} />
            {user?.role === 'ADMIN' && (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dir === 'rtl' ? 'البريد الإلكتروني' : 'Email'}
                className={inputClass}
              />
            )}
            <button type="submit" disabled={savingProfile} className={buttonClass}>
              {savingProfile ? 'Saving...' : 'Save Changes'}
            </button>
            {saveError && <p className="text-red-500 text-sm font-arabicUI">{saveError}</p>}
            {saveSuccess && <p className="text-green-500 text-sm font-arabicUI">Profile updated successfully!</p>}
          </form>
          </div>

        <div className="rounded-2xl border bg-white dark:bg-night-800 shadow-xl shadow-palm-950/10 border-palm-900/10 dark:border-sand-100/10 p-8 font-arabicUI">
          <h2 className="text-xl font-semibold mb-6 text-palm-900 dark:text-sand-100 font-arabicDisplay">
            {dir === 'rtl' ? 'تغيير كلمة المرور' : 'Change Password'}
          </h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder={dir === 'rtl' ? 'كلمة المرور الحالية' : 'Current Password'} className={inputClass} />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={dir === 'rtl' ? 'كلمة المرور الجديدة' : 'New Password'} className={inputClass} />
            <button type="submit" disabled={changingPassword} className={buttonClass}>
              {changingPassword ? (dir === 'rtl' ? 'جاري التحديث...' : 'Updating...') : (dir === 'rtl' ? 'تحديث كلمة المرور' : 'Update Password')}
            </button>
            {passwordError && <p className="text-red-500 text-sm font-arabicUI">{passwordError}</p>}
            {passwordSuccess && <p className="text-green-500 text-sm font-arabicUI">Password updated successfully!</p>}
          </form>
        </div>

        {user?.role !== 'ADMIN' && (
          <div className="rounded-2xl border bg-white dark:bg-night-800 shadow-xl shadow-palm-950/10 border-palm-900/10 dark:border-sand-100/10 p-8 font-arabicUI">
            <h2 className="text-xl font-semibold mb-6 text-palm-900 dark:text-sand-100 font-arabicDisplay">
              {dir === 'rtl' ? 'طلبات الحجز الخاصة بي' : 'My Booking Requests'}
            </h2>
            {sessionsLoading ? <p className="font-arabicUI">Loading...</p> : sessionsError ? <p className="text-red-500 font-arabicUI">{sessionsError}</p> : sessions.length === 0 ? <p className="font-arabicUI">{dir === 'rtl' ? 'لا توجد طلبات حجز بعد' : 'No booking requests yet'}</p> : (
              <ul className="space-y-4">
                {sessions.map(s => (
                  <li key={s.id} className="p-4 rounded-xl border border-palm-900/10 dark:border-sand-100/10 bg-sand-50/50 dark:bg-night-900/30 font-arabicUI">
                    <p><strong>{new Date(s.requestedTime).toLocaleString()}</strong> - {t.status[s.status] || s.status}</p>
                    {s.notes && <p className="text-sm opacity-70">{s.notes}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
