// Include packages in the project
const express = require('express')
const app = express()
const port = 3000


// routes setting
app.get('/', (req, res) => {
  res.send('This is the project for URL-shortener')
})


// listen and start the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})