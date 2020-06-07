import React from "react";
import Icon from "../Icon/Icon";
import Progress from "../Progress/Progress";
var UploadItem = function (props) {
    var target = props.target, onRemove = props.onRemove;
    return (React.createElement("li", { className: "upload-list-item" },
        React.createElement("span", { className: "file-name file-" + target.status },
            React.createElement(Icon, { icon: "file-alt", theme: "secondary" }),
            target.name),
        React.createElement("span", { className: "file-status" },
            (target.status === "uploading" || target.status === "ready") && React.createElement(Icon, { icon: "spinner", theme: "primary", spin: true }),
            target.status === "success" && React.createElement(Icon, { icon: "check-circle", theme: "success" }),
            target.status === "error" && React.createElement(Icon, { icon: "times-circle", theme: "danger" })),
        React.createElement("span", { className: "file-actions" },
            React.createElement(Icon, { icon: "times-circle", onClick: function () { return onRemove(target); } }),
            "  "),
        target.status === "uploading" && React.createElement(Progress, { percent: target.percent || 0 })));
};
export default UploadItem;
