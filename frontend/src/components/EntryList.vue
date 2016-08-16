<template>
  <div class="list">
    <div v-for="e of job.entries" class="entry">
      <input type="checkbox" @click="toggleEntry(e.id)">
      <div class="entry-summary"> {{ e.summary }}</div>
      <div class="entry-duration"> {{ e.duration }} minutes </div>
      <div class="entry-created-at"> {{ moment(e.createdAt).format('L') }}</div>
    </div>
    <a v-link="{path: `/invoice?v=${invoiceLink}`}">Create invoice with selected</a>
  </div>
</template>

<script>
/* global btoa */
import moment from 'moment'

export default {
  props: ['jobId'],
  data () {
    return {
      moment,
      selected: []
    }
  },
  computed: {
    job () {
      return this.Store.jobs.find(v => v.id === this.jobId)
    },
    invoiceLink () {
      const data = {
        jobId: this.jobId,
        entries: this.selected
      }
      return btoa(JSON.stringify(data))
    }
  },
  methods: {
    toggleEntry (entryId) {
      if (this.selected.includes(entryId)) {
        this.selected = this.selected.filter(v => v !== entryId)
      } else {
        this.selected.push(entryId)
      }
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
