<template>
  <div class="app">
    <form>
      <input type="text" v-model="job.title" placeholder="Job title">
      <input type="number" v-model="job.hourlyRate" placeholder="$70/h">
      <input type="number" v-model="job.taxRate" placeholder="5.5%">
    </form>
    <div v-for="j of Store.jobs" class="job">
      <header>
        <button>+</button>
        <div class="job-title">{{ j.title }}</div>
        <div class="job-hourly-rate">{{ j.hourlyRate }}</div>
        <div class="job-tax-rate">{{ j.taxRate }}</div>
      </header>

      <form>
        <input type="text" v-model="entry.summary" placeholder="Entry summary">
        <input type="text" v-model="entry.duration" placeholder="90m">
        <input type="date" v-model="entry.date">
        <input type="time" v-model="entry.time">
      </form>

      <div v-for="e of j.entries" class="entry">
        <div class="entry-summary"> {{ e.summary }}</div>
        <div class="entry-duration"> {{ e.duration }} minutes </div>
        <div class="entry-created-at"> {{ moment(e.createdAt).format('L LT') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from 'src/store'
import moment from 'moment'

export default {
  data () {
    return {
      Store,
      moment,
      job: { title: '', hourlyRate: '', taxRate: '' },
      entry: { summary: '', duration: '', date: moment().format('YYYY-MM-DD'), time: moment().format('HH:mm') }
    }
  },
  components: { }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
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

.job {
  display: flex;
  flex-flow: column;
}
.job header {
  display: flex;
  flex-flow: row nowrap;
  font-weight: bolder;
}
.job-title {
  flex-grow: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.job-hourly-rate,
.job-tax-rate {
  flex-grow: 1;
}

.entry {
  display: flex;
}
.entry-summary {
  flex-grow: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.entry-duration,
.entry-created-at {
  flex-grow: 1;
}
</style>
