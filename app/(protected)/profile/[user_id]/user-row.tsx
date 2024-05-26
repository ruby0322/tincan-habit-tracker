"use client";

import UserAvatar from "@/components/user-avatar";

const UserRow = ({
  username,
  user_id,
  avatar,
  profile_id,
}: {
  username: string;
  user_id: string;
  avatar: string;
  profile_id: string;
}) => {
  return (
    <div className='flex w-full items-center justify-between p-2'>
      <div className='flex items-center'>
        <UserAvatar
          profile={{
            avatar_url: avatar,
            user_id,
            username,
          }}
        />
        <div className='ml-4'>{username}</div>
      </div>
    </div>
  );
};

export default UserRow;
