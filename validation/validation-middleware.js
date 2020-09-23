module.exports = {
    validateRegister,
    validateLogin
}

function validateRegister() {
    return function (req, res, next) {
        const username = req.body.username
        const role = req.body.role
        const email = req.body.email
        const password = req.body.password

        if (!username || !role || !email || !password) {
            res.status(422).json({ message: 'username, password, email, and role are required fields' })
        } else {
            next()
        }
    }
}

function validateLogin() {
    return function (req, res, next) {
        const username = req.body.username
        const password = req.body.password
        const role = req.body.role

        if (!username || !password || !role) {
            res.status(422).json({ message: 'username, password, and role are required fields' })
        } else {
            next()
        }
    }
}