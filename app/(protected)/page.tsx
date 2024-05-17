"use server";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { getDailyHabits } from "@/actions/habit";
import DailyHabitCard from "@/components/daily-habit-card";
import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const habits = await getDailyHabits(user?.id as string);
  console.log(habits);
  return (
    <Carousel className='h-full'>
      <div className='bg-gray-100 flex h-full gap-6 flex-col mx-auto px-4 py-4 md:px-6 md:py-6'>
        <div className='bg-white rounded-lg shadow-sm p-6 flex gap-6'>
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
        <CarouselContent className='h-full'>
          {Array.from({ length: Math.ceil(habits.length / 4) }).map(
            (_, index) => (
              <CarouselItem
                className='w-fll h-full'
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
            )
          )}
        </CarouselContent>
      </div>
    </Carousel>
  );
}
