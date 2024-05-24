"use server";

import { HabitTable, ProfileTable, PublicHabit, PublishTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getPublicHabits = async (user_id: string): Promise<PublicHabit[]> => {
  const supabase = createClient();

  // 1. 先找到所有 public habits
  const { data: publishData, error: publishError } = await supabase
    .from("publish")
    .select("habit_id");

  if(publishError){
    console.log("Error fetching public habits", publishError);
    return [];
  }

  if(!publishData || publishData.length === 0){
    console.log("No public habits found");
    return [];
  }

  const habitsIds = publishData.map((publish: { habit_id: string }) => publish.habit_id);
  // console.log("habitsIds: ", habitsIds);

  // 2. 找到 public habits 各自的詳細資料
  const { data: habits, error: habitsError } = await supabase
    .from("habit")
    .select("*")
    .in("habit_id", habitsIds);

  if (habitsError) {
    console.error("Error fetching habit details", habitsError);
    return [];
  }

  // 3. 每個 public habits 的每個參加者的詳細資料
  const { data: profilesData, error: profilesError } = await supabase
    .from("publish")
    .select("habit_id, profile:user_id(user_id, username, avatar_url)");

  if(profilesError){
    console.log("Error fetching user profiles", profilesError);
    return [];
  }

  // 4. 找到該使用者有參加的 public habits
  const { data: userJoinedHabits, error: userJoinedError } = await supabase
    .from("habit")
    .select("habit_id")
    .eq("habit_id", habitsIds);

  if(userJoinedError) {
    console.log("Error fetching user joined habits", userJoinedError);
    return [];
  }

  const userJoinedHabitsIds = userJoinedHabits.map(
    (publish: { habit_id: string }) => publish.habit_id
  );

  // 5. 找到每個參與者的 profile 詳細資料
  const profilesMap: { [key: string]: ProfileTable[] } = profilesData.reduce(
    (acc: { [key: string]: ProfileTable[] }, profile: any) => {
      if (!acc[profile.habit_id]) {
        acc[profile.habit_id] = [];
      }
      acc[profile.habit_id].push(profile.profile);
      return acc;
    }, {}
  );
  
  const publicHabits: PublicHabit[] = (habits as HabitTable[]).map((habit) => ({
    ...habit,
    joined_users: profilesMap[habit.habit_id] || [],
    has_joined: userJoinedHabitsIds.includes(habit.habit_id)
  }));

  return publicHabits;
};

const publishHabit = async (habit_id: string): Promise<boolean> => {
  const supabase = createClient();
  const { data: habitData, error: fetchError } = await supabase
    .from("habit")
    .select("creator_user_id")
    .eq("habit_id", habit_id)
    .single();

  if (fetchError) {
    console.error("Error fetching habit", fetchError);
    return false;
  }

  const { error: insertError } = await supabase.from("publish").insert({
    habit_id,
  });

  if (insertError) {
    console.error("Error publishing habit:", insertError);
    return false;
  }

  return true;
};

const unpublishHabit = async (habit_id: string): Promise<boolean> => {
  const supabase = createClient();
  const { error } = await supabase
    .from("publish")
    .delete()
    .eq("habit_id", habit_id);

  if (error) {
    console.error("Error unpublishing habit", error);
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
    .from("publish")
    .select(
      `
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
        `
    )
    .eq("habit_id", habit_id)
    .single();

  if (fetchError) {
    console.error("Error fetching habit", fetchError);
    return false;
  }

  const { habit } = habitData;

  const { error: insertError } = await supabase.from("habit").insert({
    ...habit,
    creator_user_id: user_id,
    created_at: new Date().toISOString(),
  });

  if (insertError) {
    console.error("Error joining habit", insertError);
    return false;
  }

  return true;
};

export { getPublicHabits, joinHabit, publishHabit, unpublishHabit };