<template>
  <form @submit.prevent>
    <input type="text" name="job-title"
      v-model="title" placeholder="Job title">
    <input type="number" name="job-hourly-rate" step="0.01"
      v-model="hourlyRate" placeholder="$70/h">
    <input type="number" name="job-tax-rate" step="0.001"
      v-model="taxRate" placeholder="5.5%">
    <button @click="new()">New Job</button>
  </form>
</template>

<script>
import Api from 'src/Api'

export default {
  data () {
    return { title: '', hourlyRate: '', taxRate: '' }
  },
  methods: {
    new () {
      let {title, hourlyRate, taxRate} = this
      let data = {title, hourlyRate, taxRate}
      Api.newJob(data).then(v => {
        v.entries = []
        this.Store.jobs.push(v)
      })
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  margin-bottom: 1rem;
  align-items: center;
}
input[name="job-title"] {
  flex-grow: 1;
}
input[name="job-hourly-rate"],
input[name="job-tax-rate"],
button {
  width: 7rem;
}

</style>
