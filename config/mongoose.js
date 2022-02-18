const mongoose = require('mongoose')

// connect to mongodb
mongoose.connect('mongodb://localhost/URL-shortener')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})