
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('items').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { id: 1, name: 'Bacon Burger', description: 'burger wtih bacon', photo_url: 'url.com', price: 5.50, average_rating: 3, truck_id: 1 },
        { id: 2, name: 'Basic Burger', description: 'burger wtih the basics', photo_url: 'url2.com', price: 3.50, average_rating: 5, truck_id: 1 },
        { id: 3, name: 'Taco', description: 'hard shell and meat', photo_url: 'url3.com', price: 2.00, average_rating: 4.5, truck_id: 2 },
        { id: 4, name: 'Burrito', description: 'soft shell with meat and beans', photo_url: 'url4.com', price: 6.50, average_rating: 3.5, truck_id: 2 }
      ])
    })
}
