"use server"

import { createClient } from "@/utils/supabase/server";
import { ReactNode } from "react";
import { getUserProfile } from "@/actions/user";

export default async function ProfileLayout({
    children,
  }: {
    children: ReactNode;
  }) {
    const supabase = createClient();
    const {
        data: { user },
      } = await supabase.auth.getUser();
    return (
        <div>
            {children}
        </div>
    )
}