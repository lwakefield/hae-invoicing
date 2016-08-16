/* eslint-env mocha */
import { expect } from 'chai'
import r from 'request-promise'

const randStr = () => Math.random().toString(36).slice(2)

describe('server', () => {
  it('can signup', done => {
    session.signup()
    .then(v => {
      expect(v).to.have.property('username')
      expect(v).to.have.property('id')
      done()
    })
  })
  it('can login', done => {
    session.login()
    .then(v => {
      expect(v).to.have.property('authToken')
      done()
    })
  })
  it('create a job', done => {
    session.newJob()
    .then(v => {
      expect(v).to.have.property('id')
      expect(v).to.have.property('title')
      expect(v).to.have.property('hourlyRate')
      expect(v).to.have.property('taxRate')
      done()
    })
  })
  it('adds a new time entry', done => {
    session.newTimeEntry()
    .then(v => {
      expect(v).to.have.property('id')
      expect(v).to.have.property('summary')
      expect(v).to.have.property('duration')
      expect(v).to.have.property('createdAt')
      done()
    })
  })
  it('gets jobs', done => {
    Promise.all([
      session.newTimeEntry(),
      session.newTimeEntry(),
      session.newTimeEntry()
    ]).then(v => {
      return r.get(`http://localhost:3000/users/${session.user.id}/jobs`, {
        headers: {
          Authorization: `Bearer ${session.user.authToken}`
        },
        json: true
      })
    }).then(v => {
      expect(v).to.be.a('array')
      expect(v[0]).to.have.property('id')
      expect(v[0]).to.have.property('title')
      expect(v[0]).to.have.property('hourlyRate')
      expect(v[0]).to.have.property('taxRate')
      expect(v[0]).to.have.property('entries')
      expect(v[0].entries).to.be.a('array')
      expect(v[0].entries[0]).to.have.property('id')
      expect(v[0].entries[0]).to.have.property('summary')
      expect(v[0].entries[0]).to.have.property('duration')
      expect(v[0].entries[0]).to.have.property('createdAt')
      done()
    })
  })
})

const session = {
  user: {
    id: undefined,
    username: randStr(),
    password: randStr(),
    authToken: undefined
  },
  jobs: [],
  entries: [],
  signup () {
    const {username, password} = this.user
    return new Promise((resolve, reject) => {
      r.post('http://localhost:3000/users', {
        body: {username, password},
        json: true
      }).then(v => {
        this.user.id = v.id
        resolve(v)
      }).catch(reject)
    })
  },
  login () {
    const {username, password} = this.user
    return new Promise((resolve, reject) => {
      r.post('http://localhost:3000/login', {
        body: {username, password},
        json: true
      }).then(v => {
        this.user.authToken = v.authToken
        resolve(v)
      }).catch(reject)
    })
  },
  newJob () {
    return new Promise((resolve, reject) => {
      r.post(`http://localhost:3000/users/${this.user.id}/jobs`, {
        body: {title: randStr(), hourlyRate: 100, taxRate: 123.45},
        headers: {
          Authorization: `Bearer ${session.user.authToken}`
        },
        json: true
      }).then(v => {
        this.jobs.push(v)
        resolve(v)
      }).catch(reject)
    })
  },
  newTimeEntry () {
    return new Promise((resolve, reject) => {
      let [userId, jobId] = [this.user.id, this.jobs[0].id]
      r.post(`http://localhost:3000/users/${userId}/jobs/${jobId}/entries`, {
          body: {summary: randStr(), duration: 120, createdAt: Date.now()},
        headers: {
          Authorization: `Bearer ${session.user.authToken}`
        },
        json: true
      }).then(v => {
        this.entries.push(v)
        resolve(v)
      }).catch(reject)
    })
  }
}
