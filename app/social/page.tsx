"use server";

import { getAllPosts } from "@/actions/post";
import Post from "@/components/post";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SocialPage = async () => {
  const posts = await getAllPosts();
  console.log(posts);
  return (
    <Tabs defaultValue='friends' className='w-full p-4 border-0'>
      <div className='w-full h-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='friends'>朋友動態</TabsTrigger>
          <TabsTrigger value='community'>社群活動</TabsTrigger>
        </TabsList>
        <TabsContent value='friends'>
          {posts.map((post, index) => {
            return <Post key={`post-${index}`} post={post} />;
          })}
        </TabsContent>
        <TabsContent value='community'>目前沒有活動喔 87</TabsContent>
      </div>
    </Tabs>
  );
};

export default SocialPage;
