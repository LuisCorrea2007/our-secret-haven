import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$13 } from "./notas._id-BPNG7z7S.mjs";
import { n as applyStoredTheme } from "./theme-toggle-BYI-7IWi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Ia5diTJy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-C1ufUxaV.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Página no encontrada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Esta página no existe o fue movida."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Volver al inicio"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl font-semibold tracking-tight text-foreground",
					children: "Esta página no cargó"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Algo salió mal. Puedes reintentar o volver al inicio."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Reintentar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Ir al inicio"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Nuestro Espacio — el rincón privado de los dos" },
			{
				name: "description",
				content: "Notas, fotos, citas y recuerdos de pareja en un espacio privado, cálido y solo para ustedes."
			},
			{
				property: "og:title",
				content: "Nuestro Espacio"
			},
			{
				property: "og:description",
				content: "Notas, fotos, citas y recuerdos de pareja en un espacio privado."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		applyStoredTheme();
	}, []);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})]
	});
}
var $$splitComponentImporter$11 = () => import("./routes-mSv5RRMK.mjs");
var Route$11 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Nuestro Espacio — el rincón privado de los dos" },
		{
			name: "description",
			content: "Un lugar íntimo para guardar notas, fotos, citas y recuerdos de pareja. Privado, cálido y solo para ustedes dos."
		},
		{
			property: "og:title",
			content: "Nuestro Espacio — el rincón privado de los dos"
		},
		{
			property: "og:description",
			content: "Notas, fotos, citas y recuerdos de pareja en un espacio privado."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./route-CMfEm8GP.mjs");
var Route$10 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./auth-D-uGD1Ss.mjs");
var Route$9 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Entrar a Nuestro Espacio" },
		{
			name: "description",
			content: "Inicia sesión o crea la cuenta de su espacio privado de pareja."
		},
		{
			property: "og:title",
			content: "Entrar a Nuestro Espacio"
		},
		{
			property: "og:description",
			content: "Accede al espacio privado de la pareja."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./ajustes-DAD5-p_4.mjs");
var Route$8 = createFileRoute("/_authenticated/ajustes")({
	head: () => ({ meta: [
		{ title: "Ajustes — Nuestro Espacio" },
		{
			name: "description",
			content: "Perfil, foto y fecha de aniversario de su espacio compartido."
		},
		{
			property: "og:title",
			content: "Ajustes — Nuestro Espacio"
		},
		{
			property: "og:description",
			content: "Configuración del espacio de pareja."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./calendario-BJbcRK9S.mjs");
var Route$7 = createFileRoute("/_authenticated/calendario")({
	head: () => ({ meta: [
		{ title: "Citas — Nuestro Espacio" },
		{
			name: "description",
			content: "Calendario de citas, planes y aniversarios de la pareja."
		},
		{
			property: "og:title",
			content: "Citas — Nuestro Espacio"
		},
		{
			property: "og:description",
			content: "Planes y fechas importantes de los dos."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./deseos-DArMbSBA.mjs");
var Route$6 = createFileRoute("/_authenticated/deseos")({
	head: () => ({ meta: [
		{ title: "Deseos — Nuestro Espacio" },
		{
			name: "description",
			content: "Lista compartida de lugares, planes y antojos pendientes."
		},
		{
			property: "og:title",
			content: "Deseos — Nuestro Espacio"
		},
		{
			property: "og:description",
			content: "Lista de deseos de la pareja con votos."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./diario-BqHdy7zS.mjs");
var Route$5 = createFileRoute("/_authenticated/diario")({
	head: () => ({ meta: [
		{ title: "Diario — Nuestro Espacio" },
		{
			name: "description",
			content: "Línea de tiempo con los hitos importantes de la relación."
		},
		{
			property: "og:title",
			content: "Diario — Nuestro Espacio"
		},
		{
			property: "og:description",
			content: "Los momentos que marcaron la relación."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./diversion-Cnje3Ruw.mjs");
var Route$4 = createFileRoute("/_authenticated/diversion")({
	head: () => ({ meta: [
		{ title: "Diversión — Nuestro Espacio" },
		{
			name: "description",
			content: "Chistes, adivinanzas, trivia y preguntas divertidas para la pareja."
		},
		{
			property: "og:title",
			content: "Diversión — Nuestro Espacio"
		},
		{
			property: "og:description",
			content: "Momentos divertidos compartidos."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./galeria-5IHyeDFl.mjs");
var Route$3 = createFileRoute("/_authenticated/galeria")({
	head: () => ({ meta: [
		{ title: "Galería — Nuestro Espacio" },
		{
			name: "description",
			content: "Fotos y recuerdos de la pareja organizados en álbumes."
		},
		{
			property: "og:title",
			content: "Galería — Nuestro Espacio"
		},
		{
			property: "og:description",
			content: "Álbumes y fotos compartidas."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./panel-62bC0Yku.mjs");
var Route$2 = createFileRoute("/_authenticated/panel")({
	head: () => ({ meta: [
		{ title: "Panel — Nuestro Espacio" },
		{
			name: "description",
			content: "Resumen del día: tiempo juntos, próximas citas y últimos recuerdos."
		},
		{
			property: "og:title",
			content: "Panel — Nuestro Espacio"
		},
		{
			property: "og:description",
			content: "Resumen diario de la pareja."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./videos-BwMZcQZW.mjs");
var Route$1 = createFileRoute("/_authenticated/videos")({
	head: () => ({ meta: [{ title: "Videos Diarios — Nuestro Espacio" }, {
		name: "description",
		content: "Videos de lo que hacemos en el día."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./notas.index-CdelMvww.mjs");
var Route = createFileRoute("/_authenticated/notas/")({
	head: () => ({ meta: [
		{ title: "Notas — Nuestro Espacio" },
		{
			name: "description",
			content: "Cartas, agradecimientos y recuerdos escritos entre los dos."
		},
		{
			property: "og:title",
			content: "Notas — Nuestro Espacio"
		},
		{
			property: "og:description",
			content: "Notas compartidas de la pareja."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var AuthenticatedRouteRoute = Route$10.update({
	id: "/_authenticated",
	getParentRoute: () => Route$12
});
var AuthRoute = Route$9.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$12
});
var AuthenticatedAjustesRoute = Route$8.update({
	id: "/ajustes",
	path: "/ajustes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCalendarioRoute = Route$7.update({
	id: "/calendario",
	path: "/calendario",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDeseosRoute = Route$6.update({
	id: "/deseos",
	path: "/deseos",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDiarioRoute = Route$5.update({
	id: "/diario",
	path: "/diario",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDiversionRoute = Route$4.update({
	id: "/diversion",
	path: "/diversion",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedGaleriaRoute = Route$3.update({
	id: "/galeria",
	path: "/galeria",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPanelRoute = Route$2.update({
	id: "/panel",
	path: "/panel",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedVideosRoute = Route$1.update({
	id: "/videos",
	path: "/videos",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotasIndexRoute = Route.update({
	id: "/notas/",
	path: "/notas/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAjustesRoute,
	AuthenticatedCalendarioRoute,
	AuthenticatedDeseosRoute,
	AuthenticatedDiarioRoute,
	AuthenticatedDiversionRoute,
	AuthenticatedGaleriaRoute,
	AuthenticatedPanelRoute,
	AuthenticatedVideosRoute,
	AuthenticatedNotasIdRoute: Route$13.update({
		id: "/notas/$id",
		path: "/notas/$id",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedNotasIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
