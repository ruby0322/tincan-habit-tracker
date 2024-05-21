"use server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersIcon } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className='w-full px-4 py-8 md:py-12'>
      <div className='flex items-center justify-between mb-6 md:mb-8'>
        <div className='flex items-center space-x-4'>
          <Avatar className='h-12 w-12 md:h-16 md:w-16'>
            <AvatarImage alt='@shadcn' src='/placeholder-avatar.jpg' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className='text-lg font-semibold md:text-xl'>John Doe</h2>
            <div className='flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400'>
              <div className='flex items-center space-x-1'>
                <UsersIcon className='h-4 w-4' />
                <span>1.2K Followers</span>
              </div>
              <div className='flex items-center space-x-1'>
                <UsersIcon className='h-4 w-4' />
                <span>345 Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
