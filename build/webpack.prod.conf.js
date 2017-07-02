// 使用 Node.js 自带的文件路径插件
var path = require('path')

// 使用一些小工具
var utils = require('./utils')

// 加载 webpack
var webpack = require('webpack')

// 加载 config.js 中的配置信息
var config = require('../config')

// 加载 webpack 配置合并工具
var merge = require('webpack-merge')

// 加载 webpack.base.conf.js
var baseWebpackConfig = require('./webpack.base.conf')

//  一个 webpack 插件，可以将单个文件或整个目录复制到构建目录中
var CopyWebpackPlugin = require('copy-webpack-plugin')

// 一个可以插入 html 并且创建新的 .html 文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 一个 webpack 插件，可以提取一些代码并且将它们和文件分离开
// 如果我们想将 webpack 打包成一个文件 css js 分离开，那我们需要这个插件
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 一个 webpack 插件，可以压缩和优化 CSS
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 将当前的环境设置为生产环境
var env = config.build.env

// 合并 webpack.base.conf.js
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },

  // 是否使用 #source-map 开发工具
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {

    // 编译输出目录
    path: config.build.assetsRoot,

    // 编译输出的文件名，我们可以在 hash 后加 :6 决定使用几位 hash 值
    filename: utils.assetsPath('js/[name].[chunkhash].js'),

    // 没有指定文件名的文件输出的文件名
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },

  // 使用插件
  plugins: [

    // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // 压缩 js (同样可以压缩 css)
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),

    // 将 css 文件分离出来
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),

    // 压缩 CSS 文件
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    /* 输入输出的 .html 文件 */
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },

      chunksSortMode: 'dependency'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {

        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    // 复制自定义的静态资源
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
