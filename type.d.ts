import { Enums, Tables } from "@/types/supabase";

export type HabitTable = Tables<"habit">;
export type FollowTable = Tables<"follow">;
export type JoinTable = Tables<"join">;
export type PostTable = Tables<"post">;
export type ProfileTable = Tables<"profile">;
export type PublishTable = Tables<"publish">;
export type ReactToTable = Tables<"react_to">;
export type RecordTable = Tables<"record">;

export type DailyHabit = HabitTable & { num_completed_unit: number };
export type LightHabit = {
  habit_id: string;
  title: string;
};
export type HabitReport = HabitTable & {
  records: { [date: string]: number };
};
export type PublicHabit = HabitTable & {
  joined_users: ProfileTable[];
  has_joined: boolean;
};
export type PostWithReaction = PostTable & {
  reaction: { [reaction_type]: ProfileTable[] };
};

export type ReactionType = Enums<"reaction-type">;
export type Reaction = ProfileTable & { reaction_type: ReactionType };

export type Post = PostTable & {
  username: string;
  avatar_url: string;
  picture_url: string;
  reactions: Reaction[];
};

export type Profile = ProfileTable & { isFollowing: boolean };
