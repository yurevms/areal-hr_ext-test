exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS roles`);
};