import axios from "axios"
import { BASE_URL, TIME_OUT } from './config'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

// 请求拦截
instance.interceptors.request.use(config => {
  // 请求拦截要处理的内容
  return config
}, err => {
  console.error('请求失败', err)
})

// 响应拦截
instance.interceptors.response.use(res => {
  // 响应拦截要处理的内容
  return res.data
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
 * @returns
 */
async function http(option = {}) {
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

