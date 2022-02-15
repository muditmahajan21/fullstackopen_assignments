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
    const info = `<p> Phonebook has info for ${persons.length} people </p> <p> ${new Date()} </p>`
    response.send(info)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(persons) {
        response.json(person)
    }
    else {
        response.status(400).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 99999)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or Number is missing'
        })
    }

    if(persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})