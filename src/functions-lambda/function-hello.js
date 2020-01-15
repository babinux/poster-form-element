// functions/hello.js
// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
  const subject = event.queryStringParameters.name || 'World';
  return {
    statusCode: 200,
    body: `Hello ${subject}!`,
  };
};
