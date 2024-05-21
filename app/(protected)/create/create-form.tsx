import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";

const CreateForm = ({
  title,
  titleSetter,
  numDailyGoalUnit,
  numDailyGoalUnitSetter,
  dailyGoalUnit,
  dailyGoalUnitSetter,
  startDate,
  startDateSetter,
  endDate,
  endDateSetter,
  frequency,
  frequencySetter,
  onSubmit,
}: {
  title: string;
  titleSetter: (x: string) => void;
  numDailyGoalUnit: number;
  numDailyGoalUnitSetter: (x: number) => void;
  dailyGoalUnit: string;
  dailyGoalUnitSetter: (x: string) => void;
  startDate: Date;
  startDateSetter: (x: Date) => void;
  endDate: Date;
  endDateSetter: (x: Date) => void;
  frequency: { [weekday: string]: boolean };
  frequencySetter: (x: (prev: { [weekday: string]: boolean }) => { [weekday: string]: boolean }) => void;
  onSubmit: () => void;
}) => {
  const onInputChange = (setter: (x: string) => void) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setter(e.target.value);
    };
  };

  const onInputNumChange = (setter: (x: number) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
    if (value === '') {
      setter(0);
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        setter(numValue);
      }
    }
    };
  };

  const onSliderChange = (setter: (x: number) => void) => {
    return (value: number[]) => {
      setter(value[0]);
    };
  };

  const getSetter = (key: string) => frequencySetter((prevFreq: { [weekday: string]: boolean }) => { 
    prevFreq[key] = !prevFreq[key];
    // console.log(prevFreq);
    return prevFreq;
  });

  return (
    <Card className='w-[350px] animate-in'>
      <CardHeader>
        <CardTitle>建立新習慣</CardTitle>
        {/* <CardDescription>調整參數以預覽效果（圖片生成較久）</CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className='grid w-full items-center gap-4'>
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
            <Label htmlFor='title'>習慣每日次數</Label>
            <Input
              value={numDailyGoalUnit === 0 ? "" : numDailyGoalUnit}
              onChange={onInputNumChange(numDailyGoalUnitSetter)}
              id='numDailyGoalUnit'
              placeholder='習慣每日次數'
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='title'>習慣單位</Label>
            <Input
              value={dailyGoalUnit}
              onChange={onInputChange(dailyGoalUnitSetter)}
              id='dailyGoalUnit'
              placeholder='習慣單位 (e.g. 500 c.c.)'
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='title'>習慣持續期間</Label>
            <DateRangePicker align="center" onUpdate={(values) => {
              // console.log(values.range.from, values.range.to);
              startDateSetter(values.range.from);
              values.range.to == undefined ? endDateSetter(values.range.from) : endDateSetter(values.range.to);
              }}/>
          </div>
          <div className='flex flex-col space-y-3'>
            <Label htmlFor='failure-streak'>頻率</Label>
            {/* checkbox * 7 */}
            <div className="flex justify-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(weekday => 
                <div key={`checkbox-${weekday}`} className="px-2 flex flex-col items-center">
                <div>{weekday}</div>
                <Checkbox id={weekday} onClick={(checked) => getSetter(weekday)} />
                </div>
                )}
            {/* <Checkbox id="test" onCheckedChange={(checked) => {console.log(1)}}/> */}
            </div>
            
          </div>
          
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button onClick={onSubmit}>生成</Button>
      </CardFooter>
    </Card>
  );
};

export default CreateForm;