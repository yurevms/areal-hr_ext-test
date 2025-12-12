exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE employee_files (
      id SERIAL PRIMARY KEY,
      employee_id INTEGER NOT NULL REFERENCES employees(id),
      file_id INTEGER NOT NULL REFERENCES files(id),
      file_type VARCHAR(32) NOT NULL CHECK (file_type IN ('passport_scan', 'contract', 'other')),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS employee_files`);
};