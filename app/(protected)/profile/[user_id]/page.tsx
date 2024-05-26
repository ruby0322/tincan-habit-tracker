"use server";

import { getMyPosts } from "@/actions/post";
import { getFollowers, getFollowings, getUserProfile } from "@/actions/user";
import Post from "@/components/post";
import UserAvatar from "@/components/user-avatar";
import { createClient } from "@/utils/supabase/server";
import FollowBar from "./follow-bar";
import ProfileBar from "./profile-bar";

const ProfilePage = async ({ params }: { params: { user_id: string } }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  const userProfile = await getUserProfile(params.user_id as string);

  const followers = await getFollowers(user?.id as string);
  const followings = await getFollowings(user?.id as string);
  const userPosts = await getMyPosts(userProfile.user_id);

  return (
    <div className='px-4 flex flex-col gap-6'>
      <div className='flex items-center justify-center pt-8'>
        <UserAvatar
          profile={{
            avatar_url: userProfile.avatar_url,
            user_id: userProfile.user_id,
            username: userProfile.username,
          }}
          className='w-32 h-32 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'
        />
      </div>
      <div className='text-xl font-bold text-center'>
        {userProfile.username}
      </div>
      <FollowBar
        userId={userId as string}
        profileId={userProfile.user_id}
        followers={followers}
        followings={followings}
      />
      <ProfileBar
        userId={userId as string}
        profileId={params.user_id}
        username={userProfile.username as string}
        email={user?.email as string}
        isMe={user?.id == params.user_id}
        avatar={userProfile.avatar_url as string}
      />
      {/* <h2 className='text-center text-lg text-gray-600'>
        {userProfile.username} 的貼文
      </h2> */}
      <div className='w-full flex flex-col gap-2'>
        {userPosts.map((post, index) => {
          return (
            <Post
              userId={userProfile.user_id}
              key={`post-${index}`}
              post={post}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
