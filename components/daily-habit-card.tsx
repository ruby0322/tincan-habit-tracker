import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DailyHabit } from "@/type";
import Image from "next/image";

const DailyHabitCard = ({ dailyHabit }: { dailyHabit: DailyHabit }) => {
  return (
    <div className='bg-white rounded-lg shadow-sm py-4 px-5 h-full flex-col flex justify-between items-center'>
      <h2 className='w-full text-center text-lg font-semibold'>
        {dailyHabit.title}
      </h2>
      <Image
        alt='Avatar'
        className='w-24 h-24 rounded-lg'
        width='1024'
        height='1024'
        src='https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-1984271e-b00b-4b5a-8211-7617ed80ac56'
      />
      <Progress
        className='h-4 rounded'
        value={
          (dailyHabit.num_completed_unit / dailyHabit.num_daily_goal_unit) * 100
        }
      />
      <div className='flex items-center w-full justify-between'>
        <Button className='w-8 h-8 rounded-full' variant='outline'>
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
        <Button className='w-8 h-8 rounded-full' variant='outline'>
          +
        </Button>
      </div>
    </div>
  );
};

export default DailyHabitCard;

function CheckIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M20 6 9 17l-5-5' />
    </svg>
  );
}

function ClockIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  );
}