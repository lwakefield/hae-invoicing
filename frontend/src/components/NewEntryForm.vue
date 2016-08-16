<template>
  <form @submit.prevent>
    <label class="summary">
      Summary:
      <input type="text" name="entry-summary"
      v-model="summary" placeholder="Entry summary">
    </label>
    <label class="summary">
      Duration(m):
      <input type="number" name="entry-duration"
        v-model="duration" placeholder="90m">
    </label>
    <label class="date">
      Date:
      <input type="date" name="entry-date"
        v-model="date">
    </label>
    <button @click="new()">New Entry</button>
  </form>
</template>

<script>
import Api from 'src/Api'
import moment from 'moment'

export default {
  props: ['jobId'],
  data () {
    return { summary: '', duration: '', date: moment().format('YYYY-MM-DD') }
  },
  methods: {
    new () {
      let {summary, duration, date} = this
      let createdAt = moment(date, 'YYYY-MM-DD')
      let data = {summary, duration, createdAt}
      Api.newEntry(this.jobId, data).then(v => {
        const job = this.Store.jobs.find(v => v.id === this.jobId)
        job.entries.push(v)
      })
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-flow: row nowrap;
  margin-bottom: 1rem;
}
label {
  display: flex;
  flex-flow: column;
}
.summary {
  flex-grow: 1;
}
.duration,
.date,
button {
  width: 7rem;
}
</style>
