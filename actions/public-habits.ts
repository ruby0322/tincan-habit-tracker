"use server";

import { PublicHabit, HabitTable, ProfileTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getPublicHabits = async (user_id: string): Promise<PublicHabit[]> => {
    const supabase = createClient();

    const { data: publishData, error: publishError} = await supabase
        .from('publish')
        .select('habit_id');
    
    if(publishError){
        console.error("Error fetching publish habits", publishError);
        return [];
    }

    const habitIds = publishData.map(p => p.habit_id);

    if(habitIds.length === 0){
        return [];
    }

    const { data: habitData, error: habitError } = await supabase
        .from('habit')
        .select('*')
        .in('habit_id', habitIds);

    if(habitError){
        console.error("Error fetching habits", habitError);
        return [];
    }

    const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('user_id, username, avatar_url')
    
    if(profileError){
        console.error("Error fetching profiles", profileError);
        return [];
    }

    const habitProfilesMap: {[key: string]: ProfileTable[]} = habitIds.reduce((acc, habitId) => {
        acc[habitId] = []
        return acc;
    }, {} as {[key: string]: ProfileTable[]});

    profileData.forEach(profile => {
        publishData.forEach(publishEntry => {
            if(publishEntry.habit_id === profile.user_id){
                habitProfilesMap[publishEntry.habit_id].push(profile);
            }
        });
    });

    return habitData.map(habit => ({
        ...habit,
        joined_users: habitProfilesMap[habit.habit_id] || [],
        has_joined: habitProfilesMap[habit.habit_id]?.some(profile => profile.user_id === user_id) || false
    }));
};

const publishHabit = async (habit_id: string): Promise<boolean> => {
    const supabase = createClient();
    // const { data: habitData, error: fetchError } = await supabase
    //     .from('habit')
    //     .select('creator_user_id')
    //     .eq('habit_id', habit_id)
    //     .single()
    
    // if(fetchError){
    //     console.error("Error fetching habit", fetchError);
    //     return false;
    // }
    
    // const { creator_user_id: user_id } = habitData;
    const { error: insertError } = await supabase
        .from('publish')
        .insert({habit_id});

    if (insertError) {
        console.error('Error publishing habit:', insertError);
        return false;
    }

    return true;
};

const unpublishHabit = async (habit_id: string): Promise<boolean> => {
    const supabase = createClient();
    const { error } = await supabase
       .from('publish')
       .delete()
       .eq('habit_id', habit_id);
    
    if(error){
        console.error("Error unpublishing habit", error);
        return false;
    }

    return true;
};

const joinHabit = async (user_id: string, habit_id: string): Promise<boolean> => {
    const supabase = createClient();
    const { data: habitData, error: fetchError } = await supabase
        .from('publish')
        .select(`
            habit_id,
            habit: habit_id(
                creator_user_id,
                title,
                picture_url,
                message,
                num_daily_goal_unit,
                daily_goal_unit,
                start_date,
                end_date,
                frequency
            )
        `)
        .eq('habit_id', habit_id)
        .single();
    
    if(fetchError){
        console.error("Error fetching habit", fetchError);
        return false;
    }

    const { habit } = habitData;

    const { error: insertError } = await supabase
        .from('habit')
        .insert({
            ...habit,
            creator_user_id: user_id,
            created_at: new Date().toISOString(),
        });

    if(insertError){
        console.error("Error joining habit", insertError);
        return false;
    }

    return true;
};

export { getPublicHabits, publishHabit, unpublishHabit, joinHabit };