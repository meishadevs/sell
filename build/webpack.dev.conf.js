
// 使用一些小工具
var utils = require('./utils')

// 使用 webpack
var webpack = require('webpack')

// 使用 config/index.js 中的默认配置
var config = require('../config')

// 使用 webpack 配置合并插件
var merge = require('webpack-merge')

// 加载 webpack.base.conf
var baseWebpackConfig = require('./webpack.base.conf')

// 使用 html-webpack-plugin 插件，这个插件可以帮我们自动生成 html 并且注入到 .html 文件中
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 使用 Friendly-errors-webpack-plugin 插件，这个插件可以识别某些类别的 webpack 错误并进行清理
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 将 Hol-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 将我们 webpack.dev.conf.js 的配置和 webpack.base.conf.js 的配置合并
module.exports = merge(baseWebpackConfig, {
  module: {

    //  使用 styleLoaders
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },

  // 使用 #eval-source-map 模式作为开发工具，此配置可参考 DDFE 往期文章详细了解
  devtool: '#cheap-module-eval-source-map',
  plugins: [

    // DefinePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),

    // 是用了 HotModule 插件后，当页面进行变更的时候，只会重绘对应的页面模块，不会重绘整个 html 文件
    new webpack.HotModuleReplacementPlugin(),

    // 使用了 NoEmitOnErrorsPlugin 后页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),

    // 将 index.html 作为入口，注入 html 代码后生成 index.html 文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
