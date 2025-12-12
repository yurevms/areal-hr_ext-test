exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE employees (
      id SERIAL PRIMARY KEY,
      last_name VARCHAR(50) NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      patronymic VARCHAR(50),
      birth_date DATE NOT NULL,
      pasport_series VARCHAR(4) NOT NULL,
      pasport_number VARCHAR(6) NOT NULL,
      pasport_date_of_issue DATE NOT NULL,
      pasport_unit_code VARCHAR(7) NOT NULL,
      pasport_issued_by VARCHAR(255) NOT NULL,
      address_area VARCHAR(255) NOT NULL,
      address_city VARCHAR(255) NOT NULL,
      address_street VARCHAR(255) NOT NULL,
      address_house VARCHAR(50) NOT NULL,
      address_building VARCHAR(50),
      address_apartment VARCHAR(50),
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP
    )
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS employees`);
};