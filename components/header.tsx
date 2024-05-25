"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserAvatar from "./user-avatar";

const Header = () => {
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  // Get current date and format it
  const today = new Date();
  const formattedDate = `${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}`;

  // State to hold the current time
  const [time, setTime] = useState("");

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      setTime(formattedTime);
    }, 1000);

    const getUserProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: profiles } = await supabase
        .from("profile")
        .select()
        .eq("user_id", user?.id);
      if (profiles && profiles.length > 0) {
        setUsername(profiles[0].username);
        setAvatarUrl(profiles[0].avatar_url);
        setUserId(profiles[0].user_id);
      }
    };
    getUserProfile();
    return () => clearInterval(timer);
  }, []);

  return (
    <header className='sm:w-[28rem] w-full fixed sm:top-[2vh] top-0 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white shadow-sm'>
      <div className='h-[4rem] container mx-auto px-4 py-4 md:px-6 md:py-5 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Tincan</h1>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 text-gray-500'>
            <span>{formattedDate}</span> {/* Display the formatted date */}
            <span>{time}</span> {/* Display the formatted time */}
          </div>
          <Link href='/profile'>
            <UserAvatar
              profile={{ avatar_url: avatarUrl, user_id: userId, username }}
              className='w-10 h-10'
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
