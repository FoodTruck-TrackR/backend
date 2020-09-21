const db = require('../data/db-config')

module.exports = {
    getAll,
    addUser,
    findUser
}

//for development, see all registered users

function getAll() {
    return db('users')
}

function findUser(username) {
    return db('users')
        .where('users.username', username)
        .first()
}

function addUser(body) {
    return db('users')
        .insert(body)
}