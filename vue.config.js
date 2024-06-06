const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_PROXY_URL,
        changeOrigin: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_BASE_URL}`]: ''
        }
      }
    }
  }
})
