"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { createClient } from "@/utils/supabase/client";

const ProfileBar = ({ username, email, isMe }: { username: string, email?: string, isMe: Boolean }) => {
    return (
        <div className="flex justify-between p-4">
        <div>
        <Card className="w-[400px]">
        <CardContent>
          <div className="flex">
            <div className="grid w-full items-center">
              <div className="flex flex-col py-6">
                <Label htmlFor="name"> <Badge variant="secondary">用戶名稱</Badge> {username}</Label>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="framework"> <Badge variant="secondary">電子郵件</Badge> {email}</Label>
              </div>
            </div>
            <div className="py-4">
                {isMe ? <Button size="sm">編輯</Button> : <div></div>}
            </div>
          </div>
          
        </CardContent>
      </Card>
        </div>
      </div>
    )
}

export default ProfileBar;