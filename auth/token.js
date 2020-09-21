const jwt = require('jsonwebtoken')

module.exports = {
    generateToken
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

