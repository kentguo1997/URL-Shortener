// Include packages in the project
const express = require('express')
const mongoose = require('mongoose')
const port = 3000

const app = express()

// connect to mongodb
mongoose.connect('mongodb://localhost/URL-shortener') 

const db = mongoose.connection

db.on ('error', () => {
  console.log('mongodb error!')
})

db.once ('open', () => {
  console.log('mongodb connected!')
})


// routes setting
app.get('/', (req, res) => {
  res.send('This is the project for URL-shortener')
})


// listen and start the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})