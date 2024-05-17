"use server";

import Post from "@/components/post";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SocialPage = () => {
  return (
    <Tabs defaultValue='account' className='w-full px-4 border-0'>
      <div className='w-full h-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='friends'>朋友動態</TabsTrigger>
          <TabsTrigger value='community'>社群活動</TabsTrigger>
        </TabsList>
        <TabsContent value='friends'>
          <Post />
        </TabsContent>
        <TabsContent value='community'>目前沒有活動喔 87</TabsContent>
      </div>
    </Tabs>
  );
};

export default SocialPage;
