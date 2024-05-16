import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";

import Header from "@/components/header";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Tincan Habit Tracker",
  description: "Tin can, can you?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground",
          fontSans.variable
        )}
      >
        <main className='min-h-screen flex flex-col items-center justify-center light'>
          <div className='flex flex-col h-full md:h-[50rem] w-full max-w-[28rem] md:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] overflow-y-scroll'>
            <Header />
            <div className='flex-1'>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
