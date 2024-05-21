"use server";

import { getAllPosts } from "@/actions/post";
import Post from "@/components/post";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post as PostType } from "@/type";
import { createClient } from "@/utils/supabase/server";

const FAKE_POSTS: PostType[] = [
  {
    content: "這是一篇假的文章",
    created_at: new Date().toLocaleDateString("zh-TW"),
    creator_user_id: "92a75107-0564-4dae-8be0-29665aaccf2b",
    habit_id: "877",
    post_id: "8777",
    username: "Ruby",
    avatar_url:
      "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/avatar/c32698eaf8d07722f60e40722c9cf56c.jpeg",
    picture_url:
      "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-1984271e-b00b-4b5a-8211-7617ed80ac56",
    reactions: [
      {
        username: "Fluffy",
        reactionType: "meow",
        user_id: "87",
        avatar_url:
          "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-85929a97-b063-4e57-bab0-76e43d3cec13",
      },
      {
        username: "Ja",
        reactionType: "laugh",
        user_id: "87",
        avatar_url:
          "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-c8f49c6a-b85e-4117-be88-3fe17bf6291a",
      },
      {
        username: "Min",
        reactionType: "rage",
        user_id: "87",
        avatar_url:
          "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-d13892e4-b3f9-4e90-9810-889e2fbf596a",
      },
    ],
  },
  {
    content: "這是第二篇假的文章",
    created_at: new Date().toLocaleDateString("zh-TW"),
    creator_user_id: "87",
    habit_id: "877",
    post_id: "8777",
    username: "Min",
    avatar_url:
      "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-d13892e4-b3f9-4e90-9810-889e2fbf596a",
    picture_url:
      "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-1984271e-b00b-4b5a-8211-7617ed80ac56",
    reactions: [
      {
        username: "Fluffy",
        reactionType: "meow",
        user_id: "87",
        avatar_url:
          "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-85929a97-b063-4e57-bab0-76e43d3cec13",
      },
      {
        username: "Ja",
        reactionType: "laugh",
        user_id: "87",
        avatar_url:
          "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-c8f49c6a-b85e-4117-be88-3fe17bf6291a",
      },
      {
        username: "Ruby",
        reactionType: "rage",
        user_id: "92a75107-0564-4dae-8be0-29665aaccf2b",
        avatar_url:
          "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/avatar/c32698eaf8d07722f60e40722c9cf56c.jpeg",
      },
    ],
  },
];

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
        <TabsContent value='friends'>
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
