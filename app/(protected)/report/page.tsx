"use server";

import { getLightHabits } from "@/actions/habit";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const ReportPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const lightHabits = await getLightHabits(user?.id as string);
  return redirect(`/report/${lightHabits[0].habit_id}`);
};

export default ReportPage;
