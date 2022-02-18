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
  let sameURL = []

  // determine if the URL is valid
  urlExists(URL)
    .then(({ exists }) => {
      // the URL is valid
      if (exists) {
        // determine if the URL already exists
        URLModel.find()
          .lean()
          .then(URLs => {
            sameURL = URLs.filter(existedURL => existedURL.name === URL)

            // the URL already exists
            if (sameURL.length > 0) {
              res.render('output', { shortenURL: 'http://localhost:3000/' + sameURL[0].shortenURL })
            } else {

              // the URL dose not exist
              let shortenURL = generateRandomIndex()
              // determine if the shortenURL already exists
              URLModel.findOne({ shortenURL: shortenURL }, (foundURL) => {
                // the shortenURL does not exist
                if (!foundURL) {
                  URLModel.create({ name: URL, shortenURL: shortenURL })
                  res.render('output', { shortenURL: 'http://localhost:3000/' + shortenURL })
                } else {
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
        // the URL is invalid
        console.log('Invalid URL! Please check and enter again!')
      }
    })
    .catch(error => {
      console.log(error);
    })

})


// export
module.exports = router