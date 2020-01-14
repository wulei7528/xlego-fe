import React from 'react'
import { Table, Input, Select, Form, Button, message } from 'antd'

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
    this.state = { data: [], props, edit: false, newCount: 0, seletedRows: [] }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { props } = prevState

    if (nextProps.list !== props.list) {
      return {
        edit: false,
        data: nextProps.list,
        props: {
          list: nextProps.list,
        },
      }
    }

    return null
  }

  addRow = () => {
    const { newCount } = this.state
    const newData = { id: `new-${newCount}` }

    this.setState({
      newCount: newCount + 1,
      data: [newData, ...this.state.data],
      edit: true,
    })
  }

  startEdit = () => {
    const { data, edit } = this.state
    const { form, submitData } = this.props

    if (!data || !data.length) {
      message.error('请先添加记录再提交')

      return
    }

    if (edit) {
      form.validateFields((error, value) => {
        if (error) {
          message.error('字段存在错误', error)
          return
        }

        submitData(data).then(data => {
          if (!data.code) {
            message.success('保存成功')
            this.setState({ data: data.data, edit: !edit })
          } else {
            message.error('保存失败')
          }
        })
      })
    } else {
      this.setState({ edit: !edit })
    }
  }

  update = (id, key, value) => {
    const newData = [...this.state.data]
    const index = newData.findIndex(item => id === item.id)
    if (index > -1) {
      const item = newData[index]
      newData.splice(index, 1, {
        ...item,
        [key]: value,
      })
      this.setState({ data: newData })
    }
  }

  isNewRecord = record => {
    const { id = 'new' } = record

    return id.toString().indexOf('new') === 0
  }

  batchRemove = () => {
    const { selectedRows = [], data } = this.state
    const deletedRows = selectedRows.filter(row => !this.isNewRecord(row))

    if (deletedRows.length === 0) {
      if (selectedRows.length) {
        selectedRows.forEach(selRow => {
          const index = data.find(item => item.id === selRow.id)

          data.splice(index, 1)
        })

        this.setState({ data })

        return
      }

      message.error('请选择至少一条待删除记录')
      return
    }

    const id = deletedRows.map(row => row.id).join()

    this.props.batchDelete({ id })
  }

  updateKeyValues = (id, keyValues) => {
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

  setClassName = (record, index) => {
    return this.props.setClassName && this.props.setClassName(record, index)
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
                update: this.updateKeyValues,
              })
            } else {
              this.update(record.id, col.dataIndex, value)
            }
          },
        }),
      }
    })

    const rowSelection = {
      onChange: (_, selectedRows) => {
        this.setState({ selectedRows })
      },
    }

    return (
      <EditableContext.Provider value={this.props.form}>
        <div style={{ marginBottom: 10 }}>
          <Button type="primary" style={{ marginRight: 16 }} onClick={this.addRow}>
            新增一行
          </Button>
          <Button type="primary" style={{ marginRight: 16 }} onClick={this.startEdit}>
            {this.state.edit ? '提交订单' : '修改订单'}
          </Button>
          <Button type="danger" onClick={this.batchRemove}>
            批量删除
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          components={components}
          bordered
          size="small"
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={this.props.pagination}
          onChange={this.props.onChange}
          rowKey="id"
        />
      </EditableContext.Provider>
    )
  }
}

const EditableFormTable = Form.create()(EditableTable)

export default EditableFormTable
