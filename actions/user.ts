'use server';

import { ProfileTable } from "@/type";
import { createClient } from "@/utils/supabase/server";
// OK
const getUserProfile = async (user_id: string): Promise<ProfileTable> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('user_id', user_id)
    if (error) {
        throw new Error(`Error fetching user profile: ${error.message}`);
    }
    if (!data || data.length === 0) {
        throw new Error(`User with ID ${user_id} not found`);
    }
    return data[0] as ProfileTable;
};
// OK
const getFollowers = async (user_id: string): Promise<ProfileTable[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('follow')
        .select(`
            profile:follower_id(*)
        `)
        .eq('following_id', user_id)
        .returns<ProfileTable[]>();
    if (error) {
        throw new Error(`Error fetching followers: ${error.message}`);
    }
    if (!data|| data.length === 0) {
        return [];
    }
    return data;
};

// OK
const getFollowings = async (user_id: string): Promise<ProfileTable[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('follow')
        .select(`
        profile:following_id(*)
        `)
        .eq('follower_id', user_id)
        .returns<ProfileTable[]>();
    if (error) {
        throw new Error(`Error fetching followings: ${error.message}`);
    }
    if (!data || data.length === 0) {
        return [];
    }
    return data;
};
// OK
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
// OK
const followUser = async (follower_id: string, following_id: string): Promise<boolean> => {
    const supabase = createClient();
    const {data, error} = await supabase
        .from('follow')
        .select()
        .eq('follower_id', follower_id)
        .eq('following_id', following_id);
    if (error) {
        throw new Error(`Error fetching follow data`);
    }
    if(!data || data.length == 0){
       const { error } = await supabase
        .from('follow')
        .insert({ 'follower_id': follower_id, 'following_id': following_id }) ;
        if (error) {
            throw new Error(`Error following user: ${error.message}`);
        }
    }
    else{
        const { error } = await supabase
        .from('follow')
        .delete()
        .match({ follower_id: follower_id, following_id: following_id });
        if (error) {
            throw new Error(`Error unfollowing user: ${error.message}`);
        }
    }
    return true;
};

export { getUserProfile, getFollowers, getFollowings, searchUser, followUser };
