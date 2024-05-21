"use server";

import { Post, PostTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getMyPosts = async (user_id: string): Promise<Post[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select()
    .eq("creator_user_id", user_id);
  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data;
};

const getAllPosts = async (): Promise<Post[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.from("post").select(`
      *,
      profile:creator_user_id (
        username,
        avatar_url
      )
    `);

  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }

  // Map the result to include username and avatar_url from the profile
  const result = data.map((post) => ({
    ...post,
    username: post.profile.username,
    avatar_url: post.profile.avatar_url,
  }));

  return result;
};

const getFollowingUserPosts = async (user_id: string): Promise<Post[]> => {
  const supabase = createClient();

  // First, get the list of users that the current user is following
  const { data: followData, error: followError } = await supabase
    .from("follow")
    .select("following_id")
    .eq("follower_id", user_id);

  if (followError) {
    throw new Error(`Error fetching follow data: ${followError.message}`);
  }
  if (!followData || followData.length === 0) {
    return [];
  }

  const followingIds = followData.map((follow) => follow.following_id);

  // Next, get the posts created by the users that the current user is following and join with profile to get username and avatar_url
  const { data: postData, error: postError } = await supabase
    .from("post")
    .select(
      `
      *,
      profile:creator_user_id (
        username,
        avatar_url
      )
    `
    )
    .in("creator_user_id", followingIds);

  if (postError) {
    throw new Error(`Error fetching posts: ${postError.message}`);
  }
  if (!postData || postData.length === 0) {
    return [];
  }

  // Map the result to include username and avatar_url from the profile
  const result = postData.map((post) => ({
    ...post,
    username: post.profile.username,
    avatar_url: post.profile.avatar_url,
  }));

  return result;
};

const createPost = async (
  creator_user_id: string,
  habit_id: string,
  content: string
): Promise<boolean> => {
  const supabase = createClient();
  const { error } = await supabase.from("post").insert({
    creator_user_id: creator_user_id,
    habit_id: habit_id,
    created_at: new Date(),
    content: content,
  });
  if (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }
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
