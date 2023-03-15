const { fromProvider } = require('cloud-regions-country-flags');

module.exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Index v1 - A Ok!',
        region: process.env.AWS_REGION,
        provider: fromProvider(process.env.AWS_REGION, 'AWS'),
        event: event,
        context: context,
      },
      null,
      2
    ),
  };
};
