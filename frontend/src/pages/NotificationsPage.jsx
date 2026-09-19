import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getMyNotifications, markReplySeen } from '../api/teacherService';

export default function NotificationsPage() {
  const { dir, user, t } = useApp();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          setLoading(true);
          const data = await getMyNotifications();
          setNotifications(data);
        } catch (err) {
          setError(err.message || 'Failed to load notifications');
        } finally {
          setLoading(false);
        }
      };
      fetchNotifications();
    }
  }, [user]);

  const handleOpen = async (session) => {
    if (!session.replySeenAt) {
      setNotifications(prev => prev.map(n => 
        n.id === session.id ? { ...n, replySeenAt: new Date().toISOString() } : n
      ));
      try {
        await markReplySeen(session.id);
      } catch (err) {
        console.error('Failed to mark reply as seen', err);
      }
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      CONFIRMED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      CANCELLED: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  if (!user) return null;

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-b from-sand-50 via-sand-50 to-sand-100 dark:from-night-900 dark:via-night-900 dark:to-night-800 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/profile" className="text-gilt-600 dark:text-gilt-400 hover:underline">
            {dir === 'rtl' ? 'العودة للحساب' : 'Back to Profile'}
          </Link>
          <h1 className="text-2xl font-semibold text-palm-900 dark:text-sand-100">
            {dir === 'rtl' ? 'الإشعارات' : 'Notifications'}
          </h1>
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white dark:bg-night-800 shadow-sm p-12 text-center text-palm-900/70 dark:text-sand-100/70">
            {dir === 'rtl' ? 'جاري التحميل...' : 'Loading...'}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500 bg-red-50 dark:bg-red-950/30 p-8 text-center text-red-700 dark:text-red-400">
            {error}
          </div>
        ) : notifications.length === 0 ? (
          <div className="rounded-2xl border border-palm-900/10 dark:border-sand-100/10 bg-white dark:bg-night-800 shadow-sm p-12 text-center">
            <div className="text-5xl mb-4">🔔</div>
            <h2 className="text-xl font-semibold text-palm-900 dark:text-sand-100 mb-2">
              {dir === 'rtl' ? 'لا توجد إشعارات' : 'No notifications yet'}
            </h2>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(item => (
              <div 
                key={item.id} 
                onClick={() => handleOpen(item)}
                className={`rounded-2xl border bg-white dark:bg-night-800 shadow-sm p-5 cursor-pointer border-palm-900/10 dark:border-sand-100/10 ${!item.replySeenAt ? 'border-s-4 border-s-gilt-500' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-palm-900/70 dark:text-sand-100/70">
                    {dir === 'rtl' ? 'طلب بتاريخ:' : 'Requested on:'} {new Date(item.requestedTime).toLocaleString()}
                  </p>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusBadge(item.status)}`}>
                    {t.status[item.status] || item.status}
                  </span>
                </div>
                
                <div className="p-3 rounded-2xl rounded-es-sm bg-gilt-500/5 dark:bg-gilt-500/10 border border-gilt-500/10 mb-2">
                  <div className="flex items-center gap-2 mb-1.5 text-palm-900/70 dark:text-sand-100/70 text-xs">
                    <span>💬</span>
                    {dir === 'rtl' ? 'رد المعلم' : "Teacher's Reply"}
                  </div>
                  <p className="text-sm text-palm-900 dark:text-sand-100">{item.adminReply}</p>
                </div>
                
                <p className="text-xs text-palm-900/50 dark:text-sand-100/50">
                  {new Date(item.adminReplyAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
