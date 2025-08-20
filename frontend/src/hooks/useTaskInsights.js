import { useCallback, useEffect, useState } from 'react';
import { tasksApi } from '../utils/api';

export default function useTaskInsights() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const [categories, setCategories] = useState([]);
  const [progress, setProgress] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, c, w] = await Promise.all([
        tasksApi.getStats(),
        tasksApi.getCategories(),
        tasksApi.getWeeklyProgress(),
      ]);
      setStats(s.data || {});
      setCategories(c.data || []);
      setProgress(w.data || []);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, error, stats, categories, progress, reload: load };
}


