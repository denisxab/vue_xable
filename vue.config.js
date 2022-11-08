const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = {
  ...defineConfig({
    transpileDependencies: true
  }),
  configureWebpack: {
    resolve: {
      alias: {
        // 'wbs': path.resolve('/media/denis/dd19b13d-bd85-46bb-8db9-5b8f6cf7a825/MyProject/pyw_js/'),
      }
    }
  }
}
