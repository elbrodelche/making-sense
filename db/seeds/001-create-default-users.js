const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  // For testing purposes all users have the same password
  const hashedPass = await bcrypt.hash('secret', 5);
  // First User
  await knex('users').insert({
    name: 'Bruce Lee',
    email: 'lee@makingsense.com',
    password: hashedPass,
    created_at: new Date(),
    updated_at: new Date(),
  });
  // Second User
  await knex('users').insert({
    name: 'Chuck Norris',
    email: 'norris@makingsense.com',
    password: hashedPass,
    created_at: new Date(),
    updated_at: new Date(),
  });
  // Third User
  await knex('users').insert({
    name: 'Jackie Chan',
    email: 'chan@makingsense.com',
    password: hashedPass,
    created_at: new Date(),
    updated_at: new Date(),
  });
};
