
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('trucks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([
        { id: 1, name: 'Bobs Burgers', location: 'Orlando', vendor_id: 1 },
        { id: 2, name: 'Taco King', location: 'Las Vegas', vendor_id: 2 }
      ])
    })
}
