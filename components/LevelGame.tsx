'use client';

import { useState, useMemo, useCallback } from 'react';
import { LEVELS, INGREDIENT_MAP, Level } from '@/lib/gameData';
import { useChefReaction, ChefTroll } from '@/lib/chefTroll';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabaseClient';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function LevelGame({ onExit, onGameComplete }: { onExit: () => void; onGameComplete: () => void }) {
  const { user, progress, refreshProgress } = useAuth();
  const { current, mood, react, clear } = useChefReaction();
  const startLevel = progress?.current_level ?? 1;
  const [levelIdx, setLevelIdx] = useState(startLevel - 1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [wrongPick, setWrongPick] = useState<string | null>(null);
  const [phase, setPhase] = useState<'playing' | 'complete' | 'failed'>('playing');

  const level: Level = LEVELS[levelIdx];
  const options = useMemo(() => shuffle([...level.correct, ...level.distractors]), [level]);

  const persistProgress = useCallback(async (newLevel: number, highest: number, levelMistakes: number, perfect: boolean) => {
    if (!user) return;
    const updates: Record<string, number | boolean> = {
      current_level: newLevel,
      highest_level_completed: highest,
      total_mistakes: (progress?.total_mistakes ?? 0) + levelMistakes,
    };
    if (perfect) updates.perfect_levels = (progress?.perfect_levels ?? 0) + 1;
    await supabase.from('game_progress').update({ ...updates, updated_at: new Date().toISOString() }).eq('user_id', user.id);
    const score = Math.max(10, 100 - levelMistakes * 40) * level.level;
    await supabase.from('high_scores').insert({
      user_id: user.id,
      level: level.level,
      score,
      mistakes: levelMistakes,
      perfect,
    });
    await refreshProgress();
  }, [user, progress, level, refreshProgress]);

  const toggle = (id: string) => {
    if (phase !== 'playing') return;
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    clear();
  };

  const submit = async () => {
    if (phase !== 'playing') return;
    const correctSet = new Set(level.correct);
    const wrong = [...selected].filter((id) => !correctSet.has(id));
    const missing = [...correctSet].filter((id) => !selected.has(id));

    if (wrong.length === 0 && missing.length === 0) {
      // Perfect or good completion
      const perfect = mistakes === 0;
      setPhase('complete');
      if (perfect) {
        await react('praise_perfect', 'happy');
      } else {
        await react('praise_good', 'happy');
      }
      const newHighest = Math.max(progress?.highest_level_completed ?? 0, level.level);
      const nextLevel = level.level >= 20 ? 20 : level.level + 1;
      await persistProgress(nextLevel, newHighest, mistakes, perfect);
    } else {
      // Wrong submission: count as a mistake per wrong/missing item, but cap at triggering fail
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setWrongPick(wrong[0] ?? missing[0]);
      if (newMistakes >= 2) {
        setPhase('failed');
        await react('mock_fail', 'shocked');
      } else {
        await react('mock_wrong', 'angry');
      }
      setTimeout(() => setWrongPick(null), 800);
    }
  };

  const nextLevel = () => {
    if (level.level >= 20) {
      onGameComplete();
      return;
    }
    setLevelIdx((i) => i + 1);
    setSelected(new Set());
    setMistakes(0);
    setPhase('playing');
    clear();
  };

  const restart = () => {
    setSelected(new Set());
    setMistakes(0);
    setPhase('playing');
    clear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onExit} className="text-amber-700 hover:text-amber-900 font-semibold text-sm flex items-center gap-1">
            ← Back
          </button>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-white border border-amber-200 shadow-sm">
              <span className="text-xs font-bold text-amber-800">LEVEL {level.level}/20</span>
            </div>
            <div className="flex gap-1">
              {[0, 1].map((i) => (
                <span key={i} className={`text-2xl ${i < mistakes ? 'opacity-100' : 'opacity-20'}`}>💔</span>
              ))}
            </div>
          </div>
        </div>

        {/* Recipe card */}
        <div className="bg-white rounded-3xl shadow-lg border border-amber-100 p-6 mb-6 text-center">
          <div className="text-5xl mb-2">{level.recipeEmoji}</div>
          <h2 className="text-2xl font-extrabold text-amber-900">{level.recipeName}</h2>
          <p className="text-sm text-amber-600 mt-1">Pick the {level.correct.length} correct ingredients. Avoid the traps.</p>
        </div>

        {/* Chef */}
        <div className="flex justify-center mb-6">
          <ChefTroll mood={mood} reaction={current} />
        </div>

        {/* Ingredients grid */}
        {phase === 'playing' && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-6">
              {options.map((id) => {
                const ing = INGREDIENT_MAP[id];
                const isSel = selected.has(id);
                const isWrong = wrongPick === id;
                return (
                  <button
                    key={id}
                    onClick={() => toggle(id)}
                    className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 active:scale-95 ${
                      isWrong
                        ? 'border-red-500 bg-red-100 animate-[shake_0.4s]'
                        : isSel
                        ? 'border-amber-500 bg-amber-100 shadow-md scale-105'
                        : 'border-amber-100 bg-white hover:border-amber-300'
                    }`}
                  >
                    <span className="text-3xl md:text-4xl">{ing.emoji}</span>
                    <span className="text-[10px] md:text-xs font-medium text-amber-800 text-center px-1">{ing.name}</span>
                    {isSel && <span className="absolute top-1 right-1 text-amber-500 text-sm">✓</span>}
                  </button>
                );
              })}
            </div>

            <button
              onClick={submit}
              disabled={selected.size === 0}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Serve It! 🍽️
            </button>
          </>
        )}

        {/* Complete */}
        {phase === 'complete' && (
          <div className="text-center bg-white rounded-3xl shadow-lg border border-green-200 p-8 animate-[fadeIn_0.4s]">
            <div className="text-6xl mb-3">{mistakes === 0 ? '🤩' : '🙂'}</div>
            <h3 className="text-2xl font-extrabold text-green-700 mb-2">
              {mistakes === 0 ? 'Perfect!' : 'Level Complete!'}
            </h3>
            <p className="text-amber-700 mb-6">
              {mistakes === 0 ? 'No mistakes. The Chef is impressed.' : `${mistakes} mistake(s). The Chef is judging you.`}
            </p>
            <button
              onClick={nextLevel}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg hover:scale-105 transition-all"
            >
              {level.level >= 20 ? 'Claim Your Crown 👑' : 'Next Level →'}
            </button>
          </div>
        )}

        {/* Failed */}
        {phase === 'failed' && (
          <div className="text-center bg-white rounded-3xl shadow-lg border border-red-200 p-8 animate-[fadeIn_0.4s]">
            <div className="text-6xl mb-3">💀</div>
            <h3 className="text-2xl font-extrabold text-red-600 mb-2">Kitchen Disaster!</h3>
            <p className="text-amber-700 mb-6">2 mistakes. The Chef is furious. Restart the level.</p>
            <button
              onClick={restart}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold shadow-lg hover:scale-105 transition-all"
            >
              Try Again 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
