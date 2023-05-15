const path = require("path");

module.exports = {
  entry: path.join(__dirname, "functions", "walletVerification.js"),
  target: "node",
  output: {
    path: path.join(__dirname, "functions"),
    filename: "walletVerification.js",
    libraryTarget: "commonjs",
  },
  externals: /^(?![./])/,
};