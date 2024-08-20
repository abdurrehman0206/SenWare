import Image from "next/image";
import { AvatarIcon } from "../Icons/Avatar";
import { NotificationIcon } from "../Icons/Notification";
const UserBar = () => {
  return (
    <div className="flex flex-row items-center gap-5">
      <button className="cursor-pointer">
        <NotificationIcon className={"h-6 w-6 stroke-black"} />
      </button>
      <span className="flex items-center gap-2">
        <div className=" border rounded-full">
          <AvatarIcon className={"w-6 h-6 m-1 fill-teal-400"} />
        </div>
        <h5>Username</h5>
      </span>
    </div>
  );
};

export default UserBar;
