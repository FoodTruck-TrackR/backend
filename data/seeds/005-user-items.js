
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users_items').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users_items').insert([
        { id: 1, user_id: 1, item_id: 1, ratings: 4.5 },
        { id: 2, user_id: 1, item_id: 2, ratings: 3 },
        { id: 3, user_id: 2, item_id: 3, ratings: 2.5 },
        { id: 4, user_id: 2, item_id: 4, ratings: 5 }
      ])
    })
}
