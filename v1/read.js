const { getDB } = require('../pg');

module.exports.handler = async () => {
  const client = await getDB().connect();

  try {
    const response = await client.query('SELECT * from locations');

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Read - A Ok!',
          region: process.env.AWS_REGION,
          data: {
            locations: response.rows || [],
          },
        },
        null,
        2
      ),
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
