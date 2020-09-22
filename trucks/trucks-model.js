const db = require('../data/db-config')

module.exports = {
    findAllTrucks,
    findById
}

function findAllTrucks() {
    return db('trucks')
}

async function findById(id) {
    const res = await db('trucks as t')
        .join('items as i', 'i.truck_id', 't.id')
        .where('t.id', id)
        .select('t.name as truck_name', 't.location', 't.id as truck_id', 'i.name', 'i.description', 'i.photo_url', 'i.price')

    if (res.length > 0) {
        return {
            truck_name: res[0].truck_name,
            location: res[0].location,
            truck_id: res[0].truck_id,
            food_items: res.map(item => (
                {
                    name: item.name,
                    description: item.description,
                    photo_url: item.photo_url,
                    price: item.price
                }
            ))
        }
    }
    return res
}