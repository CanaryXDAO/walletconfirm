const path = require("path");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "functions", "walletVerification.js"),
  target: "node",
  output: {
    path: path.resolve(__dirname, "functions"),
    filename: "walletVerification.js",
    libraryTarget: "commonjs",
  },
  externals: /^(?![./])/,
};