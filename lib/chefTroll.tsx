'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase, ChefReaction } from './supabaseClient';

const FALLBACK_REACTIONS: Record<string, ChefReaction[]> = {
  praise_perfect: [
    { id: 'f1', event_type: 'praise_perfect', message: 'You should be the boss! Flawless. I am almost proud.', emoji: '🤩' },
    { id: 'f2', event_type: 'praise_perfect', message: 'Not a single mistake?! Who hired you? You are dangerous.', emoji: '😎' },
  ],
  praise_good: [
    { id: 'f3', event_type: 'praise_good', message: 'You survived. Barely. But I will allow it.', emoji: '🙂' },
  ],
  mock_wrong: [
    { id: 'f4', event_type: 'mock_wrong', message: 'Wrong! Did you learn to cook from a microwave manual?', emoji: '🤦' },
    { id: 'f5', event_type: 'mock_wrong', message: 'That is NOT an ingredient. That is a crime.', emoji: '😡' },
  ],
  mock_fail: [
    { id: 'f6', event_type: 'mock_fail', message: 'TWO mistakes! Restarting. Try using your eyes this time.', emoji: '💀' },
  ],
  level_complete: [
    { id: 'f7', event_type: 'level_complete', message: 'Level done. Do not let it get to your head.', emoji: '🎉' },
  ],
  game_complete: [
    { id: 'f8', event_type: 'game_complete', message: 'You beat all 20 levels. I have nothing left to teach you. Chef.', emoji: '👑' },
  ],
  free_perfect: [{ id: 'f9', event_type: 'free_perfect', message: 'PERFECT! A masterpiece. I am speechless. Almost.', emoji: '🌟' }],
  free_good: [{ id: 'f10', event_type: 'free_good', message: 'Good dish. Edible. I will not throw it at you.', emoji: '😋' }],
  free_not_good: [{ id: 'f11', event_type: 'free_not_good', message: 'Not good. Not terrible. Just... why?', emoji: '😐' }],
  free_bad: [{ id: 'f12', event_type: 'free_bad', message: 'Bad. The bin rejected it. So did I.', emoji: '🤮' }],
  free_so_bad: [{ id: 'f13', event_type: 'free_so_bad', message: 'SO BAD. I am calling the police. On you. For cooking.', emoji: '🚓' }],
};

let reactionCache: Record<string, ChefReaction[]> | null = null;

async function loadReactions(): Promise<Record<string, ChefReaction[]>> {
  if (reactionCache) return reactionCache;
  const { data, error } = await supabase.from('chef_reactions').select('*');
  if (error || !data || data.length === 0) {
    reactionCache = FALLBACK_REACTIONS;
    return reactionCache;
  }
  const grouped: Record<string, ChefReaction[]> = {};
  (data as ChefReaction[]).forEach((r) => {
    if (!grouped[r.event_type]) grouped[r.event_type] = [];
    grouped[r.event_type].push(r);
  });
  reactionCache = grouped;
  return reactionCache;
}

export type ChefMood = 'idle' | 'happy' | 'angry' | 'shocked' | 'celebrate';

const MOOD_EMOJI: Record<ChefMood, string> = {
  idle: '👨‍🍳',
  happy: '🤩',
  angry: '😡',
  shocked: '😱',
  celebrate: '👑',
};

export function useChefReaction() {
  const [current, setCurrent] = useState<ChefReaction | null>(null);
  const [mood, setMood] = useState<ChefMood>('idle');

  const react = useCallback(async (eventType: string, moodOverride?: ChefMood) => {
    const reactions = await loadReactions();
    const pool = reactions[eventType] ?? [];
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(pick);
    if (moodOverride) setMood(moodOverride);
    else if (eventType.startsWith('praise') || eventType === 'level_complete') setMood('happy');
    else if (eventType === 'game_complete') setMood('celebrate');
    else if (eventType === 'mock_fail') setMood('shocked');
    else if (eventType.startsWith('mock') || eventType.startsWith('free_bad') || eventType === 'free_so_bad') setMood('angry');
    else setMood('idle');
  }, []);

  const clear = useCallback(() => {
    setCurrent(null);
    setMood('idle');
  }, []);

  return { current, mood, react, clear };
}

export function ChefTroll({ mood, reaction }: { mood: ChefMood; reaction: ChefReaction | null }) {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (reaction) {
      setBounce(true);
      const t = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(t);
    }
  }, [reaction]);

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div
        className={`text-7xl transition-transform duration-300 ${bounce ? 'animate-bounce' : ''}`}
        style={{ filter: mood === 'angry' ? 'hue-rotate(0deg) drop-shadow(0 0 12px rgba(239,68,68,0.6))' : 'none' }}
      >
        {MOOD_EMOJI[mood]}
      </div>
      <div className="relative max-w-xs">
        {reaction ? (
          <div className="rounded-2xl bg-amber-100 border-2 border-amber-300 px-4 py-3 shadow-lg animate-[fadeIn_0.3s_ease-out]">
            <p className="text-sm font-medium text-amber-900 leading-snug">
              <span className="text-xl mr-1">{reaction.emoji}</span>
              {reaction.message}
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-100 border-b-2 border-r-2 border-amber-300 rotate-45" />
          </div>
        ) : (
          <div className="rounded-2xl bg-gray-100 border-2 border-gray-200 px-4 py-3">
            <p className="text-sm text-gray-500 italic text-center">The Chef is watching...</p>
          </div>
        )}
      </div>
    </div>
  );
}
