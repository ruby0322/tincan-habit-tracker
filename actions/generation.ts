"use server";

import openai from "@/utils/openai";

const askGPT = async (role: string, prompt: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: role },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0]);
  return completion.choices[0].message.content as string;
};

const generateHabitReminder = async (
  username: string,
  projectName: string,
  dailyGoal: string,
  completionSteak: number,
  failureStreak: number
) => {
  const prompt = `
  Information: 你的主人的習慣計畫「${projectName}」要養成，他今天的短期目標是「${dailyGoal}」但還沒達成
  他已經連續 ${Math.max(completionSteak, failureStreak)} 天 ${
    completionSteak > 0 ? "達成" : "未達成"
  } 目標了！
  Task: 以繁體中文撰寫 10 字內、疊字、情緒勒索、有少許 emoji 的訊息，提醒主人達成今日目標！
  `;
  return await askGPT(
    `你是一個可愛的「寵物錫罐」，主人是 ${username}。如果主人當日沒有完成目標，你就會感到難過`,
    prompt
  );
};

export { askGPT, generateHabitReminder };
