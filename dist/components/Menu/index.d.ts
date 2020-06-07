import { FC } from "react";
import Menu, { IMenuProps } from "./Menu";
import { IMenuItemProps } from "./MenuItem";
import { ISubMenuProps } from "./SubMenu";
export declare type IMenuComponent = FC<IMenuProps> & {
    Item: FC<IMenuItemProps>;
    SubMenu: FC<ISubMenuProps>;
};
export default Menu;
