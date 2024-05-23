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
          delay: 2000,
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
              src={dailyHabit.picture_url}
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
