"use client";

import { updateProfile } from "@/actions/user";
import UserAvatar from "@/components/user-avatar";
import { Profile } from "@/type";

import { useForm, type Resolver } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AvatarFormValues {
  picture: FileList;
}

const resolver: Resolver<AvatarFormValues> = async (values) => {
  return {
    values: values.picture?.length > 0 ? values : {},
    errors:
      values.picture?.length === 0
        ? {
            picture: {
              type: "required",
              message: "This is required.",
            },
          }
        : {},
  };
};

function EditableAvatar({ profile }: { profile: Profile }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AvatarFormValues>({
    resolver,
  });

  const onSubmit = async (avatarFormValues: AvatarFormValues) => {
    console.log("submit");
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      updateProfile(profile.user_id, profile.username, base64 as string);
    };
    reader.readAsDataURL(avatarFormValues.picture[0]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex items-center justify-center pt-8'>
          <UserAvatar
            profile={{
              avatar_url: profile.avatar_url,
              user_id: profile.user_id,
              username: profile.username,
            }}
            className='w-32 h-32 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'
          />
        </div>
      </DialogTrigger>
      <DialogContent className='w-[20rem] bg-white'>
        <DialogHeader>
          <DialogTitle>更新頭貼</DialogTitle>
          <DialogDescription>
            你可以隨時更新頭貼。
            <br />
            檔案上傳有 4MB 的大小限制。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4 py-4'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='picture'>頭像</Label>
              <Input
                onDrop={(event) => {
                  console.log(event);
                }}
                id='picture'
                type='file'
                {...register("picture")}
              />
              {errors.picture && (
                <p className='text-red-500'>{errors.picture.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='default'
              className='w-full bg-gray-800 dark:bg-gray-800'
              type='submit'
              disabled={!isValid}
            >
              儲存
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditableAvatar;
