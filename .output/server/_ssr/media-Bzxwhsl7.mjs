import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-Bzxwhsl7.js
var MEDIA_BUCKET = "media";
/** Crea (y cachea) una URL firmada para un archivo privado del espacio. */
function useSignedUrl(path, expiresIn = 3600) {
	return useQuery({
		queryKey: ["signed-url", path],
		enabled: !!path,
		staleTime: (expiresIn - 300) * 1e3,
		queryFn: async () => {
			const { data, error } = await supabase.storage.from(MEDIA_BUCKET).createSignedUrl(path, expiresIn);
			if (error) throw error;
			return data.signedUrl;
		}
	});
}
var IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
	"image/avif"
];
var MAX_BYTES = 26214400;
function validateImage(file) {
	if (!IMAGE_TYPES.includes(file.type)) return "Formato no permitido (usa JPG, PNG, WEBP o GIF)";
	if (file.size > MAX_BYTES) return "La imagen supera los 25 MB";
	return null;
}
/** Comprime y redimensiona en el navegador antes de subir. */
async function compressImage(file, maxSize = 2e3, quality = .85) {
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
		const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
		return blob && blob.size < file.size ? blob : file;
	} catch {
		return file;
	}
}
async function imageSize(file) {
	try {
		const bitmap = await createImageBitmap(file);
		return {
			width: bitmap.width,
			height: bitmap.height
		};
	} catch {
		return null;
	}
}
async function uploadMedia(folder, userId, file, ext) {
	const path = `${folder}/${userId}/${crypto.randomUUID()}.${ext}`;
	const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
		cacheControl: "3600",
		upsert: false
	});
	if (error) throw error;
	return path;
}
//#endregion
export { validateImage as a, useSignedUrl as i, imageSize as n, uploadMedia as r, compressImage as t };
