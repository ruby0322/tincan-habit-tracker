"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import Image from "next/image";
import ReactionButton, { REACTIONS } from "./reaction-button";
// Assume necessary components and icons are imported correctly
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post as PostType, Reaction, ReactionType } from "@/type";
import { useState } from "react";
import UserAvatar from "./user-avatar";

const ReactionRow = ({ reaction }: { reaction: Reaction }) => {
  const { reaction_type, ...profile } = reaction;
  return (
    <div className='w-full flex gap-4 px-4 items-center justify-between'>
      <div className='flex gap-4 items-center'>
        <UserAvatar profile={profile} className='w-12 h-12' />
        <div className='flex items-center justify-between'>
          <div className='flex gap-2'>
            <h3 className='text-lg text-gray-900'>{reaction.username}</h3>
          </div>
        </div>
      </div>
      {REACTIONS[reaction.reaction_type]}
    </div>
  );
};

const ReactionDrawer = ({ reactions }: { reactions: Reaction[] }) => {
  return (
    <Tabs
      defaultValue='all'
      className='w-full items-center justify-center flex flex-col  p-4 border-0'
    >
      <div className='w-full h-full max-w-[45rem]'>
        <div className='p-2 text-center text-base items-center text-gray-700 flex w-full'>
          {reactions.length} 個人按了這篇貼文表情
        </div>
        <TabsList className='mb-4 grid w-full h-fit gap-1 grid-cols-3 md:grid-cols-6'>
          {Object.keys(REACTIONS).map((reactionType) => {
            return (
              <TabsTrigger
                key={`reaction-tab-${reactionType}`}
                value={reactionType}
                className='flex gap-2 font-bold'
              >
                {REACTIONS[reactionType]}
                <div>
                  {
                    reactions.filter(
                      (reaction) =>
                        (reaction.reaction_type as string) === reactionType
                    ).length
                  }
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent className='flex flex-col gap-4' value='all'>
          {reactions.map((reaction, index) => {
            return (
              <ReactionRow key={`reaction-row-${index}`} reaction={reaction} />
            );
          })}
        </TabsContent>
        {Object.keys(REACTIONS).map((reactionType) => {
          return (
            <TabsContent
              className='flex flex-col gap-4'
              key={`${reactionType}-reaction-tab`}
              value={reactionType}
            >
              {reactions
                .filter((reaction) => reaction.reaction_type === reactionType)
                .map((reaction, index) => {
                  return (
                    <ReactionRow
                      key={`reaction-row-${index}`}
                      reaction={reaction}
                    />
                  );
                })}
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
};

const Post = ({ post, userId }: { post: PostType; userId: string }) => {
  const [userReaction, setUserReaction] = useState<Reaction | undefined>(
    post.reactions.filter((reaction) => reaction.user_id === userId).at(0)
  );

  const optimisticReactUpdate = async (reactionType: ReactionType) => {
    if (userReaction && userReaction.reaction_type === reactionType) {
      setUserReaction(undefined);
    } else {
      setUserReaction({
        username: "",
        user_id: userId,
        avatar_url: "",
        reaction_type: reactionType,
      });
    }
  };

  return (
    <div className='p-2 md:p-4 h-fit flex flex-col gap-4 bg-white'>
      <div className='flex items-start space-x-4'>
        <div className='flex-shrink-0'>
          <UserAvatar
            profile={{
              username: post.username,
              user_id: post.creator_user_id,
              avatar_url: post.avatar_url,
            }}
            className='w-10 h-10'
          />
        </div>
        <div className='flex-1 flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <h3 className='text-sm font-semibold text-gray-900'>
                {post.username}
              </h3>
              <p className='text-sm text-gray-500'>
                {new Date(post.created_at as string).toLocaleDateString(
                  "zh-TW",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
          </div>
          <div className='flex gap-4'>
            <Image
              className='w-24 h-24'
              height='256'
              width='256'
              priority={true}
              src={post.picture_url}
              alt='Tin can image generated by DALLE'
            />
          </div>
          <p className='mt-3 text-sm text-gray-700'>{post.content}</p>
        </div>
      </div>
      <div className='w-full pl-12 flex gap-4 items-center'>
        <ReactionButton
          onReact={optimisticReactUpdate}
          userReaction={userReaction}
          postId={post.post_id}
        />
        <Drawer>
          <DrawerTrigger asChild>
            <div className='cursor-pointer font-bold text-base text-gray-700 flex gap-1'>
              {post.reactions.length > 0 ? (
                <>
                  <div className='underline'>
                    {userReaction
                      ? "你" +
                        (post.reactions.length > 1
                          ? `和其他 ${post.reactions.length - 1} 個人`
                          : "")
                      : `${post.reactions.length} 個人`}
                  </div>
                  <div>按了這篇貼文表情</div>
                </>
              ) : (
                <div>成為第一個按篇貼文表情的人</div>
              )}
            </div>
          </DrawerTrigger>
          <DrawerContent className='min-h-[50vh] flex flex-col overflow-y-scroll'>
            <ReactionDrawer reactions={post.reactions} />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Post;
