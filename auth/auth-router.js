const router = require('express').Router()

const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
    res.status(200).json({ message: 'end point for auth' })
})

router.get('/login', (req, res) => {
    res.status(200).json({ message: 'end point for login' })
})



module.exports = router