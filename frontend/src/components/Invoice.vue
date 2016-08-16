<template>
  <h1>Invoice for <span v-if="job">{{ job.title }}</span></h1>

  <div class="entries">
    <div class="entries-header">
      <div class="summary">Summary</div>
      <div class="duration">Duration</div>
      <div class="created-at">Date</div>
    </div>
    <div v-for="e in entries" class="entry">
      <div class="summary">{{ e.summary }}</div>
      <div class="duration">{{ e.duration / 60 }}h</div>
      <div class="created-at">{{ moment(e.createdAt).format('L') }}</div>
    </div>
  </div>

  <footer>
    <div class="prices" v-if="job">
      <div class="price">
        Sub Total:
        <div class="right"><strong>${{ subTotal }}</strong> <small>({{totalMinutes / 60}}h &times; ${{ job.hourlyRate }})</small></div>
      </div>
      <div class="price">
        Grand Total:
        <div class="right"><strong>${{ grandTotal }}</strong> <small>(Sub + Tax)</small></div>
      </div>
    </div>
  </footer>
</template>

<script>
import moment from 'moment'
/* globals atob */
export default {
  data () {
    return { query: undefined, moment }
  },
  ready () {
    let q = window.location.href.match(/\?v=(.+)$/)[1]
    this.query = JSON.parse(atob(q))
  },
  computed: {
    job () {
      return this.Store.jobs.find(v => v.id === this.query.jobId)
    },
    entries () {
      if (!this.job) return []

      let entryIds = this.query.entries
      return this.job.entries.filter(v => entryIds.includes(v.id))
    },
    totalMinutes () {
      if (!this.entries.length) return 0
      return this.entries.map(v => v.duration)
      .reduce((a, b) => a + b)
    },
    subTotal () {
      if (!this.job) return 0
      return this.job.hourlyRate * (this.totalMinutes / 60)
    },
    grandTotal () {
      if (!this.job) return 0
      return this.subTotal * (1 + (this.job.taxRate) / 100)
    }
  }
}
</script>

<style>
.entries {
  border: 1px solid #eee;
  margin-bottom: 1rem;
}
.entries-header {
  display: flex;
  padding: 0.3rem;
  font-size: 1.5rem;
  font-weight: bolder;
}
.entry {
  display: flex;
  padding: 0.3rem;
  align-items: center;
}
.entry:nth-child(odd) {
  background-color: #fdfdfd;
}
.summary {
  flex-grow: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.duration,
.created-at {
  width: 7rem;
  text-align: right;
}

footer {
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
}
.prices {
  padding: 1rem;
  border: 1px solid #eee;
}
.price {
  display: flex;
  justify-content: flex-end;
}
.right {
  width: 16rem;
  text-align: right;
}
</style>
