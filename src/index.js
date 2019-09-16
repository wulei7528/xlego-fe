import dva from 'dva'

import './index.css'
import router from './router'

// 1. initialize
const app = dva()

// 2. plugins
//app.use({})

// 3. model
app.model(require('./models/common').default)
app.model(require('./models/company').default)
app.model(require('./models/employee').default)
app.model(require('./models/flow').default)
app.model(require('./models/order').default)
app.model(require('./models/price').default)

// 4. router
app.router(router)

// 5. start
app.start('#root')
