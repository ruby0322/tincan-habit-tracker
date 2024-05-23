import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { ChangeEvent } from "react";

const EditButton = ({
  dialogOpen,
  loading,
  newUsername,
  setNewUsername,
  onSubmit,
}: {
  dialogOpen: boolean;
  loading: boolean;
  newUsername: string;
  setNewUsername: (x: string) => void;
  onSubmit: () => void;
}) => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.value) {
      setNewUsername(e.target.value);
    }
  };
  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>編輯</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>編輯個人資料</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              使用者名稱
            </Label>
            <Input
              id='username'
              value={newUsername}
              onChange={onInputChange}
              placeholder='你的新名字'
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <LoadingButton
            loading={loading}
            type='submit'
            className='dark:bg-gray-800'
            variant='default'
            onClick={onSubmit}
          >
            儲存
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
