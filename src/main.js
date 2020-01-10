import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index.js'

import { Button, Toast, Uploader, Icon, Dialog, Field, Picker, Tab, Tabs, List, PullRefresh, Search } from 'vant'

import '@/styles/reset.css'

Vue.use(Button)
  .use(Toast)
  .use(Uploader)
  .use(Icon)
  .use(Dialog)
  .use(Field)
  .use(Picker)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(Search)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
