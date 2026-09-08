ALTER TABLE public.note_attachments
  ADD COLUMN IF NOT EXISTS attachment_type text NOT NULL DEFAULT 'image',
  ADD COLUMN IF NOT EXISTS url text;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS countdown_enabled boolean NOT NULL DEFAULT true;

CREATE TABLE IF NOT EXISTS public.fun_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL DEFAULT 'chiste',
  content text NOT NULL,
  answer text,
  options text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.fun_items TO authenticated;
GRANT ALL ON public.fun_items TO service_role;
ALTER TABLE public.fun_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fun_items_select" ON public.fun_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "fun_items_insert" ON public.fun_items FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "fun_items_update" ON public.fun_items FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "fun_items_delete" ON public.fun_items FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.videos_diarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  titulo text NOT NULL,
  descripcion text,
  file_path text NOT NULL,
  file_type text,
  file_size bigint,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.videos_diarios TO authenticated;
GRANT ALL ON public.videos_diarios TO service_role;
ALTER TABLE public.videos_diarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "videos_select" ON public.videos_diarios FOR SELECT TO authenticated USING (true);
CREATE POLICY "videos_insert" ON public.videos_diarios FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "videos_update" ON public.videos_diarios FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "videos_delete" ON public.videos_diarios FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.video_comentarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid NOT NULL REFERENCES public.videos_diarios(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contenido text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.video_comentarios TO authenticated;
GRANT ALL ON public.video_comentarios TO service_role;
ALTER TABLE public.video_comentarios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "video_com_select" ON public.video_comentarios FOR SELECT TO authenticated USING (true);
CREATE POLICY "video_com_insert" ON public.video_comentarios FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "video_com_delete" ON public.video_comentarios FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_fun_items_updated_at BEFORE UPDATE ON public.fun_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_videos_diarios_updated_at BEFORE UPDATE ON public.videos_diarios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();