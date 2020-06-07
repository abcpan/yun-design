import React from "react";
import UploadItem from "./UploadItem";
var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    var renderList = function () {
        var children = fileList.map(function (element) {
            return (React.createElement(UploadItem, { target: element, onRemove: onRemove, key: element.uid }));
        });
        return children;
    };
    // 阻止冒泡
    var stopBubble = function (e) {
        e.stopPropagation();
    };
    return (React.createElement("ul", { className: "upload-list", onClick: stopBubble }, renderList()));
};
export default UploadList;
