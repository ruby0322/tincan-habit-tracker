"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { followUser } from "@/actions/user"
import { createClient } from "@/utils/supabase/client";

const UserRow = ({ username, user_id, avatar, isFollowing, profile_id}: {username: string, user_id: string, avatar: string, isFollowing: Boolean, profile_id: string}) => {
    
    const handleClickFollow = async () => {
        const supabase = createClient();
        const {
            data: { user },
          } = await supabase.auth.getUser();
        followUser(user?.id as string, user_id, profile_id);
        console.log(username);
    }

    return (
        <div>
          <Card className="w-[400px] h-[60px]">
            <CardContent>
            <div className="flex">
                <div className="flex w-full items-center justify-between p-2">
                    <div className="flex items-center">
                        <Avatar>
                            <AvatarImage src={avatar} alt="@shadcn" />
                            <AvatarFallback>{username}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">{username}</div>
                    </div>
                    {isFollowing ? <Button variant="secondary" onClick={handleClickFollow}>追蹤中</Button>: <Button size="sm" onClick={handleClickFollow}>追蹤</Button>}
                </div>
                </div>
            </CardContent>
          </Card>
        </div>
    )
}

export default UserRow;