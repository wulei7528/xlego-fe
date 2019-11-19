import axios from './axios'
import { CODE } from './constants'

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
    *fetchList(action, { call, put }) {
      const ns = getNs(action.type)

      yield put({ type: 'saveLoading', key: 'list', payload: true })
      const { data: list } = yield call(axios.get, `/api/${ns}`, { params: action.payload })
      yield put({ type: 'saveList', payload: list })
      yield put({ type: 'saveLoading', key: 'list', payload: false })
    },
    *getRecord(action, { call, put }) {
      const ns = getNs(action.type)
      const { id } = action.payload

      const { data: record } = yield call(axios.get, `/api/${ns}/${id}`)
      yield put({ type: 'saveRecord', payload: record })
    },
    *updateRecord(action, { call, put }) {
      const ns = getNs(action.type)
      const { id } = action.payload
      const method = id ? axios.put : axios.post
      const url = id ? `/api/${ns}/${id}` : `/api/${ns}`

      const { code } = yield call(method, url, action.payload)

      if (code === CODE.SUCCESS) {
        yield put({ type: 'fetchList' })
      }
    },
    *deleteRecord(action, { call }) {
      const ns = getNs(action.type)
      const { id } = action.payload

      const { data } = yield call(axios.delete, `/api/${ns}/${id}`, action.payload)

      return data
    },
  },
}
