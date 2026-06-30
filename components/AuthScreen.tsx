'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/authContext';

export function AuthScreen() {
  const { signIn, signUp, playAsGuest } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    if (mode === 'signup' && !displayName.trim()) {
      setError('Pick a chef name.');
      setBusy(false);
      return;
    }
    const { error } = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password, displayName.trim());
    if (error) setError(error);
    setBusy(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-7xl mb-3 animate-bounce">👨‍🍳</div>
          <h1 className="text-4xl font-extrabold text-amber-900 tracking-tight">Chef Troll</h1>
          <p className="text-amber-700 mt-2 text-sm">The kitchen where the Chef roasts you. Daily.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-amber-100 p-8">
          <div className="flex gap-2 mb-6 p-1 bg-amber-50 rounded-xl">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'signin' ? 'bg-white text-amber-900 shadow' : 'text-amber-600'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'signup' ? 'bg-white text-amber-900 shadow' : 'text-amber-600'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-amber-800 mb-1.5">Chef Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Master Chef"
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-amber-900"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-amber-800 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@kitchen.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-amber-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-amber-800 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-amber-900"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? 'Cooking...' : mode === 'signin' ? 'Enter the Kitchen' : 'Start Cooking'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-amber-100">
            <button
              onClick={playAsGuest}
              className="w-full py-3 rounded-xl bg-amber-50 text-amber-700 font-semibold hover:bg-amber-100 transition-all"
            >
              👀 Play as Guest (no saving)
            </button>
            <p className="text-center text-xs text-amber-500 mt-2">Guests play without saving progress or scores.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
