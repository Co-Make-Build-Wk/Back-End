
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'John Doe',
          username: 'j_doe',
          password: 'abc123'
        },
      ]);
    });
};
