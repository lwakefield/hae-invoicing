import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Home from 'components/Home'
import LoginSignup from 'components/LoginSignup'
import Invoice from 'components/Invoice'

import Store from 'src/Store'

Vue.use(VueRouter)
Vue.mixin({
  data () {
    return { Store }
  }
})

const router = new VueRouter({history: true})
router.map({
  '/': { component: Home },
  '/login': { component: LoginSignup },
  '/signup': { component: LoginSignup },
  '/login-signup': { component: LoginSignup },
  '/invoice': { component: Invoice }
})

router.start(App, '#app')
