'use client';

import { useState, useEffect } from 'react';
import { useChefReaction, ChefTroll } from '@/lib/chefTroll';

const CONFETTI = ['🎉', '👑', '🏆', '✨', '🥳', '⭐', '🎊', '🔥'];
const MESSAGES = [
  'You beat all 20 levels!',
  'The kitchen is YOURS now, Master Chef.',
  'I have nothing left to teach you.',
  'Now leave my sight. Go. Be great.',
];

export function Celebration({ onDone }: { onDone: () => void }) {
  const { current, mood, react } = useChefReaction();
  const [msgIdx, setMsgIdx] = useState(0);
  const [pieces, setPieces] = useState<{ id: number; left: number; delay: number; emoji: string; duration: number }[]>([]);

  useEffect(() => {
    react('game_complete', 'celebrate');
    const generated = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      emoji: CONFETTI[Math.floor(Math.random() * CONFETTI.length)],
      duration: 3 + Math.random() * 3,
    }));
    setPieces(generated);
    const interval = setInterval(() => setMsgIdx((i) => (i + 1) % MESSAGES.length), 2500);
    return () => clearInterval(interval);
  }, [react]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-yellow-900 via-amber-800 to-orange-900 flex flex-col items-center justify-center">
      {/* Confetti */}
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute text-4xl animate-[fall_5s_linear_infinite]"
          style={{
            left: `${p.left}%`,
            top: '-50px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,0,0.2),transparent_60%)]" />

      <div className="relative z-10 text-center px-6">
        <div className="text-8xl mb-4 animate-bounce">👑</div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-300 mb-3 tracking-tight drop-shadow-lg">
          MASTER CHEF
        </h1>
        <p className="text-xl text-amber-100 mb-8 min-h-[2em] transition-all animate-[fadeIn_0.5s]">
          {MESSAGES[msgIdx]}
        </p>

        <div className="mb-8">
          <ChefTroll mood={mood} reaction={current} />
        </div>

        <button
          onClick={onDone}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 font-extrabold text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          Return to Kitchen 🍳
        </button>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
