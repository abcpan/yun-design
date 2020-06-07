import React from "react";
import { action } from '@storybook/addon-actions';
import { storiesOf } from "@storybook/react";
import AutoComplete, { OptionType } from "./AutoComplete";

type CustomOptonType = {
  value: string;
  key: number;
}
const SimeComplete = () => {
  // const lakers = [
  //   "bradley", "pope", "caruso","cook","cousion", "james", "ad", "green", "howard","kuzma","mcGee","rando"
  // ]
  const lakerList:OptionType<CustomOptonType>[] = [
    {value:"pope", key:1},
    {value:"caruso",key:2},
    {value:"bradley",key:3},
    {value:"cook",key:4},
    {value:"cousion",key:5},
    {value:"james", key:6},
    {value:"ad", key:7},
    {value:"green", key:8},
    {value:"howard",key:9},
    {value:"kuzma",key:10},
    {value:"mcGee",key:11},
    {value:"rando",key:12},
  ]
  const handleFetch = (query: string) => {
    return lakerList.filter(item => item.value.includes(query))
  }
  const renderOption = (option: OptionType) => {
    return (
      <h2>name: {option.value}</h2>
    )
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("slected")}
      renderOption ={renderOption}
    />
  )
}

const AsnycSimeComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        console.log(items);
        const formatItems = items.slice(0, 10).map((item: any) => ({
          value: item.login,
          ...item
        }))

        return formatItems;
      })
  }
  const renderOption = (option: any) => {
    console.log(option)
    return (
      <div>
        <h2>name: {option.value}</h2>
        <img src={option.avatar_url} alt=""/>
      </div>
    )
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("slected")}
      renderOption ={renderOption}
    />
  )
}

storiesOf("AutoComplete", module)
  .add("简单", SimeComplete)
  .add("异步", AsnycSimeComplete)