exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      last_name VARCHAR(50) NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      patronymic VARCHAR(50),
      login VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role_id INTEGER NOT NULL REFERENCES roles(id),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS users`);
};