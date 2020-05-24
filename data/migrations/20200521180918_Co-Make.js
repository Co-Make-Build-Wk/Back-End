
exports.up = function (knex) {
    return knex.schema
        .createTable('user', tbl => {
            tbl.increments();
            tbl.text('firstName', 128).notNullable();
            tbl.text('lastName', 128).notNullable();
        })
        .createTable('users', tbl => {
            tbl.increments();
            tbl.text('username', 128).notNullable().unique();
            tbl.text('password', 128).notNullable();
            tbl.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('user')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })
        .createTable('posts', tbl => {
            tbl.increments();
            tbl.integer('users_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.text('issue', 128).notNullable();
            tbl.text('description', 128).notNullable();
            tbl.text('street_address', 128).notNullable();
            tbl.timestamps(true, true);
            tbl.boolean('is_fixed').notNullable().defaultTo(false);
        })
        .createTable('area', tbl => {
            tbl.increments();
            tbl.text('neighborhood');
            tbl.text('city', 128).notNullable();
            tbl.text('state', 128).notNullable();
            tbl.text('zip_code', 128).notNullable();
        })
        .createTable('post_area', tbl => {
            tbl.integer('post_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('posts')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('area_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('area')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('post_area')
        .dropTableIfExists('area')
        .dropTableIfExists('posts')
        .dropTableIfExists('users')
        .dropTableIfExists('user');
};