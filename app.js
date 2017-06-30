const express = require('express')
const mustache = require('mustache-express')
const app = express()

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))

app.listen(3000, function () {
  console.log('Gabble is on! http://0.0.0.0:3000')
})

const routes = require('./routes/main')
app.use('/', routes)
