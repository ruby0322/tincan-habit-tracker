"use server";

import { DailyHabit, HabitTable, LightHabit, RecordTable } from "@/type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const WEEK_DAYS: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const getDailyHabits = async (
  creator_user_id: string
): Promise<DailyHabit[]> => {
  const supabase = createClient();
  const dayOfWeek = WEEK_DAYS[new Date().getDay()];

  const { data: habits, error: habitsError } = await supabase
    .from("habit")
    .select("*")
    .eq("creator_user_id", creator_user_id)
    .filter(`frequency->>${dayOfWeek}`, "eq", true);

  if (habitsError) {
    console.error("Error fetching daily habits", habitsError);
    return [];
  }

  if (!habits || habits.length === 0) {
    console.log("No habits found");
    return [];
  }

  const habitIds = habits.map((habit: HabitTable) => habit.habit_id);
  // console.log(habitIds);
  const today = new Date().toISOString().split("T")[0];
  const { data: records, error: recordsError } = await supabase
    .from("record")
    .select("habit_id, num_completed_unit")
    .in("habit_id", habitIds)
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lte("created_at", `${today}T23:59:59.999Z`);

  if (recordsError) {
    console.error("Error fetching records", recordsError);
    return habits.map((habit) => ({
      ...habit,
      num_completed_unit: 0,
    }));
  }

  const recordsMap: { [key: string]: number } = (
    records as RecordTable[]
  ).reduce<{ [key: string]: number }>((acc, record) => {
    acc[record.habit_id] = record.num_completed_unit;
    return acc;
  }, {});

  const dailyHabits: DailyHabit[] = (habits as HabitTable[]).map((habit) => ({
    ...habit,
    num_completed_unit: recordsMap[habit.habit_id] || 0,
  }));

  dailyHabits.sort((a, b) => {
    const aRatio = a.num_daily_goal_unit ? a.num_completed_unit / a.num_daily_goal_unit : 0;
    const bRatio = b.num_daily_goal_unit ? b.num_completed_unit / b.num_daily_goal_unit : 0;
    return aRatio - bRatio;
  });

  return dailyHabits;
};

const getLightHabits = async (
  creator_user_id: string
): Promise<LightHabit[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("habit")
    .select("habit_id, title, picture_url")
    .eq("creator_user_id", creator_user_id);

  if (error) {
    console.error("Error fetching light habits", error);
    return [];
  }

  return data.map((habit) => ({
    habit_id: habit.habit_id,
    title: habit.title,
  }));
};

const createHabit = async (
  creator_user_id: string,
  title: string,
  picture_url: string,
  message: string,
  num_daily_goal_unit: number,
  daily_goal_unit: string,
  start_date: Date,
  end_date: Date,
  frequency: {}
): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("habit").insert([
    {
      creator_user_id,
      title,
      picture_url,
      message,
      num_daily_goal_unit,
      daily_goal_unit,
      start_date,
      end_date,
      frequency,
    },
  ]);

  if (error) {
    console.error("Error creating habit", error);
    return false;
  }
  revalidatePath("/manage");
  return true;
};

const deleteHabit = async (habit_id: string): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("habit")
    .delete()
    .eq("habit_id", habit_id);

  if (error) {
    console.error("Error deleting habit", error);
    return false;
  }
  revalidatePath("/manage");
  return true;
};

const getAllHabits = async (creator_user_id: string): Promise<HabitTable[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("habit")
    .select("*")
    .eq("creator_user_id", creator_user_id);

  if (error) {
    console.error("Error fetching all habits", error);
    return [];
  }

  return data;
};

export {
  createHabit,
  deleteHabit,
  getAllHabits,
  getDailyHabits,
  getLightHabits,
};
