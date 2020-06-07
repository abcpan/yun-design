import React, { FC, useRef, ChangeEvent, useState} from "react";
import axios from "axios";
import Button from "../Button/Button";
import UploadList from "./UploadList"

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;

}
export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[]
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
}
const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove
  } = props;
  const inputNode = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<Array<UploadFile>>(defaultFileList || []);

  // 更新列表
  const updateFileList = (uploadfile: UploadFile, updateKeys: Partial<UploadFile>) => {
    setFileList(preList => {
      return preList.map(file => {
        if (file.uid === uploadfile.uid) {
          return {...file, ...updateKeys}
        }
        return file;
      })
    })
  }
  // 打开文件
  const handleClick = () => {
    if (inputNode.current) {
      inputNode.current.click();
    }
  }
  // 文件上传
  const uploadFiles = (files: FileList) => {
    const fileList = Array.from(files);
    fileList.forEach(file => {
      if (!beforeUpload) {
        post(file);
      } else {
        const ret = beforeUpload(file);
        if (ret instanceof Promise) {
          ret.then(processedFile => {
            post(processedFile);
          })
        } else if (ret !== false) {
          post(file);
        }
      }
     
    })
  }

  // 发送请求
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    setFileList(prev => [_file, ...prev])
    const formData = new FormData();
    formData.append(file.name, file);
    axios.post(action, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: (e) => {
        const per = Math.round((e.loaded * 100) / e.total) || 0;
        if (per < 100) {
          updateFileList(_file, {percent: per, status: "uploading"})
          if (onProgress) {
            onProgress(per, file);
          }
        }
      }
    }).then(res => {
      updateFileList(_file, {status: "success"})
      if (onSuccess) {
        onSuccess(res, file);
      }
      if (onChange) {
        onChange(file);
      }
    }).catch(err => {
      updateFileList(_file, {status: "error"})
      if (onError) {
        onError(err, file);
      }
      if (onChange) {
        onChange(file);
      }
    })
  }
  // 文件变更
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    e.target.value = "";
  }

  // 文件删除
  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid);
    })
    if (onRemove) {
      onRemove(file);
    }
  }
  return (
    <div
      className="upload"
      onClick = {handleClick}
    >
      <Button btnType ="primary" size="sm">上传文件</Button>
      <input
        type="file"
        className="upload-input"
        ref={inputNode}
        onChange = {handleFileChange}
      />
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default Upload;