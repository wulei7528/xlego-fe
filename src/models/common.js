import baseModal from '../core/baseModel'
import _ from 'lodash'

const myModal = {
  namespace: 'common',
  subscriptions: {},
  state: {
    siderMenuCollapsed: false,
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
