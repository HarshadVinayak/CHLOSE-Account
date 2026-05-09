import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  region: string | null;
  is_verified: boolean;
}

export interface Wallet {
  plc_balance: number;
  environmental_impact: number;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileAndWallet = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(); // maybeSingle handles 0 or 1 rows without error

      if (profileError) throw profileError;

      // If no profile, initialize it
      if (!profileData) {
        const newProfile = {
          id: user.id,
          full_name: user.user_metadata.full_name || '',
          username: user.email?.split('@')[0] || '',
        };
        const { data: insertedProfile, error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();
        
        if (insertError) throw insertError;
        setProfile(insertedProfile);
      } else {
        setProfile(profileData);
      }

      // Fetch wallet
      const { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (walletError) throw walletError;

      if (!walletData) {
        const newWallet = { id: user.id, plc_balance: 0, environmental_impact: 0 };
        const { data: insertedWallet, error: wInsertError } = await supabase
          .from('wallets')
          .insert(newWallet)
          .select()
          .single();
          
        if (wInsertError) throw wInsertError;
        setWallet(insertedWallet);
      } else {
        setWallet(walletData);
      }

    } catch (error) {
      console.error('Error fetching profile/wallet:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfileAndWallet();
  }, [fetchProfileAndWallet]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    
    if (error) throw error;
    
    // Crucial: Fetch fresh data from server after update to ensure persistence
    await fetchProfileAndWallet();
  };

  const updateWallet = async (amount: number) => {
    if (!user || !wallet) return;
    const newBalance = wallet.plc_balance + amount;
    const { error } = await supabase
      .from('wallets')
      .update({ plc_balance: newBalance })
      .eq('id', user.id);
    
    if (error) throw error;
    await fetchProfileAndWallet();
  };

  return { profile, wallet, loading, updateProfile, updateWallet, refresh: fetchProfileAndWallet };
};
