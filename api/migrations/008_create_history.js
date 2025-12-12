exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE history (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      entity_type VARCHAR(50) NOT NULL,
      entity_id INTEGER NOT NULL,
      field_name VARCHAR(255) NOT NULL,
      old_value VARCHAR(500),
      new_value VARCHAR(500),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS history`);
};