-- Migration for additional features: audio notes, PDF attachments, photo comments, fun section, distance tracking, ephemeral chat, daily videos

-- Add audio and document support to notes
ALTER TABLE public.note_attachments ADD COLUMN attachment_type TEXT NOT NULL DEFAULT 'image';
-- attachment_type: 'image', 'audio', 'pdf', 'link'

-- Add photo comments and reactions
CREATE TABLE public.photo_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id UUID NOT NULL REFERENCES public.photos ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photo_comments TO authenticated;
GRANT ALL ON public.photo_comments TO service_role;
ALTER TABLE public.photo_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "photo_comments_select" ON public.photo_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "photo_comments_insert" ON public.photo_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "photo_comments_delete" ON public.photo_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.photo_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_id UUID NOT NULL REFERENCES public.photos ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  reaction_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (photo_id, user_id, reaction_type)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.photo_reactions TO authenticated;
GRANT ALL ON public.photo_reactions TO service_role;
ALTER TABLE public.photo_reactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "photo_reactions_select" ON public.photo_reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "photo_reactions_insert" ON public.photo_reactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "photo_reactions_delete" ON public.photo_reactions FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Fun section: jokes, riddles, trivia, quizzes
CREATE TABLE public.fun_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  content_type TEXT NOT NULL DEFAULT 'chiste', -- 'chiste', 'adivinanza', 'trivia', 'quiz'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  correct_answer TEXT, -- for trivia/quiz
  options JSONB, -- for multiple choice: ["option1", "option2", "option3", "option4"]
  category TEXT DEFAULT 'general',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fun_content TO authenticated;
GRANT ALL ON public.fun_content TO service_role;
ALTER TABLE public.fun_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fun_content_select" ON public.fun_content FOR SELECT TO authenticated USING (true);
CREATE POLICY "fun_content_insert" ON public.fun_content FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "fun_content_update" ON public.fun_content FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "fun_content_delete" ON public.fun_content FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER fun_content_updated BEFORE UPDATE ON public.fun_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.fun_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fun_content_id UUID NOT NULL REFERENCES public.fun_content ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  response TEXT, -- user's answer
  is_correct BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (fun_content_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fun_responses TO authenticated;
GRANT ALL ON public.fun_responses TO service_role;
ALTER TABLE public.fun_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fun_responses_select" ON public.fun_responses FOR SELECT TO authenticated USING (true);
CREATE POLICY "fun_responses_insert" ON public.fun_responses FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "fun_responses_update" ON public.fun_responses FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "fun_responses_delete" ON public.fun_responses FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Distance tracking
CREATE TABLE public.user_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  accuracy FLOAT, -- in meters
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_locations TO authenticated;
GRANT ALL ON public.user_locations TO service_role;
ALTER TABLE public.user_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_locations_select" ON public.user_locations FOR SELECT TO authenticated USING (true);
CREATE POLICY "user_locations_insert" ON public.user_locations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_locations_update" ON public.user_locations FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "user_locations_delete" ON public.user_locations FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Ephemeral chat (24 hours)
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text', -- 'text', 'image', 'video', 'location'
  media_url TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.chat_messages TO authenticated;
GRANT ALL ON public.chat_messages TO service_role;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "chat_messages_select" ON public.chat_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "chat_messages_insert" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "chat_messages_delete" ON public.chat_messages FOR DELETE TO authenticated USING (auth.uid() = sender_id OR created_at < NOW() - INTERVAL '24 hours');

-- Auto-delete old messages function
CREATE OR REPLACE FUNCTION public.delete_expired_chat_messages() RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM public.chat_messages WHERE expires_at < NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cleanup_expired_chat_messages
AFTER INSERT ON public.chat_messages
EXECUTE FUNCTION public.delete_expired_chat_messages();

-- Daily videos
CREATE TABLE public.daily_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  thumbnail_path TEXT,
  duration INTEGER, -- in seconds
  file_size INTEGER,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_videos TO authenticated;
GRANT ALL ON public.daily_videos TO service_role;
ALTER TABLE public.daily_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "daily_videos_select" ON public.daily_videos FOR SELECT TO authenticated USING (true);
CREATE POLICY "daily_videos_insert" ON public.daily_videos FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "daily_videos_update" ON public.daily_videos FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "daily_videos_delete" ON public.daily_videos FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.video_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID NOT NULL REFERENCES public.daily_videos ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.video_comments TO authenticated;
GRANT ALL ON public.video_comments TO service_role;
ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "video_comments_select" ON public.video_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "video_comments_insert" ON public.video_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "video_comments_delete" ON public.video_comments FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Add countdown_enabled to events
ALTER TABLE public.events ADD COLUMN countdown_enabled BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.events ADD COLUMN google_calendar_id TEXT;

-- Add push notification tokens
CREATE TABLE public.push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'web', -- 'web', 'ios', 'android'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, token)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.push_tokens TO authenticated;
GRANT ALL ON public.push_tokens TO service_role;
ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "push_tokens_select" ON public.push_tokens FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "push_tokens_insert" ON public.push_tokens FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "push_tokens_update" ON public.push_tokens FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "push_tokens_delete" ON public.push_tokens FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER push_tokens_updated BEFORE UPDATE ON public.push_tokens FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Update notifications table to include actionable data
ALTER TABLE public.notifications ADD COLUMN action_url TEXT;
ALTER TABLE public.notifications ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_expires ON public.chat_messages(expires_at);
CREATE INDEX IF NOT EXISTS idx_daily_videos_created ON public.daily_videos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fun_content_type ON public.fun_content(content_type);
CREATE INDEX IF NOT EXISTS idx_photo_comments_photo ON public.photo_comments(photo_id);
CREATE INDEX IF NOT EXISTS idx_user_locations_user ON public.user_locations(user_id);
