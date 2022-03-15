const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')
const url = config.MONGODB_URI
 
logger.message(`Connecting to ${url}`)

mongoose.connect(url)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
        logger.message(`Connected to ${url}`)
    })
    .catch(err => {
        logger.error(`Failed to connect to ${url}`, err.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app