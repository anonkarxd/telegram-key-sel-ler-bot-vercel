const { Client } = require('pg');
const Joi = require('joi');

// Validate DB_URL
const schema = Joi.string().uri().required();
const { error, value: dbUrl } = schema.validate(process.env.DB_URL);
if (error) {
  console.error('Invalid DB_URL:', error.message);
  process.exit(1);
}

const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
client.connect().then(async () => {
  await client.query(`CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    username TEXT,
    product TEXT,
    status TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );`);
  console.log('DB connected and table ensured.');
}).catch(err => {
  console.error('DB connection error:', err);
  process.exit(1);
});

module.exports = client;
