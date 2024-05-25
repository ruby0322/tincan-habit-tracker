"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LightHabit } from "@/type";
import Calendar from "./calendar";

import { useParams, useRouter } from "next/navigation";
// const lightHabits = [
//   {
//     habit_id: "idaaaaa",
//     title: "喝水",
//   },
//   {
//     habit_id: "idbbbbb",
//     title: "健身",
//   },
//   {
//     habit_id: "idccccc",
//     title: "打羽球",
//   },
//   {
//     habit_id: "idddddd",
//     title: "摸貓咪",
//   },
//   {
//     habit_id: "ideeeee",
//     title: "踹狗",
//   },
// ];

const SelectHabit = ({
  lightHabits,
  selectedHabitId,
}: {
  lightHabits: LightHabit[];
  selectedHabitId: string;
}) => {
  const params = useParams<{ habit_id: string }>();
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [habitId, setHabitId] = React.useState<string>(params.habit_id);
  // habitId 存目前選擇哪個 habit 的 id，目前應該沒有總完成率這個選項，有空可以再加

  return (
    <div className='justify-align'>
      <div className='p-2 flex justify-center'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-[200px] justify-between'
            >
              {habitId
                ? lightHabits.find(
                    (lightHabit) => lightHabit.habit_id === habitId
                  )?.title
                : "請選擇習慣"}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              {/* <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No framework found.</CommandEmpty> */}
              <CommandGroup>
                {lightHabits.map((lightHabit) => (
                  <CommandItem
                    key={lightHabit.habit_id}
                    value={lightHabit.habit_id}
                    onSelect={(currentValue) => {
                      router.push(`/report/${lightHabit.habit_id}`);
                      setHabitId(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        habitId === lightHabit.habit_id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {lightHabit.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className='p-2'>
        <Calendar habit_id={habitId} />
      </div>
    </div>
  );
};

export default SelectHabit;
