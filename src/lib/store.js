import { MdSpaceDashboard, MdInventory2 } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
export const LinksArray = [
  {
    id: 1,
    path: "/",
    name: "Home",
    icon: <MdSpaceDashboard />,
  },
  {
    id: 2,
    path: "/add",
    name: "Add Item",
    icon: <MdInventory2 />,
  },
  {
    id: 3,
    path: "/issue",
    name: "Issue",
    icon: <FaBox />,
  },
  {
    id: 4,
    path: "/reports",
    name: "Reports",
    icon: <TbReportSearch />,
  },
];
