const db = require('../data/db-config')

function validate(other) {
    return async function (req, res, next) {

        const role = req.body.role.toLowerCase() === "vendor" ? "users" : "vendors"
        const username = req.body.username

        const user = await db(role).where(`${role}.username`, username).first()

        if (!user) {
            next()
        } else {
            res.status(401).json({ message: 'username or email already exist' })
        }

    }
}

module.exports = validate