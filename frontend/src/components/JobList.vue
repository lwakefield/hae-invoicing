<template>
  <div v-for="j of Store.jobs" class="job job-{{j.id}}">
    <header>
      <div class="job-title">{{ j.title }}</div>
      <div class="job-hourly-rate">{{ j.hourlyRate }}</div>
      <div class="job-tax-rate">{{ j.taxRate }}</div>
    </header>

    <new-entry-form :job-id="j.id"></new-entry-form>

    <div v-for="e of j.entries" class="entry">
      <div class="entry-summary"> {{ e.summary }}</div>
      <div class="entry-duration"> {{ e.duration }} minutes </div>
      <div class="entry-created-at"> {{ moment(e.createdAt).format('L LT') }}</div>
    </div>
  </div>
</template>

<script>
import NewEntryForm from 'components/NewEntryForm'
import moment from 'moment'

export default {
  data () { return { moment } },
  components: { NewEntryForm }
}
</script>

<style scoped>
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
