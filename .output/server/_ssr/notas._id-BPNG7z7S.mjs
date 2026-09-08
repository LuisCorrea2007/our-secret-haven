import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notas._id-BPNG7z7S.js
var $$splitComponentImporter = () => import("./notas._id-DGutO_Ye.mjs");
var Route = createFileRoute("/_authenticated/notas/$id")({
	head: () => ({ meta: [
		{ title: "Nota — Nuestro Espacio" },
		{
			name: "description",
			content: "Una nota compartida con sus respuestas y reacciones."
		},
		{
			property: "og:title",
			content: "Nota — Nuestro Espacio"
		},
		{
			property: "og:description",
			content: "Nota compartida de la pareja."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
