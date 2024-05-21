"use server";
import { Carousel, CarouselContent } from "@/components/ui/carousel";

import { getDailyHabits } from "@/actions/habit";
import { createClient } from "@/utils/supabase/server";
import { ReactNode } from "react";
import MessageWidget from "./message-widget";

export default async function ManageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const dailyHabits = await getDailyHabits(user?.id as string);
  return (
    <div className='bg-gray-100 flex h-full gap-4 flex-col mx-auto px-4 py-4 md:px-6 md:py-6'>
      <MessageWidget dailyHabits={dailyHabits} />
      <Carousel>
        <CarouselContent className='h-full'>{children}</CarouselContent>
      </Carousel>
      <div className='w-full justify-between  bg-white rounded-lg shadow-sm py-4 px-12 flex gap-6'>
        <div className='flex flex-col gap-2 text-center'>
          <h3 className='text-xs font-semibold'>今目標</h3>
          <span className='text-2xl font-bold'>{dailyHabits.length}</span>
        </div>
        <div className='flex flex-col gap-2 text-center'>
          <h3 className='text-xs font-semibold'>已建立</h3>
          <span className='text-2xl font-bold'>6</span>
        </div>
        <div className='flex flex-col gap-2 text-center'>
          <h3 className='text-xs font-semibold'>已完成</h3>
          <span className='text-2xl font-bold'>4</span>
        </div>
        <div className='flex flex-col gap-2 text-center'>
          <h3 className='text-xs font-semibold'>養成中</h3>
          <span className='text-2xl font-bold'>2</span>
        </div>
      </div>
    </div>
  );
}
