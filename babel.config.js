module.exports = function (api) {
  const isDev = api.env("dev");
  api.cache(true);

  return {
    presets: [
      [
        "@babel/preset-env",
        { modules: isDev ? "auto" : false, useBuiltIns: "usage", corejs: 3 },
      ],
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
    plugins: ["@babel/plugin-transform-runtime"],
  };
};
