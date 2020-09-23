const router = require('express').Router()

const bcrypt = require('bcryptjs')

const { getAllUsers, getAllVendors, addUser, addVendor, findUser, findVendor, getVendorInfo } = require('./auth-model')

const { generateToken } = require('./token')
const verifyToken = require('./authenticate-middleware')

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

router.post('/register', (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 5)

    if (req.body.role === "diner") {
        addUser(req.body)
            .then(([id]) => {
                res.status(201).json({ message: 'User has been successfully registered' })
            })
            .catch(error => {
                res.status(500).json({ message: 'username or email alerady exists' })
            })
    } else if (req.body.role === "vendor") {
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

    if (req.body.role === "diner") {
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
    } else {
        findVendor(username)
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
    }
})

//route could be moved out of auth-directory
// router.get('/:role/:id', verifyToken(), (req, res) => {

//     const id = Number(req.params.id)

//     if (req.params.role === "diner") {
//         getUserInfo(id)
//             .then(user => {
//                 res.status(200).json({ data: user })
//             })
//             .catch(err => {
//                 res.status(500).json({ message: 'There was an error trying to retrieve from the database' })
//             })
//     } else {
//         getVendorInfo(id)
//             .then(vendor => {
//                 res.status(200).json({ data: vendor })
//             })
//             .catch(err => {
//                 res.status(500).json({ message: 'There was an error trying to retrieve from the database!' })
//             })
//     }
// })

module.exports = router