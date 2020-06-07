import React from "react";
import { MenuType } from "./Menu";
export declare type SelectCallback = (index: string) => void;
export interface IMenuContext {
    index?: string;
    onSelect?: SelectCallback;
    mode?: MenuType;
}
export declare const MenuContext: React.Context<IMenuContext>;
