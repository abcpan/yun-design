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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import UploadList from "./UploadList";
var Upload = function (props) {
    var action = props.action, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove;
    var inputNode = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    // 更新列表
    var updateFileList = function (uploadfile, updateKeys) {
        setFileList(function (preList) {
            return preList.map(function (file) {
                if (file.uid === uploadfile.uid) {
                    return __assign(__assign({}, file), updateKeys);
                }
                return file;
            });
        });
    };
    // 打开文件
    var handleClick = function () {
        if (inputNode.current) {
            inputNode.current.click();
        }
    };
    // 文件上传
    var uploadFiles = function (files) {
        var fileList = Array.from(files);
        fileList.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var ret = beforeUpload(file);
                if (ret instanceof Promise) {
                    ret.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (ret !== false) {
                    post(file);
                }
            }
        });
    };
    // 发送请求
    var post = function (file) {
        var _file = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        setFileList(function (prev) { return __spreadArrays([_file], prev); });
        var formData = new FormData();
        formData.append(file.name, file);
        axios.post(action, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: function (e) {
                var per = Math.round((e.loaded * 100) / e.total) || 0;
                if (per < 100) {
                    updateFileList(_file, { percent: per, status: "uploading" });
                    if (onProgress) {
                        onProgress(per, file);
                    }
                }
            }
        }).then(function (res) {
            updateFileList(_file, { status: "success" });
            if (onSuccess) {
                onSuccess(res, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(function (err) {
            updateFileList(_file, { status: "error" });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    // 文件变更
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        e.target.value = "";
    };
    // 文件删除
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    return (React.createElement("div", { className: "upload", onClick: handleClick },
        React.createElement(Button, { btnType: "primary", size: "sm" }, "\u4E0A\u4F20\u6587\u4EF6"),
        React.createElement("input", { type: "file", className: "upload-input", ref: inputNode, onChange: handleFileChange }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
export default Upload;
