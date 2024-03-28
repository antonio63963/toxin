// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const fileName = ["index", "login", "rooms", "roomDetails"];

const config = {
  context: path.resolve(__dirname, "./src"),
  entry: fileName.reduce((conf, idx) => {
    conf[idx] = `./js/${idx}.js`;
    return conf;
  }, {}),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    hot: false,
  },
  plugins: [new MiniCssExtractPlugin()].concat(
    fileName.map(
      (file) =>
        new HtmlWebpackPlugin({
          template:
            file == "index" ? `./index.html` : `./pages/${file}/${file}.html`,
          // `./${file}.html`,
          inject: "head",
          filename:
            file == "index"
              ? `./index.html`
              : `./pages/${file}/${file}.html`,
          // `./${file}.html`,
          chunks: [file],
        })
    )
  ).filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      // {
      //   test: /\.(html)$/i,
      //   loader: ["hmtl-loader"],
      // },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
