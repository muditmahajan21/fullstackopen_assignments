const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log(`Connecting to ${url}`)

mongoose.connect(url)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
        console.log(`Connected to ${url}`)
    })
    .catch(err => {
        console.log(`Failed to connect to ${url}`, err.message)
    })

const personSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, minlength: [3, 'Length of the name is smaller than minimum length(3)'] },
    number: { type: String, required: true, unique: true, minlength: [8, 'Length of the number is smaller than minimum length(8)'] },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)