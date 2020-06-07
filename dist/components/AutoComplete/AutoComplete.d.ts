import React, { FC } from "react";
import { InputProps } from "../Input/Input";
declare type BaseOption = {
    value: string;
};
export declare type OptionType<T = {}> = T & BaseOption;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    fetchSuggestions: (str: string) => Promise<OptionType[]> | OptionType[];
    onSelect?: (item: OptionType) => void;
    renderOption?: <T>(option: OptionType<T>) => React.ReactElement;
}
declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
