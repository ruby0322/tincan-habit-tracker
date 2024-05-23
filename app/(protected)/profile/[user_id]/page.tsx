"use server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  checkFollowing,
  getFollowers,
  getFollowings,
  getUserProfile,
} from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import ProfileBar from "./profile-bar";
import UserRow from "./user-row";

const ProfilePage = async ({ params }: { params: { user_id: string } }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  const userProfile = await getUserProfile(userId as string);

  const followers = await getFollowers(user?.id as string);
  const followings = await getFollowings(user?.id as string);

  return (
    <div>
      {/* { userId === params.user_id && } */}
      {/* 上半部（個人資料） */}
      <ProfileBar
        userId={userId as string}
        username={userProfile.username as string}
        email={user?.email as string}
        isMe={user?.id == params.user_id}
        avatar={userProfile.avatar_url as string}
      />
      {/* 下半部（追蹤） */}
      <div className='p-4'>
        <Tabs defaultValue='follower' className='w-[400px]'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='follower'>粉絲</TabsTrigger>
            <TabsTrigger value='following'>追蹤中</TabsTrigger>
          </TabsList>
          <TabsContent value='follower'>
            {followers.map(async (follower) => {
              const isFollowing = await checkFollowing(
                user?.id as string,
                follower.user_id
              );
              return (
                <UserRow
                  key={`user-row-${follower.user_id}`}
                  username={follower.username}
                  user_id={follower.user_id}
                  avatar={follower.avatar_url as string}
                  isFollowing={isFollowing}
                  profile_id={params.user_id}
                />
              );
            })}
          </TabsContent>
          <TabsContent value='following'>
            {followings.map(async (following) => {
              const isFollowing = await checkFollowing(
                user?.id as string,
                following.user_id
              );
              return (
                <UserRow
                  key={`user-row-${following.user_id}`}
                  username={following.username}
                  user_id={following.user_id}
                  avatar={following.avatar_url as string}
                  isFollowing={isFollowing}
                  profile_id={params.user_id}
                />
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
