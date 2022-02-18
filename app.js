// Include packages in the project
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

require('./config/mongoose')
const routes = require('./routes')
const port = 3000

const app = express()


// setting express-handlebars as template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


// default use setting
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)


// listen and start the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})