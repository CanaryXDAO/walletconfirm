document.addEventListener("DOMContentLoaded", () => {
  const web3Options = {
    provider: Web3.givenProvider || "ws://localhost:8545",
  };
  const web3 = new Web3(web3Options);

  const signMessageButton = document.getElementById("signMessageButton");
  signMessageButton.addEventListener("click", signMessage);

  async function signMessage() {
    try {
      const message = `Verify I own this wallet at ${Date.now()}`;

      if (typeof window.ethereum === "undefined") {
        throw new Error("Please install MetaMask to use this feature.");
      }

      let accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length === 0) {
        accounts = await ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length === 0) {
          throw new Error("Please unlock your MetaMask account.");
        }
      }

      const account = accounts[0];
      const prefixedMessage = web3.eth.accounts.hashMessage(message);

      const signature = await ethereum.request({
        method: "personal_sign",
        params: [prefixedMessage, account],
      });

      console.log(`Message "${message}" signed by ${account}: ${signature}`);

      const response = await fetch("https://canaryxswap.finance/.netlify/functions/walletVerificationProxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature: signature,
          message: message,
          account: account,
        }),
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send signature to the server. Status: ${response.status}, Message: ${errorText}`);
      }

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
});