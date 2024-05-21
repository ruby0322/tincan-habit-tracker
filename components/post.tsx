"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import Image from "next/image";
import ReactionButton from "./reaction-button";
// Assume necessary components and icons are imported correctly
import { Post as PostType } from "@/type";
import { createClient } from "@/utils/supabase/client";

const Post = ({ post }: { post: PostType }) => {
  const supabase = createClient();
  const userReaction = undefined;

  return (
    <div className='p-2 md:p-4 h-fit flex flex-col gap-4 bg-white'>
      <div className='flex items-start space-x-4'>
        <div className='flex-shrink-0'>
          <Avatar>
            <AvatarImage alt={post.username} src={post.avatar_url} />
            <AvatarFallback>{post.username}</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex-1 flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <h3 className='text-sm font-semibold text-gray-900'>
                {post.username}
              </h3>
              <p className='text-sm text-gray-500'>
                {new Date(post.created_at as string).toLocaleDateString(
                  "zh-TW"
                )}
              </p>
            </div>
          </div>
          <div className='flex gap-4'>
            <Image
              className='w-24 h-24'
              height='256'
              width='256'
              src='https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-1984271e-b00b-4b5a-8211-7617ed80ac56'
              alt='Tin can image generated by DALLE'
            />
          </div>
          <p className='mt-3 text-sm text-gray-700'>{post.content}</p>
        </div>
      </div>
      <div className='w-full pl-12'>
        <ReactionButton reaction={userReaction} postId={post.post_id} />
      </div>
    </div>
  );
};

export default Post;
