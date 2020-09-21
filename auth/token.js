const jwt = require('jsonwebtoken')

module.exports = {
    generateToken,
    verifyToken
}


function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET || "secret", options)
}

function verifyToken(req, res, next) {

    return function (req, res, next) {
        const token = req.headers.authorization
        const secret = process.env.JWT_SECRET || "secret"

        if (token) {
            jwt.verify(token, secret, (err, decodedToken) => {
                if (!err) {
                    req.jwt = decodedToken
                    next()
                } else {
                    res.status(403).json({ message: 'Not Authorized' })
                }
            })
        } else {
            res.status(403).json({ message: 'Not Authorized' })
        }
    }
}