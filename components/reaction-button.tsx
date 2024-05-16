import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AngryIcon,
  AwardIcon,
  FrownIcon,
  HeartIcon,
  LaughIcon,
  SmilePlus,
  ThumbsUpIcon,
} from "lucide-react";

const ReactionButton = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <SmilePlus className='cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent sideOffset={8} side='right'>
        <div className='p-2 flex items-center space-x-2'>
          <Button size='icon' variant='ghost'>
            <ThumbsUpIcon className='h-5 w-5 text-gray-500' />
            <span className='sr-only'>Like</span>
          </Button>
          <Button size='icon' variant='ghost'>
            <HeartIcon className='h-5 w-5 text-gray-500' />
            <span className='sr-only'>Love</span>
          </Button>
          <Button size='icon' variant='ghost'>
            <LaughIcon className='h-5 w-5 text-gray-500' />
            <span className='sr-only'>Laugh</span>
          </Button>
          <Button size='icon' variant='ghost'>
            <AwardIcon className='h-5 w-5 text-gray-500' />
            <span className='sr-only'>Wow</span>
          </Button>
          <Button size='icon' variant='ghost'>
            <FrownIcon className='h-5 w-5 text-gray-500' />
            <span className='sr-only'>Sad</span>
          </Button>
          <Button size='icon' variant='ghost'>
            <AngryIcon className='h-5 w-5 text-gray-500' />
            <span className='sr-only'>Angry</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ReactionButton;
