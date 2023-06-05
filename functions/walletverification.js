const Web3 = require("web3");


const web3 = new Web3(); // No need to connect to a provider here.

exports.handler = async function (event, context) {
  try {
    const { signature, message, account } = JSON.parse(event.body);

    // Recover the account address from the message and signature
    const messageHash = web3.utils.sha3(web3.utils.fromUtf8(message));
    const recoveredAccount = web3.eth.accounts.recover(messageHash, signature);

    // Check if the recovered account matches the original account
    if (recoveredAccount.toLowerCase() === account.toLowerCase()) {
      // The signature is valid; proceed with your logic.
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      // The signature is invalid
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, error: "Invalid signature" }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Internal server error" }),
    };
  }
};