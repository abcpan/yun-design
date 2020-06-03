import React from "react";
import { MenuType } from "./Menu"
export type SelectCallback = (index: string) => void;
export interface IMenuContext {
  index?: string;
  onSelect?: SelectCallback;
  mode?: MenuType;
}

export const MenuContext = React.createContext<IMenuContext>({});