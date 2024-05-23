'use server'

import React from 'react';
import Image from 'next/image';
import { getDailyHabits, getLightHabits, createHabit, deleteHabit, getAllHabits } from "@/actions/habit";
import { getPublicHabits, publishHabit, unpublishHabit, joinHabit } from "@/actions/public-habits";
import { getFullReport, getMonthlyReport } from "@/actions/report";
import { incrementCompletedUnit, decrementCompletedUnit } from "@/actions/record";


export default async function Playground() {
  let creator_user_id = "11bc9c65-764e-4b41-9e24-4faed3cfe5ec";
  let date = new Date("2024-05-16");
  let habitId = "90a3b25c-0fa3-4d24-9783-2be4ccace34c";
  let targetYear = 2024;
  let targetMonth = 5;
  let imageURL = "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-4519bd1f-98d6-4ce5-ae00-27265f7b3a0a";

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
          '92a75107-0564-4dae-8be0-29665aaccf2b',
          'love',
          'https://picsum.photos/200',
          'AAAA',
          69,
          '12',
          new Date("2022-03-25"),
          new Date("2024-05-23"),
          {
            "Mon": true,
            "Tue": true,
            "Wed": true,
            "Thu": false,
            "Fri": false,
            "Sat": true,
            "Sun": true,
          },
        );
    };
    // await handleCreateHabit();

    const handleDeleteHabit = async () => {
        const success = await deleteHabit(habitId);
        console.log("Successfully deleted!")
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
    }
    // await fetchPublicHabit();

    const handlePublishHabit = async () => {
        const success = await publishHabit(habitId);
        console.log("Successfully published!")
    };
    // await handlePublishHabit();

    const handleUnpublishHabit = async () => {
        const success = await unpublishHabit(habitId);
        console.log("Successfully unpublished!")
    };
    // await handleUnpublishHabit();

    const handleJoinHabit = async () => {
        const success = await joinHabit(creator_user_id, habitId);
        console.log("Successfully joined!")
    }
    // await handleJoinHabit();

    const fetchFullReport = async () => {
        const report = await getFullReport(habitId);
        console.log("Successfully retrieved report!", report)
    };
    // await fetchFullReport();

    const fetchMonthlyReport = async () => {
      const report = await getMonthlyReport(habitId, targetYear, targetMonth);
      console.log("Successfully retrieved report!", report)
    };
    // await fetchMonthlyReport();

    const handleIncrementCompletedUnit = async () => {
        const success = await incrementCompletedUnit(habitId);
        console.log("Successfully incremented!")
    };
    // await handleIncrementCompletedUnit();

    const handleDecrementCompletedUnit = async () => {
        const success = await decrementCompletedUnit(habitId);
        console.log("Successfully decremented!")
    };
    // await handleDecrementCompletedUnit();

  return (
    <div>
      <h1>去 CMoney 實習可以帶顧寬証嗎</h1>
    </div>
  );
}
