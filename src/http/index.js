import axios from "axios"
import { BASE_URL, HttpState } from './config'
import { getToken } from '@/utils/config'
import store from "@/store"
import { LOGIN_URL } from '@/projectConfig'
import router from "@/router"
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: HttpState.TIMEOUT
})

// 请求拦截
instance.interceptors.request.use(config => {
  // 请求拦截要处理的内容
  getToken() && (config.headers
    .Authorization = `Bearer ${getToken()}`)
  return config
}, err => {
  console.error('请求失败', err)
})

// 响应拦截
instance.interceptors.response.use(res => {
  // 响应拦截要处理的内容
  const { data } = res
  // 错误处理
  if (data.code === HttpState.OVERDUE) {
    // 401 token过期
    store.dispatch('loginModule/resetTokenAndUserInfo')
    router.replace(LOGIN_URL)
    Message.error('登录已过期，请重新登录')
    return Promise.reject(data)
  }

  if (data.code !== HttpState.SUCCESS) {
    // 业务错误
    Message.error(data.msg)
    return Promise.reject(data)
  }

  // 成功消息提示
  res.config.showMessage && Message.success(data.msg)

  // 正常返回数据
  return data.data
}, err => {
  console.error('响应失败', err)
})

// 封装http请求的方法
/**
 *
 * @param {*} option
 * @param {*} option.method 请求方式
 * @param {*} option.path 请求路径
 * @param {*} option.params 请求参数
 * @param {*} option.data 请求数据
 * @param {*} option.showSuccessMessage 默认弹出成功 | 错误 | 警告 消息提示【业务层->后端给我返回的code，错误 | 警告提示一定弹出，成功消息提示留给使用者自定义】
 * @returns
 */
async function http(option = {
  showSuccessMessage: true
}) {
  let result = null
  if (option.method === 'get' || option.method === 'delete') {
    try {
      result = await instance[option.method](option.path, { params: option.params })
    } catch (err) {
      result = err
    }
  } else if (option.method === 'post' || option.method === 'put') {
    try {
      result = await instance[option.method](option.path, option.data)
    } catch (err) {
      result = err
    }
  }
  return result
}

export default http

