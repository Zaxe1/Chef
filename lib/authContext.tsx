'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, UserProfile, GameProgress } from './supabaseClient';

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  progress: GameProgress | null;
  isGuest: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  playAsGuest: () => void;
  refreshProgress: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadUserData = useCallback(async (uid: string) => {
    const { data: prof } = await supabase
      .from('user_profile')
      .select('*')
      .eq('id', uid)
      .maybeSingle();
    setProfile(prof as UserProfile | null);

    const { data: prog } = await supabase
      .from('game_progress')
      .select('*')
      .eq('user_id', uid)
      .maybeSingle();
    setProgress(prog as GameProgress | null);
  }, []);

  const refreshProgress = useCallback(async () => {
    if (!user) return;
    const { data: prog } = await supabase
      .from('game_progress')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();
    setProgress(prog as GameProgress | null);
  }, [user]);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData(session.user.id).finally(() => mounted && setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      (async () => {
        setSession(sess);
        setUser(sess?.user ?? null);
        if (sess?.user) {
          await loadUserData(sess.user.id);
        } else {
          setProfile(null);
          setProgress(null);
        }
        setLoading(false);
      })();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserData]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error: error.message };
    if (data.user) {
      await supabase.from('user_profile').insert({
        id: data.user.id,
        display_name: displayName,
      });
      await supabase.from('game_progress').insert({ user_id: data.user.id });
    }
    return { error: null };
  };

  const signOut = async () => {
    setIsGuest(false);
    setProfile(null);
    setProgress(null);
    await supabase.auth.signOut();
  };

  const playAsGuest = () => {
    setIsGuest(true);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, profile, progress, isGuest, loading, signIn, signUp, signOut, playAsGuest, refreshProgress }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
