import { HomeIcon } from "@/components/Icons/Home";
import { AddIcon } from "@/components/Icons/Add";
import { IssueIcon } from "@/components/Icons/Issue";
import { ReportsIcon } from "@/components/Icons/Reports";
import { InventoryIcon } from "@/components/Icons/Inventory";
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
    path: "/add",
    name: "Add Item",
    icon: <AddIcon className={"h-6 w-6 stroke-black"} />,
  },
  {
    id: 4,
    path: "/issue",
    name: "Issue",
    icon: <IssueIcon />,
  },
  {
    id: 5,
    path: "/reports",
    name: "Reports",
    icon: <ReportsIcon />,
  },
];
