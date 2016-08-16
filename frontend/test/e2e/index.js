/* eslint-env mocha */
/* globals browser, expect */

const randStr = () => Math.random().toString(36).substring(7)

describe('her @watch', () => {
  before(() => {
    browser.url('http://localhost:8080')
    browser.localStorage('DELETE', 'authToken')
  })
  it('gets redirected to login page', () => {
    browser.url('http://localhost:8080')
    expect(browser.getUrl()).to.eql('http://localhost:8080/login-signup')
  })
  it('signsup', () => {
    session.signup()
    expect(browser.getUrl()).to.eql('http://localhost:8080/')
  })
  it('logs out', () => {
    browser.click('button=Logout')
    const authToken = browser.localStorage('GET', 'authToken').value
    expect(authToken).to.eql(null)
    expect(browser.getUrl()).to.eql('http://localhost:8080/login')
  })
  it('adds a job', () => {
    session.login()
    const job = session.newJob()
    expect(browser.isExisting(`.job-title=${job.title}`)).to.eql(true)
  })
  it('adds an entry', () => {
    const {summary} = session.newEntry(0)
    expect(browser.isExisting(`.entry*=${summary}`)).to.eql(true)
  })
})

const session = {
  user: { username: randStr(), password: randStr() },
  jobs: [],
  signup () {
    browser.url('http://localhost:8080/signup/')
    const {username, password} = this.user
    browser.setValue('input[name="username"]', username)
    browser.setValue('input[name="password"]', password)
    browser.click('button=Signup')
    browser.waitUntil(() => {
      return browser.getUrl() === 'http://localhost:8080/'
    }, 5000)
  },
  login () {
    browser.url('http://localhost:8080/login/')
    const {username, password} = this.user
    browser.setValue('input[name="username"]', username)
    browser.setValue('input[name="password"]', password)
    browser.click('button=Login')
    browser.waitUntil(() => {
      return browser.getUrl() === 'http://localhost:8080/'
    }, 5000)
  },
  newJob () {
    let [title, hourlyRate, taxRate] = [randStr(), 100, 5.5]
    browser.setValue('input[name="job-title"]', title)
    browser.setValue('input[name="job-hourly-rate"]', hourlyRate)
    browser.setValue('input[name="job-tax-rate"]', taxRate)
    browser.click('button=New Job')
    this.jobs.push({title, hourlyRate, taxRate, entries: []})
    return { title, hourlyRate, taxRate }
  },
  newEntry (jobIndex) {
    const job = this.jobs[jobIndex]
    const el = browser.element(`.job*=${job.title}`)
    let summary = randStr()
    el.setValue('input[name="entry-summary"]', summary)
    el.setValue('input[name="entry-duration"]', '120')
    el.click('button=New Entry')
    job.entries.push({summary})
    return {summary}
  }
}
