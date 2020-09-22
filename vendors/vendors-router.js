const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const verifyToken = require('../auth/authenticate-middleware')

const { getVendorInfo } = require('./vendors-model')


router.get('/:id', (req, res) => {

    const id = Number(req.params.id)

    getVendorInfo(id)
        .then(user => {
            res.status(200).json({ data: user })
        })
        .catch(err => {
            res.status(500).json({ message: 'there was a problem retrieving info from db' })
        })
})


module.exports = router