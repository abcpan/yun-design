import React, { FC } from "react";
import { UploadFile } from "./Upload";
import Icon from "../Icon/Icon";
import Progress from "../Progress/Progress";
interface ItemProps {
  target: UploadFile
  onRemove: (file: UploadFile) => void;
}
const UploadItem: FC<ItemProps> = (props) => {
  const {
    target,
    onRemove
  } = props;
  return (
    <li className="upload-list-item" > 
        <span className={`file-name file-${target.status}`}>
          <Icon icon="file-alt" theme="secondary" />{target.name}</span>
        <span className="file-status">
          {(target.status === "uploading" || target.status === "ready") && <Icon icon="spinner" theme="primary" spin/>}
          {target.status === "success" && <Icon icon="check-circle" theme="success" />}
          {target.status === "error" && <Icon icon="times-circle" theme="danger" />}
        </span>
        <span className="file-actions"><Icon icon="times-circle" onClick={()=>onRemove(target)}/>  </span>
        {target.status === "uploading" && <Progress percent={target.percent || 0}/>}
    </li>
  )
}

export default UploadItem;