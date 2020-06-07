import React, { FC, ChangeEvent, useState, useEffect, KeyboardEvent} from "react";
import Input, { InputProps } from "../Input/Input";
import Icon from "../Icon/Icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
type BaseOption = {
  value: string
}
export type OptionType<T = {}> = T & BaseOption
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => Promise<OptionType[]> | OptionType[];
  onSelect?: (item: OptionType) => void;
  renderOption?: <T>(option: OptionType<T>) => React.ReactElement;
}

const AutoComplete: FC <AutoCompleteProps > = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState<string>(value as string);
  const [suggestions, setSuggestions] = useState<Array<OptionType>>([])
  const [loading, setLoading] = useState(false);
  const debounceValue = useDebounce(inputValue, 300);

  const [hightIndex, setHightIndex] = useState<number>(-1);
  useEffect(() => {
    if (debounceValue) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data => {
          setSuggestions(data);
          setLoading(false);
        }))
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([])
    }
    setHightIndex(-1);
  },[debounceValue])
  /**修改 */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value.trim();
    setInputValue(value);
  }

  /**选中某个选项 */
  const handleSelect = (item: OptionType) => {
    setInputValue(item.value);
    setSuggestions([])
    if (onSelect) {
      onSelect(item);
    }
  }
  
  // 处理高亮
  const hightlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHightIndex(index);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (suggestions[hightIndex]) {
          handleSelect(suggestions[hightIndex])
        }
        break;
      // 向上
      case 38:
        hightlight(hightIndex - 1);
        break;
      //
      case 40:
        hightlight(hightIndex + 1)
        break;
      // 
      case 27:
        setSuggestions([])
        break;
      default:
        return;
    }
  }

  const renderTemplate = (item: OptionType) => {
    let element = null;
    if (props.renderOption) {
      element = props.renderOption(item);
    } else {
      element = item.value;
    }
    return element;
  }
  const renderDropdown = () => {
    return (
      <ul className="suggestion-list">
        {suggestions.map((item, index) => {
          const cls = classNames("suggestion-item", {
            "suggestion-item__active ": hightIndex === index
          })
          return (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className={cls}
            >
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="auto-complete">
      <Input
        onChange={handleChange}
        value={inputValue}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading? <Icon icon="spinner" spin className="suggstions-loading-icon"/> : null}
      {suggestions.length > 0 && renderDropdown()}
    </div>
  )
}
export default AutoComplete;