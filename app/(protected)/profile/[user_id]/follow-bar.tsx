"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ProfileTable } from "@/type";
import { useState } from "react";
import UserRow from "./user-row";

const FollowerDrawer = ({
  followers,
  profileId,
  userId,
}: {
  followers: ProfileTable[];
  profileId: string;
  userId: string;
}) => {
  return (
    <div className='w-full h-full max-w-[45rem] p-4'>
      {followers.map((follower) => {
        return (
          <UserRow
            key={`user-row-${follower.user_id}`}
            username={follower.username}
            user_id={follower.user_id}
            avatar={follower.avatar_url as string}
            profile_id={profileId}
          />
        );
      })}
    </div>
  );
};

const FollowingDrawer = ({
  followings,
  profileId,
  userId,
}: {
  followings: ProfileTable[];
  profileId: string;
  userId: string;
}) => {
  return (
    <div className='w-full h-full max-w-[45rem] p-4'>
      {followings.map((following) => {
        return (
          <UserRow
            key={`user-row-${following.user_id}`}
            username={following.username}
            user_id={following.user_id}
            avatar={following.avatar_url as string}
            profile_id={profileId}
          />
        );
      })}
    </div>
  );
};

const FollowBar = ({
  followers,
  followings,
  profileId,
  userId,
}: {
  followers: ProfileTable[];
  followings: ProfileTable[];
  profileId: string;
  userId: string;
}) => {
  const [followerDrawerOpen, setFollowerDrawerOpen] = useState<boolean>(false);
  const [followingDrawerOpen, setFollowingDrawerOpen] =
    useState<boolean>(false);
  return (
    <div className='w-full justify-between px-12 flex gap-6'>
      <Drawer>
        <DrawerTrigger asChild>
          <div className='flex flex-col items-center'>
            <h3 className='text-xs font-semibold'>追蹤者</h3>
            <span className='text-2xl font-bold'>{followers.length}</span>
          </div>
        </DrawerTrigger>
        <DrawerContent className='min-h-[50vh] flex flex-col items-center overflow-y-scroll'>
          <FollowerDrawer
            followers={followers}
            profileId={profileId}
            userId={userId}
          />
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger asChild>
          <div className='flex flex-col items-center'>
            <h3 className='text-xs font-semibold'>追蹤中</h3>
            <span className='text-2xl font-bold'>{followings.length}</span>
          </div>
        </DrawerTrigger>
        <DrawerContent className='min-h-[50vh] flex flex-col  items-center overflow-y-scroll'>
          <FollowingDrawer
            followings={followings}
            profileId={profileId}
            userId={userId}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FollowBar;
