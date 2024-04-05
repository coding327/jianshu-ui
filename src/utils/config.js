import { getCache } from './cache'

const isDevMode = () => process.env.NODE_ENV === 'development'

const getToken = () => getCache('jianshu-token')

export {
  isDevMode,
  getToken
}