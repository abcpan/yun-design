import React, { MouseEvent } from "react";
import classNames from "classnames";

export type ButtonSize = "lg" | "sm";

export type ButtonType = "primary" | "default" | "danger" | "link" | "ghost";

export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
  block?: boolean
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    btnType,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props;
  const onClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (disabled) {
      return void event.preventDefault();
    }
    if (props.onClick) {
      props.onClick(event);
    }
  }
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    [`disabled`]: btnType === "link" && disabled
  })
  if (btnType ===  "link" && href) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        {...restProps}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...restProps}
    >
     {children}
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
  btnType: "primary"
}

export default Button;