import React from "react";
export interface ISubMenuProps {
    index?: number;
    title: string;
    className?: string;
    isOpen?: boolean;
}
declare const SubMenu: React.FC<ISubMenuProps>;
export default SubMenu;
