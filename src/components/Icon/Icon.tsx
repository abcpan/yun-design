import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
export type ThemeType = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "dark" | "light";
export interface IIconProps extends FontAwesomeIconProps{
  theme?: ThemeType
}

const Icon: React.FC<IIconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const cls = classNames("yun-icon", className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={cls} {...restProps}/>
  )
}

export default Icon;