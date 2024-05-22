import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient } from "@/utils/supabase/server";
import {
  AlarmClock,
  AreaChart,
  CalendarPlus2,
  MessageCircleHeart,
  PlusIcon,
  SquarePen,
  User,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Tabbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className='sm:w-[28rem] w-full fixed sm:bottom-[2vh] bottom-0 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] z-50 flex h-16 w-full items-center justify-center bg-white shadow-lg'>
      <div className='flex h-[4.5rem] w-full items-center gap-2 justify-between px-12'>
        <Link href='/social' className='text-gray-400 text-lg text-center'>
          <MessageCircleHeart />
        </Link>
        <Link href='/manage' className='text-gray-400 text-lg text-center'>
          <AlarmClock />
        </Link>
        <div className='cursor-pointer relative flex items-center justify-center'>
          <div className='shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] absolute -top-12 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 shadow-lg transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950'>
            <Popover>
              <PopoverTrigger asChild>
                <PlusIcon className='h-6 w-6 text-gray-100' />
              </PopoverTrigger>
              <PopoverContent
                sideOffset={12}
                className='flex gap-4 y-10 w-fit bg-sky-500/0 border-0 shadow-none'
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href='/create'>
                        <div className='p-4 bg-gray-100 rounded-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer'>
                          <CalendarPlus2 />
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>建立習慣</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href='/social'>
                        <div className='p-4 bg-gray-100 rounded-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] cursor-pointer'>
                          <SquarePen />
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>建立貼文</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Link href='/report' className='text-gray-400 text-lg text-center'>
          <AreaChart />
        </Link>
        <Link
          href={`/profile/${user?.id as string}`}
          className='text-gray-400 text-lg text-center'
        >
          <User />
        </Link>
      </div>
    </div>
  );
};

export default Tabbar;
