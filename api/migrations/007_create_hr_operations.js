exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE hr_operations (
      id SERIAL PRIMARY KEY,
      employee_id INTEGER NOT NULL REFERENCES employees(id),
      department_id INTEGER REFERENCES departments(id),
      position_id INTEGER REFERENCES positions(id),
      salary_amount NUMERIC,
      operation_type VARCHAR(32) NOT NULL,
      user_id INTEGER NOT NULL REFERENCES users(id),
      performed_at TIMESTAMP NOT NULL DEFAULT NOW(),
      comment VARCHAR(500) NOT NULL
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS hr_operations`);
};