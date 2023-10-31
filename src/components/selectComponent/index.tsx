import React from 'react'
import Select, { StylesConfig } from 'react-select'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styleConstants'


const selectStyles: StylesConfig = {
  menu: (styles) => ({
    ...styles,
    backgroundColor: SECONDARY_COLOR,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5
  }),
  control: (styles) => ({
    ...styles,
    borderColor: PRIMARY_COLOR,
    backgroundColor: SECONDARY_COLOR,
    ':hover': { borderColor: PRIMARY_COLOR, },
  }),
  option: (styles, {  isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? PRIMARY_COLOR : SECONDARY_COLOR,
    color: 'white',
  }),
  input: (styles) => ({ ...styles, color: 'white' }),
  singleValue: (styles, { data }) => ({ ...styles, color: 'white' }),
};

interface SelectComponentProps {
  value?: {value: string, label: string}
  options: {value: string, label: string}[]
  onSetValue: (value: string) => void
}

const SelectComponent = ({value, options, onSetValue}: SelectComponentProps) => {
  return (
    <Select
      className={'time-select'}
      styles={selectStyles}
      value={value}
      // @ts-ignore
      onChange={selectedOption => selectedOption ? onSetValue(selectedOption!.value) : null}
      options={options}
    />
  )
}

export default SelectComponent
