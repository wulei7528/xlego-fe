import axios from 'axios'
import { message } from 'antd'

axios.interceptors.request.use(request => {
  request.headers['x-requested-with'] = 'XMLHttpRequest'

  return request
})

axios.interceptors.response.use(
  response => {
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
