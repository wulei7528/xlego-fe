import axios from './axios'
import cookies from 'js-cookie'

function getNs(type) {
  return type.substring(0, type.indexOf('/'))
}

export default {
  namespace: 'default',
  state: {
    list: [],
    record: {},
    loading: {},
  },
  reducers: {
    saveList(state, action) {
      return { ...state, list: action.payload }
    },
    saveRecord(state, action) {
      return { ...state, record: action.payload }
    },
    saveLoading(state, action) {
      return {
        ...state,
        loading: {
          [action.key]: action.payload,
        },
      }
    },
  },
  effects: {
    *fetchList(action, { call, put, select }) {
      const ns = getNs(action.type)
      let params = action.payload

      if (ns !== 'user') {
        const companyId = cookies.get('companyId')
        params = { companyId, ...action.payload }
      }

      yield put({ type: 'saveLoading', key: 'list', payload: true })
      const data = yield call(axios.get, `/api/${ns}`, { params })
      yield put({ type: 'saveList', payload: data.data })
      yield put({ type: 'saveLoading', key: 'list', payload: false })

      return data
    },
    *getRecord(action, { call, put }) {
      const ns = getNs(action.type)
      const { id } = action.payload

      const data = yield call(axios.get, `/api/${ns}/${id}`)
      yield put({ type: 'saveRecord', payload: data.data })

      return data
    },
    *updateRecord(action, { call }) {
      const ns = getNs(action.type)
      const { id } = action.payload
      const method = id ? axios.put : axios.post
      const url = id ? `/api/${ns}/${id}` : `/api/${ns}`

      const companyId = cookies.get('companyId')
      const params = { companyId, ...action.payload }

      const data = yield call(method, url, params)

      return data
    },
    *deleteRecord(action, { call }) {
      const ns = getNs(action.type)
      const { id } = action.payload

      const data = yield call(axios.delete, `/api/${ns}/${id}`, action.payload)

      return data
    },
  },
}
