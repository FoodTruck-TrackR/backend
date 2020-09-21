const router = require('express').Router()

const bcrypt = require('bcryptjs')

const { getAll, addUser, findUser } = require('./auth-model')
const { generateToken } = require('./token')
const verifyToken = require('./authenticate-middleware')

//dev only
router.get('/users', verifyToken(), (req, res) => {
    getAll()
        .then(users => {
            res.status(200).json({ message: users })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.post('/register', (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 5)

    addUser(req.body)
        .then(([id]) => {
            res.status(201).json({ message: 'User has been successfully registered' })
        })
        .catch(error => {
            res.status(500).json({ message: 'username or email alerady exists' })
        })
})

router.get('/login', (req, res) => {

    const username = req.body.username

    findUser(username)
        .then(user => {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {

                const token = generateToken(user)

                res.status(201).json({ data: user, token })
            } else {
                res.status(404).json({ message: 'invalid credentials' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'invalid credentials' })
        })
})

module.exports = router