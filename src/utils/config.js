import localCache from './cache'
import { TOKEN_KEY } from '@/constants/cache'

const isDevMode = () => process.env.NODE_ENV === 'development'

const getToken = () => localCache.getCache(TOKEN_KEY)

const setToken = (token) => localCache.setCache(TOKEN_KEY, token)

export {
  isDevMode,
  getToken,
  setToken
}