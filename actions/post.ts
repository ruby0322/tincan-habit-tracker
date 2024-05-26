"use server";

import { DailyHabit, Post } from "@/type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { generateDailyHabitPostContent } from "./generation";

const getMyPosts = async (user_id: string): Promise<Post[]> => {
  const supabase = createClient();
  const { data: posts, error: postError } = await supabase
    .from("post")
    .select(
      `
      *,
      profile:creator_user_id (
        username,
        avatar_url
      ),
      habit:habit_id (
        picture_url
      )
    `
    )
    .eq("creator_user_id", user_id);

  if (postError) {
    throw new Error(`Error fetching posts: ${postError.message}`);
  }
  if (!posts || posts.length === 0) {
    return [];
  }

  const postIds = posts.map((post) => post.post_id);
  const habitIds = posts.map((post) => post.habit_id);

  const { data: reactions, error: reactionError } = await supabase
    .from("react_to")
    .select(
      `
      reaction_type,
      post_id,
      profile:user_id (
        avatar_url,
        user_id,
        username
      )
    `
    )
    .in("post_id", postIds);

  if (reactionError) {
    throw new Error(`Error fetching reactions: ${reactionError.message}`);
  }


  const { data: records, error: recordsError } = await supabase
    .from("record")
    .select("habit_id, num_completed_unit, created_at")
    .in("habit_id", habitIds);

  if (recordsError) {
    throw new Error(`Error fetching records: ${recordsError.message}`);
  }

  const habitRecordMap: { [key: number]: { total: number, daily: number } } = {};
  const today = new Date().toISOString().split('T')[0];

  records.forEach(record => {
    const recordDate = record.created_at.split('T')[0];
    if (!habitRecordMap[record.habit_id]) {
      habitRecordMap[record.habit_id] = { total: 0, daily: 0 };
    }
    habitRecordMap[record.habit_id].total += record.num_completed_unit;
    if (recordDate === today) {
      habitRecordMap[record.habit_id].daily += record.num_completed_unit;
    }
  });

  const postsWithReactions: Post[] = posts.map((post) => {
    const postReactions = reactions
      .filter((reaction) => reaction.post_id === post.post_id)
      .map((reaction) => ({
        reaction_type: reaction.reaction_type,
        post_id: reaction.post_id,
        ...reaction.profile,
      }));
    const habitData = habitRecordMap[post.habit_id] || { total: 0, daily: 0 };
    const newPost = {
      ...post,
      username: post.profile.username,
      avatar_url: post.profile.avatar_url,
      picture_url: post.habit.picture_url,
      reactions: postReactions,
      num_completed_daily_goal_unit: habitData.daily,
      num_total_completed_unit: habitData.total,
    };
    delete newPost.profile;
    delete newPost.habit;
    return newPost;
  });

  return postsWithReactions;
};

const getAllPosts = async (): Promise<Post[]> => {
  const supabase = createClient();
  const { data: posts, error: postError } = await supabase
    .from("post")
    .select(
      `
      *,
      profile:creator_user_id (
        username,
        avatar_url
      ),
      habit:habit_id (
        picture_url
      )
    `
    );

  if (postError) {
    throw new Error(`Error fetching posts: ${postError.message}`);
  }
  if (!posts || posts.length === 0) {
    return [];
  }

  const postIds = posts.map((post) => post.post_id);
  const habitIds = posts.map((post) => post.habit_id);

  const { data: reactions, error: reactionError } = await supabase
    .from("react_to")
    .select(
      `
      reaction_type,
      post_id,
      profile:user_id (
        avatar_url,
        user_id,
        username
      )
    `
    )
    .in("post_id", postIds);

  if (reactionError) {
    throw new Error(`Error fetching reactions: ${reactionError.message}`);
  }

  const { data: records, error: recordsError } = await supabase
    .from("record")
    .select("habit_id, num_completed_unit, created_at")
    .in("habit_id", habitIds);

  if (recordsError) {
    throw new Error(`Error fetching records: ${recordsError.message}`);
  }

  const habitRecordMap: { [key: number]: { total: number, daily: number } } = {};
  const today = new Date().toISOString().split('T')[0];

  records.forEach(record => {
    const recordDate = record.created_at.split('T')[0];
    if (!habitRecordMap[record.habit_id]) {
      habitRecordMap[record.habit_id] = { total: 0, daily: 0 };
    }
    habitRecordMap[record.habit_id].total += record.num_completed_unit;
    if (recordDate === today) {
      habitRecordMap[record.habit_id].daily += record.num_completed_unit;
    }
  });

  const postsWithReactions: Post[] = posts.map((post) => {
    const postReactions = reactions
      .filter((reaction) => reaction.post_id === post.post_id)
      .map((reaction) => ({
        reaction_type: reaction.reaction_type,
        post_id: reaction.post_id,
        ...reaction.profile,
      }));
    const habitData = habitRecordMap[post.habit_id] || { total: 0, daily: 0 };
    const newPost = {
      ...post,
      username: post.profile.username,
      avatar_url: post.profile.avatar_url,
      picture_url: post.habit.picture_url,
      reactions: postReactions,
      num_completed_daily_goal_unit: habitData.daily,
      num_total_completed_unit: habitData.total,
    };
    delete newPost.profile;
    delete newPost.habit;
    return newPost;
  });

  return postsWithReactions.sort(
    (a, b) =>
      new Date(b.created_at as string).getTime() -
      new Date(a.created_at as string).getTime()
  );
};


const getFollowingUserPosts = async (user_id: string): Promise<Post[]> => {
  const supabase = createClient();

  const { data: followData, error: followError } = await supabase
    .from("follow")
    .select("following_id")
    .eq("follower_id", user_id);

  if (followError) {
    throw new Error(`Error fetching following users: ${followError.message}`);
  }

  if (!followData || followData.length === 0) {
    return [];
  }

  const followingUserIds = followData.map((follow) => follow.following_id);

  const allPosts: Post[] = [];
  for (const followingUserId of followingUserIds) {
    try {
      const userPosts = await getMyPosts(followingUserId);
      allPosts.push(...userPosts);
    } catch (error) {
      console.error(`Error fetching posts for user ${followingUserId}`);
    }
  }
  return allPosts.sort(
    (a, b) =>
      new Date(b.created_at as string).getTime() -
      new Date(a.created_at as string).getTime()
  );
};

const createPost = async (dailyHabit: DailyHabit): Promise<boolean> => {
  const supabase = createClient();
  const { error } = await supabase.from("post").insert({
    creator_user_id: dailyHabit.creator_user_id,
    habit_id: dailyHabit.habit_id,
    created_at: new Date(),
    content: await generateDailyHabitPostContent(dailyHabit),
  });
  if (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }
  revalidatePath("/social");
  return true;
};

const deletePost = async (post_id: string): Promise<boolean> => {
  const supabase = createClient();
  const { error } = await supabase.from("post").delete().eq("post_id", post_id);
  if (error) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
  return true;
};

export {
  createPost,
  deletePost,
  getAllPosts,
  getFollowingUserPosts,
  getMyPosts,
};
