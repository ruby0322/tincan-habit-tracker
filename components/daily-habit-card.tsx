"use client";
import { deleteHabit } from "@/actions/habit";
import { createPost } from "@/actions/post";
import {
  decrementCompletedUnit,
  incrementCompletedUnit,
} from "@/actions/record";
import { Progress } from "@/components/ui/progress";
import { DailyHabit } from "@/type";
import { AreaChart, Minus, Plus, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import ReactCardFlip from "react-card-flip";
import ConfirmDialog from "./confirm-dialog";
import { Button } from "./ui/button";

const CardFront = ({
  dailyHabit,
  flip,
}: {
  dailyHabit: DailyHabit;
  flip: () => void;
}) => {
  const [numCompletedUnit, setNumCompletedUnit] = useState<number>(
    dailyHabit.num_completed_unit
  );
  const onAddClick = async (e: MouseEvent) => {
    e.stopPropagation();
    if (numCompletedUnit < dailyHabit.num_daily_goal_unit) {
      setNumCompletedUnit(numCompletedUnit + 1);
      await incrementCompletedUnit(dailyHabit.habit_id);
    }
  };

  const onMinusClick = async (e: MouseEvent) => {
    e.stopPropagation();
    if (numCompletedUnit > 0) {
      setNumCompletedUnit(numCompletedUnit - 1);
      await decrementCompletedUnit(dailyHabit.habit_id);
    }
  };
  return (
    <div
      onClick={flip}
      className='bg-white rounded-lg shadow-sm py-4 pb-0 px-0 h-full flex-col flex justify-between items-center gap-2'
    >
      <h2 className='w-full text-center text-base font-semibold truncate ...'>
        {dailyHabit.title}
      </h2>
      <div>
        <Image
          alt={`Picture of ${dailyHabit.title}`}
          className='w-24 h-24 rounded-lg'
          width='1024'
          height='1024'
          src={dailyHabit.picture_url}
        />
      </div>
      <div className='flex items-center w-full justify-between px-4'>
        <div className='cursor-pointer rounded-full border-2 border-gray-100 p-1'>
          <Minus
            onClick={
              onMinusClick as unknown as MouseEventHandler<SVGSVGElement>
            }
            className='w-4 h-4 rounded-full'
          />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='w-full text-center text-sm'>
            {numCompletedUnit} / {dailyHabit.num_daily_goal_unit}
          </p>
          <p className='w-full text-center text-xs'>
            ({dailyHabit.daily_goal_unit})
          </p>
        </div>
        <div className='cursor-pointer rounded-full border-2 border-gray-100 p-1'>
          <Plus
            onClick={onAddClick as unknown as MouseEventHandler<SVGSVGElement>}
            className='w-4 h-4 rounded-full'
          />
        </div>
      </div>
      <Progress
        className='w-full h-2 rounded rounded-t-none'
        value={(numCompletedUnit / dailyHabit.num_daily_goal_unit) * 100}
      />
    </div>
  );
};

const CardBack = ({
  dailyHabit,
  flip,
}: {
  dailyHabit: DailyHabit;
  flip: () => void;
}) => {
  const router = useRouter();
  const onPostConfirm = async () => {
    await createPost(dailyHabit);
    router.push("/social");
  };
  const onDeleteConfirm = async () => {
    await deleteHabit(dailyHabit.habit_id);
  };
  const onReportClick = async (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/report/${dailyHabit.creator_user_id}`);
  };
  return (
    <div
      onClick={flip}
      className='bg-white rounded-lg shadow-sm py-4 pb-0 px-0 h-full flex-col flex justify-center items-center gap-2 transition-transform duration-300 ease-in-out transform rotate-3 overflow-visible'
    >
      <ConfirmDialog
        text={`你確定要發布 ${dailyHabit.title} 的今日進度貼文嗎？`}
        onConfirm={onPostConfirm}
      >
        <Button variant='outline'>
          <SquarePen className='text-gray-400 mr-2 h-4 w-4' />
          發文
        </Button>
      </ConfirmDialog>
      <Button
        onClick={
          onReportClick as unknown as MouseEventHandler<HTMLButtonElement>
        }
        variant='outline'
      >
        <AreaChart className='text-gray-400 mr-2 h-4 w-4' />
        報告
      </Button>
      <ConfirmDialog
        text={`你確定要永久刪除 ${dailyHabit.title} 習慣嗎？`}
        onConfirm={onDeleteConfirm}
      >
        <Button variant='destructive'>
          <Trash2 className='text-white mr-2 h-4 w-4' />
          刪除
        </Button>
      </ConfirmDialog>
    </div>
  );
};

const DailyHabitCard = ({ dailyHabit }: { dailyHabit: DailyHabit }) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <ReactCardFlip
      flipSpeedBackToFront={0.5}
      flipSpeedFrontToBack={0.5}
      isFlipped={isFlipped}
      flipDirection='horizontal'
      containerClassName='h-[12.8rem]'
    >
      <CardFront
        dailyHabit={dailyHabit}
        flip={() => {
          setIsFlipped((prev) => !prev);
          setTimeout(() => {
            setIsFlipped(false);
          }, 10000);
        }}
      />
      <CardBack
        dailyHabit={dailyHabit}
        flip={() => {
          setIsFlipped((prev) => !prev);
        }}
      />
    </ReactCardFlip>
  );
};

export default DailyHabitCard;
