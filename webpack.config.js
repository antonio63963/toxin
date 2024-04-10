const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const devMode = process.env.NODE_ENV === "development";

const fileNames = fs.readdirSync("./src/pages");
const entriesFiles = fileNames.reduce((acc, file) => {
  acc[file] = `./pages/${file}/${file}.js`;
  return acc;
}, {});
const htmlPages = fileNames.map(
  (file) =>
    new HtmlWebpackPlugin({
      filename: `${file}.html`,
      template: `./pages/${file}/${file}.pug`,
      chunks: [file],
    })
);

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    ...entriesFiles,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: devMode ? "[name].js" : "[name].[hash].js",
    // assetModuleFilename: path.join("assets", "[name].[ext]"),
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./pages/index/index.pug",
    //   filename: "index.html",
    // }),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.join("static"),
              destination: "dist",
            },
          ],
        },
      },
    }),
    ...htmlPages,
  ],
  devServer: {
    watchFiles: ["pages/index/index.html", "pages/login/login.html"],
    // port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "resolve-url-loader",
            options: {
              debug: true,
              sourceMap: false,
              removeCR: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("svg", "[name].[contenthash][ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
