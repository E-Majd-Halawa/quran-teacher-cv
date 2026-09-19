import { useState, useEffect } from 'react';
import { getTeacherProfile } from '../api/teacherService';

export default function useTeacherProfile() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getTeacherProfile();
        setTeacher(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the teacher profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { teacher, loading, error };
}
