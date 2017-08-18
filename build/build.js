
// 检查 Node 和 npm 版本
require('./check-versions')()

// 设置环境为生产环境
process.env.NODE_ENV = 'production'

// 使用 ora, ora可以优雅的在命令行中展示执行命令后的提示信息
var ora = require('ora')

//  使用 rimraf 后可以在 Node.js 中使用 rm -rf 命令
var rm = require('rimraf')

// 使用 Node.js 自带的文件路径插件
var path = require('path')

// 使用 chalk 可以改变命令行中字符串的风格
var chalk = require('chalk')

// 使用 Webpack
var webpack = require('webpack')

// 加载 config.js 中的配置信息
var config = require('../config')

// 加载 webpack.prod.conf 中的配置信息
var webpackConfig = require('./webpack.prod.conf')

// 使用 ora 打印出 loading + log
var spinner = ora('building for production...')

// 开始 loading 动画
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err

  //  开始 webpack 的编译
  webpack(webpackConfig, function (err, stats) {

    // 编译成功的回调函数
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    //  输出提示信息 ～ 提示用户请在 http 服务下查看本页面，否则为空白页
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
