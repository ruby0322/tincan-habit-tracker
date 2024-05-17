"use server";

import { PublicHabit } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getPublicHabits = async (user_id: string): Promise<PublicHabit[]> => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('publish')
        .select(`
            *,
            habit: habit_id (*)
        `)
        .eq('user_id', user_id);

    if(error){
        console.error("Error fetching all habits", error);
        return [];
    }

    return data.map(item=>({
        ...item.habit,
        joined_users: item.joined_users
    }));
};

const publishHabit = async (habit_id: string, user_id: string): Promise<boolean> => {
    const supabase = createClient();
    const { error } = await supabase
       .from('publish')
       .insert({
            user_id,
            habit_id
        });

    if(error){
        console.error("Error publishing habit", error);
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