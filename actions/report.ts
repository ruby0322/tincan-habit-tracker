"use server";

import { HabitReport, HabitTable, RecordTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getReport = async (habit_id: string): Promise<HabitReport> => {
    const supabase = createClient();
    
    const { data: habitData, error: habitError } = await supabase
        .from('habit')
        .select('*')
        .eq('habit_id', habit_id)
        .single();
    
    if(habitError){
        console.error("Error fetching habit", habitError);
    }

    if (!habitData) {
        console.error("Habit not found");
    }

    const { data: recordsData, error: recordsError } = await supabase
        .from('record')
        .select('created_at, num_completed_unit')
        .eq('habit_id', habit_id);

    if (recordsError) {
        console.error("Error fetching records data", recordsError);
        throw new Error("Error fetching records data");
    }

    const records: { [key: string]: number } = (recordsData as RecordTable[]).reduce((acc, record) => {
        const date = new Date(record.created_at).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        acc[date] = record.num_completed_unit;
        return acc;
    }, {} as { [key: string]: number });

    const habitReport: HabitReport = {
        ...habitData,
        records,
    };
    
    return habitReport;
};

export { getReport };
