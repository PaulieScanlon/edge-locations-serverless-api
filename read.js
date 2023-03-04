const { Pool } = require('pg');

let pool;

module.exports.handler = async (event) => {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    pool = new Pool({
      connectionString,
      max: 1,
    });
  }
  const client = await pool.connect();

  try {
    const data = await client.query('SELECT * from locations');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Read - A Ok!', region: process.env.AWS_REGION, data: data }, null, 2),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Read - Error!', region: process.env.AWS_REGION, error: error.message }, null, 2),
    };
  } finally {
    client.release();
  }
};
