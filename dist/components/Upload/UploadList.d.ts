import { FC } from "react";
import { UploadFile } from "./Upload";
interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
declare const UploadList: FC<UploadListProps>;
export default UploadList;
