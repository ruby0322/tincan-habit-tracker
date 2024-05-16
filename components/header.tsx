"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
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

    return () => clearInterval(timer); // Clean up on component unmount
  }, []);

  return (
    <header className='bg-white shadow-sm'>
      <div className='h-[4.5rem] container mx-auto px-4 py-4 md:px-6 md:py-5 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Tincan</h1>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2 text-gray-500'>
            <span>{formattedDate}</span> {/* Display the formatted date */}
            <span>{time}</span> {/* Display the formatted time */}
          </div>
          <Link href='/profile'>
            <Image
              alt='Avatar'
              className='rounded-full border'
              height='48'
              width='48'
              src='https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-1984271e-b00b-4b5a-8211-7617ed80ac56'
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
