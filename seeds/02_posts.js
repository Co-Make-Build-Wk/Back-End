
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          issue: 'Lambda Curriculum',
          user_id: 1,
          description: 'Lambda School is way too fun',
          address: '15 Lamba Street, Lambda, SF, 11111',
          is_fixed: false,
        },
      ]);
    });
};
