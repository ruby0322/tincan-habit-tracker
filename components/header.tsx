"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
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
      if (profiles) {
        setUsername(profiles[0].username);
        setAvatarUrl(profiles[0].avatar_url);
      }
    };
    getUserProfile();
    return () => clearInterval(timer);
  }, []);

  return (
    <header className='shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white shadow-sm'>
      <div className='h-[4.5rem] container mx-auto px-4 py-4 md:px-6 md:py-5 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Tincan</h1>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 text-gray-500'>
            <span>{formattedDate}</span> {/* Display the formatted date */}
            <span>{time}</span> {/* Display the formatted time */}
          </div>
          <Link href='/profile'>
            <Avatar>
              <AvatarImage alt='@jaredpalmer' src={avatarUrl} />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
