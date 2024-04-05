import { accountLoginRequest, requestUserInfoById } from '@/api/login'
import localCache from '@/utils/cache'
import { USERINFO_KEY } from '@/constants/cache'
import { getToken, setToken } from '@/utils/config'
import md5 from "md5"
import router from '@/router'
import { HOME_URL, LOGIN_URL } from '@/project-config'
import { Notification } from 'element-ui'
import { getTimeState } from '@/utils'

const loginModule = {
  namespaced: true,
  state() { // mapState基本用法 ，借助vuex的mapState方法，将state中的数据映射到组件中，以便在组件中调用 ---> ...mapState('loginModule', ['token', 'userInfo'])
    // 非组件使用state中的数据，需要借助store.state.loginModule.token
    return {
      token: '',
      userInfo: {},
    }
  },
  getters: {},
  mutations: { // mapMutations基本用法 ，借助vuex的mapMutations方法，将mutations中的方法映射到组件中，以便在组件中调用 ---> ...mapMutations('loginModule', ['changeToken'])
    // 非组件使用mutations中的方法，需要借助store.commit('loginModule/changeToken', token)
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    resetTokenAndUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      localCache.clearCache()
    }
  },
  actions: { // mapActions基本用法 ，借助vuex的mapActions方法，将actions中的方法映射到组件中，以便在组件中调用 ---> ...mapActions('loginModule', ['accountLoginAction'])
    // 非组件使用actions中的方法，需要借助store.dispatch('loginModule/accountLoginAction', payload)
    async accountLoginAction({ commit }, payload) {
      // 1. 登录
      const loginResult = await accountLoginRequest({ ...payload, password: md5(payload.password) })
      const { _id, token } = loginResult
      commit('changeToken', token)
      setToken(token)

      // 2. 获取用户信息
      const userInfoResult = await requestUserInfoById(_id)
      commit('changeUserInfo', userInfoResult)
      localCache.setCache(USERINFO_KEY, userInfoResult)

      // 跳转到首页
      router.push(HOME_URL)
      Notification({
        title: getTimeState(),
        message: "欢迎登录，简书后台管理系统",
        type: "success",
        duration: 3000,
      })
    },
    loadLocalLogin({ commit }) {
      const token = getToken()
      if (token) {
        const userInfo = localCache.getCache(USERINFO_KEY)
        userInfo && commit('changeUserInfo', userInfo)
      }
    },
    logout({ commit }) {
      commit('resetTokenAndUserInfo')
      router.replace(LOGIN_URL)
    }
  }
}

export default loginModule