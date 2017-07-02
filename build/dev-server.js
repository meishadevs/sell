
// 检查 Node 和 npm 的版本
require('./check-versions')()

//使用 config/index.js 中的默认配置
var config = require('../config')

/**
 * 如果 Node 的环境无法判断当前是 dev / product 环境
 * 使用 config.dev.env.NODE_ENV 作为当前环境
 */
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 用于打开文件或者网站
var opn = require('opn')

// 使用 Node.js 自带的文件路径工具
var path = require('path')

//  使用 Node.js 下的 express 服务
var express = require('express')

// webpack模块
var webpack = require('webpack')

// http-proxy 可以实现转发所有请求代理到后端真实 API 地址，以实现前后端开发完全分离
// 在 config/index.js 中可以对 proxyTable 项进行配置
var proxyMiddleware = require('http-proxy-middleware')

// webpack的相关配置
var webpackConfig = require('./webpack.dev.conf')

// 如果没有指定运行端口，使用 config.dev.port 作为运行端口
var port = process.env.PORT || config.dev.port

// 自动打开浏览器，如果未设置，则为 false
var autoOpenBrowser = !!config.dev.autoOpenBrowser

// 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置
var proxyTable = config.dev.proxyTable

// 使用 express 启动一个服务
var app = express()

// 获得data.json中的数据
var appData = require('../data.json');

// 卖家相关的数据
var seller = appData.seller;

// 商品相关的数据
var goods = appData.goods;

// 评论相关的数据
var ratings = appData.ratings;

//创建路由
var apiRoutes = express.Router()

// 通过路由获得商家相关的数据
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

// 通过路由获得商品相关的数据
apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

// 通过路由获得评论相关的数据
apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

// 就相当于一个中间件处理器，请求来了，让那些中间件先处理一遍
app.use('/api', apiRoutes);

// 启动 webpack 进行编译
var compiler = webpack(webpackConfig)

// 启动 webpack-dev-middleware，将编译后的文件暂存到内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload(热加载)
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// html-webpack-plugin 模板更改时强制页面重新加载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// 将暂存到内存中的 webpack 编译后的文件挂载到 express 服务上
app.use(devMiddleware)

// 将 Hot-reload(热加载) 挂在到 express 服务上
app.use(hotMiddleware)

//  拼接 static 文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

// 为静态资源提供响应服务
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')

  // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

//监听port端口
var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
