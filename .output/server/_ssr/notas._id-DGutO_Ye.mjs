import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as useAuth } from "./use-auth-D4BEwepl.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as useProfiles } from "./use-profiles-BknMowmB.mjs";
import { i as useSignedUrl } from "./media-Bzxwhsl7.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as ArrowLeft, L as ArchiveRestore, S as FileText, i as Trash2, m as Mic, s as Star, w as Download } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as REACTIONS, r as NOTE_CATEGORIES, s as labelFor } from "./content-CYZhG7kI.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { t as Skeleton } from "./skeleton-wE5XVTSu.mjs";
import { t as Route } from "./notas._id-BPNG7z7S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notas._id-DGutO_Ye.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AttachmentItem({ attachment, canDelete, onDelete }) {
	const { data: url } = useSignedUrl(attachment.file_path);
	const formatSize = (bytes) => {
		if (!bytes) return "";
		const sizes = [
			"B",
			"KB",
			"MB",
			"GB"
		];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
	};
	const handleDownload = async () => {
		if (!url) return;
		const a = document.createElement("a");
		a.href = url;
		a.download = attachment.file_path.split("/").pop() || "archivo";
		a.click();
	};
	if (attachment.attachment_type === "audio") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface flex items-center gap-3 p-3 rounded-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-10 items-center justify-center rounded-full bg-primary/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-5 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium truncate",
					children: "Nota de voz"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: formatSize(attachment.file_size)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				src: url,
				controls: true,
				className: "h-8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: handleDownload,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
			}),
			canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: onDelete,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
			})
		]
	});
	if (attachment.attachment_type === "pdf") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface flex items-center gap-3 p-3 rounded-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-10 items-center justify-center rounded-full bg-red-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5 text-red-600" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium truncate",
					children: "Documento PDF"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: formatSize(attachment.file_size)
				})]
			}),
			url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				src: `${url}#toolbar=0`,
				className: "w-24 h-12 border rounded",
				title: "PDF preview"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: handleDownload,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1 size-4" }), " Descargar"]
			}),
			canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				onClick: onDelete,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
			})
		]
	});
	return null;
}
function NoteDetail() {
	const { id } = Route.useParams();
	const { user } = useAuth();
	const qc = useQueryClient();
	const navigate = useNavigate();
	const { data: profiles } = useProfiles();
	const [reply, setReply] = (0, import_react.useState)("");
	const nameOf = (uid) => profiles?.find((p) => p.id === uid)?.name ?? "Alguien";
	const { data: note, isLoading } = useQuery({
		queryKey: ["note", id],
		queryFn: async () => {
			const { data, error } = await supabase.from("notes").select("*").eq("id", id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: replies } = useQuery({
		queryKey: ["note-replies", id],
		queryFn: async () => {
			const { data, error } = await supabase.from("note_replies").select("id, content, user_id, created_at").eq("note_id", id).order("created_at");
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: reactions } = useQuery({
		queryKey: ["note-reactions", id],
		queryFn: async () => {
			const { data, error } = await supabase.from("note_reactions").select("id, reaction_type, user_id").eq("note_id", id);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: attachments } = useQuery({
		queryKey: ["note-attachments", id],
		queryFn: async () => {
			const { data, error } = await supabase.from("note_attachments").select("id, file_path, file_type, file_size, attachment_type, created_at").eq("note_id", id).order("created_at");
			if (error) throw error;
			return data ?? [];
		}
	});
	const addReply = useMutation({
		mutationFn: async () => {
			if (!user || !reply.trim()) throw new Error("Escribe algo primero");
			const { error } = await supabase.from("note_replies").insert({
				note_id: id,
				user_id: user.id,
				content: reply.trim().slice(0, 4e3)
			});
			if (error) throw error;
			const other = profiles?.find((p) => p.id !== user.id);
			if (other && note) await supabase.from("notifications").insert({
				user_id: other.id,
				type: "respuesta",
				title: "Respondieron tu nota",
				message: note.title
			});
		},
		onSuccess: () => {
			setReply("");
			qc.invalidateQueries({ queryKey: ["note-replies", id] });
		},
		onError: (e) => toast.error(e.message)
	});
	const toggleReaction = useMutation({
		mutationFn: async (type) => {
			if (!user) return;
			const mine = reactions?.find((r) => r.user_id === user.id && r.reaction_type === type);
			if (mine) await supabase.from("note_reactions").delete().eq("id", mine.id);
			else await supabase.from("note_reactions").insert({
				note_id: id,
				user_id: user.id,
				reaction_type: type
			});
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["note-reactions", id] })
	});
	const update = useMutation({
		mutationFn: async (patch) => {
			const { error } = await supabase.from("notes").update(patch).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["note", id] });
			qc.invalidateQueries({ queryKey: ["notes"] });
		}
	});
	const remove = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("notes").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Nota eliminada");
			qc.invalidateQueries({ queryKey: ["notes"] });
			navigate({ to: "/notas" });
		},
		onError: () => toast.error("Solo quien escribió la nota puede eliminarla")
	});
	const uploadAttachment = useMutation({
		mutationFn: async (file) => {
			if (!user) throw new Error("Sin sesión");
			const ext = file.name.split(".").pop() || "file";
			const filePath = `${user.id}/${crypto.randomUUID()}.${ext}`;
			let attachmentType = "image";
			if (file.type.startsWith("audio/")) attachmentType = "audio";
			else if (file.type === "application/pdf") attachmentType = "pdf";
			else if (file.type.startsWith("image/")) attachmentType = "image";
			const { error: uploadError } = await supabase.storage.from("media").upload(filePath, file, { upsert: true });
			if (uploadError) throw uploadError;
			const { error: dbError } = await supabase.from("note_attachments").insert({
				note_id: id,
				user_id: user.id,
				file_path: filePath,
				file_type: file.type,
				file_size: file.size,
				attachment_type: attachmentType
			});
			if (dbError) throw dbError;
		},
		onSuccess: () => {
			toast.success("Archivo adjuntado");
			qc.invalidateQueries({ queryKey: ["note-attachments", id] });
		},
		onError: (e) => toast.error(e.message)
	});
	const deleteAttachment = useMutation({
		mutationFn: async (attachmentId) => {
			const { error } = await supabase.from("note_attachments").delete().eq("id", attachmentId);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Archivo eliminado");
			qc.invalidateQueries({ queryKey: ["note-attachments", id] });
		}
	});
	const fileInputRef = (0, import_react.useRef)(null);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 rounded-2xl" });
	if (!note) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface p-12 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl",
			children: "Esta nota ya no existe"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			className: "mt-4 rounded-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/notas",
				children: "Volver a las notas"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/notas",
				className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Notas"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "surface animate-fade-up p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							children: labelFor(NOTE_CATEGORIES, note.category)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								nameOf(note.user_id),
								" ·",
								" ",
								new Date(note.created_at).toLocaleDateString("es", {
									day: "numeric",
									month: "long",
									year: "numeric"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-3xl font-semibold",
						children: note.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90",
						children: note.content
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: "Adjuntos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileInputRef,
									type: "file",
									accept: "audio/*,application/pdf,image/*",
									className: "hidden",
									onChange: (e) => {
										const file = e.target.files?.[0];
										if (file) uploadAttachment.mutate(file);
										e.target.value = "";
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "rounded-full",
									onClick: () => fileInputRef.current?.click(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "mr-1 size-4" }), "Agregar audio/PDF"]
								})
							]
						}), attachments && attachments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: attachments.map((att) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttachmentItem, {
								attachment: att,
								canDelete: att.user_id === user?.id,
								onDelete: () => deleteAttachment.mutate(att.id)
							}, att.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Sin adjuntos todavía"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center gap-2",
						children: [REACTIONS.map((r) => {
							const count = reactions?.filter((x) => x.reaction_type === r.type).length ?? 0;
							const mine = reactions?.some((x) => x.reaction_type === r.type && x.user_id === user?.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => toggleReaction.mutate(r.type),
								"aria-label": r.label,
								className: `rounded-full border px-3 py-1 text-sm transition-transform hover:scale-105 ${mine ? "border-primary bg-primary/10" : "border-border"}`,
								children: [
									r.emoji,
									" ",
									count > 0 && count
								]
							}, r.type);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Favorita",
									onClick: () => update.mutate({ is_favorite: !note.is_favorite }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: note.is_favorite ? "size-4 fill-primary text-primary" : "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Archivar",
									onClick: () => update.mutate({ is_archived: !note.is_archived }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, { className: "size-4" })
								}),
								note.user_id === user?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Eliminar",
									onClick: () => remove.mutate(),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Respuestas"
					}),
					replies?.length ? replies.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								nameOf(r.user_id),
								" ·",
								" ",
								new Date(r.created_at).toLocaleString("es", {
									day: "numeric",
									month: "short",
									hour: "2-digit",
									minute: "2-digit"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 whitespace-pre-wrap text-sm",
							children: r.content
						})]
					}, r.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Todavía no hay respuestas."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 3,
							maxLength: 4e3,
							value: reply,
							onChange: (e) => setReply(e.target.value),
							placeholder: "Escribe tu respuesta…"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3 rounded-full",
							onClick: () => addReply.mutate(),
							disabled: addReply.isPending,
							children: "Responder"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { NoteDetail as component };
