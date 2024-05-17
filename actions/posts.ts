"use server";

import { PostTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getMyPosts = async (user_id: string): Promise<PostTable[]> => {
  /* your code should be placed here */
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select("content, created_at, creator_user_id, habit_id, post_id")
    .eq("user_id", user_id);
  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data;
};

const getOtherPosts = async (user_id: string): Promise<PostTable[]> => {
  /* your code should be placed here */
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select("content, created_at, creator_user_id, habit_id, post_id")
    .neq("user_id", user_id);
  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data;
};

const createPost = async (
  post_id: string,
  creator_user_id: string,
  habit_id: string,
  post_time: string,
  content: string
): Promise<boolean> => {
  /* your code should be placed here */
  const supabase = createClient();
  const { error } = await supabase
    .from("post")
    .insert({
      post_id: post_id,
      creator_user_id: creator_user_id,
      habit_id: habit_id,
      post_time: post_time,
      content: content,
    });
  if (error) {
    throw new Error(`Error creating post: ${error.message}`);
  }
  return true;
};

const deletePost = async (post_id: string): Promise<boolean> => {
  /* your code should be placed here */
  const supabase = createClient();
  const { error } = await supabase.from("post").delete().eq("post_id", post_id);
  if (error) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
  return true;
};

export { createPost, deletePost, getMyPosts, getOtherPosts };
