import baseModal from '../core/baseModel'
import _ from 'lodash'

const myModal = {
  namespace: 'common',
  subscriptions: {},
  state: {
    siderMenuCollapsed: false,
    userInfo: {
      name: '吴磊',
      companyId: 1,
    },
  },
  reducers: {
    saveSiderMenuCollapsed(state, action) {
      return { ...state, siderMenuCollapsed: action.payload }
    },
  },
  effects: {},
}

const model = _.merge({}, baseModal, myModal)

export default model
