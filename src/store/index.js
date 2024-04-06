import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import loginModule from './login/login'

Vue.use(Vuex)

const store = new Vuex.Store({
  state() {
    return {
      username: ''
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginModule
  },
  plugins: [createPersistedState({
    key: 'vuex',
    paths: ['loginModule'], // 指定需要持久化的模块
    storage: window.localStorage
  })]
})

// vuex刷新数据丢失问题解决方法【也可以使用上面vuex-persistedstate插件】
// export function setupStore() {
//   store.dispatch('loginModule/loadLocalLogin')
// }

export default store