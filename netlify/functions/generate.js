const fetch = require("node-fetch");

const apiKey = process.env.OPENAI_API_KEY; // added via netlify dashboard

exports.handler = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    let { prompt } = event.queryStringParameters;
    try {
      await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: "256x256",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // { created: Number, data[{url: String},...] }
          // data.data[0].url = https://oaidalleapiprodscus.blob.core.windows.net/private/org-BbfSkJgXZJxNT27ZjdqUUHNL/user-uYWQW1h4jRZwJQNv0SYsm9lx/img-TiTv8QTdLzNj78ONipoQmVLH.png?st=2022-11-06T22%3A07%3A30Z&se=2022-11-07T00%3A07%3A30Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-11-06T20%3A37%3A34Z&ske=2022-11-07T20%3A37%3A34Z&sks=b&skv=2021-08-06&sig=IPPWt%2BVzChRjxxh%2BJrtyqfqRqq/HigqexAZi1ecGiqE%3D
          // console.log("Response:", data);
          //   let url = data.data[0].url;
          resolve({
            statusCode: 200,
            body: JSON.stringify(data),
          });
        })
        .catch((err) => {
          console.log(err);
          resolve({
            statusCode: 400,
            body: JSON.stringify({ error: "Unable to fetch Dall-e image" }),
          });
        });
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed fetching data" }),
      };
    }
  });
};
