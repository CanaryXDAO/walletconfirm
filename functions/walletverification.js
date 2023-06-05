const Web3 = require("web3");

const web3 = new Web3();

exports.handler = async function (event, context) {
  try {
    const { signature, message, account } = JSON.parse(event.body);

    const messageHash = web3.utils.sha3(web3.utils.fromUtf8(message));
    const recoveredAccount = web3.eth.accounts.recover(messageHash, signature);

    if (recoveredAccount.toLowerCase() === account.toLowerCase()) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ success: false, error: "Invalid signature" }),
      };
    }
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