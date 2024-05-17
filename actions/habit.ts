"use server";

import { DailyHabit, HabitTable, LightHabit, RecordTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getDailyHabit = async (
  creator_user_id: string,
  date: string
): Promise<DailyHabit[]> => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const supabase = createClient();
  const dayOfWeek = weekDays[new Date(date).getDay()];

  const { data: habits, error: habitsError } = await supabase
    .from('habit')
    .select('*')
    .eq('creator_user_id', creator_user_id)
    .filter(
      `frequency->>${dayOfWeek}`,
      'eq',
      true
    );

  if(habitsError){
    console.error("Error fetching daily habits", habitsError);
    return [];
  }

  if (!habits || habits.length === 0) {
    return [];
  }

  const {data: records, error: recordsError} = await supabase
    .from('record')
    .select('habit_id, num_completed_unit')
    .eq('creator_user_id', creator_user_id)
    .eq('created_at', date);
  
  if (recordsError) {
    console.error("Error fetching records", recordsError);
    return habits.map(habit => ({
      ...habit,
      num_completed_unit: 0,
    }));
  }
  
  const recordsMap: { [key: string]: number } = (records as RecordTable[]).reduce<{ [key: string]: number }>((acc, record) => {
    acc[record.habit_id] = record.num_completed_unit;
    return acc;
  }, {});

  const dailyHabits: DailyHabit[] = (habits as HabitTable[]).map(habit => ({
    ...habit,
    num_completed_unit: recordsMap[habit.habit_id] || 0,
  }));

  return dailyHabits;
};

const getLightHabits = async (creator_user_id: string): Promise<LightHabit[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('habit')
    .select('habit_id, title, picture_url')
    .eq('creator_user_id', creator_user_id);
  
  if(error){
    console.error("Error fetching light habits", error);
    return [];
  }
  
  return data.map(habit => ({
    habit_id: habit.habit_id,
    title: habit.title
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
  const { data, error } = await supabase
   .from('habit')
   .insert([
    {
      creator_user_id,
      title,
      picture_url,
      message,
      num_daily_goal_unit,
      daily_goal_unit,
      start_date,
      end_date,
      frequency
    }
  ]);

  if(error){
    console.error("Error creating habit", error);
    return false;
  }

  return true;
};

const deleteHabit = async (habit_id: string): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('habit')
    .delete()
    .eq('habit_id', habit_id);

  if(error){
    console.error("Error deleting habit", error);
    return false;
  }

  return true;
};

const getAllHabits = async (creator_user_id: string): Promise<HabitTable[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('habit')
    .select('*')
    .eq('creator_user_id', creator_user_id);

  if(error){
    console.error("Error fetching all habits", error);
    return [];
  }

  return data;
};

export { getDailyHabit, getLightHabits, createHabit, deleteHabit, getAllHabits };