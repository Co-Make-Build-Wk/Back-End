
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('area').del()
    .then(function () {
      // Inserts seed entries
      return knex('area').insert([
        {
          neighborhood: 'Lambda Creek',
          city: 'San Juan',
          state: 'California',
          zip_code: '11111',
        },
      ]);
    });
};
