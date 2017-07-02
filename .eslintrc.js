// eslint的配置文件

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
 // 表示使用标准规则
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],

  // 添加自定义规则
  'rules': {
    // 允许箭头函数前不写括号，0表示忽略规则检测
    'arrow-parens': 0,

    //  允许使用 async-await
    'generator-star-spacing': 0,

    //如果当前属于开发环境，可以使用 debugger，如果当前属于生产环境，不能使用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    //如果代码末尾没加分好，就报错
  }
}
