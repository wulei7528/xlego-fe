import React from 'react'
import { Input, Select, Radio, DatePicker } from 'antd'

const { Option } = Select
const { RangePicker } = DatePicker
const { Group: RadioGroup } = Radio

export function generateFormItem(item, options = {}) {
  const { itemCommonProps: { handleBlur, ...itemProps } = {} } = options
  const props = { ...itemProps, ...item.props }
  const { type, placeholder, handleChange } = item

  if (type === 'input') {
    return (
      <Input
        placeholder={placeholder}
        {...props}
        onChange={e => {
          typeof handleChange === 'function' && handleChange(e.target.value)
        }}
        onBlur={e => {
          typeof handleBlur === 'function' && handleBlur(e)
        }}
      />
    )
  }

  if (type === 'select') {
    return (
      <Select
        placeholder={placeholder}
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

  if (type === 'radio') {
    return (
      <RadioGroup
        placeholder={placeholder}
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

  if (type === 'rangepicker') {
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
