require('dotenv').config();
module.exports = {
    connectionString: process.env.DATABASE_URL,
    migrationsDir: './migrations',
    migrationsTable: 'pgmigrations',
    ssl: false,
};