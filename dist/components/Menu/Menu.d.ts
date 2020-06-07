import React from "react";
import { SelectCallback } from "./context";
export declare type MenuType = "horizontal" | "vertical";
export interface IMenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuType;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenu?: Array<string>;
    SubMenu?: React.Component;
    Item?: React.Component;
}
declare const Menu: React.FC<IMenuProps>;
export default Menu;
