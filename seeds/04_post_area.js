
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('post_area').del()
    .then(function () {
      // Inserts seed entries
      return knex('post_area').insert([
        {
          post_id: 1,
          area_id: 1,
        },
      ]);
    });
};
