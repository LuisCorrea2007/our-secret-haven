import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { o as Sun, p as Moon } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-toggle-BYI-7IWi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function applyStoredTheme() {
	if (typeof window === "undefined") return;
	const stored = localStorage.getItem("ne-theme");
	const dark = stored === "dark" || !stored && window.matchMedia("(prefers-color-scheme: dark)").matches;
	document.documentElement.classList.toggle("dark", dark);
}
function ThemeToggle() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);
	function toggle() {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("ne-theme", next ? "dark" : "light");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		onClick: toggle,
		"aria-label": dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro",
		className: "rounded-full transition-transform hover:scale-110",
		children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-5" })
	});
}
//#endregion
export { applyStoredTheme as n, ThemeToggle as t };
