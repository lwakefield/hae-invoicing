<template>
  <h2>Jobs</h2>
  <div v-for="j of Store.jobs" class="job job-{{j.id}}">
    <header>
      <div class="job-title">{{ j.title }}</div>
      <div class="job-hourly-rate">{{ j.hourlyRate }}</div>
      <div class="job-tax-rate">{{ j.taxRate }}</div>
    </header>

    <new-entry-form :job-id="j.id"></new-entry-form>

    <entry-list :job-id="j.id"></entry-list>
  </div>
</template>

<script>
import NewEntryForm from 'components/NewEntryForm'
import EntryList from 'components/EntryList'
import moment from 'moment'

export default {
  data () { return { moment } },
  components: { NewEntryForm, EntryList }
}
</script>

<style scoped>
h2 {
  font-size: 1.4rem;
  margin: 0 0 1rem;
  border-bottom: 1px solid #eee;
  text-align: center;
}
.job {
  display: flex;
  flex-flow: column;
  padding: 1rem;
  border: 1px solid #eee;
}
.job header {
  display: flex;
  flex-flow: row nowrap;
  font-weight: bolder;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}
.job-title {
  flex-grow: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.job-hourly-rate,
.job-tax-rate {
  width: 7rem;
  text-align: right;
}
</style>
