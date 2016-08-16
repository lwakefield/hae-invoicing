/* globals localStorage */
import { decodeJwt } from 'src/jwt'
import Api from 'src/api'

const store = {
  authToken: localStorage.authToken,
  get claims () {
    if (!this.authToken) return undefined
    return decodeJwt(this.authToken).claims
  },
  jobs: []
}

Api.getAllJobs().then(v => { store.jobs = v })

export default store
