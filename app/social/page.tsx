"use server";

import { getAllPosts } from "@/actions/post";
import Post from "@/components/post";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";

const SocialPage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const posts = await getAllPosts();

  return (
    <Tabs defaultValue='friends' className='w-full p-4 border-0'>
      <div className='w-full h-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='friends'>追蹤</TabsTrigger>
          <TabsTrigger value='popular'>熱門</TabsTrigger>
          <TabsTrigger value='community'>社群活動</TabsTrigger>
        </TabsList>
        <TabsContent className='overflow-y-scorll' value='friends'>
          {posts.map((post, index) => {
            return (
              <Post
                userId={user?.id as string}
                key={`post-${index}`}
                post={post}
              />
            );
          })}
        </TabsContent>
        <TabsContent value='popular'>施工中 87</TabsContent>
        <TabsContent value='community'>目前沒有活動喔 87</TabsContent>
      </div>
    </Tabs>
  );
};

export default SocialPage;
