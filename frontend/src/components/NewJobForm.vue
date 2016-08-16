<template>
  <form @submit.prevent>
    <label class="title">Job Title:
      <input type="text" name="job-title"
      v-model="title" placeholder="Job title">
    </label>
    <label class="hourly-rate">Hourly Rate:
      <input type="number" name="job-hourly-rate" step="0.01"
      v-model="hourlyRate" placeholder="$70/h">
    </label>
    <label class="tax-rate">Tax Rate:
      <input type="number" name="job-tax-rate" step="0.001"
      v-model="taxRate" placeholder="5.5%">
    </label>
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
  align-items: flex-end;
}
.title {
  flex-grow: 1;
}
label {
  display: flex;
  flex-flow: column;
}
.hourly-rate,
.tax-rate,
button {
  width: 7rem;
}

</style>
