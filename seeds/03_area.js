
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('area').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('area').insert([
        {
          neighborhood: 'Lambda Zone',
        },
      ]);
    });
};
