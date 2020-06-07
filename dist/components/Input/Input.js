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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect } from "react";
import classNames from "classnames";
export var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prefix = props.prefix, suffix = props.suffix, className = props.className, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prefix", "suffix", "className", "style"]);
    var initValue = "value" in props ? (props.value || "") : (props.defaultValue || "");
    if ("defaultValue" in restProps) {
        delete restProps.defaultValue;
    }
    var _b = useState(initValue), temp = _b[0], setTemp = _b[1];
    useEffect(function () {
        setTemp(initValue);
    }, [initValue]);
    var handleChange = function (e) {
        var value = e.target.value;
        if (!("value" in props)) {
            setTemp(value);
        }
        if (props.onChange) {
            props.onChange(__assign({ target: value }, e));
        }
    };
    /**样式 */
    var cls = classNames("input-wrapper", className, (_a = {},
        _a["input-" + size] = size,
        _a["input-disabled"] = disabled,
        _a['input-group'] = suffix || prefix,
        _a['input-group-prefix'] = Boolean(prefix),
        _a['input-group-suffix'] = Boolean(suffix),
        _a));
    return (React.createElement("div", { className: cls, style: style },
        prefix && (React.createElement("div", { className: "input-group-prefix" }, prefix)),
        React.createElement("input", __assign({ disabled: disabled, className: "input-inner" }, restProps, { value: temp, onChange: handleChange })),
        suffix && (React.createElement("div", { className: "input-group-suffix" }, suffix))));
};
Input.displayName = "Input";
export default Input;
