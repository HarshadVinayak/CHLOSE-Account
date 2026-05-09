import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const useActivity = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivity = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (!error) setActivities(data);
    setLoading(false);
  };

  const logActivity = async (action: string, status: string = 'verified') => {
    if (!user) return;
    const deviceInfo = `${navigator.userAgent.split(')')[0].split('(')[1]}`; // Basic OS/Browser info
    await supabase.from('activity_log').insert({
      user_id: user.id,
      action,
      device_info: deviceInfo,
      status
    });
    fetchActivity();
  };

  useEffect(() => {
    fetchActivity();
  }, [user]);

  return { activities, loading, logActivity, refresh: fetchActivity };
};
