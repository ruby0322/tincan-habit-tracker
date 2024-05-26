import { createClient } from "@/utils/supabase/server";
import {
  AlarmClock,
  AreaChart,
  MessageCircleHeart,
  PlusIcon,
  User,
} from "lucide-react";
import Link from "next/link";

const Tabbar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className='sm:w-[28rem] w-full fixed sm:bottom-[2vh] bottom-0 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] z-50 flex w-full items-center justify-center bg-white shadow-lg'>
      <div className='flex h-[4.5rem] w-full items-center gap-2 justify-between px-12'>
        <Link href='/social' className='text-gray-400 text-lg text-center'>
          <MessageCircleHeart />
        </Link>
        <Link href='/manage' className='text-gray-400 text-lg text-center'>
          <AlarmClock />
        </Link>
        <Link href='/create' className='text-gray-400 text-lg text-center'>
          <div className='cursor-pointer relative flex items-center justify-center'>
            <div className='bg-gray-900 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] absolute -top-12 flex h-14 w-14 items-center justify-center rounded-full shadow-lg'>
              <PlusIcon className='h-6 w-6 text-gray-100' />
            </div>
          </div>
        </Link>
        <Link href='/report' className='text-gray-400 text-lg text-center'>
          <AreaChart />
        </Link>
        <Link
          href={`/profile/${user?.id}`}
          className='text-gray-400 text-lg text-center'
        >
          <User />
        </Link>
      </div>
    </div>
  );
};

export default Tabbar;
