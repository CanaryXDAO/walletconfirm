const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const walletVerificationUrl = "https://canaryxswap.finance/.netlify/functions/walletVerification";
  const requestOptions = {
    method: event.httpMethod,
    headers: {
      "Content-Type": "application/json",
    },
    body: event.body,
  };

  try {
    const response = await fetch(walletVerificationUrl, requestOptions);
    const responseBody = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: responseBody,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: false, error: "Internal server error" }),
    };
  }
};