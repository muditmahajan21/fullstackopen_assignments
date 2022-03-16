const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    const currUser = await User.findOne({ username })
    
    const passwordCorrect = currUser === null 
        ? false
        : await bcrypt.compare(password, currUser.passwordHash)

    if(!(currUser && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: currUser.username,
        id: currUser._id,
    }

    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: currUser.username, name: currUser.name })
})

module.exports = loginRouter