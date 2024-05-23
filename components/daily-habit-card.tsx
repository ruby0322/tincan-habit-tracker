"use client";

import {
  decrementCompletedUnit,
  incrementCompletedUnit,
} from "@/actions/record";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DailyHabit } from "@/type";
import Image from "next/image";

const DailyHabitCard = ({ dailyHabit }: { dailyHabit: DailyHabit }) => {
  const onAddClick = async () => {
    await incrementCompletedUnit(dailyHabit.habit_id);
  };

  const onMinusClick = async () => {
    await decrementCompletedUnit(dailyHabit.habit_id);
  };
  return (
    <div className='bg-white rounded-lg shadow-sm py-4 px-5 h-full flex-col flex justify-between items-center'>
      <h2 className='w-full text-center text-lg font-semibold'>
        {dailyHabit.title}
      </h2>
      <Image
        alt={`Picture of ${dailyHabit.title}`}
        className='w-24 h-24 rounded-lg'
        width='1024'
        height='1024'
        src={dailyHabit.picture_url}
      />
      <Progress
        className='h-4 rounded'
        value={
          (dailyHabit.num_completed_unit / dailyHabit.num_daily_goal_unit) * 100
        }
      />
      <div className='flex items-center w-full justify-between'>
        <Button
          onClick={onMinusClick}
          className='w-8 h-8 rounded-full'
          variant='outline'
        >
          -
        </Button>
        <div className='flex flex-col items-center justify-center'>
          <p className='w-full text-center text-sm'>
            {dailyHabit.num_completed_unit} / {dailyHabit.num_daily_goal_unit}
          </p>
          <p className='w-full text-center text-xs'>
            ({dailyHabit.daily_goal_unit})
          </p>
        </div>
        <Button
          onClick={onAddClick}
          className='w-8 h-8 rounded-full'
          variant='outline'
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default DailyHabitCard;
