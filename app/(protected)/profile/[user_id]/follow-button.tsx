"use client";

import { checkFollowing, followUser } from "@/actions/user";
import { LoadingButton } from "@/components/ui/loading-button";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const FollowButton = ({
  user_id,
  profile_id,
}: {
  user_id: string;
  profile_id: string;
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      const isFollowing = await checkFollowing(user_id, profile_id);
      setIsFollowing(isFollowing);
      setLoading(false);
    };
    fetchData();
  });
  const handleClickFollow = async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await followUser(user?.id as string, profile_id, profile_id);
    setLoading(false);
  };

  return (
    <LoadingButton
      variant={isFollowing ? "secondary" : "default"}
      loading={loading}
      onClick={handleClickFollow}
      className='w-full'
    >
      {isFollowing ? "追蹤中" : "追蹤"}
    </LoadingButton>
  );
};

export default FollowButton;
