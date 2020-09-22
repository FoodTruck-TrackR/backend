
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('id')
            tbl.string('username').notNull().unique()
            tbl.string('email').notNull().unique()
            tbl.string('password').notNull()
            tbl.integer('role').notNull()
        })
        .createTable('vendors', tbl => {
            tbl.increments()
            tbl.string('username').notNull().unique()
            tbl.string('email').notNull().unique()
            tbl.string('password').notNull()
            tbl.string('role').notNull()
        })
        .createTable('trucks', tbl => {
            tbl.increments('id'),
                tbl.string('name').notNull()
            tbl.string('location').notNull()
            tbl.integer('vendor_id').unsigned().notNull().references('id').inTable('vendors').onUpdate('CASCADE').onDelete('CASCADE')
        })
        .createTable('items', tbl => {
            tbl.increments()
            tbl.string('name').notNull()
            tbl.string('description').notNull()
            tbl.string('photo_url').notNull().unique()
            tbl.float('price').notNull()
            tbl.float('average_rating')
            tbl.integer('truck_id').unsigned().notNull().references('id').inTable('vendors').onUpdate('CASCADE').onDelete('CASCADE')
        })
        //table will hold user ratings. 
        .createTable('users_items', tbl => {
            tbl.increments()
            tbl.integer('user_id').unsigned().notNull().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
            tbl.integer('item_id').unsigned().notNull().references('id').inTable('items').onUpdate('CASCADE').onDelete('CASCADE')
            tbl.integer('ratings').unsigned().notNull()
        })
        .createTable('users_trucks', tbl => {
            tbl.increments()
            tbl.integer('user_id').unsigned().notNull().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
            tbl.integer('truck_id').unsigned().notNull().references('id').inTable('trucks').onUpdate('CASCADE').onDelete('CASCADE')
        })
};

exports.down = function (knex) {

    return knex.schema
        .dropTableIfExists('users_trucks')
        .dropTableIfExists('users_items')
        .dropTableIfExists('items')
        .dropTableIfExists('trucks')
        .dropTableIfExists('vendors')
        .dropTableIfExists('users')
};
