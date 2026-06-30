/*
# Chef Troll — Core Game Schema

## Overview
Creates the persistence layer for the Chef Troll game: user profiles, per-level
game progress, high scores, and a shared library of Chef reactions (witty text +
emoji/sticker) keyed by event type. Designed for a multi-user app with Supabase
Auth (email/password). Guest users play without writing to the database.

## 1. New Tables

### user_profile
- `id` (uuid, PK) — mirrors auth.users.id; one row per registered user.
- `display_name` (text) — player's chosen name shown in the UI.
- `avatar_emoji` (text) — emoji avatar for the player.
- `is_guest` (boolean, default false) — reserved for future guest tracking.
- `created_at` / `updated_at` (timestamptz) — audit timestamps.

### game_progress
- `id` (uuid, PK)
- `user_id` (uuid, NOT NULL, DEFAULT auth.uid()) — owner; FK to auth.users, cascade on delete.
- `current_level` (int, default 1) — the level the player will resume at (1..20).
- `highest_level_completed` (int, default 0) — furthest level ever cleared.
- `total_mistakes` (int, default 0) — lifetime mistake counter for stats.
- `perfect_levels` (int, default 0) — count of levels cleared with zero mistakes.
- `free_cook_dishes` (int, default 0) — number of dishes created in Free Cooking.
- `updated_at` (timestamptz) — last progress write.
- Unique constraint on user_id (one progress row per user).

### high_scores
- `id` (uuid, PK)
- `user_id` (uuid, NOT NULL, DEFAULT auth.uid()) — owner; FK to auth.users, cascade on delete.
- `level` (int, NOT NULL) — which level the score is for (1..20).
- `score` (int, NOT NULL) — points earned (higher = better, fewer mistakes = more points).
- `mistakes` (int, NOT NULL default 0) — mistakes made on that level run.
- `perfect` (boolean, default false) — whether the run was mistake-free.
- `created_at` (timestamptz) — when the score was recorded.
- Index on (user_id, level) for leaderboard queries.

### chef_reactions (shared reference data, public read)
- `id` (uuid, PK)
- `event_type` (text, NOT NULL) — category: 'praise_perfect', 'praise_good',
  'mock_wrong', 'mock_fail', 'level_complete', 'game_complete', 'free_good',
  'free_not_good', 'free_bad', 'free_so_bad', 'free_perfect'.
- `message` (text, NOT NULL) — the witty/sarcastic line the Chef says.
- `emoji` (text, NOT NULL) — the sticker/emoji the Chef shows.
- Index on event_type for quick lookup.

## 2. Security (RLS)
- user_profile: owner-scoped CRUD (authenticated). A user only sees/edits their own profile.
- game_progress: owner-scoped CRUD (authenticated). One row per user.
- high_scores: owner-scoped insert/update/delete; SELECT is authenticated-only.
- chef_reactions: public read (anon + authenticated) so guests also get Chef feedback;
  writes are authenticated-only and in practice done via SQL/migration, not the client.

## 3. Important Notes
1. `user_id` columns default to `auth.uid()` so client inserts that omit user_id succeed.
2. All owner-scoped tables use 4 separate policies (SELECT/INSERT/UPDATE/DELETE), never FOR ALL.
3. chef_reactions is intentionally public-read because guests need Chef feedback too.
4. Email confirmation stays OFF (default) so sign-up logs the user in immediately.
*/

-- ---------- user_profile ----------
CREATE TABLE IF NOT EXISTS user_profile (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'Chef Wannabe',
  avatar_emoji text NOT NULL DEFAULT '👨‍🍳',
  is_guest boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_profile ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON user_profile;
CREATE POLICY "select_own_profile" ON user_profile FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON user_profile;
CREATE POLICY "insert_own_profile" ON user_profile FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON user_profile;
CREATE POLICY "update_own_profile" ON user_profile FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON user_profile;
CREATE POLICY "delete_own_profile" ON user_profile FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- ---------- game_progress ----------
CREATE TABLE IF NOT EXISTS game_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  current_level int NOT NULL DEFAULT 1 CHECK (current_level BETWEEN 1 AND 20),
  highest_level_completed int NOT NULL DEFAULT 0 CHECK (highest_level_completed BETWEEN 0 AND 20),
  total_mistakes int NOT NULL DEFAULT 0,
  perfect_levels int NOT NULL DEFAULT 0,
  free_cook_dishes int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_progress" ON game_progress;
CREATE POLICY "select_own_progress" ON game_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_progress" ON game_progress;
CREATE POLICY "insert_own_progress" ON game_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_progress" ON game_progress;
CREATE POLICY "update_own_progress" ON game_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_progress" ON game_progress;
CREATE POLICY "delete_own_progress" ON game_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ---------- high_scores ----------
CREATE TABLE IF NOT EXISTS high_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  level int NOT NULL CHECK (level BETWEEN 1 AND 20),
  score int NOT NULL,
  mistakes int NOT NULL DEFAULT 0,
  perfect boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_high_scores_user_level ON high_scores (user_id, level);

ALTER TABLE high_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_scores" ON high_scores;
CREATE POLICY "select_own_scores" ON high_scores FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_scores" ON high_scores;
CREATE POLICY "insert_own_scores" ON high_scores FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_scores" ON high_scores;
CREATE POLICY "update_own_scores" ON high_scores FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_scores" ON high_scores;
CREATE POLICY "delete_own_scores" ON high_scores FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- ---------- chef_reactions (shared reference, public read) ----------
CREATE TABLE IF NOT EXISTS chef_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  message text NOT NULL,
  emoji text NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_chef_reactions_event ON chef_reactions (event_type);

ALTER TABLE chef_reactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_chef_reactions" ON chef_reactions;
CREATE POLICY "read_chef_reactions" ON chef_reactions FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "write_chef_reactions" ON chef_reactions;
CREATE POLICY "write_chef_reactions" ON chef_reactions FOR INSERT
  TO authenticated WITH CHECK (true);

-- ---------- seed chef_reactions ----------
INSERT INTO chef_reactions (event_type, message, emoji) VALUES
('praise_perfect', 'You should be the boss! Flawless. I am almost proud.', '🤩'),
('praise_perfect', 'Not a single mistake?! Who hired you? You are dangerous.', '😎'),
('praise_perfect', 'Perfect run. I will not mock you this time. Enjoy it.', '👏'),
('praise_good', 'You survived. Barely. But I will allow it.', '🙂'),
('praise_good', 'One mistake. Acceptable. Do not make it a habit.', '🤨'),
('mock_wrong', 'Wrong! Did you learn to cook from a microwave manual?', '🤦'),
('mock_wrong', 'That is NOT an ingredient. That is a crime.', '😡'),
('mock_wrong', 'Nope. My cat would cook better than you.', '😾'),
('mock_wrong', 'Wrong! Are you trying to poison someone?', '🤢'),
('mock_fail', 'TWO mistakes! Restarting. Try using your eyes this time.', '💀'),
('mock_fail', 'You failed. The kitchen weeps. Start over, clown.', '🤡'),
('mock_fail', 'Back to the start. I have seen potatoes with more skill.', '🥔'),
('level_complete', 'Level done. Do not let it get to your head.', '🎉'),
('level_complete', 'Cleared! Onwards, apprentice. Try not to cry.', '✨'),
('game_complete', 'You beat all 20 levels. I have nothing left to teach you. Chef.', '👑'),
('game_complete', 'The kitchen is yours, Master Chef. Now leave my sight.', '🏆'),
('free_perfect', 'PERFECT! A masterpiece. I am speechless. Almost.', '🌟'),
('free_good', 'Good dish. Edible. I will not throw it at you.', '😋'),
('free_not_good', 'Not good. Not terrible. Just... why?', '😐'),
('free_bad', 'Bad. The bin rejected it. So did I.', '🤮'),
('free_so_bad', 'SO BAD. I am calling the police. On you. For cooking.', '🚓')
ON CONFLICT DO NOTHING;
