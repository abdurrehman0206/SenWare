import { LinksArray } from "@/lib/store";
import NavLink from "./NavLink";
const Links = () => {
  const linkElement = LinksArray.map((link) => {
    return <NavLink key={link.id} {...link} />;
  });
  return <div>{linkElement} </div>;
};
export default Links;
