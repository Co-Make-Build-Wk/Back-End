const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: "jhawkings0",
          password: bcrypt.hashSync("9wKAOD", 14),
          user_id: 1
        },
        {
          username: "pvanderveldt1",
          password: bcrypt.hashSync("JLGx4rkPx79v", 14),
          user_id: 2
        },
        {
          username: "slahive2",
          password: bcrypt.hashSync("CVapMDbSGD", 14),
          user_id: 3
        },
      ]);
    });
};
