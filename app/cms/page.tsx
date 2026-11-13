
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CMSDashboard from "./CMSDashboard";

export const instant = false;

export default async function CMSPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/cms/login");
  }

  return <CMSDashboard />;
}
