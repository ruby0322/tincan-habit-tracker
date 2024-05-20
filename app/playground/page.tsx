'use server'

import { getDailyHabit, getLightHabits, createHabit, deleteHabit, getAllHabits } from "@/actions/habit";

export default async function Playground() {
    
    let creator_user_id = "92a75107-0564-4dae-8be0-29665aaccf2b";
    let date = "2024-05-16";
    let habitId = "3a16e62a-3d74-44f5-a06b-b86699763ea5"

    // const fetchDailyHabits = async () => {
    //     const dailyHabits = await getDailyHabit(creator_user_id, date);
    //     console.log("HI:", dailyHabits);
    // };
    // await fetchDailyHabits();

    // const fetchLightHabits = async () => {
    //     const lightHabits = await getLightHabits(creator_user_id);
    //     return (lightHabits);
    // };
    // await fetchLightHabits();

    // const handleCreateHabit = async () => {
    //     const success = await createHabit(
    //       '92a75107-0564-4dae-8be0-29665aaccf2b',
    //       'love',
    //       'https://picsum.photos/200',
    //       'AAAA',
    //       69,
    //       '12',
    //       new Date("2022-03-25"),
    //       new Date("2024-05-23"),
    //       {
    //         "Fri": false,
    //         "Mon": true,
    //         "Sat": true,
    //         "Sun": true,
    //         "Thu": false,
    //         "Tue": true,
    //         "Wed": true
    //       },
    //     );
    // };
    // await handleCreateHabit();

    // const handleDeleteHabit = async () => {
    //     const success = await deleteHabit(habitId);
    // };
    // await handleDeleteHabit();

    // const fetchAllHabits = async () => {
    //     const allHabits = await getAllHabits(creator_user_id);
    //     return (allHabits);
    // };
    // await fetchAllHabits();

    return (
        <div>
            <h1>Playground</h1>
            <div>
                <h2>Get Daily Habits</h2>
            </div>
        </div>
    );
}
