import React, { ReactElement, InputHTMLAttributes, FC, ChangeEvent,useState, useEffect } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
export type InputSize = "lg" | "sm";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size" | "prefix">{
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prefix?: string | ReactElement;
  suffix?: string | ReactElement;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string,
  defaultValue?: string
}

export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prefix,
    suffix,
    className,
    style,
    ...restProps
  } = props;
  const initValue = "value" in props ? (props.value || "") : (props.defaultValue || "");
  if ("defaultValue" in restProps) {
    delete restProps.defaultValue;
  }
  const [temp, setTemp] = useState<string>(initValue as string);
  
  useEffect(() => {
    setTemp(initValue);
  }, [initValue])
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!("value" in props)) {
      setTemp(value);
    }

    if (props.onChange) {
      props.onChange({
        target: value,
        ...e
      } as ChangeEvent<HTMLInputElement>);
    }
  }
/**样式 */
  const cls = classNames("input-wrapper", className, {
    [`input-${size}`]: size,
    [`input-disabled`]: disabled,
    'input-group': suffix || prefix,
    'input-group-prefix': Boolean(prefix),
    'input-group-suffix': Boolean(suffix)
  })

  return (
    <div className={cls} style={style}>
      {prefix && (<div className="input-group-prefix">{prefix}</div>)}
      <input disabled={disabled} className="input-inner" {...restProps} value={temp} onChange={handleChange}/>
      {suffix && (<div className="input-group-suffix">{suffix}</div>)}
    </div>
  )
}
Input.displayName = "Input";
export default Input;