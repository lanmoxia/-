const path = require('path')
module.exports = {
  lintOnSave: false,
  chainWebpack: config =>{
    // dir 目录的路径
    const dir = path.resolve(__dirname, 'src/assets/icons')

    config.module //Vue 把 webpack 封装暴露出一个 对象 config
        .rule('svg-sprite') // 添加规则 规则名字
        .test(/\.svg$/) //规则特点 能匹配这里的正则就能使用
        .include.add(dir).end() // 只需要 dir 这个目录走这个规则
        // 配置 loader
        // 1. 所有 loader 后边添加 -mod 的是修复 sass 引入问题 yarn add --dev svg-sprite-loader-mod
        // 2. webstorm 设置 搜索 webpack 添加文件  目录：D:\demo\ledger\node_modules\@vue\cli-service\webpack.config.js
        .use('svg-sprite-loader-mod').loader('svg-sprite-loader-mod').options({extract: false}).end()
        // 下边两句是消除 icon 默认颜色
        .use('svg-loader').loader('svgo-loader')
        .tap(options =>({...options, plugins:[{removeAttrs:{attrs:'fill'}}]})).end()
    //配置插件
    config.plugin('svg-sprite').use(require('svg-sprite-loader-mod/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 其他 SVG loader 排除 icons 目录
  }
}