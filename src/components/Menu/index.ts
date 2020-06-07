import { FC } from "react";
import Menu, { IMenuProps } from "./Menu";
import MenuItem, {IMenuItemProps} from "./MenuItem";
import SubMenu, { ISubMenuProps } from "./SubMenu";


export type IMenuComponent = FC<IMenuProps> & {
  Item: FC<IMenuItemProps>;
  SubMenu: FC<ISubMenuProps>;
}
const TransMenu = Menu as IMenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default Menu;