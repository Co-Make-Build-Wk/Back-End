
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          issue: 'Lambda Driveway',
          users_id: 1,
          description: 'Major pothole in middle lane',
          street_address: '15 Lambda Street',
          is_fixed: false,
        },
        {
          issue: 'Lambda Park',
          users_id: 2,
          description: 'Swings at park are getting loose',
          street_address: '25 Lambda Street',
          is_fixed: false,
        },
        {
          issue: 'Lambda Houses',
          users_id: 3,
          description: 'Please put up a stop sign, as there are children at play',
          street_address: '45 Lambda Road',
          is_fixed: false,
        },
      ]);
    });
};
