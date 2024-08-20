"use client";

import { LinkType } from "@/lib/types";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const NavLink: React.FC<LinkType> = ({ id, name, path, icon }) => {
  const pathname = usePathname();
  const isActive = (routePath: string) => routePath === pathname;
  return (
    <div
      className={clsx(
        isActive(path) ? "bg-teal-300" : "hover:bg-teal-100",
        "rounded-lg px-4 py-2 flex flex-row items-center ",
      )}
    >
      <Link className="w-full flex flex-row items-center gap-2" href={path}>
        <div className="h-7 w-6">{icon}</div>
        {name}
      </Link>
    </div>
  );
};
export default NavLink;
