var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./context";
import Icon from "../Icon/Icon";
var SubMenu = function (props) {
    // 事件ref
    var timerRef = React.createRef();
    var index = props.index, className = props.className, title = props.title, _a = props.isOpen, isOpen = _a === void 0 ? false : _a;
    var context = useContext(MenuContext);
    // 开关状态
    var _b = useState(isOpen), open = _b[0], setOpen = _b[1];
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(function (prev) { return !prev; });
    };
    // event handler
    var handleMouse = function (e, toggle) {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        e.preventDefault();
        timerRef.current = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    // 
    var mouseEvents = context.mode === "vertical" ? {
        onClick: handleClick
    } : {
        onMouseEnter: function (e) { return handleMouse(e, true); },
        onMouseLeave: function (e) { return handleMouse(e, false); },
        onClick: handleClick
    };
    // 渲染子菜单
    var rencerChildren = function () {
        var childrenComponent = React.Children.map(props.children, function (child, idx) {
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, { index: index + "-" + idx });
            }
            else {
                console.error("error--->");
            }
        });
        return (React.createElement("ul", { className: "submenu-wrap" }, childrenComponent));
    };
    var cls = classNames("menu-item submenu", className, {
        "submenu-open": open
    });
    return (React.createElement("li", __assign({ className: cls }, mouseEvents),
        React.createElement("div", { className: "submenu-title" },
            title,
            React.createElement(Icon, { icon: "chevron-down", size: "sm", className: "arrow-down" })),
        rencerChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
