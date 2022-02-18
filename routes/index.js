// Include express & express router & route modules
const express = require('express')
const router = express.Router()
const homeAndShortenURL = require('./modules/homeAndShortenURL')
const urls = require('./modules/urls')

// Include routes modules
router.use('/', homeAndShortenURL )
router.use('/urls', urls)


// export
module.exports = router
