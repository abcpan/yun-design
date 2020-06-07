import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./context";
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children, selectedIndex = props.selectedIndex;
    var context = useContext(MenuContext);
    var cls = classNames("menu-item", className, {
        "disabled": disabled,
        "menu-item-active": index === context.index
    });
    // 向上传递当前索引
    var handleClick = function (e) {
        if (context.mode === "vertical") {
            e.stopPropagation();
        }
        if (context.onSelect && !disabled && typeof index === "string") {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: cls, style: style, onClick: handleClick, "data-tab": index }, children));
};
MenuItem.displayName = "MenuItem";
export default MenuItem;
