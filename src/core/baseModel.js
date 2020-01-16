import axios from './axios'
import cookies from 'js-cookie'

function getNs(type) {
  return type.substring(0, type.indexOf('/'))
}

export default {
  namespace: 'default',
  state: {
    list: [],
    pageInfo: {},
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
    savePageInfo(state, action) {
      return { ...state, pageInfo: action.payload }
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
      yield put({ type: 'savePageInfo', payload: { pageNo: data.pageNo, pageSize: data.pageSize, total: data.totalCount } })
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
      let params = action.payload

      if (ns !== 'company') {
        const companyId = cookies.get('companyId')
        params = { companyId, ...action.payload }
      }

      const data = yield call(method, url, params)

      return data
    },
    *deleteRecord(action, { call }) {
      const ns = getNs(action.type)
      const { id } = action.payload

      const data = yield call(axios.delete, `/api/${ns}/${id}`, action.payload)

      return data
    },
    *batchDelete(action, { call }) {
      const data = yield call(axios.delete, `/api/batchdelete`, { data: action.payload })

      return data
    },
    *fetchListAll(action, { call }) {
      const ns = getNs(action.type)
      let params = { ...action.payload, pageNo: 1, pageSize: 9999 }

      if (ns !== 'user') {
        const companyId = cookies.get('companyId')
        params = { companyId, ...action.payload }
      }

      const data = yield call(axios.get, `/api/${ns}`, { params })

      return data
    },
  },
}
