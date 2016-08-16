<template>
  <app-header> </app-header>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
/* globals localStorage */
import Store from 'src/store'
import moment from 'moment'
import AppHeader from 'components/Header'

export default {
  components: { AppHeader },
  data () {
    return {
      Store,
      moment,
      job: { title: '', hourlyRate: '', taxRate: '' },
      entry: { summary: '', duration: '', date: moment().format('YYYY-MM-DD'), time: moment().format('HH:mm') }
    }
  },
  ready () {
    const needsAuth = ['/']
    this.$router.beforeEach(transition => {
      const authToken = localStorage.authToken
      if (needsAuth.includes(transition.to.path) && !authToken) {
        transition.abort()
        this.$router.go('/login-signup')
        return
      }
      transition.next()
    })
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  flex-flow: column;
  height: 100%;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  color: #333
}

.app {
  background-color: #eee;
  max-width: 32rem;
  width: 100%;
  padding: 1rem;
}
</style>
