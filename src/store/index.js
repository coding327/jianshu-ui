import Vue from 'vue'
import Vuex from 'vuex'
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
  }
})

// vuex刷新数据丢失问题解决方法
export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}

export default store