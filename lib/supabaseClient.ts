import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type ChefReaction = {
  id: string;
  event_type: string;
  message: string;
  emoji: string;
};

export type UserProfile = {
  id: string;
  display_name: string;
  avatar_emoji: string;
  is_guest: boolean;
};

export type GameProgress = {
  id: string;
  user_id: string;
  current_level: number;
  highest_level_completed: number;
  total_mistakes: number;
  perfect_levels: number;
  free_cook_dishes: number;
  updated_at: string;
};

export type HighScore = {
  id: string;
  user_id: string;
  level: number;
  score: number;
  mistakes: number;
  perfect: boolean;
  created_at: string;
};
