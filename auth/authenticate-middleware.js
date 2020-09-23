const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    console.log(1)
    return function (req, res, next) {
        console.log(1.5)
        const token = req.headers.authorization
        const secret = process.env.JWT_SECRET || "secret"
        console.log(2)
        if (token) {
            console.log(3)
            jwt.verify(token, secret, (err, decodedToken) => {
                if (!err) {
                    req.jwt = decodedToken
                    next()
                } else {
                    res.status(403).json({ message: 'Not Authorized' })
                }
            })
        } else {
            console.log(4)
            res.status(403).json({ message: 'Not Authorized' })
        }
    }
}

module.exports = verifyToken