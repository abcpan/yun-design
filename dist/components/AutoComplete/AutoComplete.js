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
import Input from "../Input/Input";
import Icon from "../Icon/Icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var debounceValue = useDebounce(inputValue, 300);
    var _d = useState(-1), hightIndex = _d[0], setHightIndex = _d[1];
    useEffect(function () {
        if (debounceValue) {
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then((function (data) {
                    setSuggestions(data);
                    setLoading(false);
                }));
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHightIndex(-1);
    }, [debounceValue]);
    /**修改 */
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
    };
    /**选中某个选项 */
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
    };
    // 处理高亮
    var hightlight = function (index) {
        if (index < 0) {
            index = 0;
        }
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            // 回车
            case 13:
                if (suggestions[hightIndex]) {
                    handleSelect(suggestions[hightIndex]);
                }
                break;
            // 向上
            case 38:
                hightlight(hightIndex - 1);
                break;
            //
            case 40:
                hightlight(hightIndex + 1);
                break;
            // 
            case 27:
                setSuggestions([]);
                break;
            default:
                return;
        }
    };
    var renderTemplate = function (item) {
        var element = null;
        if (props.renderOption) {
            element = props.renderOption(item);
        }
        else {
            element = item.value;
        }
        return element;
    };
    var renderDropdown = function () {
        return (React.createElement("ul", { className: "suggestion-list" }, suggestions.map(function (item, index) {
            var cls = classNames("suggestion-item", {
                "suggestion-item__active ": hightIndex === index
            });
            return (React.createElement("li", { key: index, onClick: function () { return handleSelect(item); }, className: cls }, renderTemplate(item)));
        })));
    };
    return (React.createElement("div", { className: "auto-complete" },
        React.createElement(Input, __assign({ onChange: handleChange, value: inputValue, onKeyDown: handleKeyDown }, restProps)),
        loading ? React.createElement(Icon, { icon: "spinner", spin: true, className: "suggstions-loading-icon" }) : null,
        suggestions.length > 0 && renderDropdown()));
};
export default AutoComplete;
