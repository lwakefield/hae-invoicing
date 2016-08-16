import express from 'express'
import knex from 'knex'
import config from './config'
import BodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const db = knex({
  client: 'sqlite3',
  connection: 'app.db'
})
db.schema.dropTableIfExists('users')
.dropTableIfExists('jobs')
.dropTableIfExists('timeEntry')
.createTableIfNotExists('users', function (table) {
  table.increments()
  table.string('username').unique()
  table.string('password')
}).createTableIfNotExists('jobs', function (table) {
  table.increments()
  table.string('title')
  table.integer('hourlyRate')
  table.double('taxRate')
  table.integer('userId')
}).createTableIfNotExists('entries', function (table) {
  table.increments()
  table.string('summary')
  table.integer('duration')
  table.timestamp('createdAt')
  table.integer('jobId')
}).then(() => console.log('reset the db'))

const app = express()
app.use(BodyParser.json())

const atob = v => new Buffer(v, 'base64').toString('binary');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', (req, res) => {
  let {username, password} = req.body
  let salt = bcrypt.genSaltSync();
  let hash = bcrypt.hashSync(password, salt)
  db('users') .insert({username, password: hash})
  .then(id => res.json({id: id[0], username}))
});

app.post('/login', (req, res) => {
  let {username, password} = req.body
  db('users').where({username}).select('password', 'id')
  .then(v => {
    const user = v[0]
    const hash = user.password
    const id = user.id
    if (!bcrypt.compareSync(password, hash)) res.sendStatus(401)

    const authToken = jwt.sign({id, username}, config.secret);
    res.json({authToken})
  })
})

function auth (req, res, next) {
  let token = req.header('Authorization').replace(/^Bearer /, '')
  if (!jwt.verify(token, config.secret)) {
    res.sendStatus(401)
    return
  }
  let [header, claims, sig] = token.split('.')
  let userId = JSON.parse(atob(claims)).id
  if (req.params.userId && userId !== parseInt(req.params.userId)) {
    res.sendStatus(401)
    return
  }
  next()
}

app.post('/users/:userId/jobs', auth, (req, res) => {
  let {title, hourlyRate, taxRate} = req.body
  let userId = req.params.userId
  db('jobs').insert({title, hourlyRate, taxRate, userId})
  .then(v => {
    const [id] = v
    res.json({id, title, hourlyRate, taxRate})
  })
})

app.get('/users/:userId/jobs', auth, (req, res) => {
  let userId = req.params.userId
  let jobs = []
  db('jobs').where({userId}).select().then(rows => {
    jobs = rows.map(row => {
      let {userId, ...user} = row
      user.entries = []
      return user
      return row
    })
    let jobIds = jobs.map(v => v.id)
    return db('entries').whereIn('jobId', jobIds).select()
  })
  .then(rows => {
    rows.forEach(row => {
      let job = jobs.find(v => v.id === row.jobId)
      let {jobId, ...entry} = row
      job.entries.push(entry)
    })
    res.json(jobs)
  })
})

app.post('/users/:userId/jobs/:jobId/entries', auth, (req, res) => {
  let {summary, duration} = req.body
  let createdAt = Date.now()
  let jobId = req.params.jobId
  db('entries').insert({summary, duration, createdAt, jobId})
  .then(v => {
    const [id] = v
    res.json({id, summary, duration, createdAt})
  })
})


app.listen(3000, () => {
  console.log('listening on port 3000!');
});
