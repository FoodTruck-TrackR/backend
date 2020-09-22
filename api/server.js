const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const authRouter = require('../auth/auth-router')
const usersRouter = require('../users/users-router')
const vendorRouter = require('../vendors/vendors-router')
const trucksRouter = require('../trucks/trucks-router')
const itemRouter = require('../food/item-router')

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/vendors', vendorRouter)
app.use('/api/trucks', trucksRouter)
app.use('/api/items', itemRouter)


module.exports = app