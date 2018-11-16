/* global Vue */
/* weex initialized here, please do not move this line */
const router = require('./router')
const App = require('@/vue_examples/modules/event.vue')
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App))
router.push('/')