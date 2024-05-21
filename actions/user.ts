"use server";

import { ProfileTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getUserProfile = async (user_id: string): Promise<ProfileTable> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw new Error(`Error fetching user profile: ${error.message}`);
  }
  if (!data || data.length === 0) {
    throw new Error(`User with ID ${user_id} not found`);
  }
  return data[0] as ProfileTable;
};

const getFollowers = async (user_id: string): Promise<ProfileTable[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("follow")
    .select(`profile:follower_id(*)`)
    .eq("following_id", user_id)
    .returns<ProfileTable[]>();
  if (error) {
    throw new Error(`Error fetching followers: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data;
};

const getFollowings = async (user_id: string): Promise<ProfileTable[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("follow")
    .select(`profile:following_id(*)`)
    .eq("follower_id", user_id)
    .returns<ProfileTable[]>();
  if (error) {
    throw new Error(`Error fetching followings: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data;
};

const searchUser = async (username_substr: string): Promise<ProfileTable[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profile")
    .select("avatar_url, user_id, username")
    .like("username", `%${username_substr}%`);
  if (error) {
    throw new Error(`Error searching users: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data;
};

const followUser = async (
  follower_id: string,
  following_id: string
): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("follow")
    .select()
    .eq("follower_id", follower_id)
    .eq("following_id", following_id);
  if (error) {
    throw new Error(`Error fetching follow data`);
  }
  if (!data || data.length == 0) {
    const { error } = await supabase
      .from("follow")
      .insert({ follower_id: follower_id, following_id: following_id });
    if (error) {
      throw new Error(`Error following user: ${error.message}`);
    }
  } else {
    const { error } = await supabase
      .from("follow")
      .delete()
      .match({ follower_id: follower_id, following_id: following_id });
    if (error) {
      throw new Error(`Error unfollowing user: ${error.message}`);
    }
  }
  return true;
};

const createProfile = async (user_id: string): Promise<boolean> => {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("Failed to retrieve authenticated user");
    }
    const finalUsername = user.email?.split("@")[0];

    const { error } = await supabase
      .from("profile")
      .insert({ user_id, username: finalUsername, avatar_url: null });

    if (error) {
      throw new Error(`Error inserting profile data: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create profile");
  }
};

const updateProfile = async (
  user_id: string,
  username?: string,
  avatar_url?: string
): Promise<boolean> => {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("Failed to retrieve authenticated user");
    }

    // Build the update object dynamically
    const updateData: { username?: string; avatar_url?: string | null } = {};

    if (username) {
      updateData.username = username || user.email?.split("@")[0];
    }

    if (avatar_url) {
      updateData.avatar_url = avatar_url || null;
    }

    const { error } = await supabase
      .from("profile")
      .update(updateData)
      .eq("user_id", user_id);

    if (error) {
      throw new Error(`Error updating profile data: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update profile");
  }
};

export {
  createProfile,
  followUser,
  getFollowers,
  getFollowings,
  getUserProfile,
  searchUser,
  updateProfile,
};
