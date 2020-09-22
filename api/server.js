const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const authRouter = require('../auth/auth-router')
const usersRouter = require('../users/users-router')

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)


module.exports = app