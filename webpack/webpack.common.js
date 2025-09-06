const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs");

function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env");
  const envModePath = path.resolve(
    __dirname,
    `../.env.${process.env.NODE_ENV || "development"}`
  );

  const env = dotenv.parse(fs.readFileSync(envPath));
  if (fs.existsSync(envModePath)) {
    const envMode = dotenv.parse(fs.readFileSync(envModePath));
    return { ...env, ...envMode };
  }
  return env;
}

module.exports = (env, argv) => {
  const mode = argv.mode || "development";
  const envVars = loadEnv();
  const isProd = mode === "production";

  return {
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
      path: path.resolve(__dirname, "../public/js"),
      filename: isProd ? "bundle.[contenthash].js" : "bundle.js",
      clean: true,
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.(css|scss)$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? "styles.[contenthash].css" : "styles.css",
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(envVars),
      }),
    ],
  };
};
