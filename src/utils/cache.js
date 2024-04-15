class LocalCache {
  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key) {
    const value = window.localStorage.getItem(key)
    // 有可能没有取到
    if (+value) {
      return JSON.parse(value)
    }
  }

  deleteCache(key) {
    window.localStorage.removeItem(key)
  }

  // 缓存全部清空
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()