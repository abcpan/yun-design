import React from "react";
import { action } from '@storybook/addon-actions';
import { storiesOf } from "@storybook/react";
import Upload from "./Upload"
const SimpleUpload = () => {
  const checkFile = (file: File) => {
    if (Math.round(file.size / 1024) > 15) {
      return true;
    }
    return true;
  }
  return (
    <Upload
      action="http://jsonplaceholder.typicode.com/posts/"
      onProgress={action("progress")}
      beforeUpload={checkFile}
      onChange={action("changed")}
    />
  )
}

storiesOf("Upload", module)
  .add("普通上传", SimpleUpload)