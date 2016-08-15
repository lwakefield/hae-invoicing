/* eslint-env mocha */
import { expect } from 'chai'
import r from 'request-promise'

const randStr = () => Math.random().toString(36).slice(2)

describe('server', () => {
  const [username, password] = [randStr(), randStr()]
  it('can signup', done => {
    r.post('http://localhost:3000/users', {
      body: {username, password},
      json: true
    }).then(v => {
      expect(v).to.have.property('username')
      expect(v).to.have.property('id')
      done()
    })
  })
  it('can login', done => {
    r.post('http://localhost:3000/login', {
      body: {username, password},
      json: true
    }).then(v => {
      expect(v).to.have.property('authToken')
      done()
    })
  })
})
