exports.up = async function up(knex) {
  // Users
  await knex.schema.createTable('users', (table) => {
    table
      .bigIncrements('id')
      .unsigned()
      .notNullable()
      .primary();
    table.string('name', 60).notNullable();
    table.string('email', 60).notNullable();
    table.string('password', 60).notNullable();
    table.unique('email');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  // Posts
  await knex.schema.createTable('posts', (table) => {
    table
      .bigIncrements('id')
      .unsigned()
      .notNullable()
      .primary();
    table.bigInteger('post_author').notNullable().references('id').inTable('users');
    table.text('post_title').notNullable();
    table.text('post_content', ['longtext']);
    table.text('post_excerpt').notNullable();
    table.string('post_status', 20).notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('posts');
  await knex.schema.dropTable('users');
};
