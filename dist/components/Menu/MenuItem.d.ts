import React from "react";
export interface IMenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: (currentIndex: number) => void;
    selectedIndex?: string;
}
declare const MenuItem: React.FC<IMenuItemProps>;
export default MenuItem;
