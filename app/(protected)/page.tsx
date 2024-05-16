/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ORhCLjfFs0X
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Component() {
  return (
    <div className='flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900'>
      <header className='bg-white dark:bg-gray-950 shadow-sm'>
        <div className='container mx-auto px-4 py-4 md:px-6 md:py-5 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Habit Tracker</h1>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2 text-gray-500 dark:text-gray-400'>
              <CalendarDaysIcon className='w-5 h-5' />
              <span>May 14, 2024</span>
            </div>
            <Button className='rounded-full' size='icon' variant='ghost'>
              <img
                alt='Avatar'
                className='rounded-full border'
                height='32'
                src='/placeholder.svg'
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width='32'
              />
              <span className='sr-only'>Toggle user menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className='flex-1 container mx-auto px-4 py-8 md:px-6 md:py-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          <div className='bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 grid gap-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Meditate</h2>
              <div className='flex items-center gap-2'>
                <CheckIcon className='w-5 h-5 text-green-500' />
                <span className='text-sm text-green-500'>Completed</span>
              </div>
            </div>
            <Progress className='h-3' value={100} />
            <Button className='w-full' variant='outline'>
              Mark as Complete
            </Button>
          </div>
          <div className='bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 grid gap-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Exercise</h2>
              <div className='flex items-center gap-2'>
                <ClockIcon className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  In Progress
                </span>
              </div>
            </div>
            <Progress className='h-3' value={75} />
            <Button className='w-full' variant='outline'>
              Mark as Complete
            </Button>
          </div>
          <div className='bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 grid gap-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Read</h2>
              <div className='flex items-center gap-2'>
                <ClockIcon className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  In Progress
                </span>
              </div>
            </div>
            <Progress className='h-3' value={50} />
            <Button className='w-full' variant='outline'>
              Mark as Complete
            </Button>
          </div>
          <div className='bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 grid gap-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Journal</h2>
              <div className='flex items-center gap-2'>
                <ClockIcon className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  In Progress
                </span>
              </div>
            </div>
            <Progress className='h-3' value={25} />
            <Button className='w-full' variant='outline'>
              Mark as Complete
            </Button>
          </div>
          <div className='bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 grid gap-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Learn</h2>
              <div className='flex items-center gap-2'>
                <ClockIcon className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  In Progress
                </span>
              </div>
            </div>
            <Progress className='h-3' value={60} />
            <Button className='w-full' variant='outline'>
              Mark as Complete
            </Button>
          </div>
          <div className='bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 grid gap-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-lg font-semibold'>Drink Water</h2>
              <div className='flex items-center gap-2'>
                <CheckIcon className='w-5 h-5 text-green-500' />
                <span className='text-sm text-green-500'>Completed</span>
              </div>
            </div>
            <Progress className='h-3' value={100} />
            <Button className='w-full' variant='outline'>
              Mark as Complete
            </Button>
          </div>
        </div>
        <div className='mt-8 bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 grid md:grid-cols-3 gap-6'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>Total Habits</h3>
            <span className='text-4xl font-bold'>6</span>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>Habits Completed</h3>
            <span className='text-4xl font-bold'>2</span>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>Habits in Progress</h3>
            <span className='text-4xl font-bold'>4</span>
          </div>
        </div>
      </main>
    </div>
  );
}

function CalendarDaysIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M8 2v4' />
      <path d='M16 2v4' />
      <rect width='18' height='18' x='3' y='4' rx='2' />
      <path d='M3 10h18' />
      <path d='M8 14h.01' />
      <path d='M12 14h.01' />
      <path d='M16 14h.01' />
      <path d='M8 18h.01' />
      <path d='M12 18h.01' />
      <path d='M16 18h.01' />
    </svg>
  );
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M20 6 9 17l-5-5' />
    </svg>
  );
}

function ClockIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  );
}
