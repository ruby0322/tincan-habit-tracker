"use server";

import { HabitReport, HabitTable, RecordTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const getFullReport = async (habit_id: string): Promise<HabitReport> => {
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
        const date = new Date(record.created_at).toISOString().split('T')[0];
        acc[date] = record.num_completed_unit;
        return acc;
    }, {} as { [key: string]: number });

    const habitReport: HabitReport = {
        ...habitData,
        records,
    };
    
    return habitReport;
};

const getMonthlyReport = async (
    habit_id: string,
    target_year: number,
    target_month: number
) : Promise<HabitReport> => {
    const supabase = createClient();
    
    const startDate = new Date(target_year, target_month - 1, 1).toISOString();
    const endDate = new Date(target_year, target_month, 0, 23, 59, 59, 999).toISOString();
    
    const { data: habitData, error: habitError } = await supabase
       .from('habit')
       .select('*')
       .eq('habit_id', habit_id)
       .single();
    
    if(habitError){
        console.error("Error fetching habit", habitError);
    }

    if(!habitData){
        console.error("Habit data not found");
    }

    const { data: recordsData, error: recordsError } = await supabase
       .from('record')
       .select('created_at, num_completed_unit')
       .gte('created_at', startDate)
       .lte('created_at', endDate)
       .eq('habit_id', habit_id);
    
    if(recordsError){
        console.error("Error fetching records data", recordsError);
    }

    const records: { [key: string]: number } = (recordsData as RecordTable[]).reduce((acc, record) => {
        const date = new Date(record.created_at).toISOString().split('T')[0];
        acc[date] = record.num_completed_unit;
        return acc;
    }, {} as { [key: string]: number });

    const monthlyReport: HabitReport = {
        ...habitData,
        records,
    }

    return monthlyReport;
}

export { getFullReport, getMonthlyReport };
