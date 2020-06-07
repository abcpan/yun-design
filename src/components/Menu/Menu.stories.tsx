import React from "react";
import { storiesOf } from "@storybook/react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";

const MenuWithSub = () => {
  return (
    <Menu>
      <MenuItem>选项1</MenuItem>
      <MenuItem>选项2</MenuItem>
      <SubMenu title="选项3">
        <MenuItem>选项3-1</MenuItem>
        <MenuItem>选项3-2</MenuItem>
        <MenuItem>选项3-3</MenuItem>
      </SubMenu>
      <MenuItem>选项4</MenuItem>
    </Menu>
  )
}

storiesOf("Menu", module).add("子菜单", MenuWithSub)