exports.up = (pgm) => {
    pgm.sql(`
    ALTER TABLE users
      RENAME COLUMN password TO password_hash;

    ALTER TABLE users
      ADD CONSTRAINT users_login_unique UNIQUE (login);
  `);
};

exports.down = (pgm) => {
    pgm.sql(`
    ALTER TABLE users
      DROP CONSTRAINT users_login_unique;

    ALTER TABLE users
      RENAME COLUMN password_hash TO password;
  `);
};
