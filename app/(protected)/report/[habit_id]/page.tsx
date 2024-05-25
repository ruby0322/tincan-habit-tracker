"use server";

import { getLightHabits } from "@/actions/habit";
import { createClient } from "@/utils/supabase/server";
import SelectHabit from "../select-habit";

const ReportPage = async ({ params }: { params: { habit_id: string } }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const lightHabits = await getLightHabits(user?.id as string);
  return (
    <div className='p-4 flex justify-center align-center'>
      <SelectHabit lightHabits={lightHabits} />
    </div>
  );
};

export default ReportPage;
