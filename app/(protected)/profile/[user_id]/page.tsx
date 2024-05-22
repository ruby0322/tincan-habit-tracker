"use server";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { createClient } from "@/utils/supabase/server";
import ProfileBar from "./profile-bar";
import { getUserProfile } from "@/actions/user";
import UserRow from "./user-row";

const ProfilePage = async ({ params }: { params: { user_id: string } }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;
  const userProfile = await getUserProfile(userId as string);

  const fakeFollowers = [
    {
      avatar_url: "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-ac331e4b-3ff1-48b5-9da2-01977c6eee94",
      user_id: "a",
      username: "minmin",
    },
    {
      avatar_url: "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-ac331e4b-3ff1-48b5-9da2-01977c6eee94",
      user_id: "b",
      username: "ruby",
    },
    {
      avatar_url: "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-ac331e4b-3ff1-48b5-9da2-01977c6eee94",
      user_id: "c",
      username: "fluffy",
    },
    {
      avatar_url: "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-ac331e4b-3ff1-48b5-9da2-01977c6eee94",
      user_id: "d",
      username: "morris",
    },
    {
      avatar_url: "https://dmbkhireuarjpvecjmds.supabase.co/storage/v1/object/public/image/dalle-image-ac331e4b-3ff1-48b5-9da2-01977c6eee94",
      user_id: "e",
      username: "ja",
    }
  ]

  return (
    <div>
      {/* { userId === params.user_id && } */}
      {/* 上半部（個人資料） */}
      <ProfileBar username={userProfile.username as string} email={user?.email as string} isMe={user?.id == params.user_id}/>
      {/* 下半部（追蹤） */}
      <div className="p-4">
        <Tabs defaultValue="follower" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="follower">粉絲</TabsTrigger>
          <TabsTrigger value="following">追蹤中</TabsTrigger>
        </TabsList>
        <TabsContent value="follower">
          {fakeFollowers.map((fakeFollower) => {
            return (
              <UserRow username={fakeFollower.username} avatar={fakeFollower.avatar_url} isFollowing={true} />
            )
          })}
          {/* <Card>
            <CardHeader>
              <CardTitle>粉絲</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card> */}
        </TabsContent>
        <TabsContent value="following">
          <Card>
            <CardHeader>
              <CardTitle>追蹤中</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
};

export default ProfilePage;
