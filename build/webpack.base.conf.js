
// 使用 Node.js 自带的文件路径插件
var path = require('path')

// 引入一些小工具
var utils = require('./utils')

// 使用 config/index.js 中的默认配置
var config = require('../config')

var vueLoaderConfig = require('./vue-loader.conf')

// 将工作区的路径拼接为一个绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {

  // webpack 编译时的入口文件
  entry: {
    app: './src/main.js'
  },

  // webpack 编译完成后的输出文件
  output: {

    // 编译输出的静态资源根路径
    path: config.build.assetsRoot,

    // 编译输出的文件名
    filename: '[name].js',

    // 正式发布环境下编译输出的上线路径的根路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },

  // 配置模块解析的规则
  resolve: {

    // 自动解析的扩展名
    extensions: ['.js', '.vue', '.json'],

    // 创建路径别名，有了别名之后引用模块更方便
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'components': path.resolve(__dirname, '../src/component')
      // 'common': path.resolve(__dirname, '../src/common')
    }
  },

  // 配置不同类型模块的处理规则
  module: {
    rules: [
      {
        // 对 src 和 test 文件夹下的 .js 和 .vue 文件使用 eslint-loader，做代码检查
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },

      {
        // 对所有 .vue 文件使用 vue-loader
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        // 对 src 和 test 文件夹下的 .js 文件使用 babel-loader
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      // {
      //   test: /\.styl$/,
      //   loaders: ['style', 'css', 'stylus']
      // },
      {
        // 对图片资源文件使用 url-loader，query.name 指明了输出的命名规则
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },

      {
        //  对字体资源文件使用 url-loader，query.name 指明了输出的命名规则
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
