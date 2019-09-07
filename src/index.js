import dva from 'dva'
import './index.css'
import router from './router'

// 1. initialize
const app = dva()

// 2. plugins
//app.use({})

// 3. model
// app.model({})

// 4. router
app.router(router)

// 5. start
app.start('#root')
