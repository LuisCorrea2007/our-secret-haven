import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as useAuth } from "./use-auth-D4BEwepl.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useProfiles, t as anniversaryOf } from "./use-profiles-BknMowmB.mjs";
import { i as useSignedUrl } from "./media-Bzxwhsl7.mjs";
import { N as CalendarHeart, b as Images, c as Sparkles, f as NotebookPen, n as Video, x as Heart, y as Laugh } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ROMANTIC_QUOTES, c as pickOfTheDay, t as DAILY_QUESTIONS } from "./content-CYZhG7kI.mjs";
import { t as Skeleton } from "./skeleton-wE5XVTSu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/panel-62bC0Yku.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useElapsed(since) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setNow(Date.now()), 1e3);
		return () => clearInterval(id);
	}, []);
	if (!since) return null;
	const start = (/* @__PURE__ */ new Date(`${since}T00:00:00`)).getTime();
	const diff = Math.max(0, now - start);
	return {
		dias: Math.floor(diff / 864e5),
		horas: Math.floor(diff / 36e5) % 24,
		minutos: Math.floor(diff / 6e4) % 60,
		segundos: Math.floor(diff / 1e3) % 60
	};
}
function PhotoTile({ path, caption }) {
	const { data: url } = useSignedUrl(path);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "aspect-square overflow-hidden rounded-xl bg-muted",
		children: url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: url,
			alt: caption ?? "Recuerdo",
			loading: "lazy",
			className: "size-full object-cover transition-transform duration-500 hover:scale-105"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-full" })
	});
}
function Panel() {
	const { user } = useAuth();
	const { data: profiles } = useProfiles();
	const elapsed = useElapsed(anniversaryOf(profiles));
	const quote = pickOfTheDay(ROMANTIC_QUOTES);
	const question = pickOfTheDay(DAILY_QUESTIONS, 3);
	const { data: notes } = useQuery({
		queryKey: ["notes", "recent"],
		queryFn: async () => {
			const { data, error } = await supabase.from("notes").select("id, title, category, created_at, user_id").eq("is_archived", false).order("created_at", { ascending: false }).limit(4);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: photos } = useQuery({
		queryKey: ["photos", "recent"],
		queryFn: async () => {
			const { data, error } = await supabase.from("photos").select("id, file_path, caption").order("created_at", { ascending: false }).limit(4);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: events } = useQuery({
		queryKey: ["events", "upcoming"],
		queryFn: async () => {
			const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			const { data, error } = await supabase.from("events").select("id, title, date, time, location, category").gte("date", today).order("date").limit(4);
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: stats } = useQuery({
		queryKey: ["stats"],
		queryFn: async () => {
			const [n, p, e, w] = await Promise.all([
				supabase.from("notes").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("photos").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("events").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("wishes").select("id", {
					count: "exact",
					head: true
				})
			]);
			return {
				notas: n.count ?? 0,
				fotos: p.count ?? 0,
				citas: e.count ?? 0,
				deseos: w.count ?? 0
			};
		}
	});
	const me = profiles?.find((p) => p.id === user?.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface warm-gradient animate-fade-up p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs uppercase tracking-[0.25em] text-primary",
						children: ["Hola", me?.name ? `, ${me.name}` : ""]
					}),
					elapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-3 font-display text-4xl font-semibold sm:text-5xl",
						children: [elapsed.dias.toLocaleString("es"), " días juntos"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-sm text-muted-foreground",
						children: [
							elapsed.horas,
							"h ",
							elapsed.minutos,
							"m ",
							elapsed.segundos,
							"s"
						]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-semibold",
							children: "¿Desde cuándo son ustedes?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "mt-4 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ajustes",
								children: "Añadir fecha de aniversario"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mx-auto mt-6 max-w-md text-sm italic text-muted-foreground",
						children: [
							"“",
							quote,
							"”"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6",
				children: [
					{
						label: "Notas",
						value: stats?.notas,
						icon: NotebookPen,
						to: "/notas"
					},
					{
						label: "Fotos",
						value: stats?.fotos,
						icon: Images,
						to: "/galeria"
					},
					{
						label: "Citas",
						value: stats?.citas,
						icon: CalendarHeart,
						to: "/calendario"
					},
					{
						label: "Deseos",
						value: stats?.deseos,
						icon: Sparkles,
						to: "/deseos"
					},
					{
						label: "Diversión",
						value: "∞",
						icon: Laugh,
						to: "/diversion"
					},
					{
						label: "Videos",
						value: "",
						icon: Video,
						to: "/videos"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: s.to,
					className: "surface p-4 transition-shadow hover:shadow-[var(--shadow-lift)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-4 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-2xl font-semibold",
							children: s.value ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: s.label
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "Próximas citas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/calendario",
							className: "text-xs text-primary hover:underline",
							children: "Ver todo"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: events?.length ? events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3 rounded-xl bg-muted/50 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarHeart, { className: "mt-0.5 size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: e.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									(/* @__PURE__ */ new Date(`${e.date}T00:00:00`)).toLocaleDateString("es", {
										weekday: "long",
										day: "numeric",
										month: "long"
									}),
									e.time ? ` · ${e.time}` : "",
									e.location ? ` · ${e.location}` : ""
								]
							})] })]
						}, e.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "py-6 text-center text-sm text-muted-foreground",
							children: "Aún no hay planes. ¡Propón uno!"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "Últimas notas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/notas",
							className: "text-xs text-primary hover:underline",
							children: "Ver todo"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: notes?.length ? notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/notas/$id",
							params: { id: n.id },
							className: "flex items-start gap-3 rounded-xl bg-muted/50 p-3 transition-colors hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mt-0.5 size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: n.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: new Date(n.created_at).toLocaleDateString("es", {
									day: "numeric",
									month: "long"
								})
							})] })]
						}) }, n.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "py-6 text-center text-sm text-muted-foreground",
							children: "Escriban su primera nota."
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "Recuerdos recientes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/galeria",
						className: "text-xs text-primary hover:underline",
						children: "Ver galería"
					})]
				}), photos?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: photos.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoTile, {
						path: p.file_path,
						caption: p.caption
					}, p.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-center text-sm text-muted-foreground",
					children: "Suban su primera foto juntos."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.25em] text-primary",
						children: "Pregunta de hoy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-display text-xl",
						children: question
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-5 rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/notas",
							children: "Responder en una nota"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { Panel as component };
