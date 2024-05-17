"use server";

import {
  createHabit,
  deleteHabit,
  getAllHabits,
  getDailyHabits,
  getLightHabits,
} from "@/actions/habit";
import {
  getPublicHabits,
  joinHabit,
  publishHabit,
  unpublishHabit,
} from "@/actions/public-habits";

export default async function Playground() {
  let creator_user_id = "92a75107-0564-4dae-8be0-29665aaccf2b";
  let date = "2024-05-16";
  let habitId = "1bc5c70b-5c5e-4a79-8954-184a12938b31";

  const fetchDailyHabits = async () => {
    const dailyHabits = await getDailyHabits(creator_user_id);
    console.log("-----這是分隔線-----", dailyHabits);
  };
  // await fetchDailyHabits();

  const fetchLightHabits = async () => {
    const lightHabits = await getLightHabits(creator_user_id);
    console.log("light habits: ", lightHabits);
  };
  // await fetchLightHabits();

  const handleCreateHabit = async () => {
    const success = await createHabit(
      "92a75107-0564-4dae-8be0-29665aaccf2b",
      "love",
      "https://picsum.photos/200",
      "AAAA",
      69,
      "12",
      new Date("2022-03-25"),
      new Date("2024-05-23"),
      {
        Fri: false,
        Mon: true,
        Sat: true,
        Sun: true,
        Thu: false,
        Tue: true,
        Wed: true,
      }
    );
  };
  // await handleCreateHabit();

  const handleDeleteHabit = async () => {
    const success = await deleteHabit(habitId);
    console.log("Successfully deleted!");
  };
  // await handleDeleteHabit();

  const fetchAllHabits = async () => {
    const allHabits = await getAllHabits(creator_user_id);
    console.log("All Habits: ", allHabits);
  };
  // await fetchAllHabits();

  const fetchPublicHabit = async () => {
    const publicHabits = await getPublicHabits(creator_user_id);
    console.log("Public Habits: ", publicHabits);
  };
  // await fetchPublicHabit();

  const handlePublishHabit = async () => {
    const success = await publishHabit(habitId);
    console.log("Successfully published!");
  };
  // await handlePublishHabit();

  const handleUnpublishHabit = async () => {
    const success = await unpublishHabit(habitId);
    console.log("Successfully unpublished!");
  };
  // await handleUnpublishHabit();

  const handleJoinHabit = async () => {
    const success = await joinHabit(creator_user_id, habitId);
    console.log("Successfully joined!");
  };
  // await handleJoinHabit();

  return (
    <div>
      <h1>去 CMoney 實習可以帶顧寬証嗎</h1>
      <div>Testing</div>
    </div>
  );
}
