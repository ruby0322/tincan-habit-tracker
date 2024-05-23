"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { updateProfile } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import EditButton from "./edit-button";

const ProfileBar = ({
  userId,
  username,
  email,
  isMe,
  avatar,
}: {
  userId: string;
  username: string;
  email?: string;
  isMe: Boolean;
  avatar: string;
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");

  const onAvatarClick = async () => {
    return;
  };

  const onSubmit = async () => {
    setLoading(true);
    await updateProfile(userId, newUsername);
    setNewUsername("");
    setLoading(false);
    setDialogOpen(false);
  };

  return (
    <div className='flex flex-col items-center justify-between p-4 gap-4'>
      <div>
        <Avatar className='w-32 h-32 cursor-pointer' onClick={onAvatarClick}>
          <AvatarImage src={avatar} alt='@shadcn' />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <Card className='w-[400px]'>
          <CardContent>
            <div className='flex'>
              <div className='grid w-full items-center'>
                <div className='flex flex-col py-6'>
                  <Label htmlFor='name'>
                    {" "}
                    <Badge variant='secondary'>用戶名稱</Badge> {username}
                  </Label>
                </div>
                <div className='flex flex-col'>
                  <Label htmlFor='framework'>
                    {" "}
                    <Badge variant='secondary'>電子郵件</Badge> {email}
                  </Label>
                </div>
              </div>
              <div
                onClick={() => {
                  setDialogOpen(true);
                }}
                className='py-4'
              >
                {isMe && (
                  <EditButton
                    dialogOpen={dialogOpen}
                    loading={loading}
                    newUsername={newUsername}
                    setNewUsername={setNewUsername}
                    onSubmit={onSubmit}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileBar;
