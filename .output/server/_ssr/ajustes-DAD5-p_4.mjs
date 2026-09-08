import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as useAuth } from "./use-auth-D4BEwepl.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useMyProfile } from "./use-profiles-BknMowmB.mjs";
import { a as validateImage, i as useSignedUrl, r as uploadMedia, t as compressImage } from "./media-Bzxwhsl7.mjs";
import { n as Label, t as Input } from "./label-CmIE8x5o.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-DYLv5Rbv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as LoaderCircle, r as Upload } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ajustes-DAD5-p_4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const fileRef = (0, import_react.useRef)(null);
	const { data: profile } = useMyProfile(user?.id);
	const { data: avatar } = useSignedUrl(profile?.avatar_url);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		anniversary: "",
		location: ""
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (profile) setForm({
			name: profile.name ?? "",
			anniversary: profile.anniversary_date ?? "",
			location: profile.location ?? ""
		});
	}, [profile]);
	const { data: storage } = useQuery({
		queryKey: ["storage-usage"],
		queryFn: async () => {
			const { data, error } = await supabase.from("photos").select("file_size");
			if (error) throw error;
			const bytes = (data ?? []).reduce((sum, p) => sum + (p.file_size ?? 0), 0);
			return {
				count: data?.length ?? 0,
				mb: (bytes / 1048576).toFixed(1)
			};
		}
	});
	const save = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Sin sesión");
			if (!form.name.trim()) throw new Error("Escribe un nombre");
			const { error } = await supabase.from("profiles").update({
				name: form.name.trim().slice(0, 60),
				anniversary_date: form.anniversary || null,
				location: form.location.trim().slice(0, 120) || null
			}).eq("id", user.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Guardado");
			qc.invalidateQueries({ queryKey: ["profiles"] });
		},
		onError: (e) => toast.error(e.message)
	});
	async function uploadAvatar(file) {
		if (!file || !user) return;
		const invalid = validateImage(file);
		if (invalid) {
			toast.error(invalid);
			return;
		}
		setBusy(true);
		try {
			const blob = await compressImage(file, 512, .9);
			const ext = blob.type === "image/webp" ? "webp" : file.name.split(".").pop() || "jpg";
			const path = await uploadMedia("avatars", user.id, blob, ext);
			const { error } = await supabase.from("profiles").update({ avatar_url: path }).eq("id", user.id);
			if (error) throw error;
			toast.success("Foto actualizada");
			qc.invalidateQueries({ queryKey: ["profiles"] });
		} catch {
			toast.error("No pudimos subir la foto");
		}
		setBusy(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: "Ajustes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Su perfil y los detalles del espacio."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface space-y-5 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "size-16 border",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: avatar ?? void 0,
									alt: profile?.name ?? "Perfil"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: (profile?.name ?? "?").slice(0, 2).toUpperCase() })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "rounded-full",
								disabled: busy,
								onClick: () => fileRef.current?.click(),
								children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-1 size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-1 size-4" }), "Cambiar foto"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: (e) => uploadAvatar(e.target.files?.[0])
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "pn",
							children: "Tu nombre"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "pn",
							maxLength: 60,
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "pa",
								children: "Fecha de aniversario"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "pa",
								type: "date",
								value: form.anniversary,
								onChange: (e) => setForm({
									...form,
									anniversary: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Con esta fecha calculamos el contador de días juntos."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "pl",
							children: "Ciudad"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "pl",
							maxLength: 120,
							value: form.location,
							onChange: (e) => setForm({
								...form,
								location: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "rounded-full",
						onClick: () => save.mutate(),
						disabled: save.isPending,
						children: "Guardar cambios"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Almacenamiento"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: storage ? `${storage.count} fotos · ${storage.mb} MB usados` : "Calculando…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Sus fotos son privadas: solo ustedes dos pueden verlas."
					})
				]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
