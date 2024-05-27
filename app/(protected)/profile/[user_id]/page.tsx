"use server";

import { getMyPosts } from "@/actions/post";
import { getFollowers, getFollowings, getUserProfile } from "@/actions/user";
import AuthButton from "@/components/auth-button";
import Post from "@/components/post";
import UserAvatar from "@/components/user-avatar";
import { createClient } from "@/utils/supabase/server";
import EditProfileDialog from "./edit-profile-dialog";
import FollowBar from "./follow-bar";
import FollowButton from "./follow-button";

const ProfilePage = async ({ params }: { params: { user_id: string } }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  const userProfile = await getUserProfile(params.user_id as string);

  const followers = await getFollowers(userProfile.user_id);
  const followings = await getFollowings(userProfile.user_id);
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
      <div className='w-full gap-1 flex items-center justify-center text-xl font-bold text-center'>
        <h3>{userProfile.username}</h3>
        {user?.id === params.user_id && (
          <EditProfileDialog userId={userId as string} />
        )}
      </div>
      <FollowBar
        userId={userId as string}
        profileId={userProfile.user_id}
        followers={followers}
        followings={followings}
      />
      {user?.id !== params.user_id ? (
        <FollowButton
          user_id={userId as string}
          profile_id={userProfile.user_id}
        />
      ) : (
        <AuthButton />
      )}
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
