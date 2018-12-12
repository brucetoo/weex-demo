/* global Vue */
/* weex initialized here, please do not move this line */
const router = require('./router')
const App = require('@/app.vue')
/* eslint-disable no-new */
//Vue.extend 是组件的声明 el中的 #root 是id为root的div标签
//el表示vue绑定数据该去哪里找，可以是 选择器或者HTMLElement
new Vue(Vue.util.extend({el: '#root', router}, App))
router.push('/')