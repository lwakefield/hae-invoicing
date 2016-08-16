<template>
  <header>
    <h1><a v-link="{path: '/'}">HAE</a></h1>
    <div v-if="Store.authToken">
      <span>Hello {{ Store.claims.username }}</span>
      <button @click="logout()">Logout</button>
    </div>
  </header>
</template>

<script>
/* globals localStorage */
import Store from 'src/Store'

export default {
  data () {
    return { Store }
  },
  methods: {
    logout () {
      localStorage.removeItem('authToken')
      this.Store.authToken = ''
      this.Store.jobs = []
      this.$router.go('login')
    }
  }
}
</script>

<style scoped>
h1 {
  margin: 0;
}
header {
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}
</style>
