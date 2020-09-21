const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const authRouter = require('../auth/auth-router')

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)


module.exports = app