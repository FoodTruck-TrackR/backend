const db = require('../data/db-config')

module.exports = {
    getAllUsers,
    getAllVendors,
    addUser,
    addVendor,
    findUser,
    getVendorInfo
}

//for development, see all registered users

function getAllUsers() {
    return db('users')
}

function getAllVendors() {
    return db('vendors')
}

async function getVendorInfo(id) {
    const res = await db('vendors as v')
        .join('trucks as t', 't.vendor_id', 'v.id')
        .select('v.username', 'v.email', 't.name', 't.id as truck_id')
        .where('v.id', id)

    console.log(res)

    if (res.length > 0) {
        return {
            username: res[0].username,
            email: res[0].email,
            ownedTrucks: res.map(item => {
                return {
                    name: item.name,
                    id: item['truck_id']
                }
            })
        }
    }

    return res

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

function addVendor(body) {
    return db('vendors')
        .insert(body)
}