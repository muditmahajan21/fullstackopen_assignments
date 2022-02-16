/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


morgan.token('post', (request) => {
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

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if(person) {
            response.json(person)
        }
        else {
            response.status(404).end()
        }
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
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
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    
    const person = {
        name: body.name,
        number: body.number
    }
    
    Person.findByIdAndUpdate(request.params.id, person, {new:true, runVlidators: true, context: 'query'})
    .then(updatedPerson => {
        response.json(updatedPerson)
    })
    .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({error: 'Malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})