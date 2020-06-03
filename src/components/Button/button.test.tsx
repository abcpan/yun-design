import React from "react";
import Button from "./button";
import { render } from "@testing-library/react";

test("first test button", () => {
  const wrapper = render(<Button>abc</Button>)
  const element = wrapper.queryByText("abc");
  expect(element).toBeTruthy();
})

// test("firs", () => {
//   const wrapper = render(<Button>abc</Button>)
//   const element = wrapper.queryByText("abc");
//   expect(element).toBeInTheDOM();
// })