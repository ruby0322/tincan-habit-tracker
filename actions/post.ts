"use server";

import { Post } from "@/type";
import { createClient } from "@/utils/supabase/server";

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
  // console.log('Fetched post IDs:', postIds);

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

  // console.log('Fetched reactions:', reactions);

  const postsWithReactions: Post[] = posts.map((post) => {
    const postReactions = reactions
      .filter((reaction) => reaction.post_id === post.post_id)
      .map((reaction) => ({
        reaction_type: reaction.reaction_type,
        post_id: reaction.post_id,
        ...reaction.profile,
      }));
    const newPost = {
      ...post,
      username: post.profile.username,
      avatar_url: post.profile.avatar_url,
      picture_url: post.habit.picture_url,
      reactions: postReactions,
    };
    delete newPost.profile;
    delete newPost.habit;
    return newPost;
  });

  return postsWithReactions as Post[];
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
