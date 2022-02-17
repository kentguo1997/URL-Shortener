// Include mongoose
const mongoose = require('mongoose')


// Define the Schema
const Schema = mongoose.Schema
const URLSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  shortenURL: {
    type: String
  }
})  


// export the model for other files to use
module.exports = mongoose.model('URL', URLSchema) 
