const db = require('../data/db-config')

module.exports = {
    getUserInfo,
    addTruck,
    deleteTruck,
    rateFoodItem
}

async function getUserInfo(id) {
    const res = await db('users_trucks as ut')
        .leftJoin('users as u', 'u.id', 'ut.user_id')
        .leftJoin('trucks as t', 't.id', 'ut.truck_id')
        .select('u.username', 'u.email', 't.name', 't.id as truck_id', 't.location as location', 'ut.id as favorite_id')
        .where('u.id', id)

    console.log(res)

    if (res.length > 0) {
        return {
            username: res[0].username,
            email: res[0].email,
            favoriteTrucks: res.map(item => {
                return {
                    name: item.name,
                    favorite_id: item['favorite_id'],
                    truck_id: item['truck_id'],
                    location: item.location
                }
            })
        }
    }

    return res

}

function addTruck(truck) {
    return db('users_trucks')
        .insert(truck)
}

function deleteTruck(id) {
    return db('users_trucks')
        .where({ id })
        .del()
}

function rateFoodItem(body) {
    return db('users_items')
        .insert(body)

}