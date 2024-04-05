import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import http from './http'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

setupStore()