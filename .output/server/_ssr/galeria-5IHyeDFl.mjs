import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as useAuth } from "./use-auth-D4BEwepl.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as validateImage, i as useSignedUrl, n as imageSize, r as uploadMedia, t as compressImage } from "./media-Bzxwhsl7.mjs";
import { n as Label, t as Input } from "./label-CmIE8x5o.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as ChevronLeft, b as Images, i as Trash2, k as ChevronRight, r as Upload, s as Star, t as X } from "../_libs/lucide-react.mjs";
import { t as Skeleton } from "./skeleton-wE5XVTSu.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-DFjnKMNx.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/galeria-5IHyeDFl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Tile({ photo, onOpen }) {
	const { data: url } = useSignedUrl(photo.file_path);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: onOpen,
		className: "group relative mb-3 block w-full overflow-hidden rounded-xl bg-muted",
		children: [url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt: photo.caption ?? "Recuerdo compartido",
			loading: "lazy",
			className: "w-full object-cover transition-transform duration-500 group-hover:scale-105"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-52 w-full" }), photo.is_favorite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "absolute right-2 top-2 size-4 fill-primary text-primary drop-shadow" })]
	});
}
function Lightbox({ photos, index, onClose, onMove, onFavorite, onDelete, canDelete }) {
	const photo = photos[index];
	const { data: url } = useSignedUrl(photo.file_path);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4",
		onKeyDown: (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") onMove(1);
			if (e.key === "ArrowLeft") onMove(-1);
		},
		tabIndex: -1,
		ref: (el) => el?.focus(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "absolute right-4 top-4 text-background",
				onClick: onClose,
				"aria-label": "Cerrar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "absolute left-3 text-background",
				onClick: () => onMove(-1),
				"aria-label": "Anterior",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-full max-w-3xl text-center",
				children: [
					url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: url,
						alt: photo.caption ?? "Recuerdo",
						className: "mx-auto max-h-[75vh] rounded-xl object-contain"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-background/90",
						children: photo.caption
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "sm",
							className: "rounded-full",
							onClick: onFavorite,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: photo.is_favorite ? "mr-1 size-4 fill-primary text-primary" : "mr-1 size-4" }), "Favorita"]
						}), canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "secondary",
							size: "sm",
							className: "rounded-full",
							onClick: onDelete,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 size-4" }), " Eliminar"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "absolute right-3 text-background",
				onClick: () => onMove(1),
				"aria-label": "Siguiente",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
			})
		]
	});
}
function GalleryPage() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const [album, setAlbum] = (0, import_react.useState)("todos");
	const [onlyFav, setOnlyFav] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	const [albumOpen, setAlbumOpen] = (0, import_react.useState)(false);
	const [albumName, setAlbumName] = (0, import_react.useState)("");
	const { data: albums } = useQuery({
		queryKey: ["albums"],
		queryFn: async () => {
			const { data, error } = await supabase.from("albums").select("id, name").order("name");
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: photos, isLoading } = useQuery({
		queryKey: ["photos"],
		queryFn: async () => {
			const { data, error } = await supabase.from("photos").select("id, file_path, caption, is_favorite, album_id, user_id, created_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const visible = (photos ?? []).filter((p) => (album === "todos" || p.album_id === album) && (!onlyFav || p.is_favorite));
	async function handleFiles(files) {
		if (!files?.length || !user) return;
		setUploading(true);
		let ok = 0;
		for (const file of Array.from(files)) {
			const invalid = validateImage(file);
			if (invalid) {
				toast.error(`${file.name}: ${invalid}`);
				continue;
			}
			try {
				const size = await imageSize(file);
				const blob = await compressImage(file);
				const ext = blob.type === "image/webp" ? "webp" : file.name.split(".").pop() || "jpg";
				const path = await uploadMedia("photos", user.id, blob, ext);
				const { error } = await supabase.from("photos").insert({
					user_id: user.id,
					file_path: path,
					album_id: album === "todos" ? null : album,
					width: size?.width ?? null,
					height: size?.height ?? null,
					file_size: blob.size
				});
				if (error) throw error;
				ok++;
			} catch {
				toast.error(`No pudimos subir ${file.name}`);
			}
		}
		setUploading(false);
		if (ok) {
			toast.success(`${ok} ${ok === 1 ? "foto subida" : "fotos subidas"}`);
			qc.invalidateQueries({ queryKey: ["photos"] });
		}
	}
	const createAlbum = useMutation({
		mutationFn: async () => {
			if (!user || !albumName.trim()) throw new Error("Ponle un nombre al álbum");
			const { error } = await supabase.from("albums").insert({
				user_id: user.id,
				name: albumName.trim().slice(0, 80)
			});
			if (error) throw error;
		},
		onSuccess: () => {
			setAlbumName("");
			setAlbumOpen(false);
			qc.invalidateQueries({ queryKey: ["albums"] });
			toast.success("Álbum creado");
		},
		onError: (e) => toast.error(e.message)
	});
	async function toggleFavorite(p) {
		await supabase.from("photos").update({ is_favorite: !p.is_favorite }).eq("id", p.id);
		qc.invalidateQueries({ queryKey: ["photos"] });
	}
	async function removePhoto(p) {
		const { error } = await supabase.from("photos").delete().eq("id", p.id);
		if (error) {
			toast.error("Solo quien subió la foto puede eliminarla");
			return;
		}
		await supabase.storage.from("media").remove([p.file_path]);
		setLightbox(null);
		qc.invalidateQueries({ queryKey: ["photos"] });
		toast.success("Foto eliminada");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: "Galería"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Cada foto, una historia de las suyas."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "rounded-full",
							onClick: () => setAlbumOpen(true),
							children: "Nuevo álbum"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "rounded-full",
							disabled: uploading,
							onClick: () => fileRef.current?.click(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-1 size-4" }),
								" ",
								uploading ? "Subiendo…" : "Subir fotos"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							multiple: true,
							className: "hidden",
							onChange: (e) => handleFiles(e.target.files)
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: album,
					onValueChange: setAlbum,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-52",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "todos",
						children: "Todos los álbumes"
					}), albums?.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: a.id,
						children: a.name
					}, a.id))] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: onlyFav ? "default" : "outline",
					className: "rounded-full",
					onClick: () => setOnlyFav((v) => !v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "mr-1 size-4" }), " Favoritas"]
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "columns-2 gap-3 sm:columns-3",
				children: [
					0,
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-3 h-48 w-full rounded-xl" }, i))
			}) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface flex flex-col items-center gap-3 p-14 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-8 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "Sin fotos todavía"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Suban esa foto que siempre se mandan por chat."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "columns-2 gap-3 sm:columns-3",
				children: visible.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					photo: p,
					onOpen: () => setLightbox(i)
				}, p.id))
			}),
			lightbox !== null && visible[lightbox] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
				photos: visible,
				index: lightbox,
				onClose: () => setLightbox(null),
				onMove: (d) => setLightbox((i) => ((i ?? 0) + d + visible.length) % visible.length),
				onFavorite: () => toggleFavorite(visible[lightbox]),
				onDelete: () => removePhoto(visible[lightbox]),
				canDelete: visible[lightbox].user_id === user?.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: albumOpen,
				onOpenChange: setAlbumOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display",
						children: "Nuevo álbum"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "album",
							children: "Nombre"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "album",
							maxLength: 80,
							value: albumName,
							onChange: (e) => setAlbumName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "rounded-full",
						onClick: () => createAlbum.mutate(),
						children: "Crear"
					}) })
				] })
			})
		]
	});
}
//#endregion
export { GalleryPage as component };
