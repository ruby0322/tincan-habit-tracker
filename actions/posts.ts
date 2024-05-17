"use server";

import { PostTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getMyPosts = async (user_id: string): Promise<PostTable[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select()
    .eq("user_id", user_id);
  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data;
};

const getAllPosts = async (user_id: string): Promise<PostTable[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select();
  if (error) {
    throw new Error(`Error fetching posts: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data;
};

const createPost = async (
  creator_user_id: string,
  habit_id: string,
  content: string,
  post_id: string,
): Promise<boolean> => {
  const supabase = createClient();
  const { error } = await supabase.from("post").insert({
    creator_user_id: creator_user_id,
    habit_id: habit_id,
    created_at: new Date(),
    content: content,
    post_id: post_id,
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

export { createPost, deletePost, getMyPosts, getAllPosts };
