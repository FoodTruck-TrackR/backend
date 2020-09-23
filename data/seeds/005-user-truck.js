
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users_trucks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users_trucks').insert([
        { id: 1, user_id: 1, truck_id: 1 },
        { id: 2, user_id: 2, truck_id: 2 }
      ]);
    });
};
