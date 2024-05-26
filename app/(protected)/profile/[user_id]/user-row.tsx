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
  // const [loading, setLoading] = useState<boolean>(false);
  // const handleClickFollow = async () => {
  //   setLoading(true);
  //   const supabase = createClient();
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   await followUser(user?.id as string, user_id, profile_id);
  //   setLoading(false);
  // };

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
