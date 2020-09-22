const db = require('../data/db-config')

module.exports = {
    getFoodItems
}

function getFoodItems(id) {
    return db('items')
        .where('items.truck_id', id)
}