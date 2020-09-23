
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'foodJunkie', email: 'test@mail.com', password: '123', role: 'diner' },
        { id: 2, username: 'loves2eat', email: 'test123@mail.com', password: '123', role: 'diner' }
      ])
    })
}
