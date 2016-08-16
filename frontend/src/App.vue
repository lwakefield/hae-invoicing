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
    const needsAuth = ['/', '/invoice']
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
@import 'https://fonts.googleapis.com/css?family=Work+Sans';
body {
  display: flex;
  align-items: center;
  flex-flow: column;
  font-family: 'Work Sans', sans-serif;
  color: #333;
  margin: 0;
  font-size: 18px;
}
* {
  box-sizing: border-box;
}

.app {
  border: 1px solid #eee;
  max-width: 48rem;
  width: 100%;
  padding: 1rem;
}

a,
a:visited {
  color: #84b7da;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
button,
input {
  font: inherit;
  color: inherit;
  margin: 0;
  height: 2rem;
}
input {
  background-color: #fdfdfd;
  border: 2px solid #eee;
}
button {
  border: 2px solid #84b7da;
  background-color: #84b7da;
  color: #eee;
}
</style>
