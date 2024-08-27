import { HomeIcon } from "@/components/Icons/Home";

import { IssueIcon } from "@/components/Icons/Issue";
import { ReportsIcon } from "@/components/Icons/Reports";
import { InventoryIcon } from "@/components/Icons/Inventory";
import { AddUserIcon } from "@/components/Icons/AddUser";
export const LinksArray = [
  {
    id: 1,
    path: "/",
    name: "Home",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    path: "/inventory",
    name: "Inventory",
    icon: <InventoryIcon className={"h-6 w-6 stroke-black"} />,
  },
  {
    id: 3,
    path: "/recipients",
    name: "Recipients",
    icon: <AddUserIcon className={"h-6 w-6 stroke-black"} />,
  },
  {
    id: 4,
    path: "/issue",
    name: "Issued",
    icon: <IssueIcon className={"h-6 w-6 stroke-black"} />,
  },
  {
    id: 5,
    path: "/reports",
    name: "Reports",
    icon: <ReportsIcon />,
  },
];
