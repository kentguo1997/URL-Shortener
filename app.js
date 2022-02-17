// Include packages in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const urlExists = require('promised-url-exists')

const generateRandomIndex = require('./generate-randomIndex')
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


// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/urls', (req, res) => {
  const URL = req.body.URL
  let sameURL = []
  
  // determine if the URL exists
  urlExists(URL)
    .then(({ exists }) => {
      if (exists){
        // determine if the URL already exists
        URLModel.find()
         .lean()
         .then(URLs => {
           sameURL = URLs.filter(existedURL => existedURL.name === URL)
           
           // the URL already exists
           if ( sameURL.length > 0 ) {
             res.render('output', {shortenURL: 'http://localhost:3000/'+ sameURL[0].shortenURL })
           } else { 
             
            // the URL dose not exist
             let shortenURL = generateRandomIndex()   
             // determine if the shortenURL already exists
             URLModel.findOne({ shortenURL: shortenURL }, (foundURL) => {
               // the shortenURL does not exist
               if (!foundURL){
                 URLModel.create({ name: URL, shortenURL: shortenURL })
                 res.render('output', { shortenURL: 'http://localhost:3000/' + shortenURL }) 
               } else{
                 // the shortenURL already exists
                 while (foundURL.shortenURL = shortenURL) {
                   shortenURL = generateRandomIndex()
                 }
                 URLModel.create({ name: URL, shortenURL: shortenURL })
                 res.render('output', { shortenURL: 'http://localhost:3000/' + shortenURL }) 
               }
             })
           }
         })
         .catch(error => console.log(error))
      } else {
        console.log('Invalid URL')
      }    
    })
    .catch(error => {
      console.log(error);
    })

})



// listen and start the server
app.listen(port, () => {
  console.log(`The server is listening on http://localhost:${port}`)
})