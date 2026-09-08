ALTER TABLE public.notifications
  ADD COLUMN IF NOT EXISTS link text;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS latitude double precision,
  ADD COLUMN IF NOT EXISTS longitude double precision,
  ADD COLUMN IF NOT EXISTS location_updated_at timestamptz;

CREATE TABLE IF NOT EXISTS public.photo_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id uuid NOT NULL REFERENCES public.photos(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photo_comments TO authenticated;
GRANT ALL ON public.photo_comments TO service_role;
ALTER TABLE public.photo_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "photo_comments_select" ON public.photo_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "photo_comments_insert" ON public.photo_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "photo_comments_delete" ON public.photo_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.photo_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id uuid NOT NULL REFERENCES public.photos(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (photo_id, user_id, reaction_type)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photo_reactions TO authenticated;
GRANT ALL ON public.photo_reactions TO service_role;
ALTER TABLE public.photo_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "photo_reactions_select" ON public.photo_reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "photo_reactions_insert" ON public.photo_reactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "photo_reactions_delete" ON public.photo_reactions FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '24 hours'
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "chat_select" ON public.chat_messages FOR SELECT TO authenticated USING (expires_at > now());
CREATE POLICY "chat_insert" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "chat_delete" ON public.chat_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS chat_messages_expires_idx ON public.chat_messages (expires_at);

CREATE TABLE IF NOT EXISTS public.push_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_tokens TO authenticated;
GRANT ALL ON public.push_tokens TO service_role;
ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "push_tokens_select" ON public.push_tokens FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "push_tokens_insert" ON public.push_tokens FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "push_tokens_delete" ON public.push_tokens FOR DELETE TO authenticated USING (auth.uid() = user_id);