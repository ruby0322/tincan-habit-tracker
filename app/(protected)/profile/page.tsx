"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return redirect(`/profile/${user?.id as string}`);
};

export default ProfilePage;
