"use server";

import { CarouselItem } from "@/components/ui/carousel";

import { getAllHabits } from "@/actions/habit";
import HabitCard from "@/components/habit-card";
import { createClient } from "@/utils/supabase/server";

export default async function CreatedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const habits = await getAllHabits(user?.id as string);
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
                return <HabitCard key={`habit-card-${index}`} habit={habit} />;
              })}
          </div>
        </CarouselItem>
      ))}
    </>
  );
}
