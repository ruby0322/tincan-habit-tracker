"user server";

import { ProfileTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getUserProfile = async (user_id: string): Promise<ProfileTable> => {
    /* your code should be placed here */
    const supabase = createClient();
    const { data, error } = await supabase
        .from('profile')
        .select('avatar_url, user_id, username')
        .eq('user_id', user_id)
    if (error) {
        throw new Error(`Error fetching user profile: ${error.message}`);
    }
    if (!data || data.length === 0) {
        throw new Error(`User with ID ${user_id} not found`);
    }
    return data[0] as ProfileTable;
};

const getFollowers = async (user_id: string): Promise<ProfileTable[]> => {
    /* your code should be placed here */
    const supabase = createClient();
    const { data, error } = await supabase
        .from('follow')
        .select(`
            follower_id, 
            profile:profile!inner(user_id, avatar_url, username)
        `)
        .eq('following_id', user_id);
    if (error) {
        throw new Error(`Error fetching followers: ${error.message}`);
    }
    if (!data || data.length === 0) {
        return [];
    }
    const profiles: ProfileTable[] = data.map(item => ({
        user_id: item.profile[0].user_id,
        avatar_url: item.profile[0].avatar_url,
        username: item.profile[0].username
    }));
    return profiles;
};

const getFollowings = async (user_id: string): Promise<ProfileTable[]> => {
    /* your code should be placed here */
    const supabase = createClient();
    const { data, error } = await supabase
        .from('follow')
        .select(`
            following_id, 
            profile:profile!inner(user_id, avatar_url, username)
        `)
        .eq('follower_id', user_id);
    if (error) {
        throw new Error(`Error fetching followings: ${error.message}`);
    }
    if (!data || data.length === 0) {
        return [];
    }
    const profiles: ProfileTable[] = data.map(item => ({
        user_id: item.profile[0].user_id,
        avatar_url: item.profile[0].avatar_url,
        username: item.profile[0].username
    }));
    return profiles;
};

const searchUser = async (username_substr: string): Promise<ProfileTable[]> => {
    /* your code should be placed here */
    const supabase = createClient();
    const { data, error } = await supabase
        .from('profile')
        .select('avatar_url, user_id, username')
        .like('username', `%${username_substr}%`);
    if (error) {
        throw new Error(`Error searching users: ${error.message}`);
    }
    if (!data || data.length === 0) {
        return [];
    }
    return data;
};

const followUser = async (follower_id: string, following_id: string): Promise<boolean> => {
    /* your code should be placed here */
    const supabase = createClient();
    const { error } = await supabase
        .from('follow')
        .insert({ follower_id: follower_id, following_id: following_id })
    if (error) {
        throw new Error(`Error following user: ${error.message}`);
    }
    return true;
};

export { getUserProfile, getFollowers, getFollowings, searchUser, followUser };
