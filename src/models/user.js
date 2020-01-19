import baseModal from '../core/baseModel'
import _ from 'lodash'
import axios from '../core/axios'

const myModal = {
  namespace: 'user',
  subscriptions: {},
  state: {},
  reducers: {},
  effects: {
    *savePassword(action, { call, put, select }) {
      let params = action.payload

      const data = yield call(axios.post, `/api/user/savePassword`, params)
      return data
    },
  },
}

const model = _.merge({}, baseModal, myModal)

export default model
