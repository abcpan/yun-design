import React from "react";
import { action } from '@storybook/addon-actions';
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Button from "./Button";

const styles: React.CSSProperties = {
  textAlign: "center",
}
const centerDecorator = (storyFn: any) => {
  return (
    <div style={styles}>
      {
        storyFn()
      }
    </div>
  )
}
const ButtonWithSize = () => {
  return (
    <>
      <Button size="sm">
          sm Button
      </Button>
      <Button size="lg">
         large Button
      </Button>
    </>
  )
}

const ButtonWithType = () => {
  return (
    <>
      <Button btnType="primary">
          primary Button
      </Button>
      <Button btnType="danger">
        large Button
      </Button>
      <Button btnType="link" onClick={action("click")}>
         large Button
      </Button>
    </>
  )
}

const ButtonWithDisabled = () => {
  return (
    <>
      <Button disabled>disabled Button</Button>
    </>
  )
}
storiesOf("Button", module)
  .addDecorator(centerDecorator)
  .addDecorator(withInfo)
  .add("类型", ButtonWithType)
  .add("尺寸", ButtonWithSize)
  .add("禁用", ButtonWithDisabled)


