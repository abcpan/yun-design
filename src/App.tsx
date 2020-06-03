import React from 'react';
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import SubMenu from "./components/Menu/SubMenu";

const App: React.FC<{}> = () => {
  return (
    <div>
      <Menu defaultIndex={"0"} onSelect={(index) => console.log(index)} defaultOpenSubMenu={["1","2"]} mode="vertical">
        <MenuItem >选项1</MenuItem>
        <SubMenu title="我们">
          <MenuItem>我们111111111111111111111111</MenuItem>
          <MenuItem>我们2</MenuItem>
        </SubMenu>
        <SubMenu title="他们">
          <MenuItem>他们</MenuItem>
          <MenuItem>他么</MenuItem>
        </SubMenu>
        <MenuItem >选项2</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
