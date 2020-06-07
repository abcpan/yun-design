import React from "react";
import { action } from '@storybook/addon-actions';
import { storiesOf } from "@storybook/react";
import Input from "./Input"
import { useState } from "@storybook/addons";

const InputNomal = () => {
  return (
    <Input style={{ width: 300 }} placeholder={"please enter "} onChange={action("changing")}/>
  )
}
const disableInput = () => {
  return (
    <Input style={{width: 300}} disabled placeholder="diabled inputElement"/>
  )
}
const InputWithIcon = () => {
  return (
    <Input prefix={"https"} ></Input>
  )
}

const ControlledInput = () => {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const temp = val.toUpperCase();
    setValue(temp);
  }
  return (
    <Input value={value} onChange={handleChange}/>
  )
}

storiesOf("Input", module)
  .add("普通", InputNomal)
  .add("禁用", disableInput)
  .add("受控", ControlledInput)
  .add("前缀", InputWithIcon)
