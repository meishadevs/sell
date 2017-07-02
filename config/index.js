
// 使用 Node.js 自带的文件路径插件
var path = require('path')

module.exports = {

  // 生产环境
  build: {

    // 使用 config/prod.env.js 中定义的编译环境
    env: require('./prod.env'),

    // 编译输入的 index.html 文件
    index: path.resolve(__dirname, '../dist/index.html'),

    // 编译输出的静态资源路径
    assetsRoot: path.resolve(__dirname, '../dist'),

    // 编译输出的二级目录
    assetsSubDirectory: 'static',

    // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',

    // 是否开启 cssSourceMap
    productionSourceMap: true,

    // 是否开启 gzip
    productionGzip: false,

    // 需要使用 gzip 压缩的文件扩展名
    productionGzipExtensions: ['js', 'css'],

    // 运行带有额外参数的 build 命令
    bundleAnalyzerReport: process.env.npm_config_report
  },

  // 开发环境
  dev: {

    // 使用 config/dev.env.js 中定义的编译环境
    env: require('./dev.env'),

    // 页面的端口号
    port: 8080,

    // 是否自动刷新浏览器
    autoOpenBrowser: true,

    // 编译输出的二级目录
    assetsSubDirectory: 'static',

    // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',

    // 需要 proxyTable 代理的接口（可跨域）
    proxyTable: {},

    // 是否开启 cssSourceMap
    cssSourceMap: false
  }
}
