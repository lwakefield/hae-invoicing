<template>
  <div class="list">
    <div v-for="e of job.entries" class="entry">
      <input type="checkbox" @click="toggleEntry(e)">
      <div class="entry-summary"> {{ e.summary }}</div>
      <div class="entry-duration"> {{ e.duration }} minutes </div>
      <div class="entry-created-at"> {{ moment(e.createdAt).format('L') }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['jobId'],
  data () { return { moment, selected: [], lastClicked: undefined } },
  computed: {
    job () {
      return this.Store.jobs.find(v => v.id === this.jobId)
    }
  },
  methods: {
    toggleEntry (e) {

    }
  }
}
</script>

<style scoped>
.list {
  border: 1px solid #eee;
}
input {
  margin-right: 1rem;
}
.entry {
  display: flex;
  padding: 0.3rem;
  align-items: center;
}
.entry:nth-child(odd) {
  background-color: #fdfdfd;
}
.entry-summary {
  flex-grow: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.entry-duration,
.entry-created-at {
  width: 7rem;
  text-align: right;
}
</style>
