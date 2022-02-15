const mongoose = require('mongoose')

if(process.argv.length < 3) {
    console.log('Please provide the password for the database connection')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://muditmahajan:${password}@cluster0.q7zsu.mongodb.net/phonebookMudit?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
}
else if(process.argv.length === 5){
    newName = process.argv[3]
    newNumber = process.argv[4]

    const person = new Person({
        "name": newName, 
        "number": newNumber,
    })
    
    person.save().then(result => {
        console.log(`Added ${newName} ${newNumber} to the phonebook.`)
        mongoose.connection.close()
    })   
}