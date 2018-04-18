import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import auth from '@/auth'
import ConnectForm from '@/components/Form/ConnectForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/Home.vue'], resolve), //Lazy-loading
      beforeEnter: requireAuth
    },
    { 
      path: '/login', 
      component: resolve => require(['@/components/Pages/Login.vue'], resolve), //Lazy-loading 
    },
    {
      path: '/logout',
      beforeEnter(to, from, next) {
        auth.logout()
        next('/login')
      }
    },
    {
      path: '*',
      name: 'notfound',
      component: resolve => require(['@/components/Pages/NotFound.vue'], resolve) //Lazy-loading
    }
  ]
})

function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}