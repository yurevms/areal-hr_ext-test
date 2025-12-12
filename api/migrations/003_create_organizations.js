exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE organizations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      comment VARCHAR(500) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS organizations`);
};