-- Tablas para sección de Diversión
CREATE TABLE IF NOT EXISTS diversion_chistes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS diversion_adivinanzas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  pregunta TEXT NOT NULL,
  respuesta TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS diversion_trivias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  pregunta TEXT NOT NULL,
  opciones TEXT[] NOT NULL,
  correcta INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tablas para Videos Diarios
CREATE TABLE IF NOT EXISTS videos_diarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS video_comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID REFERENCES videos_diarios(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Actualizar tabla de notificaciones para soportar nuevos tipos
ALTER TABLE notifications 
ADD COLUMN IF NOT EXISTS redirect_url TEXT;

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_diversion_chistes_created ON diversion_chistes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diversion_adivinanzas_created ON diversion_adivinanzas(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diversion_trivias_created ON diversion_trivias(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_diarios_created ON videos_diarios(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_video_comentarios_video ON video_comentarios(video_id);

-- Políticas de seguridad (RLS)
ALTER TABLE diversion_chistes ENABLE ROW LEVEL SECURITY;
ALTER TABLE diversion_adivinanzas ENABLE ROW LEVEL SECURITY;
ALTER TABLE diversion_trivias ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos_diarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_comentarios ENABLE ROW LEVEL SECURITY;

-- Policies para chistes
CREATE POLICY "Todos los usuarios autenticados pueden ver chistes"
  ON diversion_chistes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuarios autenticados pueden insertar chistes"
  ON diversion_chistes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies para adivinanzas
CREATE POLICY "Todos los usuarios autenticados pueden ver adivinanzas"
  ON diversion_adivinanzas FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuarios autenticados pueden insertar adivinanzas"
  ON diversion_adivinanzas FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies para trivias
CREATE POLICY "Todos los usuarios autenticados pueden ver trivias"
  ON diversion_trivias FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuarios autenticados pueden insertar trivias"
  ON diversion_trivias FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies para videos
CREATE POLICY "Todos los usuarios autenticados pueden ver videos"
  ON videos_diarios FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuarios autenticados pueden insertar videos"
  ON videos_diarios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies para comentarios de videos
CREATE POLICY "Todos los usuarios autenticados pueden ver comentarios"
  ON video_comentarios FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuarios autenticados pueden insertar comentarios"
  ON video_comentarios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
