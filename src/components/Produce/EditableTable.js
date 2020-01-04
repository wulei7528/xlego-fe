import React from 'react'
import { Table, Input, Select, Form, Popconfirm, Button, message } from 'antd'

const { Option } = Select
const EditableContext = React.createContext()

class EditableCell extends React.Component {
  getInput = ({ inputChange }) => {
    const { inputType, disabled, items } = this.props

    if (inputType === 'select') {
      return (
        <Select style={{ width: 200 }} onChange={inputChange}>
          {items.map(item => (
            <Option value={item.value} key={item.value}>
              {item.text}
            </Option>
          ))}
        </Select>
      )
    }
    return <Input disabled={disabled} onChange={e => inputChange(e.target.value)} />
  }

  handleChange = v => {
    console.log(v)
  }

  renderCell = form => {
    const { getFieldDecorator } = form
    const { editing, dataIndex, title, inputType, record, index, children, inputChange, displayText, ...restProps } = this.props

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(`${record.id}-${dataIndex}`, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput({ inputChange }))}
          </Form.Item>
        ) : (
          displayText || children
        )}
      </td>
    )
  }

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], props, edit: false }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { props } = prevState

    if (nextProps.list !== props.list) {
      return {
        data: nextProps.list,
        props: {
          list: nextProps.list,
        },
      }
    }

    return null
  }

  startEdit = () => {
    if (this.state.edit) {
      this.props.form.validateFields((error, value) => {
        if (error) {
          alert('字段存在错误', error)
          return
        }

        this.props.submitData(this.state.data).then(data => {
          console.log(data)
          if (!data.code) {
            message.success('保存成功')
            this.setState({ edit: !this.state.edit })
          } else {
            message.error('保存失败')
          }
        })
      })
    } else {
      this.setState({ edit: !this.state.edit })
    }
  }

  update(id, key, value) {
    const newData = [...this.state.data]
    const index = newData.findIndex(item => id === item.id)
    if (index > -1) {
      const item = newData[index]
      newData.splice(index, 1, {
        ...item,
        [key]: value,
      })
      this.setState({ data: newData })
    } else {
      newData.push({})
      this.setState({ data: newData })
    }
  }

  updateKeyValues(id, keyValues) {
    const newData = [...this.state.data]
    const index = newData.findIndex(item => id === item.id)
    if (index > -1) {
      const item = newData[index]
      newData.splice(index, 1, {
        ...item,
        ...keyValues,
      })
      this.setState({ data: newData })
    } else {
      newData.push({})
      this.setState({ data: newData })
    }
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    }

    const columns = this.props.columns.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.inputType,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.state.edit,
          items: col.items,
          disabled: col.disabled || false,
          displayText: col.getDisplayText && col.getDisplayText(record),
          inputChange: value => {
            if (col.inputChange) {
              col.inputChange({
                form: this.props.form,
                record,
                value,
                update: this.updateKeyValues.bind(this),
              })
            } else {
              this.update(record.id, col.dataIndex, value)
            }
          },
        }),
      }
    })

    return (
      <EditableContext.Provider value={this.props.form}>
        <div style={{ marginBottom: 10 }}>
          <Button type="primary" style={{ marginRight: 16 }}>
            新增一行
          </Button>
          <Button type="primary" onClick={this.startEdit}>
            {this.state.edit ? '提交订单' : '修改订单'}
          </Button>
        </div>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          rowKey="id"
        />
      </EditableContext.Provider>
    )
  }
}

const EditableFormTable = Form.create()(EditableTable)

export default EditableFormTable
