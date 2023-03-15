const { getDB } = require('../pg');
const geoip = require('fast-geoip');

module.exports.handler = async (event) => {
  const client = await getDB().connect();

  const { date } = JSON.parse(event.body);

  try {
    const ip = event.requestContext.http.sourceIp;
    const geo = await geoip.lookup(ip);

    const _date = new Date(date);
    const city = geo.city;
    const lat = geo.ll[0];
    const lng = geo.ll[1];
    const runtime = 'lambda';

    const response = await client.query(
      'INSERT INTO locations (date, city, lat, lng, runtime) VALUES($1, $2, $3, $4, $5) RETURNING id',
      [_date, city, lat, lng, runtime]
    );

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Create v1 - A Ok!',
          data: {
            region: process.env.AWS_REGION,
            id: response.rows[0].id,
            city: city,
            date: _date,
            lat: lat,
            lng: lng,
            runtime: runtime,
          },
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        { message: 'Create - Error!', region: process.env.AWS_REGION, error: error.message },
        null,
        2
      ),
    };
  } finally {
    client.release();
  }
};
