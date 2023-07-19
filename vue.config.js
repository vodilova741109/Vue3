// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,  
// })
module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: (config) => {
    return {
      devServer: {
        proxy: {
          '/wp-json': {
            target: 'https://prodomstroim.ru',
            secure: false,
            changeOrigin: true
          }
        }
      }
    }
  }
}


