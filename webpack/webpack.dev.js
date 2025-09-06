const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const common = require("./webpack.common");
const path = require("path");

module.exports = merge(common({}, { mode: "development" }), {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "../public"),
    },
    historyApiFallback: true,
    hot: true,
    open: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:8000",
        secure: false,
      },
    ],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
});
