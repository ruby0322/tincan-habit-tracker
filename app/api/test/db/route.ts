import { createClient } from "@/utils/supabase/server";

export async function DELETE(): Promise<Response> {
  const supabase = createClient();
  console.log("gotcha");
  try {
    const { data, error } = await supabase
      .from("follow")
      .delete()
      .neq("follower_id", "00000000-0000-0000-0000-000000000000");
  } catch (error) {
    console.error(error);
  }
  try {
    const { data, error } = await supabase
      .from("habit")
      .delete()
      .neq("habit_id", "00000000-0000-0000-0000-000000000000");
    console.log(error);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
  try {
    const { data, error } = await supabase
      .from("join")
      .delete()
      .neq("join_id", "00000000-0000-0000-0000-000000000000");
  } catch (error) {
    console.error(error);
  }
  try {
    const { data, error } = await supabase
      .from("post")
      .delete()
      .neq("post_id", "00000000-0000-0000-0000-000000000000");
  } catch (error) {
    console.error(error);
  }
  // try {
  //   const { error } = await supabase
  //     .from("profile")
  //     .delete()
  //     .neq("user_id", "00000000-0000-0000-0000-000000000000");
  // } catch (error) {
  //   console.error(error);
  // }
  try {
    const { error } = await supabase
      .from("react_to")
      .delete()
      .neq("post_id", "00000000-0000-0000-0000-000000000000");
  } catch (error) {
    console.error(error);
  }
  try {
    const { error } = await supabase
      .from("record")
      .delete()
      .neq("habit_id", "00000000-0000-0000-0000-000000000000");
  } catch (error) {
    console.error(error);
  }
  return new Response(JSON.stringify({ message: "OK" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// export async function GET(request: Request): Promise<Response> {

//   const { data: res } = await supabase.from("habit").delete();
//   return new Response(JSON.stringify({ message: "OK" }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }
