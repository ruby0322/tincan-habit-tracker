"use server";

import { getAllPosts, getFollowingUserPosts } from "@/actions/post";
import Post from "@/components/post";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";

const FollowingUserPosts = async ({ userId }: { userId: string }) => {
  const followingUserPosts = await getFollowingUserPosts(userId);
  return (
    <>
      {followingUserPosts.map((post, index) => {
        return <Post userId={userId} key={`post-${index}`} post={post} />;
      })}
    </>
  );
};

const PopularPosts = async ({ userId }: { userId: string }) => {
  const followingUserPosts = await getAllPosts();
  // console.log(followingUserPosts);
  return (
    <>
      {followingUserPosts.map((post, index) => {
        return <Post userId={userId} key={`post-${index}`} post={post} />;
      })}
    </>
  );
};

const SocialPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Tabs defaultValue='popular' className='w-full p-4 border-0'>
      <div className='w-full h-full'>
        <div className='flex w-full gap-4 items-center'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='popular'>熱門</TabsTrigger>
            <TabsTrigger value='friends'>追蹤</TabsTrigger>
            {/* <TabsTrigger value='community'>社群活動</TabsTrigger> */}
          </TabsList>
          {/* <Button size='icon' variant='outline' className='self-end'>
            <SquarePen className='w-12 text-gray-400 p-[2px]' />
          </Button> */}
        </div>
        <TabsContent className='overflow-y-scorll' value='friends'>
          <FollowingUserPosts userId={user?.id as string} />
        </TabsContent>
        <TabsContent value='popular'>
          <PopularPosts userId={user?.id as string} />
        </TabsContent>
        <TabsContent value='community'>目前沒有活動喔 87</TabsContent>
      </div>
    </Tabs>
  );
};

export default SocialPage;
