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

const UserRow = ({ username, avatar, isFollowing}: {username: string, avatar: string, isFollowing: Boolean}) => {
    
    return (
        <div>
          <Card className="w-[400px] h-[60px]">
            <CardContent>
            <div className="flex">
                <div className="flex w-full items-center justify-between p-2">
                    <div className="flex items-center">
                        <Avatar>
                            <AvatarImage src={avatar} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">{username}</div>
                    </div>
                    <Button size="sm">追蹤</Button>
                </div>
                </div>
            </CardContent>
          </Card>
        </div>
    )
}

export default UserRow;