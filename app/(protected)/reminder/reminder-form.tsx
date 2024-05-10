import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";

export function ReminderForm({
  username,
  usernameSetter,
  title,
  titleSetter,
  goal,
  goalSetter,
  completionStreak,
  completionStreakSetter,
  failureStreak,
  failureStreakSetter,
  onSubmit,
}: {
  username: string;
  usernameSetter: (x: string) => void;
  title: string;
  titleSetter: (x: string) => void;
  goal: string;
  goalSetter: (x: string) => void;
  completionStreak: number;
  completionStreakSetter: (x: number) => void;
  failureStreak: number;
  failureStreakSetter: (x: number) => void;
  onSubmit: () => void;
}) {
  const onInputChange = (setter: (x: string) => void) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setter(e.target.value);
    };
  };
  const onSliderChange = (setter: (x: number) => void) => {
    return (value: number[]) => {
      setter(value[0]);
    };
  };
  return (
    <Card className='w-[350px] animate-in'>
      <CardHeader>
        <CardTitle>提醒訊息實驗室</CardTitle>
        <CardDescription>調整參數以預覽效果</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='username'>使用者名稱</Label>
            <Input
              id='username'
              value={username}
              onChange={onInputChange(usernameSetter)}
              placeholder='使用者名稱'
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='title'>習慣標題</Label>
            <Input
              value={title}
              onChange={onInputChange(titleSetter)}
              id='title'
              placeholder='習慣標題'
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='goal'>今日目標</Label>
            <Input
              value={goal}
              onChange={onInputChange(goalSetter)}
              id='goal'
              placeholder='今日目標'
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <Label htmlFor='completion-streak'>連續達成次數</Label>
            <Slider
              value={[completionStreak]}
              onValueChange={onSliderChange(completionStreakSetter)}
              defaultValue={[0]}
              max={30}
              step={1}
              className={cn(failureStreak > 0 && "opacity-30")}
              disabled={failureStreak > 0}
            />
          </div>
          <div className='flex flex-col space-y-3'>
            <Label htmlFor='failure-streak'>連續失敗次數</Label>
            <Slider
              className={cn(completionStreak > 0 && "opacity-30")}
              disabled={completionStreak > 0}
              value={[failureStreak]}
              onValueChange={onSliderChange(failureStreakSetter)}
              defaultValue={[0]}
              max={30}
              step={1}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button onClick={onSubmit}>生成</Button>
      </CardFooter>
    </Card>
  );
}
