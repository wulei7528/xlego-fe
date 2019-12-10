import baseModal from '../core/baseModel'
import _ from 'lodash'

const myModal = {
  namespace: 'user',
  subscriptions: {},
  state: {},
  reducers: {},
}

const model = _.merge({}, baseModal, myModal)

export default model
