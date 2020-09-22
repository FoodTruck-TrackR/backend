const db = require('../data/db-config')

module.exports = {
    findAllTrucks,
    findById
}

function findAllTrucks() {
    return db('trucks')
}

function findById(id) {
    return db('trucks')
        .where({ id })
}