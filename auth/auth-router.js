const router = require('express').Router()

const bcrypt = require('bcryptjs')

const { getAllUsers, getAllVendors, addUser, addVendor, findUser, findVendor, getVendorInfo } = require('./auth-model')

const { generateToken } = require('./token')
const verifyToken = require('./authenticate-middleware')
const { validateRegister, validateLogin } = require('../validation/validation-middleware')
const validate = require('./validate-middleware') //validates that the use doesn't exist on either table

//dev only
router.get('/users', verifyToken(), (req, res) => {
    getAllUsers()
        .then(users => {
            res.status(200).json({ message: users })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})
//dev only
router.get('/vendors', verifyToken(), (req, res) => {
    getAllVendors()
        .then(users => {
            res.status(200).json({ message: users })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.post('/register', validate(), (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 5)

    const role = req.body.role.toLowerCase()

    if (role === "diner") {
        addUser(req.body)
            .then(([id]) => {
                res.status(201).json({ message: 'User has been successfully registered' })
            })
            .catch(error => {
                res.status(500).json({ message: 'username or email alerady exists' })
            })
    } else if (role === "vendor") {
        addVendor(req.body)
            .then(([id]) => {
                res.status(201).json({ message: 'User has been successfully registered' })
            })
            .catch(error => {
                res.status(500).json({ message: 'username or email alerady exists' })
            })
    } else {
        res.status(401).json({ message: 'must include role of either vendor or diner' })
    }

})

router.post('/login', (req, res) => {

    const username = req.body.username
    const role = req.body.role.toLowerCase()

    if (role === "diner") {
        findUser(username)
            .then(user => {
                if (user && bcrypt.compareSync(req.body.password, user.password)) {

                    const token = generateToken(user)

                    res.status(201).json({ data: user, token })
                } else {
                    res.status(401).json({ message: 'invalid credentials' })
                }
            })
            .catch(error => {
                res.status(500).json({ message: 'invalid credentials' })
            })
    } else {
        findVendor(username)
            .then(user => {
                if (user && bcrypt.compareSync(req.body.password, user.password)) {

                    const token = generateToken(user)

                    res.status(201).json({ data: user, token })
                } else {
                    res.status(401).json({ message: 'invalid credentials' })
                }
            })
            .catch(error => {
                res.status(500).json({ message: 'invalid credentials' })
            })
    }
})

module.exports = router