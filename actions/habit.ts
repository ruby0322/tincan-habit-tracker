"use server";

import { DailyHabit, HabitTable, LightHabit } from "@/type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const getDailyHabits = async (
  creator_user_id: string
): Promise<DailyHabit[]> => {
  const WEEK_DAYS: { [weekday: string]: string } = {
    一: "Mon",
    二: "Tue",
    三: "Wed",
    四: "Thu",
    五: "Fri",
    六: "Sat",
    日: "Sun",
  };
  const supabase = createClient();
  const { data, error } = await supabase
    .from("habit")
    .select("*")
    .eq("creator_user_id", creator_user_id)
    .filter(
      `frequency->>${
        WEEK_DAYS[new Date().toLocaleString("zh-TW", { weekday: "narrow" })]
      }`,
      "eq",
      true
    );

  if (error) {
    console.error("Error fetching daily habits", error);
    return [];
  }

  return data;
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

  return data;
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
