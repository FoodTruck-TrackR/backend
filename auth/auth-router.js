const router = require('express').Router()

const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
    res.status(200).json({ message: 'end point for auth' })
})



module.exports = router