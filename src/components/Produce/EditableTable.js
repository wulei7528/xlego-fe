import React from 'react'
import { Table, Input, Select, Form, Popconfirm, Button } from 'antd'

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
    const { editing, dataIndex, title, inputType, record, index, children, inputChange, ...restProps } = this.props

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
          children
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
    this.state = { data: [], editingId: '', props, edit: false }
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
      this.props.submitData(this.state.data)
    }

    this.setState({ edit: !this.state.edit })
  }

  cancel = () => {
    this.setState({ editingId: '' })
  }

  save(form, id) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }
      console.log(row)

      const retData = []
      Object.keys(row).forEach(key => {
        const keys = key.split('-')
        const [id, field] = keys
        const item = retData.find(d => d.id === id)

        if (item) {
          item[field] = row[key]
        } else {
          retData.push({ [field]: row[key] })
        }
      })

      console.log(retData)

      // const newData = [...this.state.data]
      // const index = newData.findIndex(item => id === item.id)
      // if (index > -1) {
      //   const item = newData[index]
      //   newData.splice(index, 1, {
      //     ...item,
      //     ...row,
      //   })
      //   this.setState({ data: newData, editingId: '' })
      // } else {
      //   newData.push(row)
      //   this.setState({ data: newData, editingId: '' })
      // }
    })
  }

  edit(id) {
    this.setState({ editingId: id })
  }

  update(id, key, value) {
    const newData = [...this.state.data]
    const index = newData.findIndex(item => id === item.id)
    if (index > -1) {
      const item = newData[index]
      newData.splice(index, 1, {
        ...item,
        key: value,
      })
      this.setState({ data: newData, editingId: '' })
    } else {
      newData.push({})
      this.setState({ data: newData, editingId: '' })
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
          inputChange: value => {
            this.update(record.id, col.dataIndex, value)
          },
        }),
      }
    })

    columns.push({
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingId } = this.state
        const editable = this.state.edit
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a onClick={() => this.save(form, record.id)} style={{ marginRight: 8 }}>
                  保存
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingId !== ''} onClick={() => this.edit(record.id)}>
            修改
          </a>
        )
      },
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
