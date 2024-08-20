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
        isActive(path) ? "bg-sky-200" : "",
        "rounded-sm px-4 py-2 flex flex-row items-center gap-2 hover:bg-sky-100",
      )}
    >
      <div>{icon}</div>
      <Link href={path}>{name}</Link>
    </div>
  );
};
export default NavLink;
