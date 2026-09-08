import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { n as Label, t as Input } from "./label-CmIE8x5o.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as LoaderCircle, x as Heart } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as stringType } from "../_libs/zod.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-D-uGD1Ss.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var emailSchema = stringType().trim().email("Correo inválido").max(255);
var passSchema = stringType().min(8, "Mínimo 8 caracteres").max(72);
var nameSchema = stringType().trim().min(1, "Escribe un nombre").max(60);
function AuthPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({
				to: "/panel",
				replace: true
			});
		});
	}, [navigate]);
	async function signIn(e) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const email = emailSchema.safeParse(form.get("email"));
		const password = passSchema.safeParse(form.get("password"));
		if (!email.success) {
			toast.error(email.error.issues[0].message);
			return;
		}
		if (!password.success) {
			toast.error(password.error.issues[0].message);
			return;
		}
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email.data,
			password: password.data
		});
		setLoading(false);
		if (error) {
			toast.error("No pudimos entrar: revisa el correo y la contraseña");
			return;
		}
		navigate({
			to: "/panel",
			replace: true
		});
	}
	async function signUp(e) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = nameSchema.safeParse(form.get("name"));
		const email = emailSchema.safeParse(form.get("email"));
		const password = passSchema.safeParse(form.get("password"));
		if (!name.success) {
			toast.error(name.error.issues[0].message);
			return;
		}
		if (!email.success) {
			toast.error(email.error.issues[0].message);
			return;
		}
		if (!password.success) {
			toast.error(password.error.issues[0].message);
			return;
		}
		setLoading(true);
		const { error } = await supabase.auth.signUp({
			email: email.data,
			password: password.data,
			options: {
				data: { name: name.data },
				emailRedirectTo: `${window.location.origin}/panel`
			}
		});
		setLoading(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Cuenta creada. Si te pedimos confirmar el correo, revisa tu bandeja.");
		navigate({
			to: "/panel",
			replace: true
		});
	}
	async function google() {
		setLoading(true);
		const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
		if (result.error) {
			setLoading(false);
			toast.error("No pudimos conectar con Google");
			return;
		}
		if (result.redirected) return;
		navigate({
			to: "/panel",
			replace: true
		});
	}
	async function reset() {
		const email = window.prompt("¿A qué correo enviamos el enlace de recuperación?");
		if (!email) return;
		const parsed = emailSchema.safeParse(email);
		if (!parsed.success) {
			toast.error("Correo inválido");
			return;
		}
		const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, { redirectTo: `${window.location.origin}/auth` });
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Te enviamos un enlace para restablecer la contraseña");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "warm-gradient flex min-h-screen items-center justify-center px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-8 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-6 fill-primary text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl font-semibold",
					children: "Nuestro Espacio"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface animate-fade-up p-6 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "login",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid w-full grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "login",
									children: "Entrar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signup",
									children: "Crear cuenta"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "login",
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: signIn,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "li-email",
												children: "Correo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "li-email",
												name: "email",
												type: "email",
												autoComplete: "email",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "li-pass",
												children: "Contraseña"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "li-pass",
												name: "password",
												type: "password",
												autoComplete: "current-password",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											className: "w-full rounded-full",
											disabled: loading,
											children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), "Entrar"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: reset,
											className: "w-full text-center text-xs text-muted-foreground underline-offset-2 hover:underline",
											children: "Olvidé mi contraseña"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signup",
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: signUp,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "su-name",
												children: "¿Cómo te llamamos?"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "su-name",
												name: "name",
												maxLength: 60,
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "su-email",
												children: "Correo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "su-email",
												name: "email",
												type: "email",
												autoComplete: "email",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "su-pass",
												children: "Contraseña"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "su-pass",
												name: "password",
												type: "password",
												autoComplete: "new-password",
												minLength: 8,
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											className: "w-full rounded-full",
											disabled: loading,
											children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), "Crear cuenta"]
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
							" o ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "w-full rounded-full",
						onClick: google,
						disabled: loading,
						children: "Continuar con Google"
					})
				]
			})]
		})
	});
}
//#endregion
export { AuthPage as component };
