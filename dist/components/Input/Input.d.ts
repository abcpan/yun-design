import React, { ReactElement, InputHTMLAttributes, FC, ChangeEvent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export declare type InputSize = "lg" | "sm";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size" | "prefix"> {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prefix?: string | ReactElement;
    suffix?: string | ReactElement;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    defaultValue?: string;
}
export declare const Input: FC<InputProps>;
export default Input;
