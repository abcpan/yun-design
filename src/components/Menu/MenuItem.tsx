import React, {useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./context"
export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: (currentIndex: number) => void;
  selectedIndex?: string
}

const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext)
  const cls = classNames("menu-item", className, {
    "disabled": disabled,
    "menu-item-active": index === context.index
  })

  // 向上传递当前索引
  const handleClick = (e: React.MouseEvent) => {
    if (context.mode === "vertical") {
      e.stopPropagation();
    }
    if (context.onSelect && !disabled && typeof index === "string" ) {
      context.onSelect(index);
    }
  }
 
  return (
    <li className={cls} style={style} onClick={handleClick} data-tab={index}>
      {children}
    </li>
  )
}
MenuItem.displayName = "MenuItem"
export default MenuItem;