import axios from 'axios'
import { message } from 'antd'

axios.interceptors.request.use(request => {
  request.headers['x-requested-with'] = 'XMLHttpRequest'

  return request
})

axios.interceptors.response.use(
  response => {
    const { code, msg } = response.data

    if (code !== 0) {
      message.error(`${msg}:数据获取出错，请联系系统维护人员!`)
    }
    return response.data
  },
  error => {
    const { status } = error.response

    const msg = error.response.data.message || '未知错误'
    message.error(`${status}:${msg}`)
    return null
  }
)

export default axios
