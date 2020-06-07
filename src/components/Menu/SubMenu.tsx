import React, { useContext, useState } from "react";
import classNames from "classnames";
import { IMenuItemProps } from "./MenuItem";
import { MenuContext } from "./context";
import Icon from "../Icon/Icon";
export interface ISubMenuProps  {
  index?: number;
  title: string;
  className?: string;
  isOpen?: boolean
}

const SubMenu: React.FC<ISubMenuProps> = (props) => {
  // 事件ref
  const timerRef = React.createRef();
  const { index, className, title, isOpen = false} = props;
  const context = useContext(MenuContext);
  // 开关状态
  const [open, setOpen] = useState<boolean>(isOpen);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(prev => !prev);
  }

  // event handler
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current as any);
    }
    e.preventDefault();
    (timerRef.current as any) = setTimeout(() => {
      setOpen(toggle);
    }, 300)
  }

  // 
  const mouseEvents = context.mode === "vertical" ? {
    onClick: handleClick
  } : {
      onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
      onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false),
      onClick: handleClick
  }
  // 渲染子菜单
  const rencerChildren = () => {
    const childrenComponent = React.Children.map(props.children, (child, idx) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement,{index: `${index}-${idx}`} )
      } else {
        console.error("error--->")
      }
    })
    
    return (
      <ul className= "submenu-wrap">
        {childrenComponent}
      </ul>
    )
  }

  const cls = classNames("menu-item submenu", className, {
    "submenu-open": open
  })
  return (
    <li className={cls} {...mouseEvents}>
      <div className="submenu-title">
        {title}
        <Icon icon="chevron-down" size="sm" className="arrow-down"/>
      </div>
      {rencerChildren()}
    </li>
  )
}

SubMenu.displayName = "SubMenu";
export default SubMenu;