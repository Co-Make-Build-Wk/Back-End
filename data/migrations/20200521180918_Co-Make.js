
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.text('name', 128).notNullable();
            tbl.text('username', 128).notNullable().unique();
            tbl.text('password', 128).notNullable();
        })
        .createTable('posts', tbl => {
            tbl.increments();
            tbl.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.text('issue', 128).notNullable();
            tbl.text('description', 128).notNullable();
            tbl.text('address', 128).notNullable();
            tbl.timestamps(true, true);
            tbl.boolean('is_fixed').notNullable().defaultTo(false);
        })
        .createTable('area', tbl => {
            tbl.increments();
            tbl.text('neighborhood', 128).notNullable();
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
        .dropTableIfExits('post_area')
        .dropTableIfExits('area')
        .dropTableIfExits('posts')
        .dropTableIfExits('users');
};