"use client";
import { generateHabitReminder } from "@/actions/generation";
import { useState } from "react";
import ReminderForm from "./reminder-form";

const ReminderPage = () => {
  const [response, setResponse] = useState<string>("");
  const [username, setUsername] = useState<string>("魯比");
  const [title, setTitle] = useState<string>("好想打羽球");
  const [goal, setGoal] = useState<string>("爆殺 50 顆羽球");
  const [completionStreak, setCompletionStreak] = useState<number>(0);
  const [failureStreak, setFailureStreak] = useState<number>(0);

  const fetchData = async (
    username: string,
    title: string,
    goal: string,
    completionStreak: number,
    failureStreak: number
  ) => {
    const res = await generateHabitReminder(
      username,
      title,
      goal,
    );
    setResponse(res);
  };

  return (
    <div className='flex items-center justify-center flex-col gap-8'>
      {response}

      <ReminderForm
        username={username}
        usernameSetter={setUsername}
        title={title}
        titleSetter={setTitle}
        goal={goal}
        goalSetter={setGoal}
        completionStreak={completionStreak}
        completionStreakSetter={setCompletionStreak}
        failureStreak={failureStreak}
        failureStreakSetter={setFailureStreak}
        onSubmit={() => {
          fetchData(username, title, goal, completionStreak, failureStreak);
        }}
      />
    </div>
  );
};

export default ReminderPage;
