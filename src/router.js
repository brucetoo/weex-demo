/* global Vue */
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ScrollPage from '@/vue_examples/components/scroll-page'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {path: '/', redirect: '/ScrollPage'},
    {path: '/HelloWorld',component: HelloWorld },
    {path: '/ScrollPage',component: ScrollPage },
  ]
});
