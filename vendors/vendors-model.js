const db = require('../data/db-config')

module.exports = {
    getVendorInfo,
    addOwnedTruck,
    deleteTruck,
    addFoodItem
}

//view vendors info
async function getVendorInfo(id) {
    const res = await db('vendors as v')
        .join('trucks as t', 't.vendor_id', 'v.id')
        .select('t.name', 't.id as truck_id', 't.location', 'v.username', 'v.email')
        .where('v.id', id)

    if (res.length > 0) {
        return {
            username: res[0].username,
            email: res[0].email,
            ownedTrucks: res.map(item => {
                return {
                    name: item.name,
                    location: item.location,
                    truck_id: item['truck_id']
                }
            })
        }
    }
    return res
}

//add truck to list
function addOwnedTruck(truck) {
    return db('trucks')
        .insert(truck)
}

function deleteTruck(id) {
    return db('trucks')
        .where({ id })
        .del()
}

function addFoodItem(item) {
    return db('items')
        .insert(item)
}