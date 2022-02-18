import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import Router from "vue-router"
//重写router原型链上的push方法 防止重复切换同一个路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

Vue.use(ElementUI)
Vue.use(VueLazyload,{
  error:require('../public/img/加载失败.png'),
  loading:require('../public/img/加载中.gif')
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
