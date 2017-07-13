const express = require('express')
const mustache = require('mustache-express')
const app = express()

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Gabble is on! http://0.0.0.0:' + port)
})

const routes = require('./routes/main')
app.use('/', routes)
