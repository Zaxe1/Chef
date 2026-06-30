'use client';

import { useState, useMemo } from 'react';
import { INGREDIENTS, INGREDIENT_MAP, rateDish, RATING_TO_EVENT, DishRating } from '@/lib/gameData';
import { useChefReaction, ChefTroll } from '@/lib/chefTroll';
import { useAuth } from '@/lib/authContext';
import { supabase } from '@/lib/supabaseClient';

const CATEGORIES = ['all', 'vegetable', 'fruit', 'protein', 'grain', 'dairy', 'spice', 'sauce', 'sweet', 'other'] as const;

const RATING_STYLE: Record<DishRating, { label: string; color: string; bg: string }> = {
  perfect: { label: 'PERFECT', color: 'text-yellow-600', bg: 'from-yellow-100 to-amber-100 border-yellow-300' },
  good: { label: 'GOOD', color: 'text-green-600', bg: 'from-green-100 to-emerald-100 border-green-300' },
  not_good: { label: 'NOT GOOD', color: 'text-gray-600', bg: 'from-gray-100 to-slate-100 border-gray-300' },
  bad: { label: 'BAD', color: 'text-orange-600', bg: 'from-orange-100 to-red-100 border-orange-300' },
  so_bad: { label: 'SO BAD', color: 'text-red-600', bg: 'from-red-100 to-rose-100 border-red-300' },
};

export function FreeCooking({ onExit }: { onExit: () => void }) {
  const { user, progress, refreshProgress } = useAuth();
  const { current, mood, react, clear } = useChefReaction();
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('all');
  const [result, setResult] = useState<{ rating: DishRating; reason: string } | null>(null);

  const filtered = useMemo(
    () => (filter === 'all' ? INGREDIENTS : INGREDIENTS.filter((i) => i.category === filter)),
    [filter]
  );

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setResult(null);
    clear();
  };

  const cook = async () => {
    if (selected.length === 0) return;
    const res = rateDish(selected);
    setResult(res);
    await react(RATING_TO_EVENT[res.rating]);

    if (user) {
      await supabase
        .from('game_progress')
        .update({ free_cook_dishes: (progress?.free_cook_dishes ?? 0) + 1, updated_at: new Date().toISOString() })
        .eq('user_id', user.id);
      await refreshProgress();
    }
  };

  const reset = () => {
    setSelected([]);
    setResult(null);
    clear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onExit} className="text-amber-700 hover:text-amber-900 font-semibold text-sm">
            ← Back
          </button>
          <div className="px-4 py-2 rounded-full bg-white border border-amber-200 shadow-sm">
            <span className="text-xs font-bold text-amber-800">🍳 FREE COOKING MODE</span>
          </div>
        </div>

        {/* Chef */}
        <div className="flex justify-center mb-6">
          <ChefTroll mood={mood} reaction={current} />
        </div>

        {/* Pot / selected tray */}
        <div className="bg-white rounded-3xl shadow-lg border border-amber-100 p-5 mb-6 min-h-[120px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-amber-900 text-sm">Your Pot 🥘</h3>
            <span className="text-xs text-amber-600">{selected.length} ingredients</span>
          </div>
          {selected.length === 0 ? (
            <p className="text-amber-400 text-sm italic text-center py-4">Throw some ingredients in the pot...</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selected.map((id) => {
                const ing = INGREDIENT_MAP[id];
                return (
                  <button
                    key={id}
                    onClick={() => toggle(id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-sm hover:bg-red-100 hover:border-red-300 transition-all group"
                  >
                    <span className="text-lg">{ing.emoji}</span>
                    <span className="text-amber-800 text-xs font-medium">{ing.name}</span>
                    <span className="text-red-400 opacity-0 group-hover:opacity-100 text-xs">✕</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className={`bg-gradient-to-br ${RATING_STYLE[result.rating].bg} border-2 rounded-3xl p-6 mb-6 text-center animate-[fadeIn_0.4s]`}>
            <div className="text-4xl font-extrabold ${RATING_STYLE[result.rating].color} mb-1" style={{ color: undefined }}>
              <span className={RATING_STYLE[result.rating].color}>{RATING_STYLE[result.rating].label}</span>
            </div>
            <p className="text-amber-800 text-sm">{result.reason}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={cook}
            disabled={selected.length === 0}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cook It! 🍳
          </button>
          <button
            onClick={reset}
            className="px-6 py-4 rounded-2xl bg-white border-2 border-amber-200 text-amber-700 font-bold hover:bg-amber-50 transition-all"
          >
            Clear 🗑️
          </button>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                filter === c ? 'bg-amber-500 text-white shadow' : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Ingredient pantry */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
          {filtered.map((ing) => {
            const isSel = selected.includes(ing.id);
            return (
              <button
                key={ing.id}
                onClick={() => toggle(ing.id)}
                className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-0.5 transition-all hover:scale-105 active:scale-95 ${
                  isSel ? 'border-amber-500 bg-amber-100 shadow-md scale-105' : 'border-amber-100 bg-white hover:border-amber-300'
                }`}
              >
                <span className="text-2xl md:text-3xl">{ing.emoji}</span>
                <span className="text-[9px] md:text-[10px] font-medium text-amber-800 text-center px-0.5 leading-tight">{ing.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
