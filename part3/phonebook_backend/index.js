require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

//const Person = mongoose.model('Person', personSchema)

morgan.token('post', (request, response) => {
    if(request.method === 'POST') {
        return JSON.stringify(request.body)
    }
    else {
        return ''
    }
})

morgan.format('postway', ':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan('postway'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/info', (request, response) => {
    Person.find({}).then(persons => {
        const info = `<p> Phonebook has info for ${persons.length} people </p> <p> ${new Date()} </p>`
        response.send(info)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'Name or Number missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(addedPersons => {
        return response.json(addedPersons)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})