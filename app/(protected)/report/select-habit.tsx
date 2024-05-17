"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Calendar from "./calendar"
import ProgressBar from "./progress-bar"
import { Progress } from "@/components/ui/progress";
import { randomInt } from "crypto"

const lightHabits = [
  {
    habit_id: "idaaaaa",
    title: "喝水",
  },
  {
    habit_id: "idbbbbb",
    title: "健身",
  },
  {
    habit_id: "idccccc",
    title: "打羽球",
  },
  {
    habit_id: "idddddd",
    title: "摸貓咪",
  },
  {
    habit_id: "ideeeee",
    title: "踹狗",
  },
]

const SelectHabit = () => {
  const [open, setOpen] = React.useState(false)
  const [habitId, setHabitId] = React.useState("")
  // habitId 存目前選擇哪個 habit 的 id，目前應該沒有總完成率這個選項，有空可以再加

  return (
    <div className="justify-align">
      <div className="p-2 flex justify-center">
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
                >
                {habitId
                    ? lightHabits.find((lightHabit) => lightHabit.habit_id === habitId)?.title
                    : "請選擇習慣"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                {/* <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No framework found.</CommandEmpty> */}
                <CommandGroup>
                    {lightHabits.map((lightHabit) => (
                    <CommandItem
                        key={lightHabit.habit_id}
                        value={lightHabit.habit_id}
                        onSelect={(currentValue) => {
                        // currentValue 就是目前選擇到的那個 habit_id
                        setHabitId(currentValue === habitId ? "" : currentValue)
                        setOpen(false)
                        }}
                    >
                        <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            habitId === lightHabit.habit_id ? "opacity-100" : "opacity-0"
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
        <div className="p-2">
          <Calendar habit_id={habitId}/>
        </div>
        
    </div>
    
  )
}

export default SelectHabit;