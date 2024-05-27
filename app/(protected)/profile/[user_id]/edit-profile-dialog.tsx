"use client";

import { updateProfile } from "@/actions/user";
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
import { PencilLine } from "lucide-react";
import { ChangeEvent, useState } from "react";

const EditProfileDialog = ({ userId }: { userId: string }) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewUsername(e.target.value);
  };
  const onSubmit = async () => {
    setLoading(true);
    await updateProfile(userId, newUsername);
    setLoading(false);
    setDialogOpen(false);
  };
  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        <PencilLine
          onClick={(e) => {
            setDialogOpen(true);
          }}
          className='cursor-pointer w-4 h-4 text-gray-400'
        />
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          setDialogOpen(false);
        }}
        onEscapeKeyDown={(e) => {
          setDialogOpen(false);
        }}
        className='sm:max-w-[425px]'
      >
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

export default EditProfileDialog;
