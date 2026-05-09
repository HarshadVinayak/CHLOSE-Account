import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const useSessionTracker = () => {
  const { user, session } = useAuth();

  useEffect(() => {
    if (!user || !session) return;

    const trackSession = async () => {
      // Basic device fingerprinting
      const ua = navigator.userAgent;
      let deviceName = 'Desktop';
      if (/iPhone|iPad|iPod/i.test(ua)) deviceName = 'iPhone / iPad';
      else if (/Android/i.test(ua)) deviceName = 'Android Device';

      const os = navigator.platform;
      const browser = navigator.userAgent.split(' ').pop();

      // Check if this session is already registered (using session id or a hash)
      // For this implementation, we use the session token's first 10 chars as a unique identifier for the device session
      const sessionId = session.access_token.substring(0, 10);

      const { data: existing } = await supabase
        .from('user_sessions')
        .select('id')
        .eq('id', sessionId)
        .maybeSingle();

      if (!existing) {
        await supabase.from('user_sessions').upsert({
          id: sessionId,
          user_id: user.id,
          device_name: deviceName,
          os: os,
          browser: browser,
          last_active: new Date().toISOString(),
          is_active: true
        });
      } else {
        // Heartbeat update
        await supabase.from('user_sessions')
          .update({ last_active: new Date().toISOString() })
          .eq('id', sessionId);
      }
    };

    trackSession();
    const interval = setInterval(trackSession, 60000); // Heartbeat every 1 minute

    return () => clearInterval(interval);
  }, [user, session]);
};
