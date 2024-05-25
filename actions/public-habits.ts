"use server";

import { HabitTable, ProfileTable, PublicHabit, JoinTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getPublicHabits = async (user_id: string): Promise<PublicHabit[]> => {
  const supabase = createClient();

  // 1. Fetch all public habits
  const { data: habitsData, error: habitsError } = await supabase
    .from("habit")
    .select("*")
    .eq("is_public", true);

  if (habitsError) {
    console.error("Error fetching public habits", habitsError);
    return [];
  }

  if (!habitsData || habitsData.length === 0) {
    console.log("No public habits found");
    return [];
  }

  const habitIds = habitsData.map((habit: HabitTable) => habit.habit_id);

  // 2. Fetch profiles of users who joined each public habit
  const { data: joinedData, error: joinedError } = await supabase
    .from("join")
    .select("habit_instance_id, user_id")
    .in("habit_instance_id", habitIds);

  if (joinedError) {
    console.error("Error fetching joined users", joinedError);
    return [];
  }

  const userIds = joinedData.map((join: { habit_instance_id: string; user_id: string}) => join.user_id);

  // Fetch profile details for the joined users
  const { data: profilesData, error: profilesError } = await supabase
    .from("profile")
    .select("user_id, username, avatar_url")
    .in("user_id", userIds);

  if (profilesError) {
    console.error("Error fetching user profiles", profilesError);
    return [];
  }

  // Create a map of habit_id to joined users' profiles
  const profilesMap: { [key: string]: ProfileTable[] } = joinedData.reduce((acc: { [key: string]: ProfileTable[] }, join) => {
    if (!acc[join.habit_instance_id]) {
      acc[join.habit_instance_id] = [];
    }
    const userProfile = profilesData.find((profile: ProfileTable) => profile.user_id === join.user_id);
    if (userProfile) {
      acc[join.habit_instance_id].push(userProfile);
    }
    return acc;
  }, {});

  // 3. Check if the current user has joined each public habit
  const { data: userJoinedData, error: userJoinedError } = await supabase
    .from("join")
    .select("habit_instance_id")
    .eq("user_id", user_id);

  if (userJoinedError) {
    console.error("Error fetching user's joined habits", userJoinedError);
    return [];
  }

  const userJoinedHabitIds = userJoinedData.map((join: { habit_instance_id: string }) => join.habit_instance_id);

  // 4. Combine data to create the final public habits result
  const publicHabits: PublicHabit[] = habitsData.map((habit: HabitTable) => ({
    ...habit,
    joined_users: profilesMap[habit.habit_id] || [],
    has_joined: userJoinedHabitIds.includes(habit.habit_id)
  }));

  return publicHabits;
};

const publishHabit = async (habit_id: string): Promise<boolean> => {
  const supabase = createClient();

  const { error: updateError } = await supabase
    .from("habit")
    .update({ is_public: true })
    .eq("habit_id", habit_id);

  if (updateError) {
    console.error("Error publishing habit:", updateError);
    return false;
  }

  return true;
};

const unpublishHabit = async (habit_id: string): Promise<boolean> => {
  const supabase = createClient();

  const { error: updateError } = await supabase
    .from("habit")
    .update({ is_public: false })
    .eq("habit_id", habit_id);

  if (updateError) {
    console.error("Error unpublishing habit", updateError);
    return false;
  }

  return true;
};

const joinHabit = async (
  user_id: string,
  habit_id: string
): Promise<boolean> => {
  const supabase = createClient();
  const { data: habitData, error: fetchError } = await supabase
    .from("habit")
    .select("*")
    .eq("habit_id", habit_id)
    .single();

  if (fetchError) {
    console.error("Error fetching habit", fetchError);
    return false;
  }

  console.log(habit_id);
  
  if (!habitData || !habitData.is_public) {
    console.error("Habit is not public or does not exist");
    return false;
  }
  
  const { error: insertError } = await supabase.from("join").insert({
    user_id,
    habit_id: habitData.habit_id,
    habit_instance_id: habitData.habit_id, 
  });

  if (insertError) {
    console.error("Error joining habit", insertError);
    return false;
  }

  return true;
};

export { getPublicHabits, joinHabit, publishHabit, unpublishHabit };
