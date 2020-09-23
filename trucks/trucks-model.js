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
        .leftJoin('users_items as ui', 'ui.item_id', 'i.id')
        .where('t.id', id)
        .select('t.name as truck_name', 't.location', 't.id as truck_id', 'i.name', 'i.id as food_id', 'i.description', 'i.photo_url', 'i.price', 'ui.ratings')
    console.log(res)
    if (res.length > 0) {

        return {
            truck_name: res[0].truck_name,
            location: res[0].location,
            truck_id: res[0].truck_id,
            food_items: res.map(item => (
                {
                    name: item.name,
                    food_id: item.food_id,
                    description: item.description,
                    photo_url: item.photo_url,
                    price: item.price,
                    ratings: item.ratings
                }
            ))
        }
    }
    return res
}