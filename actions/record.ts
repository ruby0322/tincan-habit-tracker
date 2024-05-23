"use server";

import { HabitReport, HabitTable, RecordTable } from "@/type";
import { createClient } from "@/utils/supabase/server";

const incrementCompletedUnit = async (habit_id: string): Promise<boolean> => {
    const supabase = createClient();
    const today = new Date().toISOString().split('T')[0];
    const { data: existingRecords, error: selectError } = await supabase
        .from("record")
        .select("*")
        .eq("habit_id", habit_id)
        .gte("created_at", `${today}T00:00:00.000Z`)
        .lte("created_at", `${today}T23:59:59.999Z`);

    if(selectError) {
        console.error("Error fetching existing records", selectError);
        return false;
    }

    // If record exist
    if(existingRecords.length > 0) {
        const record = existingRecords[0];
        const { error: updateError } = await supabase
           .from("record")
           .update({
                num_completed_unit: record.num_completed_unit + 1
            })
           .eq("record_id", record.record_id);

        if(updateError) {
            console.error("Error updating record", updateError);
            return false;
        }
    }
    // If record doesn't exist
    else {
        const { error: insertError } = await supabase
            .from("record")
            .insert({
                habit_id,
                created_at: new Date().toISOString(),
                num_completed_unit: 1,
            });
        
            if(insertError) {
            console.error("Error inserting record", insertError);
            return false;
        }
    }

    return true;
};

const decrementCompletedUnit = async (habit_id: string): Promise<boolean> => {
    const supabase = createClient();

    const today = new Date().toISOString().split('T')[0];

    const { data: existingRecords, error: selectError } = await supabase
        .from('record')
        .select('*')
        .eq('habit_id', habit_id)
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lte('created_at', `${today}T23:59:59.999Z`);

    if (selectError) {
        console.error('Error checking existing records:', selectError);
        return false;
    }

    if (existingRecords.length > 0) {
        // If the record exists
        const record = existingRecords[0];
        const newCompletedUnit = record.num_completed_unit - 1;

        if (newCompletedUnit > 0) {
            // If the decremented unit > 0, update the record
            const { error: updateError } = await supabase
                .from('record')
                .update({ num_completed_unit: newCompletedUnit })
                .eq('record_id', record.record_id);

            if (updateError) {
                console.error('Error updating record:', updateError);
                return false;
            }
        } else {
            // If the decremented unit <= 0, delete the record
            const { error: deleteError } = await supabase
                .from('record')
                .delete()
                .eq('record_id', record.record_id);

            if (deleteError) {
                console.error('Error deleting record:', deleteError);
                return false;
            }
        }
    }

    return true;
};

export { incrementCompletedUnit, decrementCompletedUnit };
