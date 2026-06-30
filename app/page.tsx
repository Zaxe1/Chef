'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { AuthScreen } from '@/components/AuthScreen';
import { LevelGame } from '@/components/LevelGame';
import { FreeCooking } from '@/components/FreeCooking';
import { Celebration } from '@/components/Celebration';

type View = 'home' | 'levels' | 'free' | 'celebrate';

export default function Home() {
  const { user, profile, progress, isGuest, loading, signOut } = useAuth();
  const [view, setView] = useState<View>('home');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-3">👨‍🍳</div>
          <p className="text-amber-700 font-semibold">Warming up the kitchen...</p>
        </div>
      </div>
    );
  }

  // Not signed in and not a guest → show auth screen
  if (!user && !isGuest) {
    return <AuthScreen />;
  }

  if (view === 'celebrate') {
    return <Celebration onDone={() => setView('home')} />;
  }

  if (view === 'levels') {
    return <LevelGame onExit={() => setView('home')} onGameComplete={() => setView('celebrate')} />;
  }

  if (view === 'free') {
    return <FreeCooking onExit={() => setView('home')} />;
  }

  // Home / hub
  const currentLevel = progress?.current_level ?? 1;
  const highest = progress?.highest_level_completed ?? 0;
  const perfects = progress?.perfect_levels ?? 0;
  const dishes = progress?.free_cook_dishes ?? 0;
  const name = profile?.display_name ?? 'Guest Chef';
  const avatar = profile?.avatar_emoji ?? '👀';

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{avatar}</span>
            <div>
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide">
                {isGuest ? 'Guest Mode' : 'Chef'}
              </p>
              <p className="text-lg font-extrabold text-amber-900">{name}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="px-4 py-2 rounded-xl bg-white border border-amber-200 text-amber-700 text-sm font-semibold hover:bg-amber-100 transition-all"
          >
            {isGuest ? 'Sign In' : 'Sign Out'}
          </button>
        </div>

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-7xl mb-3">👨‍🍳</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 tracking-tight">Chef Troll</h1>
          <p className="text-amber-700 mt-2">The kitchen where the Chef roasts you. Daily.</p>
        </div>

        {/* Stats (registered users only) */}
        {!isGuest && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatCard label="Current Level" value={`${currentLevel}/20`} emoji="🎯" />
            <StatCard label="Highest Cleared" value={`${highest}/20`} emoji="🏆" />
            <StatCard label="Perfect Runs" value={String(perfects)} emoji="⭐" />
            <StatCard label="Dishes Cooked" value={String(dishes)} emoji="🍳" />
          </div>
        )}

        {/* Mode cards */}
        <div className="grid md:grid-cols-2 gap-5">
          <button
            onClick={() => setView('levels')}
            className="group text-left bg-white rounded-3xl shadow-lg border border-amber-100 p-7 hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <div className="text-5xl mb-3">🎯</div>
            <h2 className="text-2xl font-extrabold text-amber-900 mb-1">Level Mode</h2>
            <p className="text-amber-600 text-sm mb-4">20 levels of increasing difficulty. Pick the right ingredients. 2 mistakes and you restart.</p>
            <span className="inline-flex items-center gap-1 text-amber-700 font-semibold text-sm group-hover:gap-2 transition-all">
              {isGuest ? 'Start from Level 1' : `Continue from Level ${currentLevel}`} →
            </span>
          </button>

          <button
            onClick={() => setView('free')}
            className="group text-left bg-white rounded-3xl shadow-lg border border-amber-100 p-7 hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <div className="text-5xl mb-3">🍳</div>
            <h2 className="text-2xl font-extrabold text-amber-900 mb-1">Free Cooking</h2>
            <p className="text-amber-600 text-sm mb-4">100+ ingredients. Mix anything. The Chef rates your dish: Perfect, Good, Not Good, Bad, or So Bad.</p>
            <span className="inline-flex items-center gap-1 text-amber-700 font-semibold text-sm group-hover:gap-2 transition-all">
              Open the Pantry →
            </span>
          </button>
        </div>

        {isGuest && (
          <p className="text-center text-amber-500 text-xs mt-8">
            You are playing as a guest. Sign up to save your progress, high scores, and resume from where you left off.
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-4 text-center">
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="text-xl font-extrabold text-amber-900">{value}</div>
      <div className="text-[10px] text-amber-500 font-semibold uppercase tracking-wide">{label}</div>
    </div>
  );
}
