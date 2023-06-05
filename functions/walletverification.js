const Web3 = require("web3");

const web3 = new Web3();

exports.handler = async function (event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Preflight request successful" }),
    };
  }

  try {
    const { signature, message, account } = JSON.parse(event.body);

    const messageHash = web3.utils.sha3(web3.utils.fromUtf8(message));
    const recoveredAccount = web3.eth.accounts.recover(messageHash, signature);

    if (recoveredAccount.toLowerCase() === account.toLowerCase()) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, error: "Invalid signature" }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: "Internal server error" }),
    };
  }
};