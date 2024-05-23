"use client";

import { followUser } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingButton } from "@/components/ui/loading-button";
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
    <div>
      <Card className='w-[400px] h-[60px]'>
        <CardContent>
          <div className='flex'>
            <div className='flex w-full items-center justify-between p-2'>
              <div className='flex items-center'>
                <Avatar>
                  <AvatarImage src={avatar} alt='@shadcn' />
                  <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRow;
