"use server";

import { ReactionType } from "@/type";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const reactToPost = async (
  user_id: string,
  post_id: string,
  reaction_type: ReactionType
): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("react_to")
    .select("reaction_type")
    .eq("user_id", user_id)
    .eq("post_id", post_id);
  if (error) {
    throw new Error(`Error fetching react data`);
  }
  if (!data || data.length == 0) {
    // haven't react before
    const { error } = await supabase.from("react_to").insert({
      user_id: user_id,
      post_id: post_id,
      reaction_type: reaction_type,
    });
    if (error) {
      throw new Error(`Error reacting to a post: ${error.message}`);
    }
  } else {
    // have react before
    const existingReaction = data[0];
    if (existingReaction.reaction_type === reaction_type) {
      // delete reaction
      const { error } = await supabase
        .from("react_to")
        .delete()
        .match({ user_id: user_id, post_id: post_id });
      if (error) {
        throw new Error(`Error deleting reaction: ${error.message}`);
      }
    } else {
      // update reaction type
      const { error } = await supabase
        .from("react_to")
        .update({ reaction_type: reaction_type })
        .eq("user_id", user_id)
        .eq("post_id", post_id);
      if (error) {
        throw new Error(`Error upddating reaction: ${error.message}`);
      }
    }
  }
  revalidatePath("/social");
  return true;
};

export { reactToPost };
