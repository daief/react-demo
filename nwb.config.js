const path = require('path')

const ENV = process.env
// npm 提供一个npm_lifecycle_event变量，返回当前正在运行的脚本名称
const TARGET = ENV.npm_lifecycle_event

module.exports = {
  type: 'react-app',
  webpack: {
    publicPath: TARGET === 'build' ? './' : '/',
    aliases: {
      // 公共的工具类、容器和组件，使用时： import utils from 'utils'
      utils: path.resolve('./src/utils'),
    },
    define: {
      PRODUCTION: ENV.NODE_ENV === 'production'
    },
    extra: {
      resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx"]
      },
      module: {
        rules: [
          { test: /\.tsx?$/, loader: "ts-loader" }
        ],
      },
    },
  },
}
