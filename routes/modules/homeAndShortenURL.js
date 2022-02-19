// Include express and express router
const express = require('express')
const router = express.Router()

// Include Package
const URLModel = require('../../models/URL')

// route setting of homepage
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:shortenIndex', (req, res) => {
  const shortenIndex = req.params.shortenIndex
  if (shortenIndex === 'favicon.ico') {
    return
  }
  URLModel.findOne({ shortName: shortenIndex })
    .then(URL => res.redirect(URL.name))
    .catch(error => console.log(error))
})

// export
module.exports = router
