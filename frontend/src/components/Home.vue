<template>
  <new-job-form></new-job-form>
  <job-list></job-list>
</template>

<script>
import Store from 'src/store'
import moment from 'moment'
import NewJobForm from 'components/NewJobForm'
import JobList from 'components/JobList'

export default {
  components: { NewJobForm, JobList },
  data () {
    return {
      Store,
      moment,
      job: { title: '', hourlyRate: '', taxRate: '' },
      entry: { summary: '', duration: '', date: moment().format('YYYY-MM-DD'), time: moment().format('HH:mm') }
    }
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {}
}
</script>
