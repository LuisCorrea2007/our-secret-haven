globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-07T21:25:48.038Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-07T21:25:48.038Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/ajustes-CR-Z4tS6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100a-iLGhCwtXqKQ3dzfeUsMjgRpbosA\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 4106,
		"path": "../public/assets/ajustes-CR-Z4tS6.js"
	},
	"/assets/auth-CcF62MN1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10ac2-TRBo9rSfLwXpX081T4Wd34rjdZg\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 68290,
		"path": "../public/assets/auth-CcF62MN1.js"
	},
	"/assets/avatar-CcST9lN8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d8-09b11pknY264SZEoWo4WvBR30/A\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 2520,
		"path": "../public/assets/avatar-CcST9lN8.js"
	},
	"/assets/badge-DT8qtK1M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e3-NdPD6xYn7e5Eu3pifo+ZXdmxMqc\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 739,
		"path": "../public/assets/badge-DT8qtK1M.js"
	},
	"/assets/button-CIFezWU9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"afb6-A3id3ics95toBurXgZtpr5rqSsI\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 44982,
		"path": "../public/assets/button-CIFezWU9.js"
	},
	"/assets/calendar-heart-CYI0Ego_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-bZ16qjAgFoV8tzwPZagmWS4zVbg\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 411,
		"path": "../public/assets/calendar-heart-CYI0Ego_.js"
	},
	"/assets/calendario-CHXsrMYY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b02-qog9wayyKHW6zfNpbvZImDc84V4\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 11010,
		"path": "../public/assets/calendario-CHXsrMYY.js"
	},
	"/assets/card-BsjY7s03.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f1-zGqMexS59Y6llCGRdhpl4G19XsI\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 1009,
		"path": "../public/assets/card-BsjY7s03.js"
	},
	"/assets/chevron-right-AXfxzIfb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"78-I9yeAIO1MQg53obYzPqTr8L1eko\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 120,
		"path": "../public/assets/chevron-right-AXfxzIfb.js"
	},
	"/assets/circle-DeeGbOtL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"78-DSZGAPnYx1FdVhcVGZByBK6tULE\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 120,
		"path": "../public/assets/circle-DeeGbOtL.js"
	},
	"/assets/clock-B_VQeszx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-A/OtZe6Lmqfajjdf8Go0bz4j/rU\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 159,
		"path": "../public/assets/clock-B_VQeszx.js"
	},
	"/assets/content-C0ixkCKP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"724-81Ms7bscilj16EojYYm5PTHheNs\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 1828,
		"path": "../public/assets/content-C0ixkCKP.js"
	},
	"/assets/deseos-CieC3puC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22e7-hKhQxUcGqAiUGStOij7X7znz9Wc\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 8935,
		"path": "../public/assets/deseos-CieC3puC.js"
	},
	"/assets/dialog-A_Lf_9bs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a79-KyNmOa1vUFa8FSG5KGFipBDnnn0\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 6777,
		"path": "../public/assets/dialog-A_Lf_9bs.js"
	},
	"/assets/diario-sL10plgm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1326-Ce4AkbkndDaxGYwZTsDK3VEJNxw\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 4902,
		"path": "../public/assets/diario-sL10plgm.js"
	},
	"/assets/dist-BrEs65ux.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"157a-781HwuWcWqvyPorVYoEMlCGGYRM\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 5498,
		"path": "../public/assets/dist-BrEs65ux.js"
	},
	"/assets/dist-C44MR1-e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"279-nJWYjj3c86WzQEVSvuYoAbXklAs\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 633,
		"path": "../public/assets/dist-C44MR1-e.js"
	},
	"/assets/dist-C6lvz2qP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c78-xR7RxdWklBYGiHi3qnLrT6eSdvM\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 7288,
		"path": "../public/assets/dist-C6lvz2qP.js"
	},
	"/assets/dist-CXCLT8oT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f3-/BoWfAU0I3cCM7zq/t02SDRn9ao\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 2035,
		"path": "../public/assets/dist-CXCLT8oT.js"
	},
	"/assets/dist-DI_at7JO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1079-TU7TurLD/wa4enJ05UUTJ+cvCzs\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 4217,
		"path": "../public/assets/dist-DI_at7JO.js"
	},
	"/assets/dist-Dwc2dNjX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66a7-6WXkgbbJ6HhFmOFhrG0pLvi/avg\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 26279,
		"path": "../public/assets/dist-Dwc2dNjX.js"
	},
	"/assets/diversion-D6jUa2G3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3975-Iq2vebqHvRVjSrZ5G8C/3++K/BM\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 14709,
		"path": "../public/assets/diversion-D6jUa2G3.js"
	},
	"/assets/download-Dzagpwm2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de-L8xwlRwtotifVgAVmRKLwtxu4ls\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 222,
		"path": "../public/assets/download-Dzagpwm2.js"
	},
	"/assets/es2015-DbI0-PE9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5549-2aoTZAA0BvZmurA+/tDv9ilDH60\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 21833,
		"path": "../public/assets/es2015-DbI0-PE9.js"
	},
	"/assets/galeria-CEOYBWs3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cfe-egXgTGrC1Efw9efRHqku6rX+pig\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 7422,
		"path": "../public/assets/galeria-CEOYBWs3.js"
	},
	"/assets/heart-s-IbJccW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-8Diu4pQdL+xUTtiAmaKp6HJhrcA\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 248,
		"path": "../public/assets/heart-s-IbJccW.js"
	},
	"/assets/images-Cvz2a7Nk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"168-QOkdIc1gR6UdUSq6J2USu2ruyRo\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 360,
		"path": "../public/assets/images-Cvz2a7Nk.js"
	},
	"/assets/label-Ccxayjw7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46d-jSm87VfMkHr/P/Bcfa3yEQd9eJA\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 1133,
		"path": "../public/assets/label-Ccxayjw7.js"
	},
	"/assets/laugh-BccQZWl3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a-LHTx2dSknOxweyqEZvpyAnnfGCU\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 298,
		"path": "../public/assets/laugh-BccQZWl3.js"
	},
	"/assets/link-qzmDPkrS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1f-m/XYN0vzUOfo6I3eKYrQJ6otJRo\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 23327,
		"path": "../public/assets/link-qzmDPkrS.js"
	},
	"/assets/loader-circle-DdXSbW7k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86-iM9yVyAaWfPg92U2Q1NYSJeEODo\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 134,
		"path": "../public/assets/loader-circle-DdXSbW7k.js"
	},
	"/assets/media-CpiWqePZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"506-NiFpMBo1B1pixWLvTO6Dq4QzkqA\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 1286,
		"path": "../public/assets/media-CpiWqePZ.js"
	},
	"/assets/message-circle-Ck8OhVcG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7-0QAbAnQi3F1QUMkRyesuXef2btM\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 231,
		"path": "../public/assets/message-circle-Ck8OhVcG.js"
	},
	"/assets/notas._id-D_t9FTdE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2924-ClLSSZOKPSOmN9DbRfIvue1Hebc\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 10532,
		"path": "../public/assets/notas._id-D_t9FTdE.js"
	},
	"/assets/notas.index-BLdR8doH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"186a-dc24k9q3I3f0to2wJZkfZ0EwC3Q\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 6250,
		"path": "../public/assets/notas.index-BLdR8doH.js"
	},
	"/assets/notebook-pen-BOKIBuiY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d2-vBLJqUzaxqj4svUi0HuEnVMllpg\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 466,
		"path": "../public/assets/notebook-pen-BOKIBuiY.js"
	},
	"/assets/panel-De6DLKiJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cf8-yXx8zqmH/e8pCUQQZnHkwA3zqJs\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 7416,
		"path": "../public/assets/panel-De6DLKiJ.js"
	},
	"/assets/plus-BFGP6jEv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-73UMj7N6o7ryp+mpioz4W3lX0ao\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 143,
		"path": "../public/assets/plus-BFGP6jEv.js"
	},
	"/assets/route-DINNB-yg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b285-K1jeOcwauWdzxL7IhvmfwqONFmk\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 45701,
		"path": "../public/assets/route-DINNB-yg.js"
	},
	"/assets/routes-x-tpZXc0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dcf-fYdJvjc0MIlQ+WK4TBGhO6s6v74\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 3535,
		"path": "../public/assets/routes-x-tpZXc0.js"
	},
	"/assets/select-KbDZ_krg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5724-ZtvoW2jiNciLJ1/0uqLnHPwsN5A\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 22308,
		"path": "../public/assets/select-KbDZ_krg.js"
	},
	"/assets/skeleton-BDZwyco8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-2TuAxuSaGgig+8ObtmxthbKCld0\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 190,
		"path": "../public/assets/skeleton-BDZwyco8.js"
	},
	"/assets/sparkles-Dxypt7JJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-Tu8XdQE/Y0WXimLRjNGDtlWxIoU\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 484,
		"path": "../public/assets/sparkles-Dxypt7JJ.js"
	},
	"/assets/star-CVZUlGlN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ce-mDcPb3D1IGsw07aba+N+E1VRQDU\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 462,
		"path": "../public/assets/star-CVZUlGlN.js"
	},
	"/assets/styles-C1ufUxaV.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14cac-WxyHiebTvS8AIVGg+TI0mf1eUHI\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 85164,
		"path": "../public/assets/styles-C1ufUxaV.css"
	},
	"/assets/textarea-DgOwwScn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dc-jiJ3XdPckeWlVpKFdLFR9KzAvRI\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 476,
		"path": "../public/assets/textarea-DgOwwScn.js"
	},
	"/assets/trash-2-CveKj3vJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e-lXEHwPKtujHzUdOU51sSaw+aJj8\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 318,
		"path": "../public/assets/trash-2-CveKj3vJ.js"
	},
	"/assets/index-Be0Cputt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ca82-T/A8l8eQXQ6K9jA51EJsYmlDHHs\"",
		"mtime": "2026-09-07T21:25:45.544Z",
		"size": 576130,
		"path": "../public/assets/index-Be0Cputt.js"
	},
	"/assets/upload-VgMcnk0q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc-Sz/Cls+n7iyo9jYkkVAdSB058Zw\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 220,
		"path": "../public/assets/upload-VgMcnk0q.js"
	},
	"/assets/use-auth-CPy85kSf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ad-wK/1V4cmMOb3o9sBm9T4RwY8Iug\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 8365,
		"path": "../public/assets/use-auth-CPy85kSf.js"
	},
	"/assets/use-profiles-CIPi6-nQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e5-xIKWtuQsz6+tlGF9QX9AS7VYEzo\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 485,
		"path": "../public/assets/use-profiles-CIPi6-nQ.js"
	},
	"/assets/useMutation-Bpoo1Cue.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"922-tA6gLbcD/FLTkYF+tkB/iNXrQoU\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 2338,
		"path": "../public/assets/useMutation-Bpoo1Cue.js"
	},
	"/assets/video-D_aW5GHs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee-GVFI3v0YDOPq2wnGZL2JOKLQSig\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 238,
		"path": "../public/assets/video-D_aW5GHs.js"
	},
	"/assets/videos-DvMRaVc4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b77-urOHyXjgHmO2Xx5ndUlG599drF4\"",
		"mtime": "2026-09-07T21:25:45.545Z",
		"size": 7031,
		"path": "../public/assets/videos-DvMRaVc4.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_IO091Z = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_IO091Z
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
