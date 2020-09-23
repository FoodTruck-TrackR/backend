
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('vendors').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('vendors').insert([
        { id: 1, username: 'truckMaster', email: 'test456@mail.com', password: '123', role: 'vendor' },
        { id: 2, username: 'chefOnWheels', email: 'test900@mail.com', password: '123', role: 'vendor' }
      ])
    })
}
