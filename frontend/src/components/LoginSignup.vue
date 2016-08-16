<template>
  <h1>Login / Signup</h1>
  <form @submit.prevent>
    <label>Username:
      <input type="text" name="username" v-model="username">
    </label>
    <label>Password:
      <input type="password" name="password" v-model="password">
    </label>
    <button @click="login()">Login</button>
    <button @click="signup()">Signup</button>
  </form>
</template>

<script>
/* globals localStorage */
import Api from 'src/Api'
import Store from 'src/Store'

export default {
  data () {
    return { username: '', password: '' }
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {
    signup () {
      Api.signup(this.username, this.password)
      .then(() => this.login())
    },
    login () {
      Api.login(this.username, this.password)
      .then(v => {
        localStorage.authToken = v.authToken
        Store.authToken = v.authToken
        this.$router.go('/')
      })
    }
  },
  components: {}
}
</script>

<style lang="css">
</style>
