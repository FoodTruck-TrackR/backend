module.exports = {
    validateRegister,
    validateLogin,
    validateFav,
    validateRatings,
    validateTruck,
    validateItem
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

function validateFav() {
    return function (req, res, next) {
        const truck_id = req.body.truck_id
        if (!truck_id) {
            res.status(422).json({ message: 'truck_id field is required' })
        } else {
            next()
        }
    }
}

function validateRatings() {
    return function (req, res, next) {
        const ratings = req.body.ratings
        if (!ratings) {
            res.status(422).json({ message: 'ratings field is required' })
        } else {
            next()
        }
    }
}

function validateTruck() {
    return function (req, res, next) {
        const name = req.body.name
        const location = req.body.location

        if (!name || !location) {
            res.status(422).json({ message: 'name and location fields are required' })
        } else {
            next()
        }
    }
}

function validateItem() {
    return function (req, res, next) {
        const name = req.body.name
        const description = req.body.description
        const photo_url = req.body.photo_url
        const price = req.body.price

        if (!name || !description || !photo_url || !price) {
            res.status(422).json({ message: 'name, description, photo_url, price fields are required' })
        } else {
            next()
        }
    }
}