// Include mongoose
const mongoose = require('mongoose')


// Define the Schema
const Schema = mongoose.Schema
const URLSchema = new Schema({
  URL: {
    type: String,
    required: true
  }
})  


// export the model for other files to use
module.exports = mongoose.model('URL', URLSchema) 
