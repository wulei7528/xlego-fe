import baseModal from '../core/baseModel'
import _ from 'lodash'

const myModal = {
  namespace: 'employee',
  subscriptions: {},
  state: {},
  reducers: {},
  effects: {},
}

const model = _.merge({}, baseModal, myModal)

export default model
