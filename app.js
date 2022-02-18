// Include packages in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const routes = require('./routes')
const URLModel = require('./models/URL')
const port = 3000

const app = express()


// setting express-handlebars as template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


// connect to mongodb
mongoose.connect('mongodb://localhost/URL-shortener') 

const db = mongoose.connection

db.on ('error', () => {
  console.log('mongodb error!')
})

db.once ('open', () => {
  console.log('mongodb connected!')
})


// default use setting
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)



// listen and start the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})