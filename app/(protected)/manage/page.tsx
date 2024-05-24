"use server";

import { CarouselItem } from "@/components/ui/carousel";

import { getDailyHabits } from "@/actions/habit";
import DailyHabitCard from "@/components/daily-habit-card";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const habits = (await getDailyHabits(user?.id as string)).sort(
    (a, b) =>
      a.num_completed_unit / a.num_daily_goal_unit -
      b.num_completed_unit / b.num_daily_goal_unit
  );
  return (
    <>
      {Array.from({ length: Math.ceil(habits.length / 4) }).map((_, index) => (
        <CarouselItem
          className='w-fll h-full flex flex-col gap-4'
          key={`carousel-item-${index}`}
        >
          <div className='w-fll h-full grid grid-rows-2 grid-cols-2 gap-4'>
            {habits
              ?.slice(index * 4, Math.min((index + 1) * 4, habits.length))
              .map((habit, index) => {
                return (
                  <DailyHabitCard
                    key={`habit-card-${index}`}
                    dailyHabit={habit}
                  />
                );
              })}
          </div>
        </CarouselItem>
      ))}
    </>
  );
}
