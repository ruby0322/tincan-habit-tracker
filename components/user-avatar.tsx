"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ProfileTable } from "@/type";
import { useRouter } from "next/navigation";

const UserAvatar = ({
  profile,
  className,
}: {
  profile: ProfileTable;
  className?: string;
}) => {
  const router = useRouter();
  const onAvatarClick = () => {
    router.push(`/profile/${profile.user_id}`);
  };
  return (
    <div onClick={onAvatarClick}>
      <Avatar className={cn(className, "cursor-pointer")}>
        <AvatarImage
          alt={profile.username}
          src={profile.avatar_url as string}
        />
        <AvatarFallback>{profile.username}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;