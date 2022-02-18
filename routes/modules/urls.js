// Include express and express router
const express = require('express')
const router = express.Router()

// Include Packages
const generateRandomIndex = require('../../generate-randomIndex')
const URLModel = require('../../models/URL')
const urlExists = require('promised-url-exists')

// route setting of ('/urls')
router.post('/', (req, res) => {
  const URL = req.body.URL
  let existedURL = []

  // determine if the URL is valid
  urlExists(URL)
    .then(({ exists }) => {
      // the URL is valid
      if (exists) {
        // determine if the URL already exists
        URLModel.find()
          .lean()
          .then(URLs => {
            existedURL = URLs.filter(theURL => theURL.name === URL)

            // the URL already exists
            if (existedURL.length > 0) {
              res.render('output', { shortName: 'http://localhost:3000/' + existedURL[0].shortName })
            } else {
              // the URL dose not exist
              let shortenURL = generateRandomIndex()
              // determine if the shortenURL already exists
              URLModel.findOne({ shortName: shortenURL }, (foundURL) => {
                // the shortenURL does not exist
                if (!foundURL) {
                  URLModel.create({ name: URL, shortName: shortenURL })
                  res.render('output', { shortName: 'http://localhost:3000/' + shortenURL })
                } else {
                  // the shortenURL already exists
                  while (foundURL.shortName === shortenURL) {
                    shortenURL = generateRandomIndex()
                  }
                  URLModel.create({ name: URL, shortName: shortenURL })
                  res.render('output', { shortName: 'http://localhost:3000/' + shortenURL })
                }
              })
            }
          })
          .catch(error => console.log(error))
      } else {
        // the URL is invalid
        console.log('Invalid URL! Please check and enter again!')
        res.redirect('/')
      }
    })
    .catch(error => {
      console.log(error)
    })
})

// export
module.exports = router
