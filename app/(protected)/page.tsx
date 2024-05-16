"use server";

import DailyHabitCard from "@/components/daily-habit-card";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ORhCLjfFs0X
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const { data: habits } = await supabase.from("habit").select();
  console.log(habits);
  return (
    <div className='bg-gray-100 h-full flex gap-6 flex-col mx-auto px-4 py-4 md:px-6 md:py-6'>
      <div className='bg-white rounded-lg shadow-sm p-6 grid md:grid-cols-3 gap-6'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-semibold'>Total Habits</h3>
          <span className='text-4xl font-bold'>6</span>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-semibold'>Habits Completed</h3>
          <span className='text-4xl font-bold'>2</span>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-semibold'>Habits in Progress</h3>
          <span className='text-4xl font-bold'>4</span>
        </div>
      </div>
      <div className='flex-1 grid grid-rows-2 grid-cols-2 gap-4'>
        {habits?.map((habit, index) => {
          return (
            <DailyHabitCard key={`habit-card-${index}`} dailyHabit={habit} />
          );
        })}
      </div>
    </div>
  );
}
