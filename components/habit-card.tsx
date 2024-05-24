"use client";

import { Progress } from "@/components/ui/progress";
import { HabitTable } from "@/type";
import Image from "next/image";
import { Button } from "./ui/button";

const HabitCard = ({ habit }: { habit: HabitTable }) => {
  return (
    <div className='bg-white rounded-lg shadow-sm py-4 px-5 h-full flex-col flex justify-between items-center'>
      <h2 className='w-full text-center text-lg font-semibold'>
        {habit.title}
      </h2>
      <Image
        alt={`Picture of ${habit.title}`}
        className='w-24 h-24 rounded-lg rounded-b-none'
        width='1024'
        height='1024'
        src={habit.picture_url}
      />
      <Progress className='w-24 h-2 rounded rounded-t-none mb-2' value={85} />
      <div className='flex items-center w-full justify-center'>
        <Button className='bg-orange-300 hover:bg-orange-200'>進度報告</Button>
      </div>
    </div>
  );
};

export default HabitCard;
