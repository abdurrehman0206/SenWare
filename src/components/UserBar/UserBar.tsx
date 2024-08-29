import Image from "next/image";
import { AvatarIcon } from "@/components/Icons/Avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationIcon } from "@/components/Icons/Notification";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { auth } from "@/auth";
const UserBar = async () => {
  const session = await auth();

  return (
    <div className="flex flex-row items-center gap-5">
      {/*
  <HoverCard>
    <HoverCardTrigger className="cursor-pointer">
      <NotificationIcon className={"h-6 w-6 stroke-black"} />
    </HoverCardTrigger>
    <HoverCardContent className="mr-32">Test Notification</HoverCardContent>
  </HoverCard> */}
      <span className="flex items-center gap-2">
        {/*<div className=" border rounded-full shadow-sm">
          <AvatarIcon className={"w-6 h-6 m-1 fill-teal-400"} />
        </div> */}
        <Avatar className="h-8 w-8 border p-1 shadow-sm">
          <AvatarImage
            src={"avatar.svg"}
            className="object-cover text-teal-400"
          />
          <AvatarFallback>
            {session?.user?.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <h5>{session?.user?.username}</h5>
      </span>
    </div>
  );
};

export default UserBar;
