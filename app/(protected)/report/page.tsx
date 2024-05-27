"use server";

import { getLightHabits } from "@/actions/habit";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const ReportPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const lightHabits = await getLightHabits(user?.id as string);
  if (lightHabits.length === 0) {
    return (
      <div className='flex flex-col gap-4 items-center justify-center h-full'>
        <p>你還沒有任何習慣，快去建立一個吧！</p>
        <Link href='/create' className='underline color-cyan-400'>
          我這就去！
        </Link>
      </div>
    );
  }
  return redirect(`/report/${lightHabits[0].habit_id}`);
};

export default ReportPage;
