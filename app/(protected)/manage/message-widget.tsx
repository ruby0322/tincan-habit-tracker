"use client";

import {
  Carousel,
  CarouselMainContainer,
  SliderMainItem,
} from "@/components/ui/extension/carousel";
import { DailyHabit } from "@/type";
import AutoPlay from "embla-carousel-autoplay";

import Image from "next/image";
const MessageWidget = ({ dailyHabits }: { dailyHabits: DailyHabit[] }) => {
  return (
    <Carousel
      plugins={[
        AutoPlay({
          delay: 1200,
        }),
      ]}
      carouselOptions={{
        loop: true,
      }}
      orientation='vertical'
      className='outline outline-1 outline-border rounded-xl bg-background p-2'
    >
      <CarouselMainContainer className='h-[5rem]'>
        {dailyHabits.map((dailyHabit, index) => (
          <SliderMainItem
            key={index}
            className='bg-transparent items-center flex gap-3'
          >
            <Image
              alt='Avatar'
              className='w-8 h-8 rounded-full'
              width='1024'
              height='1024'
              src='https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-1984271e-b00b-4b5a-8211-7617ed80ac56'
            />
            <div className='text-wrap text-ellipsis overflow-hidden ... h-fit justify-between bg-gray-100 rounded-lg px-4 py-2 flex gap-6'>
              {dailyHabit.message}
            </div>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
    </Carousel>
  );
};

export default MessageWidget;
