exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE files (
      id SERIAL PRIMARY KEY,
      original_name VARCHAR(255) NOT NULL,
      storage_name VARCHAR(255) NOT NULL,
      mime_type VARCHAR(128) NOT NULL,
      size INTEGER NOT NULL,
      url VARCHAR(500) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS files`);
};