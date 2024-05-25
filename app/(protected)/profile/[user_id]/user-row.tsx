"use client";

import { followUser } from "@/actions/user";
import { LoadingButton } from "@/components/ui/loading-button";
import UserAvatar from "@/components/user-avatar";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

const UserRow = ({
  username,
  user_id,
  avatar,
  isFollowing,
  profile_id,
}: {
  username: string;
  user_id: string;
  avatar: string;
  isFollowing: Boolean;
  profile_id: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleClickFollow = async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await followUser(user?.id as string, user_id, profile_id);
    setLoading(false);
  };

  return (
    <div className='w-full flex h-full px-2 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-sm'>
      <div className='flex w-full items-center justify-between p-2'>
        <div className='flex items-center'>
          <UserAvatar
            profile={{ avatar_url: avatar, user_id: user_id, username }}
            className='w-10 h-10'
          />
          <div className='ml-4'>{username}</div>
        </div>
        {isFollowing ? (
          <LoadingButton
            loading={loading}
            variant='secondary'
            onClick={handleClickFollow}
          >
            追蹤中
          </LoadingButton>
        ) : (
          <LoadingButton
            loading={loading}
            size='sm'
            onClick={handleClickFollow}
          >
            追蹤
          </LoadingButton>
        )}
      </div>
    </div>
  );
};

export default UserRow;
