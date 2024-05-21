"use client";

import { Progress } from "@/components/ui/progress";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { CalendarBar } from "./calendar-bar";

function getDaysInMonth(month: number, year: number) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function generateCalendar(month: number, year: number): number[][] {
  const allDaysInMonth: Date[] = getDaysInMonth(month, year);
  const daysList: number[][] = [[], [], [], [], [], []];

  const firstDay: number = allDaysInMonth[0].getDay();
  let currentWeek: number = 0;

  // 將第一週的日期放入陣列
  for (let i = 0; i < 7 - firstDay; i++) {
    daysList[currentWeek][firstDay + i] = allDaysInMonth[i].getDate();
  }

  // 將剩餘日期放入陣列
  for (let i = 7 - firstDay; i < allDaysInMonth.length; i++) {
    if ((i - 7 + firstDay) % 7 === 0) {
      currentWeek++;
    }
    daysList[currentWeek][(i - 7 + firstDay) % 7] = allDaysInMonth[i].getDate();
  }

  // 補充每週的日期陣列，填滿月曆
  for (let i = 0; i < daysList.length; i++) {
    for (let j = 0; j < 7; j++) {
      if (daysList[i][j] === undefined) {
        daysList[i][j] = 0; // 使用0填充未滿的日期
      }
    }
  }

  return daysList;
}

const Calendar = ({ habit_id }: { habit_id: string }) => {
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [daysList, setDaysList] = useState(generateCalendar(month, year));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 300);
    return () => clearTimeout(timer);
  }, []);
  // 這是炫砲進度條，但他現在怪怪的，之後有空再修
  //   React.useEffect(() => {
  //     const timer = setInterval(() => {
  //         if (progress < 100) {
  //             setProgress((p) => Math.round(p + (100 - p) / 10));
  //         }
  //     }, 20);

  //     return () => clearInterval(timer);
  // }, []);

  useEffect(() => {
    setDaysList(generateCalendar(month, year));
  }, [month, year]);

  return (
    <div className='w-full'>
      <div className='py-4'>
        <CalendarBar onMonthChange={setMonth} onYearChange={setYear} />
      </div>
      <div>{habit_id}</div>

      <ResizablePanelGroup
        direction='vertical'
        className='min-h-[320px] max-w-md rounded-lg border item-center justify-center'
      >
        <ResizablePanel defaultSize={20}>
          <div className='flex h-full items-center justify-between p-5'>
            {weekDays.map((weekDay, index) => (
              <div
                key={index}
                className={
                  index === 0 || index === 6
                    ? "text-red-500 text-center"
                    : "text-center"
                }
              >
                {weekDay}
              </div>
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={80}>
          {daysList.map((week, weekIndex) => (
            <div key={weekIndex} className='px-2 pt-2'>
              <div className='flex h-full items-center justify-between'>
                {week.map((day, dayIndex) => (
                  <div key={dayIndex} className='text-center w-8 h-8'>
                    {day !== 0 ? day : ""}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className='p-4 flex justify-center item-center'>
        {/* <ProgressBar habit_id={habitId}/> */}
        <Progress value={progress} className='h-4' />
        <div className='px-4 text-xl italic font-bold'>
          {progress.toString() + "%"}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
