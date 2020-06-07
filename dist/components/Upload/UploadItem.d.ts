import { FC } from "react";
import { UploadFile } from "./Upload";
interface ItemProps {
    target: UploadFile;
    onRemove: (file: UploadFile) => void;
}
declare const UploadItem: FC<ItemProps>;
export default UploadItem;
