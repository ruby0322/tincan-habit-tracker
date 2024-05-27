"use client";
import { deleteHabit } from "@/actions/habit";
import { Progress } from "@/components/ui/progress";
import { HabitTable } from "@/type";
import { AreaChart, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import ReactCardFlip from "react-card-flip";
import ConfirmDialog from "./confirm-dialog";
import { Button } from "./ui/button";

const CardFront = ({
  habit,
  flip,
}: {
  habit: HabitTable;
  flip: () => void;
}) => {
  return (
    <div
      onClick={flip}
      className='bg-white rounded-lg shadow-sm py-4 pb-0 px-0 h-full flex-col flex justify-between items-center gap-2'
    >
      <h2 className='w-full text-center text-base font-semibold truncate ...'>
        {habit.title}
      </h2>
      <div>
        <Image
          alt={`Picture of ${habit.title}`}
          className='w-24 h-24 rounded-lg'
          width='1024'
          height='1024'
          src={habit.picture_url}
        />
      </div>
      <div className='flex items-center w-full justify-between px-4'>
        <div className='rounded-full border-2 border-gray-100 p-1'>
          <Minus className='opacity-20 w-4 h-4 rounded-full' />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='w-full text-center text-sm'>- / -</p>
          <p className='w-full text-center text-xs'>
            ({habit.daily_goal_unit})
          </p>
        </div>
        <div className='rounded-full border-2 border-gray-100 p-1'>
          <Plus className='opacity-20 w-4 h-4 rounded-full' />
        </div>
      </div>
      <Progress className='w-full h-2 rounded rounded-t-none' value={100} />
    </div>
  );
};

const CardBack = ({ habit, flip }: { habit: HabitTable; flip: () => void }) => {
  const router = useRouter();
  const onDeleteConfirm = async () => {
    await deleteHabit(habit.habit_id);
  };
  const onReportClick = async (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/report/${habit.habit_id}`);
  };
  return (
    <div
      onClick={flip}
      className='bg-white rounded-lg shadow-sm py-4 pb-0 px-0 h-full flex-col flex justify-center items-center gap-2 transition-transform duration-300 ease-in-out transform rotate-3 overflow-visible'
    >
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
        text={`你確定要永久刪除 ${habit.title} 習慣嗎？`}
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

const HabitCard = ({ habit }: { habit: HabitTable }) => {
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
        habit={habit}
        flip={() => {
          setIsFlipped((prev) => !prev);
          setTimeout(() => {
            setIsFlipped(false);
          }, 10000);
        }}
      />
      <CardBack
        habit={habit}
        flip={() => {
          setIsFlipped((prev) => !prev);
        }}
      />
    </ReactCardFlip>
  );
};

export default HabitCard;
