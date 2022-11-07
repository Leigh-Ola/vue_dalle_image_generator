const fetch = require("node-fetch");

const apiKey = process.env.OPENAI_API_KEY; // added via netlify dashboard

exports.handler = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    let { prompt } = event.queryStringParameters;
    resolve({
      statusCode: 200,
      body: JSON.stringify({ apiKey, prompt }),
    });
  });
};
