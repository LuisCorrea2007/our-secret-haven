import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  email: string | null;
  name: string;
  avatar_url: string | null;
  anniversary_date: string | null;
  location: string | null;
};

export function useProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async (): Promise<Profile[]> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, name, avatar_url, anniversary_date, location")
        .order("created_at");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useMyProfile(userId?: string) {
  const { data, ...rest } = useProfiles();
  return { ...rest, data: data?.find((p) => p.id === userId) };
}

/** Fecha de aniversario del espacio: la primera definida por cualquiera de los dos. */
export function anniversaryOf(profiles?: Profile[]): string | null {
  return profiles?.find((p) => p.anniversary_date)?.anniversary_date ?? null;
}
