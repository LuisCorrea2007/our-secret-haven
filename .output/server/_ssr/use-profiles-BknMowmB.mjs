import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-profiles-BknMowmB.js
function useProfiles() {
	return useQuery({
		queryKey: ["profiles"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("id, email, name, avatar_url, anniversary_date, location").order("created_at");
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useMyProfile(userId) {
	const { data, ...rest } = useProfiles();
	return {
		...rest,
		data: data?.find((p) => p.id === userId)
	};
}
/** Fecha de aniversario del espacio: la primera definida por cualquiera de los dos. */
function anniversaryOf(profiles) {
	return profiles?.find((p) => p.anniversary_date)?.anniversary_date ?? null;
}
//#endregion
export { useMyProfile as n, useProfiles as r, anniversaryOf as t };
