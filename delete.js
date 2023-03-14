const { getDB } = require('./pg');

module.exports.handler = async (event) => {
  const client = await getDB().connect();

  const { id } = JSON.parse(event.body);

  try {
    await client.query('DELETE FROM locations WHERE id = $1', [id]);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Delete v1 - A Ok!',
          data: {
            id: id,
          },
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Delete - Error!', error: error.message }, null, 2),
    };
  } finally {
    client.release();
  }
};
