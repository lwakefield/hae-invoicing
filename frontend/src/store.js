/* globals localStorage */
import { decodeJwt } from 'src/jwt'

const store = {
  authToken: localStorage.authToken,
  get claims () {
    if (!this.authToken) return undefined
    return decodeJwt(this.authToken).claims
  },
  jobs: [
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      hourlyRate: 100,
      taxRate: 5.5,
      entries: [
        {summary: 'Lorem ipsum dolor sit amet.', duration: 90, createdAt: Date.now()},
        {summary: 'Lorem ipsum dolor sit amet.', duration: 90, createdAt: Date.now()},
        {summary: 'Lorem ipsum dolor sit amet.', duration: 90, createdAt: Date.now()}
      ]
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      hourlyRate: 100,
      taxRate: 5.5,
      entries: [
        {summary: 'Lorem ipsum dolor sit amet.', duration: 90, createdAt: Date.now()},
        {summary: 'Lorem ipsum dolor sit amet.', duration: 90, createdAt: Date.now()},
        {summary: 'Lorem ipsum dolor sit amet.', duration: 90, createdAt: Date.now()}
      ]
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
      hourlyRate: 100,
      taxRate: 5.5,
      entries: [
        {summary: 'Lorem ipsum dolor sit amet.', duration: 90, createdAt: Date.now()},
        {summary: 'Lorem ipsum dolor sit amet.', duration: 90, createdAt: Date.now()},
        {summary: 'Lorem ipsum dolor sit amet.', duration: 90, createdAt: Date.now()}
      ]
    }
  ]
}

export default store
