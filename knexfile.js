// Update with your config settings.
/*global process*/
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./dev.sqlite3",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },
}
