const { Pool } = require("pg");

let pool;

const initSchema = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            task VARCHAR(255) NOT NULL,
            completed BOOLEAN DEFAULT false
        )
    `);
};

module.exports = async () => {
    try {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl:
                process.env.DB_SSL === "true"
                    ? { rejectUnauthorized: false }
                    : false,
        });
        await pool.query("SELECT 1");
        await initSchema();
        console.log("Connected to PostgreSQL.");
    } catch (error) {
        console.log("Could not connect to database.", error);
        throw error;
    }
};

module.exports.getPool = () => pool;

module.exports.isConnected = () => Boolean(pool);
