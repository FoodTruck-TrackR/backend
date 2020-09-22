const db = require('../data/db-config')

module.exports = {
    getAll,
    addUser,
    findUser,
    getUserInfo
}

//for development, see all registered users

function getAll() {
    return db('users')
}

// function findUser(username) {
//     return db('users_trucks')
//         .innerJoin('users', 'users.id', 'users_trucks.user_id')
//         .innerJoin('trucks', 'trucks.id', 'users_trucks.truck_id')
//         // .select('users.username')
//         // .from('users')
//         .where('users.username', username)
//         .first()
// }



async function getUserInfo(id) {
    const res = await db('users_trucks as ut')
        .leftJoin('users as u', 'u.id', 'ut.user_id')
        .leftJoin('trucks as t', 't.id', 'ut.truck_id')
        .select('u.username', 'u.email', 't.name')
        .where('u.id', id)

    // console.log('res', res)

    if (res.length > 0) {
        const newObj = {
            username: res[0].username,
            email: res[0].email,
            favoriteTrucks: res.map(item => item.name)
        }
        return newObj
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