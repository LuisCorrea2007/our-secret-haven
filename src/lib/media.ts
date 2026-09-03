import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const MEDIA_BUCKET = "media";

/** Crea (y cachea) una URL firmada para un archivo privado del espacio. */
export function useSignedUrl(path?: string | null, expiresIn = 3600) {
  return useQuery({
    queryKey: ["signed-url", path],
    enabled: !!path,
    staleTime: (expiresIn - 300) * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from(MEDIA_BUCKET)
        .createSignedUrl(path!, expiresIn);
      if (error) throw error;
      return data.signedUrl;
    },
  });
}

export async function signedUrl(path: string, expiresIn = 3600) {
  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .createSignedUrl(path, expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_BYTES = 25 * 1024 * 1024;

export function validateImage(file: File) {
  if (!IMAGE_TYPES.includes(file.type)) return "Formato no permitido (usa JPG, PNG, WEBP o GIF)";
  if (file.size > MAX_BYTES) return "La imagen supera los 25 MB";
  return null;
}

/** Comprime y redimensiona en el navegador antes de subir. */
export async function compressImage(file: File, maxSize = 2000, quality = 0.85): Promise<Blob> {
  if (typeof window === "undefined" || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", quality),
    );
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

export async function imageSize(file: File): Promise<{ width: number; height: number } | null> {
  try {
    const bitmap = await createImageBitmap(file);
    return { width: bitmap.width, height: bitmap.height };
  } catch {
    return null;
  }
}

export async function uploadMedia(folder: string, userId: string, file: File | Blob, ext: string) {
  const path = `${folder}/${userId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}
