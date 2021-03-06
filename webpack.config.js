//引用模块
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  entry:path.join(__dirname,'./src/main.js'),
  output:{
    path:path.join(__dirname,'dist'),//输出目录
    filename:'bundle.js'
  },
  plugins:[
      new htmlWebpackPlugin({
        template:path.join(__dirname,'src/index.html'),
        filename:'index.html'
      }),
      new VueLoaderPlugin()
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
      { test: /\.(png|jpg|gif)$/, use: 'url-loader' }
    ]
  }
  // resolve: {
  //   alias: {
  //     // 'vue$': 'vue/dist/vue.esm.js'
  //   }
  // }
};