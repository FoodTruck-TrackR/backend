const verifyToken = require("./authenticate-middleware")

function verifyUser(id) {
    return function (req, res, next) {

        const subject = req.params.id || req.params.userId

        const id = Number(subject)

        if (req.jwt.subject === id) {
            next()
        } else {
            res.status(403).json({ message: 'you are not authorized to access this data' })
        }
    }
}


module.exports = verifyUser