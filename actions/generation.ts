"use server";

import { DailyHabit } from "@/type";
import openai from "@/utils/openai";
import { storeImageToStorage } from "./storage";
import { getUserProfile } from "./user";

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
  dailyGoal: string
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

const BAD_PROGRESS_PROMPT = `請大家一起嘲笑他，詼諧地調侃用戶沒有辦法達成目標，但不失禮貌，並加上一些嘲諷的 emoji 和具諷刺和搞笑意味的 hashtags`;
const NORMAL_PROGRESS_PROMPT = `用輕鬆的口吻鼓勵用戶，並加上一些輕鬆的 emoji 和劇諷刺和搞笑意味的 hashtags`;
const OK_PROGRESS_PROMPT = `積極鼓勵並期許進一步的進步，並加上一些激勵的 emoji 和搞笑但正向的 hashtags`;
const GOOD_PROGRESS_PROMPT = `強力鼓勵並期許用戶達成目標，並加上一些鼓舞人心的 emoji 和搞笑但鼓舞人心的 hashtags`;
const PERFECT_PROGRESS_PROMPT = `請朋友大力鼓勵並讚美，用戶達成目標，期待未來的成功，並加上一些慶祝的 emoji 和搞笑慶祝的 hashtags`;

const generateDailyHabitPostContent = async (dailyHabit: DailyHabit) => {
  const profile = await getUserProfile(dailyHabit.creator_user_id);
  const progress =
    (dailyHabit.num_completed_unit / dailyHabit.num_daily_goal_unit) * 100;
  const input = `
  ---
  
  輸入：
  
  - 用戶名稱：${profile.username}
  - 習慣標題：${dailyHabit.title}
  - 當日完成目標單位數：${dailyHabit.num_completed_unit}
  - 當日目標單位數：${dailyHabit.num_daily_goal_unit}
  - 完成率：${progress}%
  - 目標單位：${dailyHabit.daily_goal_unit}`;
  let captionStyle;
  if (0 <= progress && progress <= 20) {
    captionStyle = BAD_PROGRESS_PROMPT;
  } else if (progress < 40) {
    captionStyle = NORMAL_PROGRESS_PROMPT;
  } else if (progress < 60) {
    captionStyle = OK_PROGRESS_PROMPT;
  } else if (progress < 80) {
    captionStyle = GOOD_PROGRESS_PROMPT;
  } else {
    captionStyle = PERFECT_PROGRESS_PROMPT;
  }
  const role =
    "你是一個 2003 年出生、個性搞笑，總是喜歡用網路用語跟朋友交流的大學生。口頭禪包括「笑死」、「不意外」、「超可悲」、「大中計」、「騙子」、「明天再說」、「牛逼」、「很強欸」等等。和朋友示好和打鬧的方式之一就是虧朋友";
  const prompt = `根據以下輸入，以 2000 年後生出的人在網路上的口吻（俗稱火星文，例如笑死、不意外、超可悲、大中計、騙子、明天再說、牛逼、很強欸，這些詞不一定要出現，但風格類似且創意搞笑），生成一篇五十字的文案，並且只回覆文案，不需說明。這個文案是要讓用戶發在社群媒體上給朋友看，所以請以第三人稱視角跟用戶的朋友互動
  ${captionStyle}
  ${input}
  `;
  return askGPT(role, prompt);
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

export {
  askGPT,
  generateDailyHabitPostContent,
  generateHabitReminder,
  generateTinCanImage,
};
