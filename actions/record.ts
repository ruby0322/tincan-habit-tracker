"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const incrementCompletedUnit = async (habit_id: string): Promise<boolean> => {
  const supabase = createClient();

  const today = new Date().toLocaleString("zh-Hans-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const tomorrowDate = new Date(today);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowString = tomorrowDate.toLocaleString("zh-Hans-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const { data: existingRecords, error: selectError } = await supabase
    .from("record")
    .select("*")
    .eq("habit_id", habit_id)
    .gte("created_at", today)
    .lte("created_at", tomorrowString);

  if (selectError) {
    console.error("Error fetching existing records", selectError);
    return false;
  }

  // If record exist
  if (existingRecords.length > 0) {
    const record = existingRecords[0];
    const { data: habit } = await supabase
      .from("habit")
      .select("num_daily_goal_unit")
      .eq("habit_id", record.habit_id);
    if (!habit || habit.length === 0) {
      console.error("Error updating record, habit does not exist.");
      return false;
    }
    const { error: updateError } = await supabase
      .from("record")
      .update({
        num_completed_unit: Math.min(
          record.num_completed_unit + 1,
          habit[0].num_daily_goal_unit
        ),
      })
      .eq("record_id", record.record_id);

    if (updateError) {
      console.error("Error updating record", updateError);
      return false;
    }
  }
  // If record doesn't exist
  else {
    const { error: insertError } = await supabase.from("record").insert({
      habit_id,
      num_completed_unit: 1,
      created_at: today,
    });

    if (insertError) {
      console.error("Error inserting record", insertError);
      return false;
    }
  }
  revalidatePath("/manage");
  return true;
};

const decrementCompletedUnit = async (habit_id: string): Promise<boolean> => {
  const supabase = createClient();

  const today = new Date().toLocaleString("zh-Hans-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const tomorrowDate = new Date(today);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowString = tomorrowDate.toLocaleString("zh-Hans-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const { data: existingRecords, error: selectError } = await supabase
    .from("record")
    .select("*")
    .eq("habit_id", habit_id)
    .gte("created_at", today)
    .lte("created_at", tomorrowString);

  if (selectError) {
    console.error("Error checking existing records:", selectError);
    return false;
  }

  if (existingRecords.length > 0) {
    // If the record exists
    const record = existingRecords[0];
    const newCompletedUnit = Math.max(0, record.num_completed_unit - 1);

    if (newCompletedUnit > 0) {
      // If the decremented unit > 0, update the record
      const { error: updateError } = await supabase
        .from("record")
        .update({ num_completed_unit: newCompletedUnit })
        .eq("record_id", record.record_id);

      if (updateError) {
        console.error("Error updating record:", updateError);
        return false;
      }
    } else {
      // If the decremented unit <= 0, delete the record
      const { error: deleteError } = await supabase
        .from("record")
        .delete()
        .eq("record_id", record.record_id);

      if (deleteError) {
        console.error("Error deleting record:", deleteError);
        return false;
      }
    }
  }
  revalidatePath("/manage");
  return true;
};

export { decrementCompletedUnit, incrementCompletedUnit };
