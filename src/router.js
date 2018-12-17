/* global Vue */
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import ScrollPage from '@/vue_examples/components/scroll-page'

import ViewHome from '@/assets/views/home.vue'
import ViewTopic from '@/assets/views/topic.vue'
import ViewClass from '@/assets/views/class.vue'
import ViewShop from '@/assets/views/shop.vue'
import ViewMy from '@/assets/views/my.vue'

Vue.use(Router);

module.exports = new Router({
  routes: [
    // {path: '/', redirect: '/ScrollPage'},
    // {path: '/HelloWorld',component: HelloWorld },
    // {path: '/ScrollPage',component: ScrollPage },
    { path: '/', redirect: '/home' },
    { path: '/home', component: ViewHome },
    { path: '/topic', component: ViewTopic },
    { path: '/class', component: ViewClass },
    { path: '/shop', component: ViewShop },
    { path: '/my', component: ViewMy }
  ]
});
