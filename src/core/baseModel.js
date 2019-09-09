import axios from './axios'

function getNs(type) {
  return type.substring(0, type.indexOf('/'))
}

export default {
  namespace: 'default',
  state: {
    list: [],
    record: {},
  },
  reducers: {
    saveList(state, action) {
      return { ...state, list: action.payload }
    },
    saveRecord(state, action) {
      return { ...state, record: action.payload }
    },
  },
  effects: {
    *fetchList(action, { call, put }) {
      const ns = getNs(action.type)

      const list = yield call(axios.get, `/api/${ns}`, { params: action.payload })
      yield put({ type: 'saveList', payload: list })
    },
    *getRecord(action, { call, put }) {
      const ns = getNs(action.type)
      const { id } = action.payload

      const record = yield call(axios.get, `/api/${ns}/${id}`)
      yield put({ type: 'saveRecord', payload: record })
    },
    *updateRecord(action, { call }) {
      const ns = getNs(action.type)
      const { id } = action.payload
      const method = id ? axios.put : axios.post
      const url = id ? `/api/${ns}/${id}` : `/api/${ns}`

      const ret = yield call(method, url, action.payload)

      return ret
    },
    *deleteRecord(action, { call }) {
      const ns = getNs(action.type)
      const { id } = action.payload

      const ret = yield call(axios.delete, `/api/${ns}/${id}`, action.payload)

      return ret
    },
  },
}
