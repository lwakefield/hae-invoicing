/* globals API_ENDPOINT, localStorage */
import { request, plugins } from 'popsicle'
import { decodeJwt } from 'src/jwt'

function post (url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    request({ method: 'POST', url, body, headers })
    .use(plugins.parse('json'))
    .then(v => resolve(v.body))
    .catch(reject)
  })
}
// eslint-disable-next-line
function get (url, headers = {}) {
  return new Promise((resolve, reject) => {
    request({ method: 'GET', url, headers })
    .use(plugins.parse('json'))
    .then(v => resolve(v.body))
    .catch(reject)
  })
}

const Api = {
  get userId () {
    const {claims} = decodeJwt(localStorage.getItem('authToken'))
    return claims.id
  },
  get authHeader () {
    const token = localStorage.getItem('authToken')
    return {Authorization: `Bearer ${token}`}
  },
  signup (username, password) {
    return post(`${API_ENDPOINT}/users/`, {username, password})
  },
  login (username, password) {
    return post(`${API_ENDPOINT}/login/`, {username, password})
  },
  newJob (data) {
    return post(`${API_ENDPOINT}/users/${this.userId}/jobs`, data, this.authHeader)
  },
  newEntry (jobId, data) {
    return post(`${API_ENDPOINT}/users/${this.userId}/jobs/${jobId}/entries`, data, this.authHeader)
  }
}
export default Api
