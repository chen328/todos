import Vue from 'vue'

//字体图标必须
//导入mui
import './lib/mui/css/mui.min.css'


//导入路由模块
import VueRouter from 'vue-router'
//挂载路由
Vue.use(VueRouter);

import app from './app.vue'

//引用路由文件
import router from './router.js'
//引用vue-resourse 发请求
import vueResourse from 'vue-resource'
Vue.use(vueResourse);


// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;


let vm = new Vue({
  el:'#app',
  render: c => c(app),
  router


});