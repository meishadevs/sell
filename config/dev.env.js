var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {

  // 表示开发环境
  NODE_ENV: '"development"'
})
