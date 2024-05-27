"use server";

import { Profile, ProfileTable } from "@/type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

const getUserProfile = async (user_id: string): Promise<Profile> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isFollowing = await checkFollowing(user?.id as string, user_id);
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
  return { ...data[0], isFollowing };
};

const getFollowers = async (user_id: string): Promise<ProfileTable[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("follow")
    .select(`profile:follower_id(*)`)
    .eq("following_id", user_id)
    .returns<{ profile: ProfileTable }[]>();
  if (error) {
    throw new Error(`Error fetching followers: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data.map((user) => user.profile);
};

const getFollowings = async (user_id: string): Promise<ProfileTable[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("follow")
    .select(`profile:following_id(*)`)
    .eq("follower_id", user_id)
    .returns<{ profile: ProfileTable }[]>();
  if (error) {
    throw new Error(`Error fetching followings: ${error.message}`);
  }
  if (!data || data.length === 0) {
    return [];
  }
  return data.map((user) => user.profile);
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
  following_id: string,
  profile_id: string
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
  revalidatePath(`/profile/${profile_id}`);
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

    const { error } = await supabase.from("profile").insert({
      user_id,
      username: finalUsername,
      avatar_url:
        "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/avatar/d41d8cd98f00b204e9800998ecf8427e.png",
    });

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
  pictureBase64?: string
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

    console.log("pictureBase64", pictureBase64);
    if (pictureBase64) {
      console.log("uploading picture...");
      const supabase = createClient();

      /* Upload picture to supabase storage */
      const filename = uuidv4();
      const { error } = await supabase.storage
        .from("avatar")
        .upload(
          filename,
          Buffer.from(
            pictureBase64.replace(/data:image\/([^;]+);base64,/, ""),
            "base64"
          )
        );
      console.log(error);
      /* Retrieve avatar URL */
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatar").getPublicUrl(filename);
      updateData.avatar_url = publicUrl;
      console.log("done uploading picture...");
      console.log(publicUrl);
    }

    const { error } = await supabase
      .from("profile")
      .update(updateData)
      .eq("user_id", user_id);

    if (error) {
      throw new Error(`Error updating profile data: ${error.message}`);
    }
    revalidatePath(`/profiel/${user_id}`);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update profile");
  }
};

const checkFollowing = async (
  userA_id: string,
  userB_id: string
): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("follow")
    .select(`*`)
    .match({ follower_id: userA_id, following_id: userB_id });
  if (error) {
    throw new Error(`Error fetching follow: ${error.message}`);
  }
  if (data.length === 0) {
    return false;
  }
  return true;
};

const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return true;
};

export {
  checkFollowing,
  createProfile,
  followUser,
  getFollowers,
  getFollowings,
  getUserProfile,
  searchUser,
  signOut,
  updateProfile,
};
