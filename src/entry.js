/* global Vue */
/* weex initialized here, please do not move this line */
// const router = require('./router')
import router from './router'
//除了js模块的引入 可以直接是 ./以外，其他模块引入需要换成 @/... 不知道是否是webpack版本的问题
//https://stackoverflow.com/questions/42828484/module-not-found-error-cant-resolve-app-index-vue-vue-js-component-import
import main from '@/Main.vue'
// import { sync } from 'vuex-router-sync'
import * as filters from '@/filters'
import mixins from '@/mixins'
// const App = require('@/app.vue')

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// register global mixins.
Vue.mixin(mixins);

/* eslint-disable no-new */
//Vue.extend 是组件的声明 el中的 #root 是id为root的div标签
//el表示vue绑定数据该去哪里找，可以是 选择器或者HTMLElement
new Vue(Vue.util.extend({el: '#root', router}, main));
router.push('/');