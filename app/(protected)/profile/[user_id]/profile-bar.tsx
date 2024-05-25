"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { checkFollowing, followUser, updateProfile } from "@/actions/user";
import { LoadingButton } from "@/components/ui/loading-button";
import UserAvatar from "@/components/user-avatar";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import EditButton from "./edit-button";

const EditCard = ({
  username,
  email,
  userId,
}: {
  username: string;
  email: string;
  userId: string;
}) => {
  const [newUsername, setNewUsername] = useState<string>("");
  const onSubmit = async () => {
    setLoading(true);
    await updateProfile(userId, newUsername);
    setNewUsername("");
    setLoading(false);
    setDialogOpen(false);
  };
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Card className='w-full'>
      <CardContent>
        <div className='flex'>
          <div className='grid w-full items-center'>
            <div className='flex flex-col py-6'>
              <Label htmlFor='name'>
                {" "}
                <Badge variant='secondary'>用戶名稱</Badge> {username}
              </Label>
            </div>
            <div className='flex flex-col'>
              <Label htmlFor='framework'>
                {" "}
                <Badge variant='secondary'>電子郵件</Badge> {email}
              </Label>
            </div>
          </div>
          <div
            onClick={() => {
              setDialogOpen(true);
            }}
            className='py-4'
          >
            <EditButton
              dialogOpen={dialogOpen}
              loading={loading}
              newUsername={newUsername}
              setNewUsername={setNewUsername}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FollowButton = ({
  user_id,
  profile_id,
}: {
  user_id: string;
  profile_id: string;
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const isFollowing = await checkFollowing(user_id, profile_id);
      setIsFollowing(isFollowing);
      setLoading(false);
    };
    fetchData();
  });
  const handleClickFollow = async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await followUser(user?.id as string, profile_id, profile_id);
    setLoading(false);
  };

  return (
    <LoadingButton
      variant={isFollowing ? "secondary" : "default"}
      loading={loading}
      onClick={handleClickFollow}
      className='w-full'
    >
      {isFollowing ? "追蹤中" : "追蹤"}
    </LoadingButton>
  );
};

const ProfileBar = ({
  userId,
  profileId,
  username,
  email,
  isMe,
  avatar,
}: {
  userId: string;
  profileId: string;
  username: string;
  email: string;
  isMe: boolean;
  avatar: string;
}) => {
  return (
    <div className='flex flex-col items-center justify-between p-4 gap-4'>
      <div className='flex flex-col w-full items-center gap-4'>
        <UserAvatar
          profile={{ avatar_url: avatar, user_id: userId, username }}
          className='w-32 h-32 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'
        />
        {isMe ? (
          <EditCard userId={userId} username={username} email={email} />
        ) : (
          <div className='px-2 w-full flex gap-4 flex-col'>
            <div className='text-xl font-bold text-center'>{username}</div>
            <FollowButton user_id={userId} profile_id={profileId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileBar;
