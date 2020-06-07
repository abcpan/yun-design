import React from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export declare type ThemeType = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "dark" | "light";
export interface IIconProps extends FontAwesomeIconProps {
    theme?: ThemeType;
}
declare const Icon: React.FC<IIconProps>;
export default Icon;
