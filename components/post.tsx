"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { useState } from "react";
import ReactionButton from "./reaction-button";
// Assume necessary components and icons are imported correctly

const Post = () => {
  const [showReactions, setShowReactions] = useState(false);
  return (
    <div className='p-2 md:p-4 h-fit flex flex-col gap-4 bg-white rounded-lg shadow-sm'>
      <div className='flex items-start space-x-4'>
        <div className='flex-shrink-0'>
          <Avatar>
            <AvatarImage alt='@jaredpalmer' src='/placeholder-avatar.jpg' />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex-1'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-sm font-semibold text-gray-900'>貓貓貓</h3>
              <p className='text-sm text-gray-500'>
                <time dateTime='2023-04-14T09:12:34'>Apr 14, 2023</time>
              </p>
            </div>
          </div>
          <p className='mt-3 text-sm text-gray-700'>
            巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉
          </p>
        </div>
      </div>
      <ReactionButton />
    </div>
  );
};

export default Post;
