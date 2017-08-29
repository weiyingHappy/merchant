import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import { Message } from 'element-ui'
import { addFilter } from '@/common/filter'
import vInview from 'vueinview'
import queryString from 'query-string'
import openid from './common/openid'

import 'normalize.css/normalize.css'
import '@/assets/styles/app.scss'
import '@/assets/styles/animation.scss'

// 获取url中的openid
const query = queryString.parse(location.search)

if (query.openid) {
  localStorage.openid = query.openid
}

// 注入fake openid
if (process.env.NODE_ENV === 'development') {
  console.log('%c开发环境注入openid', 'color: green;font-size: 15px')
  localStorage.openid = openid
}

Vue.config.productionTip = false

window.axios = axios

axios.interceptors.request.use((config) => {
  if (localStorage.user) {
    // config
    config.headers['Session-Token'] = localStorage.user
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  if (response.data.code === 405) {
    router.push({
      name: 'Login'
    })
  }
  if (response.data.code !== 405 && response.data.code !== 200) {
    Message(response.data.msg)
  }
  return response.data
}, (error) => {
  console.log('错误', error)
  return Promise.reject(error)
})

Vue.use(vInview)
Vue.prototype.$message = Message

addFilter(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
