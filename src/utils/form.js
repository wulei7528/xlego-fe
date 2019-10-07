import React from 'react'
import { Input, Select, Radio, DatePicker } from 'antd'

const { Option } = Select
const { RangePicker } = DatePicker
const { Group: RadioGroup } = Radio

export function generateFormItem(item, options = {}) {
  const { itemProps, handleChange } = options
  const props = { ...itemProps, ...item.props }

  if (item.type === 'input') {
    return (
      <Input
        placeholder={item.placeholder}
        {...props}
        onChange={e => {
          typeof handleChange === 'function' && handleChange(e.target.value)
        }}
      />
    )
  }

  if (item.type === 'select') {
    return (
      <Select
        placeholder={item.placeholder}
        style={{ width: '160px' }}
        {...props}
        onChange={value => {
          typeof handleChange === 'function' && handleChange(value)
        }}
      >
        {(item.selectOptions || []).map(item => (
          <Option key={item.value} value={item.value}>
            {item.text}
          </Option>
        ))}
      </Select>
    )
  }

  if (item.type === 'radio') {
    return (
      <RadioGroup
        placeholder={item.placeholder}
        {...props}
        onChange={e => {
          typeof handleChange === 'function' && handleChange(e.target.value)
        }}
      >
        {(item.radioOptions || []).map(item => (
          <Radio key={item.value} value={item.value}>
            {item.text}
          </Radio>
        ))}
      </RadioGroup>
    )
  }

  if (item.type === 'rangepicker') {
    return (
      <RangePicker
        {...props}
        onChange={dateValue => {
          typeof handleChange === 'function' && handleChange(dateValue)
        }}
      />
    )
  }
}
