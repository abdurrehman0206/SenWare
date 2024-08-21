import Image from "next/image";
import { AvatarIcon } from "../Icons/Avatar";
import { NotificationIcon } from "../Icons/Notification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserBar = () => {
  return (
    <div className="flex flex-row items-center gap-5">
      <button className="cursor-pointer">
        <NotificationIcon className={"h-6 w-6 stroke-black"} />
      </button>
      <span className="flex items-center gap-2">
        {/*<div className=" border rounded-full shadow-sm">
          <AvatarIcon className={"w-6 h-6 m-1 fill-teal-400"} />
        </div> */}
        <Avatar className="h-8 w-8 border p-1 shadow-sm">
          <AvatarImage
            src={"avatar.svg"}
            className="object-cover text-teal-400"
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>

        <h5>Admin</h5>
      </span>
    </div>
  );
};

export default UserBar;
