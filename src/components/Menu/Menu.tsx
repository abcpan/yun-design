import React, { useState } from "react";
import classNames from "classnames"
import { IMenuItemProps } from "./MenuItem"
import { SelectCallback, IMenuContext, MenuContext } from "./context";
import { ISubMenuProps } from "./SubMenu";
export type MenuType = "horizontal" | "vertical";
export interface IMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuType;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  defaultOpenSubMenu?: Array<string>;
  SubMenu?: React.Component;
  Item?:React.Component
}

const Menu: React.FC<IMenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex = "0",
    onSelect,
    defaultOpenSubMenu
  } = props;
  const [selectedIndex, setSelectedIndex] = useState<string>(defaultIndex);
  const cls = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal"

  })

  const handleClick = (index: string) => {
    setSelectedIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  }

  const menuContext: IMenuContext = {
    index: selectedIndex,
    onSelect: handleClick,
    mode: mode
  }

  // 渲染子节点
  const renderChildren = () => {
    return React.Children.map(children, (child , index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps | ISubMenuProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      }
      if (displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: index.toString(),
          isOpen: defaultOpenSubMenu!.includes(index.toString())
        });
       
      }
      else {
        console.warn("Warning:-->")
      }
    })
  }
  return (
    <ul className={cls} style={style}>
      <MenuContext.Provider value={menuContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenu: []
}

export default Menu;