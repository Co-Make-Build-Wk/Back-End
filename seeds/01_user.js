
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          firstName: "Julianna",
          lastName: "Hawkings",
          email: "jhawkings0@google.nl",
        },
        {
          firstName: "Panchito",
          lastName: "Van der Veldt",
          email: "pvanderveldt1@wordpress.com",
        },
        {
          firstName: "Sheffie",
          lastName: "Lahive",
          email: "slahive2@xrea.com",
        },
      ]);
    });
};
