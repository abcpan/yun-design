import React, { FC, MouseEvent} from "react";
import { UploadFile } from "./Upload";
import UploadItem from "./UploadItem";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

const UploadList: FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove
  } = props;
  
  const renderList = () => {
    const children = fileList.map((element: UploadFile) => {
      return (
        <UploadItem target={element} onRemove={onRemove} key={element.uid}/>
      )
    });
    return children;
  }

  // 阻止冒泡
  const stopBubble = (e: MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
  }
  return (
    <ul className="upload-list" onClick={stopBubble}>
     {renderList()}
    </ul>
  )
}

export default UploadList;