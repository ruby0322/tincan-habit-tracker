"use client";

import { getMonthlyReport } from "@/actions/report";
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

function createDate(year: number, month: number, day: number): Date {
  const date = new Date(year, month - 1, day);
  return date;
}

const generateDaysInMonth = (year: number, month: number): Date[] => {
  const daysInMonth: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month, 0).getDate();

  for (let i = 1; i <= lastDay; i++) {
    daysInMonth.push(new Date(year, month - 1, i));
  }

  return daysInMonth;
};

const getDayName = (dayOfWeek: number): string => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayNames[dayOfWeek];
};

type Frequency = {
  [key: string]: boolean;
};

const toCorrectString = (year: number, month: number, day: number) => {
  let datekey = "";
  if (month < 10 && month > 0) {
    datekey = year.toString() + "-0" + month.toString() + "-";
  }
  if (day < 10 && day > 0) {
    datekey = datekey + "0" + day.toString();
  } else {
    datekey = datekey + day.toString();
  }
  // console.log(datekey);
  return datekey;
};

const Calendar = ({ habit_id }: { habit_id: string }) => {
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [daysList, setDaysList] = useState(generateCalendar(month, year));
  const [progress, setProgress] = useState(0);
  const [monthlyReport, setMonthlyReport] = useState<{
    [date: string]: number;
  }>({});
  const [numDailyGoalUnit, setnumDailyGoalUnit] = useState<number>(0);
  const [totalNumDailyGoalUnit, setTotalNumDailyGoalUnit] = useState<number>(0); // 這個月總共目標是多少單位
  const [finishedNumDailyGoalUnit, setFinishedNumDailyGoalUnit] =
    useState<number>(0); // 這個月完成多少單位
  const [frequency, setFrequency] = useState<{ [day: string]: Boolean }>({});

  useEffect(() => {
    const prog =
      totalNumDailyGoalUnit === 0
        ? 0
        : Math.round((finishedNumDailyGoalUnit * 100) / totalNumDailyGoalUnit);
    // console.log(finishedNumDailyGoalUnit, totalNumDailyGoalUnit);
    const timer = setTimeout(() => setProgress(prog), 300);
    return () => clearTimeout(timer);
  }, [habit_id, totalNumDailyGoalUnit, finishedNumDailyGoalUnit, month, year]);
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
    const daysInMonth = generateDaysInMonth(year, month + 1);
    let habitDaysCount = 0;
    let finishedCount = 0;
    async function getMonthlyReport1() {
      // console.log(habit_id, year, month);
      const monthlyReport = await getMonthlyReport(habit_id, year, month + 1);
      console.log(monthlyReport);

      setnumDailyGoalUnit(monthlyReport.num_daily_goal_unit);
      // console.log(monthlyReport.records);
      setMonthlyReport(monthlyReport.records);

      // count habitDaysCount
      const freq = monthlyReport.frequency as Frequency;
      setFrequency(freq);
      const numDGU = monthlyReport.num_daily_goal_unit;
      // console.log(daysInMonth);
      daysInMonth.map((day) => {
        // const dateString = day.toISOString().split('T')[0];
        const dateString = toCorrectString(year, month + 1, day.getDate());
        const dayOfWeek = day.getDay(); // 0 (Sun) to 6 (Sat)
        // console.log(day, dateString, dayOfWeek);
        if (freq[getDayName(dayOfWeek)] === true) {
          // console.log(day);
          // console.log(dateString);
          // console.log("monthlyReport", monthlyReport.records['2024-05-23']);
          if (monthlyReport.records[dateString] !== undefined) {
            // console.log(dateString);
            finishedCount += monthlyReport.records[dateString];
          }
          habitDaysCount += numDGU;
        }
      });
      setTotalNumDailyGoalUnit(habitDaysCount);
      setFinishedNumDailyGoalUnit(finishedCount);
      // console.log(habitDaysCount);
    }
    if (habit_id) {
      getMonthlyReport1();
    }
  }, [month, year, habit_id]);

  return (
    <div className='w-[400px]'>
      <div className='py-4'>
        <CalendarBar onMonthChange={setMonth} onYearChange={setYear} />
      </div>
      {/* <div>{habit_id}</div> */}

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
                {week.map((day, dayIndex) => {
                  // const dateKey = createDate(year, month + 1, day).toISOString().split('T')[0];
                  const dateKey = toCorrectString(year, month + 1, day);
                  const thisDay = createDate(year, month + 1, day);
                  // return (
                  //   <div>{monthlyReport[dateKey]===undefined ? "undefined" : "meow"}</div>
                  // )
                  if (
                    monthlyReport[dateKey] === undefined &&
                    day !== 0 &&
                    frequency[getDayName(thisDay.getDay())] === true
                  ) {
                    return (
                      <div
                        key={dayIndex}
                        className='text-center w-8 h-8 pt-1 rounded-full bg-stone-200'
                      >
                        {day !== 0 ? day : ""}
                      </div>
                    );
                  } else if (monthlyReport[dateKey] === undefined) {
                    return (
                      <div
                        key={dayIndex}
                        className='text-center w-8 h-8 pt-1 rounded-full'
                      >
                        {day !== 0 ? day : ""}
                      </div>
                    );
                  } else if (monthlyReport[dateKey] / numDailyGoalUnit <= 0.2) {
                    return (
                      <div
                        key={dayIndex}
                        className='text-center w-8 h-8 pt-1 rounded-full bg-red-50'
                      >
                        {day !== 0 ? day : ""}
                      </div>
                    );
                  } else if (monthlyReport[dateKey] / numDailyGoalUnit <= 0.4) {
                    return (
                      <div
                        key={dayIndex}
                        className='text-center w-8 h-8 pt-1 rounded-full bg-red-100'
                      >
                        {day !== 0 ? day : ""}
                      </div>
                    );
                  } else if (monthlyReport[dateKey] / numDailyGoalUnit <= 0.6) {
                    return (
                      <div
                        key={dayIndex}
                        className='text-center w-8 h-8 pt-1 rounded-full bg-red-200'
                      >
                        {day !== 0 ? day : ""}
                      </div>
                    );
                  } else if (monthlyReport[dateKey] / numDailyGoalUnit <= 0.8) {
                    return (
                      <div
                        key={dayIndex}
                        className='text-center w-8 h-8 pt-1 rounded-full bg-red-300'
                      >
                        {day !== 0 ? day : ""}
                      </div>
                    );
                  } else if (monthlyReport[dateKey] / numDailyGoalUnit < 1) {
                    return (
                      <div
                        key={dayIndex}
                        className='text-center w-8 h-8 pt-1 rounded-full bg-red-400'
                      >
                        {day !== 0 ? day : ""}
                      </div>
                    );
                  } else if (monthlyReport[dateKey] === numDailyGoalUnit) {
                    return (
                      <div
                        key={dayIndex}
                        className='text-center w-8 h-8 pt-1 rounded-full bg-red-500'
                      >
                        {day !== 0 ? day : ""}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={dayIndex}
                        className='text-center w-8 h-8 pt-1 rounded-full'
                      >
                        {day !== 0 ? day : ""}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </ResizablePanel>
      </ResizablePanelGroup>
      <div className='p-4 flex justify-between items-center'>
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
