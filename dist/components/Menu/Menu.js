import React, { useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./context";
var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, _a = props.defaultIndex, defaultIndex = _a === void 0 ? "0" : _a, onSelect = props.onSelect, defaultOpenSubMenu = props.defaultOpenSubMenu;
    var _b = useState(defaultIndex), selectedIndex = _b[0], setSelectedIndex = _b[1];
    var cls = classNames("menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode === "horizontal"
    });
    var handleClick = function (index) {
        setSelectedIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var menuContext = {
        index: selectedIndex,
        onSelect: handleClick,
        mode: mode
    };
    // 渲染子节点
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                });
            }
            if (displayName === "SubMenu") {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                    isOpen: defaultOpenSubMenu.includes(index.toString())
                });
            }
            else {
                console.warn("Warning:-->");
            }
        });
    };
    return (React.createElement("ul", { className: cls, style: style },
        React.createElement(MenuContext.Provider, { value: menuContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenu: []
};
export default Menu;
