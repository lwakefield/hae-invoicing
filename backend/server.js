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
db.schema.createTableIfNotExists('users', function (table) {
  table.increments()
  table.string('username').unique()
  table.string('password')
}).createTableIfNotExists('jobs', function (table) {
  table.increments()
  table.string('title')
  table.integer('hourly_rate')
  table.double('tax_rate')
}).createTableIfNotExists('time_entry', function (table) {
  table.increments()
  table.string('summary')
  table.integer('duration')
  table.timestamp('created_at')
})
// .then(() => db('users').insert({username: 'test', password: 'buzzbuzz'}))
// .then(() => db.select().from('users').timeout(1000).then(console.log))

const app = express()
app.use(BodyParser.json())

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

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
