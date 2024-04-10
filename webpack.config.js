const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./pages/main/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: devMode ? '[name].js' : '[name].[hash].js',
    // assetModuleFilename: path.join("assets", "[name].[ext]"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./pages/main/main.pug",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.join('static'),
              destination: 'dist',
            }
          ]
        }
      }
    })
  ],
  devServer: {
    watchFiles: "pages/main/main.html",
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
            loader: 'resolve-url-loader',
            options: {
              debug: true,
              sourceMap: false,
              removeCR: true,
            },
          },
          {
            loader: 'sass-loader',
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
        type: 'asset/resource',
      },
    ],
  },
};
