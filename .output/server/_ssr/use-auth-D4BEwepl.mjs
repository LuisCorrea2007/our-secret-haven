import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-D4BEwepl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuth() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
			setSession(next);
			setLoading(false);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	return {
		session,
		user: session?.user ?? null,
		loading
	};
}
//#endregion
export { useAuth as t };
