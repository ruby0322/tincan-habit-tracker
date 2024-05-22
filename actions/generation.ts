"use server";

import openai from "@/utils/openai";
import { storeImageToStorage } from "./storage";

const askGPT = async (role: string, prompt: string): Promise<string> => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: role },
      { role: "user", content: prompt },
    ],
    model: "gpt-4o",
  });
  return completion.choices[0].message.content as string;
};

const generateHabitReminder = async (
  username: string,
  title: string,
  dailyGoal: string,
  completionStreak: number,
  failureStreak: number
) => {
  const prompt = `
  Information: 你的主人要養成「${title}」習慣，但他今天的短期目標「${dailyGoal}」還沒達成！
  Task: 以繁體中文撰寫 10 到 30 字內，以「主人名字＋主人」開頭、撒嬌、情緒勒索、有少許 emoji 的訊息，提醒主人達成今日目標！
  `;
  return await askGPT(
    `你是一個可愛的「寵物錫罐」，主人是 ${username}。如果主人當日沒有完成目標，你會感到難過`,
    prompt
  );
};

const generateTinCanImage = async (
  title: string,
  completionStreak: number,
  failureStreak: number
) => {
  const prompt = `Minimalism, 
  kid's rough abstract line sketch of a half-opened tin can with big eyes and limbs,
  pastel sticks,
  messy simplicity thick and casual brush strokes,
  fat,
  sitting,
  ${title},
  ${
    completionStreak != 0 || failureStreak != 0
      ? completionStreak > 0
        ? "happy"
        : "sad"
      : ""
  }`;
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
  });
  const res = await fetch(response.data[0].url as string);
  const imageBlob = await res.blob();
  const storageImageUrl = await storeImageToStorage(imageBlob);
  return storageImageUrl;
};

export { askGPT, generateHabitReminder, generateTinCanImage };
