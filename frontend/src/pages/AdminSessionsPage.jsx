import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, StickyNote, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getAllSessions, updateSessionStatus, deleteSession, replyToSession } from '../api/teacherService';

export default function AdminSessionsPage() {
  const { dir, user, t } = useApp();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [replyingId, setReplyingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const data = await getAllSessions();
      setSessions(data);
    } catch (err) {
      setError(err.message || 'Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchSessions();
    }
  }, [user]);

  const handleStatusChange = async (id, newStatus) => {
    setActionLoadingId(id);
    try {
      await updateSessionStatus(id, { status: newStatus });
      await fetchSessions();
    } catch (err) {
      alert('Failed to update status: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmMsg = dir === 'rtl' 
      ? 'هل أنت متأكد من حذف طلب الحجز هذا؟' 
      : 'Are you sure you want to delete this booking request?';
    if (window.confirm(confirmMsg)) {
      setActionLoadingId(id);
      try {
        await deleteSession(id);
        await fetchSessions();
      } catch (err) {
        alert('Failed to delete session: ' + (err.response?.data?.message || err.message));
      } finally {
        setActionLoadingId(null);
      }
    }
  };

  const handleReplyChange = (id, value) => {
    setReplyDrafts(prev => ({ ...prev, [id]: value }));
  };

  const handleReplySubmit = async (id) => {
    setReplyingId(id);
    try {
      await replyToSession(id, replyDrafts[id] || '');
      await fetchSessions();
      setReplyDrafts(prev => ({ ...prev, [id]: '' }));
    } catch (err) {
      alert('Failed to send reply: ' + (err.response?.data?.message || err.message));
    } finally {
      setReplyingId(null);
    }
  };

  const contactLink = (info) => info.includes('@') ? `mailto:${info}` : `https://wa.me/${info.replace(/\D/g, '')}`;

  if (!user || user.role !== 'ADMIN') return null;

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      CONFIRMED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      CANCELLED: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredSessions = sessions.filter(s => statusFilter === 'ALL' || s.status === statusFilter);

  const filterTabs = [
    { label: dir === 'rtl' ? 'الكل' : 'All', value: 'ALL' },
    { label: t.status.PENDING, value: 'PENDING' },
    { label: t.status.CONFIRMED, value: 'CONFIRMED' },
    { label: t.status.CANCELLED, value: 'CANCELLED' }
  ];

  return (
    <div dir={dir} className="min-h-screen bg-gradient-to-b from-sand-50 via-sand-50 to-sand-100 dark:from-night-900 dark:via-night-900 dark:to-night-800 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link to="/profile" className="text-gilt-600 dark:text-gilt-400 hover:underline mb-2 block">
              {dir === 'rtl' ? 'العودة للحساب' : 'Back to Profile'}
            </Link>
            <h1 className="text-2xl font-semibold text-palm-900 dark:text-sand-100">
              {dir === 'rtl' ? 'إدارة طلبات الحجز' : 'Manage Booking Requests'}
            </h1>
          </div>
          <div className="flex gap-2 p-1 bg-palm-900/5 dark:bg-sand-100/5 rounded-full">
            {filterTabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === tab.value 
                    ? 'bg-palm-800 text-white' 
                    : 'text-palm-900/70 dark:text-sand-100/70 hover:bg-palm-900/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white dark:bg-night-800 shadow-sm p-12 text-center text-palm-900/70 dark:text-sand-100/70">
            {dir === 'rtl' ? 'جاري التحميل...' : 'Loading...'}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500 bg-red-50 dark:bg-red-950/30 p-8 text-center text-red-700 dark:text-red-400">
            {error}
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="rounded-2xl border border-palm-900/10 dark:border-sand-100/10 bg-white dark:bg-night-800 shadow-sm p-12 text-center">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-xl font-semibold text-palm-900 dark:text-sand-100 mb-2">
              {dir === 'rtl' ? 'لا توجد طلبات حجز' : 'No booking requests'}
            </h2>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSessions.map(s => (
              <div key={s.id} className="rounded-2xl border border-palm-900/10 dark:border-sand-100/10 bg-white dark:bg-night-800 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-palm-800 dark:bg-gilt-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                      {s.studentName?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-palm-900 dark:text-sand-100">{s.studentName}</p>
                      <p className="text-sm text-palm-900/70 dark:text-sand-100/70">{s.contactInfo}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(s.status)}`}>
                    {t.status[s.status] || s.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-palm-900/80 dark:text-sand-100/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 opacity-60" />
                    {new Date(s.requestedTime).toLocaleString()}
                  </div>
                  {s.notes && (
                    <div className="flex items-center gap-2 text-palm-900/60 dark:text-sand-100/60">
                      <StickyNote className="w-4 h-4 opacity-60" />
                      {s.notes}
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-2">
                  <select
                    disabled={actionLoadingId === s.id}
                    value={s.status}
                    onChange={(e) => handleStatusChange(s.id, e.target.value)}
                    className="px-3 py-2 rounded-lg border border-palm-900/20 dark:border-sand-100/20 bg-white dark:bg-night-900 text-palm-900 dark:text-sand-100 text-sm focus:outline-none focus:ring-2 focus:ring-gilt-500/30 cursor-pointer"
                  >
                    <option value="PENDING">{t.status.PENDING}</option>
                    <option value="CONFIRMED">{t.status.CONFIRMED}</option>
                    <option value="CANCELLED">{t.status.CANCELLED}</option>
                  </select>
                  
                  <a href={contactLink(s.contactInfo)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-all hover:scale-105 shadow-sm shadow-emerald-900/20">
                    {s.contactInfo.includes('@') ? (dir === 'rtl' ? 'بريد' : 'Email') : (dir === 'rtl' ? 'واتساب' : 'WhatsApp')}
                  </a>

                  <button 
                    disabled={actionLoadingId === s.id}
                    onClick={() => handleDelete(s.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm hover:bg-rose-200 transition-colors"
                  >
                    {dir === 'rtl' ? 'حذف' : 'Delete'}
                  </button>
                </div>
                
                <div className="pt-4 border-t border-palm-900/5 dark:border-sand-100/5 mt-2">
                  {s.adminReply && (
                    <div className="mt-3 me-8 p-3 rounded-2xl rounded-es-sm bg-gilt-500/10 border border-gilt-500/20 text-sm">
                      <div className="flex items-center gap-2 mb-1.5 text-gilt-800 dark:text-gilt-300 font-semibold">
                        <span>💬</span>
                        {dir === 'rtl' ? 'ردك' : 'Your reply'}
                      </div>
                      <p className="text-palm-900 dark:text-sand-100">{s.adminReply}</p>
                      <p className="text-xs text-palm-900/50 dark:text-sand-100/50 mt-1.5">
                        {new Date(s.adminReplyAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <textarea
                      value={replyDrafts[s.id] || ''}
                      onChange={(e) => handleReplyChange(s.id, e.target.value)}
                      placeholder={dir === 'rtl' ? 'اكتب ردك هنا...' : 'Write your reply here...'}
                      className="rounded-lg border border-palm-900/20 dark:border-sand-100/20 bg-transparent text-sm p-2 w-full"
                      rows={2}
                    />
                    <button
                      disabled={replyingId === s.id}
                      onClick={() => handleReplySubmit(s.id)}
                      className="bg-palm-800 hover:bg-palm-700 text-white rounded-lg px-4 py-1.5 text-sm self-end"
                    >
                      {replyingId === s.id ? (dir === 'rtl' ? 'جاري الإرسال...' : 'Sending...') : (dir === 'rtl' ? 'إرسال الرد' : 'Send Reply')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
